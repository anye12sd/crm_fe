<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="false" tip="加载中。。。">
                <a-descriptions bordered>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">主题</span></span>
                        <a-input v-model="form.noticeSubject" placeholder="产品助记符"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="重要性" :span="1">
                        <a-select
                                style="width: 100%"
                                placeholder="请选择重要性"
                                v-model="form.noticeSeverity"
                                allowClear
                        >
                            <a-select-option v-for="(item) in SeverityData" :key="item.value"
                                             :value="item.value">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="内容" :span="2">
                        <a-textarea v-model="form.noticeMemo" placeholder="内容"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">类型</span></span>
                        <a-select v-model="form.noticeType" style="width: 100%">
                            <a-select-option :value="3">
                                订阅消息
                            </a-select-option>
                            <a-select-option :value="2">
                                系统消息
                            </a-select-option>
                            <a-select-option :value="1">
                                员工消息
                            </a-select-option>
                            <a-select-option :value="101">
                                已发消息
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="3">
                        <span slot="label"><span class="description-unemptyable">接收员工</span></span>
                        <a-input v-model="form.empNameString" disabled/>
                        <a-button type="link" style="padding-left: 0" @click="toOpenTableAdd">新增</a-button>
                        <a-button type="link" @click="resetMember">清除</a-button>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px"> 重置</a-button>
                <a-button size="small" @click="$router.go(-1)">退出</a-button>
            </div>
        </a-layout-header>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle"></modal-add-table>
    </a-layout>
</template>

<script>
    const modalAddTableParams = {
        modalTitle: '员工选择',
        tableTitle: '员工列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: true,
        headerSearchParams: [],
    }
    const modalAddColumns = [
        {
            title: '员工编码',
            dataIndex: 'empCode',
            key: 'empCode'
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName'
        },
        {
            title: '助记码',
            dataIndex: 'empSimpleCode',
            key: 'empSimpleCode'
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '移动电话',
            dataIndex: 'empMobilePhone',
            key: 'empMobilePhone'
        },
        {
            title: '办公电话',
            dataIndex: 'empOfficePhone',
            key: 'empOfficePhone'
        },
        {
            title: '电子邮件',
            dataIndex: 'empEmail',
            key: 'empEmail'
        },
    ]
    import api from '@/api/message';
    import memberApi from '@/api/member';
    import ModalAddTable from "../../components/ModalAddTable";

    export default {
        name: 'MessageAdd',
        components: {ModalAddTable,},
        data() {
            return {
                modalAddColumns,
                modalAddTableParams,
                modalAddData: [],
                spinning: true,
                form: {
                    noticeType: 3,
                    noticeSeverity: undefined,
                    strEmp: [],
                    empName: [],
                    empNameString: "",
                    noticeMemo: "",
                    noticeSubject: ""
                },
                checked: true,
                showData: true,
                btnLoading: false,
                advancedData: true,
                visible: false,
                selectedRowKeys: [],
                SeverityData: []
            };
        },
        mounted() {
            this.getSeverityList()
        },
        methods: {
            getSeverityList(){
                api
                    .getSeverityList()
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.SeverityData = res.data
                        }
                    })
            },
            toOpenTableAdd() {
                let params = { page: 1}
                this.$refs.tableAdd.open();
                this.modalAddTableParams.loading = true;
                memberApi
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        const pagination = {...this.pagination};
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.modalAddData = res.data.rows;
                        this.modalAddTableParams.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            infoSearch() {
                this.friendInfor = false;
            },
            onReset() {
                this.form = {noticeType: 3, noticeSeverity: 1};
            },
            saveForm() {
                if (!this.form.noticeType) {
                    this.$message.error("请选择消息类型")
                    return -1
                }
                if (!this.form.noticeSubject) {
                    this.$message.error("请输入消息主题")
                    return -1
                }
                if (!this.form.strEmp.length) {
                    this.$message.error("请选择接收员工")
                    return -1
                }
                console.log(this.form)
                this.btnLoading = true
                api
                    .postMessageAdd(this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('添加成功')
                            this.btnLoading = false
                        }
                    })
            },
            tableSelectedHandle(val) {
                console.log(val)
                this.form.strEmp = []
                this.form.empName = []
                if (!val.length) {
                    return -1
                }
                for(var i = 0; i < val.length; i++){
                    this.form.strEmp.push(val[i].empId)
                    this.form.empName.push(val[i].empName)
                }
                this.form.empNameString = this.form.empName.toString()
            },
            resetMember(){
                this.form.prodName = ""
            }
        }
    };
</script>

<style>
    .submit-box {
        margin-top: 20px;
    }
</style>