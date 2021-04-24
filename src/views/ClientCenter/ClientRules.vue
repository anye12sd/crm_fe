<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :headerContent="headerContent"
      :buttons="buttons"
    ></table-list>
  </a-layout>
</template>

<script>
const tableData = [
  {
    typeName: '钻石客户',
    businessIntro:
      '域名1 域名2 重要提醒 ICP备案 备案户名 备案密码 1注册时间 1注册月 1注册日 2注册时间 2注册月 2注册日 备案资料地址 网站产品 微信群编号 网站服务商 反应特性 营销模式 客户来源 行业 价值等级 付款信用 最近一次购买R 购买频率F 购买金额M'
  },
  {
    typeName: '金牌客户',
    businessIntro:
      '域名1 域名2 重要提醒 ICP备案 备案户名 备案密码 1注册时间 1注册月 1注册日 2注册时间 2注册月 2注册日 备案资料地址 网站产品 微信群编号 网站服务商 反应特性 营销模式 客户来源 行业 价值等级 付款信用'
  },
  {
    typeName: '银牌客户',
    businessIntro:
      '域名1 域名2 重要提醒 ICP备案 备案户名 备案密码 1注册时间 1注册月 1注册日 2注册时间 2注册月 2注册日 备案资料地址 网站产品 微信群编号 网站服务商 反应特性 营销模式 客户来源 行业 价值等级 付款信用'
  },
  {
    typeName: '铜牌客户',
    businessIntro:
      '域名1 域名2 重要提醒 ICP备案 备案户名 备案密码 1注册时间 1注册月 1注册日 2注册时间 2注册月 2注册日 备案资料地址 网站产品 微信群编号 网站服务商 反应特性 营销模式 客户来源 行业 价值等级 付款信用'
  },
  {
    typeName: '流失客户',
    businessIntro:
      '域名1 域名2 重要提醒 ICP备案 备案户名 备案密码 1注册时间 1注册月 1注册日 2注册时间 2注册月 2注册日 备案资料地址 网站产品 微信群编号 网站服务商 反应特性 营销模式 客户来源 行业 价值等级 付款信用 最近一次购买R 购买频率F 购买金额M'
  }
];
const columns = [
  {
    title: '分类名称',
    dataIndex: 'typeName',
    key: 'typeName',
    width: '100px'
  },
  {
    title: '业务表现',
    dataIndex: 'businessIntro',
    key: 'businessIntro'
  }
];
import TableList from '@/components/TableList';

export default {
  name: 'ClienRules',
  components: { TableList },
  data() {
    return {
      tableData,
      columns,
      buttons: [],
      headerContent: ['clientext']
    };
  },
  methods: {}
};
</script>

<style scoped></style>