<!--销售机会详情-->
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
        dealProcessColumns: {
            name: '处理过程',
            show: true,
            columns: [
                {
                    title: '修改时间 ',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
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
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: false,
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
                    key: 'theme'
                },
                {
                    title: '任务对象',
                    dataIndex: 'target',
                    key: 'target'
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
            operateBtnFixed: true,
            headerContent: ['add'],
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
                    key: 'theme'
                },
                {
                    title: '任务主题',
                    dataIndex: 'missionTheme',
                    key: 'missionTheme'
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
            buttons: ['delete'],
        },
        scheduleColumns: {
            name: '日程',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
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
                    dataIndex: 'startTime',
                    key: 'startTime'
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
            headerContent: ['add'],
            buttons: ['view']
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
        competeProductColumns: {
            name: '竞争产品',
            show: true,
            columns: [
                {
                    title: '竞争对手名称 ',
                    dataIndex: 'competitorName',
                    key: 'competitorName'
                },
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
                    dataIndex: 'competitorName2',
                    key: 'competitorName2'
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
        AssessRecordColumns: {
            name: '评估记录',
            show: true,
            columns: [
                {
                    title: '提交时间 ',
                    dataIndex: 'submitTime',
                    key: 'submitTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
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
            buttons: ['view'],
            operateBtnFixed: true,
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
                    title: '客户名',
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
        memberListColumns: {
            name: '相关员工',
            show: true,
            columns: [
                {
                    title: '状态 ',
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
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
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
            ]
        }
    }
    const description = {// 对象
        'customerName': '001',
        'theme': '何宝荣',
        'expectDate': '2020-01-01',
        'saleExpect': '集团总公司',
        'originCategory': 'hbr',
        'DepartmentName': '',
        'createTime': '永康市',
        'creator': 'a@163.com',
        'responsibleEmployee': '13813813813',
        'changeTime': '',
        'changer': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'customerName', span: 3 },
            { name: 'theme', span: 3 },
            { name: 'expectDate', span: 1 },
            { name: 'saleExpect', span: 1 },
            { name: 'originCategory', span: 1 },
            { name: 'departmentName', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'responsibleEmployee', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'changer', span: 1 },
        ]

    export default {
        name: "SalesChanceDetail",
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