<!--订单信息详情-->
<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionColumn="descriptionColumn"
                :description-title="descriptionTitle"
        ></description-item>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                @on-display="toDisplay"
                @on-callback="onCallback"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
        ></category-tabs>
<!--        <a-drawer-->
<!--                class="hide-control-drawer"-->
<!--                title="我的显示"-->
<!--                width="35%"-->
<!--                placement="right"-->
<!--                :visible="visibleConfig"-->
<!--                @close="onClose"-->
<!--        >-->
<!--            <a-checkbox-->
<!--                    class="check-all-button"-->
<!--                    :indeterminate="indeterminate"-->
<!--                    :checked="checkAll"-->
<!--                    @change="onCheckAllChange"-->
<!--            >-->
<!--                全选-->
<!--            </a-checkbox>-->
<!--            <a-checkbox-group v-model="checkedList" @change="checkShowColumn">-->
<!--                <template v-for="item in originColumns">-->
<!--                    <div :key="item.key" class="checkbox-box">-->
<!--                        <a-checkbox :value="item.title">-->
<!--                            {{ item.title }}-->
<!--                        </a-checkbox>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </a-checkbox-group>-->
<!--            <a-drawer-->
<!--                    title="字段列表 "-->
<!--                    width="40%"-->
<!--                    :visible="childrenDrawer"-->
<!--                    @close="onChildrenDrawerClose"-->
<!--            >-->
<!--                <a-table-->
<!--                        :rowKey="originColumns.title"-->
<!--                        :loading="loading"-->
<!--                        :columns="columnsChildren"-->
<!--                        :data-source="originColumns"-->
<!--                        :pagination="false"-->
<!--                        :customRow="customRow"-->
<!--                >-->
<!--                    <template slot="index" slot-scope="text, record, index">-->
<!--                        {{ index + 1 }}-->
<!--                    </template>-->
<!--                    <template slot="actionChildren" slot-scope="text, record, index">-->
<!--                        <a-button-group>-->
<!--                            <a-tooltip title="上移">-->
<!--                                <a-button icon="arrow-up" size="small" @click="moveUp(index)"></a-button>-->
<!--                            </a-tooltip>-->
<!--                            <a-tooltip title="下移">-->
<!--                                <a-button icon="arrow-down" size="small" @click="moveDown(index)"></a-button>-->
<!--                            </a-tooltip>-->
<!--                            <a-tooltip title="移至最前">-->
<!--                                <a-button icon="vertical-align-top" size="small" @click="moveTop(index)"></a-button>-->
<!--                            </a-tooltip>-->
<!--                            <a-tooltip title="移至最后">-->
<!--                                <a-button-->
<!--                                        icon="vertical-align-bottom"-->
<!--                                        size="small"-->
<!--                                        @click="moveBottom(index)"-->
<!--                                ></a-button>-->
<!--                            </a-tooltip>-->
<!--                            &lt;!&ndash;                            <a-tooltip title="删除">&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <a-popconfirm&ndash;&gt;-->
<!--                            &lt;!&ndash;                                        title="删除当前数据？"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                        ok-text="确认并删除"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                        cancel-text="取消"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                        @confirm="showDel(text, record, index)"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                >&ndash;&gt;-->
<!--                            &lt;!&ndash;                                    <a-button icon="delete" size="small"></a-button>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                </a-popconfirm>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            </a-tooltip>&ndash;&gt;-->
<!--                        </a-button-group>-->
<!--                    </template>-->
<!--                </a-table>-->
<!--            </a-drawer>-->
<!--            <div-->
<!--                    :style="{-->
<!--          position: 'absolute',-->
<!--          bottom: 0,-->
<!--          width: '100%',-->
<!--          borderTop: '1px solid #e8e8e8',-->
<!--          padding: '10px 16px',-->
<!--          textAlign: 'left',-->
<!--          left: 0,-->
<!--          background: '#fff',-->
<!--          borderRadius: '0 0 4px 4px'-->
<!--        }"-->
<!--            >-->
<!--                <a-button style="margin-right: 8px" @click="showList"> 保存</a-button>-->
<!--                <a-button style="margin-right: 8px" @click="showOrderDrawer"> 显示顺序</a-button>-->
<!--                <a-button style="margin-right: 8px" @click="showListRestore"> 还原默认</a-button>-->
<!--                <a-button @click="hideList"> 取消</a-button>-->
<!--            </div>-->
<!--        </a-drawer>-->
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
    import api from '@/api/salesOrder';
    import DescriptionItem from '../../components/DescriptionItem';
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    const usedTabs = [
        '订单明细',
        '状态预期',
        '状态变迁',
        '执行计划',
        '执行过程',
        '收款过程',
        '销售出库',
        '相关员工',
        '日程',
        '待办事宜',
        '采购订单',
        '相关发票',
        '已收邮件',
        '已发邮件',
        '附件'
    ];
    const usedTabsColumns = {
        OrderDetailColumns: {
            name: '订单明细',
            show: true,
            columns: [
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '规格编号',
                    dataIndex: 'specsCode',
                    key: 'specsCode'
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
                },
                {
                    title: '成交价',
                    dataIndex: 'dealPrice',
                    key: 'dealPrice'
                },
                {
                    title: '扣率%',
                    dataIndex: 'rate',
                    key: 'rate'
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '金额',
                    dataIndex: 'moneyAmount',
                    key: 'moneyAmount'
                },
                {
                    title: '税率',
                    dataIndex: 'taxRate',
                    key: 'taxRate'
                },
                {
                    title: '税后净额',
                    dataIndex: 'moneyAfterRate',
                    key: 'moneyAfterRate'
                }
            ],
            buttons: ['view'],
            operateBtnFixed: true,
            headerContent: ['displaylist']
        },
        statusExpectColumns: {
            name: '状态预期',
            show: true,
            columns: [
                {
                    title: '计划日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '发生日期',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '有效比例%',
                    dataIndex: 'percent',
                    key: 'percent'
                },
                {
                    title: '有效金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '参与角色',
                    dataIndex: 'character',
                    key: 'character'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view']
        },
        statusChangeColumns: {
            name: '状态变迁',
            show: true,
            columns: [
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                }
            ],
            operateBtnFixed: true
        },
        planExecuteColumns: {
            name: '执行计划',
            show: true,
            columns: [
                {
                    title: '计划日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '计划收款金额',
                    dataIndex: 'planAmount',
                    key: 'planAmount'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        executeStepColumns: {
            name: '执行过程',
            show: true,
            columns: [
                {
                    title: '执行日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '动作',
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
                },
                {
                    title: '收款金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '执行人',
                    dataIndex: 'executor',
                    key: 'executor'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['view']
        },
        receiveMoneyStepColumns: {
            name: '收款过程',
            show: true,
            columns: [
                {
                    title: '支付日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '收付款编码',
                    dataIndex: 'code',
                    key: 'code',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '账户名称',
                    dataIndex: 'accountName',
                    key: 'accountName',
                    scopedSlots: {customRender: 'link2'}
                },
                {
                    title: '发生金额',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '业务员',
                    dataIndex: 'manager',
                    key: 'manager'
                }
            ],
            operateBtnFixed: true,
            headerContent: ['add'],
            buttons: ['delete']
        },
        outOfStockColumns: {
            name: '销售出库',
            show: true,
            columns: [
                {
                    title: '发生日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '单据编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '单据分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '仓库名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                },
                {
                    title: '审核人',
                    dataIndex: 'checker',
                    key: 'checker'
                }
            ],
            headerContent: ['add'],
            buttons: ['delete']
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
                    dataIndex: 'departmentName',
                    key: 'departmentName'
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
                },
                {
                    title: '订单执行角色',
                    dataIndex: 'executor',
                    key: 'executor'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
        scheduleColumns: {
            name: '日程',
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
                    title: '员工姓名',
                    dataIndex: 'MemberName',
                    key: 'MemberName'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    width: '40%',
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
                    title: '员工期限',
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
                    width: '40%',
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
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            operateBtnFixed: true,
            buttons: ['view'],
            headerContent: ['add']
        },
        purchaseListColumns: {
            name: '采购订单',
            show: true,
            columns: [
                {
                    title: '采购日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '采购订单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '采购摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '采购总额',
                    dataIndex: 'purchaseAmount',
                    key: 'purchaseAmount'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
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
            buttons: ['view'],
            headerContent: ['add']
        },
        relatedBillListColumns: {
            name: '相关发票',
            show: true,
            columns: [],
            headerContent: ['add'],
            buttons: ['delete']
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
                    width: '40%',
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
                    width: '40%',
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
            ]
        }
    };
    const description = //对象
        {
            orderCode: 'xf2010',
            orderDate: '2020-01-01',
            billCategory: '续费订单',
            customerName: '浙江有限公司',
            customerCode: '019-SLA-1103',
            orderStatus: '审核',
            formalInvoice: '正式发票',
            orderAmount: '350.00',
            paidAmount: '0.00',
            lockMember: '',
            employee: '刘',
            departmentName: '增值部',
            closeMember: '',
            isLocked: '',
            changer: '鱼',
            closeTime: '',
            orderSummary: '实业',
            domainName: 'cnxysy.com',
            remark: '这是备注',
        }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: 'orderCode', span: 1 },
            { name: 'orderDate', span: 1 },
            { name: 'billCategory', span: 1 },
            { name: 'paidPerson', span: 1 },
            { name: 'deliverTarget', span: 1 },
            { name: 'customerName', span: 2 },
            { name: 'customerCode', span: 1 },
            { name: 'orderStatus', span: 2 },
            { name: 'formalInvoice', span: 1 },
            { name: 'orderAmount', span: 1 },
            { name: 'paidAmount', span: 1 },
            { name: 'paidDeadline', span: 1 },
            { name: 'deliverDate', span: 1 },
            { name: 'planReceivedAmount', span: 1 },
            { name: 'exchangeRate', span: 1 },
            { name: 'number', span: 1 },
            { name: 'deliveredAmount', span: 1 },
            { name: 'undeliveredAmount', span: 1 },
            { name: 'currency', span: 1 },
            { name: 'lockMember', span: 1 },
            { name: 'lockTime', span: 1 },
            { name: 'employee', span: 1 },
            { name: 'departmentName', span: 1 },
            { name: 'closeMember', span: 1 },
            { name: 'isClosed', span: 1 },
            { name: 'isLocked', span: 1 },
            { name: 'changer', span: 1 },
            { name: 'creator', span: 1 },
            { name: 'createTime', span: 1 },
            { name: 'closeTime', span: 1 },
            { name: 'orderSummary', span: 3 },
            { name: 'domainName', span: 3 },
            { name: 'remark', span: 3 },
        ]

    export default {
        name: 'OrderInfoDetail',
        components: {TabsSelectDrawer, CategoryTabs, DescriptionItem},
        data() {
            return {
                descriptionTitle: '订单信息',
                description: description,
                descriptionColumn: descriptionColumn,
                usedTabs: usedTabs,
                currentKey: '',
                usedTabsColumnss: usedTabsColumns,
                visible: false,
                visibleConfig: false,
                checkedKeys: [],
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
                checkedAAAAA: ['OrderDetailColumns'],
                // tabs选择参数结束
            };
        },
        computed: {
            originUsedTabsColumns: function () {
                var obj = {};
                obj = JSON.parse(JSON.stringify(usedTabsColumns)); //解决深拷贝的问题
                return obj;
            },
            usedTabsColumns: function () {
                var obj = {};
                obj = JSON.parse(JSON.stringify(usedTabsColumns)); //解决深拷贝的问题
                return obj;
            }
        },
        mounted(){
            this.getShowList()
            this.getOriginColumns()
            let id = this.$route.query.id
            this.fetch(id)
        },
        methods: {
            fetch(id){
                api
                    .getSalesOrderDetail(id)
                    .then((res) => {
                        console.log(res);
                        const data = res.data
                        this.description = {
                            paidPerson: data.paidPerson,
                            orderCode: data.soCode,
                            orderDate: data.soDate,
                            billCategory: data.soClassName,
                            customerName: data.friendName,
                            customerCode: data.friendCode.replace(',', '-'),
                            paidDeadline: data.soPaymentDate,
                            deliverDate: data.soDeliveryDate,
                            orderStatus: data.soStatus,
                            deliveredAmount: data.soDeliveredVolume,
                            number: data.soVolume,
                            exchangeRate: data.exchangeRatio,
                            orderAmount: data.soAmount,
                            paidAmount: data.soPayedAmount,
                            planReceivedAmount: data.soArapAmount,
                            lockMember: data.lockEmpName,
                            lockTime: data.lockTime,
                            employee: data.empName,
                            departmentName: data.deptName,
                            closeMember: data.closeEmpName,
                            isClosed: data.isClosed ? "是" : "否",
                            creator: data.createEmpName,
                            createTime: data.createTime,
                            changeTime: data.modifyTime,
                            accountName: data.faccName,
                            isLocked: data.isLocked ? "是" : "否",
                            changer: data.modifyEmpName,
                            closeTime: data.soCloseDate,
                            orderSummary: data.soSubject,
                            remark: data.soMemo,
                            undeliveredAmount: data.soLeaveVolume,
                            currency: data.currencyName,
                            deliverTarget: data.invFriendType
                        }
                        // this.tableData = res.data.rows
                        // this.tableData.map(item => {item.link = '/SalesOrder/OrderInfoDetail?id='+item.soId})
                    })
                    .catch(() => {
                        this.loading = false;
                    });
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
            toDisplay(index) {
                this.currentKey = Object.keys(this.originUsedTabsColumns)[index];
                this.originColumns = this.originUsedTabsColumns[this.currentKey].columns;
                this.columns = this.usedTabsColumns[this.currentKey].columns;
                // 每次都必须初始化checkedListCache为[1]来确定有没有对显示内容进行操作，否则直接点完显示顺序后点击保存会报错
                this.checkedListCache = [1];
                this.checkedList = [];
                for (let i = 0; i < this.columns.length; i++) {
                    this.checkedList.push(this.columns[i].title);
                }
                this.visibleConfig = true;
                this.loading = true;
            },
            toSearch() {
                this.$refs.drawer.open();
            },
            toCollect() {
                this.$refs.add.open();
            },
            onClose() {
                this.visibleConfig = false;
                this.loading = false;
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            onCheckAllChange(e) {
                let checkList = [];
                for (let i = 0; i < this.originColumns.length; i++) {
                    checkList.push(this.originColumns[i].title);
                }
                Object.assign(this, {
                    checkedList: e.target.checked ? checkList : [],
                    checkedListCache: e.target.checked ? checkList : [],
                    indeterminate: false,
                    checkAll: e.target.checked
                });
            },
            checkShowColumn(checkedList) {
                // 现将checkedListCache保存起来,在点击取消的时候重置为空数组，点击保存则存到this.checkedList里
                this.checkedListCache = checkedList;
                this.indeterminate = !!checkedList.length && checkedList.length < this.originColumns.length;
                this.checkAll = checkedList.length === this.originColumns.length;
            },
            childBtnClicked(type, text, record, index, currentTabs) {
                if (Object.keys(usedTabsColumns)[currentTabs] == 'workRecordColumns' && type == 'view') {
                    this.$router.push({path: '/sales_management/sales_record_detail'});
                }
                if (Object.keys(usedTabsColumns)[currentTabs] == 'todoListColumns' && type == 'view') {
                    this.$router.push({path: '/TempDirectory/ToDoListDetail'});
                }
                // if(Object.keys(usedTabsColumns)[currentTabs] == 'orderListColumns' && type == 'view'){
                //     this.$router.push({path: '/TempDirectory/OrderInfoDetail'})
                // }
                // if(Object.keys(usedTabsColumns)[currentTabs] == 'orderListColumns' && type == 'view'){
                //     this.$router.push({path: '/TempDirectory/OrderInfoDetail'})
                // }
            },
            onCallback(value) {
                this.pagination.current = 1
                this.pane = value
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
</style>