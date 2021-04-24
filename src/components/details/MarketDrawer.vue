<template>
  <a-drawer
    :title="myMarket"
    :visible="marketvisible"
    @close="onMarketClose"
    width="960"
    class="market_drawer"
  >
    <a-form-model ref="ruleForm" :model="form" :rules="rules" style="background: #fff">
      <a-row class="double_col">
        <a-col :span="8">
          <a-form-model-item label="活动代码" prop="cmpgCode">
            <a-input v-model="form.cmpgCode" placeholder="活动代码" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="活动名称" prop="cmpgName">
            <a-input v-model="form.cmpgName" placeholder="活动名称" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row class="three_col">
        <a-col :span="8" class="market_cate">
          <a-form-model-item label="市场活动分类" prop="cmpgClassId">
            <a-select
              v-model="form.cmpgClassId"
              @change="cateChange"
              placeholder="市场活动分类"
              allowClear
            >
              <a-select-option v-for="(item, index) in cateText" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="部门名称" prop="deptName">
            <a-select
              v-model="form.deptName"
              @change="deptChange"
              placeholder="部门名称"
              allowClear
            >
              <a-select-option v-for="(item, index) in deptText" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="活动预算" prop="cmpgBudget">
            <a-input v-model="form.cmpgBudget" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row class="three_col">
        <a-col :span="8">
          <a-form-model-item label="开始日期" prop="startDate">
            <a-date-picker v-model="form.startDate" @change="startChange" placeholder="开始日期" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="结束日期" prop="endDate">
            <a-date-picker v-model="form.endDate" @change="endChange" placeholder="结束日期" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="活动费用" prop="activityCost">
            <a-input disabled />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row class="one_col">
        <a-col :span="24">
          <a-form-model-item label="备注">
            <a-input v-model="form.remarks" type="textarea" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row class="one_col">
        <a-col :span="24">
          <a-form-model-item>
            <a-button type="primary" @click="onSubmit"> 提交 </a-button>
            <a-button @click="onReset" style="margin-left: 10px"> 重置 </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-drawer>
</template>

<script>
export default {
  props: {
    form: Object,
    cateText: Array,
    deptText: Array
  },
  name: 'AddMarketingList',
  data() {
    return {
      myMarket: '添加市场活动',
      marketvisible: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
      rules: {
        cmpgCode: [{ required: true, message: '请输入活动代码', trigger: 'blur' }],
        cmpgName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        cmpgClassId: [{ required: true, message: '请选择市场活动分类', trigger: 'change' }],
        deptId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        cmpgStartDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }]
      }
    };
  },
  methods: {
    marketopen() {
      this.marketvisible = true;
    },
    marketclose() {
      this.form = {};
      this.marketvisible = false;
    },
    onMarketClose() {
      this.marketvisible = false;
    },
    cateChange(value) {
      this.$emit('on-cate-change', value);
    },
    deptChange(value) {
      this.$emit('on-dept-change', value);
    },
    startChange(date, dateString) {
      this.$emit('on-start-change', date, dateString);
    },
    endChange(date, dateString) {
      this.$emit('on-end-change', date, dateString);
    },
    onSubmit() {
      this.$emit('on-submit');
    },
    onReset() {
      this.$emit('on-reset');
    }
  }
};
</script>

<style>
.market_drawer .ant-form-item-control-wrapper {
  display: inline-block;
  vertical-align: inherit;
}
.market_drawer .double_col .ant-form-item-control-wrapper {
  width: 70%;
}
.market_drawer .three_col .ant-form-item-control-wrapper {
  width: 74%;
}
.market_drawer .three_col .market_cate .ant-form-item-control-wrapper {
  width: 62%;
}
.market_drawer .three_col .ant-calendar-picker {
  width: 100%;
}
.market_drawer .one_col .ant-form-item-control-wrapper {
  width: 98%;
}
.market_drawer .one_col .ant-form-item-control-wrapper textarea.ant-input {
  resize: none;
  height: 88px;
  line-height: 22px;
}
</style>