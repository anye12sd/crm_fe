<!--订单账目列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :headerContentSelect="headerContentSelect"
                    :operateBtnFixed="operateBtnFixed"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
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
        { date: '2020-12-25', code: 201, summary: '中文', amount: 'O', customerName: '管理机构', telephone: '', Email: '', address: '' },
        { date: '2020-12-26', code: 120, summary: '中文2', amount: 'OA', customerName: '总公司', telephone: '', Email: '', address: '' },
        { date: '2020-12-27', code: 430, summary: '中文3', amount: 'OAOA', customerName: '名称1', telephone: '', Email: '', address: '' },
        { date: '2020-12-28', code: 404, summary: '中文4', amount: 'O', customerName: '名称1', telephone: '', Email: '', address: '' },
        { date: '2020-12-21', code: 111, summary: '中文5', amount: 'OA', customerName: '名称1', telephone: '', Email: '', address: '' },
        { date: '2020-12-22', code: 65, summary: '中文6', amount: 'OAOA', customerName: '名称1', telephone: '', Email: '', address: '' },
        { date: '2020-12-23', code: 7, summary: '中文7', amount: 'A', customerName: '名称1', telephone: '', Email: '', address: '' }
    ];
    const columns = [
        {
            title: '订单日期',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date > b.date ? 1 : -1
        },
        {
            title: '订单编号',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code > b.code ? 1 : -1
        },
        {
            title: '订单摘要',
            dataIndex: 'summary',
            key: 'summary',
        },
        {
            title: '客户名',
            dataIndex: 'customerName',
            key: 'customerName',
            sorter: (a, b) => a.customerName > b.customerName ? 1 : -1
        },
        {
            title: '伙伴名',
            dataIndex: 'partnerName',
            key: 'partnerName',
            sorter: (a, b) => a.partnerName > b.partnerName ? 1 : -1
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            sorter: (a, b) => a.productName > b.productName ? 1 : -1
        },
        {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount > b.amount ? 1 : -1
        },
        {
            title: '成交价',
            dataIndex: 'dealPrice',
            key: 'dealPrice',
            sorter: (a, b) => a.dealPrice > b.dealPrice ? 1 : -1
        },
        {
            title: '金额',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price > b.price ? 1 : -1
        }
    ];
    const headerContentSelect = [
        {label: 'weekAccount', name: '本周账目', stopFlag: '1'},
        {label: 'monthAccount', name: '本月账目', stopFlag: '2'},
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
        name: 'SalesOrderList',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                loading: false,
                tableData,
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                headerContentSelect,
                operateBtnFixed: true,
                operateFixed: true,
                buttons: ['view', 'delete'],
                headerContent: ['displaylist', 'select', 'excel', 'statistics', 'search'],
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
                this.checkedList = arr || ['date', 'code']
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
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/product_info_detail'})
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