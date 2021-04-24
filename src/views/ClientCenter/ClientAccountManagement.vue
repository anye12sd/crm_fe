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
    ></table-list>
    <drawer-search ref="drawer"></drawer-search>
    <a-drawer
      class="show_drawer"
      title="我的显示"
      width="35%"
      placement="right"
      :visible="visibleConfig"
      @close="onClose"
    >
      <a-tree
        :default-checked-keys="['1', '2', '3', '4', '5', '6', '7']"
        checkable
        :tree-data="treeData"
        @check="onCheck"
      />
      <a-drawer
        title="字段排序"
        width="40%"
        :visible="childrenDrawer"
        @close="onChildrenDrawerClose"
      >
        <a-table
          rowKey="id"
          :loading="loading"
          :columns="columnsChildren"
          :data-source="tableDataChildren"
          :pagination="false"
          :customRow="customRow"
        >
          <template slot="e" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
          <template slot="actionChildren" slot-scope="text, record, index">
            <a-button-group>
              <a-tooltip title="上移">
                <a-button icon="arrow-up" size="small"></a-button>
              </a-tooltip>
              <a-tooltip title="下移">
                <a-button icon="arrow-down" size="small"></a-button>
              </a-tooltip>
              <a-tooltip title="移至最前">
                <a-button icon="vertical-align-top" size="small"></a-button>
              </a-tooltip>
              <a-tooltip title="移至最后">
                <a-button icon="vertical-align-bottom" size="small"></a-button>
              </a-tooltip>
              <a-tooltip title="删除">
                <a-popconfirm
                  title="删除当前数据？"
                  ok-text="确认并删除"
                  cancel-text="取消"
                  @confirm="showDel(text, record, index)"
                >
                  <a-button icon="delete" size="small"></a-button>
                </a-popconfirm>
              </a-tooltip>
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
        <a-button style="margin-right: 8px" @click="showOrder"> 保存 </a-button>
        <a-button style="margin-right: 8px" @click="showOrder"> 显示顺序 </a-button>
        <a-button style="margin-right: 8px" @click="onClose"> 还原默认 </a-button>
        <a-button @click="onClose"> 取消 </a-button>
      </div>
    </a-drawer>
  </a-layout>
</template>

<script>
const tableData = [
  {
    clientCode: '',
    accountName: '永康市佳辉工贸有限公司',
    clientName: '永康市佳辉工贸有限公司',
    email: '',
    telephone: '',
    address: '浙江省金华市永康市城西新区西塔三路5号',
    accountBalance: '9,800.00'
  }
];
const columns = [
  {
    title: '帐户编码',
    dataIndex: 'clientCode',
    key: 'clientCode',
    sorter: (a, b) => (a.clientCode > b.clientCode ? 1 : -1)
  },
  {
    title: '帐户名称',
    dataIndex: 'accountName',
    key: 'accountName'
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    key: 'clientName'
  },
  {
    title: '电子邮件',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => (a.email > b.email ? 1 : -1)
  },
  {
    title: '电话',
    dataIndex: 'telephone',
    key: 'telephone',
    sorter: (a, b) => (a.telephone > b.telephone ? 1 : -1)
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '帐户余额',
    dataIndex: 'accountBalance',
    key: 'accountBalance',
    sorter: (a, b) => (a.accountBalance > b.accountBalance ? 1 : -1)
  }
];
import TableList from '@/components/TableList';
import DrawerSearch from '@/components/DrawerSearch';

export default {
  name: 'ClientAccountManagement',
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
      tableDataChildren: [
        {
          fields: '帐户编码'
        },
        {
          fields: '帐户名称'
        },
        {
          fields: '客户名'
        },
        {
          fields: '电子邮件'
        },
        {
          fields: '电话'
        },
        {
          fields: '详细地址'
        },
        {
          fields: '帐户余额'
        }
      ],
      headerContent: [
        'add',
        'displaylist',
        'clientSelect',
        'excel',
        'statistics',
        'search',
        'collect'
      ],
      buttons: ['view', 'delete'],
      operateBtnFixed: true,
      visible: false,
      visibleConfig: false,
      childrenDrawer: false,
      clientInforDetail: {},
      items: ['今日新增客户', '本周新增客户', '本月新增客户'],
      treeData: [
        { key: '0', title: '状态' },
        { key: '1', title: '负责部门' },
        { key: '2', title: '帐户名称' },
        { key: '3', title: '帐户编码' },
        { key: '4', title: '应收初值' },
        { key: '5', title: '应收发生' },
        { key: '6', title: '预收初值' },
        { key: '7', title: '预收发生' },
        { key: '8', title: '已收发生' },
        { key: '9', title: '帐户余额' },
        { key: '10', title: '客户名' },
        { key: '11', title: '信用额度' },
        { key: '12', title: '开户行' },
        { key: '13', title: '银行帐号' },
        { key: '14', title: '电子邮件' },
        { key: '15', title: '电话' },
        { key: '16', title: '传真' },
        { key: '17', title: '详细地址' },
        { key: '18', title: '邮编' },
        { key: '19', title: '创建人' },
        { key: '20', title: '创建时间' },
        { key: '21', title: '修改人' },
        { key: '22', title: '修改时间' },
        { key: '23', title: '总积分' }
      ],
      checkedKeys: []
    };
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
    // 删除客户
    showDel(text, record) {
      console.log(text, record);
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    toSearch() {
      this.$refs.drawer.open();
    }
  }
};
</script>