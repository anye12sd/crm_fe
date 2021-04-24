<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn" :description-title="descriptionTitle"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['附件']
    const usedTabsColumns = {
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
            buttons: ['delete'],
            operateBtnFixed: true,
        },
    }

    export default {
        name: "ToDoListDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                descriptionTitle: "待办事宜",
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