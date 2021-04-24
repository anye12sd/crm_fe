<!--客户信息-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
    </a-layout>
</template>

<script>
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";

    export default {
        name: "DiscussDetail",
        components: { DescriptionItem},
        data() {
            return {
                description: { "productMnemonic": "aa", "productCode": "1211", "productName": "dd"},//对象
                descriptionColumn: ["productCode", "productName", "productMnemonic"],// 对象按顺序排列的数组
            }
        }
    }
</script>

<style scoped>

</style>