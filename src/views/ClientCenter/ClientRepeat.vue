<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :buttons="buttons"
      :headerContent="headerContent"
      @on-search="toSearch"
    ></table-list>
    <a-modal
      :visible="visible"
      :title="modalTitle"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="查询"
      cancel-text="取消"
    >
      <a-form-model :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="查询条件" prop="typeName">
          <div class="top">
            <a-input v-model="formData.typeName" placeholder="" />
          </div>
          <div class="bottom">
            <a-select
              size="small"
              v-model="formData.variable"
              @change="statusChange"
              style="
                width: 120px;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              "
            >
              <a-select-option v-for="item in variable" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
            <a-button
              size="small"
              @click="addOne"
              style="vertical-align: middle; display: inline-block"
              >添加变量</a-button
            >
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-layout>
</template>

<script>
const tableData = [
  {
    state: '',
    email: '',
    clientName: '',
    categoryName: '',
    clientMnemonic: '',
    telphone: ''
  }
];
const columns = [
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: '分类名称',
    dataIndex: 'categoryName',
    key: 'categoryName'
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
    dataIndex: 'telphone',
    key: 'telphone'
  }
];
import TableList from '@/components/TableList';

export default {
  name: 'ClientRepeat',
  components: { TableList },
  data() {
    return {
      loading: false,
      columns,
      tableData,
      buttons: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 17 },
      headerContent: ['search'],
      visible: true,
      modalTitle: '查询',
      formData: {},
      variable: ['状态', '分类名称', '客户名', '客户助记符', '电子邮件', '电话']
    };
  },
  methods: {
    statusChange(value) {
      console.log(value);
    },
    toSearch() {
      this.visible = !this.visible;
    },
    handleOk() {
      this.visible = !this.visible;
    },
    handleCancel() {
      this.visible = !this.visible;
    },
    addOne() {}
  }
};
</script>

<style >
.bottom .ant-select .ant-select-selection__rendered {
  line-height: 22px;
}
</style>