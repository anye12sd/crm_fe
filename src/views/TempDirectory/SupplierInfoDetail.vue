<!--供应商信息详情-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['联系人','账户列表','相关员工','负责员工','负责员工变动','负责部门','参与的市场活动','相关反馈','相关任务','工作记录','询价单','采购订单','采购退货','工作日程','待办事宜','价值变动','已收邮件','已发邮件','附件']
    const usedTabsColumns = {
        contactListColumns: {
            name: '联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '联系人部门',
                    dataIndex: 'contactDepartment',
                    key: 'contactDepartment'
                },
                {
                    title: '职务',
                    dataIndex: 'duty',
                    key: 'duty'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'Email',
                    key: 'Email'
                },
                {
                    title: '办公电话',
                    dataIndex: 'officeLine',
                    key: 'officeLine'
                },
                {
                    title: '移动电话',
                    dataIndex: 'mobilePhone',
                    key: 'mobilePhone'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        accountListColumns: {
            name: '账户列表',
            show: true,
            columns: [
                {
                    title: '账户编码',
                    dataIndex: 'accountCode',
                    key: 'accountCode'
                },
                {
                    title: '账户名称',
                    dataIndex: 'accountName',
                    key: 'accountName',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '详细地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '账户余额',
                    dataIndex: 'accountSurplus',
                    key: 'accountSurplus'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        relatedEmployeeColumns: {
            name: '相关员工',
            show: true,
            columns: [
                {
                    title: '员工编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工职务',
                    dataIndex: 'duty',
                    key: 'duty'
                },
                {
                    title: '员工角色',
                    dataIndex: 'character',
                    key: 'character'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        dutyMemberColumns: {
            name: '负责员工',
            show: true,
            columns: [
                {
                    title: '员工编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '部门姓名',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工职务',
                    dataIndex: 'duty',
                    key: 'duty'
                },
                {
                    title: '员工角色',
                    dataIndex: 'character',
                    key: 'character'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        dutyMemberChangeColumns: {
            name: '负责员工变动',
            show: true,
            columns: [
                {
                    title: '员工编码',
                    dataIndex: 'memberCode',
                    key: 'memberCode'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'memberName',
                    key: 'memberName'
                },
                {
                    title: '客户/伙伴名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '分配时间',
                    dataIndex: 'appointTime',
                    key: 'appointTime'
                },
                {
                    title: '收回时间',
                    dataIndex: 'recoverTime',
                    key: 'recoverTime'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '修改人',
                    dataIndex: 'changer',
                    key: 'changer'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                }
            ],
            operateBtnFixed: true,
        },
        dutyDepartmentListColumns: {
            name: '负责部门',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '部门编码',
                    dataIndex: 'departmentCode',
                    key: 'departmentCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '电话',
                    dataIndex: 'cellphone',
                    key: 'cellphone'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email',
                    scopedSlots: { customRender: 'link2' }
                },
                {
                    title: '部门地址',
                    dataIndex: 'address',
                    key: 'address'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view', 'delete']
        },
        joinedActivityColumns: {
            name: '参与的市场活动',
            show: true,
            columns: [
                {
                    title: '开始日期',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '市场活动分类 ',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '活动代码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '活动名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '活动预算',
                    dataIndex: 'activityBudget',
                    key: 'activityBudget'
                },
                {
                    title: '活动费用',
                    dataIndex: 'activityFee',
                    key: 'activityFee'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        feedBackColumns: {
            name: '相关反馈',
            show: true,
            columns: [
                {
                    title: '解决期限',
                    dataIndex: 'deadline',
                    key: 'deadline'
                },
                {
                    title: '重要性',
                    dataIndex: 'important',
                    key: 'important'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '反馈分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'link2' }
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                },
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
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
                    scopedSlots: { customRender: 'link' }
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
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        workRecordColumns: {
            name: '工作记录',
            show: true,
            columns: [
                {
                    title: '标志',
                    dataIndex: 'sign',
                    key: 'sign'
                },
                {
                    title: '工作记录分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '工作记录对象',
                    dataIndex: 'target',
                    key: 'target',
                    scopedSlots: { customRender: 'link2' }
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
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
                    dataIndex: 'memberName',
                    key: 'memberName'
                },
                {
                    title: '任务主题',
                    dataIndex: 'missionTheme',
                    key: 'missionTheme',
                    width: '40%',
                },
                {
                    title: '发生费用',
                    dataIndex: 'realisedExpense',
                    key: 'realisedExpense'
                },
                {
                    title: '批准费用',
                    dataIndex: 'approveExpense',
                    key: 'approveExpense'
                },
                {
                    title: '是否锁定',
                    dataIndex: 'isLocked',
                    key: 'isLocked'
                },
                {
                    title: '锁定员工',
                    dataIndex: 'lockMember',
                    key: 'lockMember'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add', 'displaylist'],
            buttons: ['view']
        },
        enquirySheetColumns: {
            name: '询价单',
            show: true,
            columns: [
                {
                    title: '询价单分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '询价单号',
                    dataIndex: 'sheet',
                    key: 'sheet'
                },
                {
                    title: '询价日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            buttons: ['view']
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
                    key: 'code',
                    scopedSlots: { customRender: 'link' }
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
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            headerContent: ['add'],
            buttons: ['view']
        },
        supplierReturnNoteColumns: {
            name: '采购退货',
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
                    key: 'code',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '采购摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '采购总额',
                    dataIndex: 'supplierAmount',
                    key: 'supplierAmount'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                },
            ],
            headerContent: ['add'],
            buttons: ['view']
        },
        scheduleColumns: {
            name: '工作日程',
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
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '地点',
                    dataIndex: 'place',
                    key: 'place'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        todoListColumns: {
            name: '待办事宜',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '完成期限',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
                    scopedSlots: { customRender: 'link' }
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
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        valueChangeColumns: {
            name: '价值变动',
            show: true,
            columns: [
                {
                    title: '更新属性',
                    dataIndex: 'updateProperty',
                    key: 'updateProperty'
                },
                {
                    title: '原值',
                    dataIndex: 'originValue',
                    key: 'originValue'
                },
                {
                    title: '更新值',
                    dataIndex: 'updateValue',
                    key: 'updateValue'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: '修改人',
                    dataIndex: 'changer',
                    key: 'changer'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                }
            ],
            operateBtnFixed: true,
        },
        mailReceivedColumns: {
            name: '已收邮件',
            show: true,
            columns: [
                {
                    title: '发件人姓名',
                    dataIndex: 'senderName',
                    key: 'senderName'
                },
                {
                    title: '发件人邮件',
                    dataIndex: 'sentMail',
                    key: 'sentMail'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                },
                {
                    title: '发送时间',
                    dataIndex: 'sentTime',
                    key: 'sentTime'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        mailSentColumns:{
            name: '已发邮件',
            show: true,
            columns: [
                {
                    title: '发件人姓名',
                    dataIndex: 'senderName',
                    key: 'senderName'
                },
                {
                    title: '发件人邮件',
                    dataIndex: 'sentMail',
                    key: 'sentMail'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                },
                {
                    title: '发送时间',
                    dataIndex: 'sentTime',
                    key: 'sentTime'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
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
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
    }
    const description =  //对象
        {
            "supplierMnemonic": "aa",
            "supplierCode": "1211",
            "supplierName": "dd",
            "categoryName": "产品供应商",
            "superiorDepartment": "上级单位1",
            "lastContactTime": "2021-01-14 14:25",
            "addressDetail": "",
            "postcode": "321300",
            "phone": "",
            "createTime": "2020-06-04 10:30",
            "mobilePhone": "1",
            "fax": "否",
            "creator": "实施顾问",
            "nation": "",
            "email": "",
            "changeTime": "2020-06-04 10:30",
            "province": "",
            "website": "",
            "changer": "ssgw",
            "city": "",
            "recognizeNumber": "",
            "recognizeWay": "",
            "remark": "",
        }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            {name: "supplierCode", span: 1},
            {name: "supplierMnemonic", span: 1},
            {name: "supplierName", span: 1},
            {name: "categoryName", span: 1},
            {name: "superiorDepartment", span: 1},
            {name: "lastContactTime", span: 1},
            {name: "addressDetail", span: 3},
            {name: "postcode", span: 1},
            {name: "phone", span: 1},
            {name: "createTime", span: 1},
            {name: "mobilePhone", span: 1},
            {name: "fax", span: 1},
            {name: "creator", span: 1},
            {name: "nation", span: 1},
            {name: "email", span: 1},
            {name: "changeTime", span: 1},
            {name: "province", span: 1},
            {name: "website", span: 1},
            {name: "changer", span: 1},
            {name: "city", span: 1},
            {name: "recognizeNumber", span: 1},
            {name: "recognizeWay", span: 1},
            {name: "remark", span: 3},
        ]

    export default {
        name: "SupplierInfoDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description,
                descriptionColumn,
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns
            }
        }
    }
</script>

<style scoped>

</style>