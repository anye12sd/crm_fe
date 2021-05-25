<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"></table-list>
    </a-layout>
</template>

<script>
    const columns = [
        {
            title: '分类编码',
            dataIndex: 'prodClassCode',
            key: 'prodClassCode'
        },
        {
            title: '产品分类',
            dataIndex: 'prodClassName',
            key: 'prodClassName',
        },
        {
            title: '增值税名称',
            dataIndex: 'taxTitle',
            key: 'taxTitle'
        },
        {
            title: '税率',
            dataIndex: 'taxRate',
            key: 'taxRate'
        },
        {
            title: '分类相关属性',
            dataIndex: 'otherAttr',
            key: 'otherAttr'
        }
    ];
    import api from '@/api/product';
    import TableList from '@/components/TableList';

    export default {
        name: 'ProductRules',
        components: { TableList },
        data() {
            return {
                tableData: [],
                columns,
                buttons: [],
                headerContent: ['text']
            };
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch(){
                api
                    .getProductClassList( {page: 1})
                    .then((res) => {
                        console.log(res);
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.tableData = res.data.rows;
                    })
                    .catch((err) => {
                        console.log(err)
                        this.loading = false;
                    });
            }
        }
    };
</script>

<style scoped></style>