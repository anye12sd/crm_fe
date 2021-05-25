<!--报价单详情-->
<template>
  <a-layout class="main-layout">
    <description-item
      :description="description"
      :descriptionColumn="descriptionColumn"
      :description-title="descriptionTitle"
    ></description-item>
    <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
  </a-layout>
</template>

<script>
import DescriptionItem from '../../components/DescriptionItem';
import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
const usedTabs = ['报价明细', '销售订单', '相关员工', '已收邮件', '已发邮件', '附件'];
const usedTabsColumns = {
  OfferDetailColumns: {
    name: '报价明细',
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
        title: '任务主题',
        dataIndex: 'theme',
        key: 'theme',
        width: '40%',
      },
      {
        title: '任务对象',
        dataIndex: 'target',
        key: 'target'
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
      }
    ],
    operateBtnFixed: true,
    buttons: ['delete'],
    headerContent: ['add']
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
        key: 'theme',
        width: '40%',
      },
      {
        title: '任务主题',
        dataIndex: 'missionTheme',
        key: 'missionTheme',
        width: '40%',
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
    buttons: ['view']
  },
  questionDiscussColumns: {
    name: '问题讨论',
    show: true,
    columns: [
      {
        title: '修改时间',
        dataIndex: 'startTime',
        key: 'startTime'
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: '发表员工',
        dataIndex: 'employee',
        key: 'employee'
      }
    ],
    operateBtnFixed: true,
    buttons: ['view'],
    headerContent: ['add']
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
        key: 'theme',
        width: '40%',
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
  orderListColumns: {
    name: '销售订单',
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
        key: 'code'
      },
      {
        title: '客户名',
        dataIndex: 'customerName',
        key: 'customerName'
      },
      {
        title: '订单摘要',
        dataIndex: 'summary',
        key: 'summary'
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
        title: '欠款金额',
        dataIndex: 'unpaidPrice',
        key: 'unpaidPrice'
      }
    ],
    operateBtnFixed: true,
    buttons: ['delete']
  },
  customerColumns: {
    name: '客户',
    show: true,
    columns: [
      {title: '编码', dataIndex: 'clientCode', key: 'clientCode'},
      {title: '客户名', dataIndex: 'clientName', key: 'clientName'},
      {title: '客户助记码', dataIndex: 'clientMnemonicCode', key: 'clientMnemonicCode'},
      {title: '电子邮件', dataIndex: 'email', key: 'email'},
      {title: '电话', dataIndex: 'telephone', key: 'telephone'},
      {title: '详情地址', dataIndex: 'address', key: 'address'},
      {title: '网站主页', dataIndex: 'website', key: 'website'},
    ],
    buttons: ['view', 'delete'],
    headerContent: ['add'],
    operateBtnFixed: true
  },
  customerContactColumns: {
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
        dataIndex: 'email',
        key: 'email'
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
  partnerColumns: {
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
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '网站主页',
        dataIndex: 'index',
        key: 'index'
      }
    ],
    headerContent: ['add'],
    buttons: ['view'],
    operateBtnFixed: true
  },
  partnerContactColumns: {
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
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '办公电话',
        dataIndex: 'officeLine',
        key: 'officeLine'
      }
    ],
    buttons: ['view'],
    operateBtnFixed: true,
    headerContent: ['add']
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
    ]
  },
  supplierContactColumns: {
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
        dataIndex: 'email',
        key: 'email'
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

export default {
  name: 'OfferSheetDetail',
  components: { CategoryTabs, DescriptionItem },
  data() {
    return {
      descriptionTitle: '客户联系人信息',
      description: { productMnemonic: 'aa', productCode: '1211', productName: 'dd' }, //对象
      descriptionColumn: ['productCode', 'productName', 'productMnemonic'], // 对象按顺序排列的数组
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns
    };
  }
};
</script>

<style scoped>
</style>