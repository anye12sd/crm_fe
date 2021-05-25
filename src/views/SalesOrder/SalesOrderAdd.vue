<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="false" tip="加载中。。。">
                <a-descriptions bordered size="small">
                    <a-descriptions-item :span="1" v-if="orderCate.length">
                        <span slot="label"><span class="description-unemptyable">订单分类</span></span>
                        <a-select v-model="form.soClassId" style="width: 200px">
                            <template v-for="item in orderCate">
                                <a-select-option :key="item.orderClassId" :value="item.orderClassId">{{item.orderClassName}}</a-select-option>
                            </template>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">订单编码</span></span>
                        <span>{{form.prefix}}</span>
                        <span>-</span>
                        <a-input style="width: 30%" v-model="form.code"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="订单日期" :span="1">
                        <a-date-picker @change="getSoDate" style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">客户名</span></span>
                        <a-input v-model="form.custName" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch('friend')"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="客户编码" :span="1">
                        <a-input v-model="form.custCode" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="2">
                        <span slot="label"><span class="description-unemptyable">账户名称</span></span>
                        <a-input v-model="form.faccName" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch('account')"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="订单摘要" :span="1">
                        <a-input v-model="form.soSubject"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="付款期限" :span="1">
                        <a-date-picker @change="getPaymentDate" style="width: 100%"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="交付日期" :span="1">
                        <a-date-picker @change="getDeliveryDate" style="width: 100%" />
                    </a-descriptions-item>
                    <a-descriptions-item label="币种" :span="1">
                        <a-input v-model="form.currencyId"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">业务员</span></span>
                        <a-input v-model="form.empName" style="width: calc(100% - 30px);" disabled />
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch('emp')"/>
                    </a-descriptions-item>
                    <a-descriptions-item :span="1">
                        <span slot="label"><span class="description-unemptyable">部门名称</span></span>
                        <a-input v-model="form.deptName" style="width: 100%;" disabled/>
                    </a-descriptions-item>
                    <a-descriptions-item label="汇率" :span="1">
                        <a-input v-model="form.exchangeRatio"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="备注" :span="3">
                        <a-textarea v-model="form.soMemo"/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存退出</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px">重置</a-button>
                <a-button size="small" @click="addProduct" style="margin-right: 6px">添加产品</a-button>
            </div>
            <div class="add-table">
                <a-table
                        bordered
                        :columns="addTableColumns"
                        :data-source="addTableData"
                        :row-key="(data, index) => index"
                        size="middle"
                        :pagination="false"
                        :scroll="{ x: 1200 }"
                >
                    <template slot="prodName" slot-scope="prodName, record, index">
                        <a-input v-model="addTableData[index].prodName" style="width: calc(100% - 30px);" disabled/>
                        <a-icon type="search" style="margin: 0 4px" @click="openSearch('product', index)"/>
                    </template>
                    <template slot="prodVolume" slot-scope="prodVolume, record, index">
                        <a-input type="number" v-model="addTableData[index].prodVolume" @blur="addTableData[index].prodVolume = parseFloat(addTableData[index].prodVolume)"></a-input>
                    </template>
                    <template slot="soProdListPrice" slot-scope="soProdListPrice, record, index">
                        <a-input v-model="addTableData[index].soProdListPrice" disabled></a-input>
                    </template>
                    <template slot="unitName" slot-scope="unitName, record, index">
                        <a-input v-model="addTableData[index].unitName" disabled></a-input>
                    </template>
                    <template slot="soProdLastPrice" slot-scope="soProdLastPrice, record, index">
                        <a-input type="number" v-model="addTableData[index].soProdLastPrice" @blur="addTableData[index].soProdLastPrice = parseFloat(addTableData[index].soProdLastPrice)"></a-input>
                    </template>
                    <template slot="soProdAmount" slot-scope="soProdAmount, record, index">
                        <a-input type="number" v-model="addTableData[index].soProdAmount" @blur="addTableData[index].soProdAmount = parseFloat(addTableData[index].soProdAmount)"></a-input>
                    </template>
                    <template slot="soProdNetAmount" slot-scope="soProdNetAmount, record, index">
                        <a-input type="number" v-model="addTableData[index].soProdNetAmount" @blur="addTableData[index].soProdNetAmount = parseFloat(addTableData[index].soProdNetAmount)"></a-input>
                    </template>
                    <template slot="taxRatio" slot-scope="taxRatio, record, index">
                        <a-input v-model="addTableData[index].taxRatio" disabled></a-input>
                    </template>
                    <template slot="operate" slot-scope="operate, record, index">
                        <a-tooltip
                                title="删除"
                        >
                            <a-popconfirm
                                    title="删除当前数据？"
                                    ok-text="确认并删除"
                                    cancel-text="取消"
                                    @confirm="toDelete(record, index)"
                            >
                                <a-icon slot="icon" type="question-circle-o" style="color: #faad14" />
                                <a-button icon="delete"></a-button>
                            </a-popconfirm>
                        </a-tooltip>
                    </template>
                </a-table>
            </div>
        </a-layout-header>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange"></modal-add-table>
    </a-layout>
</template>

<script>
    let modalAddTableParams = {
        modalTitle: '产品分类选择',
        tableTitle: '分类列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [
            {
                type: 'input',
                labelName: '分类编码',
                placeholder: '请输入',
                paramsName: 'code'
            },
            {
                type: 'input',
                labelName: '产品分类',
                paramsName: 'category'
            },
            {
                type: 'input',
                labelName: '备注',
                paramsName: 'remark'
            },
            {
                type: 'select',
                labelName: '选择',
                options: [
                    {label: '0', value: 'select1'},
                    {label: '1', value: 'select2'},
                ],
            }
        ],
        pagination: {
            total: 0,
            current: 1,
            page_size: 10
        },
    }
    let modalAddColumns = [
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
    const addTableColumns = [
        {
            title: '产品名称',
            dataIndex: 'prodName',
            key: 'prodName',
            scopedSlots: {customRender: 'prodName'}
        },
        {
            title: '产品数量',
            dataIndex: 'prodVolume',
            key: 'prodVolume',
            scopedSlots: {customRender: 'prodVolume'}
        },
        {
            title: '定价',
            dataIndex: 'soProdListPrice',
            key: 'soProdListPrice',
            scopedSlots: {customRender: 'soProdListPrice'}
        },
        {
            title: '单位名称',
            dataIndex: 'unitName',
            key: 'unitName',
            scopedSlots: {customRender: 'unitName'}
        },
        {
            title: '成交价',
            dataIndex: 'soProdLastPrice',
            key: 'soProdLastPrice',
            scopedSlots: {customRender: 'soProdLastPrice'}
        },
        {
            title: '金额',
            dataIndex: 'soProdAmount',
            key: 'soProdAmount',
            scopedSlots: {customRender: 'soProdAmount'}
        },
        {
            title: '税后净额',
            dataIndex: 'soProdNetAmount',
            key: 'soProdNetAmount',
            scopedSlots: {customRender: 'soProdNetAmount'}
        },
        {
            title: '税率',
            dataIndex: 'taxRatio',
            key: 'taxRatio',
            scopedSlots: {customRender: 'taxRatio'}
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: '64px',
            scopedSlots: {customRender: 'operate'}
        },
    ]
    let addTableData = [
        {prodName: "", prodVolume: "", soProdListPrice: "", soProdLastPrice: "", soProdAmount: "", soProdNetAmount: "", taxRatio: ""}
    ]
    import api from '@/api/salesOrder';
    import prod from '@/api/product';
    import frnd from '@/api/frnd';
    import friend from '@/api/friend';
    import member from '@/api/member';
    import moment from 'moment';
    import ModalAddTable from "../../components/ModalAddTable";

    export default {
        name: 'SalesOrderAdd',
        components: {ModalAddTable,},
        data() {
            return {
                modalAddColumns,
                modalAddTableParams,
                addTableColumns,
                addTableData,
                modalAddData: [],
                spinning: true,
                form: {prefix: "", code: "", custName: "", custCode: "", empName: "", deptName: "", faccName: ""},
                checked: true,
                btnLoading: false,
                orderCate: [], // 订单分类
                modalType: '',
                productIndex: '',
                productFlag: true
            };
        },
        mounted() {
            this.fetchCategory()
        },
        methods: {
            fetchCategory() {
                this.spinning = true
                let params = {orderType: '31'}
                api
                    .getSalesOrderCate(params)
                    .then((res) => {
                        console.log(res)
                        if(!res.data.length){
                            this.$message.error("暂无订单分类")
                            return -1
                        }
                        this.orderCate = res.data
                        this.form.soClassId = this.orderCate[0].orderClassId
                        this.getNextCode(res.data[0].orderClassId)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            getNextCode(orderClassId) {
                let params = {
                    orderClassId: orderClassId,
                }
                api
                    .getSalesOrderNextCode(params)
                    .then((res) => {
                        console.log(res)
                        this.form.code = res.data.code
                        this.form.prefix = res.data.prefix
                        this.spinning = false
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            toOpenTableAdd() {
                this.$refs.tableAdd.open();
            },
            tableSelectedHandle(val) {
                if (!val.length) {
                    return -1
                }
                if(this.modalType == 'friend'){
                    this.form.custName = val[0].friendName
                    this.form.custId = val[0].friendId
                    this.form.custCode = val[0].friendCode
                }else if(this.modalType == 'emp'){
                    this.form.empName = val[0].empName
                    this.form.deptName = val[0].deptName
                    this.form.empId = val[0].empId
                    this.form.deptId = val[0].deptId
                }else if(this.modalType == 'product'){
                    this.addTableData.map(item => {
                        // 已经添加过的产品不能再添加
                        if(item.prodId == val[0].prodId){
                            this.$message.error('已选择过该产品')
                            return -1
                        }
                    })
                    this.addTableData[this.productIndex].prodName = val[0].prodName
                    this.addTableData[this.productIndex].soProdListPrice = parseFloat(val[0].prodListPrice)
                    this.addTableData[this.productIndex].taxRatio = parseFloat(val[0].taxRatio)
                    this.addTableData[this.productIndex].unitName = val[0].unitName
                    this.addTableData[this.productIndex].unitId = val[0].unitId
                    this.addTableData[this.productIndex].entityId = val[0].entityId
                    this.addTableData[this.productIndex].prodId = val[0].prodId
                }
                else if(this.modalType == 'account'){
                    this.form.faccId = val[0].faccId
                    this.form.faccName = val[0].faccName
                }
            },
            openSearch(val, index) {
                // val = friend 客户， account 账户， emp 业务员， product 产品
                if(val == 'friend'){
                    this.modalType = 'friend'
                    this.modalAddTableParams = {
                        modalTitle: '客户选择',
                        tableTitle: '客户列表',
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
                }
                else if(val == 'emp'){
                    this.modalType = 'emp'
                    this.modalAddTableParams = {
                        modalTitle: '员工选择',
                        tableTitle: '员工列表',
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
                    this.getEmpList()
                }
                else if(val == 'account'){
                    this.modalType = 'account'
                    this.modalAddTableParams = {
                        modalTitle: '账户选择',
                        tableTitle: '账户列表',
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
                    this.modalAddColumns = [
                        {
                            title: '账户编码',
                            dataIndex: 'faccCode',
                            key: 'faccCode'
                        },
                        {
                            title: '账户名称',
                            dataIndex: 'faccName',
                            key: 'faccName'
                        },
                        {
                            title: '电话',
                            dataIndex: 'faccPhone',
                            key: 'faccPhone'
                        },
                        {
                            title: '地址',
                            dataIndex: 'faccAddress',
                            key: 'faccAddress'
                        },
                        {
                            title: '邮箱',
                            dataIndex: 'faccEmail',
                            key: 'faccEmail'
                        },
                        {
                            title: '信用额度',
                            dataIndex: 'creditLimit',
                            key: 'creditLimit'
                        },
                    ]
                    this.getAccountList()
                }
                else if( val == 'product'){
                    this.modalType = 'product'
                    this.productIndex = index
                    this.modalAddTableParams = {
                        modalTitle: '产品选择',
                        tableTitle: '产品列表',
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
                    this.modalAddColumns = [
                        {
                            title: '产品分类',
                            dataIndex: 'prodClassName',
                            key: 'prodClassName'
                        },
                        {
                            title: '产品编码',
                            dataIndex: 'prodCode',
                            key: 'prodCode'
                        },
                        {
                            title: '产品助记符',
                            dataIndex: 'prodSimpleCode',
                            key: 'prodSimpleCode'
                        },
                        {
                            title: '产品名称',
                            dataIndex: 'prodName',
                            key: 'prodName'
                        },
                        {
                            title: '计量单位',
                            dataIndex: 'unitName',
                            key: 'unitName'
                        },
                        {
                            title: '定价',
                            dataIndex: 'prodListPrice',
                            key: 'prodListPrice'
                        },
                        {
                            title: '税率',
                            dataIndex: 'taxRatio',
                            key: 'taxRatio'
                        }
                    ]
                    this.getProdList()
                }
                this.toOpenTableAdd()
            },
            getFriendList(){
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
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
            getEmpList(){
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
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
            getAccountList(){
                if(!this.form.custId){
                    this.$message.error('请先选择客户')
                    this.openSearch('friend')
                    return -1
                }
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current, friendId: this.form.custId}
                frnd
                    .getRelatedAccountList(params)
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
            getProdList(){
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                prod
                    .getProductList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            console.log(res.data.count)
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            addProduct(){
                this.addTableData.push(
                    {unitName: "", prodName: "", prodVolume: "", soProdListPrice: "", soProdLastPrice: "", soProdAmount: "", soProdNetAmount: "", taxRatio: ""}
                )
            },
            toDelete(record, index){
                this.addTableData.splice(index, 1)
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                this.productFlag = true
                for (var i = 0; i < this.addTableData.length; i++){
                    if(!this.addTableData[i].prodId){
                        this.$message.error("请选择产品")
                        this.productFlag = false
                        return -1
                    }
                    if(!this.addTableData[i].prodVolume){
                        this.$message.error("请填写产品数量")
                        this.productFlag = false
                        return -1
                    }
                    if(!this.addTableData[i].soProdLastPrice){
                        this.$message.error("请填写成交价")
                        this.productFlag = false
                        return -1
                    }
                    if(!this.addTableData[i].soProdAmount){
                        this.$message.error("请填写金额")
                        this.productFlag = false
                        return -1
                    }
                    if(!this.addTableData[i].soProdNetAmount){
                        this.$message.error("请填写税后净额")
                        this.productFlag = false
                        return -1
                    }
                }
                if(!this.productFlag){
                    return -1
                }
                if(!this.form.soClassId){
                    this.$message.error("请选择订单分类")
                    return -1
                }
                if(!this.form.code){
                    this.$message.error("请填写订单编码")
                    return -1
                }
                if(!this.form.custId){
                    this.$message.error("请选择客户")
                    return -1
                }
                if(!this.form.custId){
                    this.$message.error("请选择客户账户")
                    return -1
                }
                if(!this.form.empId){
                    this.$message.error("请选择业务员")
                    return -1
                }
                if(this.form.exchangeRatio){
                    if (!this.$regTest.priceTest(this.form.exchangeRatio)) {
                        this.$message.error("请输入正确的汇率")
                        return -1
                    }
                }
                this.form.soDetail = this.addTableData
                this.form.soCode = this.form.prefix + this.form.code
                console.log(this.form)
                this.btnLoading = true
                api
                    .postAddSalesOrder(this.form)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('添加成功')
                            this.$router.push({path: '/sales_order/sales_order_list'})
                        }
                        this.btnLoading = false
                    })
            },
            getSoDate(val){
                this.form.soDate = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            getPaymentDate(val){
                this.form.soPaymentDate = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            getDeliveryDate(val){
                this.form.soDeliveryDate = moment(val).format('YYYY-MM-DD HH:mm'); // 2019-08-23 21:03:43
            },
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                if(this.modalType == 'friend'){
                    this.getFriendList()
                }else if(this.modalType == 'emp'){
                    this.getEmpList()
                }else if(this.modalType == 'product'){
                    this.getProdList()
                }else if(this.modalType == 'account'){
                    this.getAccountList()
                }
            }
        }
    };
</script>

<style>
    .submit-box {
        margin-top: 20px;
    }
</style>