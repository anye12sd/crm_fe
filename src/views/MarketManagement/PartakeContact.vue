<template>
  <a-layout class="main-layout">
    <category-tabs
            :setting-show="false"
      :usedTabsColumns="usedTabsColumns"
      @on-date="onDate"
      @on-default="onDefault"
      @on-display="toDisplay"
      @on-search="toSearch"
      @on-collect="toCollect"
      @on-additem="onAdditem"
      @on-arrangeitem="onArrangeitem"
      @on-statistics="showStatistics"
      @on-addOk="onAddOk"
      @on-addCancel="onAddCancel"
      @on-callback="toCallback"
      ref="client"
    ></category-tabs>
    <drawer-search ref="drawer"></drawer-search>
    <collection-add ref="add" :modalTitle="modalTitle"></collection-add>
    <my-query-drawer
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
    </my-query-drawer>
    <a-drawer
      class="hide-control-drawer client-drawer"
      title="我的显示"
      width="35%"
      placement="right"
      :visible="visibleConfig"
      @close="onClose"
    >
      <a-checkbox class="check-all-button" :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="checkedList" @change="checkShowColumn">
        <template v-for="(item, index) in originColumns">
          <div :key="index" class="checkbox-box">
            <a-checkbox :value="item.title">
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
          :rowKey="originColumns.title"
          :loading="loading"
          :columns="columnsChildren"
          :data-source="originColumns"
          :pagination="false"
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
        <a-button style="margin-right: 8px" @click="showOrderDrawer"> 显示顺序</a-button>
        <a-button style="margin-right: 8px" @click="showListRestore"> 还原默认</a-button>
        <a-button @click="hideList"> 取消</a-button>
      </div>
    </a-drawer>
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
import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
import DrawerSearch from '@/components/DrawerSearch';
import MyQueryDrawer from "../../components/details/MyQueryDrawer";
import CollectionAdd from "../../components/details/CollectionAdd";
const usedTabsColumns = {
  clientColumns: {
    name: '客户联系人',
    show: true,
    columns: [
      {
        title: '标志',
        dataIndex: 'sign',
        key: 'sign'
      },
      {
        title: '市场活动分类',
        dataIndex: 'marketActiveCate',
        key: 'marketActiveCate',
        // sorter: (a, b) => (a.marketActiveCate > b.marketActiveCate ? 1 : -1)
      },
      {
        title: '活动代码',
        dataIndex: 'activityCode',
        key: 'activityCode',
        // sorter: (a, b) => (a.activityCode > b.activityCode ? 1 : -1)
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        // sorter: (a, b) => (a.activityName > b.activityName ? 1 : -1)
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        key: 'startDate',
        // sorter: (a, b) => (a.startDate > b.startDate ? 1 : -1)
      },
      {
        title: '结束日期',
        dataIndex: 'endDate',
        key: 'endDate',
        // sorter: (a, b) => (a.endDate > b.endDate ? 1 : -1)
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName',
        // sorter: (a, b) => (a.contactName > b.contactName ? 1 : -1)
      },
      {
        title: '客户助记符',
        dataIndex: 'clientMnemonic',
        key: 'clientMnemonic',
        // sorter: (a, b) => (a.clientMnemonic > b.clientMnemonic ? 1 : -1)
      },
      {
        title: '客户名',
        dataIndex: 'clientName',
        key: 'clientName',
        // sorter: (a, b) => (a.clientName > b.clientName ? 1 : -1)
      },
      {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
        // sorter: (a, b) => (a.categoryName > b.categoryName ? 1 : -1)
      },
      {
        title: '联系人部门',
        dataIndex: 'contactDept',
        key: 'contactDept',
        // sorter: (a, b) => (a.contactDept > b.contactDept ? 1 : -1)
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post',
        // sorter: (a, b) => (a.post > b.post ? 1 : -1)
      },
      {
        title: '称呼',
        dataIndex: 'call',
        key: 'call',
        // sorter: (a, b) => (a.call > b.call ? 1 : -1)
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        // sorter: (a, b) => (a.sex > b.sex ? 1 : -1)
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
        // sorter: (a, b) => (a.birthday > b.birthday ? 1 : -1)
      },
      {
        title: '婚姻状况',
        dataIndex: 'marriage',
        key: 'marriage',
        // sorter: (a, b) => (a.marriage > b.marriage ? 1 : -1)
      },
      {
        title: '电子邮件',
        dataIndex: 'email',
        key: 'email',
        // sorter: (a, b) => (a.email > b.email ? 1 : -1)
      },
      {
        title: '办公电话',
        dataIndex: 'officePhone',
        key: 'officePhone',
        // sorter: (a, b) => (a.officePhone > b.officePhone ? 1 : -1)
      },
      {
        title: '移动电话',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        // sorter: (a, b) => (a.mobilePhone > b.mobilePhone ? 1 : -1)
      },
      {
        title: '家庭电话',
        dataIndex: 'homePhone',
        key: 'homePhone',
        // sorter: (a, b) => (a.homePhone > b.homePhone ? 1 : -1)
      },
      {
        title: '传真',
        dataIndex: 'fax',
        key: 'fax',
        // sorter: (a, b) => (a.fax > b.fax ? 1 : -1)
      },
      {
        title: '传呼',
        dataIndex: 'pager',
        key: 'pager',
        // sorter: (a, b) => (a.pager > b.pager ? 1 : -1)
      },
      {
        title: 'ICQ',
        dataIndex: 'icq',
        key: 'icq',
        // sorter: (a, b) => (a.icq > b.icq ? 1 : -1)
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
        // sorter: (a, b) => (a.address > b.address ? 1 : -1)
      },
      {
        title: '邮政编码',
        dataIndex: 'postalCode',
        key: 'postalCode',
        // sorter: (a, b) => (a.postalCode > b.postalCode ? 1 : -1)
      },
      {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
        // sorter: (a, b) => (a.country > b.country ? 1 : -1)
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        // sorter: (a, b) => (a.province > b.province ? 1 : -1)
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        // sorter: (a, b) => (a.city > b.city ? 1 : -1)
      }
    ],
    operateBtnFixed: true,
    addTitle: '将当前查询加入到我的查询',
    FormAdd: [{ queryname: '', plainOptions: '' }],
    plainOptions: ['日', '周', '月', '年'],
    headerContentSelect: [
      { label: 'monthChance', name: '本月活动参与人' },
      { label: 'yearChance', name: '本年活动参与人' }
    ],
    headerContent: ['displaylist', 'select', 'excel', 'statistics', 'collect', 'search']
  },
  partnewrColumns: {
    name: '伙伴联系人',
    show: true,
    columns: [
      {
        title: '标志',
        dataIndex: 'sign',
        key: 'sign'
      },
      {
        title: '市场活动分类',
        dataIndex: 'marketActiveCate',
        key: 'marketActiveCate',
        // sorter: (a, b) => (a.marketActiveCate > b.marketActiveCate ? 1 : -1)
      },
      {
        title: '活动代码',
        dataIndex: 'activityCode',
        key: 'activityCode',
        // sorter: (a, b) => (a.activityCode > b.activityCode ? 1 : -1)
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        // sorter: (a, b) => (a.activityName > b.activityName ? 1 : -1)
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        key: 'startDate',
        // sorter: (a, b) => (a.startDate > b.startDate ? 1 : -1)
      },
      {
        title: '结束日期',
        dataIndex: 'endDate',
        key: 'endDate',
        // sorter: (a, b) => (a.endDate > b.endDate ? 1 : -1)
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName',
        // sorter: (a, b) => (a.contactName > b.contactName ? 1 : -1)
      },
      {
        title: '客户助记符',
        dataIndex: 'clientMnemonic',
        key: 'clientMnemonic',
        // sorter: (a, b) => (a.clientMnemonic > b.clientMnemonic ? 1 : -1)
      },
      {
        title: '客户名',
        dataIndex: 'clientName',
        key: 'clientName',
        // sorter: (a, b) => (a.clientName > b.clientName ? 1 : -1)
      },
      {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
        // sorter: (a, b) => (a.categoryName > b.categoryName ? 1 : -1)
      },
      {
        title: '联系人部门',
        dataIndex: 'contactDept',
        key: 'contactDept',
        // sorter: (a, b) => (a.contactDept > b.contactDept ? 1 : -1)
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post',
        // sorter: (a, b) => (a.post > b.post ? 1 : -1)
      },
      {
        title: '称呼',
        dataIndex: 'call',
        key: 'call',
        // sorter: (a, b) => (a.call > b.call ? 1 : -1)
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        // sorter: (a, b) => (a.sex > b.sex ? 1 : -1)
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
        // sorter: (a, b) => (a.birthday > b.birthday ? 1 : -1)
      },
      {
        title: '婚姻状况',
        dataIndex: 'marriage',
        key: 'marriage',
        // sorter: (a, b) => (a.marriage > b.marriage ? 1 : -1)
      },
      {
        title: '电子邮件',
        dataIndex: 'email',
        key: 'email',
        // sorter: (a, b) => (a.email > b.email ? 1 : -1)
      },
      {
        title: '办公电话',
        dataIndex: 'officePhone',
        key: 'officePhone',
        // sorter: (a, b) => (a.officePhone > b.officePhone ? 1 : -1)
      },
      {
        title: '移动电话',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        // sorter: (a, b) => (a.mobilePhone > b.mobilePhone ? 1 : -1)
      },
      {
        title: '家庭电话',
        dataIndex: 'homePhone',
        key: 'homePhone',
        // sorter: (a, b) => (a.homePhone > b.homePhone ? 1 : -1)
      },
      {
        title: '传真',
        dataIndex: 'fax',
        key: 'fax',
        // sorter: (a, b) => (a.fax > b.fax ? 1 : -1)
      },
      {
        title: '传呼',
        dataIndex: 'pager',
        key: 'pager',
        // sorter: (a, b) => (a.pager > b.pager ? 1 : -1)
      },
      {
        title: 'ICQ',
        dataIndex: 'icq',
        key: 'icq',
        // sorter: (a, b) => (a.icq > b.icq ? 1 : -1)
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
        // sorter: (a, b) => (a.address > b.address ? 1 : -1)
      },
      {
        title: '邮政编码',
        dataIndex: 'postalCode',
        key: 'postalCode',
        // sorter: (a, b) => (a.postalCode > b.postalCode ? 1 : -1)
      },
      {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
        // sorter: (a, b) => (a.country > b.country ? 1 : -1)
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        // sorter: (a, b) => (a.province > b.province ? 1 : -1)
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        // sorter: (a, b) => (a.city > b.city ? 1 : -1)
      }
    ],
    operateBtnFixed: true,
    addTitle: '将当前查询加入到我的查询',
    FormAdd: [{ queryname: '', plainOptions: '' }],
    plainOptions: ['日', '周', '月', '年'],
    headerContentSelect: [
      { label: 'monthChance', name: '本月活动参与人' },
      { label: 'yearChance', name: '本年活动参与人' }
    ],
    headerContent: ['displaylist', 'select', 'excel', 'statistics', 'collect', 'search']
  },
  supplierColumns: {
    name: '供应商联系人',
    show: true,
    columns: [
      {
        title: '标志',
        dataIndex: 'sign',
        key: 'sign'
      },
      {
        title: '市场活动分类',
        dataIndex: 'marketActiveCate',
        key: 'marketActiveCate',
        // sorter: (a, b) => (a.marketActiveCate > b.marketActiveCate ? 1 : -1)
      },
      {
        title: '活动代码',
        dataIndex: 'activityCode',
        key: 'activityCode',
        // sorter: (a, b) => (a.activityCode > b.activityCode ? 1 : -1)
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        // sorter: (a, b) => (a.activityName > b.activityName ? 1 : -1)
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        key: 'startDate',
        // sorter: (a, b) => (a.startDate > b.startDate ? 1 : -1)
      },
      {
        title: '结束日期',
        dataIndex: 'endDate',
        key: 'endDate',
        // sorter: (a, b) => (a.endDate > b.endDate ? 1 : -1)
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName',
        // sorter: (a, b) => (a.contactName > b.contactName ? 1 : -1)
      },
      {
        title: '客户助记符',
        dataIndex: 'clientMnemonic',
        key: 'clientMnemonic',
        // sorter: (a, b) => (a.clientMnemonic > b.clientMnemonic ? 1 : -1)
      },
      {
        title: '客户名',
        dataIndex: 'clientName',
        key: 'clientName',
        // sorter: (a, b) => (a.clientName > b.clientName ? 1 : -1)
      },
      {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
        // sorter: (a, b) => (a.categoryName > b.categoryName ? 1 : -1)
      },
      {
        title: '联系人部门',
        dataIndex: 'contactDept',
        key: 'contactDept',
        // sorter: (a, b) => (a.contactDept > b.contactDept ? 1 : -1)
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post',
        // sorter: (a, b) => (a.post > b.post ? 1 : -1)
      },
      {
        title: '称呼',
        dataIndex: 'call',
        key: 'call',
        // sorter: (a, b) => (a.call > b.call ? 1 : -1)
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        // sorter: (a, b) => (a.sex > b.sex ? 1 : -1)
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
        // sorter: (a, b) => (a.birthday > b.birthday ? 1 : -1)
      },
      {
        title: '婚姻状况',
        dataIndex: 'marriage',
        key: 'marriage',
        // sorter: (a, b) => (a.marriage > b.marriage ? 1 : -1)
      },
      {
        title: '电子邮件',
        dataIndex: 'email',
        key: 'email',
        // sorter: (a, b) => (a.email > b.email ? 1 : -1)
      },
      {
        title: '办公电话',
        dataIndex: 'officePhone',
        key: 'officePhone',
        // sorter: (a, b) => (a.officePhone > b.officePhone ? 1 : -1)
      },
      {
        title: '移动电话',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        // sorter: (a, b) => (a.mobilePhone > b.mobilePhone ? 1 : -1)
      },
      {
        title: '家庭电话',
        dataIndex: 'homePhone',
        key: 'homePhone',
        // sorter: (a, b) => (a.homePhone > b.homePhone ? 1 : -1)
      },
      {
        title: '传真',
        dataIndex: 'fax',
        key: 'fax',
        // sorter: (a, b) => (a.fax > b.fax ? 1 : -1)
      },
      {
        title: '传呼',
        dataIndex: 'pager',
        key: 'pager',
        // sorter: (a, b) => (a.pager > b.pager ? 1 : -1)
      },
      {
        title: 'ICQ',
        dataIndex: 'icq',
        key: 'icq',
        // sorter: (a, b) => (a.icq > b.icq ? 1 : -1)
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
        // sorter: (a, b) => (a.address > b.address ? 1 : -1)
      },
      {
        title: '邮政编码',
        dataIndex: 'postalCode',
        key: 'postalCode',
        // sorter: (a, b) => (a.postalCode > b.postalCode ? 1 : -1)
      },
      {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
        // sorter: (a, b) => (a.country > b.country ? 1 : -1)
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        // sorter: (a, b) => (a.province > b.province ? 1 : -1)
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        // sorter: (a, b) => (a.city > b.city ? 1 : -1)
      }
    ],
    operateBtnFixed: true,
    addTitle: '将当前查询加入到我的查询',
    FormAdd: [{ queryname: '', plainOptions: '' }],
    plainOptions: ['日', '周', '月', '年'],
    headerContentSelect: [
      { label: 'monthChance', name: '本月活动参与人' },
      { label: 'yearChance', name: '本年活动参与人' }
    ],
    headerContent: ['displaylist', 'select', 'excel', 'statistics', 'collect', 'search']
  }
};
const queryColumns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name'
  }
];

export default {
  name: 'PartakeContact',
  components: {CollectionAdd, MyQueryDrawer, CategoryTabs, DrawerSearch },
  data() {
    return {
      loading: false,
      originColumns: [],
      visibleConfig: false,
      statisticsVisible: false,
      indeterminate: true,
      checkAll: true,
      childrenDrawer: false,
      //checkboxgroup已选中但是未点击保存的缓存项
      checkedListCache: [],
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      columnsChildren: [
        {
          title: '序号',
          key: 'e',
          dataIndex: 'e',
          scopedSlots: { customRender: 'e' }
        },
        {
          title: '字段名',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '操作',
          dataIndex: 'actionChildren',
          key: 'actionChildren',
          scopedSlots: { customRender: 'actionChildren' }
        }
      ],
      usedTabsColumns: usedTabsColumns,
      key: null,
      modalTitle: '加入收藏',
      queryColumns,
      myQuery: '我的查询',
      queryData: [],
      btns: ['delete', 'star'],
      operateFixed: true,
      pagination: {
        total: 0,
        current: 1,
        page_size: 10
      },
    };
  },
  methods: {
    toCallback(key) {
      this.key = key;
    },
    toDisplay() {
      if (this.key === 0 || this.key === null) {
        for (let i = 0; i < this.usedTabsColumns.clientColumns.columns.length; i++) {
          this.checkedList.push(this.usedTabsColumns.clientColumns.columns[i].title);
        }
        this.originColumns = this.usedTabsColumns.clientColumns.columns;
      }
      if (this.key === 1) {
        for (let i = 0; i < this.usedTabsColumns.partnewrColumns.columns.length; i++) {
          this.checkedList.push(this.usedTabsColumns.partnewrColumns.columns[i].title);
        }
        this.originColumns = this.usedTabsColumns.partnewrColumns.columns;
      }
      if (this.key === 2) {
        for (let i = 0; i < this.usedTabsColumns.supplierColumns.columns.length; i++) {
          this.checkedList.push(this.usedTabsColumns.supplierColumns.columns[i].title);
        }
        this.originColumns = this.usedTabsColumns.supplierColumns.columns;
      }
      this.visibleConfig = true;
    },
    onClose() {
      this.visibleConfig = false;
    },
    toSearch() {
      this.$refs.drawer.open();
    },
    toCollect() {
      this.$refs.add.open();
    },
    showStatistics(){
      this.statisticsVisible = true
    },
    hideStatistics() {
      this.statisticsVisible = false
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
    onAddOk() {
      this.$refs.client.close();
    },
    onAddCancel() {
      this.$refs.client.close();
    },
    onCheckAllChange(e) {
      let checkList = [];
      for (let i = 0; i < this.originColumns.length; i++) {
        checkList.push(this.originColumns[i].title);
      }
      Object.assign(this, {
        checkedList: e.target.checked ? checkList : [],
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
    showList() {
      this.columns = [];
      // 保存需要显示的table 列
      this.checkedList = this.checkedListCache;
      for (let i = 0; i < this.originColumns.length; i++) {
        if (this.checkedList.includes(this.originColumns[i].title)) {
          this.columns.push(this.originColumns[i]);
        }
      }
      this.visibleConfig = false;
    },
    hideList() {
      this.checkedListCache = [];
      this.visibleConfig = false;
    },
    showListRestore() {
      this.checkedList = [];
      // 还原需要隐藏的列，使用originColumns会全部打钩，使用columns会打钩已显示的内容
      for (let i = 0; i < this.columns.length; i++) {
        this.checkedList.push(this.columns[i].title);
      }
    },
    showOrderDrawer() {
      this.childrenDrawer = true;
      this.loading = false;
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
      this.loading = false;
    },
    moveUp(index) {
      if (index == 0) {
        return false;
      }
      this.originColumns.splice(
        index - 1,
        1,
        ...this.originColumns.splice(index, 1, this.originColumns[index - 1])
      ); //将第一个值和第二个值对换
    },
    moveDown(index) {
      if (index + 1 == this.originColumns.length) {
        return false;
      }
      this.originColumns.splice(
        index + 1,
        1,
        ...this.originColumns.splice(index, 1, this.originColumns[index + 1])
      ); ////将第二个值和第一个值对换
    },
    moveTop(index) {
      if (index == 0) {
        return false;
      }
      this.originColumns.unshift(this.originColumns.splice(index, 1)[0]);
    },
    moveBottom(index) {
      if (index + 1 == this.originColumns.length) {
        return false;
      }
      this.originColumns.push(this.originColumns.splice(index, 1)[0]);
    },
    onArrangeitem() {
      console.log(456)
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
  }
};
</script>

<style scoped>
</style>