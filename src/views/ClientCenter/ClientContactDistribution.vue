<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :buttons="buttons"
      :headerContent="headerContent"
      @on-display="toDisplay"
      @on-search="toSearch"
      :operateBtnFixed="operateBtnFixed"
      :pagination="pagination"
      :customRow="customRow"
      :headerContentSelect="headerContentSelect"
    ></table-list>
    <drawer-search ref="drawer"></drawer-search>
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
  </a-layout>
</template>

<script>
const tableData = [
  {
    clientName: '视商传媒（杭州）有限公司',
    contactName: '王建林',
    contactDepartment: '',
    duties: '负责签字',
    email: '',
    officePhone: '',
    address: '永康市城西新区花城西路29号',
    mobilePhone: '18867971373',
    responsibleStaff: '李梅（杨卓越）'
  }
];
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => (a.status > b.status ? 1 : -1)
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    key: 'clientName',
    sorter: (a, b) => (a.clientName > b.clientName ? 1 : -1)
  },
  {
    title: '联系人姓名',
    dataIndex: 'contactName',
    key: 'contactName',
    sorter: (a, b) => (a.contactName > b.contactName ? 1 : -1)
  },
  {
    title: '称呼',
    dataIndex: 'call',
    key: 'call'
  },
  {
    title: '联系人部门',
    dataIndex: 'contactDepartment',
    key: 'contactDepartment',
    sorter: (a, b) => (a.contactDepartment > b.contactDepartment ? 1 : -1)
  },
  {
    title: '职务',
    dataIndex: 'duties',
    key: 'duties'
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '邮政编码',
    dataIndex: 'zipcode',
    key: 'zipcode'
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province'
  },
  {
    title: '国家',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: '电子邮件',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '家庭电话',
    dataIndex: 'homePhone',
    key: 'homePhone'
  },
  {
    title: '办公电话',
    dataIndex: 'officePhone',
    key: 'officePhone'
  },
  {
    title: '移动电话',
    dataIndex: 'mobilePhone',
    key: 'mobilePhone'
  },
  {
    title: '传呼',
    dataIndex: 'pager',
    key: 'pager'
  },
  {
    title: '传真',
    dataIndex: 'fax',
    key: 'fax'
  },
  {
    title: 'ICQ',
    dataIndex: 'icq',
    key: 'icq'
  },
  {
    title: '主联系人',
    dataIndex: 'primarycontact',
    key: 'primarycontact'
  },
  {
    title: '关怀对象',
    dataIndex: 'careObject',
    key: 'careObject'
  },
  {
    title: '催款对象',
    dataIndex: 'dunningObject',
    key: 'dunningObject'
  },
  {
    title: '促销对象',
    dataIndex: ' promoteObject',
    key: 'promoteObject'
  },
  {
    title: '创建人',
    dataIndex: 'founder',
    key: 'founder'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '修改人',
    dataIndex: 'reviser',
    key: 'reviser'
  },
  {
    title: '修改时间',
    dataIndex: 'revisionTime',
    key: 'revisionTime'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: '婚姻状况',
    dataIndex: 'maritalStatus',
    key: 'maritalStatus'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'QQ',
    dataIndex: 'qq',
    key: 'qq'
  },
  {
    title: '毕业院校',
    dataIndex: 'finishSchool',
    key: 'finishSchool'
  },
  {
    title: '成熟度',
    dataIndex: 'maturity',
    key: 'maturity'
  },
  {
    title: '付款',
    dataIndex: 'pay',
    key: 'pay'
  },
  {
    title: '每月联系',
    dataIndex: 'monthlyContact',
    key: 'monthlyContact'
  },
  {
    title: '每月联系方式',
    dataIndex: 'monthlyContactInfo',
    key: 'monthlyContactInfo'
  },
  {
    title: '全网营销期数',
    dataIndex: 'market',
    key: 'market'
  },
  {
    title: '人员特性',
    dataIndex: 'characteristic',
    key: 'characteristic'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    key: 'idCard'
  },
  {
    title: '市府网',
    dataIndex: 'mgw',
    key: 'mgw'
  },
  {
    title: '统一联络时间',
    dataIndex: 'unifiedTime',
    key: 'unifiedTime'
  },
  {
    title: '移动电话呼叫次数',
    dataIndex: 'phoneTimes',
    key: 'phoneTimes'
  },
  {
    title: '客户地址',
    dataIndex: 'clientAddress',
    key: 'clientAddress'
  },
  {
    title: '客户邮编',
    dataIndex: 'clientZipcode',
    key: 'clientZipcode'
  },
  {
    title: '客户电话',
    dataIndex: 'clientPhone',
    key: 'clientPhone'
  },
  {
    title: '客户邮件',
    dataIndex: 'clientEmail',
    key: 'clientEmail'
  },
  {
    title: '客户传真',
    dataIndex: 'clientFax',
    key: 'clientFax'
  }
];
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';

export default {
  name: 'ClientContactDistribution',
  components: { TableList, DrawerSearch },
  data() {
    return {
      loading: false,
      columns,
      tableData,
      columnsChildren: [
        {
          title: '序号',
          key: 'e',
          dataIndex: 'e',
          scopedSlots: { customRender: 'e' }
        },
        {
          title: '字段名',
          dataIndex: 'fields',
          key: 'fields',
          scopedSlots: { customRender: 'fields' }
        },
        {
          title: '操作',
          dataIndex: 'actionChildren',
          key: 'actionChildren',
          scopedSlots: { customRender: 'actionChildren' }
        }
      ],
      headerContent: ['displaylist', 'select', 'excel', 'search'],
      buttons: [],
      operateBtnFixed: true,
      visible: false,
      visibleConfig: false,
      childrenDrawer: false,
      clientInforDetail: {},
      //checkboxgroup已选中但是未点击保存的缓存项
      checkedListCache: [],
      //checkboxgroup里需要默认选中的项
      checkedList: [],
      checkAll: true,
      indeterminate: true,
      headerContentSelect: [
        { label: 'dayNewChance', name: '今日新增客户' },
        { label: 'weekNewChance', name: '本周新增客户' },
        { label: 'monthNewChance', name: '本月新增客户' }
      ],
      pagination: {
        total: 1,
        page: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // 选中行
    customRow() {
      return {
        on: {
          click: (e) => {
            console.log(e);
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
      for (let i = 0; i < this.columns.length; i++) {
        this.checkedList.push(this.columns[i].title);
      }
      this.visibleConfig = true;
      this.loading = true;
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
    onClose() {
      this.visibleConfig = false;
      this.loading = false;
    },
    showOrder() {
      this.childrenDrawer = true;
      this.loading = false;
    },
    // 删除客户
    showDel(text, record) {
      console.log(text, record);
    },
    onCheck(value) {
      console.log(value);
    },
    toSearch() {
      this.$refs.drawer.open();
    }
  }
};
</script>