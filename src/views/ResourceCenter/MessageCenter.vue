<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent" :buttons="buttons"></table-list>
    </a-layout>
</template>

<script>
    const tableData = [
        { newsCategory: '订阅消息', newsTotal: '', newNewsTotal: '', link: '/resource_center/message_center_detail?flag=3' },
        { newsCategory: '系统消息', newsTotal: '', newNewsTotal: '', link: '/resource_center/message_center_detail?flag=2' },
        { newsCategory: '员工消息', newsTotal: '', newNewsTotal: '', link: '/resource_center/message_center_detail?flag=1' },
        { newsCategory: '已发消息', newsTotal: '', newNewsTotal: '', link: '/resource_center/message_center_detail?flag=101' },
    ];
    const columns = [
        {
            title: '消息类型',
            dataIndex: 'newsCategory',
            key: 'newsCategory',
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '消息总数',
            dataIndex: 'newsTotal',
            key: 'newsTotal',
            scopedSlots: { customRender: 'newsTotal' }
        },
        {
            title: '新消息数',
            dataIndex: 'newNewsTotal',
            key: 'newNewsTotal'
        }
    ];
    import api from '@/api/message';
    import TableList from '@/components/TableList';

    export default {
        name: 'MessageCenter',
        components: { TableList },
        data() {
            return {
                tableData,
                columns,
                headerContent: ['add'],
                buttons: ['view', 'delete']
            };
        },
        mounted() {
            // 预约消息
            this.fetchOrderNewsList()
            // 系统消息
            this.fetchSystemNewsList()
            // 员工消息
            this.fetchMemberNewsList()
            // 已发消息
            this.fetchSentNewsList()
        },
        methods: {
            fetchOrderNewsList(){
                let params = {noticeType: 3}
                api
                    .getMessageList(params)
                    .then((res) => {
                        // console.log(res);
                        this.tableData[0].newsTotal = res.data.count
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            fetchSystemNewsList(){
                let params = {noticeType: 2}
                api
                    .getMessageList(params)
                    .then((res) => {
                        // console.log(res);
                        this.tableData[1].newsTotal = res.data.count
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            fetchMemberNewsList(){
                let params = {noticeType: 1}
                api
                    .getMessageList(params)
                    .then((res) => {
                        // console.log(res);
                        this.tableData[2].newsTotal = res.data.count
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            fetchSentNewsList(){
                let params = {noticeType: 101}
                api
                    .getMessageList(params)
                    .then((res) => {
                        // console.log(res);
                        this.tableData[3].newsTotal = res.data.count
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        }
    };
</script>

<style scoped></style>