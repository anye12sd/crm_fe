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
      @on-add="toAdd"
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
      @on-click-btn="onClickBtn"
      @on-statistics="showStatistics"
      @on-change-table="handleTableChange"
      :operateBtnFixed="operateBtnFixed"
      :selectedRowKeys="selectedRowKeys"
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
const tableData = [
  {
    fdbkStatus: '新增',
    fdbkType: '服务',
    fdbkClassName: '',
    fdbkSeverity: '',
    fdbkSign: '',
    fdbkDueDate: '2019-12-31',
    fdbkDeptName: '',
    fdbkMngrEmpName: '陈红（星辰）',
    fdbkSubject: '合规布局-集团组建咨询',
    fdbkDescribe: '',
    fdbkResult: '',
    fdbkTargetName: '',
    fdbkTargetNameType: '',
    createTime: '2019-12-27 11:32',
    fdbkName: '刘国庆',
    groupNumber: '/',
    payment: '合规布局',
    feedbackCate: '项目跟进',
    progress: '2019.12.26咨询交付',
    link: '/service_management/fdbk_info_detail',
    link2: '/client_center/customer_info_detail'
  }
];
const columns = [
  {
    title: '状态',
    dataIndex: 'fdbkStatus',
    key: 'fdbkStatus',
    // sorter: (a, b) => (a.fdbkStatus > b.fdbkStatus ? 1 : -1)
  },
  {
    title: '反馈类型',
    dataIndex: 'fdbkType',
    key: 'fdbkType',
    // sorter: (a, b) => (a.fdbkType > b.fdbkType ? 1 : -1)
  },
  {
    title: '反馈分类',
    dataIndex: 'fdbkClassName',
    key: 'fdbkClassName',
    // sorter: (a, b) => (a.fdbkClassName > b.fdbkClassName ? 1 : -1)
  },
  {
    title: '标志',
    dataIndex: 'isHis',
    key: 'isHis',
    // sorter: (a, b) => (a.fdbkSign > b.fdbkSign ? 1 : -1)
  },
  {
    title: '重要性',
    dataIndex: 'fdbkSeverity',
    key: 'fdbkSeverity'
  },
  {
    title: '解决期限',
    dataIndex: 'fdbkDueDate',
    key: 'fdbkDueDate',
    // sorter: (a, b) => (a.fdbkDueDate > b.fdbkDueDate ? 1 : -1)
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName'
  },
  {
    title: '负责员工',
    dataIndex: 'fdbkMngrEmpName',
    key: 'fdbkMngrEmpName',
    // sorter: (a, b) => (a.fdbkMngrEmpName > b.fdbkMngrEmpName ? 1 : -1)
  },
  {
    title: '主题',
    dataIndex: 'fdbkSubject',
    key: 'fdbkSubject',
    width: '20%',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '描述',
    dataIndex: 'fdbkIntro',
    key: 'fdbkIntro'
  },
  {
    title: '处理结果',
    dataIndex: 'fdbkResult',
    key: 'fdbkResult'
  },
  {
    title: '反馈对象',
    dataIndex: 'fdbkTargetName',
    key: 'fdbkTargetName'
  },
  {
    title: '反馈对象类型',
    dataIndex: 'fdbkTargetType',
    key: 'fdbkTargetType'
  },
  {
    title: '反馈者类型',
    dataIndex: 'fdbkSrcType',
    key: 'fdbkSrcType'
  },
  {
    title: '反馈者名称',
    dataIndex: 'fdbkSrcName',
    key: 'fdbkSrcName',
    scopedSlots: { customRender: 'link2' }
  },
  {
    title: '反馈者电话',
    dataIndex: 'fdbkPhone',
    key: 'fdbkPhone'
  },
  {
    title: '反馈者邮件',
    dataIndex: 'fdbkEmail',
    key: 'fdbkEmail'
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
    title: '关闭时间',
    dataIndex: 'fdbkFinishTime',
    key: 'fdbkFinishTime'
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
  name: 'FdbkList',
  components: {TableColumnSelectDrawer, TableList, DrawerSearch, CollectionAdd, MyQueryDrawer },
  data() {
    return {
      loading: false,
      tableLoading: false,
      //需要originColumns来重置新的columns，originColumns不可修改
      originColumns: columns,
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      tableData,
      queryColumns,
      modalTitle: '加入收藏',
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      headerContent: [
        'add',
        'displaylist',
        'select',
        'excel',
        'statistics',
        'search',
        'customerCollect'
      ],
      buttons: ['view'],
      operateBtnFixed: true,
      visible: false,
      statisticsVisible: false,
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      clientInforDetail: {},
      headerContentSelect: [
        { label: 'dayNewChance', name: '今日新增反馈', stopFlag: '1' },
        { label: 'weekNewChance', name: '本周新增反馈', stopFlag: '1' },
        { label: 'monthNewChance', name: '本月新增反馈', stopFlag: '2' }
      ],
      selectedRowKeys: [],
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
        .getFdbk(params)
        .then((res) => {
          console.log(res);
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows
            this.tableData.map(item => {
              item.link = '/service_management/fdbk_info_detail?code='+item.fdbkId
              item.fdbkDueDate = item.fdbkDueDate ? new Date(+new Date(item.fdbkDueDate) + 8 * 3600 * 1000)
                              .toISOString()
                              .replace(/T/g, ' ')
                              .replace(/\.[\d]{3}Z/, '')
                      : "";
            })
          }
          this.tableLoading = false;
        })
    },
    getShowList() {
      let params = {profileName: 'FDBK'}
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
                  // for (let i = 0; i < this.originColumns.length; i++) {
                  //     if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
                  //         this.columns.push(this.originColumns[i]);
                  //     }
                  // }
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
        profileName: 'FDBK',
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
    toAdd() {
      this.$router.push({ path: '/service_management/fdbk_add' });
    },
    onClickBtn(type, text, record, index) {
      console.log(type, text, record, index);
      if(type == 'view'){
        this.$router.push({ path: '/service_management/fdbk_info_detail', query: { code: record.fdbkId } });
      }else if(type == 'delete'){
        this.deleteFdbk(record.fdbkId)
      }
    },
    deleteFdbk(id){
      console.log(345)
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
    showStatistics(){
      this.statisticsVisible = true
    },
    hideStatistics() {
      this.statisticsVisible = false
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
    onSelect(id) {
      this.selectedRowKeys = id;
    }
  }
};
</script>