<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['处理过程', '相关任务', '工作记录', '日程', '待办事宜', '产品', '竞争产品', '评估记录', '联系人', '相关员工', '已收邮件', '已发邮件', '附件']
    const usedTabsColumns = {
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
                    key: 'theme'
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
            headerContent: ['add'],
            buttons: ['view'],
        },
        stagePlanColumns: {
            name: '阶段计划',
            show: true,
            columns: [
                {
                    title: '计划日期',
                    dataIndex: 'planDate',
                    key: 'planDate'
                },
                {
                    title: '发生日期',
                    dataIndex: 'occurDate',
                    key: 'occurDate'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'taskStage',
                    key: 'taskStage'
                },
                {
                    title: '参与角色',
                    dataIndex: 'character',
                    key: 'character'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        taskPlanExecuteColumns: {
            name: '任务计划执行',
            show: true,
            columns: [
                {
                    title: '开始日期',
                    dataIndex: 'startDate',
                    key: 'startDate'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'taskStage',
                    key: 'taskStage'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        costManagementColumns: {
            name: '费用管理',
            show: true,
            columns: [
                {
                    title: '任务阶段',
                    dataIndex: 'taskStage',
                    key: 'taskStage'
                },
                {
                    title: '阶段预算',
                    dataIndex: 'stageBudget',
                    key: 'stageBudget'
                },
                {
                    title: '发生费用',
                    dataIndex: 'occurCost',
                    key: 'occurCost'
                }
            ],
            buttons: ['view'],
            headerContent: ['add']
        },
        costDetailColumns: {
            name: '费用明细',
            show: true,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'startDate',
                    key: 'startDate'
                },
                {
                    title: '结束时间',
                    dataIndex: 'endDate',
                    key: 'endDate'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '费用名称',
                    dataIndex: 'costName',
                    key: 'costName'
                },
                {
                    title: '发生费用',
                    dataIndex: 'occurCost',
                    key: 'occurCost'
                }
            ],
        },
        questionDiscussColumns: {
            name: '问题讨论',
            show: true,
            columns: [
                {
                    title: '修改时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content'
                },
                {
                    title: '发表员工',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
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
                    key: 'theme'
                }
            ],
            buttons: ['view'],
            headerContent: ['add']
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
                    dataIndex: 'endTime',
                    key: 'endTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
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
            headerContent: ['add']
        },
        productColumns: {
            name: '产品',
            show: true,
            columns: [
                {
                    title: '产品分类',
                    dataIndex: 'productCategory',
                    key: 'productCategory'
                },
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name'
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
                },
                {
                    title: '场地费',
                    dataIndex: 'siteFee',
                    key: 'siteFee'
                },
                {
                    title: '组合产品',
                    dataIndex: 'mixProduct',
                    key: 'mixProduct'
                },
                {
                    title: '可采购',
                    dataIndex: 'purchasable',
                    key: 'purchasable'
                },
                {
                    title: '可销售',
                    dataIndex: 'salable',
                    key: 'salable'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '单位成本',
                    dataIndex: 'unitcost',
                    key: 'unitcost'
                },
                {
                    title: '采购参考价',
                    dataIndex: 'purchasePrice',
                    key: 'purchasePrice'
                },
                {
                    title: '消费周期（天）',
                    dataIndex: 'saleCycle',
                    key: 'saleCycle'
                },
                {
                    title: '序列号管理',
                    dataIndex: 'serialNumber',
                    key: 'serialNumber'
                },
                {
                    title: '当前库存',
                    dataIndex: 'stock',
                    key: 'stock'
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
                },
                {
                    title: '图文链接',
                    dataIndex: 'link',
                    key: 'link'
                },
                {
                    title: '产品数量',
                    dataIndex: 'productAmount',
                    key: 'productAmount'
                },
                {
                    title: '产品价格',
                    dataIndex: 'productPrice',
                    key: 'productPrice'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view', 'delete']
        },
        proposalColumns: {
            name: '报价单',
            show: true,
            columns: [
                {
                    title: '标志',
                    dataIndex: 'sign',
                    key: 'sign'
                },
                {
                    title: '报价单分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '报价单号',
                    dataIndex: 'sheet',
                    key: 'sheet'
                },
                {
                    title: '报价摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '报价日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '金额',
                    dataIndex: 'amount',
                    key: 'amount'
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
                },
                {
                    title: '汇率',
                    dataIndex: 'rate',
                    key: 'rate'
                },
                {
                    title: '外币金额',
                    dataIndex: 'foreignCurrencyAmount',
                    key: 'foreignCurrencyAmount'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '客户编码',
                    dataIndex: 'customerCode',
                    key: 'customerCode'
                },
                {
                    title: '客户助记符',
                    dataIndex: 'customerMnemonic',
                    key: 'customerMnemonic'
                },
                {
                    title: '客户识别方式',
                    dataIndex: 'customerDiscernWay',
                    key: 'customerDiscernWay'
                },
                {
                    title: '客户识别号码',
                    dataIndex: 'customerDiscernNumber',
                    key: 'customerDiscernNumber'
                },
                {
                    title: '客户邮件',
                    dataIndex: 'customerMail',
                    key: 'customerMail'
                },
                {
                    title: '客户电话',
                    dataIndex: 'customerPhone',
                    key: 'customerPhone'
                },
                {
                    title: '客户传真',
                    dataIndex: 'customerFax',
                    key: 'customerFax'
                },
                {
                    title: '客户地址',
                    dataIndex: 'customerAddress',
                    key: 'customerAddress'
                },
                {
                    title: '客户邮编',
                    dataIndex: 'customerPostalCode',
                    key: 'customerPostalCode'
                },
                {
                    title: '伙伴助记符',
                    dataIndex: 'partnerMnemonic',
                    key: 'partnerMnemonic'
                },
                {
                    title: '伙伴识别方式',
                    dataIndex: 'partnerDiscernWay',
                    key: 'partnerDiscernWay'
                },
                {
                    title: '伙伴识别号码',
                    dataIndex: 'partnerDiscernNumber',
                    key: 'partnerDiscernNumber'
                },
                {
                    title: '伙伴邮件',
                    dataIndex: 'partnerMail',
                    key: 'partnerMail'
                },
                {
                    title: '伙伴电话',
                    dataIndex: 'partnerPhone',
                    key: 'partnerPhone'
                },
                {
                    title: '伙伴传真',
                    dataIndex: 'partnerFax',
                    key: 'partnerFax'
                },
                {
                    title: '伙伴地址',
                    dataIndex: 'partnerAddress',
                    key: 'partnerAddress'
                },
                {
                    title: '伙伴邮编',
                    dataIndex: 'partnerPostalCode',
                    key: 'partnerPostalCode'
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
                },
                {
                    title: '关闭日期',
                    dataIndex: 'closeDate',
                    key: 'closeDate'
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
                }
            ],
            buttons: ['view'],
            headerContent: ['add']
        },
        competeProductColumns: {
            name: '竞争产品',
            show: true,
            columns: [
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    key: 'productName'
                },
                {
                    title: '产品分类',
                    dataIndex: 'productCategory',
                    key: 'productCategory'
                },
                {
                    title: '竞争对手名称',
                    dataIndex: 'competitorName',
                    key: 'competitorName'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit'
                },
                {
                    title: '产品价格',
                    dataIndex: 'productPrice',
                    key: 'productPrice'
                }
            ],
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: true,
        },
        competitorColumns: {
            name: '竞争对手',
            show: true,
            columns: [
                {
                    title: '竞争对手编码',
                    dataIndex: 'competitorCode',
                    key: 'competitorCode'
                },
                {
                    title: '竞争对手名称',
                    dataIndex: 'competitorName',
                    key: 'competitorName'
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
                    title: '主页',
                    dataIndex: 'index',
                    key: 'index'
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address'
                }
            ],
            headerContent: ['add'],
            buttons: ['view']
        },
        competitorOrderColumns: {
            name: '竞争订单',
            show: true,
            columns: [
                {
                    title: '订单日期',
                    dataIndex: 'orderDate',
                    key: 'orderDate'
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
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '单据摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ],
            buttons: ['view']
        },
        contactListColumns: {
            name: '联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '客户/伙伴/供应商名称',
                    dataIndex: 'customerName',
                    key: 'customerName'
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
                }
            ],
            buttons: ['delete', 'view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        relatedMemberColumns: {
            name: '相关员工',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'memberName',
                    key: 'memberName'
                },
                {
                    title: '员工编码',
                    dataIndex: 'memberCode',
                    key: 'memberCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '部门编码',
                    dataIndex: 'departmentCode',
                    key: 'departmentCode'
                },
                {
                    title: '员工职务',
                    dataIndex: 'memberDuty',
                    key: 'memberDuty'
                },
                {
                    title: '员工角色',
                    dataIndex: 'memberCharacter',
                    key: 'memberCharacter'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '办公电话',
                    dataIndex: 'officePhone',
                    key: 'officePhone'
                },
                {
                    title: '移动电话',
                    dataIndex: 'mobilePhone',
                    key: 'mobilePhone'
                },
                {
                    title: '家庭电话',
                    dataIndex: 'homePhone',
                    key: 'homePhone'
                },
                {
                    title: 'BP机',
                    dataIndex: 'BP',
                    key: 'BP'
                },
                {
                    title: '员工地址',
                    dataIndex: 'memberAddress',
                    key: 'memberAddress'
                },
                {
                    title: '身份证号',
                    dataIndex: 'ID',
                    key: 'ID'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex'
                },
                {
                    title: '籍贯',
                    dataIndex: 'nativePlace',
                    key: 'nativePlace'
                },
                {
                    title: 'ICQ号',
                    dataIndex: 'ICQ',
                    key: 'ICQ'
                },
                {
                    title: '生日',
                    dataIndex: 'birthday',
                    key: 'birthday'
                },
                {
                    title: '入职时间',
                    dataIndex: 'entryTime',
                    key: 'entryTime'
                },
                {
                    title: '离职时间',
                    dataIndex: 'leaveTime',
                    key: 'leaveTime'
                },
                {
                    title: 'QQ',
                    dataIndex: 'QQ',
                    key: 'QQ'
                },
                {
                    title: '民族',
                    dataIndex: 'nation',
                    key: 'nation'
                },
                {
                    title: '微信号',
                    dataIndex: 'wechat',
                    key: 'wechat'
                },
                {
                    title: '现住址',
                    dataIndex: 'nowAddress',
                    key: 'nowAddress'
                },
                {
                    title: '兴趣爱好',
                    dataIndex: 'hobby',
                    key: 'hobby'
                },
                {
                    title: '政治面貌',
                    dataIndex: 'policy',
                    key: 'policy'
                },
                {
                    title: '任务角色',
                    dataIndex: 'taskCharacter',
                    key: 'taskCharacter'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
        partnerColumns: {
            name: '合作伙伴',
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
                    dataIndex: 'partnerMnemonic',
                    key: 'partnerMnemonic'
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
                    title: '网站主页',
                    dataIndex: 'index',
                    key: 'index'
                }
            ],
            headerContent: ['add'],
            buttons: ['view']
        },
        saleChanceColumns: {
            name: '销售机会',
            show: true,
            columns: [
                {
                    title: '标志',
                    dataIndex: 'sign',
                    key: 'sign'
                },
                {
                    title: '来源类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
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
                },
                {
                    title: '关闭员工',
                    dataIndex: 'employee',
                    key: 'employee'
                },
                {
                    title: '关闭时间',
                    dataIndex: 'closeTime',
                    key: 'closeTime'
                }
            ],
            headerContent: ['add'],
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
                    key: 'theme'
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            headerContent: ['add'],
            buttons: ['view']
        },
        activityColumns: {
            name: '市场活动',
            show: true,
            columns: [
                {
                    title: '市场活动分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '活动代码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '开始日期',
                    dataIndex: 'startDate',
                    key: 'startDate'
                },
                {
                    title: '活动名称',
                    dataIndex: 'activityName',
                    key: 'activityName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '主讲人',
                    dataIndex: 'speaker',
                    key: 'speaker'
                },
                {
                    title: '到场人数',
                    dataIndex: 'presentPerson',
                    key: 'presentPerson'
                },
                {
                    title: '场地费',
                    dataIndex: 'siteFee',
                    key: 'siteFee'
                },
                {
                    title: '活动链接',
                    dataIndex: 'link',
                    key: 'link'
                }
            ],
            headerContent: ['add'],
            buttons: ['view']
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
                    key: 'theme'
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
                    key: 'theme'
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
            headerContent: ['add'],
            buttons: ['view'],
            operateBtnFixed: true,
        }
    }

    export default {
        name: "SalesTaskDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description: { "productMnemonic": "aa", "productCode": "1211", "productName": "dd"},
                descriptionColumn: ["productCode", "productName", "productMnemonic"],
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns
            }
        }
    }
</script>

<style scoped>

</style>