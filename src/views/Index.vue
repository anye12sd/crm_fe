<template>
  <div class="main-layout-flex flex">
    <div class="flex-1">
      <a-layout class="main-layout">
        <template v-for="(item) in columns">
          <div :key="item.title" v-if="item.title.includes('消息中心')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :hasRowHeaderSelect="false"
              :isCheckbox="true"
              :columns="messageColumns"
              :table-data="messageData"
              :headerContent="headerContentWithAdd"
              :pagination="msgPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('邮件中心')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="mailColumns"
              :table-data="mailData"
              :headerContent="headerContentWithAdd"
                    :pagination="mailPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('我的报表')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="myTableColumns"
              :table-data="myTableData"
              :headerContent="headerContent"
                    :pagination="tablePagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('我的任务')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="missionColumns"
              :table-data="missionData"
              :headerContent="headerContent"
                    :pagination="missionPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('我的反馈')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="feedbackColumns"
              :table-data="feedbackData"
              :headerContent="headerContent"
                    :pagination="feedbackPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('我的销售机会')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="salesChanceColumns"
              :table-data="salesChanceData"
              :headerContent="headerContent"
                    :pagination="salesPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div :key="item.title" v-if="item.title.includes('我的订单')">
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="myOrderColumns"
              :table-data="myOrderData"
              :headerContent="headerContent"
                    :pagination="myOrderPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div
            :key="item.title"
            v-if="item.title.includes('重要提示')"
            class="main-layout-table-noHeader"
          >
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="hintColumns"
              :table-data="hintData"
              :headerContent="headerContent"
                    :pagination="hintPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div
            :key="item.title"
            v-if="item.title.includes('我的日程')"
            class="main-layout-table-noHeader"
          >
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="scheduleColumns"
              :table-data="scheduleData"
              :headerContent="headerContent"
                    :pagination="schedulePagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div
            :key="item.title"
            v-if="item.title.includes('我的待办事宜')"
            class="main-layout-table-noHeader"
          >
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="todoListColumns"
              :table-data="todoListData"
              :headerContent="headerContent"
                    :pagination="todoPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
          <div
            :key="item.title"
            v-if="item.title.includes('讨论组')"
            class="main-layout-table-noHeader"
          >
            <p class="main-layout-title">{{ item.title }}</p>
            <table-list
                    :hidePage="hidePage"
              :columns="discussColumns"
              :table-data="discussData"
              :headerContent="headerContent"
                    :pagination="discussPagination"
              @on-click-btn="childBtnClicked"
            ></table-list>
          </div>
        </template>
      </a-layout>
    </div>
    <div class="main-layout-right">
      <div class="card-setting">
        <a-card :bordered="false" style="width: 248px">
          <div>
            <a-button @click="showSettingDrawer">快速设置</a-button>
          </div>
        </a-card>
      </div>
      <template v-for="(item) in columns">
        <div :key="item.title" v-if="item.title.includes('快速查询/新增')">
          <div>
            <a-card title="快速查询" :bordered="false" style="width: 248px; margin-top: 15px">
              <a-select default-value="a1" style="width: 200px" @change="quickSearch">
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
              <a-input placeholder="Basic usage" style="width: 200px; margin-top: 15px" />
              <div>
                <a-button style="margin-top: 15px; float: right">确定</a-button>
              </div>
            </a-card>
          </div>
          <div>
            <a-card title="快速新增" :bordered="false" style="width: 248px; margin-top: 15px">
              <a-select default-value="a1" style="width: 200px" @change="quickAdd">
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
              <a-select
                default-value="a1"
                style="width: 200px; margin-top: 15px"
                @change="quickAdd"
              >
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
              <div>
                <a-button style="margin-top: 15px; float: right">确定</a-button>
              </div>
            </a-card>
          </div>
        </div>
      </template>
    </div>
    <a-drawer
      class="hide-control-drawer client-drawer"
      title="我的显示"
      width="35%"
      placement="right"
      :visible="visibleConfig"
      @close="onClose"
    >
      <a-checkbox
        class="check-all-button"
        :indeterminate="indeterminate"
        :checked="checkAll"
        @change="onCheckAllChange"
      >
        全选
      </a-checkbox>
      <a-checkbox-group v-model="checkedList" @change="checkShowColumn">
        <template v-for="item in originColumns">
          <div :key="item.title" class="checkbox-box">
            <a-checkbox :value="item.dataIndex">
              {{ item.title }}
            </a-checkbox>
          </div>
        </template>
      </a-checkbox-group>
      <a-drawer
              title="字段排序 "
              width="40%"
              :visible="childrenDrawer"
              @close="onChildrenDrawerClose"
      >
        <a-table
                :rowKey="unSavedColumns.title"
                :loading="loading"
                :columns="columnsChildren"
                :data-source="unSavedColumns"
                :pagination="false"
                :customRow="customRow"
        >
          <template slot="e" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
          <template slot="actionChildren" slot-scope="text, record, index">
            <a-button-group>
              <a-tooltip title="上移">
                <a-button icon="arrow-up" size="small" @click="moveUp(index)"></a-button>
              </a-tooltip>
              <a-tooltip title="下移">
                <a-button icon="arrow-down" size="small" @click="moveDown(index)"></a-button>
              </a-tooltip>
              <a-tooltip title="移至最前">
                <a-button icon="vertical-align-top" size="small" @click="moveTop(index)"></a-button>
              </a-tooltip>
              <a-tooltip title="移至最后">
                <a-button
                        icon="vertical-align-bottom"
                        size="small"
                        @click="moveBottom(index)"
                ></a-button>
              </a-tooltip>
              <!-- <a-tooltip title="删除">
              <a-popconfirm
                title="删除当前数据？"
                ok-text="确认并删除"
                cancel-text="取消"
                @confirm="showDel(text, record, index)"
              >
                <a-button icon="delete" size="small"></a-button>
              </a-popconfirm>
            </a-tooltip> -->
            </a-button-group>
          </template>
        </a-table>
        <div
                :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'left',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }"
        >
          <a-button style="margin-right: 8px" @click="postShow"> 保存</a-button>
          <a-button @click="onChildrenDrawerClose"> 取消</a-button>
        </div>
      </a-drawer>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'left',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }"
      >
        <a-button style="margin-right: 8px" @click="showList"> 下一步</a-button>
        <a-button style="margin-right: 8px" @click="showListRestore"> 还原默认</a-button>
        <a-button @click="hideList"> 取消</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import TableList from '@/components/TableList';
import msg from '@/api/message';
const columns = [
  {
    dataIndex: 'msgCenter',
    title: '消息中心'
  },
  {
    dataIndex: 'mailCenter',
    title: '邮件中心'
  },
  {
    dataIndex: 'mySheet',
    title: '我的报表'
  },
  {
    dataIndex: 'myTask',
    title: '我的任务'
  },
  {
    dataIndex: 'myFeedback',
    title: '我的反馈'
  },
  {
    dataIndex: 'mySalesChance',
    title: '我的销售机会'
  },
  {
    dataIndex: 'hint',
    title: '重要提示'
  },
  {
    dataIndex: 'mySchedule',
    title: '我的日程'
  },
  {
    dataIndex: 'myToDo',
    title: '我的待办事宜'
  },
  {
    dataIndex: 'discuss',
    title: '讨论组'
  },
  {
    dataIndex: 'myOrder',
    title: '我的订单'
  },
  {
    dataIndex: 'fastSearch',
    title: '快速查询/新增'
  }
];
const messageData = [];
const messageColumns = [
  {
    title: 'new',
    dataIndex: 'noticeRead',
    key: 'noticeRead',
    scopedSlots: {customRender: 'noticeRead'}
  },
  {
    title: '内容',
    dataIndex: 'noticeMemo',
    key: 'noticeMemo'
  },
  {
    title: '附件',
    dataIndex: 'annex',
    key: 'annex'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '主题',
    dataIndex: 'noticeSubject',
    key: 'noticeSubject',
    width: '40%',
    scopedSlots: { customRender: 'link' }
  }
];
const mailData = [
  // { new: 'new', Priority: '', annex: '附件1', date: '2020-12-31', theme: '主题' },
  // { new: 'new', Priority: '', annex: '附件1', date: '2020-12-31', theme: '主题' },
  // { new: 'new', Priority: '', annex: '附件1', date: '2020-12-31', theme: '主题' },
  // { new: 'new', Priority: '', annex: '附件1', date: '2020-12-31', theme: '主题' },
  // { new: 'new', Priority: '', annex: '附件1', date: '2020-12-31', theme: '主题' }
];
const mailColumns = [
  {
    title: '未读',
    dataIndex: 'new',
    key: 'new'
  },
  {
    title: '优先级',
    dataIndex: 'Priority',
    key: 'Priority'
  },
  {
    title: '接收时间',
    dataIndex: 'receiveTime',
    key: 'receiveTime'
  },
  {
    title: '主题',
    dataIndex: 'theme',
    key: 'theme',
    width: '40%'
  },
  {
    title: '发件人姓名',
    dataIndex: 'name',
    key: 'name'
  }
];
const myTableData = [
  // { time: 'new', name: '', description: '附件1', creator: '2020-12-31' },
  // { time: 'new', name: '', description: '附件1', creator: '2020-12-31' },
  // { time: 'new', name: '', description: '附件1', creator: '2020-12-31' },
  // { time: 'new', name: '', description: '附件1', creator: '2020-12-31' },
  // { time: 'new', name: '', description: '附件1', creator: '2020-12-31' }
];
const myTableColumns = [
  {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '报表名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator'
  }
];
const missionData = [
  // { deadline: 'new', stage: '', theme: '附件1', target: '2020-12-31' },
  // { deadline: 'new', stage: '', theme: '附件1', target: '2020-12-31' },
  // { deadline: 'new', stage: '', theme: '附件1', target: '2020-12-31' },
  // { deadline: 'new', stage: '', theme: '附件1', target: '2020-12-31' },
  // { deadline: 'new', stage: '', theme: '附件1', target: '2020-12-31' }
];
const missionColumns = [
  {
    title: '完成期限',
    dataIndex: 'deadline',
    key: 'deadline'
  },
  {
    title: '任务阶段',
    dataIndex: 'stage',
    key: 'stage'
  },
  {
    title: '任务主题',
    dataIndex: 'theme',
    key: 'theme',
    width: '40%'
  },
  {
    title: '任务对象',
    dataIndex: 'target',
    key: 'target'
  }
];
const feedbackData = [
  // {
  //   deadline: 'new',
  //   important: '',
  //   theme: '附件1',
  //   name: '2020-12-31',
  //   link: '/TempDirectory/FeedbackInfoDetail'
  // },
  // {
  //   deadline: 'new',
  //   important: '',
  //   theme: '附件1',
  //   name: '2020-12-31',
  //   link: '/TempDirectory/FeedbackInfoDetail'
  // },
  // {
  //   deadline: 'new',
  //   important: '',
  //   theme: '附件1',
  //   name: '2020-12-31',
  //   link: '/TempDirectory/FeedbackInfoDetail'
  // },
  // {
  //   deadline: 'new',
  //   important: '',
  //   theme: '附件1',
  //   name: '2020-12-31',
  //   link: '/TempDirectory/FeedbackInfoDetail'
  // },
  // {
  //   deadline: 'new',
  //   important: '',
  //   theme: '附件1',
  //   name: '2020-12-31',
  //   link: '/TempDirectory/FeedbackInfoDetail'
  // }
];
const feedbackColumns = [
  {
    title: '完成期限',
    dataIndex: 'deadline',
    key: 'deadline'
  },
  {
    title: '重要性',
    dataIndex: 'important',
    key: 'important'
  },
  {
    title: '主题',
    dataIndex: 'theme',
    key: 'theme',
    width: '40%',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '反馈者名称',
    dataIndex: 'name',
    key: 'name'
  }
];
const salesChanceData = [
  // { createTime: 'new', theme: '附件1', name: '2020-12-31' },
  // { createTime: 'new', theme: '附件1', name: '2020-12-31' },
  // { createTime: 'new', theme: '附件1', name: '2020-12-31' },
  // { createTime: 'new', theme: '附件1', name: '2020-12-31' },
  // { createTime: 'new', theme: '附件1', name: '2020-12-31' }
];
const salesChanceColumns = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '主题',
    dataIndex: 'important',
    key: 'important',
    width: '40%'
  },
  {
    title: '客户/伙伴名称',
    dataIndex: 'name',
    key: 'name'
  }
];
const myOrderData = [
  // { time: 'new', code: '附件1', summary: '2020-12-31', name: 'hk' },
  // { time: 'new', code: '附件1', summary: '2020-12-31', name: 'hk' },
  // { time: 'new', code: '附件1', summary: '2020-12-31', name: 'hk' },
  // { time: 'new', code: '附件1', summary: '2020-12-31', name: 'hk' },
  // { time: 'new', code: '附件1', summary: '2020-12-31', name: 'hk' }
];
const myOrderColumns = [
  {
    title: '订单日期',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '订单编号',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '订单摘要',
    dataIndex: 'summary',
    key: 'summary'
  },
  {
    title: '客户/伙伴名称',
    dataIndex: 'name',
    key: 'name'
  }
];
const hintData = [{ hint: '做对的事情比把事情作对跟重要。' }];
const hintColumns = [
  {
    title: '',
    dataIndex: 'hint',
    key: 'hint'
  }
];
const scheduleData = [
  // { date: '00.00', content: '这是测试日程' },
  // { date: '00.00', content: '这是测试日程' }
];
const scheduleColumns = [
  {
    title: '',
    dataIndex: 'date',
    key: 'date',
    width: 200
  },
  {
    title: '',
    dataIndex: 'content',
    key: 'content'
  }
];
const todoListData = [
  // { date: '2020-08-14', content: '补卡申请', link: '/TempDirectory/ToDoListDetail' },
  // { date: '2020-08-14', content: '补卡申请', link: '/TempDirectory/ToDoListDetail' }
];
const todoListColumns = [
  {
    title: '',
    dataIndex: 'date',
    key: 'date',
    width: 200
  },
  {
    title: '',
    dataIndex: 'content',
    key: 'content',
    scopedSlots: { customRender: 'link' }
  }
];
const discussData = [
  // { content: '补卡申请', link: '/TempDirectory/DiscussList' },
  // { content: '补卡申请', link: '/TempDirectory/DiscussList' }
];
const discussColumns = [
  {
    title: '',
    dataIndex: 'content',
    key: 'content',
    scopedSlots: { customRender: 'link' }
  }
];

export default {
  name: 'Index',
  components: { TableList },
  data() {
    return {
      loading: false,
      originColumns: columns,
      unSavedColumns: [],
      columns,
      messageData,
      messageColumns,
      mailData,
      mailColumns,
      myTableData,
      myTableColumns,
      missionData,
      missionColumns,
      feedbackData,
      feedbackColumns,
      salesChanceData,
      salesChanceColumns,
      myOrderData,
      myOrderColumns,
      hintData,
      hintColumns,
      scheduleData,
      scheduleColumns,
      todoListData,
      todoListColumns,
      discussData,
      discussColumns,
      hidePage: true,
      headerContent: ['more'],
      headerContentWithAdd: ['rightAdd', 'more'],
      checkedListCache: [], //checkboxgroup已选中但是未点击保存的缓存项
      checkedList: ['msgCenter'], //checkboxgroup里需要默认选中的项
      operateBtnFixed: true,
      visible: false,
      checkedKeys: [],
      visibleConfig: false,
      childrenDrawer: false,
      columnsChildren: [
        {
          title: '序号',
          key: 'index',
          dataIndex: 'index',
          scopedSlots: { customRender: 'e' }
        },
        {
          title: '字段名',
          dataIndex: 'title',
          key: 'title',
          scopedSlots: { customRender: 'title' }
        },
        {
          title: '操作',
          dataIndex: 'actionChildren',
          key: 'actionChildren',
          scopedSlots: { customRender: 'actionChildren' }
        }
      ],
      indeterminate: true,
      checkAll: true,
      msgPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.msgPaginationChange,
      },
      discussPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.discussPaginationChange,
      },
      todoPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.todoPaginationChange,
      },
      schedulePagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.schedulePaginationChange,
      },
      hintPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.hintPaginationChange,
      },
      myOrderPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.myOrderPaginationChange,
      },
      salesPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.salesPaginationChange,
      },
      feedbackPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.feedbackPaginationChange,
      },
      missionPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.missionPaginationChange,
      },
      tablePagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.tablePaginationChange,
      },
      mailPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        onShowSizeChange: this.mailPaginationChange,
      },
    };
  },
  mounted() {
    this.getShowList()
  },
  methods: {
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
    showSettingDrawer() {
      this.visibleConfig = true;
      if(this.checkedList.length){
        return -1
      }
      // for (let i = 0; i < this.columns.length; i++) {
      //   this.checkedList.push(this.columns[i].dataIndex);
      // }
      this.loading = true;
    },
    onClose() {
      this.visibleConfig = false;
      this.loading = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    onCheckAllChange(e) {
      let checkList = [];
      for (let i = 0; i < this.originColumns.length; i++) {
        checkList.push(this.originColumns[i].dataIndex);
      }
      console.log(checkList);
      Object.assign(this, {
        checkedList: e.target.checked ? checkList : [],
        checkedListCache: e.target.checked ? checkList : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    },
    checkShowColumn(checkedList) {
      // 现将checkedListCache保存起来,在点击取消的时候重置为空数组，点击保存则存到this.checkedList里
      this.checkedListCache = checkedList;
      this.indeterminate = !!checkedList.length && checkedList.length < this.originColumns.length;
      this.checkAll = checkedList.length === this.originColumns.length;
    },
    getShowList() {
      this.columns = []
      let k = 0
      for (let i = 0; i < this.checkedList.length; i++) {
        for (let j = k; j < this.originColumns.length; j++)
          if (this.originColumns[j].dataIndex.includes(this.checkedList[i])) {
            this.columns.push(this.originColumns[j]);
            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
            k++
            break
          }
      }
      this.getTableData()
      console.log(this.columns)
    },
    showList() {
      this.unSavedColumns = [];
      // 保存需要显示的table 列
      // this.checkedList = this.checkedListCache;
      for (let i = 0; i < this.originColumns.length; i++) {
        if (this.checkedList.includes(this.originColumns[i].dataIndex)) {
          this.unSavedColumns.push(this.originColumns[i]);
        }
      }
      console.log(this.unSavedColumns)
      this.showOrderDrawer()
    },
    hideList() {
      this.checkedListCache = [];
      this.visibleConfig = false;
    },
    postShow(){
      let arr = []
      for (let i = 0; i < this.unSavedColumns.length; i++) {
        arr.push(this.unSavedColumns[i].dataIndex);
      }
      this.$message.success("修改成功")
      this.checkedList = arr
      this.getShowList()
      this.visibleConfig = false
      this.childrenDrawer = false
    },
    showListRestore() {
      this.checkedList = [];
      // 还原需要隐藏的列，使用originColumns会全部打钩，使用columns会打钩已显示的内容
      for (let i = 0; i < this.columns.length; i++) {
        this.checkedList.push(this.columns[i].dataIndex);
      }
    },
    showOrderDrawer() {
      this.childrenDrawer = true;
      this.loading = false;
    },
    onChildrenDrawerClose() {
      // this.checkedList = []
      // for(let i = 0; i < this.columns.length; i++){
      //     this.checkedList.push(this.columns[i].title)
      // }
      // console.log(this.checkedList)
      this.childrenDrawer = false;
      this.loading = false;
    },
    moveUp(index) {
      if (index == 0) {
        return false;
      }
      this.unSavedColumns.splice(
        index - 1,
        1,
        ...this.unSavedColumns.splice(index, 1, this.unSavedColumns[index - 1])
      ); //将第一个值和第二个值对换
    },
    moveDown(index) {
      if (index + 1 == this.columns.length) {
        return false;
      }
      this.unSavedColumns.splice(
        index + 1,
        1,
        ...this.unSavedColumns.splice(index, 1, this.unSavedColumns[index + 1])
      ); ////将第二个值和第一个值对换
    },
    moveTop(index) {
      if (index == 0) {
        return false;
      }
      this.unSavedColumns.unshift(this.unSavedColumns.splice(index, 1)[0]);
    },
    moveBottom(index) {
      if (index + 1 == this.unSavedColumns.length) {
        return false;
      }
      this.unSavedColumns.push(this.unSavedColumns.splice(index, 1)[0]);
    },
    childBtnClicked(type, text, record, index) {
      if (type == 'view') {
        this.$router.push({ path: '/resource_center/product_info_detail' });
      }
    },
    quickSearch(value) {
      console.log(`selected ${value}`);
    },
    quickAdd(value) {
      console.log(`selected ${value}`);
    },
    getTableData(){
      console.log(this.checkedList)
      if(this.checkedList.includes('msgCenter') && !this.messageData.length){
        this.getMsgCenterData()
      }
      if(this.checkedList.includes('mailCenter') && !this.mailData.length){
        this.getMailData()
      }
      if(this.checkedList.includes('mySheet') && !this.myTableData.length){
        this.getSheetData()
      }
      if(this.checkedList.includes('myTask') && !this.missionData.length){
        this.getMissionData()
      }
      if(this.checkedList.includes('myFeedback') && !this.feedbackData.length){
        this.getFeedbackData()
      }
      if(this.checkedList.includes('mySalesChance') && !this.salesChanceData.length){
        this.getSalesChanceData()
      }
      if(this.checkedList.includes('hint') && !this.hintData.length){
        this.getHintData()
      }
      if(this.checkedList.includes('mySchedule') && !this.scheduleData.length){
        this.getScheduleData()
      }
      if(this.checkedList.includes('myToDo') && !this.todoListData.length){
        this.getTodoListData()
      }
      if(this.checkedList.includes('discuss') && !this.discussData.length){
        this.getDiscussData()
      }
      if(this.checkedList.includes('myOrder') && !this.myOrderData.length){
        this.getOrderData()
      }
    },
    msgPaginationChange(current, pageSize){
      this.msgPagination.pageSize = pageSize
      this.getMsgCenterData()
    },
    getMsgCenterData(){
      let params = {page: 1, pageSize: this.msgPagination.pageSize, noticeType: 1}
      msg
              .getMessageList(params)
              .then((res) => {
                console.log(res);
                if(res.code == 0){
                  this.messageData = res.data.rows
                  this.messageData.map(item => {
                    item.createTime = item.createTime ? new Date(+new Date(item.createTime) + 8 * 3600 * 1000)
                                    .toISOString()
                                    .replace(/T/g, ' ')
                                    .replace(/\.[\d]{3}Z/, '')
                            : "";
                    item.link = '/service_management/fdbk_info_detail?code='+item.noticeId
                  })
                }
              })
    },
    discussPaginationChange(current, pageSize){
      this.discussPagination.pageSize = pageSize
      this.getDiscussData()
    },
    getDiscussData(){
      this.$message.success('将获取讨论组数据')
    },
    mailPaginationChange(current, pageSize){
      this.mailPagination.pageSize = pageSize
      this.getMailData()
    },
    getMailData(){
      this.$message.success('将获取邮件数据')
    },
    tablePaginationChange(current, pageSize){
      this.tablePagination.pageSize = pageSize
      this.getSheetData()
    },
    getSheetData(){
      this.$message.success('将获取报表数据')
    },
    missionPaginationChange(current, pageSize){
      this.missionPagination.pageSize = pageSize
      this.getMissionData()
    },
    getMissionData(){
      this.$message.success('将获取任务数据')
    },
    salesPaginationChange(current, pageSize){
      this.salesPagination.pageSize = pageSize
      this.getSalesChanceData()
    },
    getSalesChanceData(){
      this.$message.success('将获取销售机会数据')
    },
    hintPaginationChange(current, pageSize){
      this.hintPagination.pageSize = pageSize
      this.getHintData()
    },
    getHintData(){
      this.$message.success('将获取重要提示数据')
    },
    feedbackPaginationChange(current, pageSize){
      this.feedbackPagination.pageSize = pageSize
      this.getFeedbackData()
    },
    getFeedbackData(){
      this.$message.success('将获取反馈数据')
    },
    schedulePaginationChange(current, pageSize){
      this.schedulePagination.pageSize = pageSize
      this.getScheduleData()
    },
    getScheduleData(){
      this.$message.success('将获取日程数据')
    },
    todoPaginationChange(current, pageSize){
      this.todoPagination.pageSize = pageSize
      this.getTodoListData()
    },
    getTodoListData(){
      this.$message.success('将获取待办数据')
    },
    myOrderPaginationChange(current, pageSize){
      this.myOrderPagination.pageSize = pageSize
      this.getOrderData()
    },
    getOrderData(){
      this.$message.success('将获取订单数据')
    },
  }
};
</script>

<style scoped>
</style>