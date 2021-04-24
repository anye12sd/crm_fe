<!--员工管理详情-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['角色','销售订单动作','采购订单动作','工作报告','相关任务','工作记录','相关反馈','日程','待办事宜','销售机会','报价单','销售订单','销售订货单','采购订单','采购退货','附件']
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
            { name: 'oldBirthday', span: 1 },
            { name: 'entryTime', span: 1 },
            { name: 'QQ', span: 1 },
            { name: 'addressNow', span: 1 },
            { name: 'educationSchool', span: 1 },
            { name: 'speciality', span: 1 },
            { name: 'sculpture', span: 1 },
            { name: 'wechat', span: 1 },
            { name: 'hobby', span: 1 },
            { name: 'policy', span: 1 },
            { name: 'leaveTime', span: 3 },
            { name: 'remark', span: 3 },
        ]

    export default {
        name: "MemberManageDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description,
                descriptionColumn,
                usedTabs: usedTabs
            }
        }
    }
</script>

<style scoped>

</style>