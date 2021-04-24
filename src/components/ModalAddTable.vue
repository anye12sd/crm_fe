<template>
    <a-modal
            v-model="visible"
            :title="modalAddTableParams.modalTitle"
            :closable="modalAddTableParams.hideCancelBtn"
            :wrapClassName="{ 'modalShowCancel': modalAddTableParams.hideCancelBtn }"
            @ok="tableSelected"
            width="1000px"
            :ok-text="modalAddTableParams.okText ? modalAddTableParams.okText : '选用'"
            cancel-text="取消"
            class="Fmodal"
            @close="onClose"
    >
<!--        <template slot="footer">-->
<!--            <a-button type="primary" @click="hideStatistics">-->
<!--                确定-->
<!--            </a-button>-->
<!--        </template>-->
        <a-row :gutter="24" v-if="modalAddTableParams.headerSearchParams.length">
            <a-form v-if="modalAddTableParams.headerSearchParams.length" layout="vertical" hide-required-mark class>
                <template v-for="(item, index) in modalAddTableParams.headerSearchParams">
<!--                    <a-col :key="index + 1" :span="8" v-if="item.type == 'code-input'">-->
<!--                        <a-form-item-->
<!--                                compact-->
<!--                                label="编码"-->
<!--                                :label-col="formItemLayout.labelColT"-->
<!--                                :wrapper-col="formItemLayout.wrapperColT"-->
<!--                        >-->
<!--                            <a-input-->
<!--                                    style="width: 59.886667px"-->
<!--                                    oninput="if(value.length > 3)value = value.slice(0, 3)"-->
<!--                            />-->
<!--                            <span>-</span>-->
<!--                            <a-input-->
<!--                                    style="width: 59.886667px"-->
<!--                                    oninput="if(value.length > 3)value = value.slice(0, 3)"-->
<!--                            />-->
<!--                            <span>-</span>-->
<!--                            <a-input-->
<!--                                    style="width: 59.886667px"-->
<!--                                    oninput="if(value.length > 3)value = value.slice(0, 4)"-->
<!--                            />-->
<!--                        </a-form-item>-->
<!--                    </a-col>-->
                    <a-col :key="index + 1" :span="8" v-if="item.type == 'input'">
                        <a-form-item
                                compact
                                :label="item.labelName"
                                :label-col="formItemLayout.labelColT"
                                :wrapper-col="formItemLayout.wrapperColT"
                        >
                            <a-input :placeholder="item.placeholder || ''" v-model="queryForm[item.paramsName]"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :key="index + 1" :span="8" v-if="item.type == 'select'">
                        <a-form-item
                                compact
                                :label="item.labelName"
                                :label-col="formItemLayout.labelColT"
                                :wrapper-col="formItemLayout.wrapperColT"
                        >
                            <a-select default-value @change="handleModalTableChange">
                                <template v-for="(item, index) in item.options">
                                    <a-select-option :key="index + 1" :value="item.value">{{item.value}}</a-select-option>
                                </template>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </template>
            </a-form>
            <a-col :span="24" class="search_this">
                <a-button block class="search" @click="querySearch">查询</a-button>
                <template v-if="modalAddTableParams.showAdvanceBtn">
                    <a-button
                            block
                            class="advanced_search"
                            @click="openAdvancedData"
                            v-if="advancedData"
                    >高级查询</a-button>
                    <a-button
                            block
                            class="advanced_search"
                            @click="offAdvancedData"
                            v-if="!advancedData"
                    >高级查询</a-button>
                </template>
            </a-col>
            <a-form
                    layout="vertical"
                    hide-required-mark
                    class="advanced_show"
                    v-if="!advancedData"
            >
                <a-col :span="8">
                    <a-form-item
                            compact
                            label="备注"
                            :label-col="formItemLayout.labelColT"
                            :wrapper-col="formItemLayout.wrapperColT"
                    >
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                            compact
                            label="联系人姓名"
                            :label-col="formItemLayout.labelColT"
                            :wrapper-col="formItemLayout.wrapperColT"
                    >
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                            compact
                            label="反应特性"
                            :label-col="formItemLayout.labelColT"
                            :wrapper-col="formItemLayout.wrapperColT"
                    >
                        <a-select default-value @change="handleChange"></a-select>
                    </a-form-item>
                </a-col>
            </a-form>
        </a-row>
        <a-row :gutter="24">
            <a-table
                    bordered
                    class="friend_table"
                    :columns="columns"
                    :data-source="data"
                    :row-key="(data, index) => modalAddTableParams.pagination ? (modalAddTableParams.pagination.current - 1)*10 + index : index"
                    :rowSelection="modalAddTableParams.hasRowHeaderSelect ? {
                      selectedRowKeys: selectedRowKeys,
                      onChange: onChangeChange,
                      onSelect: onSelectChange,
                      type: modalAddTableParams.isCheckbox ? 'checkbox' : 'radio'
                    }:null"
                    :loading="modalAddTableParams.loading"
                    :pagination="modalAddTableParams.pagination"
                    @change="handleModalTablePaginationChange"
                    size="middle"
                    :scroll="{ x: modalAddTableParams.operateBtnFixed ? columns.length * 130 : 0 }"
            >
                <template slot="title">
                    <div class="left">{{modalAddTableParams.tableTitle}}</div>
                    <div class="right" v-if="modalAddTableParams.headerContent.length">
                        <a @click="addFriend">新增</a>
                        <a-modal
                                v-model="friendInfor"
                                title="客户信息"
                                @ok="infoSearch"
                                width="1000px"
                                ok-text="保存"
                                cancel-text="取消"
                                class="Fmodal"
                        >
                            <a-row :gutter="24">
                                <a-form layout="vertical" hide-required-mark class>
                                    <a-col :span="8">
                                        <a-form-item
                                                compact
                                                label="客户编码"
                                                :label-col="formItemLayout.labelColT"
                                                :wrapper-col="formItemLayout.wrapperColT"
                                        >
                                            <a-input
                                                    style="width: 59.886667px"
                                                    oninput="if(value.length > 3)value = value.slice(0, 3)"
                                            />
                                            <span>-</span>
                                            <a-input
                                                    style="width: 59.886667px"
                                                    oninput="if(value.length > 3)value = value.slice(0, 3)"
                                            />
                                            <span>-</span>
                                            <a-input
                                                    style="width: 59.886667px"
                                                    oninput="if(value.length > 3)value = value.slice(0, 4)"
                                            />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                                compact
                                                label="客户名"
                                                :label-col="formItemLayout.labelColT"
                                                :wrapper-col="formItemLayout.wrapperColT"
                                        >
                                            <a-input allow-clear />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                                compact
                                                label="分类名称"
                                                :label-col="formItemLayout.labelColT"
                                                :wrapper-col="formItemLayout.wrapperColT"
                                        >
                                            <span>大客户</span>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                                compact
                                                label="最近联络时间"
                                                :label-col="formItemLayout.labelColT"
                                                :wrapper-col="formItemLayout.wrapperColT"
                                        >
                                            <span>---</span>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                                compact
                                                label="域名1"
                                                :label-col="formItemLayout.labelColT"
                                                :wrapper-col="formItemLayout.wrapperColT"
                                        >
                                            <a-input
                                                    allow-clear
                                                    v-decorator="[
                                      'gender',
                                      {
                                        rules: [
                                          { required: true, message: 'Please input your name' }
                                        ]
                                      }
                                    ]"
                                            />
                                        </a-form-item>
                                    </a-col>
                                </a-form>
                            </a-row>
                        </a-modal>
                    </div>
                </template>
            </a-table>
        </a-row>
    </a-modal>
</template>

<script>
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 },
        labelColy: { span: 6 },
        wrapperColy: { span: 16 },
        labelColT: { span: 8 },
        wrapperColT: { span: 16 }
    };

    export default {
        name: "ModalAddTable",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            columns: Array,
            data: Array,
            modalAddTableParams: Object
            // modalAddTableParams = { 参数解释
            //     modalTitle: '',
            //     tableTitle: '',
            //     hasRowHeaderSelect: true, 是否可选
            //     isCheckbox: false, 可选时为checkbox还是radio形式
            //     headerContent: [], 表格顶部是否有新增或者其它按钮
            //     loading: false, 表格loading状态
            //     showAdvanceBtn: false 是否展示高级查询按钮,
            //     hideCancelBtn: false, 是否显示modal底部的cancel按钮，用css隐藏的，不是slot
            //     headerSearchParams: [ 顶部查询显示参数
            //         {
            //             type: 'code-input',
            //             labelName: '分类编码',
            //             placeholder: '',
            //             paramsName: 'remark'  需要传值到后台的参数即v-model，select的则不用写，到回调函数那儿添加
            //         },
            //         {
            //             type: 'input',
            //             labelName: '分类编码'
            //         },
            //         {
            //             type: 'select',
            //             labelName: '分类编码'
            //             options: [
            //                 {label: '0', value: 'select1'},
            //                 {label: '1', value: 'select2'},
            //             ]
            //         }
            //     ]
            // }
        },
        data() {
            return {
                formItemLayout,
                queryForm: {},
                advancedData: true,
                visible: false,
                friendInfor: false,
                selectedRowKeys: [],
            };
        },
        methods: {
            open() {
                this.visible = true;
                console.log(this.modalAddTableParams)
            },
            onClose() {
                this.visible = false;
                this.$emit('modal-close')
            },
            tableSelected() {
                this.visible = false;
                let selectedColumns = []
                for (let i = 0; i < this.selectedRowKeys.length; i++){
                    selectedColumns.push(this.data[this.selectedRowKeys[i]])
                }
                this.$emit("tableSelected", selectedColumns)
                this.selectedRowKeys = []
            },
            querySearch(){
                console.log(this.queryForm)
            },
            openAdvancedData() {
                this.advancedData = !this.advancedData;
            },
            offAdvancedData() {
                this.advancedData = !this.advancedData;
            },
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            onChangeChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
            },
            onSelectChange(record, selected, selectedRows, nativeEvent) {
                this.$emit('on-select-change', record, selected)
            },
            addFriend() {
                this.friendInfor = true;
            },
            infoSearch() {
                this.friendInfor = false;
            },
            handleModalTableChange(val){
                this.queryForm.select = val
            },
            handleModalTablePaginationChange(pagination) {
                this.$emit('on-modalTablePagination-change', pagination);
            }
        }
    }
</script>

<style scoped>

</style>