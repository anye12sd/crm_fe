<!--报价管理-->
<template>
    <a-layout class="main-layout">
        <table-list :columns="columns" :table-data="tableData"
                    :headerContent="headerContent"
                    :headerContentSelect="headerContentSelect"
                    :buttons="buttons"
                    :operateBtnFixed="operateBtnFixed"
                    :addTitle="addTitle"
                    :plainOptions="plainOptions"
                    @on-display="toDisplay"
                    @on-search="toSearch"
                    @on-collect="toCollect"
                    @on-click-btn="childBtnClicked"
                    @on-headerSelectChange="headerSelectChange"
                    @on-additem="onAdditem"
                    @on-arrangeitem="onArrangeitem"
                    @on-addOk="onAddOk"
                    @on-addCancel="onAddCancel"
                    ref="client"
        >
        </table-list>
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
        <table-column-select-drawer
                :visibleConfig="tableVisibleConfig"
                :childrenDrawerProps="tableChildrenDrawer"
                :columns="columns"
                :checkedListProps="checkedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </table-column-select-drawer>
    </a-layout>
</template>

<script>
    import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
    const tableData = [
        { sign: '', departmentName: 201, category: '中文', serialNumber: 'O', summary: '管理机构', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail1', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 120, category: '中文2', serialNumber: 'OA', summary: '总公司', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail1', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 430, category: '中文3', serialNumber: 'OAOA', summary: '名称1', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail11', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 404, category: '中文4', serialNumber: 'O', summary: '名称1', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 111, category: '中文5', serialNumber: 'OA', summary: '名称1', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail1', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 65, category: '中文6', serialNumber: 'OAOA', summary: '名称1', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail1', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' },
        { sign: '', departmentName: 7, category: '中文7', serialNumber: 'A', summary: '名称1', customerName: 'sd', partnerName: 'partner', telephone: '', Email: '', address: '', link: '/TempDirectory/OfferSheetDetail1', link2: '/ClientCenter/CustomerInfoDetail', link5: '/TempDirectory/PartnerInfoDetail' }
    ];
    const columns = [
        {
            title: '标志',
            dataIndex: 'sign',
            key: 'sign',
        },
        {
            title: '报价单分类',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '报价单号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            sorter: (a, b) => a.serialNumber > b.serialNumber ? 1 : -1,
            scopedSlots: { customRender: 'link' }
        },
        {
            title: '报价摘要',
            dataIndex: 'summary',
            key: 'summary',
        },
        {
            title: '报价日期',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date > b.date ? 1 : -1
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount > b.amount ? 1 : -1
        },
        {
            title: '部门名称',
            dataIndex: 'departmentName',
            key: 'departmentName',
            sorter: (a, b) => a.departmentName > b.departmentName ? 1 : -1
        },
        {
            title: '员工姓名',
            dataIndex: 'memberName',
            key: 'memberName',
        },
        {
            title: '汇率',
            dataIndex: 'exchangeRate',
            key: 'exchangeRate',
            sorter: (a, b) => a.exchangeRate > b.exchangeRate ? 1 : -1
        },
        {
            title: '外币金额',
            dataIndex: 'foreignCurrencyAmount',
            key: 'foreignCurrencyAmount',
            sorter: (a, b) => a.foreignCurrencyAmount > b.foreignCurrencyAmount ? 1 : -1
        },
        {
            title: '客户名',
            dataIndex: 'customerName',
            key: 'customerName',
            sorter: (a, b) => a.customerName > b.customerName ? 1 : -1,
            scopedSlots: { customRender: 'link2' }
        },
        {
            title: '客户编码',
            dataIndex: 'customerSerial',
            key: 'customerSerial',
            sorter: (a, b) => a.customerSerial > b.customerSerial ? 1 : -1
        },
        {
            title: '客户助记符',
            dataIndex: 'customerMnemonic',
            key: 'customerMnemonic',
            sorter: (a, b) => a.customerMnemonic > b.customerMnemonic ? 1 : -1
        },
        {
            title: '客户识别方式',
            dataIndex: 'customerDiscernWay',
            key: 'customerDiscernWay',
            sorter: (a, b) => a.customerDiscernWay > b.customerDiscernWay ? 1 : -1
        },
        {
            title: '客户识别号码',
            dataIndex: 'customerDiscernNumber',
            key: 'customerDiscernNumber',
            sorter: (a, b) => a.customerDiscernNumber > b.customerDiscernNumber ? 1 : -1
        },
        {
            title: '客户邮件',
            dataIndex: 'customerEmail',
            key: 'customerEmail',
            sorter: (a, b) => a.customerEmail > b.customerEmail ? 1 : -1
        },
        {
            title: '客户电话',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
            sorter: (a, b) => a.customerPhone > b.customerPhone ? 1 : -1
        },
        {
            title: '客户传真',
            dataIndex: 'customerFax',
            key: 'customerFax',
            sorter: (a, b) => a.customerFax > b.customerFax ? 1 : -1
        },
        {
            title: '客户地址',
            dataIndex: 'customerAddress',
            key: 'customerAddress',
        },
        {
            title: '客户邮编',
            dataIndex: 'customerPostalCode',
            key: 'customerPostalCode',
            sorter: (a, b) => a.customerPostalCode > b.customerPostalCode ? 1 : -1
        },
        {
            title: '伙伴名',
            dataIndex: 'partnerName',
            key: 'partnerName',
            sorter: (a, b) => a.partnerName > b.partnerName ? 1 : -1,
            scopedSlots: { customRender: 'link5' }
        },
        {
            title: '伙伴编码',
            dataIndex: 'partnerCode',
            key: 'partnerCode',
            sorter: (a, b) => a.partnerCode > b.partnerCode ? 1 : -1
        },
        {
            title: '伙伴助记符',
            dataIndex: 'partnerMnemonic',
            key: 'partnerMnemonic',
            sorter: (a, b) => a.partnerMnemonic > b.partnerMnemonic ? 1 : -1
        },
        {
            title: '伙伴识别方式',
            dataIndex: 'partnerDiscernWay',
            key: 'partnerDiscernWay',
            sorter: (a, b) => a.partnerDiscernWay > b.partnerDiscernWay ? 1 : -1
        },
        {
            title: '伙伴识别号码',
            dataIndex: 'partnerDiscernNumber',
            key: 'partnerDiscernNumber',
            sorter: (a, b) => a.partnerDiscernNumber > b.partnerDiscernNumber ? 1 : -1
        },
        {
            title: '伙伴邮件',
            dataIndex: 'partnerEmail',
            key: 'partnerEmail',
            sorter: (a, b) => a.partnerEmail > b.partnerEmail ? 1 : -1
        },
        {
            title: '伙伴电话',
            dataIndex: 'partnerPhone',
            key: 'partnerPhone',
            sorter: (a, b) => a.partnerPhone > b.partnerPhone ? 1 : -1
        },
        {
            title: '伙伴传真',
            dataIndex: 'partnerFax',
            key: 'partnerFax',
            sorter: (a, b) => a.partnerFax > b.partnerFax ? 1 : -1
        },
        {
            title: '伙伴地址',
            dataIndex: 'partnerAddress',
            key: 'partnerAddress',
        },
        {
            title: '伙伴邮编',
            dataIndex: 'partnerPostalCode',
            key: 'partnerPostalCode',
            sorter: (a, b) => a.partnerPostalCode > b.partnerPostalCode ? 1 : -1
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: (a, b) => a.createTime > b.createTime ? 1 : -1
        },
        {
            title: '修改人',
            dataIndex: 'changer',
            key: 'changer',
        },
        {
            title: '修改时间',
            dataIndex: 'changeTime',
            key: 'changeTime',
            sorter: (a, b) => a.changeTime > b.changeTime ? 1 : -1
        },
        {
            title: '关闭日期',
            dataIndex: 'closeDate',
            key: 'closeDate',
            sorter: (a, b) => a.closeDate > b.closeDate ? 1 : -1
        }
    ];
    const headerContentSelect = [
        {label: 'dayOffer', name: '今日报价', stopFlag: '1'},
        {label: 'weekOffer', name: '本周报价', stopFlag: '1'},
        {label: 'monthOffer', name: '本月报价', stopFlag: '2'},
    ]
    const queryColumns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name'
        }
    ];
    import TableList from '@/components/TableList';
    import DrawerSearch from '@/components/DrawerSearch';
    import MyQueryDrawer from '@/components/details/MyQueryDrawer';

    export default {
        name: 'OfferManagement',
        components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
        data() {
            return {
                loading: false,
                headerContentSelect,
                tableData,
                originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
                columns,
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                queryColumns,
                operateBtnFixed: true,
                operateFixed: true,
                buttons: ['view', 'delete'],
                headerContent: ['search', 'select', 'excel', 'statistics', 'add', 'displaylist', 'customerCollect', 'partnerCollect'],
                myQuery: '我的查询',
                addTitle: '将当前查询加入到我的查询',
                plainOptions: ['日', '周', '月', '年'],
                FormAdd: [{ queryname: '', plainOptions: '' }],
                queryData: [],
                btns: ['delete', 'star'],
                checkedList: [], //checkboxgroup里需要默认选中的项
                visible: false,
            };
        },
        mounted() {
            this.getShowList()
        },
        methods: {
            childBtnClicked(type, text, record, index){
                if(type == 'view'){
                    this.$router.push({path: '/resource_center/department_info_detail'})
                }
            },
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
            getShowList(arr) {
                this.columns = []
                let k = 0
                this.checkedList = arr || ['changer', 'changeTime']
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
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
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
                this.loading = true
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getShowList(arr)
                    that.tableVisibleConfig = false
                    that.tableChildrenDrawer = false
                }, 500)
            },
            headerSelectChange(val){
                console.log(val)
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
            toClose() {
                this.$refs.query.queryclose();
            },
            onArrangeitem() {
                this.loading = true;
                this.$refs.query.queryopen();
                setTimeout(() => {
                    this.queryData = this.headerContentSelect;
                    this.loading = false;
                }, 500);
            },
            onAdditem() {
                this.$refs.client.open();
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

<style scoped></style>