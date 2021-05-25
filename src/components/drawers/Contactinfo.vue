<template>
  <a-drawer
    width="960"
    :visible="contvisible"
    @close="onContClose"
    class="dept_drawer"
    title="客户联系人信息"
  >
    <a-descriptions bordered size="small" :column="{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }">
      <a-descriptions-item label="客户名" :span="3">
        <div class="client_name">
          <span class="name">{{ form.clientName }}</span>
          <a-checkbox-group
            v-model="form.value"
            name="checkboxgroup"
            :options="plainOptions"
            @change="groupChange"
          />
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="联系人姓名">
        <a-input v-model="form.contactName" placeholder="联系人姓名" />
      </a-descriptions-item>
      <a-descriptions-item label="性别">
        <a-radio-group v-model="form.sex" @change="sexChange">
          <a-radio :value="1"> 男 </a-radio>
          <a-radio :value="2"> 女 </a-radio>
        </a-radio-group>
      </a-descriptions-item>
      <a-descriptions-item label="直接上级">
        <a-select
          v-model="form.superior"
          @change="superiorChange"
          placeholder="请选择直接上级"
          style="width: 150px"
          allowClear
        >
          <a-select-option v-for="(item, index) in superiorData" :key="item.id" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item label="职务">
        <a-input v-model="form.duties" placeholder="职务" />
      </a-descriptions-item>
      <a-descriptions-item label="联系人部门">
        <a-input v-model="form.contactDept" placeholder="联系人部门" />
      </a-descriptions-item>
      <a-descriptions-item label="办公电话">
        <a-input v-model="form.officePhone" placeholder="办公电话" />
      </a-descriptions-item>
      <a-descriptions-item label="称呼">
        <a-input v-model="form.call" placeholder="称呼" />
      </a-descriptions-item>
      <a-descriptions-item label="出生日期" :key="dateKey">
        <a-date-picker @change="birdayChange" style="width: 100%" />
      </a-descriptions-item>
      <a-descriptions-item label="电子邮件">
        <a-input v-model="form.email" placeholder="电子邮件" />
      </a-descriptions-item>
      <a-descriptions-item label="描述" :span="3">
        <a-textarea
          v-model="form.description"
          placeholder="描述"
          :auto-size="{ minRows: 3, maxRows: 3 }"
        />
      </a-descriptions-item>
    </a-descriptions>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'left',
        zIndex: 1
      }"
    >
      <a-button type="primary" :style="{ marginRight: '8px' }" @click="onConfirm"> 确认 </a-button>
      <a-button @click="onContClose"> 取消 </a-button>
    </div>
  </a-drawer>
</template>

<script>
const plainOptions = [
  { label: '主联系人', value: '主联系人' },
  { label: '关怀对象', value: '关怀对象' },
  { label: '催款对象', value: '催款对象' },
  { label: '促销对象', value: '促销对象' }
];
export default {
  name: 'Contactinfo',
  props: {
    form: Object,
    superiorData: Array
  },
  data() {
    return {
      dateKey: '',
      plainOptions,
      contvisible: false
    };
  },
  watch: {
    contvisible() {
      if (this.contvisible) {
        this.dateKey = '';
      } else {
        this.dateKey = Math.random();
      }
    }
  },
  methods: {
    open() {
      this.contvisible = true;
    },
    onContClose() {
      this.contvisible = false;
    },
    groupChange(value) {
      this.$emit('on-group', value);
    },
    sexChange(value) {
      this.$emit('on-sex', value);
    },
    superiorChange(value) {
      this.$emit('on-superior', value);
    },
    birdayChange(date, dateString) {
      this.$emit('on-birday', date, dateString);
    },
    onConfirm() {
      this.$emit('on-confirm');
    }
  }
};
</script>

<style scoped>
.client_name .name {
  width: 350px;
  margin-right: 8px;
  display: inline-block;
}
</style>