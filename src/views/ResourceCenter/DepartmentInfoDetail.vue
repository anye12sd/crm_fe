<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs"
                       :usedTabsColumns="tabsSelected"
                       @on-callback="onCallback"
                       @on-click-btn="childBtnClicked"
                       @on-tabsSelect="tabsSelect"
        >
        </category-tabs>
        <tabs-select-drawer
                :visibleConfig="tabsVisibleConfig"
                :childrenDrawerProps="tabsChildrenDrawer"
                :columns="originColumns"
                :checkedListProps="tabsCheckedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </tabs-select-drawer>
    </a-layout>
</template>

<script>
    import api from '@/api/department';
    import member from '@/api/member';
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    const usedTabs = ['员工']
    let usedTabsColumns = {
        memberInfoColumns: {
            name: '员工',
            show: true,
            columns: [
                {
                    title: '状态 ',
                    dataIndex: 'stopFlag',
                    key: 'stopFlag',
                    scopedSlots: { customRender: 'stopFlag' }
                },
                {
                    title: '助记码',
                    dataIndex: 'empSimpleCode',
                    key: 'empSimpleCode'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'empName',
                    key: 'empName',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '员工编码',
                    dataIndex: 'empCode',
                    key: 'empCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '员工职务',
                    dataIndex: 'empPosition',
                    key: 'empPosition'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'empEmail',
                    key: 'empEmail'
                },
                {
                    title: '办公电话',
                    dataIndex: 'empOfficePhone',
                    key: 'empOfficePhone'
                },
                {
                    title: '移动电话',
                    dataIndex: 'empMobilePhone',
                    key: 'empMobilePhone'
                },
                {
                    title: '家庭电话',
                    dataIndex: 'empHomePhone',
                    key: 'empHomePhone'
                },
                {
                    title: '员工地址',
                    dataIndex: 'empAddress',
                    key: 'empAddress'
                },
                {
                    title: '身份证号',
                    dataIndex: 'empPinNo',
                    key: 'empPinNo'
                },
                {
                    title: '性别',
                    dataIndex: 'empGender',
                    key: 'empGender',
                    scopedSlots: { customRender: 'empGender' }
                },
                {
                    title: '籍贯',
                    dataIndex: 'empBirthPlace',
                    key: 'empBirthPlace'
                },
                {
                    title: '生日',
                    dataIndex: 'empBirthDay',
                    key: 'empBirthDay'
                },
                {
                    title: 'QQ',
                    dataIndex: 'empQq',
                    key: 'empQq'
                },
                {
                    title: '微信号',
                    dataIndex: 'empWechat',
                    key: 'empWechat'
                },
            ],
            specsData: [],
            buttons: ['view'],
            // headerContent: ['more'],
            operateBtnFixed: true,
        },
    }
    const description = {
        "departmentName": "",
        "departmentCode": "",
        "departmentAddress": "",
        "phone": "",
        "fax": "",
        "email": "",
        "businessCode": "",
        "businessName": "",
        "regionCode": "",
        "regionName": "",
        "description": ""
    }
    const descriptionColumn = [
        { name: "departmentName", span: 2 },
        { name: "departmentCode", span: 1 },
        { name: "departmentAddress", span: 3 },
        { name: "phone", span: 1 },
        { name: "fax", span: 1 },
        { name: "email", span: 1 },
        { name: "businessCode", span: 2 },
        { name: "businessName", span: 1 },
        { name: "regionCode", span: 2 },
        { name: "regionName", span: 1 },
        { name: "description", span: 3 }
    ]
    export default {
        name: "ProductInfoDetail",
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                description,
                descriptionColumn,
                usedTabs: usedTabs,
                pane: null,
                usedTabsColumns: usedTabsColumns,
                // tabs选择参数
                tabsVisibleConfig: false,
                tabsChildrenDrawer: false,
                //checkboxgroup里需要默认选中的项
                checkedList: [],
                tabsCheckedList: [],
                originColumns: [],
                columns: [],
                loading: false,
                tabsSelected: {},
                checkedAAAAA: ['memberInfoColumns'],
                // tabs选择参数结束
                pagination: {
                    current: 1,
                    total: 0,
                    pageSize: 10
                }
            }
        },
        mounted(){
            this.getShowList()
            this.getOriginColumns()
            this.getDetail()
            this.getMemberList()
        },
        methods: {
            getDetail(){
                api.getDeptDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.description = {
                            "productMnemonic": data.prodSimpleCode,
                            "productCode": data.prodCode,
                            "productName": data.prodName,
                            "status": "",
                            "productCategory": data.prodClassName,
                            "productPrice": data.prodListPrice,
                            "productCost": "",
                            "checkbox": ['可采购', '可销售', '序列号管理'],
                            "unit": data.unitName,
                            "purchaseReferencePrice": "",
                            "consumptionCycle": "",
                            "compose": "",
                            "taxRate": data.taxRatio,
                            "changeTime": "",
                            "changer": "",
                            "percentageCost": "",
                            "description": "",
                            "remark": ""
                        };
                    }
                })
            },
            getMemberList(){
                let params = {page: this.pagination.current}
                member
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.pagination };
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.usedTabsColumns.memberInfoColumns.specsData = res.data.rows;
                            this.usedTabsColumns.memberInfoColumns.specsData.map( item => {
                                item.link = '/resource_center/member_info_detail?code=' + item.empId
                            })
                        }
                    })
            },
            onCallback(val){
                this.pane = val
            },
            childBtnClicked(type, text, record, index, currentTabs) {
                if (this.pane == '员工' && type == 'view') {
                    this.$router.push({path: '/resource_center/member_info_detail?code=' + record.empId});
                }
            },
            tabsSelect() {
                this.tabsVisibleConfig = true;
            },
            getShowList(arr) {
                let obj = {}
                this.tabsCheckedList = arr || this.checkedAAAAA
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == this.tabsCheckedList[i]) {
                            obj[key] = this.usedTabsColumns[key]
                        }
                    }
                }
                this.tabsSelected = obj
            },
            getOriginColumns() {
                this.originColumns = []
                let usedTabsColumns = this.usedTabsColumns
                for (let key in usedTabsColumns) {
                    this.originColumns.push({dataIndex: key, title: usedTabsColumns[key].name})
                }
                this.columns = []
                let k = 0
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let j = k; j < this.originColumns.length; j++)
                        if (this.originColumns[j].dataIndex.includes(this.tabsCheckedList[i])) {
                            this.columns.push(this.originColumns[j]);
                            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                            k++
                            break
                            // this.originColumns.splice(j, 1)
                            // j--
                        }
                }
                console.log(this.originColumns)
            },
            hideList(){
                this.tabsVisibleConfig = false
            },
            postShow(val) {
                this.tabsChildrenDrawer = true
                let arr = []
                let obj = {}
                for (let i = 0; i < val.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == val[i].dataIndex) {
                            obj[key] = this.usedTabsColumns[key]
                            arr.push(key)
                        }
                    }
                }
                this.tabsSelected = obj
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getShowList(arr)
                    that.getOriginColumns(arr)
                    that.tabsVisibleConfig = false
                    that.tabsChildrenDrawer = false
                }, 500)
            },
        }
    }
</script>

<style scoped>

</style>