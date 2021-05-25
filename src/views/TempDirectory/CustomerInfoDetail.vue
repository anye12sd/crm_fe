<!--客户信息-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['联系人','账户列表','相关员工','负责员工','负责员工变动','负责部门','相关伙伴','积分明细','竞争订单','已购产品','感兴趣产品','销售机会','报价单','销售订单','销售退货单','市场调查','服务调查','参与的市场活动','相关反馈','相关任务','工作记录','工作日程','待办事宜','价值变动','已收邮件','已发邮件','附件']
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
        relatedPartnerColumns: {
            name: '相关伙伴',
            show: true,
            columns: [
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '伙伴助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'cellphone',
                    key: 'cellphone'
                },
                {
                    title: '详细地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '网站主页',
                    dataIndex: 'website',
                    key: 'website'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete', 'view']
        },
        integralDetailColumns: {
            name: '积分明细',
            show: true,
            columns: [
                {
                    title: '客户名',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '账户名称',
                    dataIndex: 'nickname',
                    key: 'nickname',
                    scopedSlots: { customRender: 'link2' }
                },
                {
                    title: '积分数量',
                    dataIndex: 'integralAmount',
                    key: 'integralAmount'
                },
                {
                    title: '积分来源',
                    dataIndex: 'integralOrigin',
                    key: 'integralOrigin'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code',
                    scopedSlots: { customRender: 'link4' }
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
            headerContent: ['add', 'displaylist'],
        },
        competitorListColumns: {
            name: '竞争订单',
            show: true,
            columns: [
                {
                    title: '订单日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '竞争对手名称',
                    dataIndex: 'competitorName',
                    key: 'competitorName'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '订单金额',
                    dataIndex: 'orderAmount',
                    key: 'orderAmount'
                },
                {
                    title: '单据摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        purchasedProductColumns: {
            name: '已购产品',
            show: true,
            columns: [
                {
                    title: '单据分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '产品编码',
                    dataIndex: 'productCode',
                    key: 'productCode'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品分类',
                    dataIndex: 'productCategory',
                    key: 'productCategory'
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit'
                },
                {
                    title: '定价',
                    dataIndex: 'price',
                    key: 'price'
                }
            ],
            operateBtnFixed: true,
        },
        interestedProductColumns: {
            name: '感兴趣产品',
            show: true,
            columns: [
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    key: 'productName'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit'
                },
                {
                    title: '定价',
                    dataIndex: 'price',
                    key: 'price'
                }
            ],
            operateBtnFixed: true,
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
                    width: '40%',
                },
                {
                    title: '销售预期',
                    dataIndex: 'salesExpect',
                    key: 'salesExpect'
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
                    dataIndex: 'dutyMember',
                    key: 'dutyMember'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        proposalColumns: {
            name: '报价单',
            show: true,
            columns: [
                {
                    title: '报价日期',
                    dataIndex: 'proposalTime',
                    key: 'proposalTime'
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
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        orderListColumns: {
            name: '销售订单',
            show: true,
            columns: [
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employeeName',
                    key: 'employeeName'
                },
                {
                    title: '订单金额',
                    dataIndex: 'orderAmount',
                    key: 'orderAmount'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '活动名称',
                    dataIndex: 'activityName',
                    key: 'activityName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
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
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        marketResearchColumns: {
            name: '市场调查',
            show: true,
            columns: [
                {
                    title: '提交时间 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
                },
                {
                    title: '总分',
                    dataIndex: 'allScore',
                    key: 'allScore'
                },
                {
                    title: '得分',
                    dataIndex: 'getScore',
                    key: 'getScore'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
        },
        serviceResearchColumns: {
            name: '服务调查',
            show: true,
            columns: [
                {
                    title: '提交时间 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
                },
                {
                    title: '总分',
                    dataIndex: 'allScore',
                    key: 'allScore'
                },
                {
                    title: '得分',
                    dataIndex: 'getScore',
                    key: 'getScore'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
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
                    dataIndex: 'underline',
                    key: 'underline'
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
                    width: '40%',
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
                    width: '40%',
                    scopedSlots: { customRender: 'link' }
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
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add', 'displaylist'],
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
                    width: '40%',
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
                    width: '40%',
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
        mailSentColumns: {
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
                    width: '40%',
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

    export default {
        name: "CustomerInfoDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description: { "productMnemonic": "aa", "productCode": "1211", "productName": "dd"},//对象
                descriptionColumn: ["productCode", "productName", "productMnemonic"],// 对象按顺序排列的数组
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns
            }
        }
    }
</script>

<style scoped>

</style>