<!--执行计划详情-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn" :description-title="descriptionTitle"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['员工','执行过程']
    const usedTabsColumns = {
        memberInfoColumns: {
            name: '员工',
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
            buttons: ['delete'],
            headerContent: ['add'],
            operateBtnFixed: true,
        },
        executeStepColumns: {
            name: '执行过程',
            show: true,
            columns: [
                {
                    title: '执行日期',
                    dataIndex: 'date',
                    key: 'date'
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
                },
                {
                    title: '收款金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '执行人',
                    dataIndex: 'executor',
                    key: 'executor'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
    }
    const description = {// 对象
        'orderCode': '00-001',
        'orderDate': '2020-01-01',
        'number': '测试客户',
        'orderSummary': '常规客户',
        'orderAmount': '29400.00',
        'planDate': '2020-01-01',
        'action': '',
        'planReceivedAmount': '310300',
        'createTime': '5555555',
        'creator': '1',
        'changeTime': '人民币',
        'changer': '中国',
        'description': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'orderCode', span: 1 },
            { name: 'orderDate', span: 1 },
            { name: 'number', span: 1 },
            { name: 'orderSummary', span: 1 },
            { name: 'orderAmount', span: 1 },
            { name: 'planDate', span: 1 },
            { name: 'action', span: 1 },
            { name: 'planReceivedAmount', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'changer', span: 1 },
            { name: 'description', span: 3 },
        ]

    export default {
        name: "PlanExecuteDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                descriptionTitle: "执行计划",
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