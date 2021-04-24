<!--产品信息列表-->
<template>
    <a-layout class="main-layout">
        <table-list
                :columns="columns"
                :loading="tableLoading"
                :table-data="tableData"
                :headerContent="headerContent"
                :headerContentSelect="headerContentSelect"
                :addTitle="addTitle"
                :plainOptions="plainOptions"
                :buttons="buttons"
                :operateBtnFixed="operateBtnFixed"
                :pagination="pagination"
                @on-add="toOpenTableAdd"
                @on-display="toDisplay"
                @on-search="toSearch"
                @on-collect="toCollect"
                @on-click-btn="childBtnClicked"
                @on-statistics="showStatistics"
                @on-headerSelectChange="headerSelectChange"
                @on-additem="onAdditem"
                @on-arrangeitem="onArrangeitem"
                @on-addOk="onAddOk"
                @on-addCancel="onAddCancel"
                @on-change-table="changeTablePagination"
                ref="client"
        ></table-list>
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
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns" :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange"></modal-add-table>
        <drawer-search ref="drawer"></drawer-search>
        <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
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
    const modalAddTableParams = {
        modalTitle: '产品分类选择',
        tableTitle: '分类列表',
        hasRowHeaderSelect: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [
            // {
            //     type: 'input',
            //     labelName: '分类编码',
            //     placeholder: '请输入',
            //     paramsName: 'code'
            // },
            // {
            //     type: 'input',
            //     labelName: '产品分类',
            //     paramsName: 'category'
            // },
            // {
            //     type: 'input',
            //     labelName: '备注',
            //     paramsName: 'remark'
            // },
            // {
            //     type: 'select',
            //     labelName: '选择',
            //     options: [
            //         {label: '0', value: 'select1'},
            //         {label: '1', value: 'select2'},
            //     ],
            // }
        ],
        pagination: {
            total: 1,
            current: 1,
            pageSize: 10,
        },
    }
    const modalAddColumns = [
        {
            title: '分类编码',
            dataIndex: 'prodClassCode',
            key: 'prodClassCode'
        },
        {
            title: '产品分类',
            dataIndex: 'prodClassName',
            key: 'prodClassName'
        },
    ]
    const columns = [
        {
            title: '状态',
            dataIndex: 'stopFlag',
            key: 'stopFlag',
            scopedSlots: { customRender: 'stopFlag' }
        },
        {
            title: '产品分类',
            dataIndex: 'prodClassName',
            key: 'prodClassName',
            // sorter: (a, b) => a.prodClassName > b.prodClassName ? 1 : -1,
        },
        {
            title: '产品编码',
            dataIndex: 'prodCode',
            key: 'prodCode',
            // sorter: (a, b) => a.prodCode > b.prodCode ? 1 : -1
        },
        {
            title: '产品助记符',
            dataIndex: 'prodSimpleCode',
            key: 'prodSimpleCode',
            // sorter: (a, b) => a.prodSimpleCode > b.prodSimpleCode ? 1 : -1
        },
        {
            title: '产品名称',
            dataIndex: 'prodName',
            key: 'prodName',
            // sorter: (a, b) => a.prodName > b.prodName ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '描述',
            dataIndex: 'prodIntro',
            key: 'prodIntro'
        },
        {
            title: '计量单位',
            dataIndex: 'unitName',
            key: 'unitName'
        },
        {
            title: '定价',
            dataIndex: 'prodListPrice',
            key: 'prodListPrice',
            // sorter: (a, b) => a.prodListPrice > b.prodListPrice ? 1 : -1
        },
        {
            title: '单位成本',
            dataIndex: 'prodUnitCost',
            key: 'prodUnitCost',
            // sorter: (a, b) => a.unitcost > b.unitcost ? 1 : -1
        },
        {
            title: '采购参考价',
            dataIndex: 'prodPurchasePrice',
            key: 'prodPurchasePrice',
            // sorter: (a, b) => a.purchaseReferencePrice > b.purchaseReferencePrice ? 1 : -1
        },
        {
            title: '消费周期（天）',
            dataIndex: 'prodLifespan',
            width: 150,
            key: 'prodLifespan',
            // sorter: (a, b) => a.consumptionCycle > b.consumptionCycle ? 1 : -1
        },
        {
            title: '组合产品',
            dataIndex: 'compose',
            key: 'compose'
        },
        {
            title: '可采购',
            dataIndex: 'buyFlag',
            key: 'buyFlag',
            scopedSlots: { customRender: 'buyFlag' }
        },
        {
            title: '可销售',
            dataIndex: 'saleFlag',
            key: 'saleFlag',
            scopedSlots: { customRender: 'saleFlag' }
        },
        {
            title: '序列号管理',
            dataIndex: 'snFlag',
            key: 'snFlag',
            scopedSlots: { customRender: 'snFlag' }
            // sorter: (a, b) => a.serialNumber > b.serialNumber ? 1 : -1
        },
        {
            title: '当前库存',
            dataIndex: 'stock',
            key: 'stock',
            // sorter: (a, b) => a.stock > b.stock ? 1 : -1
        },
        {
            title: '创建人',
            dataIndex: 'Creator',
            key: 'Creator',
            // sorter: (a, b) => a.Creator > b.Creator ? 1 : -1
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            // sorter: (a, b) => a.createTime > b.createTime ? 1 : -1
        },
        {
            title: '修改人',
            dataIndex: 'changer',
            key: 'changer',
            // sorter: (a, b) => a.changer > b.changer ? 1 : -1
        },
        {
            title: '修改时间',
            dataIndex: 'changeTime',
            key: 'changeTime',
            // sorter: (a, b) => a.changeTime > b.changeTime ? 1 : -1
        },
        {
            title: '场地费',
            dataIndex: 'siteFee',
            key: 'siteFee',
            // sorter: (a, b) => a.siteFee > b.siteFee ? 1 : -1
        }
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
    import api from '@/api/product';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import ModalAddTable from "../../components/ModalAddTable";
    import CollectionAdd from '@/components/details/CollectionAdd';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'ProductInfo',
        components: {TableColumnSelectDrawer, ModalAddTable, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer},
        data() {
            return {
                loading: false,
                tableLoading: false,
                tableData: [],
                modalAddData: [],
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                modalAddColumns,
                modalAddTableParams,
                buttons: ['view', 'delete'],
                headerContent: [ 'search', 'select', 'excel', 'statistics', 'displaylist', 'add'],
                headerContentSelect,
                modalTitle: '加入收藏',
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedList: [], //checkboxgroup里需要默认选中的项
                operateBtnFixed: true,
                operateFixed: true,
                visible: false,
                statisticsVisible: false,
                checkedKeys: [],
                params: {},
                pagination: {
                    total: 1,
                    current: 1,
                    pageSize: 10,
                },
            };
        },
        mounted(){
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
            changeTablePagination(val){
                this.pagination.current = val.current;
                this.pagination.pageSize = val.pageSize;
                this.fetch()
            },
            fetch() {
                let params = {page: this.pagination.current, page_size: this.pagination.pageSize }
                this.tableLoading = true
                console.log(params)
                api
                    .getProductList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.pagination };
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                            this.tableData.map(item => {item.link = '/resource_center/product_info_detail?code='+item.prodId})
                        }
                        this.tableLoading = false;
                    })
            },
            getShowList() {
                let params = {profileName: 'PROD'}
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
                            this.checkedList = res.data.profileContent
                            let k = 0
                            console.log(this.checkedList)
                            // for (let i = 0; i < this.originColumns.length; i++) {
                            //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                            //         this.columns.push(this.originColumns[i]);
                            //     }
                            // }
                            for (let i = 0; i < this.checkedList.length; i++) {
                                for (let j = k; j < this.originColumns.length; j++){
                                    if (this.originColumns[j].dataIndex.includes(this.checkedList[i])) {
                                        this.columns.push(this.originColumns[j]);
                                        [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                                        k++
                                        break
                                        // this.originColumns.splice(j, 1)
                                        // j--
                                    }
                                }
                            }
                            // this.originColumns = this.columns.concat(this.originColumns)
                        }
                        this.loading = false;
                    })
            },
            toOpenTableAdd() {
                this.$refs.tableAdd.open();
                this.modalAddTableParams.loading = true;
                api
                    .getProductClassList( {page: this.modalAddTableParams.pagination.current} )
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.modalAddTableParams.pagination };
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
            toCollect() {
                this.$refs.add.open();
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
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
                    profileName: 'PROD',
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
                    this.$router.push({path: '/resource_center/product_info_detail', query: {code: record.prodId}})
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
            tableSelectedHandle(val){
                console.log(val)
                this.$router.push({ name: 'ProductAdd', params: {val: val}})
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
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                this.toOpenTableAdd()
            }
        }
    };
</script>

<style scoped></style>