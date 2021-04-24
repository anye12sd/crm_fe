<!--员工信息列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :loading="tableLoading"
                    :operateBtnFixed="operateBtnFixed"
                    :headerContentSelect="headerContentSelect"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
                    @on-headerSelectChange="headerSelectChange"
                    @on-additem="onAdditem"
                    @on-arrangeitem="onArrangeitem"
                    @on-statistics="showStatistics"
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
            title: '状态',
            dataIndex: 'stopFlag',
            key: 'stopFlag'
        },
        {
            title: '员工编码',
            dataIndex: 'empCode',
            key: 'empCode',
            // sorter: (a, b) => a.empCode > b.empCode ? 1 : -1
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName',
            scopedSlots: {customRender: 'link'},
            // sorter: (a, b) => a.empName > b.empName ? 1 : -1
        },
        {
            title: '助记码',
            dataIndex: 'empSimpleCode',
            key: 'empSimpleCode',
            // sorter: (a, b) => a.empSimpleCode > b.empSimpleCode ? 1 : -1
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '部门编码',
            dataIndex: 'deptCode',
            key: 'deptCode',
            // sorter: (a, b) => a.departmentCode > b.departmentCode ? 1 : -1
        },
        {
            title: '员工职务',
            dataIndex: 'empPosition',
            key: 'empPosition',
            // sorter: (a, b) => a.empPosition > b.empPosition ? 1 : -1
        },
        {
            title: '登录名',
            dataIndex: 'loginName',
            key: 'loginName',
            // sorter: (a, b) => a.loginName > b.loginName ? 1 : -1
        },
        {
            title: '电子邮件',
            dataIndex: 'empEmail',
            key: 'empEmail',
            // sorter: (a, b) => a.empEmail > b.empEmail ? 1 : -1
        },
        {
            title: '办公电话',
            dataIndex: 'empOfficePhone',
            key: 'empOfficePhone',
            // sorter: (a, b) => a.empOfficePhone > b.empOfficePhone ? 1 : -1
        },
        {
            title: '移动电话',
            dataIndex: 'empMobilePhone',
            key: 'empMobilePhone',
            // sorter: (a, b) => a.empMobilePhone > b.empMobilePhone ? 1 : -1
        },
        {
            title: '家庭电话',
            dataIndex: 'empHomePhone',
            key: 'empHomePhone',
            // sorter: (a, b) => a.empHomePhone > b.empHomePhone ? 1 : -1
        },
        {
            title: '员工地址',
            dataIndex: 'empAddress',
            key: 'empAddress'
        },
        {
            title: '身份证号',
            dataIndex: 'empPinNo',
            key: 'empPinNo',
            // sorter: (a, b) => a.ID > b.ID ? 1 : -1
        },
        {
            title: '性别',
            dataIndex: 'empGender',
            key: 'empGender',
            scopedSlots: {customRender: 'empGender'}
        },
        {
            title: '籍贯',
            dataIndex: 'empBirthPlace',
            key: 'empBirthPlace'
        },
        {
            title: 'QQ',
            dataIndex: 'empQq',
            key: 'empQq',
            // sorter: (a, b) => a.empQq > b.empQq ? 1 : -1
        },
        {
            title: '微信号',
            dataIndex: 'empWechat',
            key: 'empWechat',
            // sorter: (a, b) => a.empWechat > b.empWechat ? 1 : -1
        }
    ];
    const headerContentSelect = [
        {label: 'AllMember', name: '全部员工', stopFlag: '2'},
        {label: 'birthMember', name: '10天内过生日的员工', stopFlag: '1'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import api from '@/api/member';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'MemberInfo',
        components: {TableColumnSelectDrawer, TableList, MyQueryDrawer, DrawerSearch},
        data() {
            return {
                loading: false,
                tableLoading: false,
                tableData: [],
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                buttons: ['view'],
                operateBtnFixed: true,
                headerContent: ['search', 'select', 'excel', 'statistics', 'displaylist'],
                headerContentSelect,
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                operateFixed: true,
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
                statisticsVisible: false,
                pagination: {
                    pageSize: 10,
                    current: 1,
                    total: 0
                }
            };
        },
        mounted() {
            this.getShowList()
            this.fetch()
        },
        methods: {
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
            // 页码切换
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.page_size;
                this.fetch();
            },
            fetch() {
                let params = {page: this.pagination.current}
                this.tableLoading = true;
                api
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.pagination };
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                            this.tableData.map(item => {
                                item.link = '/resource_center/member_info_detail?code=' + item.empId
                            })
                        }
                        this.tableLoading = false;
                    })
            },
            getShowList() {
                let params = {profileName: 'EMP'}
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
                    profileName: 'EMP',
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
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/member_info_detail', query: {code: record.empId}})
                }
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
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
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