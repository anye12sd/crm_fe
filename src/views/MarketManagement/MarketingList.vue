<template>
    <a-layout class="main-layout">
        <table-list
                :columns="columns"
                :table-data="tableData"
                :loading="tableLoading"
                :buttons="buttons"
                :headerContent="headerContent"
                :addTitle="addTitle"
                :FormAdd="FormAdd"
                :plainOptions="plainOptions"
                :pagination="pagination"
                @on-date="onDate"
                @on-default="onDefault"
                @on-display="toDisplay"
                @on-search="toSearch"
                @on-select="onSelect"
                @on-add="toAdd"
                @on-additem="onAdditem"
                @on-arrangeitem="onArrangeitem"
                @on-statistics="showStatistics"
                @on-addOk="onAddOk"
                @on-addCancel="onAddCancel"
                @on-click-btn="onClickBtn"
                @on-change-table="onChangeTable"
                :operateBtnFixed="operateBtnFixed"
                :selectedRowKeys="selectedRowKeys"
                :headerContentSelect="headerContentSelect"
                ref="client"
        ></table-list>
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
        <market-drawer
                :form="form"
                :cateText="cateText"
                :deptText="deptText"
                @on-cate-change="onCateChange"
                @on-dept-change="onDeptChange"
                @on-start-change="onStartChange"
                @on-end-change="onEndChange"
                @on-submit="onSubmit"
                @on-reset="onReset"
                ref="market"
        ></market-drawer>
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
            sign: '',
            cmpgClassName: '培训讲座',
            cmpgName: '2020-04-17日 · 第90期《逆向盈利》新商业模式必修课 · 报名开始！',
            cmpgCode: '2020-04-17',
            startTime: '2020-04-17',
            endTime: '2020-04-20',
            deptName: '商学平台总公司',
            remarks: '备注',
            cmpgBudget: '0',
            cmpgCost: '0',
            founder: '实施顾问',
            createTime: '2020-03-30 11:16',
            reviser: '实施顾问',
            modificationTime: '2020-03-30 17:32',
            closeStaff: '实施顾问',
            closeTime: '2020-03-30 17:50',
            enterprises: '10',
            turnout: '1000',
            speaker: ''
        }
    ];
    const columns = [
        {
            title: '标志',
            dataIndex: 'isHis',
            key: 'isHis',
        },
        {
            title: '市场活动分类',
            dataIndex: 'cmpgClassName',
            key: 'cmpgClassName',
            // sorter: (a, b) => (a.cmpgClassName > b.cmpgClassName ? 1 : -1)
        },
        {
            title: '活动名称',
            dataIndex: 'cmpgName',
            key: 'cmpgName',
            // sorter: (a, b) => (a.cmpgName > b.cmpgName ? 1 : -1)
            scopedSlots: {customRender: 'link'}
        },
        {
            title: '活动代码',
            dataIndex: 'cmpgCode',
            key: 'cmpgCode',
            // sorter: (a, b) => (a.cmpgCode > b.cmpgCode ? 1 : -1)
        },
        {
            title: '开始日期',
            dataIndex: 'cmpgStartDate',
            key: 'cmpgStartDate',
            // sorter: (a, b) => (a.startTime > b.startTime ? 1 : -1)
        },
        {
            title: '结束日期',
            dataIndex: 'cmpgEndDate',
            key: 'cmpgEndDate',
            // sorter: (a, b) => (a.endTime > b.endTime ? 1 : -1)
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks'
        },
        {
            title: '活动预算',
            dataIndex: 'cmpgBudget',
            key: 'cmpgBudget',
            // sorter: (a, b) => (a.cmpgBudget > b.cmpgBudget ? 1 : -1)
        },
        {
            title: '活动费用',
            dataIndex: 'cmpgCost',
            key: 'cmpgCost',
            // sorter: (a, b) => (a.cmpgCost > b.cmpgCost ? 1 : -1)
        },
        {
            title: '创建人',
            dataIndex: 'founder',
            key: 'founder'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '修改人',
            dataIndex: 'reviser',
            key: 'reviser'
        },
        {
            title: '修改时间',
            dataIndex: 'modificationTime',
            key: 'modificationTime'
        },
        {
            title: '关闭员工',
            dataIndex: 'closeStaff',
            key: 'closeStaff'
        },
        {
            title: '关闭时间',
            dataIndex: 'closeTime',
            key: 'closeTime'
        },
        {
            title: '到场企业数',
            dataIndex: 'enterprises',
            key: 'enterprises'
        },
        {
            title: '到场人数',
            dataIndex: 'turnout',
            key: 'turnout'
        },
        {
            title: '主讲人',
            dataIndex: 'speaker',
            key: 'speaker'
        }
    ];
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import api from '@/api/cmpg';
    import user from '@/api/user';
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';
    import MarketDrawer from '@/components/details/MarketDrawer';

    export default {
        name: 'MarketingList',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer, MarketDrawer},
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
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{queryname: '', plainOptions: ''}],
                selectedRowKeys: [],
                headerContent: ['add', 'displaylist', 'select', 'excel', 'statistics', 'search'],
                buttons: ['view', 'delete'],
                operateBtnFixed: true,
                visible: false,
                statisticsVisible: false,
                clientInforDetail: {},
                checkedList: [],
                headerContentSelect: [
                    {label: 'thisMonthChance', name: '本月市场活动', stopFlag: '2'},
                    {label: 'nextMonthChance', name: '下月市场活动', stopFlag: '1'},
                    {label: 'thisYearChance', name: '本年市场活动', stopFlag: '1'}
                ],
                queryColumns,
                myQuery: '我的查询',
                btns: ['delete', 'star'],
                operateFixed: true,
                queryData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                form: {},
                cateText: [
                    {id: 0, title: '培训讲座'},
                    {id: 1, title: '邮件促销'},
                    {id: 2, title: '新闻发布会'},
                    {id: 3, title: '市场调查'},
                    {id: 4, title: '参加展会'},
                    {id: 5, title: '优惠活动'},
                    {id: 6, title: '座谈会议'},
                    {id: 7, title: '竞争队友资源'},
                    {id: 8, title: '物品资料赠送'}
                ],
                deptText: [
                    {id: 0, title: '集团总公司'},
                    {id: 1, title: '集团财务部'},
                    {id: 2, title: '集团人力资源'},
                    {id: 3, title: '东方五金网总公司'},
                    {id: 4, title: '东方五金网增值部'},
                    {id: 5, title: '东方五金网设计部'},
                    {id: 6, title: '东方五金网人力资源'},
                    {id: 7, title: '机汇网总公司'},
                    {id: 8, title: '机汇网设计部'}
                ]
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
                this.pagination.page_size = pagination.pageSize;
                this.fetch();
            },
            fetch() {
                let params = {page: this.pagination.current}
                this.tableLoading = true;
                api.getCmpgList(params).then((res) => {
                    console.log(res)
                    if (res.code == 0) {
                        const pagination = {...this.pagination};
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.tableData = res.data.rows;
                        this.tableData.map(item => {
                            item.link = '/market_management/market_info_detail?cmpgId=' + item.cmpgId
                        })
                    }
                    this.tableLoading = false;
                })
            },
            getShowList() {
                let params = {profileName: 'CAMPAIGN'}
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
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
            // 删除客户
            showDel(text, record) {
                console.log(text, record);
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            toSearch() {
                this.$refs.drawer.open();
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
                    profileName: 'CAMPAIGN',
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
            onSelect(id) {
                this.selectedRowKeys = id;
            },
            onDate(e) {
                console.log(e.target.value);
            },
            onDefault(value) {
                console.log(value);
            },
            toAdd() {
                this.$router.push({path: '/market_management/marketing_add'});
            },
            onAdd() {
                this.form = {};
                this.$refs.market.marketopen();
            },
            toMarketClose() {
                this.form = {};
                this.$refs.market.marketclose();
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
            onClickBtn(type, text, record, index) {
                console.log(type, text, record, index);
                if (type === 'view') {
                    this.$router.push({
                        path: '/market_management/market_info_detail',
                        query: {cmpgId: record.cmpgId}
                    });
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
            },
            onCateChange(value) {
                this.form.cmpgClassId = value;
                this.form.activityCate = this.cateText[value].title;
                console.log('cate', value);
            },
            onDeptChange(value) {
                this.form.deptId = value;
                this.form.deptName = this.cateText[value].title;
                console.log('dept', value);
            },
            onStartChange(date, dateString) {
                this.form.startDate = dateString;
            },
            onEndChange(date, dateString) {
                this.form.endDate = dateString;
            },
            onSubmit() {
                console.log('onSubmit');
                const data = this.form;
                console.log(data)
                api.postCmpg(data).then((res) => {
                    console.log(res);
                    if (res.code != 0) {
                        this.$message.error(res.msg)
                        return -1
                    } else {
                        this.$message.success("添加成功")
                    }
                    this.loading = false;
                });
            },
            onReset() {
                this.form = {};
            }
        }
    };
</script>