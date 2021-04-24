<template>
    <a-layout class="main-layout">
        <table-list
                :columns="columns"
                :loading="tableLoading"
                :table-data="tableData"
                :buttons="buttons"
                :headerContent="headerContent"
                :addTitle="addTitle"
                :FormAdd="FormAdd"
                :plainOptions="plainOptions"
                :pagination="pagination"
                @on-add="toAdd"
                @on-statistics="showStatistics"
                @on-default="onDefault"
                @on-display="toDisplay"
                @on-search="toSearch"
                @on-collect="toCollect"
                @on-additem="onAdditem"
                @on-arrangeitem="onArrangeitem"
                @on-addOk="onAddOk"
                @on-addCancel="onAddCancel"
                @on-click-btn="onClickBtn"
                @on-change-table="onChangeTable"
                :operateBtnFixed="operateBtnFixed"
                :selectedRowKeys="selectedRowKeys"
                :headerContentSelect="headerContentSelect"
                ref="client"
        ></table-list>
        <myQuery-drawer
                :loading="loading"
                :queryData="queryData"
                :queryColumns="queryColumns"
                :myQuery="myQuery"
                :btns="btns"
                :operateFixed="operateFixed"
                @on-close="toClose"
                @on-queryclick-btn="onQueryClick"
                ref="query"
        >
        </myQuery-drawer>
        <drawer-search ref="drawer"></drawer-search>
        <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
        <table-column-select-drawer
                :visibleConfig="tableVisibleConfig"
                :childrenDrawerProps="tableChildrenDrawer"
                :columns="columns"
                :checkedListProps="checkedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </table-column-select-drawer>
        <a-modal v-model="statisticsVisible" title="统计数据" on-ok="hideStatistics">
            <template slot="footer">
                <a-button type="primary" @click="hideStatistics">
                    确定
                </a-button>
            </template>
            <p>共有{{this.pagination.total}}条数据</p>
        </a-modal>
    </a-layout>
</template>

<script>
    import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
    const tableData = [
        {
            clientName: '',
            clientMnemonic: '',
            friendName: '',
            lastContactTime: '',
            mode: '',
            number: '',
            email: '',
            homePage: '',
            telephone: '',
            address: '',
            reviser: '',
            modificationTime: '',
            provider: '',
            link3: '/client_center/customer_info_detail'
        }
    ];
    const columns = [
        {
            title: '状态',
            dataIndex: 'stopFlag',
            key: 'stopFlag'
        },
        {
            title: '分类名称',
            dataIndex: 'friendClassName',
            key: 'friendClassName'
        },
        {
            title: '客户名',
            dataIndex: 'friendName',
            key: 'friendName',
            // sorter: (a, b) => (a.friendName > b.friendName ? 1 : -1),
            scopedSlots: {customRender: 'link3'}
        },
        {
            title: '编码',
            dataIndex: 'friendCode',
            key: 'friendCode',
            // sorter: (a, b) => (a.friendCode > b.friendCode ? 1 : -1)
        },
        {
            title: '客户助记符',
            dataIndex: 'friendSimpleCode',
            key: 'friendSimpleCode',
            // sorter: (a, b) => (a.friendSimpleCode > b.friendSimpleCode ? 1 : -1)
        },
        {
            title: '最近联络时间',
            dataIndex: 'touchTime',
            key: 'touchTime'
        },
        {
            title: '识别方式',
            dataIndex: 'friendCardType',
            key: 'friendCardType'
        },
        {
            title: '识别号码',
            dataIndex: 'friendCardNo',
            key: 'friendCardNo'
        },
        {
            title: '电子邮件',
            dataIndex: 'friendEmail',
            key: 'friendEmail',
            // sorter: (a, b) => (a.friendEmail > b.friendEmail ? 1 : -1)
        },
        {
            title: '网站主页',
            dataIndex: 'friendHomePage',
            key: 'friendHomePage',
            scopedSlots: {customRender: 'link4'}
        },
        {
            title: '电话',
            dataIndex: 'friendPhone',
            key: 'friendPhone'
        },
        {
            title: '传真',
            dataIndex: 'friendFax',
            key: 'friendFax'
        },
        {
            title: '移动电话',
            dataIndex: 'friendMobilePhone',
            key: 'friendMobilePhone'
        },
        {
            title: '详细地址',
            dataIndex: 'friendAddress',
            key: 'friendAddress'
        },
        {
            title: '邮编',
            dataIndex: 'friendZipCode',
            key: 'friendZipCode'
        },
        {
            title: '国家',
            dataIndex: 'friendCountry',
            key: 'friendCountry'
        },
        {
            title: '省份',
            dataIndex: 'friendProvince',
            key: 'friendProvince'
        },
        {
            title: '城市',
            dataIndex: 'friendCity',
            key: 'friendCity'
        },
        {
            title: '创建人',
            dataIndex: 'createEmpName',
            key: 'createEmpName'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }
    ];
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import api from '@/api/friend';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import CollectionAdd from '@/components/details/CollectionAdd';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'ClienInfor',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer},
        data() {
            return {
                loading: false,
                tableLoading: false,
                originColumns: columns,
                columns,
                checkedList: [],
                selectedRowKeys: [],
                tableData,
                queryColumns,
                statisticsVisible: false,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                modalTitle: '加入收藏',
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{queryname: '', plainOptions: ''}],
                headerContent: ['add', 'displaylist', 'select', 'excel', 'statistics', 'search', 'collect'],
                buttons: ['view', 'delete'],
                btns: ['delete', 'star'],
                operateBtnFixed: true,
                operateFixed: true,
                visible: false,
                headerContentSelect: [
                    {label: 'dayNewChance', name: '今日新增客户', stopFlag: '1'},
                    {label: 'weekNewChance', name: '本周新增客户', stopFlag: '2'},
                    {label: 'monthNewChance', name: '本月新增客户', stopFlag: '1'}
                ],
                queryData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        mounted() {
            // this.showList()
            this.getShowList()
            this.fetch();
        },
        methods: {
            // 选中行
            customRow() {
                return {
                    on: {
                        click: (e) => {
                            const oldList = document.querySelectorAll('.checked-td-of-add-table');
                            if (oldList) {
                                for (let j = 0; j < oldList.length; j++) {
                                    oldList[j].classList.remove('checked-td-of-add-table');
                                }
                            }
                            const children = e.target.parentNode.children;
                            for (let i = 0; i < children.length; i++) {
                                children[i].classList.add('checked-td-of-add-table');
                            }
                        }
                    }
                };
            },
            // 页码切换
            onChangeTable(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.page_size;
                this.fetch();
            },
            fetch() {
                let params = {page: this.pagination.current}
                this.tableLoading = true;
                api
                    .getFriendList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.pagination};
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                            this.tableData.map(item => {item.link3 = '/client_center/customer_info_detail?code=' + item.friendId})
                        }
                        this.tableLoading = false;
                    })
            },
            getShowList() {
                let params = {profileName: 'CUST'}
                this.loading = true;
                user
                    .getMyShow(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            if(!res.data.profileContent.length){
                                return -1
                            }
                            this.columns = []
                            let k = 0
                            this.checkedList = res.data.profileContent
                            // for (let i = 0; i < this.originColumns.length; i++) {
                            //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                            //         this.columns.push(this.originColumns[i]);
                            //     }
                            // }
                            console.log(this.checkedList)
                            for (let i = 0; i < this.checkedList.length; i++) {
                                for (let j = k; j < this.originColumns.length; j++)
                                if (this.originColumns[j].dataIndex.includes(this.checkedList[i])) {
                                    this.columns.push(this.originColumns[j]);
                                    [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                                    k++
                                    break
                                    // this.originColumns.splice(j, 1)
                                    // j--
                                }
                            }
                            // this.originColumns = this.columns.concat(this.originColumns)
                        }
                        this.loading = false;
                    })
            },
            // 客户详情
            showDrawer() {
                const oldList = document.querySelector('.checked-tr-of-add-table');
                if (oldList) {
                    oldList.classList.remove('checked-tr-of-add-table');
                }
                const selectTr = event.path[3];
                selectTr.classList.add('checked-tr-of-add-table');
                this.visible = true;
                this.loading = true;
            },
            // 删除客户
            showDel(text, record) {
                console.log(text, record);
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
            toDisplay() {
                this.tableVisibleConfig = true;
                this.loading = true;
            },
            hideList(){
                this.tableVisibleConfig = false
            },
            postShow(val){
                this.tableChildrenDrawer = true
                let arr = []
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].dataIndex);
                }
                let params = {
                    profileName: 'CUST',
                    profileContent: arr,
                }
                this.loading = true
                console.log(params)
                user.
                postMyShow(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            this.$message.success("修改成功")
                            this.getShowList()
                            this.tableVisibleConfig = false
                            this.tableChildrenDrawer = false
                        }
                        this.loading = false;
                    })
            },
            onDefault(value) {
                console.log(value);
            },
            onAdditem() {
                this.$refs.client.open();
            },
            onArrangeitem() {
                this.loading = true;
                this.$refs.query.queryopen();
                setTimeout(() => {
                    this.queryData = this.headerContentSelect;
                    this.loading = false;
                }, 500);
            },
            toClose() {
                this.$refs.query.queryclose();
            },
            toAdd() {
                this.$router.push({path: '/client_center/client_add'});
            },
            onClickBtn(type, text, record, index) {
                console.log(type, text, record, index);
                if (type === 'view') {
                    console.log(record)
                    this.$router.push({ path: '/client_center/customer_info_detail', query: { code: record.friendId } });
                } else if (type === 'delete') {
                    const id = record.friendId;
                    this.loading = true;
                    api.delFriend(id).then((res) => {
                        if (res.code == 0) {
                            this.$message.success('添加成功')
                        }
                        this.loading = false;
                        this.fetch();
                    })
                }
            },
            onQueryClick(type, text, record, index) {
                if (record.stopFlag === '1') {
                    for (let i = 0; i < this.queryData.length; i++) {
                        this.queryData[i].stopFlag = '1';
                    }
                    record.stopFlag = '2';
                } else {
                    for (let i = 0; i < this.queryData.length; i++) {
                        this.queryData[i].stopFlag = '2';
                    }
                    record.stopFlag = '1';
                }
            },
            onAddOk() {
                this.$refs.client.close();
            },
            onAddCancel() {
                this.$refs.client.close();
            }
        }
    };
</script>