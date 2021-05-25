<template>
  <a-layout class="main-layout">
    <account-info
      :staffData="staffData"
      :form="form"
      @on-staff="onStaff"
      @on-save="onSave"
      @on-reset="onReset"
      ref="reset"
    ></account-info>
  </a-layout>
</template>

<script>
import AccountInfo from '../../components/details/AccountInfo';
export default {
  name: 'AccountInfoList',
  components: { AccountInfo },
  data() {
    return {
      form: {
        accountName: ''
      },
      staffData: [
        { id: 0, title: '业务机构管理机构' },
        { id: 1, title: '亚设清洁总公司' },
        { id: 2, title: '亚设清洁市场部' },
        { id: 3, title: '亚设清洁销售部' },
        { id: 4, title: '亚设清洁服务部' },
        { id: 5, title: '亚设清洁财务部' },
        { id: 6, title: '亚设清洁技术部' }
      ]
    };
  },
  methods: {
    onStaff(e) {
      console.log(e);
    },
    onReset() {
      this.form = {};
      this.$refs.reset.open();
    },
    onSave() {
      if (this.form.accountName === '') {
        this.$message.warning('帐户名称不能为空！');
      } else {
        console.log(this.form);
      }
    }
  }
};
</script>