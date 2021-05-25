<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionEdit="descriptionEdit"
                :descriptionColumn="descriptionColumn"
                :editButtons="editButtons"
                :titleButtons="titleButtons"
        ></description-item>
        <div class="change-box">
            <a-button size="small" @click="edit()" style="margin-right: 6px">修改</a-button>
<!--            isHis 是否关闭 ，0已开启未关闭状态-->
            <a-button size="small" v-if="description.isHis == 0" @click="closeMarket()" style="margin-right: 6px">关闭</a-button>
            <a-button size="small" v-if="description.isHis == 1" @click="openMarket()" style="margin-right: 6px">开启</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs
                v-if="descriptionEdit ? false : true"
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                :pagination="pagination"
                @on-callback="getKey"
                @on-add="toAdd"
                @on-click-btn="onClickBtn"
                @on-tabsSelect="tabsSelect"
                @on-change-table="changeTablePagination"
        ></category-tabs>
        <a-modal
                :visible="visible"
                :title="modalTitle"
                @ok="handleOk"
                @cancel="handleCancel"
                ok-text="保存"
                cancel-text="取消"
        >
            <a-textarea v-if="currentKey == '问题讨论'" v-model="form.discussContent"></a-textarea>
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
    import api from '@/api/discuss';
    import api2 from '@/api/cmpg';
    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    let usedTabs = [
        '相关任务',
        '相关员工',
        '工作记录',
        '问题讨论',
        '销售机会',
        '销售订单',
        '客户',
        '客户联系人',
        '合作伙伴',
        '伙伴联系人',
        '供应商',
        '供应商联系人',
        '已收邮件',
        '已发邮件',
        '附件'
    ];
    let usedTabsColumns = {
        taskListColumns: {
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
                    dataIndex: 'dueDate',
                    key: 'dueDate'
                },
                {
                    title: '任务阶段',
                    dataIndex: 'taskPhase',
                    key: 'taskPhase'
                },
                {
                    title: '任务主题',
                    dataIndex: 'taskTheme',
                    key: 'taskTheme',
                    width: '20%'
                },
                {
                    title: '任务对象',
                    dataIndex: 'taskObject',
                    key: 'taskObject'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '负责人',
                    dataIndex: 'chargePerson',
                    key: 'chargePerson'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: []
        },
        staffListColumns: {
            name: '员工信息',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'state',
                    key: 'state'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonicCode',
                    key: 'mnemonicCode'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'staffName',
                    key: 'staffName'
                },
                {
                    title: '员工编码',
                    dataIndex: 'staffCode',
                    key: 'staffCode'
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
                    dataIndex: 'staffPost',
                    key: 'staffPost'
                },
                {
                    title: '员工角色',
                    dataIndex: 'staffRole',
                    key: 'staffRole'
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
                    dataIndex: 'bp',
                    key: 'bp'
                },
                {
                    title: '员工地址',
                    dataIndex: 'staffAddress',
                    key: 'staffAddress'
                },
                {
                    title: '身份证号',
                    dataIndex: 'IDNumber',
                    key: 'IDNumber'
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
                    dataIndex: 'icq',
                    key: 'icq'
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
                    key: 'leaveDTime'
                },
                {
                    title: 'QQ',
                    dataIndex: 'qq',
                    key: 'qq'
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
                    dataIndex: 'currentAddress',
                    key: 'currentAddress'
                },
                {
                    title: '兴趣爱好',
                    dataIndex: 'hobby',
                    key: 'hobby'
                },
                {
                    title: '政治面貌',
                    dataIndex: 'politicalOutlook',
                    key: 'politicalOutlook'
                }
            ],
            buttons: ['delete'],
            operateBtnFixed: true,
            headerContent: []
        },
        recordListColumns: {
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
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '任务主题',
                    dataIndex: 'taskTheme',
                    key: 'taskTheme',
                    width: '20%'
                },
                {
                    title: '发生费用',
                    dataIndex: 'cost',
                    key: 'cost'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'staffName',
                    key: 'staffName'
                }
            ],
            buttons: ['view', 'delete'],
            operateBtnFixed: true,
            headerContent: []
        },
        problemListColumns: {
            name: '问题讨论',
            show: true,
            columns: [
                {
                    title: '修改时间',
                    dataIndex: 'postDate',
                    key: 'postDate'
                },
                {
                    title: '内容',
                    dataIndex: 'memo',
                    key: 'memo'
                },
                {
                    title: '发表员工',
                    dataIndex: 'empName',
                    key: 'empName'
                }
            ],
            specsData: [],
            buttons: ['edit', 'delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        salesListColumns: {
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
                    dataIndex: 'sourceType',
                    key: 'sourceType'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '客户/伙伴名称',
                    dataIndex: 'clientName',
                    key: 'clientName'
                },
                {
                    title: '销售预期',
                    dataIndex: 'salesExpectation',
                    key: 'salesExpectation'
                },
                {
                    title: '预期日期',
                    dataIndex: 'expectedDate',
                    key: 'expectedDate'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'responsibleStaff',
                    key: 'responsibleStaff'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '创建人',
                    dataIndex: 'founder',
                    key: 'founder'
                },
                {
                    title: '修改时间',
                    dataIndex: 'mdificationTime',
                    key: 'mdificationTime'
                },
                {
                    title: '修改人',
                    dataIndex: 'reviser',
                    key: 'reviser'
                },
                {
                    title: '关闭员工',
                    dataIndex: 'closeStaff',
                    key: 'closeStaff'
                },
                {
                    title: '关闭时间',
                    dataIndex: 'closeTime',
                    key: 'founder'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        orderListColumns: {
            name: '销售订单',
            show: true,
            columns: [
                {
                    title: '订单日期',
                    dataIndex: 'orderDate',
                    key: 'orderDate'
                },
                {
                    title: '订单编号',
                    dataIndex: 'orderNumber',
                    key: 'orderNumber'
                },
                {
                    title: '客户名',
                    dataIndex: 'clientName',
                    key: 'clientName'
                },
                {
                    title: '订单摘要',
                    dataIndex: 'orderSummary',
                    key: 'orderSummary'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'staffName',
                    key: 'staffName'
                },
                {
                    title: '订单金额',
                    dataIndex: 'orderAmount',
                    key: 'orderAmount'
                },
                {
                    title: '欠款金额',
                    dataIndex: 'amountOwed',
                    key: 'amountOwed'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        relatedStaffColumns: {
            name: '相关员工',
            show: true,
            columns: [
                {
                    title: '员工编码',
                    dataIndex: 'staffCode',
                    key: 'staffCode'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'staffName',
                    key: 'staffName'
                },
                {
                    title: '助记码',
                    dataIndex: 'mnemonicCode',
                    key: 'mnemonicCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptname',
                    key: 'deptname'
                },
                {
                    title: '员工职务',
                    dataIndex: 'staffPost',
                    key: 'staffPost'
                },
                {
                    title: '员工角色',
                    dataIndex: 'staffRole',
                    key: 'staffRole'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                }
            ],
            buttons: ['delete'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        clientListColumns: {
            name: '客户',
            show: true,
            columns: [
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '客户名',
                    dataIndex: 'clientName',
                    key: 'clientName'
                },
                {
                    title: '客户助记符',
                    dataIndex: 'clientMnemonic',
                    key: 'clientMnemonic'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'telephone',
                    key: 'telephone'
                },
                {
                    title: '详情地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '网站主页',
                    dataIndex: 'website',
                    key: 'website'
                }
            ],
            buttons: ['delete'],
            operateBtnFixed: true,
            headerContent: ['add', 'addFromCollect']
        },
        clientContactListColumns: {
            name: '客户联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '客户名',
                    dataIndex: 'clientName',
                    key: 'clientName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'clientDept',
                    key: 'clientDept'
                },
                {
                    title: '职务',
                    dataIndex: 'post',
                    key: 'post'
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
                }
            ],
            buttons: ['delete'],
            operateBtnFixed: true,
            headerContent: ['add', 'addFromCollect']
        },
        partnerListColumns: {
            name: '合作伙伴',
            show: true,
            columns: [
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '伙伴助记符',
                    dataIndex: 'partnerMnemonic',
                    key: 'partnerMnemonic'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'telephone',
                    key: 'telephone'
                },
                {
                    title: '详情地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '网站主页',
                    dataIndex: 'website',
                    key: 'website'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        partnerContactListColumns: {
            name: '伙伴联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'partnerDept',
                    key: 'partnerDept'
                },
                {
                    title: '职务',
                    dataIndex: 'post',
                    key: 'post'
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
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        supplierListColumns: {
            name: '供应商',
            show: true,
            columns: [
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
                },
                {
                    title: '供应商助记符',
                    dataIndex: 'supplierMnemonic',
                    key: 'supplierMnemonic'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'telephone',
                    key: 'telephone'
                },
                {
                    title: '详情地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '网站主页',
                    dataIndex: 'website',
                    key: 'website'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        supplierContactListColumns: {
            name: '供应商联系人',
            show: true,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'contactDept',
                    key: 'contactDept'
                },
                {
                    title: '职务',
                    dataIndex: 'post',
                    key: 'post'
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
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: []
        },
        mailReceivedColumns: {
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
                    width: '20%'
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
        mailSentColumns: {
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
                    width: '20%'
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
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        }
    };

    export default {
        name: 'CustomerContactInfoDetail',
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                //对象
                description: {},
                // 对象按顺序排列的数组
                descriptionColumn: [
                    {name: 'activityCode', span: 1},
                    {name: 'activityName', span: 2},
                    {name: 'activityCategory', span: 1},
                    {name: 'departmentName', span: 1},
                    {name: 'activityBudget', span: 1},
                    {name: 'startDate', span: 1},
                    {name: 'endDate', span: 1},
                    {name: 'activityExpenses', span: 1},
                    {name: 'createTime', span: 1},
                    {name: 'changeTime', span: 1},
                    {name: 'closeTime', span: 1},
                    {name: 'creator', span: 1},
                    {name: 'changer', span: 1},
                    {name: 'closeMember', span: 1},
                    {name: 'speaker', span: 1},
                    {name: 'attendance', span: 1},
                    {name: 'enterprises', span: 1},
                    {name: 'address', span: 1},
                    {name: 'relatedCourses', span: 2},
                    {name: 'remark', span: 3}
                ],
                editButtons: [],
                titleButtons: [],
                descriptionEdit: false,
                usedTabs: usedTabs,
                tableData: [],
                usedTabsColumns: usedTabsColumns,
                currentKey: "",
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                cmpdId: '',
                visible: false,
                modalTitle: "",
                discussId: "",
                discussIndex: "",
                form: {},
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
                checkedAAAAA: ['taskListColumns', 'staffListColumns', 'problemListColumns', 'orderListColumns', 'relatedStaffColumns'],
                // tabs选择参数结束
            };
        },
        created() {
            this.cmpgId = parseInt(this.$route.query.cmpgId)
            this.fetchDetail()
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
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
            fetchDetail() {
                api2
                    .getCmpgDetail(this.cmpgId)
                    .then((res) => {
                        console.log(res)
                        if (res.code != 0) {
                            this.$message.error(res.msg)
                            return -1
                        }
                        const data = res.data
                        this.description = {
                            id: data.cmpgId,
                            isHis: data.isHis,
                            activityCode: data.cmpgCode,
                            activityName: data.cmpgName,
                            activityCategory: data.cmpgClassName,
                            departmentName: data.deptName,
                            activityBudget: data.cmpgBudget,
                            startDate: data.cmpgStartDate,
                            endDate: data.cmpgEndDate,
                            activityExpenses: data.cmpgCost,
                            createTime: data.createTime,
                            changeTime: data.modifyTime,
                            closeTime: data.closeTime,
                            creator: data.createEmpName,
                            changer: data.modifyEmpName,
                            closeMember: data.closeEmpName,
                            speaker: '',
                            attendance: '',
                            enterprises: '',
                            address: '',
                            relatedCourses: '',
                            remark: data.memo
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            fetch() {
                if (this.currentKey == '问题讨论') {
                    // 获取问题讨论列表
                    this.getProblemListTable()
                }
            },
            getKey(val) {
                this.currentKey = val
                this.pagination.current = 1
                if (val == '问题讨论') {
                    // 获取问题讨论列表
                    this.getProblemListTable()
                }
            },
            // 页码切换
            changeTablePagination(val) {
                this.pagination.current = val.current;
                this.pagination.pageSize = val.pageSize;
                this.fetch()
            },
            closeMarket(){
                api2
                    .putCmpgStop(this.cmpgId)
                    .then((res) => {
                        console.log(res)
                        if (res.code != 0) {
                            this.$message.error(res.msg)
                            return -1
                        }
                        this.$message.success('关闭成功')
                        this.$router.push({path: '/market_management/marketing_list'})
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            openMarket(){
                api2
                    .putCmpgAction(this.cmpgId)
                    .then((res) => {
                        console.log(res)
                        if (res.code != 0) {
                            this.$message.error(res.msg)
                            return -1
                        }
                        this.$message.success('开启成功')
                        this.$router.push({path: '/market_management/marketing_list'})
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            getProblemListTable() {
                let params = {page: this.pagination.current, cmpgId: this.cmpgId}
                console.log(params)
                api
                    .getDiscussList(params)
                    .then((res) => {
                        console.log(res)
                        if (res.code != 0) {
                            this.$message.error(res.msg)
                            return -1
                        }
                        this.usedTabsColumns.problemListColumns.specsData = res.data.rows
                        const pagination = {...this.pagination};
                        pagination.total = res.data.count;
                        this.pagination = pagination;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            toAdd() {
                if (this.currentKey == '问题讨论') {
                    this.visible = true
                    this.modalTitle = "新增问题讨论"
                }
            },
            onClickBtn(type, text, record, index) {
                console.log(type)
                if (this.currentKey == '问题讨论') {
                    if (type == 'delete') {
                        this.deleteDiscuss(record.id, index)
                    } else if (type == 'edit') {
                        this.discussId = record.id
                        this.discussIndex = index
                        this.visible = true
                        this.modalTitle = "更新问题讨论"
                        this.form.discussContent = this.tableData[index].memo
                    }
                }
            },
            edit() {
                this.$router.push({path: '/market_management/marketing_add', query: {editMode: 1, cmpgId: this.cmpgId}})
            },
            handleCancel() {
                this.visible = false
            },
            handleOk() {
                this.visible = false
                if (this.currentKey == '问题讨论') {
                    if (this.modalTitle == "更新问题讨论") {
                        this.putDiscuss()
                    } else {
                        this.addDiscuss()
                    }
                }
            },
            addDiscuss() {
                let params = {memo: this.form.discussContent, cmpgId: this.cmpgId}
                api
                    .postAddDiscuss(params)
                    .then((res) => {
                        console.log(res)
                        if (res.code == 0) {
                            this.$message.success("添加成功")
                            this.getProblemListTable()
                        }
                    })
            },
            deleteDiscuss(id) {
                api
                    .delDiscuss(id)
                    .then((res) => {
                        console.log(res)
                        if (res.code == 0) {
                            this.$message.success("删除成功")
                            this.getProblemListTable()
                        }
                    })
            },
            putDiscuss() {
                let params = {memo: this.form.discussContent}
                console.log(params)
                api
                    .putDiscuss(this.discussId, params)
                    .then((res) => {
                        console.log(res)
                        if (res.code == 0) {
                            this.$message.success("修改成功")
                            this.getProblemListTable()
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
        },
    };
</script>

<style scoped>
    .change-box {
        background: #fff;
        padding-left: 24px;
    }
</style>