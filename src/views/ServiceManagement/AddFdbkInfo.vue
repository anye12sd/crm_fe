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
        <a-descriptions bordered size="small">
          <a-descriptions-item label="紧急性" v-if="value1 === 0">
            <a-select
              v-model="fdbkForm.urgency"
              @change="urgencyChange"
              placeholder="请选择"
              style="width: 300px"
              allowClear
            >
              <a-select-option v-for="(item, index) in urgencyData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="重要性">
            <a-select
              v-model="fdbkForm.importance"
              @change="imporChange"
              placeholder="请选择"
              style="width: 300px"
              allowClear
            >
              <a-select-option v-for="(item, index) in imporData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="解决期限">
            <a-input v-model="fdbkForm.dueTime" placeholder="解决期限" />
          </a-descriptions-item>
          <a-descriptions-item v-if="value1 === 0" label="反馈分类">
            <span>{{ fdbkForm.fdbkCate }}</span>
          </a-descriptions-item>
          <a-descriptions-item v-if="value1 === 0" label="反馈类型">
            <a-select
              v-model="fdbkForm.fdbkType"
              @change="typeChange"
              placeholder="请选择"
              style="width: 300px"
              allowClear
            >
              <a-select-option v-for="(item, index) in typeData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-select
              v-model="fdbkForm.state"
              @change="stateChange"
              placeholder="请选择"
              style="width: 300px"
              allowClear
            >
              <a-select-option v-for="(item, index) in stateData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="主题" :span="2">
            <a-input v-model="fdbkForm.theme" placeholder="主题" />
          </a-descriptions-item>
          <a-descriptions-item label="部门名称">
            <a-select
              v-model="fdbkForm.deptName"
              @change="deptChange"
              placeholder="请选择"
              style="width: 300px"
              allowClear
            >
              <a-select-option v-for="(item, index) in deptData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next"> 下一步 </a-button>
        <a-button v-if="current == steps.length - 1" type="primary" @click="doneClick">
          保存
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"> 上一步 </a-button>
      </div>
    </div>
  </a-layout>
</template>

<script>
const plainOptions = [
  { label: '客户反馈——有关客户类', value: '0' },
  { label: '达成共识——内部沟通协商类', value: '1' },
  { label: '好好学习——学习、培训类', value: '2' }
];

export default {
  name: 'AddFdbkInfo',
  data() {
    return {
      plainOptions,
      current: 0,
      steps: [
        {
          title: '反馈类型'
        },
        {
          title: '反馈信息'
        }
      ],
      value1: '0',
      urgencyData: [],
      imporData: [],
      typeData: [],
      stateData: [],
      deptData: [],
      fdbkForm: {
        plainOptions: ''
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.fdbkForm.plainOptions = this.value1;
    },
    next() {
      if (this.fdbkForm.plainOptions === '') {
        this.$message.warning('请选择类型！');
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
    onChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
    },
    // 紧急性
    urgencyChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
    },
    imporChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
    },
    typeChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
    },
    stateChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
    },
    deptChange(e) {
      this.fdbkForm.plainOptions = e.target.value;
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