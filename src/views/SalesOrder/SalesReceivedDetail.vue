<!--销售收款详情-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn" :description-title="descriptionTitle"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['产品']
    const usedTabsColumns = {
        productColumns: {
            name: '产品',
            show: true,
            columns: [
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '规格编号',
                    dataIndex: 'specsCode',
                    key: 'specsCode'
                },
                {
                    title: '金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '已收金额',
                    dataIndex: 'amountReceived',
                    key: 'amountReceived'
                },
                {
                    title: '发生金额',
                    dataIndex: 'amountOccur',
                    key: 'amountOccur'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
    }
    const description = {// 对象
        'orderCode': '00-001',
        'orderSummary': '',
        'orderAmount': '29400.00',
        'effectAmount': '29400.00',
        'accountName': '测试客户',
        'returnCode': '测试',
        'paymentDate': '2020-01-01',
        'occurAmount': '',
        'billCode': '310300',
        'cancelOutAmount': '',
        'paidWay': '',
        'departmentName': '业务机构管理机构',
        'employee': 'x',
        'createTime': '2020-01-01',
        'changeTime': '2020-01-01',
        'changer': 'x',
        'creator': 'x',
        'verifyEmployee': 'x',
        'description': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'orderCode', span: 1 },
            { name: 'orderSummary', span: 2 },
            { name: 'orderAmount', span: 1 },
            { name: 'effectAmount', span: 1 },
            { name: 'accountName', span: 1 },
            { name: 'returnCode', span: 1 },
            { name: 'paymentDate', span: 1 },
            { name: 'occurAmount', span: 1 },
            { name: 'billCode', span: 1 },
            { name: 'cancelOutAmount', span: 1 },
            { name: 'paidWay', span: 1 },
            { name: 'departmentName', span: 1 },
            { name: 'employee', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'changer', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'verifyEmployee', span: 3 },
            { name: 'description', span: 3 },
        ]

    export default {
        name: "SalesReceivedDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                descriptionTitle: "销售收款",
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