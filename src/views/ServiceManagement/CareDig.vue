<template>
  <a-layout class="main-layout">
    <div class="backgroundfff">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content" v-if="current === 0" current="0">
        <a-radio-group :options="plainOptions" @change="onChange" v-model="value1" />
      </div>
      <div class="steps-content" v-if="current === 1" current="1">
        <a-form-model layout="horizontal" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="开始时间">
            <a-date-picker
              :disabled-date="disabledStartDate"
              showToday
              format="YYYY-MM-DD"
              placeholder="开始时间"
              @change="onStartOpenChange"
              @openChange="handleStartOpenChange"
            />
          </a-form-model-item>
          <a-form-model-item label="结束时间">
            <a-date-picker
              :disabled-date="disabledEndDate"
              showToday
              format="YYYY-MM-DD"
              placeholder="结束时间"
              :open="endOpen"
              @change="onEndOpenChange"
              @openChange="handleEndOpenChange"
            />
          </a-form-model-item>
          <a-form-model-item label="关怀对象">
            <a-radio-group :options="objectOptions" @change="objectChange" v-model="value2" />
          </a-form-model-item>
          <a-form-model-item label="关怀条件">
            <a-radio-group :options="conditionOptions" @change="conditionChange" v-model="value3" />
          </a-form-model-item>
          <a-form-model-item label="显示数量">
            <a-input
              v-model="form.number"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              placeholder="显示数量"
              style="width: auto"
            />
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next"> 下一步 </a-button>
        <a-button v-if="current == steps.length - 1" type="primary" @click="doneClick">
          完成
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"> 上一步 </a-button>
      </div>
    </div>
  </a-layout>
</template>

<script>
const plainOptions = [
  { label: '价值客户', value: '0' },
  { label: '价值上升客户', value: '1' },
  { label: '价值下降客户', value: '2' },
  { label: '不满意客户', value: '3' }
];
const objectOptions = [
  { label: '客户', value: '0' },
  { label: '合作伙伴', value: '1' }
];
const conditionOptions = [
  { label: '销售额', value: '0' },
  { label: '利润', value: '1' },
  { label: '交易次数', value: '2' }
];

export default {
  name: 'CareDig',
  data() {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      plainOptions,
      objectOptions,
      conditionOptions,
      current: 0,
      selectSingle: '',
      steps: [
        {
          title: '关怀类型'
        },
        {
          title: '关怀条件'
        }
      ],
      value1: '0',
      value2: '0',
      value3: '0',
      form: {
        startTime: null,
        endTime: null,
        plainOptions: '',
        objectOptions: '',
        conditionOptions: '',
        number: '100'
      },
      endOpen: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.form.plainOptions = this.value1;
      this.form.objectOptions = this.value2;
      this.form.conditionOptions = this.value3;
    },
    next() {
      if (this.form.plainOptions === '') {
        this.$message.warning('请选择类型！');
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
    onChange(e) {
      this.form.plainOptions = e.target.value;
    },
    objectChange(e) {
      this.form.objectOptions = e.target.value;
    },
    conditionChange(e) {
      this.form.conditionOptions = e.target.value;
    },
    onStartOpenChange(value, dateString) {
      this.form.startTime = dateString;
    },
    onEndOpenChange(value, dateString) {
      this.form.endTime = dateString;
    },
    disabledStartDate(startValue) {
      const endValue = this.form.endTime;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue, value, dateString) {
      const startValue = this.form.startTime;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    doneClick() {
      this.$router.push({ path: '/service_management/care_dig_info_detail' });
    }
  }
};
</script>

<style>
.steps-content {
  margin: 25px 0;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  background-color: #fff;
  min-height: 200px;
  padding: 20px;
}
</style>