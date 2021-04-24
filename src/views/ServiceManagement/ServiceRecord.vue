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
      @on-add="onAdd"
      @on-date="onDate"
      @on-default="onDefault"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-select="onSelect"
      @on-additem="onAdditem"
      @on-arrangeitem="onArrangeitem"
      @on-statistics="showStatistics"
      @on-addOk="onAddOk"
      @on-addCancel="onAddCancel"
      @on-click-btn="onClickBtn"
      @on-change-table="onChangeTable"
      :operateBtnFixed="operateBtnFixed"
      :selectedRowKeys="selectedRowKeys"
      :headerContentSelect="headerContentSelect"
      :pagination="pagination"
      ref="client"
    ></table-list>
    <a-modal
      :visible="visible"
      :title="modalTitle"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="查询"
      cancel-text="取消"
    >
      <a-form-model :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-descriptions title="反馈分类" bordered>
          <a-descriptions-item label="主题" :span="2">
            <a-input v-model="formData.theme" />
          </a-descriptions-item>
          <a-descriptions-item label="动作" :span="1">
            <a-select
              v-model="formData.variable"
              @change="statusChange"
              placeholder="请选择反馈分类"
              style="
                width: 250px;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              "
            >
              <a-select-option v-for="item in variable" :key="item.id">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="工作记录对象" :span="3">
            <a-input v-model="formData.workRecordObject" />
          </a-descriptions-item>
          <a-descriptions-item label="开始时间" :span="2">
            <a-date-picker
              v-model="formData.startValue"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="formData.endValue"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD HH:mm"
              placeholder="结束时间"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
          </a-descriptions-item>
          <a-descriptions-item label="部门名称" :span="1">
            <a-select
              v-model="formData.deptName"
              @change="deptNameChange"
              placeholder="请选择部门名称"
              style="
                width: 250px;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              "
            >
              <a-select-option v-for="item in deptName" :key="item.id">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="描述" :span="3">
            <a-input v-model="formData.describe" />
          </a-descriptions-item>
        </a-descriptions>
        <div>
          <a-button class="editable-add-btn" @click="costAdd" type="primary" size="small">
            新增
          </a-button>
          <a-table bordered :data-source="costData" :columns="costColumns">
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm
                title="删除当前数据？"
                ok-text="确认并删除"
                cancel-text="取消"
                @confirm="toClick(text, record, index)"
              >
                <a-button icon="delete"></a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
      </a-form-model>
    </a-modal>
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
    title: '开始时间',
    dataIndex: 'jrnlStartTime',
    key: 'jrnlStartTime',
    // sorter: (a, b) => a.jrnlStartTime > b.jrnlStartTime ? 1 : -1
  },
  {
    title: '结束时间',
    dataIndex: 'jrnlEndTime',
    key: 'jrnlEndTime',
    // sorter: (a, b) => a.jrnlEndTime > b.jrnlEndTime ? 1 : -1
  },
  {
    title: '动作',
    dataIndex: 'jrnlAction',
    key: 'jrnlAction',
    // sorter: (a, b) => a.action > b.action ? 1 : -1
  },
  {
    title: '主题',
    dataIndex: 'jrnlSubject',
    key: 'jrnlSubject',
    // sorter: (a, b) => a.jrnlSubject > b.jrnlSubject ? 1 : -1,
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '任务主题',
    dataIndex: 'missionTheme',
    key: 'missionTheme',
    // sorter: (a, b) => a.missionTheme > b.missionTheme ? 1 : -1
  },
  {
    title: '发生费用',
    dataIndex: 'occurAmount',
    key: 'occurAmount',
    // sorter: (a, b) => a.occurAmount > b.occurAmount ? 1 : -1
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
const costData = [];
const costColumns = [
  {
    title: 'costCode',
    dataIndex: 'costCode'
  },
  {
    title: 'costName',
    dataIndex: 'costName'
  },
  {
    title: 'occurFee',
    dataIndex: 'occurFee'
  },
  {
    title: 'summary',
    dataIndex: 'summary'
  }
];

import api from '@/api/jrnl';
import user from '@/api/user';
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';
import MyQueryDrawer from '@/components/details/MyQueryDrawer';

export default {
  name: 'ServiceRecord',
  components: {TableColumnSelectDrawer, TableList, DrawerSearch, MyQueryDrawer },
  data() {
    return {
      loading: false,
      tableLoading: false,
      //需要originColumns来重置新的columns，originColumns不可修改
      originColumns: columns,
      columns,
      tableVisibleConfig: false,
      tableChildrenDrawer: false,
      tableData: [],
      costData,
      costColumns,
      addTitle: '将当前查询加入到我的查询',
      plainOptions: ['日', '周', '月', '年'],
      FormAdd: [{ queryname: '', plainOptions: '' }],
      headerContent: ['add', 'displaylist', 'select', 'excel', 'statistics', 'search'],
      buttons: ['view'],
      operateBtnFixed: true,
      visible: false,
      statisticsVisible: false,
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      clientInforDetail: {},
      headerContentSelect: [
        { label: 'dayWorkRecord', name: '今日工作记录', stopFlag: '1' },
        { label: 'weekWorkRecord', name: '本周工作记录', stopFlag: '1' },
        { label: 'monthWorkRecord', name: '本月工作记录', stopFlag: '2' }
      ],
      selectedRowKeys: [],
      queryColumns,
      myQuery: '我的查询',
      modalTitle: '工作记录分类',
      formData: {
        startValue: null,
        endValue: null
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 17 },
      variable: [{ id: 0, title: '上门拜访' }],
      deptName: [
        { id: 0, title: '业务机构管理机构' },
        { id: 1, title: '亚设清洁总公司' },
        { id: 2, title: '亚设清洁市场部' },
        { id: 3, title: '亚设清洁销售部' },
        { id: 4, title: '亚设清洁服务部' },
        { id: 5, title: '亚设清洁财务部' },
        { id: 6, title: '亚设清洁技术部' }
      ],
      btns: ['delete', 'star'],
      operateFixed: true,
      queryData: [],
      endOpen: false,
      pagination: {
        total: 0,
        current: 1,
        page_size: 10
      },
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
    onChangeTable(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.page_size = pagination.page_size;
      this.fetch();
    },
    fetch() {
      let params = {page: this.pagination.current, type: '4'}
      this.tableLoading = true;
      api
        .getJrnlList(params)
        .then((res) => {
          console.log(res);
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows;
            this.tableData.map(item => {
              item.link = '/service_management/service_record_detail?code=' + item.jrnlId
            })
          }
          this.tableLoading = false;
        })
    },
    getShowList() {
      let params = {profileName: 'JRNL_SERVICE'}
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
    showStatistics(){
      this.statisticsVisible = true
    },
    hideStatistics() {
      this.statisticsVisible = false
    },
    // 删除客户
    showDel(text, record) {
      console.log(text, record);
    },
    toSearch() {
      this.$refs.drawer.open();
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
        profileName: 'JRNL_SERVICE',
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
      this.$router.push({ path: '/service_management/service_record_detail?code=' + record.jrnlId });
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
    disabledStartDate(startValue) {
      const endValue = this.formData.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.formData.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
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
    onAdd() {
      this.$router.push({ path: '/service_management/service_record_add' });
    },
    onAddOk() {
      this.$refs.client.close();
    },
    onAddCancel() {
      this.$refs.client.close();
    },
    onSelect(id) {
      this.selectedRowKeys = id;
    },
    statusChange(value) {
      console.log(value);
    },
    deptNameChange(value) {
      console.log(value);
    },
    costAdd() {},
    toClick(text, record, index) {
      console.log(text, record, index);
    },
    handleOk() {
      this.visible = false;
      this.$message.success("It's ok!");
    },
    handleCancel() {
      this.visible = false;
      this.$message.success("It's not ok!");
    }
  }
};
</script>