<!--客户信息-->
<template>
    <a-layout class="main-layout">
        <description-item
                :inputs="inputs"
                :checked="checked"
                :descriptionEdit="descriptionEdit"
                :description="description"
                :descriptionColumn="descriptionColumn"
                :editButtons="editButtons"
                :titleButtons="titleButtons"
                :cateNames="cateNames"
                :rcnzWays="rcnzWays"
                :payments="payments"
                :identWays="identWays"
                @on-addnew="onAddnew"
                @changeAccount="changeAccount"
                @showSearch="showSearch"
                @empty="empty"
                @clientSearch="clientSearch"
                @cateNameChange="cateNameChange"
                @rcnzWayChange="rcnzWayChange"
                @paymentChange="paymentChange"
                @identWayChange="identWayChange"
        >
        </description-item>
        <div class="change-box">
            <a-button size="small" @click="onEdit" style="margin-right: 6px">修改</a-button>
            <a-button size="small" @click="stopCustomer" style="margin-right: 6px">停用</a-button>
            <a-button size="small" @click="startCustomer" style="margin-right: 6px">启用</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                :specialColumns="specialColumns"
                @on-add="toAdd"
                @on-callback="onCallback"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
                @on-display="tableColumnsDisplay"
                v-if="descriptionEdit ? false : true"
        ></category-tabs>
        <contact-info
                :form="form"
                :superiorData="superiorData"
                @on-sex="onSex"
                @on-group="onGroup"
                @on-birday="onBirday"
                @on-confirm="onConfirm"
                @on-superior="onSuperior"
                ref="contact"
        ></contact-info>
        <tabs-select-drawer
                :visibleConfig="tabsVisibleConfig"
                :childrenDrawerProps="tabsChildrenDrawer"
                :columns="originColumns"
                :checkedListProps="tabsCheckedList"
                @postShow="tabsPostShow"
                @hideDrawer="tabsHideList"
        >
        </tabs-select-drawer>
        <table-column-select-drawer
                :visibleConfig="tableVisibleConfig"
                :childrenDrawerProps="tableChildrenDrawer"
                :columns="paneOriginColumns"
                :checkedListProps="checkedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </table-column-select-drawer>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle"></modal-add-table>
    </a-layout>
</template>

<script>
    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
    import ContactInfo from '../../components/drawers/Contactinfo';

    let modalAddTableParams = {
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
    let modalAddColumns = [
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
            title: '移动电话',
            dataIndex: 'empMobilePhone',
            key: 'empMobilePhone'
        },
        {
            title: '办公电话',
            dataIndex: 'empOfficePhone',
            key: 'empOfficePhone'
        },
        {
            title: '电子邮件',
            dataIndex: 'empEmail',
            key: 'empEmail'
        },
    ]
    const usedTabs = [
        '联系人',
        '账户列表',
        '相关员工',
        '负责员工',
        '负责员工变动',
        '负责部门',
        '相关伙伴',
        '积分明细',
        '竞争订单',
        '已购产品',
        '感兴趣产品',
        '销售机会',
        '报价单',
        '销售订单',
        '销售退货单',
        '市场调查',
        '服务调查',
        '参与的市场活动',
        '相关反馈',
        '相关任务',
        '工作记录',
        '工作日程',
        '待办事宜',
        '价值变动',
        '已收邮件',
        '已发邮件',
        '附件'
    ];
    const usedTabsColumns = {
        'contactListColumns': {
            name: '联系人',
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'contactDept',
                    key: 'contactDept'
                },
                {
                    title: '地址',
                    dataIndex: 'contactPosition',
                    key: 'contactPosition'
                },
                {
                    title: '移动电话',
                    dataIndex: 'contactMobilePhone',
                    key: 'contactMobilePhone'
                }
            ],
            specsData: [],
            buttons: ['delete'],
            operateBtnFixed: true,
            headerContent: ['add']
        },
        'accountListColumns': {
            name: '账户列表',
            columns: [
                {
                    title: '账户编码',
                    dataIndex: 'faccCode',
                    key: 'faccCode'
                },
                {
                    title: '账户名称',
                    dataIndex: 'faccName',
                    key: 'faccName'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'faccEmail',
                    key: 'faccEmail'
                },
                {
                    title: '电话',
                    dataIndex: 'faccEmail',
                    key: 'faccEmail'
                },
                {
                    title: '详细地址',
                    dataIndex: 'faccAddress',
                    key: 'faccAddress'
                },
                {
                    title: '账户余额',
                    dataIndex: 'creditLimit',
                    key: 'creditLimit'
                }
            ],
            specsData: [],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'relatedEmployeeColumns': {
            name: '相关员工',
            columns: [
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
                    title: '部门姓名',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '地址',
                    dataIndex: 'empPosition',
                    key: 'empPosition'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                }
            ],
            specsData: [],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        'dutyMemberColumns': {
            name: '负责员工',
            columns: [
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
                    title: '部门姓名',
                    dataIndex: 'deptName',
                    key: 'deptName'
                },
                {
                    title: '地址',
                    dataIndex: 'empPosition',
                    key: 'empPosition'
                },
                {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName'
                }
            ],
            specsData: [],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        'dutyMemberChangeColumns': {
            name: '负责员工变动',
            columns: [
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
                    title: '客户/伙伴名称',
                    dataIndex: 'friendName',
                    key: 'friendName'
                },
                {
                    title: '助记符',
                    dataIndex: 'empSimpleCode',
                    key: 'empSimpleCode'
                },
                {
                    title: '分配时间',
                    dataIndex: 'assignDate',
                    key: 'assignDate'
                },
                {
                    title: '收回时间',
                    dataIndex: 'removeDate',
                    key: 'removeDate'
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
                }
            ],
            specsData: [],
            operateBtnFixed: true
        },
        'dutyDepartmentListColumns': {
            name: '负责部门',
            columns: [
                {
                    title: '部门编码',
                    dataIndex: 'deptCode',
                    key: 'deptCode'
                },
                {
                    title: '部门名称',
                    dataIndex: 'deptName',
                    key: 'deptName',
                    scopedSlots: {customRender: 'link'}
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
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view', 'delete']
        },
        'relatedPartnerColumns': {
            name: '相关伙伴',
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
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '电话',
                    dataIndex: 'cellphone',
                    key: 'cellphone'
                },
                {
                    title: '详细地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '网站主页',
                    dataIndex: 'website',
                    key: 'website'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete', 'view']
        },
        'integralDetailColumns': {
            name: '积分明细',
            columns: [
                {
                    title: '客户名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '账户名称',
                    dataIndex: 'nickname',
                    key: 'nickname'
                },
                {
                    title: '积分数量',
                    dataIndex: 'integralAmount',
                    key: 'integralAmount'
                },
                {
                    title: '积分来源',
                    dataIndex: 'integralOrigin',
                    key: 'integralOrigin'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code'
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
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add', 'displaylist']
        },
        'competitorListColumns': {
            name: '竞争订单',
            columns: [
                {
                    title: '订单日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '竞争对手名称',
                    dataIndex: 'competitorName',
                    key: 'competitorName'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
                },
                {
                    title: '订单金额',
                    dataIndex: 'orderAmount',
                    key: 'orderAmount'
                },
                {
                    title: '单据摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        'purchasedProductColumns': {
            name: '已购产品',
            columns: [
                {
                    title: '单据分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '产品编码',
                    dataIndex: 'productCode',
                    key: 'productCode'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品分类',
                    dataIndex: 'productCategory',
                    key: 'productCategory'
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit'
                },
                {
                    title: '定价',
                    dataIndex: 'price',
                    key: 'price'
                }
            ],
            operateBtnFixed: true
        },
        'interestedProductColumns': {
            name: '感兴趣产品',
            columns: [
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    key: 'productName'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '计量单位',
                    dataIndex: 'unit',
                    key: 'unit'
                },
                {
                    title: '定价',
                    dataIndex: 'price',
                    key: 'price'
                }
            ],
            operateBtnFixed: true
        },
        'saleChanceColumns': {
            name: '销售机会',
            columns: [
                {
                    title: '来源类型',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
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
                    dataIndex: 'dutyMember',
                    key: 'dutyMember'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'proposalColumns': {
            name: '报价单',
            columns: [
                {
                    title: '报价日期',
                    dataIndex: 'proposalTime',
                    key: 'proposalTime'
                },
                {
                    title: '报价单号',
                    dataIndex: 'sheet',
                    key: 'sheet'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '报价摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'department',
                    key: 'department'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'orderListColumns': {
            name: '销售订单',
            columns: [
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employeeName',
                    key: 'employeeName'
                },
                {
                    title: '订单金额',
                    dataIndex: 'orderAmount',
                    key: 'orderAmount'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '活动名称',
                    dataIndex: 'activityName',
                    key: 'activityName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'returnNoteColumns': {
            name: '销售退货单',
            columns: [
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '退货单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '退货金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        'marketResearchColumns': {
            name: '市场调查',
            columns: [
                {
                    title: '提交时间 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '总分',
                    dataIndex: 'allScore',
                    key: 'allScore'
                },
                {
                    title: '得分',
                    dataIndex: 'getScore',
                    key: 'getScore'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true
        },
        'serviceResearchColumns': {
            name: '服务调查',
            columns: [
                {
                    title: '提交时间 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
                },
                {
                    title: '总分',
                    dataIndex: 'allScore',
                    key: 'allScore'
                },
                {
                    title: '得分',
                    dataIndex: 'getScore',
                    key: 'getScore'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        'joinedActivityColumns': {
            name: '参与的市场活动',
            columns: [
                {
                    title: '开始日期',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '市场活动分类 ',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '活动代码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '活动名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '活动预算',
                    dataIndex: 'activityBudget',
                    key: 'activityBudget'
                },
                {
                    title: '活动费用',
                    dataIndex: 'activityFee',
                    key: 'activityFee'
                },
                {
                    title: '部门名称',
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        'feedBackColumns': {
            name: '相关反馈',
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
                    key: 'fdbkStatus.label'
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
                    width: '20%',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'fdbkSrcName',
                    key: 'fdbkSrcName'
                },
                {
                    title: '反馈对象名称',
                    dataIndex: 'fdbkTargetName',
                    key: 'fdbkTargetName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'fdbkMngrEmpName',
                    key: 'fdbkMngrEmpName'
                }
            ],
            specsData: [],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'relatedMissionColumns': {
            name: '相关任务',
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
                    key: 'theme',
                    width: '20%'
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
            buttons: ['view'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        'workRecordColumns': {
            name: '工作记录',
            columns: [
                {
                    title: '标志',
                    dataIndex: 'sign',
                    key: 'sign'
                },
                {
                    title: '工作记录分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                },
                {
                    title: '工作记录对象',
                    dataIndex: 'target',
                    key: 'target',
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
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
                    title: '员工姓名',
                    dataIndex: 'empName',
                    key: 'empName'
                },
                {
                    title: '任务主题',
                    dataIndex: 'missionTheme',
                    key: 'missionTheme'
                },
                {
                    title: '发生费用',
                    dataIndex: 'occurFee',
                    key: 'occurFee'
                },
                {
                    title: '批准费用',
                    dataIndex: 'approveFee',
                    key: 'approveFee'
                },
                {
                    title: '是否锁定',
                    dataIndex: 'isLocked',
                    key: 'isLocked'
                },
                {
                    title: '锁定员工',
                    dataIndex: 'lockEmp',
                    key: 'lockEmp'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add', 'displaylist'],
            buttons: ['view']
        },
        'scheduleColumns': {
            name: '工作日程',
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
                    width: '20%'
                },
                {
                    title: '地点',
                    dataIndex: 'place',
                    key: 'place'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'todoListColumns': {
            name: '待办事宜',
            columns: [
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '完成期限',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '20%'
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
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        'valueChangeColumns': {
            name: '价值变动',
            columns: [
                {
                    title: '更新属性',
                    dataIndex: 'updateProperty',
                    key: 'updateProperty'
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
                    title: '修改人',
                    dataIndex: 'changer',
                    key: 'changer'
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime'
                }
            ],
            operateBtnFixed: true
        },
        'mailReceivedColumns': {
            name: '已收邮件',
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
        'mailSentColumns': {
            name: '已发邮件',
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
        'annexColumns': {
            name: '附件',
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
    const superiorData = [];
    const description = {
        //对象
        customerCode: '34545',
        friendSimpleCode: '234',
        customerName: '534',
        categoryName: '上到给的发',
        superiorDepartment: '阿斯顿',
        lastContactTime: '阿斯蒂芬',
        addressDetail: '',
        postcode: '',
        phone: '',
        fax: '',
        email: '',
        nation: '',
        mobilePhone: '',
        website: '',
        province: '',
        creator: '',
        createTime: '',
        city: '',
        changer: '',
        changeTime: '',
        reactivity: '',
        paymentCredit: '',
        valueScales: '',
        industry: '',
        marketMode: '',
        clientSource: '',
        recognizeWay: '',
        wechat: '',
        identificationWay: '',
        remark: ''
    };

    import qs from 'qs';
    import api from '@/api/friend';
    import ModalAddTable from "../../components/ModalAddTable";
    import member from '@/api/member'
    import frnd from '@/api/frnd'
    import dept from '@/api/department'
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";
    import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";

    export default {
        name: 'CustomerInfoDetail',
        components: {
            TableColumnSelectDrawer,
            TabsSelectDrawer, ModalAddTable, CategoryTabs, DescriptionItem, ContactInfo},
        data() {
            return {
                form: {},
                modalAddTableParams,
                modalAddColumns,
                modalAddData: [],
                pane: null,
                paneEnglish: '',
                memberFlag: 0,
                inputs: {},
                superiorData,
                checked: true,
                description,
                descriptionEdit: false,
                btnLoading: false,
                descriptionColumn: [
                    {name: 'customerCode', span: 2},
                    {name: 'friendSimpleCode', span: 1},
                    {name: 'customerName', span: 2},
                    {name: 'categoryName', span: 1},
                    {name: 'superiorDepartment', span: 2},
                    {name: 'lastContactTime', span: 1},
                    {name: 'addressDetail', span: 3},
                    {name: 'postcode', span: 1},
                    {name: 'phone', span: 2},
                    {name: 'fax', span: 1},
                    {name: 'email', span: 2},
                    {name: 'nation', span: 1},
                    {name: 'mobilePhone', span: 1},
                    {name: 'website', span: 1},
                    {name: 'province', span: 1},
                    {name: 'creator', span: 1},
                    {name: 'createTime', span: 1},
                    {name: 'city', span: 1},
                    {name: 'changer', span: 1},
                    {name: 'changeTime', span: 1},
                    {name: 'reactivity', span: 1},
                    {name: 'paymentCredit', span: 1},
                    {name: 'valueScales', span: 1},
                    {name: 'industry', span: 1},
                    {name: 'marketMode', span: 1},
                    {name: 'clientSource', span: 1},
                    {name: 'recognizeWay', span: 1},
                    {name: 'wechat', span: 1},
                    {name: 'identificationWay', span: 1},
                    {name: 'remark', span: 3}
                ],
                // 分类名称
                cateNames: [
                    {id: 0, title: '钻石客户'},
                    {id: 1, title: '金牌客户'},
                    {id: 2, title: '银牌客户'},
                    {id: 3, title: '铜牌客户'},
                    {id: 4, title: '流失客户'},
                    {id: 5, title: '大客户'}
                ],
                // 识别方式
                rcnzWays: [
                    {id: 0, title: '身份证'},
                    {id: 1, title: '营业执照'}
                ],
                // 付款信用
                payments: [
                    {id: 0, title: '爽快'},
                    {id: 1, title: '普通'},
                    {id: 2, title: '尚可'},
                    {id: 3, title: '延迟'},
                    {id: 4, title: '为难'}
                ],
                // 认证方式
                identWays: [
                    {id: 0, title: '实地认证'},
                    {id: 1, title: '网络认证'}
                ],
                editButtons: ['save', 'reset', 'quit'],
                titleButtons: ['add', 'mod', 'del'],
                // 对象按顺序排列的数组
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
                // tabs选择参数
                tabsVisibleConfig: false,
                tabsChildrenDrawer: false,
                //checkboxgroup里需要默认选中的项
                checkedList: [],
                tabsCheckedList: [],
                tableVisibleConfig: false,
                tableChildrenDrawer: false,
                paneColumns: [],
                originColumns: [],
                paneOriginColumns: [],
                specialColumns: [],
                columns: [],
                loading: false,
                tabsSelected: {},
                checkedAAAAA: ['workRecordColumns', 'accountListColumns', 'dutyMemberChangeColumns', 'dutyMemberColumns', 'returnNoteColumns', 'serviceResearchColumns',],
                tableColumnsChecked: ['startTime'],
                // tabs选择参数结束
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        created() {
            this.getParams();
            this.getShowList();
            this.getOriginColumns()
        },
        mounted() {
            this.getPane()
            this.description.friendClassId = parseInt(this.$route.query.code)
            this.getConnecterList()
        },
        methods: {
            getParams() {
                api.getFriendDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if (res.code == 0) {
                        let data = res.data
                        this.description = {
                            //对象
                            customerCode: data.friendCode.replace(",", '-'),
                            friendSimpleCode: data.friendSimpleCode,
                            customerName: data.friendName,
                            categoryName: '上到给的发',
                            superiorDepartment: '阿斯顿',
                            lastContactTime: '阿斯蒂芬',
                            addressDetail: data.friendAddress,
                            postcode: data.friendZipCode,
                            phone: data.friendPhone,
                            fax: data.friendFax,
                            email: data.friendEmail,
                            nation: '',
                            mobilePhone: data.friendMobilePhone,
                            website: '',
                            province: data.friendProvince,
                            creator: '',
                            createTime: '',
                            city: '',
                            changer: '',
                            changeTime: '',
                            reactivity: '',
                            paymentCredit: '',
                            valueScales: '',
                            industry: '',
                            marketMode: '',
                            clientSource: '',
                            recognizeWay: '',
                            wechat: '',
                            identificationWay: '',
                            remark: ''
                        };
                    }
                })
            },
            getPane(){
                const name = this.checkedAAAAA[0]
                for(let obj in this.usedTabsColumns){
                    if(obj == name){
                        this.paneEnglish = obj
                        this.pane = this.usedTabsColumns[obj].name
                        this.paneOriginColumns = this.usedTabsColumns[obj].columns
                        this.getTableShowList()
                        break
                    }
                }
            },
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
            // 客户编码
            clientSearch() {
                this.description.customerCode = this.inputs.value1 + ',' + this.inputs.value2;
                console.log(this.description.customerCode);
                this.$message.warning('编码输入信息不全，只能匹配其中一段!');
            },
            // 客户名
            changeAccount(e) {
                console.log(e.target.checked);
                this.checked = e.target.checked;
            },
            // 上级单位选择
            showSearch() {
            },
            // 上级单位清空
            empty() {
            },
            // 分类选择
            cateNameChange(value) {
                this.description.friendClassId = value;
                this.description.categoryName = this.cateNames[value].title;
            },
            // 识别方式
            rcnzWayChange(value) {
                this.description.friendRecognitionId = value;
                this.description.recognizeWay = this.rcnzWays[value].title;
            },
            // 付款信用
            paymentChange(value) {
                this.description.friendPaymentId = value;
                this.description.paymentCredit = this.payments[value].title;
            },
            identWayChange(value) {
                this.description.friendIdentId = value;
                this.description.identificationWay = this.identWays[value].title;
            },
            onCallback(value) {
                this.pagination.current = 1
                this.pane = value;
                if (this.pane == '相关员工') {
                    this.getRelatedMember(0)
                    this.memberFlag = 0
                } else if (this.pane == '负责员工') {
                    this.getRelatedMember(1)
                    this.memberFlag = 1
                } else if (this.pane == '参与的市场活动') {
                    this.getActivityList()
                } else if (this.pane == '相关联系人') {
                    this.getConnecterList()
                } else if (this.pane == '负责部门') {
                    this.getRelatedDeptList()
                } else if (this.pane == '负责员工变动') {
                    this.getChangedMemberList()
                } else if (this.pane == '账户列表') {
                    this.getRelatedAccountList()
                } else if (this.pane == '相关反馈') {
                    this.getRelatedFdbkList()
                } else if (this.pane == '工作记录') {
                    this.getRelatedRecordList()
                }
            },
            getRelatedMember(flag) {
                let params = {friendId: parseInt(this.$route.query.code), page: this.pagination.current, isSelf: flag}
                console.log(params)
                frnd.getMember(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        if (flag == 0) {
                            this.usedTabsColumns.relatedEmployeeColumns.specsData = res.data.rows
                        } else if (flag == 1) {
                            this.usedTabsColumns.dutyMemberColumns.specsData = res.data.rows
                        }
                    }
                })
            },
            getActivityList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getActivityList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.joinedActivityColumns.specsData = res.data.rows
                    }
                })
            },
            getConnecterList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getRelatedConnectList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.contactListColumns.specsData = res.data.rows
                    }
                })
            },
            getRelatedDeptList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getRelatedDeptList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.dutyDepartmentListColumns.specsData = res.data.rows
                        this.usedTabsColumns.dutyDepartmentListColumns.specsData.map((item) => {
                            item.link = '/resource_center/department_info_detail?name=' + item.deptName
                        })
                    }
                })
            },
            getChangedMemberList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getChangeMember(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.dutyMemberChangeColumns.specsData = res.data.rows
                    }
                })
            },
            getRelatedAccountList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getRelatedAccountList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.accountListColumns.specsData = res.data.rows
                    }
                })
            },
            getRelatedFdbkList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getRelatedFdbkList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.feedBackColumns.specsData = res.data.rows
                        this.usedTabsColumns.feedBackColumns.specsData.map((item) => {
                            item.fdbkDueDate = item.fdbkDueDate ? new Date(+new Date(item.fdbkDueDate) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                                : "";
                            item.link = '/service_management/fdbk_info_detail?code=' + item.fdbkId
                        })
                    }
                })
            },
            getRelatedRecordList() {
                let params = {page: this.pagination.current, friendId: this.$route.query.code}
                console.log(params)
                frnd.getRelatedRecordList(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        const pagination = {...this.pagination}
                        pagination.total = res.data.count
                        this.pagination = pagination;
                        this.usedTabsColumns.workRecordColumns.specsData = res.data.rows
                    }
                })
            },
            onAddnew() {
                this.$router.push({path: '/client_center/customer_info_detail', query: {add: 1}});
                this.description.customerCode = '';
                this.description.categoryName = '';
                this.description.customerName = '';
            },
            toAdd() {
                if (this.pane === 0 || this.pane === null) {
                    this.$refs.contact.open();
                } else if (this.pane === 1) {
                    this.$router.push({path: '/client_center/account_info_list'});
                } else if (this.pane == "相关员工") {
                    this.getMemberList()
                } else if (this.pane == "负责员工") {
                    this.getMemberList()
                } else if (this.pane === "负责部门") {
                    this.getDeptList()
                }
            },
            getMemberList() {
                this.$refs.tableAdd.open()
                this.modalAddTableParams.loading = true;
                let params = {page: this.modalAddTableParams.pagination.current}
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '员工选择',
                    tableTitle: '员工列表',
                }
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
                        title: '移动电话',
                        dataIndex: 'empMobilePhone',
                        key: 'empMobilePhone'
                    },
                    {
                        title: '办公电话',
                        dataIndex: 'empOfficePhone',
                        key: 'empOfficePhone'
                    },
                    {
                        title: '电子邮件',
                        dataIndex: 'empEmail',
                        key: 'empEmail'
                    },
                ]
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
                this.modalAddTableParams = {
                    ...this.modalAddTableParams,
                    modalTitle: '部门选择',
                    tableTitle: '部门列表',
                }
                this.modalAddColumns = [
                    {
                        title: '部门名称',
                        dataIndex: 'deptName',
                        key: 'deptName'
                    },
                ]
                dept.getDepartmentList(params).then((res) => {
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
            tableSelectedHandle(val) {
                if (!val.length) {
                    return -1
                }
                if (this.pane == "相关员工" || this.pane == "负责员工") {
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
                let params = {friendId: parseInt(this.$route.query.code), empId: empId, isSelf: this.memberFlag}
                frnd.postAddMember(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("添加成功")
                        if (this.pane == '相关员工') {
                            this.getRelatedMember(0)
                        } else if (this.pane == '负责员工') {
                            this.getRelatedMember(1)
                        }
                    }
                })
            },
            postAddDept(deptId) {
                let params = {friendId: parseInt(this.$route.query.code), deptId: deptId}
                frnd.postAddDept(params).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("添加成功")
                        this.getRelatedDeptList()
                    }
                })
            },
            childBtnClicked(type, text, record, index) {
                if (this.pane == '相关员工' || this.pane == '负责员工') {
                    if (type == 'delete') {
                        this.deleteRelatedMember(record.id)
                    }
                } else if (this.pane == '负责部门') {
                    if (type == 'view') {
                        this.$router.push({path: '/resource_center/department_info_detail?name=' + record.deptName})
                    } else if (type == 'delete') {
                        this.deleteRelatedDept(record.id)
                    }
                } else if (this.pane == '相关反馈') {
                    if (type == 'view') {
                        this.$router.push({path: '/service_management/fdbk_info_detail?code=' + record.fdbkId})
                    }
                }
            },
            deleteRelatedMember(empId) {
                frnd.delMember(empId).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        if (this.pane == '相关员工') {
                            this.getRelatedMember(0)
                        } else if (this.pane == '负责员工') {
                            this.getRelatedMember(1)
                        }
                    }
                })
            },
            deleteRelatedDept(deptId) {
                frnd.delDept(deptId).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("删除成功")
                        this.getRelatedDeptList()
                    }
                })
            },
            onGroup(e) {
                this.form.value = e;
            },
            onSex(e) {
                this.form.sex = e.target.value;
            },
            onBirday(data, dateString) {
                console.log(data, dateString);
                this.form.birthday = dateString;
            },
            onSuperior(e) {
                this.form.superior = e.target.value;
            },
            onConfirm() {
                if (this.form.contactName === '') {
                    this.$message.warning('联系人姓名不能为空！');
                } else {
                    console.log(this.form);
                    this.form = {};
                    this.$refs.contact.onContClose();
                }
            },
            onEdit() {
                this.$router.push({
                    path: '/client_center/client_add',
                    query: {'editMode': 1, code: this.$route.query.code}
                })
            },
            saveEdit() {
                const data = {
                    friendClassId: this.description.friendClassId,
                    friendName: this.description.customerName,
                    friendCode: this.description.customerCode,
                    friendSimpleCode: this.description.friendSimpleCode,
                    friendAddress: this.description.addressDetail,
                    friendZipCode: this.description.postcode,
                    friendPhone: this.description.phone,
                    friendFax: this.description.fax,
                    friendEmail: this.description.email,
                    friendCountry: this.description.nation,
                    friendProvince: this.description.province,
                    friendCity: this.description.city,
                    friendMobilePhone: this.description.mobilePhone,
                    friendHomePage: this.description.website,
                    friendMemo: this.description.remark
                };
                this.btnLoading = true
                console.log(data)
                api.putFriend(this.description.friendClassId, data).then((res) => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$message.success("修改成功")
                    }
                    this.btnLoading = false
                })
            },
            startCustomer() {

            },
            stopCustomer() {

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
            tabsHideList(){
                this.tabsVisibleConfig = false
            },
            tabsPostShow(val) {
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


            tableColumnsDisplay() {
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
                this.usedTabsColumns[this.paneEnglish].paneColumns = val
                this.loading = true
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getTableShowList(arr)
                    that.tableVisibleConfig = false
                    that.tableChildrenDrawer = false
                }, 500)
            },
            getTableShowList(arr ) {
                this.paneColumns = []
                let k = 0
                this.checkedList = arr || ['sign', 'startTime', 'endTime']
                // for (let i = 0; i < this.originColumns.length; i++) {
                //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                //         this.columns.push(this.originColumns[i]);
                //     }
                // }
                console.log(this.checkedList, this.paneOriginColumns)
                for (let i = 0; i < this.checkedList.length; i++) {
                    for (let j = k; j < this.paneOriginColumns.length; j++)
                        if (this.paneOriginColumns[j].dataIndex.includes(this.checkedList[i])) {
                            this.paneColumns.push(this.paneOriginColumns[j]);
                            [this.paneOriginColumns[k], this.paneOriginColumns[j]] = [this.paneOriginColumns[j], this.paneOriginColumns[k]]
                            k++
                            break
                            // this.originColumns.splice(j, 1)
                            // j--
                        }
                }
                this.usedTabsColumns[this.paneEnglish].paneColumns = this.paneColumns
                this.specialColumns = this.paneColumns
                console.log(this.usedTabsColumns)
                // this.originColumns = this.columns.concat(this.originColumns)
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