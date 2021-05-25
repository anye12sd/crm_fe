<!--反馈信息详情-->
<template>
  <a-layout class="main-layout">
    <description-item
      :description="description"
      :descriptionEdit="descriptionEdit"
      :descriptionColumn="descriptionColumn"
    ></description-item>
    <div class="change-box">
      <a-button size="small" @click="onLock" style="margin-right: 6px">锁定</a-button>
      <a-button size="small" v-if="description.status == '已停止'" @click="onUnlock" style="margin-right: 6px">解锁</a-button>
      <a-button size="small" @click="$router.go(-1)">退出</a-button>
    </div>
    <category-tabs
      :usedTabs="usedTabs"
      :usedTabsColumns="tabsSelected"
      @on-callback="onCallback"
      @on-tabsSelect="tabsSelect"
      v-if="descriptionEdit ? false : true"
    ></category-tabs>
    <tabs-select-drawer
            :visibleConfig="tabsVisibleConfig"
            :childrenDrawerProps="tabsChildrenDrawer"
            :columns="originColumns"
            :checkedListProps="tabsCheckedList"
            @postShow="postShow"
            @hideDrawer="hideList"
    >
    </tabs-select-drawer>
  </a-layout>
</template>

<script>
import DescriptionItem from '../../components/DescriptionItem';
import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
import TabsSelectDrawer from "../../components/TabsSelectDrawer";
const usedTabs = ['费用', '联系人', '附件'];
const usedTabsColumns = {
  dealProcessColumns: {
    name: '费用',
    show: true,
    columns: [
      {
        title: '费用编码',
        dataIndex: 'costCode',
        key: 'costCode'
      },
      {
        title: '费用名称',
        dataIndex: 'costName',
        key: 'costName'
      },
      {
        title: '费用简码',
        dataIndex: 'costCodeSimple',
        key: 'costCodeSimple'
      },
      {
        title: '发生费用',
        dataIndex: 'realisedExpense',
        key: 'realisedExpense'
      },
      {
        title: '批准费用',
        dataIndex: 'approvalFee',
        key: 'approvalFee'
      },
      {
        title: '摘要',
        dataIndex: 'summary',
        key: 'summary'
      }
    ],
    buttons: [],
    operateBtnFixed: true,
    headerContent: []
  },
  contactListColumns: {
    name: '联系人',
    show: true,
    columns: [
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName'
      },
      {
        title: '客户名',
        dataIndex: 'customerName',
        key: 'customerName'
      },
      {
        title: '联系人部门',
        dataIndex: 'contactDepartment',
        key: 'contactDepartment'
      },
      {
        title: '职务',
        dataIndex: 'duty',
        key: 'duty'
      },
      {
        title: '电子邮件',
        dataIndex: 'Email',
        key: 'Email'
      },
      {
        title: '办公电话',
        dataIndex: 'officeLine',
        key: 'officeLine'
      },
      {
        title: '移动电话',
        dataIndex: 'mobileLine',
        key: 'mobileLine'
      }
    ],
    buttons: ['view', 'delete'],
    operateBtnFixed: true,
  },
  relatedMissionColumns: {
    name: '附件',
    show: true,
    columns: [
      {
        title: '附件名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '附件描述',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: '附件大小',
        dataIndex: 'annexByte',
        key: 'annexByte'
      },
      {
        title: '上载员工',
        dataIndex: 'uploadEmployee',
        key: 'uploadEmployee'
      },
      {
        title: '锁定员工',
        dataIndex: 'lockEmployee',
        key: 'lockEmployee'
      }
    ],
    operateBtnFixed: true,
    headerContent: [],
    buttons: ['view']
  }
};
const description = {
  theme: '少林寺驻武当山办事处大神父王喇嘛',
  action: '上门拜访',
  workReportTarget: '费用简码',
  memberName: '1000.0',
  startDate: '2021-1-25 14:22:20',
  endDate: '2021-1-25 14:42:27',
  createTime: '2021-1-25 14:42:47',
  departmentName: '业务机构管理机构',
  occurFee: '',
  changeTime: '2021-1-25 14:43:02',
  approvalFee: '',
  approver: '',
  description: ''
};

export default {
  name: 'FdbkInfoDetail',
  components: {TabsSelectDrawer, CategoryTabs, DescriptionItem },
  data() {
    return {
      //对象
      description,
      // 对象按顺序排列的数组
      descriptionColumn: [
        { name: 'theme', span: 2 },
        { name: 'action', span: 1 },
        { name: 'workReportTarget', span: 2 },
        { name: 'memberName', span: 1 },
        { name: 'startDate', span: 1 },
        { name: 'endDate', span: 1 },
        { name: 'createTime', span: 1 },
        { name: 'departmentName', span: 1 },
        { name: 'occurFee', span: 1 },
        { name: 'changeTime', span: 1 },
        { name: 'approvalFee', span: 1 },
        { name: 'approver', span: 2 },
        { name: 'description', span: 3 }
      ],
      descriptionEdit: false,
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns,
      pane: null,
      // tabs选择参数
      tabsVisibleConfig: false,
      tabsChildrenDrawer: false,
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      tabsCheckedList: [],
      originColumns: [],
      columns: [],
      loading: false,
      tabsSelected: {},
      checkedAAAAA: ['dealProcessColumns'],
      // tabs选择参数结束
    };
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.getShowList()
    this.getOriginColumns()
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
    getParams() {
      const that = this;
      // 取到路由带过来的参数
      const routerParams = this.$route.query;
      // 将数据放在当前组件的数据内
      console.log(routerParams);
      if (routerParams.add === '1') {
        that.descriptionEdit = true;
        that.description = {};
      }
    },
    onLock (){

    },
    onCallback(value) {
      this.pagination.current = 1
      this.pane = value;
    },
    tabsSelect() {
      this.tabsVisibleConfig = true;
    },
    getShowList(arr) {
      let obj = {}
      this.tabsCheckedList = arr || this.checkedAAAAA
      for (let i = 0; i < this.tabsCheckedList.length; i++) {
        for (let key in this.usedTabsColumns) {
          if (key == this.tabsCheckedList[i]) {
            obj[key] = this.usedTabsColumns[key]
          }
        }
      }
      this.tabsSelected = obj
    },
    getOriginColumns() {
      this.originColumns = []
      let usedTabsColumns = this.usedTabsColumns
      for (let key in usedTabsColumns) {
        this.originColumns.push({dataIndex: key, title: usedTabsColumns[key].name})
      }
      this.columns = []
      let k = 0
      for (let i = 0; i < this.tabsCheckedList.length; i++) {
        for (let j = k; j < this.originColumns.length; j++)
          if (this.originColumns[j].dataIndex.includes(this.tabsCheckedList[i])) {
            this.columns.push(this.originColumns[j]);
            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
            k++
            break
            // this.originColumns.splice(j, 1)
            // j--
          }
      }
      console.log(this.originColumns)
    },
    hideList(){
      this.tabsVisibleConfig = false
    },
    postShow(val) {
      this.tabsChildrenDrawer = true
      let arr = []
      let obj = {}
      for (let i = 0; i < val.length; i++) {
        for (let key in this.usedTabsColumns) {
          if (key == val[i].dataIndex) {
            obj[key] = this.usedTabsColumns[key]
            arr.push(key)
          }
        }
      }
      this.tabsSelected = obj
      let that = this
      setTimeout(function(){
        that.$message.success("修改成功")
        that.getShowList(arr)
        that.getOriginColumns(arr)
        that.tabsVisibleConfig = false
        that.tabsChildrenDrawer = false
      }, 500)
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: 'getParams'
  }
};
</script>

<style scoped>
  .change-box {
    background: #fff;
    padding-left: 24px;
  }
</style>