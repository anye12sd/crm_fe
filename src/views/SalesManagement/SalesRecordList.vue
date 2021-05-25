<!--销售记录详情-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData"
                    :headerContent="headerContent"
                    :loading="tableLoading"
                    :headerContentSelect="headerContentSelect"
                    :buttons="buttons"
                    :operateBtnFixed="operateBtnFixed"
                    :addTitle="addTitle"
                    :pagination="pagination"
                    :plainOptions="plainOptions"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
                    @on-headerSelectChange="headerSelectChange"
                    @on-additem="onAdditem"
                    @on-add="onAddNew"
                    @on-arrangeitem="onArrangeitem"
                    @on-statistics="showStatistics"
                    @on-change-table="onChangeTable"
                    @on-addOk="onAddOk"
                    @on-addCancel="onAddCancel"
                    ref="client"
        >
        </table-list>
        <myQuery-drawer
                :loading="loading"
                :queryData="queryData"
                :queryColumns="queryColumns"
                :myQuery="myQuery"
                :btns="btns"
                :operateFixed="operateFixed"
                @on-close="toClose"
                @on-queryclick-btn="onQueryClick"
                ref="query"
        >
        </myQuery-drawer>
        <drawer-search ref="drawer"></drawer-search>
        <table-column-select-drawer
                :visibleConfig="tableVisibleConfig"
                :childrenDrawerProps="tableChildrenDrawer"
                :columns="columns"
                :checkedListProps="checkedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </table-column-select-drawer>
        <a-modal v-model="statisticsVisible" title="统计数据" on-ok="hideStatistics">
            <template slot="footer">
                <a-button type="primary" @click="hideStatistics">
                    确定
                </a-button>
            </template>
            <p>共有{{this.pagination.total}}条数据</p>
        </a-modal>
    </a-layout>
</template>

<script>
    import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
    const columns = [
        {
            title: '开始时间',
            dataIndex: 'jrnlStartTime',
            key: 'jrnlStartTime',
            // sorter: (a, b) => a.jrnlStartTime > b.jrnlStartTime ? 1 : -1
        },
        {
            title: '结束时间',
            dataIndex: 'jrnlEndTime',
            key: 'jrnlEndTime',
            // sorter: (a, b) => a.jrnlEndTime > b.jrnlEndTime ? 1 : -1
        },
        {
            title: '动作',
            dataIndex: 'jrnlAction',
            key: 'jrnlAction',
            // sorter: (a, b) => a.action > b.action ? 1 : -1
        },
        {
            title: '主题',
            dataIndex: 'jrnlSubject',
            key: 'jrnlSubject',
            // sorter: (a, b) => a.jrnlSubject > b.jrnlSubject ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '任务主题',
            dataIndex: 'missionTheme',
            key: 'missionTheme',
            // sorter: (a, b) => a.missionTheme > b.missionTheme ? 1 : -1
        },
        {
            title: '发生费用',
            dataIndex: 'occurAmount',
            key: 'occurAmount',
            // sorter: (a, b) => a.occurAmount > b.occurAmount ? 1 : -1
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName'
        }
    ];
    const headerContentSelect = [
        {label: 'dayWorkRecord', name: '今日工作记录', stopFlag: '1'},
        {label: 'weekWorkRecord', name: '本周工作记录', stopFlag: '1'},
        {label: 'monthWorkRecord', name: '本月工作记录', stopFlag: '1'},
        {label: '5daysWorkRecord', name: '最近5天工作记录', stopFlag: '1'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import api from '@/api/workRecord';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'ChanceDealProcess',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                loading: false,
                tableLoading: false,
                headerContentSelect,
                tableData: [],
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                operateBtnFixed: true,
                operateFixed: true,
                buttons: ['view'],
                headerContent: ['search', 'select', 'excel', 'displaylist', 'statistics', 'add'],
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
                visibleConfig: false,
                statisticsVisible: false,
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        mounted() {
            this.getShowList()
            this.fetch()
        },
        methods: {
            // 页码切换
            onChangeTable(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.page_size;
                this.fetch();
            },
            fetch() {
                let params = {page: this.pagination.current, type: '2'}
                this.tableLoading = true;
                api
                    .getWorkRecordList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.pagination };
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                            this.tableData.map(item => {item.link = '/sales_management/sales_record_detail?code='+item.jrnlId})
                        }
                        this.tableLoading = false;
                    })
            },
            getShowList() {
                let params = {profileName: 'JRNL_SALES'}
                this.loading = true;
                user
                    .getMyShow(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            if(!res.data.profileContent.length){
                                return -1
                            }
                            this.columns = []
                            let k = 0
                            this.checkedList = res.data.profileContent
                            // for (let i = 0; i < this.originColumns.length; i++) {
                            //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                            //         this.columns.push(this.originColumns[i]);
                            //     }
                            // }
                            for (let i = 0; i < this.checkedList.length; i++) {
                                for (let j = k; j < this.originColumns.length; j++)
                                    if (this.originColumns[j].dataIndex.includes(this.checkedList[i])) {
                                        this.columns.push(this.originColumns[j]);
                                        [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                                        k++
                                        break
                                        // this.originColumns.splice(j, 1)
                                        // j--
                                    }
                            }
                            // this.originColumns = this.columns.concat(this.originColumns)
                        }
                        this.loading = false;
                    })
            },
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/sales_management/sales_record_detail', query: {id: record.jrnlId}})
                }
            },
            customRow() {
                return {
                    on: {
                        click: (e) => {
                            const oldList = document.querySelectorAll('.checked-td-of-add-table');
                            if (oldList) {
                                for (let j = 0; j < oldList.length; j++) {
                                    oldList[j].classList.remove('checked-td-of-add-table');
                                }
                            }
                            const children = e.target.parentNode.children;
                            for (let i = 0; i < children.length; i++) {
                                children[i].classList.add('checked-td-of-add-table');
                            }
                        }
                    }
                };
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            toDisplay() {
                this.tableVisibleConfig = true;
                this.loading = true;
            },
            hideList(){
                this.tableVisibleConfig = false
            },
            postShow(val){
                this.tableChildrenDrawer = true
                let arr = []
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].dataIndex);
                }
                let params = {
                    profileName: 'JRNL_SALES',
                    profileContent: arr,
                }
                this.loading = true
                console.log(params)
                user.
                postMyShow(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success("修改成功")
                            this.getShowList()
                            this.tableVisibleConfig = false
                            this.tableChildrenDrawer = false
                        }
                        this.loading = false;
                    })
            },
            headerSelectChange(val){
                console.log(val)
            },
            onQueryClick(type, text, record, index) {
                if (record.stopFlag === '1') {
                    for (let i = 0; i < this.queryData.length; i++) {
                        this.queryData[i].stopFlag = '1';
                    }
                    record.stopFlag = '2';
                } else {
                    for (let i = 0; i < this.queryData.length; i++) {
                        this.queryData[i].stopFlag = '2';
                    }
                    record.stopFlag = '1';
                }
            },
            toClose() {
                this.$refs.query.queryclose();
            },
            onArrangeitem() {
                this.loading = true;
                this.$refs.query.queryopen();
                setTimeout(() => {
                    this.queryData = this.headerContentSelect;
                    this.loading = false;
                }, 500);
            },
            onAdditem() {
                this.$refs.client.open();
            },
            onAddNew(){
                this.$router.push({path: '/sales_management/sales_record_add'})
            },
            onAddOk() {
                this.$refs.client.close();
            },
            onAddCancel() {
                this.$refs.client.close();
            }
        }
    };
</script>

<style scoped></style>