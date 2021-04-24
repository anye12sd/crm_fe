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
        scopedSlots: { customRender: 'link' }
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
        dataIndex: 'setPrice',
        key: 'setPrice'
      },
      {
        title: '报价',
        dataIndex: 'offerPrice',
        key: 'offerPrice'
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
        dataIndex: 'allPrice',
        key: 'allPrice'
      },
      {
        title: '税率',
        dataIndex: 'discount',
        key: 'discount'
      },
      {
        title: '税后税率',
        dataIndex: 'rateAfterTax',
        key: 'rateAfterTax'
      },
      {
        title: '消费金额（天）',
        dataIndex: 'consumeAmount',
        key: 'consumeAmount'
      },
      {
        title: '外币金额',
        dataIndex: 'foreignCurrency',
        key: 'foreignCurrency'
      }
    ],
    buttons: ['view'],
    operateBtnFixed: true,
    headerContent: ['displaylist']
  },
  orderListColumns: {
    name: '销售订单',
    show: true,
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
        title: '部门姓名',
        dataIndex: 'departmentName',
        key: 'departmentName'
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
      },
    ],
    operateBtnFixed: true,
    buttons: ['delete'],
    headerContent: ['add']
  },
  relatedMemberColumns: {
    name: '相关员工',
    show: true,
    columns: [
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
        title: '助记码',
        dataIndex: 'mnemonic',
        key: 'mnemonic'
      },
      {
        title: '部门名称',
        dataIndex: 'departmentName',
        key: 'departmentName'
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
const description = {// 对象
  'offerSheetCode': 'QM101010',
  'offerDate': '2020-01-01',
  'offerCategory': '缺省报价单分类',
  'customerName': '测试客户',
  'customerCode': '000-0001',
  'partnerName': '测试伙伴',
  'partnerCode': '0001-00',
  'offerSummary': '',
  'offerPerson': 'x',
  'departmentName': '业务机构管理机构',
  'amount': '1',
  'coinType': '人民币',
  'exchangeRate': '1.00',
  'creator': 'x',
  'createTime': '2020-01-01',
  'changer': 'x',
  'changeTime': '2020-01-01',
  'paidPerson': '客户付款',
  'remark': ''
}
const descriptionColumn = // 对象按顺序排列的数组
        [
          { name: 'offerSheetCode', span: 1 },
          { name: 'offerDate', span: 1 },
          { name: 'offerCategory', span: 1 },
          { name: 'customerName', span: 2 },
          { name: 'customerCode', span: 1 },
          { name: 'partnerName', span: 2 },
          { name: 'partnerCode', span: 1 },
          { name: 'offerSummary', span: 2 },
          { name: 'paidPerson', span: 1 },
          { name: 'offerPerson', span: 1 },
          { name: 'departmentName', span: 1 },
          { name: 'amount', span: 1 },
          { name: 'coinType', span: 1 },
          { name: 'exchangeRate', span: 1 },
          { name: 'creator', span: 1 },
          { name: 'createTime', span: 1 },
          { name: 'changer', span: 1 },
          { name: 'changeTime', span: 1 },
          { name: 'remark', span: 3 },
        ]

export default {
  name: 'OfferSheetDetail1',
  components: { CategoryTabs, DescriptionItem },
  data() {
    return {
      descriptionTitle: '客户联系人信息',
      description, //对象
      descriptionColumn, // 对象按顺序排列的数组
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns
    };
  }
};
</script>

<style scoped>
</style>