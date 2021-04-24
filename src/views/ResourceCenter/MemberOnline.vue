<!--在线员工列表-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData" :headerContent="headerContent"></table-list>
    </a-layout>
</template>

<script>
    const tableData = [
        { loginName: 201, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '01:18:05', emptyTime: '00:15:05' },
        { loginName: 120, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' },
        { loginName: 430, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' },
        { loginName: 404, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' },
        { loginName: 111, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' },
        { loginName: 65, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' },
        { loginName: 7, lastTime: '2020/12/05 15:04:58', LoginTime: '2020/12/05 13:46:54', onlineTime: '8.0', emptyTime: '00:15:05' }
    ];
    const columns = [
        {
            title: '登录名',
            dataIndex: 'loginName',
            key: 'loginName',
            sorter: (a, b) => a.loginName > b.loginName ? 1 : -1
        },
        {
            title: '最后访问时间',
            dataIndex: 'lastTime',
            key: 'lastTime',
            scopedSlots: { customRender: 'lastTime' },
            sorter: (a, b) => a.lastTime > b.lastTime ? 1 : -1
        },
        {
            title: '登录时间',
            dataIndex: 'LoginTime',
            key: 'LoginTime',
            sorter: (a, b) => a.LoginTime > b.LoginTime ? 1 : -1
        },
        {
            title: '在线时间',
            dataIndex: 'onlineTime',
            key: 'onlineTime',
        },
        {
            title: '闲置时间',
            dataIndex: 'emptyTime',
            key: 'emptyTime',
        }
    ];
    import TableList from '@/components/TableList';

    export default {
        name: 'MemberOnline',
        components: { TableList },
        data() {
            return {
                tableData,
                columns,
                headerContent: ['organSelect']
            };
        },
        methods: {

        }
    };
</script>

<style scoped></style>