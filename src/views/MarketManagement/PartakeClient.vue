<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :buttons="buttons"
      :headerContent="headerContent"
      :addTitle="addTitle"
      :FormAdd="FormAdd"
      :plainOptions="plainOptions"
      @on-date="onDate"
      @on-default="onDefault"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-collect="toCollect"
      @on-select="onSelect"
      @on-additem="onAdditem"
      @on-arrangeitem="onArrangeitem"
      @on-addOk="onAddOk"
      @on-addCancel="onAddCancel"
      :operateBtnFixed="operateBtnFixed"
      :selectedRowKeys="selectedRowKeys"
      :headerContentSelect="headerContentSelect"
      ref="client"
    ></table-list>
    <drawer-search ref="drawer"></drawer-search>
    <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
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
  </a-layout>
</template>

<script>
import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
const tableData = [
  {
    sign: '',
    activityCategory: '',
    activityName: '',
    activityCode: '',
    startTime: '',
    endTime: '',
    clientName: '',
    categoryName: '',
    clientMnemonic: '',
    latestTime: '',
    IDMode: '',
    IDNumber: '',
    email: '',
    website: '',
    telephone: '',
    fax: '',
    address: '',
    postcode: '',
    country: '',
    province: '',
    city: ''
  }
];
const columns = [
  {
    title: '标志',
    dataIndex: 'sign',
    key: 'sign'
  },
  {
    title: '市场活动分类',
    dataIndex: 'activityCategory',
    key: 'activityCategory'
  },
  {
    title: '活动名称',
    dataIndex: 'activityName',
    key: 'activityName',
    sorter: (a, b) => (a.activityName > b.activityName ? 1 : -1)
  },
  {
    title: '活动代码',
    dataIndex: 'activityCode',
    key: 'activityCode',
    sorter: (a, b) => (a.activityCode > b.activityCode ? 1 : -1)
  },
  {
    title: '开始日期',
    dataIndex: 'startTime',
    key: 'startTime'
  },
  {
    title: '结束日期',
    dataIndex: 'endTime',
    key: 'endTime'
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    key: 'clientName'
  },
  {
    title: '分类名称',
    dataIndex: 'categoryName',
    key: 'categoryName'
  },
  {
    title: '客户助记符',
    dataIndex: 'clientMnemonic',
    key: 'clientMnemonic',
    sorter: (a, b) => (a.clientMnemonic > b.clientMnemonic ? 1 : -1)
  },
  {
    title: '最近联络时间',
    dataIndex: 'latestTime',
    key: 'latestTime'
  },
  {
    title: '识别方式',
    dataIndex: 'IDMode',
    key: 'IDMode'
  },
  {
    title: '识别号码',
    dataIndex: 'IDNumber',
    key: 'IDNumber'
  },
  {
    title: '电子邮件',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '网站主页',
    dataIndex: 'website',
    key: 'website'
  },
  {
    title: '电话',
    dataIndex: 'telephone',
    key: 'telephone'
  },
  {
    title: '传真',
    dataIndex: 'fax',
    key: 'fax'
  },
  {
    title: '详情地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '邮编',
    dataIndex: 'postcode',
    key: 'postcode'
  },
  {
    title: '国家',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province'
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city'
  }
];
const queryColumns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name'
  }
];
import user from '@/api/user';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';
import CollectionAdd from '@/components/details/CollectionAdd';
import MyQueryDrawer from '@/components/details/MyQueryDrawer';

export default {
  name: 'PartakeClient',
  components: {TableColumnSelectDrawer, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer },
  data() {
    return {
      loading: false,
      //需要originColumns来重置新的columns，originColumns不可修改
      originColumns: columns,
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      tableData,
      modalTitle: '加入收藏',
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      selectedRowKeys: [],
      headerContent: ['displaylist', 'select', 'excel', 'statistics', 'search', 'collect'],
      buttons: ['view', 'delete'],
      operateBtnFixed: true,
      visible: false,
      clientInforDetail: {},
      checkedList: [],
      headerContentSelect: [
        { label: 'thisMonthChance', name: '本月活动参与客户', stopFlag: '2' },
        { label: 'thisYearChance', name: '本年活动参与客户', stopFlag: '1' }
      ],
      queryColumns,
      myQuery: '我的查询',
      btns: ['delete', 'star'],
      operateFixed: true,
      queryData: []
    };
  },
  mounted() {
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
    getShowList() {
      let params = {profileName: 'CUSTCNCTCMPG'}
      this.loading = true;
      user
              .getMyShow(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  if(!res.data.profileContent.length){
                    return -1
                  }
                  this.columns = []
                  let k = 0
                  this.checkedList = res.data.profileContent
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
                }
                this.loading = false;
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
    // 删除客户
    showDel(text, record) {
      console.log(text, record);
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
      let params = {
        profileName: 'CUSTCNCTCMPG',
        profileContent: arr,
      }
      this.loading = true
      console.log(params)
      user.
      postMyShow(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  this.$message.success("修改成功")
                  this.getShowList()
                  this.tableVisibleConfig = false
                  this.tableChildrenDrawer = false
                }
                this.loading = false;
              })
    },
    onSelect(id) {
      this.selectedRowKeys = id;
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
    }
  }
};
</script>