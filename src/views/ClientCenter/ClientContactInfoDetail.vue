<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionColumn="descriptionColumn"
        ></description-item>
        <div class="change-box">
            <a-button size="small" @click="onEdit" style="margin-right: 6px">修改</a-button>
            <a-button size="small" v-if="description.status == '已启用'" @click="onStop" style="margin-right: 6px">停用</a-button>
            <a-button size="small" v-if="description.status == '已停止'" @click="onStart" style="margin-right: 6px">启用</a-button>
            <a-button size="small" @click="changeUnit" style="margin-right: 6px">更换单位</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                @on-add="toAdd"
                @on-callback="onCallback"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
        ></category-tabs>
        <tabs-select-drawer
                :visibleConfig="tabsVisibleConfig"
                :childrenDrawerProps="tabsChildrenDrawer"
                :columns="originColumns"
                :checkedListProps="tabsCheckedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </tabs-select-drawer>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange" @modal-close="modalAddTableClose"></modal-add-table>
    </a-layout>
</template>

<script>
    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
    import ModalAddTable from "../../components/ModalAddTable";
    import member from "@/api/member"
    import dept from "@/api/department"
    import friend from "@/api/friend"
    import contact from "@/api/contact"
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    const modalAddTableParams = {
        modalTitle: '员工选择',
        tableTitle: '员工列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [
            // {
            //     type: 'input',
            //     labelName: '分类编码',
            //     placeholder: '请输入',
            //     paramsName: 'code'
            // },
            // {
            //     type: 'input',
            //     labelName: '产品分类',
            //     paramsName: 'category'
            // },
            // {
            //     type: 'input',
            //     labelName: '备注',
            //     paramsName: 'remark'
            // },
            // {
            //     type: 'select',
            //     labelName: '选择',
            //     options: [
            //         {label: '0', value: 'select1'},
            //         {label: '1', value: 'select2'},
            //     ],
            // }
        ],
        pagination: {
            total: 0,
            current: 1,
            page_size: 10
        },
    }
    const modalAddColumns = [
        {
            title: '员工编码',
            dataIndex: 'empCode',
            key: 'empCode'
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName'
        },
        {
            title: '助记符',
            dataIndex: 'empSimpleCode',
            key: 'empSimpleCode'
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '员工职务',
            dataIndex: 'empMobilePhone',
            key: 'empMobilePhone'
        },
        {
            title: '员工角色',
            dataIndex: 'empOfficePhone',
            key: 'empOfficePhone'
        },
        {
            title: '登录名',
            dataIndex: 'empEmail',
            key: 'empEmail'
        },
    ]
    const usedTabs = [
        '负责员工',
        '负责部门',
        '影响',
        '单位变更',
        '价值变动',
        '参与的市场活动',
        '相关反馈',
        '相关任务',
        '工作记录',
        '工作日程',
        '销售机会',
        '待办事宜',
        '已收邮件',
        '已发邮件',
        '附件'
    ];
    const usedTabsColumns = {
        responsibleStaffColumns: {
            name: '负责员工',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'empName',
                    key: 'empName'
                },
                {
                    title: '员工编码',
                    dataIndex: 'empCode',
                    key: 'empCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '部门编码',
                    dataIndex: 'deptCode',
                    key: 'deptCode'
                },
                {
                    title: '员工职务',
                    dataIndex: 'empPosition',
                    key: 'empPosition'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
            ],
            buttons: ['delete'],
            specsData: [],
            headerContent: ['add'],
            operateBtnFixed: true,
        },
        responsibleDeptColumns: {
            name: '负责部门',
            show: true,
            columns: [
                {
                    title: '部门编码',
                    dataIndex: 'deptCode',
                    key: 'deptCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '电话',
                    dataIndex: 'deptPhone',
                    key: 'deptPhone'
                },
                {
                    title: '部门地址',
                    dataIndex: 'deptAddress',
                    key: 'deptAddress'
                }
            ],
            specsData: [],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        effectColumns: {
            name: '影响',
            show: true,
            columns: [
                {
                    title: '影响程度',
                    dataIndex: 'effect',
                    key: 'effect'
                },
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex'
                },
                {
                    title: '职务',
                    dataIndex: 'post',
                    key: 'post'
                },
                {
                    title: '称呼',
                    dataIndex: 'call',
                    key: 'call'
                },
                {
                    title: '描述',
                    dataIndex: 'describe',
                    key: 'describe'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        changeColumns: {
            name: '单位变更',
            show: true,
            columns: [
                {
                    title: '修改时间',
                    dataIndex: 'effect',
                    key: 'effect'
                },
                {
                    title: '类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '客户/伙伴名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '修改人',
                    dataIndex: 'changer',
                    key: 'changer'
                }
            ],
            buttons: [],
            operateBtnFixed: true
        },
        alterationColumns: {
            name: '价值变动',
            show: true,
            columns: [
                {
                    title: '更新属性',
                    dataIndex: 'attribute',
                    key: 'attribute'
                },
                {
                    title: '原值',
                    dataIndex: 'originValue',
                    key: 'originValue'
                },
                {
                    title: '更新值',
                    dataIndex: 'updateValue',
                    key: 'updateValue'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
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
                }
            ],
            buttons: [],
            operateBtnFixed: true
        },
        activeColumns: {
            name: '参与的市场活动',
            show: true,
            columns: [
                {
                    title: '市场活动分类',
                    dataIndex: 'cmpgClassName',
                    key: 'cmpgClassName'
                },
                {
                    title: '活动代码',
                    dataIndex: 'cmpgCode',
                    key: 'cmpgCode'
                },
                {
                    title: '开始日期',
                    dataIndex: 'cmpgStartDate',
                    key: 'cmpgStartDate'
                },
                {
                    title: '活动名称',
                    dataIndex: 'cmpgName',
                    key: 'cmpgName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '活动预算',
                    dataIndex: 'cmpgBudget',
                    key: 'cmpgBudget'
                }
            ],
            specsData: [],
            buttons: ['view', 'delete'],
            operateBtnFixed: true
        },
        feedbackColumns: {
            name: '相关反馈',
            show: true,
            columns: [
                {
                    title: '解决期限',
                    dataIndex: 'fdbkDueDate',
                    key: 'fdbkDueDate'
                },
                {
                    title: '重要性',
                    dataIndex: 'fdbkSeverity.label',
                    key: 'fdbkSeverity.label'
                },
                {
                    title: '状态',
                    dataIndex: 'fdbkStatus.label',
                    key: 'fdbkStatus.label',
                },
                {
                    title: '反馈分类',
                    dataIndex: 'fdbkType.label',
                    key: 'fdbkType.label'
                },
                {
                    title: '主题',
                    dataIndex: 'fdbkSubject',
                    key: 'fdbkSubject',
                    width: '20%'
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'fdbkSrcName',
                    key: 'fdbkSrcName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'fdbkMngrEmpName',
                    key: 'fdbkMngrEmpName'
                }
            ],
            specsData: [],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        taskColumns: {
            name: '相关任务',
            show: true,
            columns: [
                {
                    title: '任务日期',
                    dataIndex: 'taskDate',
                    key: 'taskDate'
                },
                {
                    title: '完成期限',
                    dataIndex: 'deadline',
                    key: 'deadline'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'taskStage',
                    key: 'taskStage'
                },
                {
                    title: '任务主题',
                    dataIndex: 'taskTheme',
                    key: 'taskTheme',
                    width: '40%'
                },
                {
                    title: '任务对象',
                    dataIndex: 'taskTarget',
                    key: 'taskTarget'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '负责人',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true
        },
        workRecordColumns: {
            name: '工作记录',
            show: true,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'jrnlStartTime',
                    key: 'jrnlStartTime'
                },
                {
                    title: '动作',
                    dataIndex: 'jrnlAction',
                    key: 'jrnlAction'
                },
                {
                    title: '主题',
                    dataIndex: 'jrnlSubject',
                    key: 'jrnlSubject',
                    width: '20%'
                },
                {
                    title: '任务主题',
                    dataIndex: 'taskTheme',
                    key: 'taskTheme',
                    width: '20%'
                },
                {
                    title: '对象名称',
                    dataIndex: 'jrnlTargetName',
                    key: 'jrnlTargetName'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'empName',
                    key: 'empName'
                }
            ],
            specsData: [],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        scheduleColumns: {
            name: '工作日程',
            show: true,
            columns: [
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
                    key: 'theme',
                    width: '40%'
                },
                {
                    title: '地点',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        saleColumns: {
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
                    key: 'theme',
                    width: '40%'
                },
                {
                    title: '伙伴/客户名称',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '销售预期',
                    dataIndex: 'salesExpect',
                    key: 'salesExpect'
                },
                {
                    title: '预期日期',
                    dataIndex: 'expectDate',
                    key: 'expectDate'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
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
            buttons: ['view', 'delete'],
            operateBtnFixed: true
        },
        todoColumns: {
            name: '待办事宜',
            show: true,
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'staffName',
                    key: 'staffName'
                },
                {
                    title: '完成期限',
                    dataIndex: 'deadLine',
                    key: 'deadLine'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%'
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
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
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
                    key: 'theme',
                    width: '40%'
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
                    key: 'theme',
                    width: '40%'
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
        customerName: '',
        contactName: '',
        sex: '',
        directSuperior: '',
        duty: '',
        status: '',
        personnelCharacteristics: '',
        call: '',
        email: '',
        QQ: '',
        mobilePhone: '',
        unifiedContactTime: '',
        clientEmail: '',
        phoneTimes: '',
        clientPhone: '',
        officePhone: '',
        mgw: '',
        fax: '',
        maritalStatus: '',
        changer: '',
        homeNumber: '',
        idNumber: '',
        addressDetail: '',
        birthday: '',
        monthlyContact: '',
        monthlyContactInfo: '',
        maturity: '',
        description: ''
    };
    const descriptionColumn = [
        {name: 'customerName', span: 3},
        {name: 'contactName', span: 1},
        {name: 'sex', span: 1},
        {name: 'directSuperior', span: 1},
        {name: 'duty', span: 1},
        {name: 'status', span: 1},
        {name: 'personnelCharacteristics', span: 1},
        {name: 'call', span: 1},
        {name: 'email', span: 1},
        {name: 'QQ', span: 1},
        {name: 'mobilePhone', span: 1},
        {name: 'unifiedContactTime', span: 1},
        {name: 'clientEmail', span: 1},
        {name: 'phoneTimes', span: 1},
        {name: 'clientPhone', span: 1},
        {name: 'officePhone', span: 1},
        {name: 'mgw', span: 1},
        {name: 'fax', span: 1},
        {name: 'maritalStatus', span: 1},
        {name: 'changer', span: 1},
        {name: 'homeNumber', span: 1},
        {name: 'idNumber', span: 1},
        {name: 'addressDetail', span: 2},
        {name: 'birthday', span: 1},
        {name: 'monthlyContact', span: 1},
        {name: 'monthlyContactInfo', span: 1},
        {name: 'maturity', span: 1},
        {name: 'description', span: 3}
    ] // 对象按顺序排列的数组

    export default {
        name: 'ClientContactInfoDetail',
        components: {TabsSelectDrawer, ModalAddTable, CategoryTabs, DescriptionItem},
        data() {
            return {
                pane: null,
                modalAddTableParams,
                modalAddColumns,
                modalAddData: [],
                description, //对象
                descriptionColumn,
                usedTabs: usedTabs,
                type: '',
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
                checkedAAAAA: ['responsibleDeptColumns', 'responsibleStaffColumns', 'taskColumns', 'feedbackColumns', 'workRecordColumns',],
                // tabs选择参数结束
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
            this.getContactDetail()
            this.getDutyMember()
        },
        methods: {
            getContactDetail() {
                contact.getContactDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if (res.code == 0) {
                        let data = res.data
                        this.description = {
                            customerName: data.friendName,
                            contactName: data.contactName,
                            sex: data.contactGender == 0 ? '男' : '女',
                            directSuperior: '',
                            duty: data.contactPosition,
                            status: data.stopFlag == 1 ? '已停止' : '未停止',
                            personnelCharacteristics: '负责人',
                            call: data.contactSalutation,
                            email: data.contactEmail,
                            QQ: data.contactQq,
                            mobilePhone: data.contactMobilePhone,
                            unifiedContactTime: '',
                            clientEmail: data.contactEmail,
                            phoneTimes: data.touchTime ? data.touchTime : 0,
                            clientPhone: data.contactMobilePhone,
                            officePhone: data.contactOfficePhone,
                            mgw: '',
                            fax: data.contactFax,
                            maritalStatus: '其他',
                            changer: '',
                            homeNumber: '',
                            idNumber: '',
                            addressDetail: data.contactAddress,
                            birthday: data.contactBirthYear + '-' + data.contactBirthMonth + '-' + data.contactBirthDay,
                            monthlyContact: '',
                            monthlyContactInfo: '',
                            maturity: '',
                            description: ''
                        };
                    }
                })
            },
            getDutyMember() {
                let params = {page: this.modalAddTableParams.pagination.current, contactId: this.$route.query.code}
                member.getDutyMemberList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.modalAddTableParams.pagination};
                        pagination.total = res.data.count;
                        this.modalAddTableParams.pagination = pagination;
                        this.usedTabsColumns.responsibleStaffColumns.specsData = res.data.rows;
                    }
                })
            },
            getDutyDept() {
                let params = {page: this.modalAddTableParams.pagination.current, contactId: this.$route.query.code}
                contact.getDutyDepartment(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.modalAddTableParams.pagination};
                        pagination.total = res.data.count;
                        this.modalAddTableParams.pagination = pagination;
                        this.usedTabsColumns.responsibleDeptColumns.specsData = res.data.rows;
                    }
                })
            },
            getActivityList() {
                let params = {page: this.modalAddTableParams.pagination.current, contactId: this.$route.query.code}
                console.log(params)
                contact.getActivityList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.modalAddTableParams.pagination}
                        pagination.total = res.data.count
                        this.modalAddTableParams.pagination = pagination;
                        this.usedTabsColumns.activeColumns.specsData = res.data.rows
                    }
                })
            },
            getFdbkList() {
                let params = {page: this.modalAddTableParams.pagination.current, contactId: this.$route.query.code}
                console.log(params)
                contact.getFdbkList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.modalAddTableParams.pagination}
                        pagination.total = res.data.count
                        this.modalAddTableParams.pagination = pagination;
                        this.usedTabsColumns.feedbackColumns.specsData = res.data.rows
                        this.usedTabsColumns.feedbackColumns.specsData.map(item => {
                            item.fdbkDueDate = item.fdbkDueDate ? new Date(+new Date(item.fdbkDueDate) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : ""
                        })
                    }
                })
            },
            getWorkRecordList() {
                let params = {page: this.modalAddTableParams.pagination.current, contactId: this.$route.query.code}
                console.log(params)
                contact.getWorkRecordList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.modalAddTableParams.pagination}
                        pagination.total = res.data.count
                        this.modalAddTableParams.pagination = pagination;
                        this.usedTabsColumns.workRecordColumns.specsData = res.data.rows
                    }
                })
            },
            onCallback(key) {
                this.modalAddTableParams.pagination.current = 1
                console.log('callback', key);
                this.pane = key;
                if (key == '负责员工') {
                    this.getDutyMember()
                } else if (key == '负责部门') {
                    this.getDutyDept()
                } else if (key == '参与的市场活动') {
                    this.getActivityList()
                } else if (key == '工作记录') {
                    this.getWorkRecordList()
                } else if (key == '相关反馈') {
                    this.getFdbkList()
                }
            },
            toAdd() {
                if (this.pane == '负责员工') {
                    this.modalAddColumns = [
                        {
                            title: '员工编码',
                            dataIndex: 'empCode',
                            key: 'empCode'
                        },
                        {
                            title: '员工姓名',
                            dataIndex: 'empName',
                            key: 'empName'
                        },
                        {
                            title: '助记符',
                            dataIndex: 'empSimpleCode',
                            key: 'empSimpleCode'
                        },
                        {
                            title: '部门名称',
                            dataIndex: 'deptName',
                            key: 'deptName'
                        },
                        {
                            title: '员工职务',
                            dataIndex: 'empMobilePhone',
                            key: 'empMobilePhone'
                        },
                        {
                            title: '员工角色',
                            dataIndex: 'empOfficePhone',
                            key: 'empOfficePhone'
                        },
                        {
                            title: '登录名',
                            dataIndex: 'empEmail',
                            key: 'empEmail'
                        },
                    ]
                    this.modalAddTableParams.modalTitle = '员工选择'
                    this.modalAddTableParams.tableTitle = '员工列表'
                    this.modalAddTableParams.isCheckbox = true
                    this.getMemberList()
                } else if (this.pane == '负责部门') {
                    this.modalAddColumns = [
                        {
                            title: '部门编码',
                            dataIndex: 'empCode',
                            key: 'empCode'
                        },
                        {
                            title: '部门名称',
                            dataIndex: 'deptName',
                            key: 'deptName'
                        },
                        {
                            title: '电话',
                            dataIndex: 'empSimpleCode',
                            key: 'empSimpleCode'
                        },
                        {
                            title: '电子邮件',
                            dataIndex: 'w',
                            key: 'w'
                        },
                        {
                            title: '部门地址',
                            dataIndex: 'empMobilePhone',
                            key: 'empMobilePhone'
                        }
                    ]
                    this.modalAddTableParams.modalTitle = '部门选择'
                    this.modalAddTableParams.tableTitle = '部门列表'
                    this.modalAddTableParams.isCheckbox = true
                    this.getDeptList()
                }
            },
            onEdit() {
                this.$router.push({
                    path: '/client_center/client_contact_add',
                    query: {'editMode': 1, code: this.$route.query.code}
                })
            },
            getMemberList() {
                this.$refs.tableAdd.open()
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                member.getMemberList(params).then((res) => {
                    console.log(res);
                    const pagination = {...this.modalAddTableParams.pagination};
                    pagination.total = res.data.count;
                    this.pagination = pagination;
                    this.modalAddTableParams.pagination = pagination;
                    this.modalAddData = res.data.rows;
                    this.modalAddTableParams.loading = false;
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getDeptList() {
                this.$refs.tableAdd.open()
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                dept.getDepartmentList(params).then((res) => {
                    console.log(res);
                    const pagination = {...this.modalAddTableParams.pagination};
                    pagination.total = res.data.count;
                    this.modalAddTableParams.pagination = pagination;
                    this.modalAddData = res.data.rows;
                    this.modalAddTableParams.loading = false;
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getFriendList() {
                this.$refs.tableAdd.open()
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                friend.getFriendList(params).then((res) => {
                    console.log(res);
                    const pagination = {...this.modalAddTableParams.pagination};
                    pagination.total = res.data.count;
                    this.modalAddTableParams.pagination = pagination;
                    this.modalAddData = res.data.rows;
                    this.modalAddTableParams.loading = false;
                })
                    .catch(err => {
                        console.log(err)
                    })
            },
            tableSelectedHandle(val) {
                if (!val.length) {
                    return -1
                }
                if (this.pane == "负责员工") {
                    let array = []
                    val.map(item => {
                        array.push(item.empId)
                    })
                    this.postAddMember(array)
                } else if (this.pane == "负责部门") {
                    let array = []
                    val.map(item => {
                        array.push(item.deptId)
                    })
                    this.postAddDept(array)
                }
            },
            postAddMember(empId) {
                let params = {contactId: parseInt(this.$route.query.code), empId: empId}
                console.log(params)
                member.postAddDutyMember(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("添加成功")
                        if (this.pane == '负责员工') {
                            this.getDutyMember()
                        }
                    }
                })
            },
            postAddDept(deptId) {
                let params = {contactId: parseInt(this.$route.query.code), deptId: deptId}
                console.log(params)
                contact.postAddDepartment(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("添加成功")
                        if (this.pane == '负责部门') {
                            this.getDutyDept()
                        }
                    }
                })
            },
            childBtnClicked(type, text, record, index) {
                if (this.pane == '负责员工') {
                    if (type == 'delete') {
                        this.deleteMember(record.id)
                    }
                } else if (this.pane == '负责部门') {
                    if (type == 'delete') {
                        this.deleteDept(record.id)
                    }
                }
            },
            deleteMember(id) {
                member.deleteDutyMember(id).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        this.getDutyMember()
                    }
                })
            },
            deleteDept(id) {
                contact.delDept(id).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        this.getDutyDept()
                    }
                })
            },
            changeUnit(){
                this.type = '更换单位'
                this.modalAddTableParams.pagination.current = 1
                this.modalAddColumns = [
                    {
                        title: '客户编码',
                        dataIndex: 'friendCode',
                        key: 'friendCode'
                    },
                    {
                        title: '客户名',
                        dataIndex: 'friendName',
                        key: 'friendName'
                    },
                    {
                        title: '客户助记符',
                        dataIndex: 'friendSimpleCode',
                        key: 'friendSimpleCode'
                    },
                    {
                        title: '电话',
                        dataIndex: 'friendMobilePhone',
                        key: 'friendMobilePhone'
                    },
                    {
                        title: '电子邮件',
                        dataIndex: 'friendEmail',
                        key: 'friendEmail'
                    }
                ]
                this.modalAddTableParams.modalTitle = '客户选择'
                this.modalAddTableParams.tableTitle = '客户列表'
                this.modalAddTableParams.isCheckbox = false
                this.getFriendList()
            },
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                if(this.type == '更换单位'){
                    this.getFriendList()
                    return
                }
                if (this.pane == '负责员工') {
                    this.getMemberList()
                }
                else if (this.pane == '负责部门') {
                    this.getDeptList()
                }
            },
            modalAddTableClose(){
                this.type = ''
            },
            onStart() {

            },
            onStop() {

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
    };
</script>

<style scoped>
    .change-box {
        background: #fff;
        padding-left: 24px;
    }
</style>