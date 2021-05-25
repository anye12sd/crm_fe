<!--销售机会管理-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData"
                    :headerContent="headerContent"
                    :headerContentSelect="headerContentSelect"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    :buttons="buttons"
                    :operateBtnFixed="operateBtnFixed"
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
        { theme: '2', departmentCode: 201, departmentName: '中文', BusinessOrganCode: 'O', regionOrganName: '管理机构', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 120, departmentName: '中文2', BusinessOrganCode: 'OA', regionOrganName: '总公司', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 430, departmentName: '中文3', BusinessOrganCode: 'OAOA', regionOrganName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 404, departmentName: '中文4', BusinessOrganCode: 'O', regionOrganName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 111, departmentName: '中文5', BusinessOrganCode: 'OA', regionOrganName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 65, departmentName: '中文6', BusinessOrganCode: 'OAOA', regionOrganName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '2', departmentCode: 7, departmentName: '中文7', BusinessOrganCode: 'A', regionOrganName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' }
    ];
    const columns = [
        {
            title: '标志',
            dataIndex: 'sign',
            key: 'sign',
        },
        {
            title: '来源类型',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category > b.category ? 1 : -1
        },
        {
            title: '主题',
            dataIndex: 'theme',
            key: 'theme',
            sorter: (a, b) => a.theme > b.theme ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '客户/伙伴名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name ? 1 : -1
        },
        {
            title: '销售预期',
            dataIndex: 'salesExpect',
            key: 'salesExpect',
            sorter: (a, b) => a.salesExpect > b.salesExpect ? 1 : -1
        },
        {
            title: '预期日期',
            dataIndex: 'expectDate',
            key: 'expectDate',
            sorter: (a, b) => a.expectDate > b.expectDate ? 1 : -1
        },
        {
            title: '部门名称',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '负责员工',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '修改人',
            dataIndex: 'changer',
            key: 'changer',
        },
        {
            title: '修改时间',
            dataIndex: 'changeTime',
            key: 'changeTime',
        },
        {
            title: '关闭员工',
            dataIndex: 'closeEmployee',
            key: 'closeEmployee',
        },
        {
            title: '关闭时间',
            dataIndex: 'closeTime',
            key: 'closeTime',
        }
    ];
    const headerContentSelect = [
        {label: 'dayNewChance', name: '今日新增机会', stopFlag: '1'},
        {label: 'weekNewChance', name: '本周新增机会', stopFlag: '2'},
        {label: 'monthNewChance', name: '本月新增机会', stopFlag: '1'},
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
        name: 'SalesChanceManagement',
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
            };
        },
        mounted() {
            this.getShowList()
        },
        methods: {
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/sales_chance_detail'})
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
                this.checkedList = arr || ['changer', 'changeTime']
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