<template>
    <a-layout class="main-layout">
        <table-list :columns="tableColumns[tableKey].columns" :table-data="tableData"
                    :buttons="tableColumns[tableKey].buttons"
                    :operateBtnFixed="tableColumns[tableKey].operateBtnFixed"
                    :hasRowHeaderSelect="true"
                    :isCheckbox="true"
                    :headerContent="headerContent"
                    :tableColumnsArray="tableColumnsArray"
                    :tableSelectIndex="tableSelectIndex"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-add="toAdd"
                    @on-select="tableChecked"
                    @on-click-btn="childBtnClicked"
                    @on-tableSelectChange="tableSelectChange"
        >
        </table-list>
        <div class="submit table-bottom-submit">
            <a-button size="small" @click="deleteSelected" style="margin-right: 6px">选中删除</a-button>
            <a-button size="small" @click="setUnread" style="margin-right: 6px">设为未读</a-button>
            <a-button size="small" @click="setRead" style="margin-right: 6px">设为已读</a-button>
<!--            <a-button size="small" @click="selectAll">全部选择</a-button>-->
        </div>
    </a-layout>
</template>

<script>
    import api from '@/api/message';
    import TableList from '@/components/TableList';
    const tableColumnsArray = [
        {'engName': 'orderMessageColumns', 'name': '订阅消息', id: 3},
        {'engName': 'systemMessageColumns', 'name': '系统消息', id: 2},
        {'engName': 'memberMessageColumns', 'name': '员工消息', id: 1},
        {'engName': 'sentMessageColumns', 'name': '已发消息', id: 101}
    ]
    const tableColumns = {
        orderMessageColumns: {
            name: '订阅消息',
            show: true,
            columns: [
                {
                    title: 'new',
                    dataIndex: 'noticeRead',
                    key: 'noticeRead',
                    scopedSlots: { customRender: 'noticeRead' }
                },
                {
                    title: '发送时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '主题',
                    dataIndex: 'noticeSubject',
                    key: 'noticeSubject',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '内容',
                    dataIndex: 'noticeMemo',
                    key: 'noticeMemo'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: ['excel', 'search', 'myOrder', 'tableSelect']
        },
        systemMessageColumns: {
            name: '系统消息',
            show: true,
            columns: [
                {
                    title: 'new',
                    dataIndex: 'noticeRead',
                    key: 'noticeRead',
                    scopedSlots: { customRender: 'noticeRead' }
                },
                {
                    title: '发生时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '主题',
                    dataIndex: 'noticeSubject',
                    key: 'noticeSubject',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '内容',
                    dataIndex: 'noticeMemo',
                    key: 'noticeMemo'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view', 'delete'],
            headerContent: ['excel', 'search', 'tableSelect']
        },
        memberMessageColumns: {
            name: '员工信息',
            show: true,
            columns: [
                {
                    title: 'new',
                    dataIndex: 'noticeRead',
                    key: 'noticeRead',
                    scopedSlots: { customRender: 'noticeRead' }
                },
                {
                    title: '!',
                    dataIndex: '!',
                    key: '!'
                },
                {
                    title: '附件',
                    dataIndex: 'annex',
                    key: 'annex'
                },
                {
                    title: '发送时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '主题',
                    dataIndex: 'noticeSubject',
                    key: 'noticeSubject'
                },
                {
                    title: '内容',
                    dataIndex: 'noticeMemo',
                    key: 'noticeMemo'
                },
                {
                    title: '发送员工',
                    dataIndex: 'member',
                    key: 'member'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['excel', 'search', 'add', 'tableSelect'],
            buttons: ['view', 'delete']
        },
        sentMessageColumns: {
            name: '已发消息',
            show: true,
            columns: [
                {
                    title: '!',
                    dataIndex: '!',
                    key: '!'
                },
                {
                    title: '附件',
                    dataIndex: 'annex',
                    key: 'annex'
                },
                {
                    title: '发送时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '主题',
                    dataIndex: 'noticeSubject',
                    key: 'noticeSubject',
                    scopedSlots: { customRender: 'link' }
                },
                {
                    title: '内容',
                    dataIndex: 'noticeMemo',
                    key: 'noticeMemo'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['excel', 'search', 'tableSelect'],
            buttons: ['view', 'delete']
        },
    }
    export default {
        name: "MessageCenterDetail",
        components: { TableList },
        data() {
            return {
                tableColumns,
                tableData: [],
                tableColumnsArray,
                tableCheckedArray: [],
                pagination: {
                    total: 1,
                    current: 1,
                    pageSize: 10
                },
                tableKey: tableColumnsArray[0].engName,
                tableSelectIndex: parseInt(this.$route.query.flag || 3),
                headerContent: ['tableSelect', 'add']
            }
        },
        mounted() {
            this.headerContent = this.tableColumns['memberMessageColumns'].headerContent
            this.fetch(this.tableSelectIndex)
        },
        methods: {
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.page_size;
                this.fetch();
            },
            fetch(val){
                let params = {page: this.pagination.current, page_size: this.pagination.page_size, noticeType: val}
                api
                    .getMessageList(params)
                    .then((res) => {
                        console.log(res);
                        this.tableData = res.data.rows
                        this.tableData.map(item => {
                            item.createTime = item.createTime ? new Date(+new Date(item.createTime) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : "";
                            item.link = '/service_management/fdbk_info_detail?code='+item.noticeId
                        })
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            tableSelectChange(val){
                console.log(val)
                this.tableKey = val.key
                this.fetch(val.val)
                this.headerContent = ['tableSelect'].concat(this.tableColumns[this.tableKey].headerContent)
            },
            tableChecked(val){
                this.tableCheckedArray = val
            },
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/service_management/fdbk_info_detail', query: {code: record.noticeId}})
                }
                if(type == 'delete'){
                    let params = {arr : []}
                    params.arr.push(record.noticeId)
                    console.log(params)
                    api
                        .postDeleteMessage(params)
                        .then((res) => {
                            console.log(res);
                            this.$message.success('删除成功')
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            toAdd(){
                this.$router.push({path: '/resource_center/message_add'})
            },
            toDisplay(){

            },
            toSearch(){

            },
            toCollect(){

            },
            deleteSelected(){
                // 选中删除
                let params = {arr: []}
                this.tableCheckedArray.map(item => {params.arr.push(item.noticeId)})
                api
                    .postDeleteMessage(params)
                    .then((res) => {
                        console.log(res);
                        this.$message.success('删除成功')
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            setUnread(){
                // 设为未读
                let params = {noticeId: [], read: 0}
                this.tableCheckedArray.map(item => {params.noticeId.push(item.noticeId)})
                api
                    .postSetNewsStatus(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('修改成功')
                            this.fetch(this.tableSelectIndex)
                        }
                    })
            },
            setRead(){
                // 设为已读
                let params = {noticeId: [], read: 1}
                this.tableCheckedArray.map(item => {params.noticeId.push(item.noticeId)})
                api
                    .postSetNewsStatus(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success('修改成功')
                            this.fetch(this.tableSelectIndex)
                        }
                    })
            },
        }
    }
</script>

<style scoped>

</style>