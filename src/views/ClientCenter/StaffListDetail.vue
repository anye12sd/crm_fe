<template>
  <staff-list
    :form="form"
    :sectionData="sectionData"
    :roleData="roleData"
    :sexData="sexData"
    :educationData="educationData"
    @on-change-mode="onChangeMode"
    @on-change-low="onChangeLow"
    @on-change-role="onChangeRole"
    @on-change-sex="onChangeSex"
    @on-change-education="onChangeEducation"
    @on-change-birthday="onChangeBirthday"
    @on-change-open="onChangeOpen"
    @on-change-off="onChangeOff"
    ref="staff"
  ></staff-list>
</template>

<script>
import StaffList from '@/components/details/StaffList';
export default {
  name: 'StaffListDetail',
  components: { StaffList },
  data() {
    return {
      form: {
        staffCode: '',
        mnemonicCode: '',
        staffName: '',
        IDCard: '',
        birthday: '',
        nativePlace: '',
        staffAddress: '',
        remarks: '',
        entryTime: '',
        departureTime: '',
        qq: '',
        nation: '',
        wechat: '',
        currentAddress: '',
        hobby: '',
        politicalOutlook: ''
      },
      sectionData: [
        { id: '0', title: '集团总公司' },
        { id: '1', title: '集团财务部' },
        { id: '2', title: '集团人力资源' },
        { id: '3', title: '机汇智能建站' },
        { id: '4', title: '东方五金网增值部' },
        { id: '5', title: '东方五金网营销部' },
        { id: '6', title: '东方五金网设计部' },
        { id: '7', title: '东方五金网人力资源' },
        { id: '8', title: '东方五金网运营部' },
        { id: '9', title: '机汇网总公司' },
        { id: '10', title: '机汇网网络营销事业部' }
      ],
      roleData: [
        { id: '0', title: '管理员' },
        { id: '1', title: '董事长' },
        { id: '2', title: '销售总监' },
        { id: '3', title: '服务总监' },
        { id: '4', title: '财务总监' },
        { id: '5', title: '技术总监' }
      ],
      sexData: [
        { id: '0', title: '未知' },
        { id: '1', title: '男' },
        { id: '2', title: '女' }
      ],
      educationData: [
        { id: '0', title: '无' },
        { id: '1', title: '中专' },
        { id: '2', title: '大专' },
        { id: '3', title: '本科' },
        { id: '4', title: '硕士' },
        { id: '5', title: '博士' },
        { id: '6', title: '博士后' }
      ]
    };
  },
  methods: {
    onChangeMode(value) {
      console.log(value);
      this.mode = value;
    },
    onChangeLow(value) {
      console.log(value);
      this.category = value;
    },
    onChangeRole(value) {
      console.log(value);
      this.category = value;
    },
    onChangeSex(value) {
      console.log(value);
      this.category = value;
    },
    onChangeEducation(value) {
      console.log(value);
      this.category = value;
    },
    onChangeBirthday(date, dateString) {
      console.log(date, dateString);
    },
    onChangeOpen() {
      this.$refs.staff.open();
    },
    onChangeOff() {
      this.$refs.staff.close();
    }
  }
};
</script>