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
                @on-display="toDisplay"
                @on-search="toSearch"
                @on-collect="toCollect"
                @on-date="onDate"
                @on-default="onDefault"
                @on-additem="onAdditem"
                @on-arrangeitem="onArrangeitem"
                @on-statistics="showStatistics"
                @on-addOk="onAddOk"
                @on-click-btn="onClickBtn"
                @on-addCancel="onAddCancel"
                @on-change-table="onChangeTable"
                @on-add="add"
                :operateBtnFixed="operateBtnFixed"
                :headerContentSelect="headerContentSelect"
                ref="clientinfo"
        ></table-list>
        <client-infor ref="client"></client-infor>
        <drawer-search ref="drawer"></drawer-search>
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
    const tableData = [];
    const columns = [
        {
            title: '状态',
            dataIndex: 'stopFlag',
            key: 'stopFlag',
            scopedSlots: { customRender: 'stopFlag' }
        },
        {
            title: '客户名',
            dataIndex: 'friendName',
            key: 'friendName',
        },
        {
            title: '联系人姓名',
            dataIndex: 'contactName',
            key: 'contactName',
            scopedSlots: {customRender: 'link'}
        },
        {
            title: '称呼',
            dataIndex: 'contactSalutation',
            key: 'contactSalutation'
        },
        {
            title: '联系人部门',
            dataIndex: 'contactDept',
            key: 'contactDept',
        },
        {
            title: '职务',
            dataIndex: 'contactPosition',
            key: 'contactPosition'
        },
        {
            title: '详细地址',
            dataIndex: 'contactAddress',
            key: 'contactAddress'
        },
        {
            title: '邮政编码',
            dataIndex: 'contactZipCode',
            key: 'contactZipCode'
        },
        {
            title: '城市',
            dataIndex: 'contactCity',
            key: 'contactCity'
        },
        {
            title: '省份',
            dataIndex: 'contactProvince',
            key: 'contactProvince'
        },
        {
            title: '国家',
            dataIndex: 'contactCountry',
            key: 'contactCountry'
        },
        {
            title: '电子邮件',
            dataIndex: 'contactEmail',
            key: 'contactEmail'
        },
        {
            title: '家庭电话',
            dataIndex: 'contactHomePhone',
            key: 'contactHomePhone'
        },
        {
            title: '办公电话',
            dataIndex: 'contactOfficePhone',
            key: 'contactOfficePhone'
        },
        {
            title: '移动电话',
            dataIndex: 'contactMobilePhone',
            key: 'contactMobilePhone'
        },
        {
            title: '传真',
            dataIndex: 'contactFax',
            key: 'contactFax'
        },
        {
            title: '主联系人',
            dataIndex: 'primaryFlag',
            key: 'primaryFlag'
        },
        {
            title: '关怀对象',
            dataIndex: 'isCarefor',
            key: 'isCarefor'
        },
        {
            title: '催款对象',
            dataIndex: 'isPaynotice',
            key: 'isPaynotice'
        },
        {
            title: '促销对象',
            dataIndex: ' isPromotion',
            key: 'isPromotion'
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
        },
        {
            title: '修改人',
            dataIndex: 'modifyEmpName',
            key: 'modifyEmpName'
        },
        {
            title: '修改时间',
            dataIndex: 'modifyTime',
            key: 'modifyTime'
        },
        {
            title: '性别',
            dataIndex: 'contactGender',
            key: 'contactGender'
        },
        {
            title: '婚姻状况',
            dataIndex: 'contactMarital',
            key: 'contactMarital'
        },
        {
            title: 'QQ',
            dataIndex: 'contactQq',
            key: 'contactQq'
        },
        {
            title: '微信',
            dataIndex: 'contactWechat',
            key: 'contactWechat'
        },
    ];
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    import api from '@/api/contact';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import ClientInfor from '@/components/details/ClientInfor';
    import DrawerSearch from '@/components/DrawerSearch';
    import CollectionAdd from '@/components/details/CollectionAdd';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'ClientContactInfo',
        components: {TableColumnSelectDrawer, TableList, ClientInfor, DrawerSearch, CollectionAdd, MyQueryDrawer},
        data() {
            return {
                loading: false,
                tableLoading: false,
                //需要originColumns来重置新的columns，originColumns不可修改
                originColumns: columns,
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                tableData,
                queryColumns,
                statisticsVisible: false,
                headerContent: ['displaylist', 'select', 'excel', 'statistics', 'search', 'collect', 'add'],
                modalTitle: '加入收藏',
                buttons: ['view', 'delete'],
                operateBtnFixed: true,
                visible: false,
                checkedList: [],
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{queryname: '', plainOptions: ''}],
                headerContentSelect: [
                    {label: 'dayNewChance', name: '今日新增客户', stopFlag: '2'},
                    {label: 'weekNewChance', name: '本周新增客户', stopFlag: '1'},
                    {label: 'monthNewChance', name: '本月新增客户', stopFlag: '1'}
                ],
                treeData: [],
                checkedKeys: [],
                myQuery: '我的查询',
                btns: ['delete', 'star'],
                operateFixed: true,
                queryData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        mounted() {
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
                this.tableLoading = true;
                let params = {page: this.pagination.current}
                api
                    .getContactList(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.pagination};
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows
                            this.tableData.map((item) => {
                                item.link = '/client_center/client_contact_info_detail?code=' + item.contactId
                                item.createTime = item.createTime ? new Date(+new Date(item.createTime) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '') : "";
                                item.modifyTime = item.modifyTime ? new Date(+new Date(item.modifyTime) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '') : "";
                            });
                        }
                        this.tableLoading = false;
                    })
            },
            getShowList() {
                let params = {profileName: 'CONTACT'}
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
            add() {
                this.$router.push({path: '/client_center/client_contact_add'})
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
                    profileName: 'CONTACT',
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
                            this.columns = this.unSavedColumns
                            this.getShowList()
                            this.tableVisibleConfig = false
                            this.tableChildrenDrawer = false
                        }
                        this.loading = false;
                    })
            },
            // 删除客户
            showDel(text, record) {
                console.log(text, record);
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            onDate(e) {
                console.log(e.target.value);
            },
            onDefault(value) {
                console.log(value);
            },
            onAdditem() {
                this.$refs.clientinfo.open();
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
            onClickBtn(type, text, record, index) {
                if (type === 'view') {
                    this.$router.push({path: '/client_center/client_contact_info_detail', query: {code: record.contactId}});
                } else if (type === 'delete') {
                    this.deleteList(record.contactId)
                }
            },
            deleteList(id) {
                api.delContact(id).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        this.fetch()
                    }
                })
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
                this.$refs.clientinfo.close();
            },
            onAddCancel() {
                this.$refs.clientinfo.close();
            }
        }
    };
</script>