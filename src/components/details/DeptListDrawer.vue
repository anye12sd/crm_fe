<template>
  <a-drawer
    :title="myDept"
    :visible="deptvisible"
    @close="onDeptClose"
    width="960"
    class="dept_drawer"
  >
    <a-layout-header class="main-header">
      <a-descriptions bordered size="small" :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }">
        <a-descriptions-item label="部门编码">
          <a-input v-model="form.deptCode" placeholder="部门编码" />
        </a-descriptions-item>
        <a-descriptions-item label="部门名称">
          <a-input v-model="form.deptName" placeholder="部门名称" />
        </a-descriptions-item>
        <a-descriptions-item label="业务机构">
          <a-select
            v-model="form.business"
            @change="businessChange"
            placeholder="请选择业务机构"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in businessData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="区域机构">
          <a-select
            v-model="form.region"
            @change="regionChange"
            placeholder="请选择区域机构"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in regionData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
      </a-descriptions>
      <div class="input_right">
        <div class="right">
          <a-button type="primary" size="small"> 查询 </a-button>
        </div>
      </div>
      <a-divider />
      <a-table
        class="dept_table"
        :columns="columns"
        :data-source="tableData"
        rowKey="deptCode"
        :pagination="pagination"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: selectChange }"
      >
        <template slot="title">
          <div class="left">部门列表</div>
        </template>
        <template slot="footer">
          <a-button size="small" @click="selectData" style="margin-right: 8px">选用</a-button>
          <a-button size="small" @click="onDeptClose">取消</a-button>
        </template>
      </a-table>
    </a-layout-header>
  </a-drawer>
</template>

<script>
export default {
  name: 'DeptList',
  props: {
    myDept: String,
    columns: Array,
    tableData: Array,
    businessData: Array,
    regionData: Array,
    form: Object
  },
  data() {
    return {
      pagination: {
        total: 2,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条数据`
      },
      deptvisible: false,
      selectedRowKeys: []
    };
  },
  methods: {
    open() {
      this.deptvisible = true;
    },
    close() {
      this.deptvisible = false;
    },
    onDeptClose() {
      this.deptvisible = false;
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
    businessChange(value) {
      this.$emit('on-change-business', value);
    },
    regionChange(value) {
      this.$emit('on-change-region', value);
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
.dept_drawer .ant-layout-header {
  padding: 0;
  height: auto;
  line-height: normal;
  background: #fff;
}
</style>
