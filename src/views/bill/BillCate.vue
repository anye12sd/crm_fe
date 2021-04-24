<template>
    <a-layout class="main-layout">
        <table-list
            :loading="loading"
            table-key="friendClassId"
            :columns="columns"
            :table-data="tableData"
            :buttons="buttons"
            batchBtn
            @on-add="add"
            @on-click-btn="clickBtnChange"
            @on-batch="batchChange"
        ></table-list>
        <a-drawer width="640" :title="title" :visible="visible" @close="handleCancel">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" label-align="right">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="单据类型" prop="billCateType">
                            <a-tree-select v-model="form.billCateType" :tree-data="mngDepts" treeDataSimpleMode tree-default-expand-all></a-tree-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="单据分类" prop="billCateName">
                            <a-input v-model="form.billCateName" placeholder="输入单据分类名称" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row v-if="statusEdit" :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="编码示例" prop="billCodeExamples">
                            <a-input v-model="form.billCodeExamples" placeholder="SV-2020-08-29-001" disabled />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="" prop="billCheckBox">
                            <a-checkbox :checked="form.billCheckBox" @change="handleChange">
                                必须审核
                            </a-checkbox>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <template v-if="statusEdit">
                    <a-tabs :default-active-key="tabKey" @change="onTabChange">
                        <a-tab-pane key="BILL" tab="单据属性"></a-tab-pane>
                        <a-tab-pane key="BILLDTL" tab="单据栏目"></a-tab-pane>
                    </a-tabs>
                    <div style="margin-bottom:15px;">
                        <a-button type="primary" icon="plus" @click="showChildrenDrawer(tabKey === 'BILL' ? 'BILL' : 'BILLDTL')">新增</a-button>
                    </div>
                    <a-table :columns="colums_BILL_BILLDTL" :dataSource="table_BILL_BILLDTL" rowKey="id">
                        <span slot="action" slot-scope="row">
                            <a-popconfirm
                                :title="'本操作将删除' + tabKey === 'BILL' ? '单据属性' : '单据栏目'"
                                ok-text="确认并删除"
                                cancel-text="取消"
                                @confirm="del_BILL_BILLDTL(row)"
                            >
                                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                                <a-tooltip title="删除">
                                    <a-button icon="delete"></a-button>
                                </a-tooltip>
                            </a-popconfirm>
                        </span>
                    </a-table>
                </template>
                <div class="drawer-form-footer">
                    <a-button :style="{ marginRight: '8px' }" @click="handleCancel">取消</a-button>
                    <a-button v-if="!statusEdit" :style="{ marginRight: '8px' }" @click="handleReset">重置</a-button>
                    <template v-else>
                        <a-button :style="{ marginRight: '8px' }" @click="stop(form)">停用</a-button>
                        <a-button :style="{ marginRight: '8px' }" @click="showChildrenDrawer('print')">打印模板</a-button>
                        <a-button :style="{ marginRight: '8px' }" @click="showChildrenDrawer('rule')">编码规则</a-button>
                        <a-button :style="{ marginRight: '8px' }" @click="del(form)">删除</a-button>
                    </template>
                    <a-button type="primary" @click="handleOk">保存</a-button>
                </div>
                <!-- 二级抽屉 -->
                <a-drawer :title="childrenTitle" width="320" :closable="false" :visible="childrenDrawer" @close="onChildrenDrawerClose">
                    <template v-if="childrenTitle === '打印模板'">
                        <!-- 打印模板 -->
                        <a-form-model>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="模板文件">
                                        <a-upload name="file" :multiple="true">
                                            <a-button><a-icon type="upload" />浏览...</a-button>
                                        </a-upload>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="附加模板文件">
                                        <a-upload name="file" :multiple="true">
                                            <a-button><a-icon type="upload" />浏览...</a-button>
                                        </a-upload>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    文件最大允许: 8388608 字节 (8.0 MB)
                                </a-col>
                            </a-row>
                        </a-form-model>
                    </template>
                    <template v-else-if="childrenTitle === '编码规则'">
                        <!-- 编码规则 -->
                        <a-form-model>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="单据分类" prop="billCateName">
                                        <a-input :value="form.billCateName" disabled />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="前缀（最大为 16）">
                                        <a-input value="SV" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="编码总长度">
                                        <a-input value="13" disabled />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="编码示例">
                                        <a-input value="SV-2020-08-29-001" disabled />
                                        (“-”只为示例显示，不包含于编码中)
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
                    </template>
                    <template v-else>
                        <!-- 单据属性/单据栏目 -->
                        <a-form-model :model="form" :rules="rules" layout="horizontal" label-align="right">
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="单据分类" prop="billCateName">
                                        <a-input :value="form.billCateName" disabled />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item label="可选属性">
                                        <a-checkbox>
                                            测试
                                        </a-checkbox>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
                    </template>
                    <div class="drawer-form-footer">
                        <a-button :style="{ marginRight: '8px' }" @click="handleCancel">取消</a-button>
                        <a-button type="primary" @click="handleOk">保存</a-button>
                    </div>
                </a-drawer>
            </a-form-model>
        </a-drawer>
    </a-layout>
</template>

<script>
// import api from '@/api/organization';
import TableList from '@/components/TableList';

export default {
    components: { TableList },
    data() {
        return {
            columns: [
                // { title: '序号', dataIndex: 'deptId', width: 100 },
                // { title: '状态', scopedSlots: { customRender: 'stopFlag' }, width: 100 },
                { title: '单据类型', dataIndex: 'deptCode' },
                { title: '单据分类', dataIndex: 'deptName' }
                // { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, width: 150 }
            ],
            colums_BILL_BILLDTL: [
                { title: '序号', dataIndex: 'id', width: 100 },
                { title: '属性', dataIndex: 'attr' },
                { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, width: 80 }
            ],
            buttons: ['edit', 'able', 'delete'],
            loading: false,
            tableData: [],
            table_BILL_BILLDTL: [
                {
                    id: 0,
                    attr: '单据属性名'
                }
            ],
            total: 0,
            current: 1,
            title: '分类信息', // model 标题
            visible: false, // modal 状态
            confirmLoading: false, // modal 确认状态
            selectedRowKeys: [], // 选中项
            expandedRowKeys: [], // 展开项
            bizDepts: [],
            mngDepts: [],
            form: {
                billCateType: '',
                billCateName: '',
                billCheckBox: false,
                billCodeExamples: 'SV-2020-08-29-001'
            },
            rules: {},
            tableHeight: 300, // 表格高度初始值
            isExtanded: false, // 全部展开状态
            activeRow: '', // 当前点击的行
            showEmpList: false,
            statusEdit: false, // false 新增 / true 修改状态
            childrenDrawer: false,
            childrenTitle: '编码规则',
            tabKey: 'BILL'
        };
    },
    computed: {
        page() {
            return parseInt(this.$route.query.page, 10) || 1;
        },
        pageSize() {
            return parseInt(this.$route.query.pageSize, 10) || 10;
        },
        showTotal() {
            return () => `共 ${this.total} 条记录`;
        }
    },
    watch: {
        $route() {
            this.showEmpList = this.$route.name === 'DeptEmpList';
        }
    },
    mounted() {
        this.showEmpList = this.$route.name === 'DeptEmpList';
        this.getTableData();
    },
    methods: {
        clickBtnChange(type, text, record, index) {
            switch (type) {
                case 'edit':
                    this.toEdit(text, record, index);
                    break;
                case 'able':
                    this.toChangeAble(text, record, index);
                    break;
                case 'delete':
                    this.toDel(text, record, index);
                    break;
            }
        },
        batchChange() {},
        // 获取表格数据
        getTableData() {
            const params = {
                page: this.page,
                pageSize: this.pageSize
            };
            this.loading = true;
            // api.getDepartments(params)
            //     .then((res) => {
            //         this.tableData = res.data.rows;
            //         this.total = res.data.count;
            //         this.loading = false;
            //     })
            //     .catch(() => {
            //         this.loading = false;
            //     });
        },
        // 表格分页变化时
        handleTableChange(pagination) {
            const { current, pageSize } = pagination;
            if (this.page !== current || this.pageSize || pageSize) {
                this.$router.push({ query: { page: current, pageSize } });
                this.getTableData();
            }
        },
        // 点击新增按钮
        async add() {
            const res = await this.getSelectOptions();
            this.bizDepts = res[0];
            this.mngDepts = res[1];
            this.title = '新增分类';
            this.visible = true;
            this.statusEdit = false;
        },
        // 点击表格中修改按钮
        toEdit(text, row, index) {
            if (row) {
                this.form = { ...row };
            }
            this.title = `修改分类 - ${row.deptName}`;
            this.visible = true;
            this.statusEdit = true;
        },
        // 点击表格中停用/启用按钮
        toChangeAble(text, row, index) {
            this.loading = true;
            const stopFlag = Math.abs(row.stopFlag - 1);
            // api.updateDepartment(row.deptId, { stopFlag })
            //     .then(() => {
            //         this.loading = false;
            //         const str = stopFlag === 1 ? '停用' : '启用';
            //         this.$message.success(`${str}成功`);
            //         this.getTableData();
            //     })
            //     .catch(() => {
            //         this.loading = false;
            //     });
        },
        // 点击表格中删除按钮
        toDel(text, row, index) {
            this.loading = true;
            // api.deleteDepartment(row.deptId)
            //     .then(() => {
            //         this.loading = false;
            //         this.$message.success('删除成功');
            //         this.getTableData();
            //     })
            //     .catch(() => {
            //         this.loading = false;
            //     });
        },
        async getSelectOptions() {
            // const promiseArray = [api.getBizDepts({ tree: 1 }), api.getMngDepts({ tree: 1 })];
            // const res = await Promise.all(promiseArray);
            const array = [];
            // array[0] = res[0].data.map((item) => {
            //     const row = {
            //         id: item.bizDeptId,
            //         pId: item.bizParentId,
            //         value: item.bizDeptId,
            //         label: item.bizDeptName
            //     };
            //     return row;
            // });
            // array[1] = res[1].data.map((item) => {
            //     const row = {
            //         id: item.mngDeptId,
            //         pId: item.mngParentId,
            //         value: item.mngDeptId,
            //         label: item.mngDeptName
            //     };
            //     return row;
            // });
            return array;
        },
        // 点击提交表单
        handleOk() {
            // 验证表单
            const _this = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.confirmLoading = true;
                    const { deptId } = this.form;
                    // 请求完成后的统一回调
                    const callback = (title) => {
                        this.confirmLoading = false;
                        this.handleCancel();
                        this.$message.success({
                            content: title,
                            onClose() {
                                _this.getTableData();
                            }
                        });
                    };
                    // 判断提交类型
                    // if (deptId) {
                    //     // 修改
                    //     api.updateDepartment(deptId, this.form)
                    //         .then(() => {
                    //             callback('更新成功');
                    //             this.statusEdit = false;
                    //         })
                    //         .catch(() => {
                    //             this.confirmLoading = false;
                    //         });
                    // } else {
                    //     // 新增
                    //     api.addDepartment(this.form)
                    //         .then((res) => {
                    //             callback('新增成功', res.data);
                    //         })
                    //         .catch(() => {
                    //             this.confirmLoading = false;
                    //         });
                    // }
                }
            });
        },
        // 点击隐藏表单
        handleCancel() {
            this.form = {
                deptId: null,
                deptCode: '',
                bizDeptId: null,
                mngDeptId: null,
                deptName: '',
                deptPhone: '',
                deptAddress: '',
                deptEmail: '',
                deptIntro: ''
            };
            this.visible = false;
        },
        // 选中或取消选中事件
        onSelectChange(selectedRowKeys) {
            // 返回被选中的业务机构
            this.selectedRowKeys = selectedRowKeys;
        },
        // 展开事件
        expandedRowsChange(expandedRowKeys) {
            this.expandedRowKeys = expandedRowKeys;
        },
        // 展开所有
        onExpandAll() {
            this.isExtanded = !this.isExtanded;
            if (this.isExtanded) {
                this.expandAllRowKeys(this.tableData);
            } else {
                this.expandedRowKeys = [];
            }
        },
        // 遍历所有树展开
        expandAllRowKeys(source) {
            source.forEach((item) => {
                this.expandedRowKeys.push(item.treePath);
                if (item.children) {
                    this.expandAllRowKeys(item.children);
                }
            });
        },
        // 批量删除
        batchDel() {
            const _this = this;
            this.$confirm({
                title: '确认删除',
                content: '本操作将删除选中业务机构及其下级业务机构',
                // onOk() {
                //     return new Promise((resolve) => {
                //         api.deleteDepartments(_this.selectedRowKeys).then(() => {
                //             _this.$message.success('删除成功');
                //             _this.selectedRowKeys = [];
                //             _this.getTableData();
                //             resolve();
                //         });
                //     });
                // }
            });
        },
        // 批量停用/启用
        batchStop(stopFlag) {
            const str = stopFlag === 1 ? '停用' : '启用';
            const _this = this;
            this.$confirm({
                title: `确认${str}`,
                content: `本操作将${str}选中部门`,
                // onOk() {
                //     return new Promise((resolve) => {
                //         api.updateDepartments({ deptId: _this.selectedRowKeys, data: { stopFlag } }).then(() => {
                //             _this.$message.success(`${str}成功`);
                //             _this.getTableData();
                //             _this.selectedRowKeys = [];
                //             resolve();
                //         });
                //     });
                // }
            });
        },
        // 设置行属性
        customRow(row) {
            return {
                attrs: {
                    class: this.activeRow === row.treePath ? 'active-tabel-row' : ''
                },
                on: {
                    click: () => {
                        this.activeRow = row.treePath;
                    }
                }
            };
        },
        // toEmpList(row) {
        //     this.showEmpList = true;
        //     this.$router.push({ name: 'DeptEmpList', query: { deptId: row.deptId } });
        // },
        // 表多选框变化时回调函数
        handleChange(e) {
            this.form.billCheckBox = e.target.checked;
        },
        // 重置表单
        handleReset() {
            this.form = {
                billCateType: '',
                billCateName: '',
                billCheckBox: false
            };
        },
        // 抽屉二级
        showChildrenDrawer(type) {
            this.childrenDrawer = true;
            if (type === 'print') {
                this.childrenTitle = '打印模板';
            } else if (type === 'rule') {
                this.childrenTitle = '编码规则';
            } else if (type === 'BILL') {
                this.childrenTitle = '单据属性';
            } else {
                this.childrenTitle = '单据栏目';
            }
        },
        onChildrenDrawerClose() {
            this.childrenDrawer = false;
        },
        // tab 的change事件
        onTabChange(e) {
            console.log(e);
            this.tabKey = e;
            if (e === 'BILL') {
                this.table_BILL_BILLDTL = [
                    {
                        id: 0,
                        attr: '单据属性名'
                    }
                ];
            } else {
                this.table_BILL_BILLDTL = [];
            }
        },
        // 点击表格中删除按钮
        del_BILL_BILLDTL(row) {
            console.log('删除', row);
        }
    }
};
</script>
