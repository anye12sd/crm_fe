<template>
  <a-layout-header class="main-header">
    <a-descriptions title="帐户信息" bordered size="small">
      <a-descriptions-item label="帐户名称" :span="1">
        <a-input v-model="form.accountName" placeholder="帐户名称" />
      </a-descriptions-item>
      <a-descriptions-item label="帐户编码" :span="2">
        <a-input v-model="form.clientCode" placeholder="帐户编码" class="same_input" />
      </a-descriptions-item>
      <a-descriptions-item label="客户名" :span="3">
        <a-input v-model="form.clientName" placeholder="客户名" style="width: 24.6%" />
        <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
      </a-descriptions-item>
      <a-descriptions-item label="详细地址" :span="1">
        <a-input v-model="form.address" placeholder="详细地址" />
      </a-descriptions-item>
      <a-descriptions-item label="邮编" :span="2">
        <a-input v-model="form.postCode" placeholder="邮编" class="same_input" />
      </a-descriptions-item>
      <a-descriptions-item label="电话">
        <a-input v-model="form.telephone" placeholder="电话" />
      </a-descriptions-item>
      <a-descriptions-item label="电子邮件">
        <a-input v-model="form.email" placeholder="电子邮件" />
      </a-descriptions-item>
      <a-descriptions-item label="传真">
        <a-input v-model="form.fax" placeholder="传真" />
      </a-descriptions-item>
      <a-descriptions-item label="开户行">
        <a-input v-model="form.openingBank" placeholder="开户行" />
      </a-descriptions-item>
      <a-descriptions-item label="银行帐号">
        <a-input v-model="form.bankAccount" placeholder="银行帐号" />
      </a-descriptions-item>
      <a-descriptions-item label="负责部门" :key="selectKey">
        <a-select @change="staffChange" placeholder="请选择负责部门" style="width: 100%" allowClear>
          <a-select-option v-for="(item, index) in staffData" :key="item.id" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item label="帐户备注" :span="3">
        <a-textarea
          v-model="form.accountRemarks"
          placeholder="帐户备注"
          :auto-size="{ minRows: 3, maxRows: 3 }"
        />
      </a-descriptions-item>
    </a-descriptions>
    <div class="desc_submit">
      <a-button size="small" type="primary" @click="saveForm" style="margin-right: 8px"
        >保存</a-button
      >
      <a-button size="small" @click="onReset" style="margin-right: 8px">重置</a-button>
      <a-button size="small" @click="$router.go(-1)">退出</a-button>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'AccountInfo',
  props: {
    staffData: Array,
    form: Object
  },
  data() {
    return {
      selectKey: '',
      accountType: 'account'
    };
  },
  methods: {
    open() {
      this.selectKey = Math.random();
    },
    staffChange(value) {
      this.$emit('on-staff', value);
    },
    showSearch() {
      this.$router.push({ path: '/client_center/client_list_detail' });
    },
    onReset() {
      this.$emit('on-reset');
    },
    saveForm() {
      this.$emit('on-save');
    }
  }
};
</script>

<style>
@media (min-width: 1600px) {
  .same_input {
    width: 39.2%;
  }
}
@media (min-width: 1400px) and (max-width: 1599px) {
  .same_input {
    width: 38.8%;
  }
}
.desc_submit {
  margin-top: 20px;
}
</style>
