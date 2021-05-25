<template>
  <dept-list
    :form="form"
    :columns="columns"
    :tableData="tableData"
    :businessData="businessData"
    :regionData="regionData"
    @on-change-business="onChangeBusiness"
    @on-change-region="onChangeRegion"
    ref="dept"
  ></dept-list>
</template>

<script>
import DeptList from '@/components/details/DeptListDrawer';
export default {
  name: 'DeptListDetail',
  components: { DeptList },
  data() {
    return {
      form: {},
      columns: [
        {
          title: '部门编码',
          dataIndex: 'deptCode',
          key: 'deptCode'
        },
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        },
        {
          title: '电话',
          dataIndex: 'telephone',
          key: 'telephone'
        },
        {
          title: '电子邮件',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '部门地址',
          dataIndex: 'deptAddress',
          key: 'deptAddress'
        }
      ],
      tableData: [
        {
          deptCode: '001',
          deptName: '集团总公司',
          telephone: '0571-88223075',
          email: 'qq@qq.com',
          deptAddress: '杭州滨江区阡陌路聚光物联网大楼C2211'
        },
        {
          deptCode: '002',
          deptName: '测试名称1',
          telephone: '0579-87455555',
          email: 'xxzz@xx.com',
          deptAddress: '永康西溪中心小学'
        }
      ],
      businessData: [],
      regionData: []
    };
  },
  methods: {
    onChangeBusiness(value) {
      console.log(value);
      this.form.business = value;
    },
    onChangeRegion(value) {
      console.log(value);
      this.form.region = value;
    },
    onChangeOpen() {
      this.$refs.dept.open();
    },
    onChangeOff() {
      this.$refs.dept.close();
    }
  }
};
</script>