<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">客户分类</span></span>
                        <a-select
                                style="width: 100%"
                                placeholder="请选择分类"
                                v-model="form.friendClassId"
                                @change="unitChange"
                        >
                            <a-select-option v-for="item in unitData" :key="item.friendClassId"
                                             :value="item.friendClassId">
                                {{ item.friendClassName }}
                            </a-select-option>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="客户编码" :span="1">
<!--                        <span>{{productInfoSelected.prodClassCode}}</span>-->
                        <a-input style="width: 12.723%" v-model="form.firstCode" />
                        <span>-</span>
                        <a-input style="width: 30%" v-model="form.secondCode"/>
<!--                        <a-icon type="search" style="margin: 0 4px" @click="productSearch"/>-->
                    </a-descriptions-item>
                    <a-descriptions-item label="客户助记符" :span="1">
                        <a-input v-model="form.friendSimpleCode" placeholder="客户助记符"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">客户名</span></span>
                        <a-input v-model="form.friendName" placeholder="客户名"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="邮编" :span="1">
                        <a-input v-model="form.friendZipCode" placeholder="邮编"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="地址" :span="2">
                        <a-input v-model="form.friendAddress" placeholder="地址"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="电话" :span="1">
                        <a-input v-model="form.friendPhone" placeholder="电话"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="移动电话" :span="1">
                        <a-input v-model="form.friendMobilePhone" placeholder="移动电话"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="传真" :span="1">
                        <a-input v-model="form.friendFax" placeholder="传真"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="电子邮件" :span="1">
                        <a-input v-model="form.friendEmail" placeholder="电子邮件"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="国家" :span="1">
                        <a-input v-model="form.friendCountry" placeholder="国家"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="省" :span="1">
                        <a-input v-model="form.friendProvince" placeholder="省"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="城市" :span="1">
                        <a-input v-model="form.friendCity" placeholder="城市"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="网址" :span="3">
                        <a-input v-model="form.friendHomePage" placeholder="网址"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="备注" :span="3">
                        <a-textarea v-model="form.friendMemo" allow-clear/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px"> 重置</a-button>
                <a-button size="small" @click="$router.go(-1)">退出</a-button>
            </div>
        </a-layout-header>
    </a-layout>
</template>

<script>
    import api from '@/api/friend';

    export default {
        name: 'ClientAdd',
        data() {
            return {
                spinning: false,
                form: {
                    friendClassId: undefined,
                    friendName: "",
                    firstCode: "",
                    secondCode: "",
                    friendPhone: "",
                },
                checked: true,
                unitData: [],
                btnLoading: false,
                checkedValues: [],
                visible: false,
            };
        },
        mounted() {
            this.fetchClass()
            if(this.$route.query.editMode && this.$route.query.code){
                this.getDetail()
            }
        },
        methods: {
            getDetail(){
                this.spinning = true
                api.getFriendDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.form = {
                            //对象
                            friendClassId: data.friendClassId,
                            friendId: data.friendId,
                            friendSimpleCode: data.friendSimpleCode,
                            firstCode: data.friendCode.split(',')[0],
                            secondCode: data.friendCode.split(',')[1],
                            friendName: data.friendName,
                            categoryName: '上到给的发',
                            superiorDepartment: '阿斯顿',
                            lastContactTime: '阿斯蒂芬',
                            addressDetail: data.friendAddress,
                            postcode: data.friendZipCode,
                            friendPhone: data.friendPhone,
                            fax: data.friendFax,
                            email: data.friendEmail,
                            nation: '',
                            mobilePhone: data.friendMobilePhone,
                            website: '',
                            province: data.friendProvince,
                            creator: '',
                            createTime: '',
                            city: '',
                            changer: '',
                            changeTime: '',
                            reactivity: '',
                            paymentCredit: '',
                            valueScales: '',
                            industry: '',
                            marketMode: '',
                            clientSource: '',
                            recognizeWay: '',
                            wechat: '',
                            identificationWay: '',
                            remark: data.friendMemo
                        };
                    }
                    this.spinning = false
                })
                this.$nextTick(function(){
                    document.getElementsByClassName('ant-page-header-heading-title')[0].innerText = '修改客户'
                    document.getElementsByClassName('ant-breadcrumb-link')[document.getElementsByClassName('ant-breadcrumb-link').length - 1].innerHTML = '<span>修改客户</span>'
                })
            },
            fetchClass() {
                let params = {type: '1'}
                api
                    .getFrndClass(params)
                    .then((res) => {
                        console.log(res)
                        if(res.code == 0){
                            this.unitData = res.data
                        }
                    })
            },
            unitChange(value) {
                console.log(value)
                this.form.friendClassId = value;
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                if (!this.form.friendClassId) {
                    this.$message.error("请选择客户分类")
                    return -1
                }
                if (!this.form.friendName) {
                    this.$message.error("请输入客户名称")
                    return -1
                }
                this.form.friendCode = this.form.firstCode + "," + this.form.secondCode
                if(this.$route.query.editMode && this.$route.query.code){
                    this.editForm()
                    return -1
                }
                console.log(this.form)
                this.btnLoading = true
                api
                    .postFriend(this.form)
                    .then((res) => {
                        console.log(res);
                        this.btnLoading = false
                        if (res.code == 0) {
                            this.$message.success('添加成功')
                            this.$router.push({ path: '/client_center/client_infor' })
                        }
                    })
            },
            editForm(){
                this.btnLoading = true
                api
                    .putFriend(this.form.friendId, this.form)
                    .then((res) => {
                        console.log(res);
                        this.btnLoading = false
                        if (res.code == 0) {
                            this.$message.success('修改成功')
                            this.$router.push({ path: '/client_center/client_infor' })
                        }
                    })
            }
        }
    };
</script>

<style>
    .submit-box {
        margin-top: 20px;
    }
</style>