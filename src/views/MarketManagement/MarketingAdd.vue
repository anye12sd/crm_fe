<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">活动代码</span></span>
                        <a-input v-model="form.cmpgCode"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">活动名称</span></span>
                        <a-input v-model="form.cmpgName"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">部门名称</span></span>
                        <a-select v-model="form.deptId" style="width: 100%" placeholder="请选择">
                            <template v-for="item in deptList">
                                <a-select-option :key="item.deptId" :value="item.deptId">{{item.deptName}}</a-select-option>
                            </template>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">市场活动分类</span></span>
                        <a-select v-model="form.cmpgClassId" style="width: 100%" placeholder="请选择分类">
                            <template v-for="item in cmpgClassData">
                                <a-select-option :key="item.cmpgClassId" :value="item.cmpgClassId">{{item.cmpgClassName}}</a-select-option>
                            </template>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="活动预算" :span="1">
                        <span slot="label"><span class="description-unemptyable">活动预算</span></span>
                        <a-input v-model="form.cmpgBudget" @blur="checkNumber"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">开始时间</span></span>
                        <a-date-picker v-model="form.cmpgStartDate" @change="getStartTime" show-time style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">结束时间</span></span>
                        <a-date-picker v-model="form.cmpgEndDate" @change="getEndTime" show-time style="width: 100%"/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px">重置</a-button>
                <a-button size="small" @click="$router.go(-1)">退出</a-button>
            </div>
        </a-layout-header>
    </a-layout>
</template>

<script>
    import dept from '@/api/department';
    import api from '@/api/cmpg';
    import moment from 'moment';

    export default {
        name: 'MarketingAdd',
        data() {
            return {
                spinning: false,
                form: {
                    cmpgClassId: 1,
                    deptId: undefined,
                    cmpgStartDate: undefined,
                    cmpgEndDate: undefined
                },
                checked: true,
                btnLoading: false,
                cmpgClassData: [],
                deptList: []
            };
        },
        mounted() {
            this.getCmpgClass()
            this.getDeptList()
            if(this.$route.query.editMode && this.$route.query.cmpgId){
                this.getDetail(this.$route.query.cmpgId)
            }
        },
        methods: {
            getDetail(cmpgId){
                this.spinning = true
                api
                    .getCmpgDetail(cmpgId)
                    .then((res) => {
                        console.log(res)
                        if (res.code != 0) {
                            this.$message.error(res.msg)
                            this.spinning = false
                            return -1
                        }
                        const data = res.data
                        this.form = {
                            cmpgCode: data.cmpgCode,
                            cmpgClassId: data.cmpgClassId,
                            cmpgName: data.cmpgName,
                            deptId: data.deptId,
                            cmpgStartDate: data.cmpgStartDate ? new Date(+new Date(data.cmpgStartDate) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : "",
                            cmpgEndDate: data.cmpgEndDate ? new Date(+new Date(data.cmpgEndDate) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : "",
                            cmpgBudget: parseInt(data.cmpgBudget),
                        }
                        this.spinning = false
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            getCmpgClass(){
                this.spinning = true
                api
                    .getCmpgClass()
                    .then((res) => {
                        console.log(res);
                        if(res.code == '0'){
                            this.cmpgClassData = res.data.rows
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
            checkNumber(){
                const reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
                if(reg.test(this.form.cmpgBudget)){
                    this.form.cmpgBudget = parseInt(this.form.cmpgBudget)
                }else{
                    this.$message.error("请输入正确的活动预算")
                    this.form.cmpgBudget = ""
                }
            },
            getStartTime(val){
                this.form.cmpgStartDate = moment(val).format('YYYY-MM-DD HH:mm:ss').replace(" ","T"); // 2019-08-23 21:03:43
            },
            getEndTime(val){
                this.form.cmpgEndDate = moment(val).format('YYYY-MM-DD HH:mm:ss').replace(" ","T"); // 2019-08-23 21:03:43
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                console.log(this.form)
                if (!this.form.cmpgCode) {
                    this.$message.error("请输入活动代码")
                    return -1
                }
                if (!this.form.cmpgClassId) {
                    this.$message.error("请选择活动分类")
                    return -1
                }
                if (!this.form.cmpgName) {
                    this.$message.error("请输入活动名称")
                    return -1
                }
                if (!this.form.deptId) {
                    this.$message.error("请选择部门")
                    return -1
                }
                if (!this.form.cmpgStartDate) {
                    this.$message.error("请输入开始时间")
                    return -1
                }
                if (!this.form.cmpgEndDate) {
                    this.$message.error("请输入结束时间")
                    return -1
                }
                if(this.form.cmpgBudget){
                    if (!this.$regTest.priceTest(this.form.cmpgBudget)) {
                        this.$message.error("请输入正确的活动预算")
                        return -1
                    }
                }
                if(this.$route.query.editMode && this.$route.query.cmpgId){
                    this.putCmpg(this.$route.query.cmpgId)
                    return -1
                }
                this.btnLoading = true
                api
                    .postCmpg(this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('添加成功')
                            this.$router.push({path: '/market_management/marketing_list'})
                        }
                        this.btnLoading = false
                    })
            },
            putCmpg(id){
                this.form.cmpgStartDate = this.form.cmpgStartDate ? this.form.cmpgStartDate.replace(" ","T") : ""; // 2019-08-23 21:03:43
                this.form.cmpgEndDate = this.form.cmpgEndDate ? this.form.cmpgStartDate.replace(" ","T") : ""; // 2019-08-23 21:03:43
                api
                    .putCmpg(id, this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('修改成功')
                            this.$router.push({path: '/market_management/marketing_list'})
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
        }
    };
</script>

<style scoped>
    .submit-box {
        margin-top: 20px;
    }
</style>