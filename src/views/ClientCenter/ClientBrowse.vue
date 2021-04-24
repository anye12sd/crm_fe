<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :buttons="buttons"
      :headerContent="headerContent"
      :pagination="pagination"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-change-table="onChangeTable"
    ></table-list>
    <drawer-search ref="drawer"></drawer-search>
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
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '分类名称',
    dataIndex: 'friendClassId',
    key: 'friendClassId'
  },
  {
    title: '客户名',
    dataIndex: 'friendName',
    key: 'friendName',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '编码',
    dataIndex: 'friendCode',
    key: 'friendCode'
  },
  {
    title: '负责员工',
    dataIndex: 'staff',
    key: 'staff'
  },
  {
    title: '客户助记符',
    dataIndex: 'friendSimpleCode',
    key: 'friendSimpleCode'
  },
  {
    title: '电子邮件',
    dataIndex: 'friendEmail',
    key: 'friendEmail'
  },
  {
    title: '电话',
    dataIndex: 'friendPhone',
    key: 'friendPhone'
  }
];
import api from '@/api/friend';
import user from '@/api/user';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';

export default {
  name: 'ClientBrowse',
  components: {TableColumnSelectDrawer, TableList, DrawerSearch },
  data() {
    return {
      loading: false,
      tableData: [],
      //需要originColumns来重置新的columns，originColumns不可修改
      originColumns: columns,
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      checkedList: [],
      buttons: [],
      headerContent: ['displaylist', 'excel', 'search'],
      pagination: {
        total: 0,
        current: 1,
        page_size: 10,
        // showTotal: (total) => `共 ${total} 条数据`
      },
    };
  },
  mounted() {
    this.getShowList()
    this.fetch();
  },
  methods: {
    // 页码切换
    onChangeTable(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.page_size = pagination.pageSize;
      this.fetch();
    },
    fetch() {
      let params = {page: this.pagination.current}
      this.loading = true;
      api
        .getFriendList(params)
        .then((res) => {
          console.log(res);
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].friendClassId === 1) {
                this.tableData[i].friendClassId = '大客户';
                this.tableData[i].link = '/client_center/customer_info_detail?code=' + this.tableData[i].friendId;
              }
            }
          }
          this.loading = false;
        })
    },
    getShowList() {
      let params = {profileName: 'SCANCUST'}
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
                  console.log(this.originColumns)
                }
                this.loading = false;
              })
    },
    toDisplay() {
      this.tableVisibleConfig = true;
      this.loading = true;
    },
    toSearch() {
      this.$refs.drawer.open();
    },
    hideList(){
      this.tableVisibleConfig = false
    },
    showListRestore() {
      this.checkedList = [];
      // 还原需要隐藏的列，使用originColumns会全部打钩，使用columns会打钩已显示的内容
      for (let i = 0; i < this.columns.length; i++) {
        this.checkedList.push(this.columns[i].dataIndex);
      }
    },
    postShow(val){
      this.tableChildrenDrawer = true
      let arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].dataIndex);
      }
      let params = {
        profileName: 'SCANCUST',
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
  }
};
</script>

<style scoped></style>