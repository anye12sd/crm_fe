<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">联系人姓名</span></span>
                        <a-input v-model="form.contactName"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">所属客户</span></span>
                        <a-input v-model="form.friendName" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch()"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="直接上级联系人" :span="1">
                        <a-input v-model="form.leadingContact" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch()"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="性别" :span="1">
                        <a-select v-model="form.contactGender" style="width: 100%" placeholder="请选择">
                            <a-select-option :value="0">男</a-select-option>
                            <a-select-option :value="1">女</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="称呼" :span="1">
                        <a-input v-model="form.contactSalutation"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="职务" :span="1">
                        <a-input v-model="form.contactPosition"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="联系人部门" :span="1">
                        <a-input v-model="form.contactDept"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="出生日" :span="1">
                        <a-input type="number" v-model="form.contactBirthDay"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="出生月" :span="1">
                        <a-input type="number" v-model="form.contactBirthMonth"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="出生年" :span="1">
                        <a-input type="number" v-model="form.contactBirthYear"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="婚姻状况" :span="1">
                        <a-select v-model="form.contactMarital" style="width: 100%" placeholder="请选择">
                            <a-select-option :value="0">其它</a-select-option>
                            <a-select-option :value="1">未婚</a-select-option>
                            <a-select-option :value="2">已婚</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="联系人地址" :span="1">
                        <a-input v-model="form.contactAddress"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="邮编" :span="1">
                        <a-input v-model="form.contactZipCode"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="城市" :span="1">
                        <a-input v-model="form.contactCity"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="省份" :span="1">
                        <a-input v-model="form.contactProvince"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="国家" :span="1">
                        <a-input v-model="form.contactCountry"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="电子邮件" :span="1">
                        <a-input v-model="form.contactEmail"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="家庭电话" :span="1">
                        <a-input v-model="form.contactHomePhone"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="办公电话" :span="1">
                        <a-input v-model="form.contactOfficePhone"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="移动电话" :span="1">
                        <a-input v-model="form.contactMobilePhone"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="传真" :span="1">
                        <a-input v-model="form.contactFax"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="微信" :span="1">
                        <a-input v-model="form.contactWechat"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="QQ" :span="1">
                        <a-input v-model="form.contactQq"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="主联系人标志" :span="1">
                        <a-select v-model="form.primaryFlag" style="width: 100%">
                            <a-select-option :value="1">是</a-select-option>
                            <a-select-option :value="0">否</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="停止标志" :span="1">
                        <a-select v-model="form.stopFlag" style="width: 100%">
                            <a-select-option :value="1">是</a-select-option>
                            <a-select-option :value="0">否</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="是否关怀对象" :span="1">
                        <a-select v-model="form.isCarefor" style="width: 100%">
                            <a-select-option :value="1">是</a-select-option>
                            <a-select-option :value="0">否</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="是否促销对象" :span="1">
                        <a-select v-model="form.isPromotion" style="width: 100%">
                            <a-select-option :value="1">是</a-select-option>
                            <a-select-option :value="0">否</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="是否催款对象" :span="1">
                        <a-select v-model="form.isPaynotice" style="width: 100%">
                            <a-select-option :value="1">是</a-select-option>
                            <a-select-option :value="0">否</a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="描述" :span="2">
                        <a-textarea v-model="form.contactIntro" style="width: 100%"/>
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
    import api from '@/api/contact';
    import friend from '@/api/friend';
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
        name: 'ClientContactAdd',
        components: {ModalAddTable},
        data() {
            return {
                modalAddTableParams,
                modalAddColumns,
                modalAddData: [],
                spinning: false,
                form: {
                    friendName: "",
                    contactBirthYear: 0,
                    contactBirthDay: 0,
                    contactBirthMonth: 0,
                },
                btnLoading: false,
            };
        },
        mounted() {
            if(this.$route.query.editMode && this.$route.query.code){
                this.getDetail(this.$route.query.code)
            }
        },
        methods: {
            getDetail(){
                this.spinning = true
                api.getContactDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.form = {
                            contactAddress: data.contactAddress,
                            contactBirthDay: data.contactBirthDay,
                            contactBirthMonth: data.contactBirthMonth,
                            contactBirthYear: data.contactBirthYear,
                            contactCity: data.contactCity,
                            contactCountry: data.contactCountry,
                            contactDept: data.contactDept,
                            contactEmail: data.contactEmail,
                            contactFax: data.contactFax,
                            contactGender: data.contactGender,
                            contactHomePhone: data.contactHomePhone,
                            contactIntro: data.contactIntro,
                            contactMarital: data.contactMarital,
                            contactMobilePhone: data.contactMobilePhone,
                            contactName: data.contactName,
                            contactOfficePhone: data.contactOfficePhone,
                            contactPosition: data.contactPosition,
                            contactProvince: data.contactProvince,
                            contactQq: data.contactQq,
                            contactSalutation: data.contactSalutation,
                            contactWechat: data.contactWechat,
                            contactZipCode: data.contactZipCode,
                            friendId: data.friendId,
                            friendName: data.friendName,
                            isCarefor: data.isCarefor,
                            isPaynotice: data.isPaynotice,
                            isPromotion: data.isPromotion,
                            primaryFlag: data.primaryFlag,
                            stopFlag: data.stopFlag,
                        };
                    }
                    this.spinning = false
                })
                this.$nextTick(function(){
                    document.getElementsByClassName('ant-page-header-heading-title')[0].innerText = '修改客户联系人'
                    document.getElementsByClassName('ant-breadcrumb-link')[document.getElementsByClassName('ant-breadcrumb-link').length - 1].innerHTML = '<span>修改客户联系人</span>'
                })
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                console.log(this.form)
                if (!this.form.contactName) {
                    this.$message.error("请输入联系人姓名")
                    return -1
                }
                if (!this.form.friendId) {
                    this.$message.error("请选择所属客户")
                    return -1
                }
                this.form.contactBirthYear = this.form.contactBirthYear ? parseInt(this.form.contactBirthYear) : 0
                this.form.contactBirthMonth = this.form.contactBirthMonth ? parseInt(this.form.contactBirthMonth) : 0
                this.form.contactBirthDay = this.form.contactBirthDay ? parseInt(this.form.contactBirthDay) : 0
                this.btnLoading = true
                api
                    .postContact(this.form)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$message.success('添加成功')
                            this.$router.push({path: '/client_center/client_contact_info'})
                        }
                        this.btnLoading = false;
                    })
            },
            openSearch() {
                this.modalAddTableParams = {
                    modalTitle: '客户选择',
                    tableTitle: '客户列表',
                    hasRowHeaderSelect: true,
                    hideCancelBtn: true,
                    isCheckbox: false,
                    headerContent: [],
                    loading: true,
                    showAdvanceBtn: false,
                    headerSearchParams: [],
                    pagination: {
                        total: 0,
                        current: 1,
                        page_size: 10
                    },
                }
                this.modalAddColumns = [
                    {
                        title: '客户名',
                        dataIndex: 'friendName',
                        key: 'friendName'
                    },
                    {
                        title: '客户编码',
                        dataIndex: 'friendCode',
                        key: 'friendCode'
                    },
                    {
                        title: '客户助记符',
                        dataIndex: 'friendSimpleCode',
                        key: 'friendSimpleCode'
                    },
                    {
                        title: '电话',
                        dataIndex: 'friendPhone',
                        key: 'friendPhone'
                    },
                    {
                        title: '电子邮件',
                        dataIndex: 'friendEmail',
                        key: 'friendEmail'
                    },
                ]
                this.getFriendList()
                this.toOpenTableAdd()
            },
            getFriendList(){
                let params = { page: this.modalAddTableParams.pagination.current }
                this.modalAddTableParams.loading = true;
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
            toOpenTableAdd() {
                this.$refs.tableAdd.open();
                this.modalAddTableParams.pagination.current = 1;
            },
            tableSelectedHandle(val) {
                if (!val.length) {
                    return -1
                }
                this.form.friendId = val[0].friendId
                this.form.friendName = val[0].friendName
            },
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                this.getFriendList()
            }
        }
    };
</script>

<style scoped>
    .submit-box {
        margin-top: 20px;
    }
</style>