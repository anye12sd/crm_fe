<template>
    <a-drawer
            class="hide-control-drawer client-drawer"
            title="我的显示"
            width="35%"
            placement="right"
            :visible="visibleConfig"
            @close="hideList"
    >
        <a-checkbox class="check-all-button" :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            全选
        </a-checkbox>
        <a-checkbox-group v-model="checkedList" @change="checkShowColumn">
            <template v-for="(item) in originColumns">
                <div :key="item.dataIndex" class="checkbox-box">
                    <a-checkbox :value="item.dataIndex">
                        {{ item.title }}
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
                    :rowKey="unSavedColumns.title"
                    :columns="columnsChildren"
                    :data-source="unSavedColumns"
                    :pagination="false"
                    :customRow="customRow"
            >
                <template slot="e" slot-scope="text, record, index">
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
                            <a-button
                                    icon="vertical-align-bottom"
                                    size="small"
                                    @click="moveBottom(index)"
                            ></a-button>
                        </a-tooltip>
                        <!-- <a-tooltip title="删除">
                        <a-popconfirm
                          title="删除当前数据？"
                          ok-text="确认并删除"
                          cancel-text="取消"
                          @confirm="showDel(text, record, index)"
                        >
                          <a-button icon="delete" size="small"></a-button>
                        </a-popconfirm>
                      </a-tooltip> -->
                    </a-button-group>
                </template>
            </a-table>
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
                <a-button style="margin-right: 8px" @click="postShow"> 保存</a-button>
                <a-button @click="onChildrenDrawerClose"> 取消</a-button>
            </div>
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
            <!--                <a-button style="margin-right: 8px" @click="showOrderDrawer"> 显示顺序</a-button>-->
            <a-button style="margin-right: 8px" @click="showListRestore"> 还原默认</a-button>
            <a-button @click="hideList"> 取消</a-button>
        </div>
    </a-drawer>
</template>

<script>
    export default {
        name: "TableColumnSelectDrawer",
        props: {
            checkedListProps: Array,
            childrenDrawerProps: Boolean,
            columns: Array,
            visibleConfig: {
                type: Boolean,
                default: () => {
                    return false
                }
            }
        },
        data(){
            return {
                //需要originColumns来重置新的columns，originColumns不可修改
                originColumns: this.columns,
                unSavedColumns: [],
                columnsChildren: [
                    {
                        title: '序号',
                        key: 'e',
                        dataIndex: 'e',
                        scopedSlots: {customRender: 'e'}
                    },
                    {
                        title: '字段名',
                        dataIndex: 'title',
                        key: 'title'
                    },
                    {
                        title: '操作',
                        dataIndex: 'actionChildren',
                        key: 'actionChildren',
                        scopedSlots: {customRender: 'actionChildren'}
                    }
                ],
                indeterminate: true,
                checkAll: true,
                childrenDrawer: false,
                //checkboxgroup已选中但是未点击保存的缓存项
                checkedListCache: [],
                //checkboxgroup里需要默认选中的项
                checkedKeys: [],
                checkedList: []
            }
        },
        watch: {
            visibleConfig(val, oldVal){//普通的watch监听
                if(val){
                    this.getColumns()
                }
            },
            childrenDrawerProps(val, oldVal){//普通的watch监听
                this.childrenDrawer = val
            },
            columns: {
                handler(val, oldVal){
                    this.originColumns = val
                },
                deep: true
            }
        },
        methods: {
            // 选中行
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
            getColumns(){
                if(!this.checkedListProps.length){
                    return -1
                }
                this.checkedList = this.checkedListProps
            },
            onClose() {
                this.tableVisibleConfig = false;
            },
            showOrder() {
                this.childrenDrawer = true;
            },
            onChildrenDrawerClose() {
                this.childrenDrawer = false;
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            onCheckAllChange(e) {
                let checkList = [];
                for (let i = 0; i < this.originColumns.length; i++) {
                    checkList.push(this.originColumns[i].dataIndex);
                }
                Object.assign(this, {
                    checkedList: e.target.checked ? checkList : [],
                    indeterminate: false,
                    checkAll: e.target.checked
                });
            },
            checkShowColumn(checkedList) {
                // 现将checkedListCache保存起来,在点击取消的时候重置为空数组，点击保存则存到this.checkedList里
                this.checkedListCache = checkedList;
                this.indeterminate = !!checkedList.length && checkedList.length < this.originColumns.length;
                this.checkAll = checkedList.length === this.originColumns.length;
            },
            showList() {
                this.unSavedColumns = [];
                // 保存需要显示的table 列
                // this.checkedList = this.checkedListCache;
                for (let i = 0; i < this.originColumns.length; i++) {
                    if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                        this.unSavedColumns.push(this.originColumns[i]);
                    }
                }
                this.showOrderDrawer()
            },
            hideList() {
                this.checkedListCache = [];
                this.$emit('hideDrawer', false)
            },
            showListRestore() {
                console.log(this.originColumns)
                this.checkedList = [];
                // 还原需要隐藏的列，使用originColumns会全部打钩，使用columns会打钩已显示的内容
                for (let i = 0; i < this.columns.length; i++) {
                    this.checkedList.push(this.columns[i].dataIndex);
                }
            },
            showOrderDrawer() {
                this.childrenDrawer = true;
            },
            moveUp(index) {
                if (index == 0) {
                    return false;
                }
                this.unSavedColumns.splice(
                    index - 1,
                    1,
                    ...this.unSavedColumns.splice(index, 1, this.unSavedColumns[index - 1])
                ); //将第一个值和第二个值对换
            },
            moveDown(index) {
                if (index + 1 == this.unSavedColumns.length) {
                    return false;
                }
                this.unSavedColumns.splice(
                    index + 1,
                    1,
                    ...this.unSavedColumns.splice(index, 1, this.unSavedColumns[index + 1])
                ); ////将第二个值和第一个值对换
            },
            moveTop(index) {
                if (index == 0) {
                    return false;
                }
                this.unSavedColumns.unshift(this.unSavedColumns.splice(index, 1)[0]);
            },
            moveBottom(index) {
                if (index + 1 == this.unSavedColumns.length) {
                    return false;
                }
                this.unSavedColumns.push(this.unSavedColumns.splice(index, 1)[0]);
            },
            postShow(){
                this.$emit('postShow', this.unSavedColumns)
            }
        }
    }
</script>

<style scoped>

</style>