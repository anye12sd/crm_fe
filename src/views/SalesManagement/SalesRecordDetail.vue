<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"></description-item>
        <div class="change-box">
            <a-button size="small" @click="onLock" style="margin-right: 6px">锁定</a-button>
            <a-button size="small" v-if="description.status == '已停止'" @click="onUnlock" style="margin-right: 6px">解锁</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs :usedTabs="usedTabs"
                       :usedTabsColumns="tabsSelected"
                       @on-callback="onCallback"
                       :pagination="pagination"
                       @on-tabsSelect="tabsSelect"
        >
        </category-tabs>
        <tabs-select-drawer
                :visibleConfig="tabsVisibleConfig"
                :childrenDrawerProps="tabsChildrenDrawer"
                :columns="originColumns"
                :checkedListProps="tabsCheckedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </tabs-select-drawer>
    </a-layout>
</template>

<script>
    import contact from "@/api/contact";
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    const usedTabs = ['费用','联系人','附件']
    const usedTabsColumns = {
        costColumns: {
            name: '费用',
            show: true,
            columns: [
                {
                    title: '费用编码',
                    dataIndex: 'costCode',
                    key: 'costCode'
                },
                {
                    title: '费用名称',
                    dataIndex: 'costName',
                    key: 'costName'
                },
                {
                    title: '费用简码',
                    dataIndex: 'costCodeSimple',
                    key: 'costCodeSimple'
                },
                {
                    title: '发生费用',
                    dataIndex: 'occurCost',
                    key: 'occurCost'
                },
                {
                    title: '批准费用',
                    dataIndex: 'approveCost',
                    key: 'approveCost'
                },
                {
                    title: '摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ]
        },
        contactListColumns: {
            name: '联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '客户名',
                    dataIndex: 'friendName',
                    key: 'friendName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'contactDept',
                    key: 'contactDept'
                },
                {
                    title: '职务',
                    dataIndex: 'contactPosition',
                    key: 'contactPosition'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'contactEmail',
                    key: 'contactEmail'
                },
                {
                    title: '办公电话',
                    dataIndex: 'contactOfficePhone',
                    key: 'contactOfficePhone'
                }
            ],
            specsData: [],
            button: ['delete', 'view'],
            headerContent: ['add']
        },
        annexColumns: {
            name: '附件',
            show: true,
            columns: [
                {
                    title: '附件名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '附件描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '附件大小',
                    dataIndex: 'annexByte',
                    key: 'annexByte'
                },
                {
                    title: '上载员工',
                    dataIndex: 'uploadEmployee',
                    key: 'uploadEmployee'
                },
                {
                    title: '锁定员工',
                    dataIndex: 'lockEmployee',
                    key: 'lockEmployee'
                }
            ]
        },
    }
    const description = {// 对象
        'theme': '测试客户',
        'action': '',
        'workReportTarget': '永康市富南盛工贸有限公司',
        'memberName': '29400.00',
        'startDate': '2020-01-01',
        'endDate': '2020-01-01',
        'createTime': '2020-01-01',
        'departmentName': '',
        'occurAmount': '',
        'changeTime': '2020-01-01',
        'approveAmount': '2020-01-01',
        'approver': '',
        'focusPoint': '1',
        'map': '',
        'description': '',
    }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'theme', span: 2 },
            { name: 'action', span: 1 },
            { name: 'workReportTarget', span: 2 },
            { name: 'memberName', span: 1 },
            { name: 'startDate', span: 1 },
            { name: 'endDate', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'departmentName', span: 1 },
            { name: 'occurAmount', span: 1 },
            { name: 'changeTime', span: 1 },
            { name: 'approveAmount', span: 1 },
            { name: 'approver', span: 1 },
            { name: 'focusPoint', span: 1 },
            { name: 'map', span: 3 },
            { name: 'description', span: 3 },
        ]
    import record from '@/api/workRecord';
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";
    export default {
        name: "SalesRecordDetail",
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                description,//对象
                descriptionColumn,// 对象按顺序排列的数组
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
                // tabs选择参数
                tabsVisibleConfig: false,
                tabsChildrenDrawer: false,
                //checkboxgroup里需要默认选中的项
                checkedList: [],
                tabsCheckedList: [],
                originColumns: [],
                columns: [],
                loading: false,
                tabsSelected: {},
                checkedAAAAA: ['costColumns'],
                // tabs选择参数结束
                pagination: {
                    current: 1,
                    total: 0,
                    pageSize: 10
                }
            }
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
            this.getDetail()
        },
        methods: {
            getDetail(){
                record.getWorkRecordDetail(this.$route.query.id).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.description = {
                            //对象
                            'memberCode': data.empCode,
                            'memberName': data.empName,
                            'memberMnemonic': data.empSimpleCode,
                            'departmentName': data.deptName,
                            'loginName': data.loginName,
                            'memberDuty': data.empPosition,
                            'memberAddress': data.empAddress,
                            'officePhone': data.empOfficePhone,
                            'email': data.empEmail,
                            'mobilePhone': data.empMobilePhone,
                            'ICQ': '',
                            'BP': '',
                            'homeNumber': data.empHomePhone,
                            'idNumber': data.empPinNo,
                            'birthday': data.empBirthDay,
                            'sex': data.empGender == 0? '男' : '女',
                            'nativePlace': data.empBirthPlace,
                            'education': data.empEduLevel,
                            'entryTime': '',
                            'leaveTime': '',
                            'cdf': '',
                            'QQ': data.empQq,
                            'national': '',
                            'wechat': data.empWechat,
                            'hobby': '',
                            'policy': '',
                            'remark': data.empMemo,
                        };
                    }
                })
            },
            onCallback(key) {
                this.pagination.current = 1
                this.pane = key;
                if (key == '联系人') {
                    this.getContactList()
                }
            },
            getContactList(){
                let params = {page: this.pagination.current}
                contact
                    .getContactList(params)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            const pagination = {...this.pagination};
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.usedTabsColumns.contactListColumns.specsData = res.data.rows
                            this.usedTabsColumns.contactListColumns.specsData.map(item => {
                                item.link = '/client_center/client_contact_info_detail?code=' + item.contactId
                            })
                        }
                    })
            },
            tabsSelect() {
                this.tabsVisibleConfig = true;
            },
            getShowList(arr) {
                let obj = {}
                this.tabsCheckedList = arr || this.checkedAAAAA
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == this.tabsCheckedList[i]) {
                            obj[key] = this.usedTabsColumns[key]
                        }
                    }
                }
                this.tabsSelected = obj
            },
            getOriginColumns() {
                this.originColumns = []
                let usedTabsColumns = this.usedTabsColumns
                for (let key in usedTabsColumns) {
                    this.originColumns.push({dataIndex: key, title: usedTabsColumns[key].name})
                }
                this.columns = []
                let k = 0
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let j = k; j < this.originColumns.length; j++)
                        if (this.originColumns[j].dataIndex.includes(this.tabsCheckedList[i])) {
                            this.columns.push(this.originColumns[j]);
                            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                            k++
                            break
                            // this.originColumns.splice(j, 1)
                            // j--
                        }
                }
                console.log(this.originColumns)
            },
            hideList(){
                this.tabsVisibleConfig = false
            },
            postShow(val) {
                this.tabsChildrenDrawer = true
                let arr = []
                let obj = {}
                for (let i = 0; i < val.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == val[i].dataIndex) {
                            obj[key] = this.usedTabsColumns[key]
                            arr.push(key)
                        }
                    }
                }
                this.tabsSelected = obj
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getShowList(arr)
                    that.getOriginColumns(arr)
                    that.tabsVisibleConfig = false
                    that.tabsChildrenDrawer = false
                }, 500)
            },
        }
    }
</script>

<style scoped>
    .change-box {
        background: #fff;
        padding-left: 24px;
    }
</style>