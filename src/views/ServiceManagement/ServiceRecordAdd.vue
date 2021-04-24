<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">主题</span></span>
                        <a-input v-model="form.jrnlSubject"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">动作</span></span>
                        <a-select v-model="form.jrnlAction" style="width: 100%" placeholder="请选择动作">
                            <template v-for="item in actionData">
                                <a-select-option :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                            </template>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">工作记录对象</span></span>
                        <a-input v-model="form.jrnlTargetName" disabled/>
                        <a-button type="link" @click="selectCustomer" style="padding-left: 0">选择客户</a-button>
<!--                        <a-button type="link">选择合作伙伴</a-button>-->
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">分类</span></span>
                        <a-select v-model="form.jrnlClassName" style="width: 100%" @change="taskChange" placeholder="请选择分类">
                            <template v-for="(item, index) in workRecordData">
                                <a-select-option :key="item.jrnlClassId" :value="index" :taskType="item.taskType">{{item.jrnlClassName}}</a-select-option>
                            </template>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">开始时间</span></span>
                        <a-date-picker @change="getStartTime" show-time style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">结束时间</span></span>
                        <a-date-picker @change="getEndTime" show-time style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">部门名称</span></span>
                        <a-select v-model="form.deptId" style="width: 200px" placeholder="请选择">
                            <template v-for="item in deptList">
                                <a-select-option :key="item.deptId" :value="item.deptId">{{item.deptName}}</a-select-option>
                            </template>
                        </a-select>
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
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange"></modal-add-table>
    </a-layout>
</template>

<script>
    import api from '@/api/workRecord';
    import dept from '@/api/department';
    import friend from '@/api/friend';
    import moment from 'moment';
    import ModalAddTable from "../../components/ModalAddTable";

    const modalAddTableParams = {
        modalTitle: '产品分类选择',
        tableTitle: '分类列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
            total: 0,
            current: 1,
            page_size: 10
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

    export default {
        name: 'ServiceRecordAdd',
        components: {ModalAddTable},
        data() {
            return {
                modalAddColumns,
                modalAddTableParams,
                modalAddData: [],
                spinning: false,
                form: {
                    jrnlAction: undefined,
                    taskType: 4,
                    deptId: undefined,
                    taskClassId: undefined,
                    jrnlTargetName: ""
                },
                checked: true,
                btnLoading: false,
                actionData: [],
                workRecordData: [],
                deptList: []
            };
        },
        mounted() {
            this.getAction()
            this.getWorkRecordType()
            this.getDeptList()
        },
        methods: {
            getAction(){
                this.spinning = true
                api
                    .getAction()
                    .then((res) => {
                        console.log(res);
                        if(res.code == '0'){
                            this.actionData = res.data
                            this.spinning = false
                        }else{
                            this.$message.error(res.msg)
                            this.spinning = false
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        this.spinning = false
                    });
            },
            getWorkRecordType(){
                this.spinning = true
                let params = {type: 4}
                api
                    .getWorkRecordType(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.workRecordData = res.data
                        }
                        this.spinning = false
                    })
            },
            getDeptList(){
                this.spinning = true
                let params = {page: 1}
                dept
                    .getDepartmentList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.deptList = res.data.rows
                        }
                        this.spinning = false
                    })
            },
            selectCustomer(){
                this.$refs.tableAdd.open()
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '客户选择',
                    tableTitle: '客户列表',
                }
                this.modalAddColumns = [
                    {
                        title: '客户编码',
                        dataIndex: 'friendCode',
                        key: 'friendCode'
                    },
                    {
                        title: '客户名',
                        dataIndex: 'friendName',
                        key: 'friendName'
                    },
                    {
                        title: '客户助记符',
                        dataIndex: 'friendSimpleCode',
                        key: 'friendSimpleCode'
                    },
                    {
                        title: '电话',
                        dataIndex: 'friendMobilePhone',
                        key: 'friendMobilePhone'
                    },
                    {
                        title: '电子邮件',
                        dataIndex: 'friendEmail',
                        key: 'friendEmail'
                    }
                ]
                friend.getFriendList(params).then((res) => {
                    console.log(res);
                    if(res.code == 0){
                        const pagination = {...this.modalAddTableParams.pagination};
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.modalAddTableParams.pagination = pagination;
                        this.modalAddData = res.data.rows;
                    }
                    this.modalAddTableParams.loading = false;
                })
            },
            taskChange(e){
                this.form.taskType = this.workRecordData[e].taskType
                this.form.taskClassId = this.workRecordData[e].taskClassId
                this.form.jrnlClassName = this.workRecordData[e].jrnlClassName
            },
            getStartTime(val){
                this.form.jrnlStartTime = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            getEndTime(val){
                this.form.jrnlEndTime = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                console.log(this.form)
                if (!this.form.jrnlSubject) {
                    this.$message.error("请输入主题")
                    return -1
                }
                if (!this.form.jrnlAction) {
                    this.$message.error("请选择动作")
                    return -1
                }
                if (!this.form.friendId) {
                    this.$message.error("请选择记录对象")
                    return -1
                }
                if (!this.form.taskClassId) {
                    this.$message.error("请选择分类")
                    return -1
                }
                if (!this.form.jrnlStartTime) {
                    this.$message.error("请选择开始时间")
                    return -1
                }
                if (!this.form.jrnlEndTime) {
                    this.$message.error("请选择结束时间")
                    return -1
                }
                if (!this.form.deptId) {
                    this.$message.error("请选择部门")
                    return -1
                }
                console.log(this.form)
                this.btnLoading = true
                api
                    .postAddWorkRecord(this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('添加成功')
                            this.$router.push({path: '/service_management/service_record'})
                        }
                        this.btnLoading = false
                    })
            },
            tableSelectedHandle(val) {
                if (!val.length) {
                    return -1
                }
                console.log(val)
                this.form.friendId = val[0].friendId
                this.form.jrnlTargetName = val[0].friendName
            },
            modalTablePaginationChange(val) {
                this.modalAddTableParams.pagination = val
                this.selectCustomer()
            },
        }
    };
</script>

<style scoped>
    .submit-box {
        margin-top: 20px;
    }
</style>