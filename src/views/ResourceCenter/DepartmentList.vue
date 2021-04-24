<!--部门列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :headerContentSelect="headerContentSelect"
                    :loading="tableLoading"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    :pagination="pagination"
                    @on-search="toSearch"
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
    </a-layout>
</template>

<script>
    const columns = [
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        //     key: 'status'
        // },
        // {
        //     title: '部门编码',
        //     dataIndex: 'departmentCode',
        //     key: 'departmentCode',
        //     scopedSlots: { customRender: 'departmentCode' },
            // sorter: (a, b) => a.departmentCode > b.departmentCode ? 1 : -1
        // },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            // sorter: (a, b) => a.deptName > b.deptName ? 1 : -1,
            scopedSlots: { customRender: 'link' },
        },
        // {
        //     title: '业务机构编码',
        //     dataIndex: 'BusinessOrganCode',
        //     key: 'BusinessOrganCode',
            // sorter: (a, b) => a.BusinessOrganCode > b.BusinessOrganCode ? 1 : -1
        // },
        // {
        //     title: '区域机构名称',
        //     dataIndex: 'regionOrganName',
        //     key: 'regionOrganName',
            // sorter: (a, b) => a.regionOrganName > b.regionOrganName ? 1 : -1
        // },
        // {
        //     title: '电话',
        //     dataIndex: 'telephone',
        //     key: 'telephone',
            // sorter: (a, b) => a.telephone > b.telephone ? 1 : -1
        // },
        // {
        //     title: '电子邮件',
        //     dataIndex: 'Email',
        //     key: 'Email',
            // sorter: (a, b) => a.Email > b.Email ? 1 : -1
        // },
        // {
        //     title: '部门地址',
        //     dataIndex: 'address',
        //     key: 'address'
        // }
    ];
    const headerContentSelect = [
        {label: 'AllProduct', name: '全部产品', stopFlag: '1'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    import api from '@/api/department';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'DepartmentList',
        components: { TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                tableLoading: false,
                tableData: [],
                columns,
                queryColumns,
                modalTitle: '加入收藏',
                buttons: ['view'],
                headerContent: ['search', 'select', 'excel'],
                headerContentSelect,
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                loading: false,
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                operateFixed: true,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                }
            };
        },
        mounted() {
            this.fetch()
        },
        methods: {
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
                    .getDepartmentList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.pagination };
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                            this.tableData.map(item => {item.link = '/resource_center/department_info_detail?code='+item.deptId})
                        }
                        this.tableLoading = false;
                    })
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/department_info_detail', query: {code: record.deptId}})
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