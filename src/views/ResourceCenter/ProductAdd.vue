<template>
    <a-layout class="main-layout">
        <a-layout-header class="main-header">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions bordered size="small">
                <a-descriptions-item :span="1">
                    <span slot="label"><span class="description-unemptyable">产品编码</span></span>
                    <span>{{productInfoSelected.prodClassCode}}</span>
                    <!--          <a-input style="width: 12.723%" :value="productInfoSelected.prodClassName" oninput="if(value.length > 3)value = value.slice(0, 3)" />-->
                    <span>-</span>
                    <a-input style="width: 30%" v-model="productSecondCode"/>
                    <a-icon type="search" style="margin: 0 4px" @click="productSearch"/>
                </a-descriptions-item>
                <a-descriptions-item label="产品助记符" :span="1">
                    <a-input v-model="form.prodSimpleCode" placeholder="产品助记符"/>
                </a-descriptions-item>
                <a-descriptions-item label="状态" :span="1">
                    <span>{{productInfoSelected.stopFlag ? '在用' : '停用'}}</span>
                </a-descriptions-item>
                <a-descriptions-item :span="2">
                    <span slot="label"><span class="description-unemptyable">产品名称</span></span>
                    <a-input v-model="form.prodName" placeholder="产品名称"/>
                </a-descriptions-item>
                <a-descriptions-item label="产品分类" :span="1">
                    <span>{{productInfoSelected.prodClassName}}</span>
                </a-descriptions-item>
                <a-descriptions-item label="定价" :span="1">
                    <a-input v-model="form.prodListPrice" placeholder="定价"/>
                </a-descriptions-item>
                <a-descriptions-item label="单位成本" :span="1">
                    <a-input v-model="form.prodUnitCost" placeholder="单位成本"/>
                </a-descriptions-item>
                <a-descriptions-item label="">
                    <a-checkbox-group
                            v-model="CheckboxValue"
                            name="checkboxgroup"
                            :options="plainOptions"
                            @change="onCheckboxChange"
                    />
                </a-descriptions-item>
                <a-descriptions-item label="计量单位" :span="1">
                    <a-select
                            style="width: 100%"
                            placeholder="请选择计量单位"
                            v-model="form.prodUnit"
                            @change="unitChange"
                            allowClear
                    >
                        <a-select-option v-for="(item, index) in unitData" :key="item.id" :value="index">
                            {{ item.title }}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item label="采购参考价" :span="1">
                    <a-input v-model="form.prodPurchasePrice"/>
                </a-descriptions-item>
                <a-descriptions-item label="消费周期（天）" :span="1">
                    <a-input v-model="form.prodLifespan"/>
                </a-descriptions-item>
                <a-descriptions-item label="描述" :span="3">
                    <a-input v-model="form.prodIntro"/>
                </a-descriptions-item>
                <a-descriptions-item label="备注" :span="3">
                    <a-textarea v-model="form.prodMemo" allow-clear/>
                </a-descriptions-item>
            </a-descriptions>
            </a-spin>
            <div class="submit-box">
                <a-button size="small" style="margin-right: 6px" @click="saveForm" :loading="btnLoading">保存</a-button>
                <a-button size="small" @click="onReset" style="margin-right: 6px"> 重置</a-button>
                <a-button size="small" @click="$router.go(-1)">退出</a-button>
            </div>
        </a-layout-header>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns" :data="modalAddData" @tableSelected="tableSelectedHandle"></modal-add-table>
    </a-layout>
</template>

<script>
    const modalAddTableParams = {
        modalTitle: '产品分类选择',
        tableTitle: '分类列表',
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
    import api from '@/api/product';
    import ModalAddTable from "../../components/ModalAddTable";

    export default {
        name: 'ProductAdd',
        components: {ModalAddTable,},
        data() {
            return {
                modalAddColumns,
                modalAddTableParams,
                modalAddData: [],
                spinning: true,
                form: {buyFlag: 0, saleFlag: 0, snFlag: 0, unitId: 1},
                checked: true,
                CheckboxValue: [],
                plainOptions: ['可采购', '可销售', '序列号管理'],
                unitData: [
                    {id: 0, title: '个'},
                    {id: 1, title: '克'},
                    {id: 2, title: '米'},
                ],
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
                productInfoSelected: {}
            };
        },
        mounted() {
            if(this.$route.query.editMode && this.$route.query.code){
                //编辑模式
                this.getDetail()
            }else{
                //新增模式
                if(this.$route.params.val){
                    this.productInfoSelected = this.$route.params.val[0]
                    this.fetchRule()
                }else{
                    this.toOpenTableAdd()
                }
            }
        },
        methods: {
            getDetail(){
                api.getProductDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.form = {
                            "prodSimpleCode": data.prodSimpleCode,
                            "prodCode": data.prodCode,
                            "prodName": data.prodName,
                            "status": "",
                            "prodClassName": data.prodClassName,
                            "prodListPrice": data.prodListPrice,
                            "productCost": "",
                            "checkbox": ['可采购', '可销售', '序列号管理'],
                            "unitName": data.unitName,
                            "purchaseReferencePrice": "",
                            "consumptionCycle": "",
                            "compose": "",
                            "taxRatio": data.taxRatio,
                            "changeTime": "",
                            "changer": "",
                            "percentageCost": "",
                            "description": "",
                            "remark": ""
                        };
                    }
                    this.spinning = false
                })
            },
            fetchRule(){
                this.spinning = true
                let params = {type: 'product'}
                api
                    .getCodeRule(params)
                    .then((res) => {
                        console.log(res)
                        this.getNextCode(res.data.autoIncrease, res.data.serialLen)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            getNextCode(autoIncrease, serialLen){
                let params = {autoIncrease: autoIncrease, serialLen: serialLen, prodClassId: this.productInfoSelected.prodClassId}
                api
                    .getNextCode(params)
                    .then((res) => {
                        console.log(res)
                        this.productSecondCode = res.data.nextCode
                        this.spinning = false
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            toOpenTableAdd() {
                this.$refs.tableAdd.open();
                this.modalAddTableParams.loading = true;
                api
                    .getProductClassList(this.params)
                    .then((res) => {
                        console.log(res);
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.modalAddData = res.data.rows;
                        this.modalAddTableParams.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            tableSelectedHandle(val){
                if(!val.length){
                    this.$message.error("请指定一个分类")
                    this.$refs.tableAdd.open();
                }
                this.productInfoSelected = val[0]
                this.fetchRule()
            },
            productSearch() {
                this.toOpenTableAdd()
            },
            empty() {
                this.form = {};
            },
            infoSearch() {
                this.friendInfor = false;
            },
            unitChange(value) {
                this.form.prodUnit = value;
            },
            onReset() {
                this.form = {};
            },
            saveForm() {
                if (!this.form.prodName) {
                    this.$message.error("请输入产品名称")
                    return -1
                }
                if (!this.productSecondCode) {
                    this.$message.error("请完善产品编码")
                    return -1
                }
                if (this.checkedValues.length) {
                    this.checkedValues.includes('可采购') ? this.form.buyFlag = 1 : this.form.buyFlag = 0
                    this.checkedValues.includes('可销售') ? this.form.saleFlag = 1 : this.form.saleFlag = 0
                    this.checkedValues.includes('序列号管理') ? this.form.snFlag = 1 : this.form.snFlag = 0
                }
                this.form.prodListPrice ? this.form.prodListPrice = parseFloat(this.form.prodListPrice) : ""
                this.form.prodPurchasePrice ? this.form.prodPurchasePrice = parseFloat(this.form.prodPurchasePrice) : ""
                this.form.prodLifespan ? this.form.prodLifespan = parseFloat(this.form.prodLifespan) : ""
                this.form.prodClassId = this.productInfoSelected.prodClassId
                this.form.prodCode = this.productInfoSelected.prodClassCode + this.productSecondCode
                console.log(this.form)
                this.btnLoading = true
                api
                    .postAddProduct(this.form)
                    .then((res) => {
                        console.log(res);
                        this.btnLoading = false
                        if(res.code == 0){
                            this.$message.success('添加成功')
                            this.$router.push({path: '/resource_center/product_info'})
                        }
                    })
            },
            onCheckboxChange(checkedValues) {
                this.checkedValues = checkedValues
            }
        }
    };
</script>

<style>
    .submit-box {
        margin-top: 20px;
    }
</style>