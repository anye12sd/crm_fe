<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :loading="tableLoading"
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
      @on-additem="onAdditem"
      @on-arrangeitem="onArrangeitem"
      @on-addOk="onAddOk"
      @on-addCancel="onAddCancel"
      @on-statistics="showStatistics"
      @on-click-btn="onClickBtn"
      @on-change-table="handleTableChange"
      :operateBtnFixed="operateBtnFixed"
      :headerContentSelect="headerContentSelect"
      :pagination="pagination"
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
    <a-modal v-model="statisticsVisible" title="统计数据" on-ok="hideStatistics">
      <template slot="footer">
        <a-button type="primary" @click="hideStatistics">
          确定
        </a-button>
      </template>
      <p>共有{{this.pagination.total}}条数据</p>
    </a-modal>
  </a-layout>
</template>

<script>
import TableColumnSelectDrawer from "../../components/TableColumnSelectDrawer";
const columns = [
  {
    title: '处理时间',
    dataIndex: 'dealTime',
    key: 'dealTime'
  },
  {
    title: '主题',
    dataIndex: 'fdbkSubject',
    key: 'fdbkSubject',
    width: '40%',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '处理过程',
    dataIndex: 'dealResult',
    key: 'dealResult'
  },
  {
    title: '员工姓名',
    dataIndex: 'empName',
    key: 'empName'
  }
];
const queryColumns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name'
  }
];
import api from '@/api/feedback';
import user from '@/api/user';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';
import CollectionAdd from '@/components/details/CollectionAdd';
import MyQueryDrawer from '@/components/details/MyQueryDrawer';

export default {
  name: 'FdbkRslt',
  components: {TableColumnSelectDrawer, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer },
  data() {
    return {
      loading: false,
      tableLoading: false,
      originColumns: columns, //需要originColumns来重置新的columns，originColumns不可修改
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      tableData: [],
      queryColumns,
      modalTitle: '加入收藏',
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      headerContent: ['displaylist', 'select', 'excel', 'statistics', 'search'],
      buttons: ['view'],
      operateBtnFixed: true,
      visible: false,
      statisticsVisible: false,
      clientInforDetail: {},
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      headerContentSelect: [
        { label: 'dayNewChance', name: '今日处理过程', stopFlag: '2' },
        { label: 'weekNewChance', name: '本周处理过程', stopFlag: '1' },
        { label: 'monthNewChance', name: '本月处理过程', stopFlag: '1' }
      ],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      myQuery: '我的查询',
      btns: ['delete', 'star'],
      operateFixed: true,
      queryData: [],
    };
  },
  mounted() {
    this.getShowList()
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
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.page_size = pagination.pageSize;
      this.fetch();
    },
    fetch() {
      let params = {page: this.pagination.current}
      this.tableLoading = true;
      api
        .getFdbkresult(params)
        .then((res) => {
          console.log(res);
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows
            this.tableData.map(item => {
              item.link = '/service_management/fdbk_info_detail?code='+item.fdbkId
              item.dealTime = new Date(+new Date(item.dealTime) + 8 * 3600 * 1000)
                      .toISOString()
                      .replace(/T/g, ' ')
                      .replace(/\.[\d]{3}Z/, '');
            })
          }
          this.tableLoading = false;
        })
    },
    getShowList() {
      let params = {profileName: 'FDBKRSLT'}
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
    toSearch() {
      this.$refs.drawer.open();
    },
    showStatistics(){
      this.statisticsVisible = true
    },
    hideStatistics() {
      this.statisticsVisible = false
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
        profileName: 'FDBKRSLT',
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
                  this.columns = this.unSavedColumns
                  this.getShowList()
                  this.tableVisibleConfig = false
                  this.tableChildrenDrawer = false
                }
                this.loading = false;
              })
    },
    onDate(e) {
      console.log(e.target.value);
    },
    onDefault(value) {
      console.log(value);
    },
    onClickBtn(type, text, record, index) {
      this.$router.push({ path: '/service_management/fdbk_info_detail', query : {code: record.fdbkId}});
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