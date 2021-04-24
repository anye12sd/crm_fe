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
  contactListColumns: {
    name: '联系人',
    show: true,
    columns: [
      {
        title: '客户名',
        dataIndex: 'clientName',
        key: 'clientName'
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName'
      },
      {
        title: '联系人部门',
        dataIndex: 'contactDepartment',
        key: 'contactDepartment'
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post'
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address'
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
      },
      {
        title: '移动电话',
        dataIndex: 'mobilephone',
        key: 'mobilephone'
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
    headerContent: []
  },
  processListColumns: {
    name: '处理过程',
    show: true,
    columns: [
      {
        title: '处理时间',
        dataIndex: 'processingTime',
        key: 'processingTime'
      },
      {
        title: '员工姓名',
        dataIndex: 'staffName',
        key: 'staffName'
      },
      {
        title: '处理过程',
        dataIndex: 'process',
        key: 'process'
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
    headerContent: []
  },
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
        title: '负责人',
        dataIndex: 'chargePerson',
        key: 'chargePerson'
      },
      {
        title: '分割人员',
        dataIndex: 'programmer',
        key: 'programmer'
      },
      {
        title: '后台账号',
        dataIndex: 'account',
        key: 'account'
      },
      {
        title: '后台密码',
        dataIndex: 'password',
        key: 'password'
      },
      {
        title: '平面人员',
        dataIndex: 'graphicStaff',
        key: 'graphicStaff'
      },
      {
        title: '开通网址',
        dataIndex: 'openWebsite',
        key: 'openWebsite'
      },
      {
        title: '资料人员',
        dataIndex: 'dataStaff',
        key: 'dataStaff'
      },
      {
        title: '定稿时间',
        dataIndex: 'finalizationTime',
        key: 'finalizationTime'
      },
      {
        title: '开通时间',
        dataIndex: 'openingTime',
        key: 'openingTime'
      },
      {
        title: '统计工具',
        dataIndex: 'statistics',
        key: 'statistics'
      },
      {
        title: '二级域名网址',
        dataIndex: 'secondaryWebsite',
        key: 'secondaryWebsite'
      },
      {
        title: '客服人员',
        dataIndex: 'clientService',
        key: 'clientService'
      },
      {
        title: '最新进度',
        dataIndex: 'progress',
        key: 'progress'
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
    headerContent: []
  },
  workListColumns: {
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
  scheduleListColumns: {
    name: '日程',
    show: true,
    columns: [
      {
        title: '员工姓名',
        dataIndex: 'staffName',
        key: 'staffName'
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
        key: 'theme',
        width: '40%',
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
    headerContent: []
  },
  todoListColumns: {
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
        dataIndex: 'dueDate',
        key: 'dueDate'
      },
      {
        title: '主题',
        dataIndex: 'theme',
        key: 'theme',
        width: '40%',
      },
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain'
      },
      {
        title: '重要性',
        dataIndex: 'importance',
        key: 'importance'
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
      }
    ],
    buttons: ['view'],
    operateBtnFixed: true,
    headerContent: []
  },
  salesListColumns: {
    name: '销售机会',
    show: true,
    columns: [
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
    buttons: [],
    headerContent: [],
    operateBtnFixed: true
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
const description = {//对象
  "feedbackType": "购买",
  "feedbackCategory": "客户反馈",
  "status": "新增",
  "important": "最低",
  "emergency": "",
  "theme": "qazqaz",
  "deadline": "2020-01-01",
  "feedbackTargetType": "其它",
  "departmentName": "部门名称",
  "feedbackTarget": "",
  "responsibleEmployee": "松树谷文",
  "createTime": "2020-01-01",
  "feedbackerType": "客户",
  "feedbacker": "测试客户",
  "creator": "实施顾问",
  "feedbackerPhone": "",
  "description": "",
  "result": "",
  "feedbackerMail": "",
  "changeTime": "2020-01-01",
  "changer": "实施顾问",
}

const descriptionColumn = [// 对象按顺序排列的数组
  {name: "feedbackType", span: 1},
  {name: "feedbackCategory", span: 1},
  {name: "status", span: 1},
  {name: "important", span: 1},
  {name: "emergency", span: 2},
  {name: "theme", span: 2},
  {name: "deadline", span: 1},
  {name: "feedbackTargetType", span: 2},
  {name: "departmentName", span: 1},
  {name: "feedbackTarget", span: 2},
  {name: "responsibleEmployee", span: 1},
  {name: "feedbackerType", span: 2},
  {name: "createTime", span: 1},
  {name: "feedbacker", span: 2},
  {name: "creator", span: 1},
  {name: "feedbackerPhone", span: 1},
  {name: "feedbackerMail", span: 1},
  {name: "changeTime", span: 1},
  {name: "changer", span: 3},
  {name: "description", span: 3},
  {name: "result", span: 3},
]

export default {
  name: 'CustomerContactInfoDetail',
  components: { CategoryTabs, DescriptionItem },
  data() {
    return {
      description,
      descriptionColumn,
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns
    };
  }
};
</script>

<style scoped>
</style>