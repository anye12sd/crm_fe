<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :loading="tableLoading"
      :hasRowHeaderSelect="true"
      :isCheckbox="true"
      :headerContent="headerContent"
      :addTitle="addTitle"
      :FormAdd="FormAdd"
      :plainOptions="plainOptions"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-collect="toCollect"
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
    ></table-list>
    <div class="change-box">
      <a-button size="small" style="margin-right: 6px" @click="checkSelected">查看选中</a-button>
      <a-button size="small" style="margin-right: 6px" @click="AssignChosen">分配给自己</a-button>
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
    <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
    <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                     :data="modalAddData" @tableSelected="tableSelectedHandle" @on-select-change="onSelectChange"></modal-add-table>
  </a-layout>
</template>

<script>  let modalAddTableParams = {
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
import friend from '@/api/friend';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';
import CollectionAdd from '@/components/details/CollectionAdd';
import MyQueryDrawer from '@/components/details/MyQueryDrawer';
import ModalAddTable from "../../components/ModalAddTable";

export default {
  name: 'ClientDistribution',
  components: { ModalAddTable, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer },
  data() {
    return {
      loading: false,
      tableLoading: false,
      modalAddTableParams,
      modalAddColumns,
      columns,
      tableData: [],
      modalTitle: '加入收藏',
      headerContent: ['select', 'search', 'collect'],
      visible: false,
      visibleConfig: false,
      childrenDrawer: false,
      operateBtnFixed: true,
      clientInforDetail: {},
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      headerContentSelect: [
        { label: 'dayNewChance', name: '今日新增客户', stopFlag: '2' },
        { label: 'weekNewChance', name: '本周新增客户', stopFlag: '1' },
        { label: 'monthNewChance', name: '本月新增客户', stopFlag: '1' }
      ],
      checkedKeys: [],
      friendSelected: [],
      queryColumns,
      myQuery: '我的查询',
      btns: ['delete', 'star'],
      operateFixed: true,
      queryData: [],
      pagination: {
        total: 0,
        current: 1,
        page_size: 10
      },
    };
  },
  mounted(){
    this.fetch();
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
      this.visibleConfig = true;
      this.loading = true;
    },
    onClose() {
      this.visibleConfig = false;
      this.loading = false;
    },
    showOrder() {
      this.childrenDrawer = true;
      this.loading = false;
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
      this.loading = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    toSearch() {
      this.$refs.drawer.open();
    },
    toCollect() {
      this.$refs.add.open();
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
      this.$message.success('点击了分配给自己')
    },
    tableSelectedHandle(val){
      if (!val.length) {
        return -1
      }
      console.log(val)
    },
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