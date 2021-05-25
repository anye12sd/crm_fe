<!--产品信息详情-->
<template>
    <a-layout class="main-layout">
        <description-item :description="description" :descriptionColumn="descriptionColumn"
                          @descriptionItemCheckboxChange="descriptionItemCheckboxChange"></description-item>
        <div class="change-box">
            <a-button size="small" @click="edit()" style="margin-right: 6px">修改</a-button>
            <a-button size="small" @click="closeProd()" style="margin-right: 6px">停用</a-button>
<!--            <a-button size="small" v-if="description.isHis == 1" @click="openProd()" style="margin-right: 6px">启用</a-button>-->
            <a-button size="small" @click="changeUnit()" style="margin-right: 6px">更换分类</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs :usedTabs="usedTabs" :usedTabsColumns="tabsSelected"
                       @on-add="toAdd"
                       @on-callback="onCallback"
                       @on-click-btn="childBtnClicked"
                       @on-tabsSelect="tabsSelect"
                       @on-change-table="changeTablePagination"
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
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-modalTablePagination-change="modalTablePaginationChange" @modal-close="modalAddTableClose"></modal-add-table>
    </a-layout>
</template>

<script>
    import api from '@/api/product';
    import DescriptionItem from "../../components/DescriptionItem";
    import CategoryTabs from "../../components/tabsComponent/CategoryTabs";
    import ModalAddTable from "../../components/ModalAddTable";
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    let modalAddTableParams = {
        modalTitle: '产品分类选择',
        tableTitle: '分类列表',
        hasRowHeaderSelect: false,
        hideCancelBtn: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        type: '',
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
            total: 0,
            current: 1,
            page_size: 10
        },
    }
    let modalAddColumns = [
        {
            title: '分类编码',
            dataIndex: 'prodClassCode',
            key: 'prodClassCode'
        },
        {
            title: '产品分类',
            dataIndex: 'prodClassName',
            key: 'prodClassName'
        },
    ]
    const usedTabs = ['规格', '子产品', '价格变动', '升级销售产品', '供应商', '产品比较表', '相关知识', '附件', '销售机会', '相关任务', '相关反馈', '报价单', '询价单', '销售订单', '销售退货单', '销售订单账目', '采购订单', '采购退货单', '采购订单账目', '相关对象列表配置']
    const usedTabsColumns = {
        specsColumns: {
            name: '规格',
            show: true,
            columns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '规格',
                    dataIndex: 'specs',
                    key: 'specs'
                }
            ],
            buttons: ['delete', 'edit'],
            headerContent: ['add'],
        },
        childProductColumns: {
            name: '子产品',
            show: true,
            columns: [
                {
                    title: '产品分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name'
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
                    title: '场地费',
                    dataIndex: 'siteFee',
                    key: 'siteFee'
                },
                {
                    title: '组合产品',
                    dataIndex: 'mixProduct',
                    key: 'mixProduct'
                },
                {
                    title: '可采购',
                    dataIndex: 'purchasable',
                    key: 'purchasable'
                },
                {
                    title: '可销售',
                    dataIndex: 'salable',
                    key: 'salable'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '单位成本',
                    dataIndex: 'unitcost',
                    key: 'unitcost'
                },
                {
                    title: '采购参考价',
                    dataIndex: 'purchasePrice',
                    key: 'purchasePrice'
                },
                {
                    title: '消费周期（天）',
                    dataIndex: 'saleCycle',
                    key: 'saleCycle'
                },
                {
                    title: '序列号管理',
                    dataIndex: 'serialNumber',
                    key: 'serialNumber'
                },
                {
                    title: '当前库存',
                    dataIndex: 'stock',
                    key: 'stock'
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
                    title: '图文链接',
                    dataIndex: 'link',
                    key: 'link'
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '描述',
                    dataIndex: 'description2',
                    key: 'description2'
                }
            ],
            operateBtnFixed: true,
            buttons: ['delete', 'edit'],
            headerContent: ['add']
        },
        priceChangeColumns: {
            name: '价格变动',
            show: true,
            columns: [
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '调整后定价',
                    dataIndex: 'changedPrice',
                    key: 'changedPrice'
                },
                {
                    title: '原定价',
                    dataIndex: 'originPrice',
                    key: 'originPrice'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
        },
        upgradeProductColumns: {
            name: '升级销售产品',
            show: true,
            columns: [
                {
                    title: '产品分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '产品编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '产品助记符',
                    dataIndex: 'mnemonic',
                    key: 'mnemonic'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name'
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
                    title: '场地费',
                    dataIndex: 'siteFee',
                    key: 'siteFee'
                },
                {
                    title: '组合产品',
                    dataIndex: 'mixProduct',
                    key: 'mixProduct'
                },
                {
                    title: '可采购',
                    dataIndex: 'purchasable',
                    key: 'purchasable'
                },
                {
                    title: '可销售',
                    dataIndex: 'salable',
                    key: 'salable'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '单位成本',
                    dataIndex: 'unitcost',
                    key: 'unitcost'
                },
                {
                    title: '采购参考价',
                    dataIndex: 'purchasePrice',
                    key: 'purchasePrice'
                },
                {
                    title: '消费周期（天）',
                    dataIndex: 'saleCycle',
                    key: 'saleCycle'
                },
                {
                    title: '序列号管理',
                    dataIndex: 'serialNumber',
                    key: 'serialNumber'
                },
                {
                    title: '当前库存',
                    dataIndex: 'stock',
                    key: 'stock'
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
                    title: '图文链接',
                    dataIndex: 'link',
                    key: 'link'
                }
            ],
            headerContent: ['add'],
            buttons: ['delete']
        },
        supplierColumns: {
            name: '供应商',
            show: true,
            columns: [
                {
                    title: '编号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '供应商名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '供应商助记符',
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
                    dataIndex: 'mobile',
                    key: 'mobile'
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
            headerContent: ['add'],
            buttons: ['delete', 'view']
        },
        productCompareColumns: {
            name: '产品比较表',
            show: true,
            columns: [
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: '比较表名',
                    dataIndex: 'compareTableName',
                    key: 'compareTableName'
                },
                {
                    title: '对合作伙伴公开',
                    dataIndex: 'openToCooperator',
                    key: 'openToCooperator'
                },
                {
                    title: '对客户公开',
                    dataIndex: 'openToCustomer',
                    key: 'openToCustomer'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                }
            ],
            buttons: ['view']
        },
        knowledgeColumns: {
            name: '相关知识',
            show: true,
            columns: [
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '知识分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                }
            ],
            buttons: ['view']
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
            headerContent: ['add'],
            buttons: ['delete']
        },
        saleChanceColumns: {
            name: '销售机会',
            show: true,
            columns: [
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
                    dataIndex: 'departmentName',
                    key: 'departmentName'
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                }
            ],
            buttons: ['view']
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
                    key: 'theme',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '任务对象',
                    dataIndex: 'missionObject',
                    key: 'missionObject',
                    scopedSlots: {customRender: 'link2'}
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
        },
        feedBackColumns: {
            name: '相关反馈',
            show: true,
            columns: [
                {
                    title: '解决时间',
                    dataIndex: 'dealTime',
                    key: 'dealTime'
                },
                {
                    title: '重要性',
                    dataIndex: 'important',
                    key: 'important'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '反馈分类',
                    dataIndex: 'feedbackCategory',
                    key: 'feedbackCategory'
                },
                {
                    title: '主题',
                    dataIndex: 'theme',
                    key: 'theme',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '反馈者名称',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '负责员工',
                    dataIndex: 'employee',
                    key: 'employee'
                },
            ],
            buttons: ['view'],
        },
        proposalColumns: {
            name: '报价单',
            show: true,
            columns: [
                {
                    title: '报价日期',
                    dataIndex: 'createTime',
                    key: 'createTime'
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
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
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
            buttons: ['view']
        },
        enquirySheetColumns: {
            name: '询价单',
            show: true,
            columns: [
                {
                    title: '询价单分类',
                    dataIndex: 'category',
                    key: 'category'
                },
                {
                    title: '询价单号',
                    dataIndex: 'sheet',
                    key: 'sheet'
                },
                {
                    title: '询价日期',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '员工姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '创建人',
                    dataIndex: 'creator',
                    key: 'creator'
                }
            ],
            buttons: ['view']
        },
        orderListColumns: {
            name: '销售订单',
            show: true,
            columns: [
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code',
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '订单日期',
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
                    key: 'departmentName',
                },
                {
                    title: '员工姓名',
                    dataIndex: 'employee',
                    key: 'employee'
                },
                {
                    title: '订单金额',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName'
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
            buttons: ['view'],
        },
        returnNoteColumns: {
            name: '销售退货单',
            show: true,
            columns: [
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '退货单号',
                    dataIndex: 'code',
                    key: 'code',
                    scopedSlots: {customRender: 'link'}
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
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName',
                    scopedSlots: {customRender: 'link'}
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
            buttons: ['view']
        },
        orderListAccountColumns: {
            name: '销售订单账目',
            show: true,
            columns: [
                {
                    title: '订单日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '订单编号',
                    dataIndex: 'code',
                    key: 'code',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '订单摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '客户名',
                    dataIndex: 'customerName',
                    key: 'customerName',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '伙伴名',
                    dataIndex: 'partnerName',
                    key: 'partnerName'
                },
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    key: 'productName',
                    scopedSlots: {customRender: 'link'}
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '成交价',
                    dataIndex: 'dealPrice',
                    key: 'dealPrice'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                }
            ],
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
            buttons: ['view']
        },
        supplierReturnNoteColumns: {
            name: '采购退货单',
            show: true,
            columns: [
                {
                    title: '采购日期 ',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '采购退货单号',
                    dataIndex: 'code',
                    key: 'code'
                },
                {
                    title: '采购摘要',
                    dataIndex: 'summary',
                    key: 'summary'
                },
                {
                    title: '退货总额',
                    dataIndex: 'returnNoteAmount',
                    key: 'returnNoteAmount'
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
            buttons: ['view']
        },
        purchaseListAccountColumns: {
            name: '采购订单账目',
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
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName'
                },
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    key: 'productName'
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '采购价',
                    dataIndex: 'purchasePrice',
                    key: 'purchasePrice'
                },
                {
                    title: '金额',
                    dataIndex: 'price',
                    key: 'price'
                }
            ]
        }
    }
    const description =  //对象
        {
            "productMnemonic": "",
            "productCode": "",
            "productName": "",
            "status": "",
            "productCategory": "",
            "productPrice": "",
            "productCost": "",
            "checkbox": ['可采购', '可销售', '序列号管理'],
            "unit": "",
            "purchaseReferencePrice": "",
            "consumptionCycle": "",
            "compose": "",
            "taxRate": "",
            "changeTime": "",
            "changer": "",
            "percentageCost": "",
            "description": "",
            "remark": ""
        }
    const descriptionColumn = // 对象按顺序排列的数组
        [
            { name: "productCode", span: 1 },
            { name: "productMnemonic", span: 1 },
            { name: "status", span: 1 },
            { name: "productName", span: 2},
            { name: "productCategory", span: 1},
            { name: "productPrice", span: 1},
            { name: "productCost", span: 1},
            { name: "checkbox", span: 1},
            { name: "unit", span: 1},
            {name: "purchaseReferencePrice", span: 1},
            {name: "consumptionCycle", span: 1},
            {name: "compose", span: 1},
            {name: "taxRate", span: 1},
            {name: "percentageCost", span: 1},
            {name: "description", span: 2},
            {name: "changeTime", span: 2},
            {name: "remark", span: 2},
            {name: "changer", span: 2},
        ]


    export default {
        name: "ProductInfoDetail",
        components: {TabsSelectDrawer, ModalAddTable, CategoryTabs, DescriptionItem},
        data() {
            return {
                modalAddTableParams,
                modalAddColumns,
                modalAddData: [],
                description,
                pane: null,
                descriptionColumn,
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
                checkedAAAAA: ['specsColumns', 'upgradeProductColumns', 'annexColumns', 'productCompareColumns', 'feedBackColumns'],
                // tabs选择参数结束
            }
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
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
                api.getProductDetail(this.$route.query.code).then((res) => {
                    console.log(res)
                    if(res.code == 0){
                        let data = res.data
                        this.description = {
                            "productMnemonic": data.prodSimpleCode,
                            "productCode": data.prodCode,
                            "productName": data.prodName,
                            "status": "",
                            "productCategory": data.prodClassName,
                            "productPrice": data.prodListPrice,
                            "productCost": "",
                            "checkbox": ['可采购', '可销售', '序列号管理'],
                            "unit": data.unitName,
                            "purchaseReferencePrice": "",
                            "consumptionCycle": "",
                            "compose": "",
                            "taxRate": data.taxRatio,
                            "changeTime": "",
                            "changer": "",
                            "percentageCost": "",
                            "description": "",
                            "remark": ""
                        };
                    }
                })
            },
            toAdd(){

            },
            changeTablePagination(val){
                this.modalAddTableParams.pagination = val
                if(this.pane == '相关反馈'){
                    this.getRelatedFdbk()
                }
            },
            onCallback(key){
                this.pane = key
                if(key == '相关反馈'){
                    this.getRelatedFdbk()
                }
            },
            descriptionItemCheckboxChange(value) {
                console.log(value)
            },
            modalTablePaginationChange(val){
                this.modalAddTableParams.pagination = val
                if(this.type == '更换分类'){
                    this.getProdClassList()
                    return -1
                }
            },
            getRelatedFdbk(){
                console.log('相关反馈')
            },
            changeUnit(){
                this.type = '更换分类'
                this.modalAddTableParams.pagination.current = 1
                this.modalAddColumns = [
                    {
                        title: '分类编码',
                        dataIndex: 'prodClassCode',
                        key: 'prodClassCode'
                    },
                    {
                        title: '产品分类',
                        dataIndex: 'prodClassName',
                        key: 'prodClassName'
                    },
                ]
                this.modalAddTableParams.modalTitle = '产品分类选择'
                this.modalAddTableParams.tableTitle = '产品分类列表'
                this.modalAddTableParams.isCheckbox = false
                this.modalAddTableParams.hasRowHeaderSelect = true
                this.$refs.tableAdd.open();
                this.getProdClassList()
            },
            getProdClassList(){
                this.modalAddTableParams.loading = true;
                api
                    .getProductClassList( {page: this.modalAddTableParams.pagination.current} )
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = { ...this.modalAddTableParams.pagination };
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows;
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            childBtnClicked(type, text, record, index) {

            },
            modalAddTableClose(){
                this.type = ''
            },
            tableSelectedHandle(val){
                if (!val.length) {
                    return -1
                }
                console.log(val)
            },
            edit(){
                this.$router.push({path: '/resource_center/product_add', query: {editMode: 1, code: this.$route.query.code}})
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