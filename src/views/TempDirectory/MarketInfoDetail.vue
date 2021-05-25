<template>
  <a-layout class="main-layout">
    <description-item
      :description="description"
      :descriptionColumn="descriptionColumn"
    ></description-item>
    <category-tabs :usedTabs="usedTabs" :usedTabsColumns="usedTabsColumns"></category-tabs>
  </a-layout>
</template>

<script>
import DescriptionItem from '../../components/DescriptionItem';
import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
const usedTabs = [
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
const usedTabsColumns = {
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
        width: '40%',
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
    name: '相关员工',
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
        width: '40%',
      },
      {
        title: '任务主题',
        dataIndex: 'taskTheme',
        key: 'taskTheme',
        width: '40%',
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
        dataIndex: 'mdificationTime',
        key: 'mdificationTime'
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: '发表员工',
        dataIndex: 'reportStaff',
        key: 'reportStaff'
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
    headerContent: []
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
        width: '40%',
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
    name: ' 销售订单',
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
    buttons: ['add'],
    headerContent: [],
    operateBtnFixed: true
  },
  clientListColumns: {
    name: ' 客户',
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
    buttons: ['view'],
    operateBtnFixed: true,
    headerContent: []
  },
  clientContactListColumns: {
    name: ' 客户联系人',
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
    buttons: ['view'],
    operateBtnFixed: true,
    headerContent: []
  },
  partnerListColumns: {
    name: ' 合作伙伴',
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
    name: ' 伙伴联系人',
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
    name: ' 供应商',
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
    name: ' 供应商联系人',
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
    ],
    operateBtnFixed: true,
    buttons: ['view'],
    headerContent: ['add']
  }
};

export default {
  name: 'CustomerContactInfoDetail',
  components: { CategoryTabs, DescriptionItem },
  data() {
    return {
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