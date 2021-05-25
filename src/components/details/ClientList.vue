<template>
  <a-layout class="main-layout">
    <a-layout-header class="main-header">
      <a-descriptions title="客户/伙伴/供应商选择" bordered size="small">
        <a-descriptions-item label="编码">
          <a-input v-model="form.code" placeholder="编码" />
        </a-descriptions-item>
        <a-descriptions-item label="客户/伙伴名称">
          <a-input v-model="form.name" placeholder="客户/伙伴名称" />
        </a-descriptions-item>
        <a-descriptions-item label="助记符">
          <a-input v-model="form.mnemonic" placeholder="助记符" />
        </a-descriptions-item>
        <a-descriptions-item label="识别方式">
          <a-select
            @change="handleChange"
            placeholder="请选择识别方式"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in modeData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="识别号码">
          <a-input v-model="form.number" placeholder="识别号码" />
        </a-descriptions-item>
        <a-descriptions-item label="分类名称">
          <a-select
            @change="cateChange"
            placeholder="请选择分类名称"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in categoryData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
      </a-descriptions>
      <div class="input_right">
        <a-button type="primary" size="small"> 查询 </a-button>
        <a-button type="link" size="small" @click="openChange" v-if="advancedData">
          高级查询
        </a-button>
        <a-button type="link" size="small" @click="offChange" v-if="!advancedData">
          高级查询
        </a-button>
      </div>
      <a-divider />
      <div v-show="!advancedData">
        <a-descriptions
          bordered
          size="small"
          :column="{ xxl: 4, xl: 4, lg: 2, md: 2, sm: 2, xs: 2 }"
        >
          <a-descriptions-item label="备注">
            <a-input v-model="form.remarks" placeholder="备注" />
          </a-descriptions-item>
          <a-descriptions-item label="电话">
            <a-input v-model="form.telephone" placeholder="电话" />
          </a-descriptions-item>
          <a-descriptions-item label="详细地址">
            <a-input v-model="form.address" placeholder="详细地址" />
          </a-descriptions-item>
          <a-descriptions-item label="电子邮件">
            <a-input v-model="form.email" placeholder="电子邮件" />
          </a-descriptions-item>
          <a-descriptions-item label="联系人电话">
            <a-input v-model="form.contactTelephone" placeholder="联系人电话" />
          </a-descriptions-item>
          <a-descriptions-item label="传真">
            <a-input v-model="form.fax" placeholder="传真" />
          </a-descriptions-item>
          <a-descriptions-item label="城市">
            <a-input v-model="form.city" placeholder="城市" />
          </a-descriptions-item>
          <a-descriptions-item label="邮编">
            <a-input v-model="form.postcode" placeholder="邮编" />
          </a-descriptions-item>
          <a-descriptions-item label="省份">
            <a-input v-model="form.province" placeholder="省份" />
          </a-descriptions-item>
          <a-descriptions-item label="国家">
            <a-input v-model="form.country" placeholder="国家" />
          </a-descriptions-item>
          <a-descriptions-item label="反应特性">
            <a-select
              @change="featuresChange"
              placeholder="请选择反应特性"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in featuresData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="付款信用">
            <a-select
              @change="creditChange"
              placeholder="请选择付款信用"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in creditData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="价值等级">
            <a-select
              @change="levelChange"
              placeholder="请选择价值等级"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in levelData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="客户来源">
            <a-select
              @change="sourceChange"
              placeholder="请选择客户来源"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in sourceData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="行业">
            <a-select
              @change="industryChange"
              placeholder="请选择行业"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in industryData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="营销模式">
            <a-select
              @change="modelChange"
              placeholder="请选择营销模式"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in modelData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
      </div>
      <a-table
        class="client_table"
        :columns="columns"
        :data-source="tableData"
        rowKey="clientCode"
        :pagination="pagination"
        @change="handleTableChange"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: selectChange }"
      >
        <template slot="title">
          <div class="left">客户列表</div>
          <div class="right">
            <a-button type="primary" size="small">新增</a-button>
          </div>
        </template>
        <template slot="footer">
          <a-button size="small" @click="selectData" style="margin-right: 8px">选用</a-button>
          <a-button size="small" @click="clearAll">清空</a-button>
        </template>
      </a-table>
    </a-layout-header>
  </a-layout>
</template>

<script>
export default {
  name: 'ClientList',
  props: {
    creditData: Array,
    levelData: Array,
    sourceData: Array,
    industryData: Array,
    modelData: Array,
    featuresData: Array,
    categoryData: Array,
    modeData: Array,
    form: Object,
    columns: Array,
    tableData: Array,
    pagination: Object
  },
  data() {
    return {
      descriptionColumn: [
        { title: '客户名', dataIndex: 'clientName', key: 'clientName' },
        { title: '编号', dataIndex: 'clientCode', key: 'clientCode' },
        { title: '客户助记码', dataIndex: 'clientMnemonicCode', key: 'clientMnemonicCode' },
        { title: '最近联络时间', dataIndex: 'lastTime', key: 'lastTime' },
        { title: '识别方式', dataIndex: 'mode', key: 'mode' },
        { title: '识别号码', dataIndex: 'number', key: 'number' },
        { title: '电子邮件', dataIndex: 'email', key: 'email' },
        { title: '网站主页', dataIndex: 'website', key: 'website' },
        { title: '电话', dataIndex: 'telephone', key: 'telephone' },
        { title: '详情地址', dataIndex: 'address', key: 'address' },
        { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      advancedData: true,
      selectedRowKeys: []
    };
  },
  methods: {
    open() {
      this.advancedData = false;
    },
    close() {
      this.advancedData = true;
    },
    selectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    selectData() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择客户!');
      } else {
        this.selectedRowKeys = [];
      }
    },
    clearAll() {
      this.selectedRowKeys = [];
    },
    toClick(type, text, record, index) {
      this.$emit('on-click-client', type, text, record, index);
    },
    handleChange(value) {
      this.$emit('on-change-mode', value);
    },
    cateChange(value) {
      this.$emit('on-change-cate', value);
    },
    featuresChange(value) {
      this.$emit('on-change-features', value);
    },
    creditChange(value) {
      this.$emit('on-change-credit', value);
    },
    levelChange(value) {
      this.$emit('on-change-level', value);
    },
    sourceChange(value) {
      this.$emit('on-change-source', value);
    },
    industryChange(value) {
      this.$emit('on-change-industry', value);
    },
    modelChange(value) {
      this.$emit('on-change-model', value);
    },
    openChange() {
      this.$emit('on-change-open');
    },
    offChange() {
      this.$emit('on-change-off');
    },
    handleTableChange(pagination) {
      this.$emit('on-change-table', pagination);
    }
  }
};
</script>

<style scoped>
.tabs-box {
  margin-top: 20px;
}
.flex {
  display: flex;
}
.space-between {
  justify-content: space-between;
}
</style>
