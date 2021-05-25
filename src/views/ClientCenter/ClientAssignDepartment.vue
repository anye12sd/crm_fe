<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :loading="tableLoading"
      :hasRowHeaderSelect="true"
      :isCheckbox="true"
      :buttons="buttons"
      :headerContent="headerContent"
      :addTitle="addTitle"
      :FormAdd="FormAdd"
      :plainOptions="plainOptions"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-date="onDate"
      @on-default="onDefault"
      @on-additem="onAdditem"
      @on-arrangeitem="onArrangeitem"
      @on-addOk="onAddOk"
      @on-addCancel="onAddCancel"
      @on-change-table="onChangeTable"
      @on-row-select="tableSelect"
      :operateBtnFixed="operateBtnFixed"
      :pagination="pagination"
      :headerContentSelect="headerContentSelect"
      ref="client"
    >
    </table-list>
    <div class="change-box">
      <a-button size="small" style="margin-right: 6px" @click="checkSelected">查看选中</a-button>
      <a-button size="small" style="margin-right: 6px" @click="AssignChosen">选中分配</a-button>
      <a-button size="small" style="margin-right: 6px" @click="AssignAll"> 全部分配 </a-button>
      <a-button size="small" style="margin-right: 6px" @click="recoverChosen">选中回收</a-button>
      <a-button size="small" style="margin-right: 6px" @click="recoverAll">全部回收</a-button>
      <a-button size="small" @click="$router.go(-1)">退出</a-button>
    </div>
    <drawer-search ref="drawer"></drawer-search>
    <myQuery-drawer
      :loading="loading"
      :queryData="queryData"
      :queryColumns="queryColumns"
      :myQuery="myQuery"
      :btns="btns"
      :operateFixed="operateFixed"
      @on-close="toClose"
      @on-queryclick-btn="onQueryClick"
      ref="query"
    >
    </myQuery-drawer>
    <table-column-select-drawer
            :visibleConfig="tableVisibleConfig"
            :childrenDrawerProps="tableChildrenDrawer"
            :columns="columns"
            :checkedListProps="checkedList"
            @postShow="postShow"
            @hideDrawer="hideList"
    >
    </table-column-select-drawer>
    <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                     :data="modalAddData" @tableSelected="tableSelectedHandle" @on-select-change="onSelectChange"></modal-add-table>
  </a-layout>
</template>

<script>
  import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
  let modalAddTableParams = {
    modalTitle: '已选择客户',
    tableTitle: '已选择客户列表',
    hasRowHeaderSelect: false,
    hideCancelBtn: true,
    isCheckbox: false,
    headerContent: [],
    loading: false,
    showAdvanceBtn: false,
    headerSearchParams: [
      {
        type: 'input',
        labelName: '分类编码',
        placeholder: '请输入',
        paramsName: 'code'
      },
      {
        type: 'input',
        labelName: '产品分类',
        paramsName: 'category'
      },
      {
        type: 'input',
        labelName: '备注',
        paramsName: 'remark'
      },
      {
        type: 'select',
        labelName: '选择',
        options: [
          {label: '0', value: 'select1'},
          {label: '1', value: 'select2'},
        ],
      }
    ],
    pagination: {
      total: 0,
      current: 1,
      page_size: 10
    },
  }
  let modalAddColumns = [
    {
      title: '分类编码',
      dataIndex: 'prodClassCode',
      key: 'prodClassCode'
    },
    {
      title: '产品分类',
      dataIndex: 'prodClassName',
      key: 'prodClassName'
    },
  ]
const tableData = [
  {
    code: '123',
    accountName: '永康市佳辉工贸有限公司',
    clientName: '永康市佳辉工贸有限公司',
    email: '',
    telephone: '',
    address: '浙江省金华市永康市城西新区西塔三路5号',
    accountBalance: '9,800.00'
  }
];
  const columns = [
    {
      title: '状态',
      dataIndex: 'stopFlag',
      key: 'stopFlag',
      scopedSlots: { customRender: 'stopFlag' }
      // sorter: (a, b) => (a.status > b.status ? 1 : -1)
    },
    {
      title: '分类名称',
      key: 'friendClassName',
      dataIndex: 'friendClassName'
    },
    {
      title: '编码',
      key: 'friendCode',
      dataIndex: 'friendCode'
    },
    {
      title: '客户名',
      dataIndex: 'friendName',
      key: 'friendName',
      scopedSlots: { customRender: 'link' }
    },
    {
      title: '客户助记符',
      dataIndex: 'friendSimpleCode',
      key: 'friendSimpleCode'
    },
    {
      title: '最近联络时间',
      dataIndex: 'touchTime',
      key: 'touchTime'
    },
    {
      title: '识别方式',
      dataIndex: 'mode',
      key: 'mode'
    },
    {
      title: '识别号码',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '电子邮件',
      dataIndex: 'friendEmail',
      key: 'friendEmail'
    },
    {
      title: '网站主页',
      dataIndex: 'friendHomePage',
      key: 'friendHomePage'
    },
    {
      title: '电话',
      dataIndex: 'friendPhone',
      key: 'friendPhone'
    },
    {
      title: '传真',
      dataIndex: 'friendFax',
      key: 'friendFax'
    },
    {
      title: '移动电话',
      dataIndex: 'friendMobilePhone',
      key: 'friendMobilePhone'
    },
    {
      title: '详细地址',
      dataIndex: 'friendAddress',
      key: 'friendAddress'
    },
    {
      title: '邮编',
      dataIndex: 'friendZipCode',
      key: 'friendZipCode'
    },
    {
      title: '国家',
      dataIndex: 'friendCountry',
      key: 'friendCountry'
    },
    {
      title: '省份',
      dataIndex: 'friendProvince',
      key: 'friendProvince'
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: '创建人',
      dataIndex: 'createEmpName',
      key: 'createEmpName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '修改人',
      dataIndex: 'modifyEmpName',
      key: 'modifyEmpName'
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime'
    },
    {
      title: '客户来源',
      dataIndex: 'clientSource',
      key: 'clientSource'
    },
    {
      title: '付款信用',
      dataIndex: 'paymentCredit',
      key: 'paymentCredit'
    },
    {
      title: '营销模式',
      dataIndex: 'marketingmode',
      key: 'marketingmode'
    },
    {
      title: '价值等级',
      dataIndex: 'valueScales',
      key: 'valueScales'
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry'
    },
    {
      title: '反应特性',
      dataIndex: 'reactivity',
      key: 'reactivity'
    }
  ];
const queryColumns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name'
  }
];
import dept from '@/api/department';
import friend from '@/api/friend';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';
import MyQueryDrawer from '@/components/details/MyQueryDrawer';
import ModalAddTable from "../../components/ModalAddTable";

export default {
  name: 'ClientAssignDepartment',
  components: {TableColumnSelectDrawer, ModalAddTable, TableList, DrawerSearch, MyQueryDrawer },
  data() {
    return {
      loading: false,
      tableLoading: false,
      modalAddTableParams,
      modalAddColumns,
      modalAddData: [],
      //需要originColumns来重置新的columns，originColumns不可修改
      originColumns: columns,
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      tableData,
      headerContent: ['displaylist', 'select', 'excel', 'search'],
      buttons: [],
      operateBtnFixed: true,
      visible: false,
      checkedList: [],
      friendSelected: [],
      deptSelected: [],
      clientInforDetail: {},
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      headerContentSelect: [
        { label: 'dayNewChance', name: '今日新增客户', stopFlag: '1' },
        { label: 'weekNewChance', name: '本周新增客户', stopFlag: '2' },
        { label: 'monthNewChance', name: '本月新增客户', stopFlag: '1' }
      ],
      pagination: {
        total: 0,
        current: 1,
        page_size: 10
      },
      params: {
        //第几页
        page: 1
      },
      queryColumns,
      myQuery: '我的查询',
      btns: ['delete', 'star'],
      operateFixed: true,
      queryData: []
    };
  },
  mounted() {
    this.fetch();
    this.getShowList()
  },
  methods: {
    // 选中行
    customRow() {
      return {
        on: {
          click: (e) => {
            const oldList = document.querySelectorAll('.checked-td-of-add-table');
            if (oldList) {
              for (let j = 0; j < oldList.length; j++) {
                oldList[j].classList.remove('checked-td-of-add-table');
              }
            }
            const children = e.target.parentNode.children;
            for (let i = 0; i < children.length; i++) {
              children[i].classList.add('checked-td-of-add-table');
            }
          }
        }
      };
    },
    // 页码切换
    onChangeTable(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.page_size = pagination.page_size;
      this.fetch();
    },
    fetch() {
      let params = {page: this.pagination.current}
      this.tableLoading = true;
      friend
              .getFriendList(params)
        .then((res) => {
          console.log(res);
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows;
            this.tableData.map( (item) => {
              item.link = '/client_center/customer_info_detail?code=' + item.friendId
            })
          }
          this.tableLoading = false;
        })
    },
    getShowList(arr) {
      this.columns = []
      let k = 0
      this.checkedList = arr || ['friendClassName', 'friendName']
      // for (let i = 0; i < this.originColumns.length; i++) {
      //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
      //         this.columns.push(this.originColumns[i]);
      //     }
      // }
      console.log(this.checkedList)
      for (let i = 0; i < this.checkedList.length; i++) {
        for (let j = k; j < this.originColumns.length; j++)
          if (this.originColumns[j].dataIndex.includes(this.checkedList[i])) {
            this.columns.push(this.originColumns[j]);
            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
            k++
            break
            // this.originColumns.splice(j, 1)
            // j--
          }
      }
      // this.originColumns = this.columns.concat(this.originColumns)
    },
    // 客户详情
    showDrawer() {
      const oldList = document.querySelector('.checked-tr-of-add-table');
      if (oldList) {
        oldList.classList.remove('checked-tr-of-add-table');
      }
      const selectTr = event.path[3];
      selectTr.classList.add('checked-tr-of-add-table');
      this.visible = true;
      this.loading = true;
    },
    toDisplay() {
      this.tableVisibleConfig = true;
      this.loading = true;
    },
    hideList(){
      this.tableVisibleConfig = false
    },
    postShow(val){
      this.tableChildrenDrawer = true
      let arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].dataIndex);
      }
      this.loading = true
      let that = this
      setTimeout(function(){
        that.$message.success("修改成功")
        that.getShowList(arr)
        that.tableVisibleConfig = false
        that.tableChildrenDrawer = false
      }, 500)
    },
    toSearch() {
      this.$refs.drawer.open();
    },
    onDate(e) {
      console.log(e.target.value);
    },
    onDefault(value) {
      console.log(value);
    },
    onAdditem() {
      this.$refs.client.open();
    },
    onArrangeitem() {
      this.loading = true;
      this.$refs.query.queryopen();
      setTimeout(() => {
        this.queryData = this.headerContentSelect;
        this.loading = false;
      }, 500);
    },
    toClose() {
      this.$refs.query.queryclose();
    },
    onQueryClick(type, text, record, index) {
      if (record.stopFlag === '1') {
        for (let i = 0; i < this.queryData.length; i++) {
          this.queryData[i].stopFlag = '1';
        }
        record.stopFlag = '2';
      } else {
        for (let i = 0; i < this.queryData.length; i++) {
          this.queryData[i].stopFlag = '2';
        }
        record.stopFlag = '1';
      }
    },
    onAddOk() {
      this.$refs.client.close();
    },
    onAddCancel() {
      this.$refs.client.close();
    },
    tableSelect(val, flag){
      // flag为true时往this.friendSelected里面添加值，为false时根据friendId删除值
      if(flag){
        this.friendSelected.push(val)
      }else{
        this.friendSelected.splice(this.friendSelected.findIndex(item => item.friendId === val.friendId), 1)
      }
    },
    checkSelected(){
      if(!this.friendSelected.length){
        this.$message.error('当前未选中任何客户')
        return -1
      }
      this.modalAddTableParams = {
        modalTitle: '已选择客户',
        tableTitle: '已选择客户列表',
        hasRowHeaderSelect: false,
        hideCancelBtn: true,
        isCheckbox: false,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        okText: '确定',
        headerSearchParams: [],
        pagination: false
      }
      this.modalAddColumns = this.columns
      this.modalAddData = this.friendSelected
      this.$refs.tableAdd.open()
    },
    AssignChosen(){
      if(!this.friendSelected.length){
        this.$message.error('当前未选中任何客户')
        return -1
      }
      this.deptSelected = []
      this.modalAddTableParams = {
        modalTitle: '部门选择',
        tableTitle: '部门列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
          current: 1,
          total: 0,
          page_size: 10
        }
      }
      this.modalAddColumns = [
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        }
      ]
      this.$refs.tableAdd.open()
      this.modalAddTableParams.loading = true
      let params = {page: this.modalAddTableParams.pagination.current}
      dept
              .getDepartmentList(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  const pagination = { ...this.modalAddTableParams.pagination };
                  pagination.total = res.data.count;
                  this.modalAddTableParams.pagination = pagination;
                  this.modalAddData = res.data.rows;
                }
                this.modalAddTableParams.loading = false;
              })
    },
    AssignAll(){
      this.getDepartmentList = []
      this.modalAddTableParams = {
        modalTitle: '部门选择',
        tableTitle: '部门列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
          current: 1,
          total: 0,
          page_size: 10
        }
      }
      this.modalAddColumns = [
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        }
      ]
      this.$refs.tableAdd.open()
      this.modalAddTableParams.loading = true
      let params = {page: this.modalAddTableParams.pagination.current}
      dept
              .getDepartmentList(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  const pagination = { ...this.modalAddTableParams.pagination };
                  pagination.total = res.data.count;
                  this.modalAddTableParams.pagination = pagination;
                  this.modalAddData = res.data.rows;
                }
                this.modalAddTableParams.loading = false;
              })
    },
    recoverChosen(){
      if(!this.friendSelected.length){
        this.$message.error('当前未选中任何客户')
        return -1
      }
      this.deptSelected = []
      this.modalAddTableParams = {
        modalTitle: '部门选择',
        tableTitle: '部门列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
          current: 1,
          total: 0,
          page_size: 10
        }
      }
      this.modalAddColumns = [
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        }
      ]
      this.$refs.tableAdd.open()
      this.modalAddTableParams.loading = true
      let params = {page: this.modalAddTableParams.pagination.current}
      dept
              .getDepartmentList(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  const pagination = { ...this.modalAddTableParams.pagination };
                  pagination.total = res.data.count;
                  this.modalAddTableParams.pagination = pagination;
                  this.modalAddData = res.data.rows;
                }
                this.modalAddTableParams.loading = false;
              })
    },
    recoverAll(){
      this.deptSelected = []
      this.modalAddTableParams = {
        modalTitle: '部门选择',
        tableTitle: '部门列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [],
        pagination: {
          current: 1,
          total: 0,
          page_size: 10
        }
      }
      this.modalAddColumns = [
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        }
      ]
      this.$refs.tableAdd.open()
      this.modalAddTableParams.loading = true
      let params = {page: this.modalAddTableParams.pagination.current}
      dept
              .getDepartmentList(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  const pagination = { ...this.modalAddTableParams.pagination };
                  pagination.total = res.data.count;
                  this.modalAddTableParams.pagination = pagination;
                  this.modalAddData = res.data.rows;
                }
                this.modalAddTableParams.loading = false;
              })
    },
    tableSelectedHandle(val){
      if (!val.length) {
        return -1
      }
      console.log(val)
    },
    onSelectChange(val, flag) {
      // flag为true时往this.deptSelected里面添加值，为false时根据empId删除值
      if (flag) {
        this.deptSelected.push(val)
      } else {
        this.deptSelected.splice(this.deptSelected.findIndex(item => item.deptId === val.deptId), 1)
      }
    }
  }
};
</script>
<style scoped>
  .change-box {
    background: #fff;
    padding-left: 24px;
    padding-bottom: 24px;
  }
</style>