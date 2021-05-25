<!--销售订单列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :loading="tableLoading"
                    :hasRowHeaderSelect="true"
                    :isCheckbox="true"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    :headerContentSelect="headerContentSelect"
                    :operateBtnFixed="operateBtnFixed"
                    :pagination="pagination"
                    @on-display="toDisplay"
                    @on-statistics="showStatistics"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
                    @on-additem="onAdditem"
                    @on-arrangeitem="onArrangeitem"
                    @on-addOk="onAddOk"
                    @on-addCancel="onAddCancel"
                    @on-add="addOrder"
                    @on-change-table="onChangeTable"
                    ref="client"
        >
        </table-list>
        <div class="change-box">
            <a-button size="small" style="margin-right: 6px">生成采购订单</a-button>
            <a-button size="small" style="margin-right: 6px">生成发票</a-button>
        </div>
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
            title: '订单编号',
            dataIndex: 'soCode',
            key: 'soCode',
            // sorter: (a, b) => a.code > b.code ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '订单摘要',
            dataIndex: 'soSubject',
            key: 'soSubject',
        },
        {
            title: '订单日期',
            dataIndex: 'soDate',
            key: 'soDate',
            // sorter: (a, b) => a.orderDate > b.orderDate ? 1 : -1
        },
        {
            title: '订单状态',
            dataIndex: 'soStatus',
            key: 'soStatus',
            // sorter: (a, b) => a.status > b.status ? 1 : -1
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName',
        },
        {
            title: '订单金额',
            dataIndex: 'soAmount',
            key: 'soAmount',
            // sorter: (a, b) => a.amount > b.amount ? 1 : -1
        },
        {
            title: '客户名',
            dataIndex: 'friendName',
            key: 'friendName',
            // sorter: (a, b) => a.customerName > b.customerName ? 1 : -1,
        },
        {
            title: '伙伴名',
            dataIndex: 'partnerName',
            key: 'partnerName',
            sorter: (a, b) => a.partnerName > b.partnerName ? 1 : -1,
            scopedSlots: { customRender: 'link5' }
        },
        {
            title: '活动名称',
            dataIndex: 'activityName',
            key: 'activityName',
            sorter: (a, b) => a.activityName > b.activityName ? 1 : -1
        }
    ];
    const headerContentSelect = [
        {label: 'dayOrder', name: '今日订单', stopFlag: '1'},
        {label: 'weekOrder', name: '本周订单', stopFlag: '1'},
        {label: 'monthOrder', name: '本月订单', stopFlag: '2'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import api from '@/api/salesOrder';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'SalesOrderList',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
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
                headerContentSelect,
                statisticsVisible: false,
                operateBtnFixed: true,
                operateFixed: true,
                buttons: ['view', 'delete'],
                headerContent: ['search', 'select', 'excel', 'add', 'displaylist', 'statistics', 'customerCollect', 'partnerCollect'],
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
                pagination: {
                    total: 1,
                    current: 1,
                    pageSize: 10
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
                this.pagination.page_size = pagination.pageSize;
                this.fetch()
            },
            fetch(){
                let params = {page: this.pagination.current}
                this.tableLoading = true
                api
                    .getSalesOrderList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.pagination};
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows
                            this.tableData.map(item => {item.link = '/sales_order/order_info_detail?id='+item.soId})
                        }
                        this.tableLoading = false
                    })
            },
            getShowList(arr) {
                this.columns = []
                let k = 0
                this.checkedList = arr || ['friendName', 'empName']
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
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/sales_order/order_info_detail', query: {id: record.soId}})
                }
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
            },
            addOrder(){
                this.$router.push({path: '/sales_order/sales_order_add'})
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
        }
    };
</script>

<style scoped>
    .change-box {
        background: #fff;
        padding-left: 24px;
        padding-bottom: 24px;
    }
</style>