<!--员工信息详情-->
<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionColumn="descriptionColumn"
        ></description-item>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                @on-callback="onCallback"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
        ></category-tabs>
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
    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';

    const usedTabs = [
        '角色',
        '销售订单动作',
        '采购订单动作',
        '工作报告',
        '相关任务',
        '工作记录',
        '相关反馈',
        '日程',
        '待办事宜',
        '销售机会',
        '报价单',
        '销售订单',
        '销售退货单',
        '采购订单',
        '采购退货单',
        '附件'
    ];
    const usedTabsColumns = {
        characterColumns: {
            name: '角色',
            show: true,
            columns: [
                {
                    title: '角色名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                }
            ]
        },
        salesActionColumns: {
            name: '销售订单动作',
            show: true,
            columns: [
                {
                    title: '序号 ',
                    dataIndex: 'index',
                    key: 'index'
                },
                {
                    title: '单据分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '销售订单动作',
                    dataIndex: 'salesAction',
                    key: 'salesAction'
                }
            ]
        },
        purchaseActionColumns: {
            name: '采购订单动作',
            show: true,
            columns: [
                {
                    title: '序号 ',
                    dataIndex: 'index',
                    key: 'index'
                },
                {
                    title: '单据分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '采购订单动作',
                    dataIndex: 'purchaseAction',
                    key: 'purchaseAction'
                }
            ]
        },
        workReportColumns: {
            name: '工作报告',
            show: true,
            columns: [
                {
                    title: '开始日期 ',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '结束日期',
                    dataIndex: 'endTime',
                    key: 'endTime'
                }
            ],
            buttons: ['view']
        },
        relatedMissionColumns: {
            name: '相关任务',
            show: true,
            columns: [
                {
                    title: '任务日期',
                    dataIndex: 'missionDate',
                    key: 'missionDate'
                },
                {
                    title: '完成期限',
                    dataIndex: 'completeUnderline',
                    key: 'completeUnderline'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'stage',
                    key: 'stage'
                },
                {
                    title: '任务主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '任务对象',
                    dataIndex: 'missionObject',
                    key: 'missionObject'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '负责人',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            buttons: ['view']
        },
        workRecordColumns: {
            name: '工作记录',
            show: true,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '任务主题',
                    dataIndex: 'missionTheme',
                    key: 'missionTheme',
                    width: '20%'
                },
                {
                    title: '发生费用',
                    dataIndex: 'realisedExpense',
                    key: 'realisedExpense'
                }
            ],
            buttons: ['view']
        },
        feedBackColumns: {
            name: '相关反馈',
            show: true,
            columns: [
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '群号',
                    dataIndex: 'className',
                    key: 'className'
                },
                {
                    title: '交付内容',
                    dataIndex: 'content',
                    key: 'content'
                },
                {
                    title: '反馈分类',
                    dataIndex: 'classify',
                    key: 'classify'
                },
                {
                    title: '最新进度',
                    dataIndex: 'latestProgress',
                    key: 'latestProgress'
                },
                {
                    title: '解决期限',
                    dataIndex: 'underline',
                    key: 'underline'
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                },
                {
                    title: '反馈类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
        },
        scheduleColumns: {
            name: '日程',
            show: true,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    key: 'endTime'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                }
            ],
            buttons: ['view'],
            headerContent: ['more']
        },
        todoListColumns: {
            name: '待办事宜',
            show: true,
            columns: [
                {
                    title: '完成期限',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: '重要性',
                    dataIndex: 'important',
                    key: 'important'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        saleChanceColumns: {
            name: '销售机会',
            show: true,
            columns: [
                {
                    title: '来源类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                },
                {
                    title: '客户/伙伴名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '销售预期',
                    dataIndex: 'saleExpect',
                    key: 'saleExpect'
                },
                {
                    title: '预期日期',
                    dataIndex: 'expectDate',
                    key: 'expectDate'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            buttons: ['view'],
        },
        proposalColumns: {
            name: '报价单',
            show: true,
            columns: [
                {
                    title: '报价日期',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '报价单号',
                    dataIndex: 'sheet',
                    key: 'sheet'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '报价摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'department',
                    key: 'department'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ]
        },
        orderListColumns: {
            name: '销售订单',
            show: true,
            columns: [
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                },
                {
                    title: '订单金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '欠款金额',
                    dataIndex: 'unpaidPrice',
                    key: 'unpaidPrice'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
        },
        returnNoteColumns: {
            name: '销售退货单',
            show: true,
            columns: [
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '退货单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '退货金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
        },
        purchaseListColumns: {
            name: '采购订单',
            show: true,
            columns: [
                {
                    title: '采购日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '采购订单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '采购摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '采购总额',
                    dataIndex: 'purchaseAmount',
                    key: 'purchaseAmount'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'department',
                    key: 'department'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ]
        },
        supplierReturnNoteColumns: {
            name: '采购退货单',
            show: true,
            columns: [
                {
                    title: '采购日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '采购退货单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '采购摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '退货总额',
                    dataIndex: 'returnNoteAmount',
                    key: 'returnNoteAmount'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'department',
                    key: 'department'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ]
        },
        annexColumns: {
            name: '附件',
            show: true,
            columns: [
                {
                    title: '附件名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '附件描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '附件大小',
                    dataIndex: 'annexByte',
                    key: 'annexByte'
                },
                {
                    title: '上载员工',
                    dataIndex: 'uploadEmployee',
                    key: 'uploadEmployee'
                },
                {
                    title: '锁定员工',
                    dataIndex: 'lockEmployee',
                    key: 'lockEmployee'
                }
            ],
            buttons: ['view'],
            headerContent: ['add']
        }
    };
    const description = {// 对象
        'memberCode': '001',
        'memberName': '何宝荣',
        'memberMnemonic': 'hbr',
        'departmentName': '集团总公司',
        'loginName': 'hbr',
        'memberDuty': '',
        'memberAddress': '永康市',
        'officePhone': '0579-88888888',
        'email': 'a@163.com',
        'mobilePhone': '13813813813',
        'ICQ': '',
        'BP': '',
        'homeNumber': '',
        'idNumber': '',
        'birthday': '',
        'sex': '',
        'nativePlace': '浙江',
        'education': '本科',
        'entryTime': '2020-01-01',
        'leaveTime': '2020-01-02',
        'cdf': 'cdf',
        'QQ': '',
        'national': '汉族',
        'wechat': '',
        'addressNow': '',
        'hobby': '',
        'policy': '',
        'remark': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'memberCode', span: 1 },
            { name: 'memberName', span: 1 },
            { name: 'memberMnemonic', span: 1 },
            { name: 'departmentName', span: 1 },
            { name: 'loginName', span: 1 },
            { name: 'memberDuty', span: 1 },
            { name: 'memberAddress', span: 2 },
            { name: 'officePhone', span: 1 },
            { name: 'email', span: 2 },
            { name: 'mobilePhone', span: 1 },
            { name: 'ICQ', span: 1 },
            { name: 'BP', span: 1 },
            { name: 'homeNumber', span: 1 },
            { name: 'idNumber', span: 1 },
            { name: 'birthday', span: 1 },
            { name: 'sex', span: 1 },
            { name: 'nativePlace', span: 1 },
            { name: 'education', span: 1 },
            { name: 'entryTime', span: 1 },
            { name: 'leaveTime', span: 1 },
            { name: 'cdf', span: 1 },
            { name: 'QQ', span: 1 },
            { name: 'national', span: 1 },
            { name: 'wechat', span: 1 },
            { name: 'addressNow', span: 1 },
            { name: 'hobby', span: 1 },
            { name: 'policy', span: 1 },
            { name: 'remark', span: 3 },
        ]

    import member from '@/api/member';
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";
    export default {
        name: 'MemberInfoDetail',
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                description,
                descriptionColumn,
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
                pane: null,
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
                checkedAAAAA: ['characterColumns', 'salesActionColumns', 'purchaseActionColumns', 'workReportColumns', 'relatedMissionColumns'],
                // tabs选择参数结束
                pagination: {
                    current: 1,
                    total: 0,
                    pageSize: 10
                }
            };
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
            this.getDetail()
        },
        methods: {
            // 选中行
            customRow() {
                return {
                    on: {
                        click: (e) => {
                            const oldList = document.querySelectorAll('.checked-td-of-add-table');
                            if (oldList) {
                                for (let j = 0; j < oldList.length; j++) {
                                    oldList[j].classList.remove('checked-td-of-add-table');
                                }
                            }
                            const children = e.target.parentNode.children;
                            for (let i = 0; i < children.length; i++) {
                                children[i].classList.add('checked-td-of-add-table');
                            }
                        }
                    }
                };
            },
            getDetail(){
                member.getMemberDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.description = {
                            //对象
                            'memberCode': data.empCode,
                            'memberName': data.empName,
                            'memberMnemonic': data.empSimpleCode,
                            'departmentName': data.deptName,
                            'loginName': data.loginName,
                            'memberDuty': data.empPosition,
                            'memberAddress': data.empAddress,
                            'officePhone': data.empOfficePhone,
                            'email': data.empEmail,
                            'mobilePhone': data.empMobilePhone,
                            'ICQ': '',
                            'BP': '',
                            'homeNumber': data.empHomePhone,
                            'idNumber': data.empPinNo,
                            'birthday': data.empBirthDay,
                            'sex': data.empGender == 0? '男' : '女',
                            'nativePlace': data.empBirthPlace,
                            'education': data.empEduLevel,
                            'entryTime': '',
                            'leaveTime': '',
                            'cdf': '',
                            'QQ': data.empQq,
                            'national': '',
                            'wechat': data.empWechat,
                            'hobby': '',
                            'policy': '',
                            'remark': data.empMemo,
                        };
                    }else {
                        this.$message.error(res.msg)
                    }
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onCallback(val){
                this.pagination.current = 1
                this.pane = val
                if(val == '工作记录'){
                    this.getRecordList()
                }else if(val == '相关反馈'){
                    this.getFdbkList()
                }
            },
            getRecordList(){
                console.log('工作记录接口')
            },
            getFdbkList(){
                console.log('相关反馈接口')
            },
            childBtnClicked(type, text, record, index, currentTabs) {
                if (Object.keys(usedTabsColumns)[currentTabs] == 'workRecordColumns' && type == 'view') {
                    this.$router.push({path: '/sales_management/sales_record_detail'});
                }
                if (Object.keys(usedTabsColumns)[currentTabs] == 'todoListColumns' && type == 'view') {
                    this.$router.push({path: '/TempDirectory/ToDoListDetail'});
                }
                if (Object.keys(usedTabsColumns)[currentTabs] == 'orderListColumns' && type == 'view') {
                    this.$router.push({path: '/sales_order/order_info_detail'});
                }
                if (Object.keys(usedTabsColumns)[currentTabs] == 'orderListColumns' && type == 'view') {
                    this.$router.push({path: '/sales_order/order_info_detail'});
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
    };
</script>

<style scoped>
</style>