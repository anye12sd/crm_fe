<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">反馈分类</span></span>
                        <a-select
                                style="width: 100%"
                                placeholder="请选择反馈分类"
                                v-model="form.fdbkClassId"
                                @change="fdbkClassChange"
                                allowClear
                        >
                            <a-select-option v-for="(item) in fdbkClassData" :key="item.fdbkClassId"
                                             :value="item.fdbkClassId">
                                {{ item.fdbkClassName }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="反馈类型" :span="1">
                        <a-select
                                style="width: 100%"
                                placeholder="请选择反馈类型"
                                v-model="form.fdbkTypeId"
                                @change="fdbkTypeChange"
                                allowClear
                        >
                            <a-select-option v-for="(item) in fdbkTypeData" :key="item.value"
                                             :value="item.value">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">反馈状态</span></span>
                        <a-select
                                style="width: 100%"
                                placeholder="请选择状态"
                                v-model="form.fdbkStatus"
                                @change="fdbkStatusChange"
                                allowClear
                        >
                            <a-select-option v-for="item in fdbkStatusData" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">重要性</span></span>
                        <a-select
                                style="width: 100%"
                                placeholder="请选择重要性"
                                v-model="form.fdbkSeverity"
                                @change="fdbkSeverityChange"
                                allowClear
                        >
                            <a-select-option v-for="(item) in fdbkSeverityData" :key="item.value"
                                             :value="item.value">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">主题</span></span>
                        <a-input v-model="form.fdbkSubject" placeholder="主题"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="解决期限" :span="1">
                        <a-date-picker @change="getSoDate" style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">反馈对象类型</span></span>
                        <a-radio-group v-model="form.fdbkTargetType">
                            <template v-for="item in fdbkTargetTypeOptions">
                                <a-radio :value="item.value" :key="item.value" @click="getFdbkTargetType(item.value)">
                                    {{item.label}}
                                </a-radio>
                            </template>
                        </a-radio-group>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">部门名称</span></span>
                        <a-select
                                style="width: 100%"
                                placeholder="请选择部门"
                                v-model="form.deptId"
                                @change="deptChange"
                                allowClear
                        >
                            <a-select-option v-for="(item) in deptList" :key="item.deptId"
                                             :value="item.deptId">
                                {{ item.deptName }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">反馈对象</span></span>
                        <a-input v-model="form.fdbkTargetName" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">负责员工</span></span>
                        <a-input v-model="form.empName" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="memberSearch"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">反馈者类型</span></span>
                        <a-radio-group v-model="form.fdbkSrcType">
                            <template v-for="item in fdbkSrcTypeOptions">
                                <a-radio :value="item.value" :key="item.value" @click="getFdbkSrcType(item.value)">
                                    {{item.label}}
                                </a-radio>
                            </template>
                        </a-radio-group>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">反馈者</span></span>
                        <a-input v-model="form.fdbkSrcName" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item label="反馈者电话" :span="1">
                        <a-input v-model="form.fdbkPhone" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item label="反馈者邮箱" :span="1">
                        <a-input v-model="form.fdbkEmail" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item label="处理结果" :span="1">
                        <a-input v-model="form.fdbkResult"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="描述" :span="3">
                        <a-input v-model="form.fdbkIntro"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="备注" :span="3">
                        <a-textarea v-model="form.fdbkMemo" allow-clear/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px">重置</a-button>
                <a-button size="small" @click="$router.go(-1)">退出</a-button>
            </div>
        </a-layout-header>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange"></modal-add-table>
    </a-layout>
</template>

<script>
    let modalAddTableParams = {
        modalTitle: '员工选择',
        tableTitle: '员工列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [
            // {
            //     type: 'input',
            //     labelName: '分类编码',
            //     placeholder: '请输入',
            //     paramsName: 'code'
            // },
            // {
            //     type: 'input',
            //     labelName: '产品分类',
            //     paramsName: 'category'
            // },
            // {
            //     type: 'input',
            //     labelName: '备注',
            //     paramsName: 'remark'
            // },
            // {
            //     type: 'select',
            //     labelName: '选择',
            //     options: [
            //         {label: '0', value: 'select1'},
            //         {label: '1', value: 'select2'},
            //     ],
            // }
        ],
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    }
    let modalAddColumns = [
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
            title: '助记符',
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
    import api from '@/api/feedback';
    import dept from '@/api/department';
    import member from '@/api/member';
    import product from '@/api/product';
    import ModalAddTable from "../../components/ModalAddTable";
    import moment from 'moment';
    import friend from '@/api/friend';

    export default {
        name: 'FdbkAdd',
        components: {ModalAddTable,},
        data() {
            return {
                modalAddColumns,
                modalAddTableParams,
                modalAddData: [],
                spinning: false,
                form: {
                    fdbkTypeId: undefined,
                    fdbkTargetType: "",
                    fdbkSrcType: "",
                    empName: "",
                    deptId: undefined,
                    fdbkSrcName: "",
                    fdbkTargetName: ""
                },
                deptList: [],
                checked: true,
                CheckboxValue: [],
                tableFlag: "",
                fdbkTargetTypeOptions: [
                    {id: 1, value: '产品'},
                    // {id: 2, value: '服务'},
                    {id: 3, value: '员工'},
                    // {id: 4, value: '伙伴'},
                ],
                fdbkSrcTypeOptions: [
                    {id: 1, value: '客户'},
                    // {id: 2, value: '合作伙伴'},
                    // {id: 3, value: '员工'},
                    // {id: 4, value: '供应商'},
                ],
                fdbkTypeData: [],
                fdbkClassData: [],
                fdbkStatusData: [],
                fdbkSeverityData: [],
                showData: true,
                btnLoading: false,
                advancedData: true,
                productSecondCode: "0001",
                checkedValues: [],
                visible: false,
                friendModal: false,
                friendInfor: false,
                selectedRowKeys: [],
                selectedFriend: '',
                pagination: {
                    total: 1,
                    current: 1,
                    pageSize: 10,
                },
            };
        },
        mounted() {
            this.fetchFdbkParams() // 反馈相关选项
            this.fetchFdbkClass() // 反馈分类
            this.fetchDept() // 部门
            if(this.$route.query.editMode && this.$route.query.code){
                this.getDetail()
            }
        },
        methods: {
            fetchFdbkParams(){
                api
                    .getFdbkParams()
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.fdbkSeverityData = res.data.fdbkSeverity
                            this.fdbkStatusData = res.data.fdbkStatus
                            this.fdbkTypeData = res.data.fdbkType
                            this.fdbkSrcTypeOptions = res.data.fdbkSrcType
                            this.fdbkTargetTypeOptions = res.data.fdbkTargetType
                        }
                    })
            },
            fetchFdbkClass(){
                api
                    .getFdbkclass()
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.fdbkClassData = res.data
                        }
                    })
            },
            fetchDept(){
                dept
                    .getDepartmentList()
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.deptList = res.data.rows
                        }
                    })
            },
            getDetail(){
                this.spinning = true
                api.getFdbkDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.form = {
                            fdbkTypeId: data.fdbkType.value,
                            fdbkClassName: data.fdbkClassName,
                            fdbkClassId: data.fdbkClassId,
                            fdbkStatus: data.fdbkStatus.value,
                            fdbkSeverity: data.fdbkSeverity.value,
                            fdbkSubject: data.fdbkSubject,
                            fdbkDueDate: data.fdbkDueDate ? new Date(+new Date(data.fdbkDueDate) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : "",
                            feedbackTargetType: '',
                            departmentName: '',
                            fdbkTargetName: data.fdbkTargetName,
                            empName: data.fdbkMngrEmpName,
                            feedbackerType: '',
                            createTime: '',
                            feedbacker: '',
                            creator: '',
                            feedbackerPhone: '',
                            feedbackerMail: '',
                            changeTime: '',
                            closeMember: '',
                            closeTime: '',
                            changer: '',
                            description: '',
                            result: ''
                        };
                        this.$nextTick(function(){
                            document.getElementsByClassName('ant-page-header-heading-title')[0].innerText = '修改反馈'
                            document.getElementsByClassName('ant-breadcrumb-link')[document.getElementsByClassName('ant-breadcrumb-link').length - 1].innerHTML = '<span>修改反馈</span>'
                        })
                    }
                    this.spinning = false
                })
            },
            toOpenTableAdd() {
                this.modalAddTableParams.pagination.current = 1
                this.$refs.tableAdd.open();
                this.modalAddTableParams.loading = true;
                switch (this.tableFlag) {
                    case '负责员工选择':
                        this.getMemberList()
                        break
                    case '反馈对象类型产品':
                        this.getTargetProductList()
                        break
                    case '反馈对象类型员工':
                        this.getTargetMemberList()
                        break
                    case '反馈者类型客户':
                        this.getSrcCustomerList()
                        break
                }
            },
            getMemberList(){
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '员工选择',
                    tableTitle: '员工列表',
                    hasRowHeaderSelect: true,
                    hideCancelBtn: true,
                    isCheckbox: false,
                    headerContent: [],
                    loading: true,
                    showAdvanceBtn: false,
                    headerSearchParams: [],
                }
                this.modalAddColumns = [
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
                        title: '助记符',
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
                let params = { page: this.modalAddTableParams.pagination.current }
                member
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            getTargetProductList(){
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '产品选择',
                    tableTitle: '产品列表',
                    hasRowHeaderSelect: true,
                    hideCancelBtn: true,
                    isCheckbox: false,
                    headerContent: [],
                    loading: true,
                    showAdvanceBtn: false,
                    headerSearchParams: [],
                }
                this.modalAddColumns = [
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status'
                    },
                    {
                        title: '产品分类',
                        dataIndex: 'prodClassName',
                        key: 'prodClassName',
                    },
                    {
                        title: '产品编码',
                        dataIndex: 'prodCode',
                        key: 'prodCode',
                    },
                    {
                        title: '产品助记符',
                        dataIndex: 'prodSimpleCode',
                        key: 'prodSimpleCode',
                    },
                    {
                        title: '产品名称',
                        dataIndex: 'prodName',
                        key: 'prodName',
                        // sorter: (a, b) => a.prodName > b.prodName ? 1 : -1,
                    },
                    {
                        title: '描述',
                        dataIndex: 'description',
                        key: 'description'
                    },
                    {
                        title: '计量单位',
                        dataIndex: 'unitName',
                        key: 'unitName'
                    },
                    {
                        title: '定价',
                        dataIndex: 'prodListPrice',
                        key: 'prodListPrice',
                    },
                    {
                        title: '单位成本',
                        dataIndex: 'unitcost',
                        key: 'unitcost',
                    },
                    {
                        title: '采购参考价',
                        dataIndex: 'purchaseReferencePrice',
                        key: 'purchaseReferencePrice',
                    },
                    {
                        title: '消费周期（天）',
                        dataIndex: 'consumptionCycle',
                        width: 150,
                        key: 'consumptionCycle',
                    },
                    {
                        title: '组合产品',
                        dataIndex: 'compose',
                        key: 'compose'
                    },
                    {
                        title: '可采购',
                        dataIndex: 'purchasable',
                        key: 'purchasable'
                    },
                    {
                        title: '可销售',
                        dataIndex: 'saleable',
                        key: 'saleable'
                    },
                    {
                        title: '序列号管理',
                        dataIndex: 'serialNumber',
                        key: 'serialNumber',
                    },
                    {
                        title: '当前库存',
                        dataIndex: 'stock',
                        key: 'stock',
                    },
                    {
                        title: '创建人',
                        dataIndex: 'Creator',
                        key: 'Creator',
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
                        title: '场地费',
                        dataIndex: 'siteFee',
                        key: 'siteFee',
                    }
                ]
                let params = { page: this.modalAddTableParams.pagination.current }
                product
                    .getProductList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            getTargetMemberList(){
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '员工选择',
                    tableTitle: '员工列表',
                    hasRowHeaderSelect: true,
                    hideCancelBtn: true,
                    isCheckbox: false,
                    headerContent: [],
                    loading: true,
                    showAdvanceBtn: false,
                    headerSearchParams: [],
                }
                this.modalAddColumns = [
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
                        title: '助记符',
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
                let params = { page: this.modalAddTableParams.pagination.current }
                member
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            getSrcCustomerList(){
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '客户选择',
                    tableTitle: '客户列表',
                    hasRowHeaderSelect: true,
                    hideCancelBtn: true,
                    isCheckbox: false,
                    headerContent: [],
                    loading: true,
                    showAdvanceBtn: false,
                    headerSearchParams: [],
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
                        title: '助记符',
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
                    },
                ]
                let params = { page: this.modalAddTableParams.pagination.current }
                friend
                    .getFriendList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            tableSelectedHandle(val) {
                switch (this.tableFlag) {
                    case '负责员工选择':
                        this.form.fdbkMngrEmpId = val[0].empId
                        this.form.empName = val[0].empName
                        break
                    case '反馈对象类型产品':
                        this.form.fdbkTargetName = val[0].prodName
                        this.form.fdbkTargetId = val[0].prodId
                        break
                    case '反馈对象类型员工':
                        this.form.fdbkTargetName = val[0].empId
                        this.form.fdbkTargetId = val[0].empName
                        break
                    case '反馈者类型客户':
                        this.form.fdbkSrcId = val[0].friendId
                        this.form.fdbkSrcName = val[0].friendName
                        this.form.fdbkPhone = val[0].friendMobilePhone
                        this.form.fdbkEmail = val[0].friendEmail
                        break
                }
            },
            memberSearch() {
                this.tableFlag = '负责员工选择'
                this.toOpenTableAdd()
            },
            fdbkTypeChange(value) {
                this.form.fdbkTypeId = value;
            },
            fdbkClassChange(value) {
                this.form.fdbkClassId = value;
            },
            fdbkStatusChange(value) {
                this.form.fdbkStatus = value;
            },
            fdbkSeverityChange(value) {
                this.form.fdbkSeverity = value;
            },
            deptChange(value) {
                this.form.deptId = value;
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                if (!this.form.fdbkClassId) {
                    this.$message.error("请选择反馈分类")
                    return -1
                }
                if (!this.form.fdbkStatus) {
                    this.$message.error("请选择反馈状态")
                    return -1
                }
                if (!this.form.fdbkSeverity) {
                    this.$message.error("请选择反馈重要性")
                    return -1
                }
                if (!this.form.fdbkSubject) {
                    this.$message.error("请选择反馈主题")
                    return -1
                }
                if (!this.form.fdbkTargetType) {
                    this.$message.error("请选择反馈对象")
                    return -1
                }
                if (!this.form.deptId) {
                    this.$message.error("请选择部门")
                    return -1
                }
                if (!this.form.fdbkMngrEmpId) {
                    this.$message.error("请选择负责员工")
                    return -1
                }
                if (!this.form.fdbkSrcId || !this.form.fdbkSrcType) {
                    this.$message.error("请选择反馈者")
                    return -1
                }
                if(this.$route.query.editMode){
                    this.putForm()
                    return  -1
                }
                this.btnLoading = true
                api
                    .postFdbk(this.form)
                    .then((res) => {
                        console.log(res);
                        this.btnLoading = false
                        if (res.code == 0) {
                            this.$message.success('添加成功')
                            this.$router.push({path: '/service_management/fdbk_list'})
                        }
                    })
            },
            putForm(){
                this.btnLoading = true
                api
                    .putFdbk(this.form)
                    .then((res) => {
                        console.log(res);
                        this.btnLoading = false
                        if (res.code == 0) {
                            this.$message.success('修改成功')
                            this.$router.push({path: '/service_management/fdbk_list'})
                        }
                    })
            },
            onCheckboxChange(checkedValues) {
                this.checkedValues = checkedValues
            },
            getSoDate(val) {
                this.form.fdbkDueDate = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            getFdbkTargetType(e) {
                this.form.fdbkTargetType = e
                switch (e) {
                    case 0:
                        this.tableFlag = '其它'
                        break
                    case 3:
                        this.tableFlag = '反馈对象类型产品'
                        break
                    case 1000:
                        this.tableFlag = '反馈对象类型服务'
                        break
                    case 4:
                        this.tableFlag = '反馈对象类型员工'
                        break
                    case 2:
                        this.tableFlag = '反馈对象类型伙伴'
                        break
                }
                this.toOpenTableAdd()
            },
            getFdbkSrcType(e) {
                this.form.fdbkSrcType = e
                switch (e) {
                    case 1:
                        this.tableFlag = '反馈者类型客户'
                        break
                    case 2:
                        this.tableFlag = '反馈者类型合作伙伴'
                        break
                    case 4:
                        this.tableFlag = '反馈者类型员工'
                        break
                    case 6:
                        this.tableFlag = '反馈者类型供应商'
                        break
                }
                this.toOpenTableAdd()
            },
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                switch (this.tableFlag) {
                    case '反馈对象类型产品':
                        this.getTargetProductList()
                        break
                    case '反馈者类型客户':
                        this.getSrcCustomerList()
                        break
                    default:
                        console.log('未发现列表')
                }
            }
        }
    };
</script>

<style scoped>
    .submit-box {
        margin-top: 20px;
    }
</style>