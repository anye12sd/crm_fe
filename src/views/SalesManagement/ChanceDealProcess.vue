<!--机会处理过程-->
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
        { theme: '34', date: 201, changeTime: '中文', employee: 'O', customerName: '管理机构', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 120, changeTime: '中文2', employee: 'OA', customerName: '总公司', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 430, changeTime: '中文3', employee: 'OAOA', customerName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 404, changeTime: '中文4', employee: 'O', customerName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 111, changeTime: '中文5', employee: 'OA', customerName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 65, changeTime: '中文6', employee: 'OAOA', customerName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '34', date: 7, changeTime: '中文7', employee: 'A', customerName: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' }
    ];
    const columns = [
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '发表日期',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date > b.date ? 1 : -1
        },
        {
            title: '修改时间',
            dataIndex: 'changeTime',
            key: 'changeTime',
        },
        {
            title: '发表员工',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: '客户/伙伴名称',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: '主题',
            dataIndex: 'theme',
            key: 'theme',
            sorter: (a, b) => a.theme > b.theme ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        }
    ];
    const headerContentSelect = []
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
        name: 'ChanceDealProcess',
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
                buttons: [],
                headerContent: ['search', 'select', 'excel', 'displaylist', 'statistics'],
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
                this.checkedList = arr || ['content', 'date']
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