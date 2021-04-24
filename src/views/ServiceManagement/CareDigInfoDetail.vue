<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :headerContent="headerContent"
      :buttons="buttons"
      @on-collect="toCollect"
      :pagination="pagination"
    >
    </table-list>
    <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
  </a-layout>
</template>

<script>
const tableData = [
  {
    code: '0000',
    name: '伙伴名',
    sales: '47245862'
  }
];
const columns = [
  {
    title: '编码',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '客户/伙伴名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '有效销售额',
    dataIndex: 'sales',
    key: 'sales'
  }
];
import TableList from '@/components/TableList';
import CollectionAdd from '@/components/details/CollectionAdd';

export default {
  name: 'CareDigInfoDetail',
  components: { TableList, CollectionAdd },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      tableData,
      columns,
      buttons: [],
      modalTitle: '加入收藏',
      headerContent: ['excel', 'collect'],
      pagination: {
        total: 1,
        current: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    toCollect() {
      this.$refs.add.open();
    }
  }
};
</script>

<style scoped></style>