<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['使用部门','有效销售额','预收','销售收款','转账记录','积分明细','相关发票','附件']
    const usedTabsColumns = {
        usedDepartmentColumns: {
            name: '使用部门',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '部门编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '部门名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                }
            ],
            buttons: ['delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        salesAmountColumns: {
            name: '有效销售额',
            show: true,
            columns: [
                {
                    title: '支付日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '发生金额',
                    dataIndex: 'amount',
                    key: 'amount'
                }
            ],
            operateBtnFixed: true,
        },
        advanceReceivedColumns: {
            name: '预收',
            show: true,
            columns: [
                {
                    title: '发生日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '原始单据编码',
                    dataIndex: 'originCode',
                    key: 'originCode'
                },
                {
                    title: '发生金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ],
            operateBtnFixed: true,
        },
        salesMoneyCollectColumns: {
            name: '销售收款',
            show: true,
            columns: [
                {
                    title: '发生日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '原始单据编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '发生金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        tradeRecordColumns: {
            name: '转账记录',
            show: true,
            columns: [
                {
                    title: '账户名称 ',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '转账方向',
                    dataIndex: 'direct',
                    key: 'direct'
                },
                {
                    title: '转账金额',
                    dataIndex: 'amount',
                    key: 'amount'
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
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        integralDetailColumns: {
            name: '积分明细',
            show: true,
            columns: [
                {
                    title: '客户名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '账户名称',
                    dataIndex: 'accountName',
                    key: 'accountName'
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
                    key: 'code'
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
            buttons: ['delete']
        },
        relatedBillListColumns: {
            name: '相关发票',
            show: true,
            columns: [

            ],
            headerContent: ['add'],
            buttons: ['delete']
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
    const description = {// 对象
        'accountName': '测试客户',
        'accountCode': '',
        'customerName': '测试客户',
        'addressDetail': '29400.00',
        'postCode': '测试客户',
        'phone': '',
        'fax': '2020-01-01',
        'email': '',
        'depositBank': '310300',
        'bankAccount': '',
        'createTime': '2020-01-01',
        'creditAmount': '',
        'accountSurplus': '2330.00',
        'creator': '2020-01-01',
        'receiveOccur': '14100.00',
        'planReceiveOccur': '',
        'changeTime': '2020-01-01',
        'receivedOccur': '1000.00',
        'responsibleDepartment': '业务机构',
        'changer': 'x',
        'accountRemark': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'accountName', span: 2 },
            { name: 'accountCode', span: 1 },
            { name: 'customerName', span: 3 },
            { name: 'addressDetail', span: 2 },
            { name: 'postCode', span: 1 },
            { name: 'phone', span: 1 },
            { name: 'fax', span: 1 },
            { name: 'email', span: 1 },
            { name: 'depositBank', span: 1 },
            { name: 'bankAccount', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'creditAmount', span: 1 },
            { name: 'accountSurplus', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'receiveOccur', span: 1 },
            { name: 'planReceiveOccur', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'receivedOccur', span: 1 },
            { name: 'responsibleDepartment', span: 1 },
            { name: 'changer', span: 1 },
            { name: 'accountRemark', span: 3 },
        ]

    export default {
        name: "AccountInfoDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description,//对象
                descriptionColumn,// 对象按顺序排列的数组
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns
            }
        }
    }
</script>

<style scoped>

</style>