<!--销售机会评估-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData"
                    :headerContent="headerContent"
                    :headerContentSelect="headerContentSelect"
                    :buttons="buttons"
                    :operateBtnFixed="operateBtnFixed"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
                    @on-headerSelectChange="headerSelectChange"
                    @on-additem="onAdditem"
                    @on-arrangeitem="onArrangeitem"
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
    </a-layout>
</template>

<script>
    import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
    const tableData = [
        { status: '', departmentName: 201, startDate: '中文', endDate: 'O', theme: '管理机构', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 120, startDate: '中文2', endDate: 'OA', theme: '总公司', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 430, startDate: '中文3', endDate: 'OAOA', theme: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 404, startDate: '中文4', endDate: 'O', theme: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 111, startDate: '中文5', endDate: 'OA', theme: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 65, startDate: '中文6', endDate: 'OAOA', theme: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' },
        { status: '', departmentName: 7, startDate: '中文7', endDate: 'A', theme: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/AnswerList' }
    ];
    const columns = [
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '部门名称',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '开始日期',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a, b) => a.startDate > b.startDate ? 1 : -1
        },
        {
            title: '结束日期',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: (a, b) => a.endDate > b.endDate ? 1 : -1
        },
        {
            title: '主题',
            dataIndex: 'theme',
            key: 'theme',
            sorter: (a, b) => a.theme > b.theme ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '总分',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score > b.score ? 1 : -1
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: (a, b) => a.createTime > b.createTime ? 1 : -1
        }
    ];
    const headerContentSelect = [
        {label: 'AssessStandard', name: '全部评估标准', stopFlag: '2'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'SalesChanceAssess',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                loading: false,
                headerContentSelect,
                tableData,
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                operateBtnFixed: true,
                operateFixed: true,
                buttons: ['view'],
                headerContent: ['search', 'select', 'excel', 'statistics', 'displaylist'],
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
            };
        },
        mounted() {
            this.getShowList()
        },
        methods: {
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/department_info_detail'})
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
            getShowList(arr) {
                this.columns = []
                let k = 0
                this.checkedList = arr || ['theme', 'score']
                // for (let i = 0; i < this.originColumns.length; i++) {
                //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                //         this.columns.push(this.originColumns[i]);
                //     }
                // }
                console.log(this.checkedList)
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
                this.loading = true
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getShowList(arr)
                    that.tableVisibleConfig = false
                    that.tableChildrenDrawer = false
                }, 500)
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