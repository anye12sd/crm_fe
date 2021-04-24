<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['计划明细']
    const usedTabsColumns = {
        costColumns: {
            name: '计划明细',
            show: true,
            columns: [
                {
                    title: '任务分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'stage',
                    key: 'stage'
                },
                {
                    title: '计划数',
                    dataIndex: 'plan',
                    key: 'plan'
                }
            ],
            headerContent: ['complete']
        },
    }

    const description = {// 对象
        'planName': '名称',
        'departmentName': '何宝荣',
        'lifeCycle': '5',
        'avgSalesAmount': '10000',
        'effectSalesAmount': '8000',
        'startDate': '2020-01-01',
        'endDate': '2020-01-01',
        'createTime': '2020-01-01',
        'changeTime': '2020-01-01',
        'changer': 'x',
        'creator': 'x',
        'description': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'planName', span: 2 },
            { name: 'departmentName', span: 1 },
            { name: 'lifeCycle', span: 1 },
            { name: 'avgSalesAmount', span: 1 },
            { name: 'effectSalesAmount', span: 1 },
            { name: 'startDate', span: 1 },
            { name: 'endDate', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'changer', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'description', span: 1 },
        ]

    export default {
        name: "CustomerResourcePlanDetail",
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