<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['评估标准']
    const usedTabsColumns = {
        costColumns: {
            name: '评估标准',
            show: true,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'index',
                    key: 'index'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '简称',
                    dataIndex: 'simpleName',
                    key: 'simpleName'
                },
                {
                    title: '题目',
                    dataIndex: 'title',
                    key: 'title'
                }
            ],
            headerContent: ['add', 'displayOrder'],
            buttons: ['view', 'delete']
        },
    }

    const description = {// 对象
        'startDate': '2020-01-01',
        'endDate': '2020-01-01',
        'createTime': '2020-01-01',
        'theme': '测试主体',
        'description': '5',
        'answerExplain': '暂无说明',
        'departmentName': '业务机构管理机构',
        'score': '100'
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'startDate', span: 1 },
            { name: 'endDate', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'theme', span: 3 },
            { name: 'description', span: 3 },
            { name: 'answerExplain', span: 3 },
            { name: 'departmentName', span: 1 },
            { name: 'score', span: 1 },
        ]

    export default {
        name: "ChanceAssessStandardDetail",
        components: {CategoryTabs, DescriptionItem},
        data() {
            return {
                description,
                descriptionColumn,
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
            }
        }
    }
</script>

<style scoped>

</style>