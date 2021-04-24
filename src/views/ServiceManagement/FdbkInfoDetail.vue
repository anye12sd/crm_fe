<!--反馈信息详情-->
<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionEdit="descriptionEdit"
                :descriptionColumn="descriptionColumn"
        ></description-item>
        <div class="change-box">
            <a-button size="small" @click="onEdit" style="margin-right: 6px">修改</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                :pagination="pagination"
                :loading="tabsLoading"
                @on-callback="onCallback"
                @on-change-table="onChangeTable"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
                @on-add="toAdd"
                v-if="descriptionEdit ? false : true"
        ></category-tabs>
        <a-modal :visible="postRsltVisible" :title="RsltTitle" @ok="postAddRslt" onText="提交" @cancel="cancelRslt">
            <a-date-picker v-model="form.dealTime" @change="getDealDate" style="width: 50%" placeholder="请选择处理时间"/>
            <a-textarea
                    v-model="form.dealResult"
                    placeholder="处理过程"
                    style="margin-top: 15px"
            />
            <a-checkbox v-model="form.notice" style="margin-top: 15px">不再提醒</a-checkbox>
        </a-modal>
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
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";
    const descriptionColumn = [
        // 对象按顺序排列的数组
        {name: 'feedbackCategory', span: 1},
        {name: 'feedbackType', span: 1},
        {name: 'status', span: 1},
        {name: 'important', span: 1},
        {name: 'theme', span: 2},
        {name: 'deadline', span: 1},
        {name: 'feedbackTargetType', span: 2},
        {name: 'departmentName', span: 1},
        {name: 'feedbackTarget', span: 2},
        {name: 'responsibleEmployee', span: 1},
        {name: 'feedbackerType', span: 2},
        {name: 'createTime', span: 1},
        {name: 'feedbacker', span: 2},
        {name: 'creator', span: 1},
        {name: 'feedbackerPhone', span: 1},
        {name: 'feedbackerMail', span: 1},
        {name: 'changeTime', span: 1},
        {name: 'closeMember', span: 1},
        {name: 'closeTime', span: 1},
        {name: 'changer', span: 1},
        {name: 'description', span: 3},
        {name: 'result', span: 3}
    ];

    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';

    const usedTabs = [
        '处理过程',
        '相关任务',
        '工作记录',
        '日程',
        '待办事宜',
        '销售机会',
        '联系人',
        '相关员工',
        '已收邮件',
        '已发邮件',
        '附件'
    ];
    const usedTabsColumns = {
        dealProcessColumns: {
            name: '处理过程',
            show: true,
            columns: [
                {
                    title: '处理时间',
                    dataIndex: 'dealTime',
                    key: 'dealTime'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'empName',
                    key: 'empName'
                },
                {
                    title: '处理过程',
                    dataIndex: 'dealResult',
                    key: 'dealResult'
                }
            ],
            specsData: [],
            buttons: ['edit', 'delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        relatedMissionColumns: {
            name: '相关任务',
            show: true,
            columns: [
                {
                    title: '任务日期',
                    dataIndex: 'missionDate',
                    key: 'missionDate'
                },
                {
                    title: '完成期限',
                    dataIndex: 'completeUnderline',
                    key: 'completeUnderline'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'stage',
                    key: 'stage'
                },
                {
                    title: '任务主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '任务对象',
                    dataIndex: 'target',
                    key: 'target'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '负责人',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        workRecordColumns: {
            name: '工作记录',
            show: true,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '任务主题',
                    dataIndex: 'missionTheme',
                    key: 'missionTheme'
                },
                {
                    title: '发生费用',
                    dataIndex: 'realisedExpense',
                    key: 'realisedExpense'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        scheduleColumns: {
            name: '日程',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                },
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    key: 'endTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
        todoListColumns: {
            name: '待办事宜',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '完成期限',
                    dataIndex: 'endTime',
                    key: 'endTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: '重要性',
                    dataIndex: 'important',
                    key: 'important'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '创建人',
                    dataIndex: 'changer',
                    key: 'changer'
                }
            ],
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        saleChanceColumns: {
            name: '销售机会',
            show: true,
            columns: [
                {
                    title: '标志',
                    dataIndex: 'sign',
                    key: 'sign'
                },
                {
                    title: '来源类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '客户/伙伴名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '销售预期',
                    dataIndex: 'saleExpect',
                    key: 'saleExpect'
                },
                {
                    title: '预期日期',
                    dataIndex: 'expectDate',
                    key: 'expectDate'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '修改人',
                    dataIndex: 'changer',
                    key: 'changer'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                },
                {
                    title: '关闭员工',
                    dataIndex: 'closeEmployee',
                    key: 'closeEmployee'
                },
                {
                    title: '关闭时间',
                    dataIndex: 'closeTime',
                    key: 'closeTime'
                }
            ],
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        contactListColumns: {
            name: '联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'contactDepartment',
                    key: 'contactDepartment'
                },
                {
                    title: '职务',
                    dataIndex: 'duty',
                    key: 'duty'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'Email',
                    key: 'Email'
                },
                {
                    title: '办公电话',
                    dataIndex: 'officeLine',
                    key: 'officeLine'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        relatedMemberColumns: {
            name: '相关员工',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'memberName',
                    key: 'memberName'
                },
                {
                    title: '员工编码',
                    dataIndex: 'memberCode',
                    key: 'memberCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '部门编码',
                    dataIndex: 'departmentCode',
                    key: 'departmentCode'
                },
                {
                    title: '员工职务',
                    dataIndex: 'memberDuty',
                    key: 'memberDuty'
                },
                {
                    title: '员工角色',
                    dataIndex: 'memberCharacter',
                    key: 'memberCharacter'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '办公电话',
                    dataIndex: 'officePhone',
                    key: 'officePhone'
                },
                {
                    title: '移动电话',
                    dataIndex: 'mobilePhone',
                    key: 'mobilePhone'
                },
                {
                    title: '家庭电话',
                    dataIndex: 'homePhone',
                    key: 'homePhone'
                },
                {
                    title: 'BP机',
                    dataIndex: 'BP',
                    key: 'BP'
                },
                {
                    title: '员工地址',
                    dataIndex: 'memberAddress',
                    key: 'memberAddress'
                },
                {
                    title: '身份证号',
                    dataIndex: 'ID',
                    key: 'ID'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex'
                },
                {
                    title: '籍贯',
                    dataIndex: 'nativePlace',
                    key: 'nativePlace'
                },
                {
                    title: 'ICQ号',
                    dataIndex: 'ICQ',
                    key: 'ICQ'
                },
                {
                    title: '生日',
                    dataIndex: 'birthday',
                    key: 'birthday'
                },
                {
                    title: '入职时间',
                    dataIndex: 'entryTime',
                    key: 'entryTime'
                },
                {
                    title: '离职时间',
                    dataIndex: 'leaveTime',
                    key: 'leaveTime'
                },
                {
                    title: 'QQ',
                    dataIndex: 'QQ',
                    key: 'QQ'
                },
                {
                    title: '民族',
                    dataIndex: 'nation',
                    key: 'nation'
                },
                {
                    title: '微信号',
                    dataIndex: 'wechat',
                    key: 'wechat'
                },
                {
                    title: '现住址',
                    dataIndex: 'nowAddress',
                    key: 'nowAddress'
                },
                {
                    title: '兴趣爱好',
                    dataIndex: 'hobby',
                    key: 'hobby'
                },
                {
                    title: '政治面貌',
                    dataIndex: 'policy',
                    key: 'policy'
                }
            ],
            operateBtnFixed: true,
            buttons: ['delete'],
            headerContent: ['add']
        },
        receivedColumns: {
            name: '已收邮件',
            show: true,
            columns: [
                {
                    title: '发件人姓名',
                    dataIndex: 'senderName',
                    key: 'senderName'
                },
                {
                    title: '发件人邮件',
                    dataIndex: 'sentMail',
                    key: 'sentMail'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '发送时间',
                    dataIndex: 'sentTime',
                    key: 'sentTime'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        issuedColumns: {
            name: '已发邮件',
            show: true,
            columns: [
                {
                    title: '发件人姓名',
                    dataIndex: 'senderName',
                    key: 'senderName'
                },
                {
                    title: '发件人邮件',
                    dataIndex: 'sentMail',
                    key: 'sentMail'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme'
                },
                {
                    title: '发送时间',
                    dataIndex: 'sentTime',
                    key: 'sentTime'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
        accessoriesColumns: {
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
        }
    };
    const description = {
        feedbackType: '',
        feedbackCategory: '',
        status: '',
        important: '',
        theme: '',
        deadline: '',
        feedbackTargetType: '',
        departmentName: '',
        feedbackTarget: '',
        responsibleEmployee: '',
        feedbackerType: '',
        createTime: '',
        feedbacker: '',
        creator: '',
        feedbackerPhone: '',
        feedbackerMail: '',
        changeTime: '',
        closeMember: '',
        closeTime: '',
        changer: '',
        description: '',
        result: ''
    };

    import qs from 'qs';
    import api from '@/api/feedback';
    import moment from 'moment'

    export default {
        name: 'FdbkInfoDetail',
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                //对象
                description,
                descriptionColumn,
                // 提交
                submitContent: {},
                tabsLoading: false,
                visible: false,
                modalTitle: '反馈分类',
                formData: {},
                labelCol: {span: 4},
                wrapperCol: {span: 17},
                // 反馈分类
                variable: [
                    {id: 0, title: '客户反馈'},
                    {id: 1, title: '内部沟通'}
                ],
                // 对象按顺序排列的数组
                descriptionEdit: false,
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
                pane: usedTabs[0],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                postRsltVisible: false,
                RsltTitle: "",
                form: {
                    notice: true,
                    noticeFlag: 1
                },
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
                checkedAAAAA: ['usedTabsColumns', 'relatedMissionColumns', 'todoListColumns', 'receivedColumns', 'relatedMemberColumns'],
                // tabs选择参数结束
            };
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
            this.getRsltList()
            this.getDetail()
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
            getDetail(){
                api.getFdbkDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.description = {
                            feedbackType: data.fdbkType.label,
                            feedbackCategory: data.fdbkClassName,
                            status: data.fdbkStatus.label,
                            important: data.fdbkSeverity.label,
                            theme: data.fdbkSubject,
                            deadline: data.fdbkDueDate ? new Date(+new Date(data.fdbkDueDate) + 8 * 3600 * 1000)
                                .toISOString()
                                .replace(/T/g, ' ')
                                .replace(/\.[\d]{3}Z/, '')
                                : "",
                            feedbackTargetType: '',
                            departmentName: '',
                            feedbackTarget: data.fdbkTargetName,
                            responsibleEmployee: data.fdbkMngrEmpName,
                            feedbackerType: '',
                            createTime: '',
                            feedbacker: '',
                            creator: '',
                            feedbackerPhone: '',
                            feedbackerMail: '',
                            changeTime: '',
                            closeMember: '',
                            closeTime: '',
                            changer: '',
                            description: '',
                            result: ''
                        };
                    }
                })
            },
            getRsltList() {
                this.tabsLoading = true
                const data = {
                    page: this.pagination.current,
                    fdbkId: parseInt(this.$route.query.code)
                };
                api.getFdbkresult(data).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        const pagination = {...this.pagination};
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                        this.usedTabsColumns.dealProcessColumns.specsData = res.data.rows.map((item) => {
                            item.dealTime = new Date(+new Date(item.dealTime) + 8 * 3600 * 1000)
                                .toISOString()
                                .replace(/T/g, ' ')
                                .replace(/\.[\d]{3}Z/, '');
                            return item;
                        });
                    }
                    this.tabsLoading = false
                })
            },
            onCallback(key) {
                this.pagination.current = 1
                this.pagination.total = 0
                this.pane = key;
                console.log('key', key);
            },
            // 页码切换
            onChangeTable(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.pageSize;
                this.refreshTable()
            },
            refreshTable() {
                switch (this.pane) {
                    case '处理过程':
                        this.getRsltList()
                        break;
                }
            },
            statusChange(value) {
                console.log('反馈分类', value);
                this.description.feedbackCategory = this.variable[value].title;
                this.submitContent.fdbkClassId = value;
            },
            handleOk() {
                this.visible = false;
            },
            handleCancel() {
                this.visible = false;
            },
            toAdd() {
                if (this.pane == '处理过程') {
                    this.form = {
                        notice: true,
                        noticeFlag: 1
                    }
                    this.RsltTitle = '添加处理过程'
                    this.addFdbkRslt()
                }
            },
            childBtnClicked(type, text, record, index) {
                if (this.pane == '处理过程') {
                    if (type == 'edit') {
                        this.RsltTitle = '修改处理过程'
                        this.form.dealResult = record.dealResult
                        this.form.dealTime = record.dealTime
                        this.form.id = record.fdbkRId
                        this.postRsltVisible = true
                    } else if (type == 'delete') {
                        this.deleteRsltVisible(record.fdbkRId)
                    }
                }
            },
            addFdbkRslt() {
                this.postRsltVisible = true
            },
            deleteRsltVisible(id) {
                api.delFdbkresult(id).then((res) => {
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        this.refreshTable()
                    }
                })
            },
            postAddRslt() {
                if (this.RsltTitle == '修改处理过程') {
                    this.postEditRslt()
                    return -1
                }
                this.form.fdbkId = parseInt(this.$route.query.code)
                this.form.notice ? this.form.noticeFlag = 1 : this.form.noticeFlag = 0
                if (!this.form.dealTime) {
                    this.$message.error("请选择处理时间")
                    return false
                }
                if (!this.form.dealResult) {
                    this.$message.error("请输入处理过程")
                    return false
                }
                this.form.dealTime = this.form.dealTime.replace(' ', 'T') + 'Z'
                api.postFdbkresult(this.form).then((res) => {
                    if (res.code == 0) {
                        this.$message.success("添加成功")
                        this.refreshTable()
                    }
                    this.postRsltVisible = false
                })
            },
            postEditRslt() {
                this.form.notice ? this.form.noticeFlag = 1 : this.form.noticeFlag = 0
                if (!this.form.dealTime) {
                    this.$message.error("请选择处理时间")
                    return false
                }
                if (!this.form.dealResult) {
                    this.$message.error("请输入处理过程")
                    return false
                }
                this.form.dealTime = this.form.dealTime.replace(' ', 'T')
                console.log(this.form.id, this.form)
                api.putFdbkresult(this.form.id, this.form).then((res) => {
                    if (res.code == 0) {
                        this.$message.success("修改成功")
                        this.refreshTable()
                    }
                    this.postRsltVisible = false
                })
            },
            cancelRslt() {
                this.postRsltVisible = false
            },
            getDealDate(val) {
                this.form.dealTime = moment(val).format('YYYY-MM-DD HH:mm:ss.ms'); // 2019-08-23 21:03:43
            },
            onEdit(){
                this.$router.push({path: '/service_management/fdbk_add', query: {'editMode': 1, code: this.$route.query.code}})
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
        },
    };
</script>

<style scoped>
    .change-box{
        background: #fff;
        padding-left: 24px;
    }
</style>