<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :operateBtnFixed="operateBtnFixed"
                    :headerContentSelect="headerContentSelect"
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
        { status: '', departmentCode: 201, departmentName: '中文', BusinessOrganCode: 'O', regionOrganName: '管理机构', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 120, departmentName: '中文2', BusinessOrganCode: 'OA', regionOrganName: '总公司', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 430, departmentName: '中文3', BusinessOrganCode: 'OAOA', regionOrganName: '名称1', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 404, departmentName: '中文4', BusinessOrganCode: 'O', regionOrganName: '名称1', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 111, departmentName: '中文5', BusinessOrganCode: 'OA', regionOrganName: '名称1', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 65, departmentName: '中文6', BusinessOrganCode: 'OAOA', regionOrganName: '名称1', telephone: '', Email: '', address: '' },
        { status: '', departmentCode: 7, departmentName: '中文7', BusinessOrganCode: 'A', regionOrganName: '名称1', telephone: '', Email: '', address: '' }
    ];
    const columns = [
        {
            title: '计划名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name ? 1 : -1
        },
        {
            title: '生命周期',
            dataIndex: 'cycle',
            key: 'cycle',
            scopedSlots: { customRender: 'departmentCode' },
            sorter: (a, b) => a.departmentCode > b.departmentCode ? 1 : -1
        },
        {
            title: '开始日期',
            dataIndex: 'startTime',
            key: 'startTime',
            sorter: (a, b) => a.startTime > b.startTime ? 1 : -1
        },
        {
            title: '结束日期',
            dataIndex: 'endTime',
            key: 'endTime',
            sorter: (a, b) => a.endTime > b.endTime ? 1 : -1
        },
        {
            title: '部门名称',
            dataIndex: 'departmentCode',
            key: 'departmentCode',
        },
        {
            title: '有效销售额',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount > b.amount ? 1 : -1
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
            sorter: (a, b) => a.createTime > b.createTime ? 1 : -1
        },
        {
            title: '修改人',
            dataIndex: 'changer',
            key: 'changer'
        },
        {
            title: '修改时间',
            dataIndex: 'changeTime',
            key: 'changeTime',
            sorter: (a, b) => a.changeTime > b.changeTime ? 1 : -1
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        }
    ];
    const headerContentSelect = [
        {label: 'yearCustomerResourcePlan', name: '本年客户资源计划', stopFlag: '1'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import TableList from '@/components/TableList';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'CustomerResourcePlan',
        components: {TableColumnSelectDrawer, TableList, MyQueryDrawer },
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
                buttons: ['view'],
                headerContent: ['search', 'select', 'excel', 'add', 'displaylist', 'statistics'],
                modalTitle: '加入收藏',
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
                this.checkedList = arr || ['startTime', 'endTime']
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