<!--发票列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"
                    :headerContentSelect="headerContentSelect"
                    :operateBtnFixed="operateBtnFixed"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
        >
        </table-list>
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
        { date: '', returnCode: 201, orderStatus: '中文', amount: 'O', departmentCode: '管理机构', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 120, orderStatus: '中文2', amount: 'OA', departmentCode: '总公司', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 430, orderStatus: '中文3', amount: 'OAOA', departmentCode: '名称1', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 404, orderStatus: '中文4', amount: 'O', departmentCode: '名称1', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 111, orderStatus: '中文5', amount: 'OA', departmentCode: '名称1', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 65, orderStatus: '中文6', amount: 'OAOA', departmentCode: '名称1', telephone: '', Email: '', address: '' },
        { date: '', returnCode: 7, orderStatus: '中文7', amount: 'A', departmentCode: '名称1', telephone: '', Email: '', address: '' }
    ];
    const columns = [

    ];
    const headerContentSelect = [

    ]
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';

    export default {
        name: 'SalesReturnGoodsList',
        components: { TableList, DrawerSearch },
        data() {
            return {
                loading: false,
                tableData,
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                headerContentSelect,
                operateBtnFixed: true,
                buttons: ['view'],
                headerContent: ['displaylist', 'select', 'search', 'add'],
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
            toSearch() {
                this.$refs.drawer.open();
            },
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
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/product_info_detail'})
                }
            }
        }
    };
</script>

<style scoped></style>