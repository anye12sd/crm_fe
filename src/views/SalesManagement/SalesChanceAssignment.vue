<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData"
                    :hasRowHeaderSelect="true"
                    :isCheckbox="true"
                    :headerContent="headerContent"
                    :headerContentSelect="headerContentSelect"
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
        <a-drawer
                class="hide-control-drawer"
                title="我的显示"
                width="35%"
                placement="right"
                :visible="visibleConfig"
                @close="onClose"
        >
            <a-checkbox class="check-all-button" :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                全选
            </a-checkbox>
            <a-checkbox-group v-model="checkedList" @change="checkShowColumn" >
                <template v-for="(item) in originColumns">
                    <div :key="item.key" class="checkbox-box">
                        <a-checkbox :value="item.title">
                            {{item.title}}
                        </a-checkbox>
                    </div>
                </template>
            </a-checkbox-group>
            <a-drawer
                    title="字段排序 "
                    width="40%"
                    :visible="childrenDrawer"
                    @close="onChildrenDrawerClose"
            >
                <a-table
                        :rowKey="originColumns.title"
                        :loading="loading"
                        :columns="columnsChildren"
                        :data-source="originColumns"
                        :pagination="false"
                        :customRow="customRow"
                >
                    <template slot="index" slot-scope="text, record, index">
                        {{ index + 1 }}
                    </template>
                    <template slot="actionChildren" slot-scope="text, record, index">
                        <a-button-group>
                            <a-tooltip title="上移">
                                <a-button icon="arrow-up" size="small" @click="moveUp(index)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="下移">
                                <a-button icon="arrow-down" size="small" @click="moveDown(index)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="移至最前">
                                <a-button icon="vertical-align-top" size="small" @click="moveTop(index)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="移至最后">
                                <a-button icon="vertical-align-bottom" size="small" @click="moveBottom(index)"></a-button>
                            </a-tooltip>
                            <!--                            <a-tooltip title="删除">-->
                            <!--                                <a-popconfirm-->
                            <!--                                        title="删除当前数据？"-->
                            <!--                                        ok-text="确认并删除"-->
                            <!--                                        cancel-text="取消"-->
                            <!--                                        @confirm="showDel(text, record, index)"-->
                            <!--                                >-->
                            <!--                                    <a-button icon="delete" size="small"></a-button>-->
                            <!--                                </a-popconfirm>-->
                            <!--                            </a-tooltip>-->
                        </a-button-group>
                    </template>
                </a-table>
            </a-drawer>
            <div
                    :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'left',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }"
            >
                <a-button style="margin-right: 8px" @click="showList"> 下一步</a-button>
                <a-button style="margin-right: 8px" @click="showOrderDrawer"> 显示顺序</a-button>
                <a-button style="margin-right: 8px" @click="showListRestore"> 还原默认</a-button>
                <a-button @click="hideList"> 取消</a-button>
            </div>
        </a-drawer>
    </a-layout>
</template>

<script>
    const tableData = [
        { theme: '21', category: 201, name: '中文', salesExpect: 'O', expectDate: '管理机构', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 120, name: '中文2', salesExpect: 'OA', expectDate: '总公司', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 430, name: '中文3', salesExpect: 'OAOA', expectDate: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 404, name: '中文4', salesExpect: 'O', expectDate: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 111, name: '中文5', salesExpect: 'OA', expectDate: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 65, name: '中文6', salesExpect: 'OAOA', expectDate: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' },
        { theme: '21', category: 7, name: '中文7', salesExpect: 'A', expectDate: '名称1', telephone: '', Email: '', address: '', link: '/SalesManagement/SalesChanceDetail' }
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
            sorter: (a, b) => a.createTime > b.createTime ? 1 : -1
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
            sorter: (a, b) => a.changeTime > b.changeTime ? 1 : -1
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
            sorter: (a, b) => a.closeTime > b.closeTime ? 1 : -1
        },
        {
            title: '相关员工',
            dataIndex: 'relatedMember',
            key: 'relatedMember',
        }
    ];
    const headerContentSelect = [
        {label: 'dayNewChance', name: '今日新增机会', stopFlag: '1'},
        {label: 'weekNewChance', name: '本周新增机会', stopFlag: '1'},
        {label: 'monthNewChance', name: '本月新增机会', stopFlag: '2'},
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
        name: 'SalesChanceAssignment',
        components: { TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                loading: false,
                headerContentSelect,
                tableData,
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                queryColumns,
                operateBtnFixed: true,
                operateFixed: true,
                headerContent: ['search', 'select', 'excel', 'statistics'],
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedListCache: [], //checkboxgroup已选中但是未点击保存的缓存项
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
                checkedKeys: [],
                visibleConfig: false,
                childrenDrawer: false,
                columnsChildren: [
                    {
                        title: '序号',
                        key: 'index',
                        dataIndex: 'index',
                        scopedSlots: { customRender: 'index' }
                    },
                    {
                        title: '字段名',
                        dataIndex: 'title',
                        key: 'title',
                        scopedSlots: { customRender: 'title' }
                    },
                    {
                        title: '操作',
                        dataIndex: 'actionChildren',
                        key: 'actionChildren',
                        scopedSlots: { customRender: 'actionChildren' }
                    }
                ],
                indeterminate: true,
                checkAll: true,
            };
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
            toDisplay() {
                // 每次都必须初始化checkedListCache为[1]来确定有没有对显示内容进行操作，否则直接点完显示顺序后点击保存会报错
                this.checkedListCache = [1]
                this.checkedList = []
                for(let i = 0; i < this.columns.length; i++){
                    this.checkedList.push(this.columns[i].title)
                }
                this.visibleConfig = true;
                this.loading = true;
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            onClose() {
                this.visibleConfig = false;
                this.loading = false;
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            onCheckAllChange(e) {
                let checkList = []
                for(let i = 0; i < this.originColumns.length; i++){
                    checkList.push(this.originColumns[i].title)
                }
                Object.assign(this, {
                    checkedList: e.target.checked ? checkList : [],
                    checkedListCache: e.target.checked ? checkList : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
            },
            checkShowColumn(checkedList){
                // 现将checkedListCache保存起来,在点击取消的时候重置为空数组，点击保存则存到this.checkedList里
                this.checkedListCache = checkedList
                this.indeterminate = !!checkedList.length && checkedList.length < this.originColumns.length;
                this.checkAll = checkedList.length === this.originColumns.length;
            },
            showList(){
                // 当includes(1)为false是表示已经对显示数据进行操作，必须对checkedList进行赋值操作
                if(this.checkedListCache.includes(1)){
                    this.visibleConfig = false;
                    return false
                }else{
                    this.checkedList = this.checkedListCache
                }
                this.columns = []
                // 保存需要显示的table 列
                for(let i = 0; i < this.originColumns.length; i++){
                    if(this.checkedList.includes(this.originColumns[i].title)){
                        this.columns.push(this.originColumns[i])
                    }
                }
                this.visibleConfig = false;
            },
            hideList(){
                this.checkedListCache = []
                this.visibleConfig = false;
            },
            showListRestore(){
                this.checkedList = []
                // 还原需要隐藏的列，使用originColumns会全部打钩，使用columns会打钩已显示的内容
                for(let i = 0; i < this.columns.length; i++){
                    this.checkedList.push(this.columns[i].title)
                }
            },
            showOrderDrawer() {
                this.childrenDrawer = true;
                this.loading = false;
            },
            onChildrenDrawerClose() {
                // this.checkedList = []
                // for(let i = 0; i < this.columns.length; i++){
                //     this.checkedList.push(this.columns[i].title)
                // }
                // console.log(this.checkedList)
                this.childrenDrawer = false;
                this.loading = false;
            },
            moveUp(index){
                if(index == 0){
                    return false
                }
                this.originColumns.splice(index - 1,1,...this.originColumns.splice(index,1,this.originColumns[index - 1])) //将第一个值和第二个值对换
            },
            moveDown(index){
                if(index + 1 == this.originColumns.length){
                    return false
                }
                console.log(this.checkedList)
                this.originColumns.splice(index + 1,1,...this.originColumns.splice(index,1,this.originColumns.[index + 1])) ////将第二个值和第一个值对换
            },
            moveTop(index){
                if(index == 0){
                    return false
                }
                this.originColumns.unshift(this.originColumns.splice(index,1)[0])
                console.log(this.originColumns)
            },
            moveBottom(index){
                if(index + 1 == this.originColumns.length){
                    return false
                }
                this.originColumns.push(this.originColumns.splice(index,1)[0])
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