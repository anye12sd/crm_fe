<template>
  <a-layout class="main-layout">
    <a-layout-header class="main-header">
      <a-descriptions bordered size="small">
        <a-descriptions-item label="标题" :span="3"> {{ form.title }} </a-descriptions-item>
        <a-descriptions-item label="描述" :span="3"> {{ form.description }} </a-descriptions-item>
      </a-descriptions>
      <a-divider />
      <div class="content_btn">
        <a-button size="small" style="margin-right: 6px" @click="addFav">新增</a-button>
        <a-button size="small" style="margin-right: 6px" @click="modifyFav">修改</a-button>
        <a-button size="small" style="margin-right: 6px">批量处理</a-button>
        <a-button size="small" style="margin-right: 6px" @click="delFav">删除</a-button>
        <a-button size="small" @click="$router.go(-1)">退出</a-button>
        <a-modal
          v-model="visibleDel"
          title="删除"
          ok-text="确认"
          cancel-text="取消"
          @ok="hideModal"
        >
          <div><a-icon type="exclamation-circle" style="color: #faad14" /> 确认删除吗?</div>
        </a-modal>
        <a-modal
          :title="modalTitle"
          :visible="visible"
          @ok="handleOk"
          @cancel="handleCancel"
          ok-text="确定"
          cancel-text="取消"
        >
          <a-form-model
            ref="ruleForm"
            :model="formModal"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="标题">
              <a-input v-model="formModal.title" placeholder="标题" />
            </a-form-model-item>
            <a-form-model-item label="描述">
              <a-input v-model="formModal.description" placeholder="描述" />
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
      <a-divider />
      <div class="tabs-box">
        <client-cate-tabs
          @on-add="toAdd"
          @on-callback="onCallback"
          :usedTabs="usedTabs"
          :usedTabsColumns="usedTabsColumns"
        ></client-cate-tabs>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script>
import ClientCateTabs from '@/components/details/ClientCateTabs';
const usedTabs = ['客户', '员工'];
const usedTabsColumns = {
  clientColumns: {
    name: '客户',
    show: true,
    columns: [
      { title: '客户名', dataIndex: 'clientName', key: 'clientName' },
      { title: '编号', dataIndex: 'clientCode', key: 'clientCode' },
      { title: '客户助记码', dataIndex: 'clientMnemonicCode', key: 'clientMnemonicCode' },
      { title: '最近联络时间', dataIndex: 'lastTime', key: 'lastTime' },
      { title: '识别方式', dataIndex: 'mode', key: 'mode' },
      { title: '识别号码', dataIndex: 'number', key: 'number' },
      { title: '电子邮件', dataIndex: 'email', key: 'email' },
      { title: '网站主页', dataIndex: 'website', key: 'website' },
      { title: '电话', dataIndex: 'telephone', key: 'telephone' },
      { title: '详情地址', dataIndex: 'address', key: 'address' }
    ],
    specsData: [
      {
        clientCode: 'df0207',
        clientName: '卢宇翔',
        clientMnemonicCode: 'lyx',
        lastTime: '2020-12-21',
        mode: '',
        email: '472487136@qq.com',
        website: 'www.baidu.com',
        telephone: '0579-87100888',
        address: '永康市'
      }
    ],
    buttons: ['delete'],
    operateBtnFixed: true,
    headerContent: ['add']
  },
  staffColumns: {
    name: '员工',
    show: true,
    columns: [
      { title: '员工编码', dataIndex: 'staffCode', key: 'staffCode' },
      { title: '员工姓名', dataIndex: 'staffName', key: 'staffName' },
      { title: '助记码', dataIndex: 'mnemonicCode', key: 'mnemonicCode' },
      { title: '部门名称', dataIndex: 'departmentName', key: 'departmentName' },
      { title: '员工职务', dataIndex: 'position', key: 'position' },
      { title: '员工角色', dataIndex: 'role', key: 'role' },
      { title: '登录名', dataIndex: 'loginName', key: 'loginName' }
    ],
    specsData: [
      {
        staffCode: 'df0207',
        staffName: '卢宇翔',
        mnemonicCode: 'lyx',
        departmentName: '机汇智能建站',
        position: '',
        role: '销售代表 服务代表 市场总监 ',
        loginName: 'lyx'
      }
    ],
    operateBtnFixed: true,
    buttons: ['delete'],
    headerContent: ['add']
  }
};

export default {
  name: 'Favorite',
  props: {
    modalTitle: String,
    formModal: Object,
    form: Object
  },
  components: { ClientCateTabs },
  data() {
    return {
      visible: false,
      visibleDel: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 15 },
      clientColumns: [
        { title: '客户名', dataIndex: 'clientName', key: 'clientName' },
        { title: '编号', dataIndex: 'clientCode', key: 'clientCode' },
        { title: '客户助记码', dataIndex: 'clientMnemonicCode', key: 'clientMnemonicCode' },
        { title: '最近联络时间', dataIndex: 'lastTime', key: 'lastTime' },
        { title: '识别方式', dataIndex: 'mode', key: 'mode' },
        { title: '识别号码', dataIndex: 'number', key: 'number' },
        { title: '电子邮件', dataIndex: 'email', key: 'email' },
        { title: '网站主页', dataIndex: 'website', key: 'website' },
        { title: '电话', dataIndex: 'telephone', key: 'telephone' },
        { title: '详情地址', dataIndex: 'address', key: 'address' },
        { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      clientData: [
        {
          clientCode: 'df0207',
          clientName: '卢宇翔',
          clientMnemonicCode: 'lyx',
          lastTime: '2020-12-21',
          mode: '',
          email: '472487136@qq.com',
          website: 'www.baidu.com',
          telephone: '0579-87100888',
          address: '永康市'
        }
      ],
      staffColumns: [
        { title: '员工编码', dataIndex: 'staffCode', key: 'staffCode' },
        { title: '员工姓名', dataIndex: 'staffName', key: 'staffName' },
        { title: '助记码', dataIndex: 'mnemonicCode', key: 'mnemonicCode' },
        { title: '部门名称', dataIndex: 'departmentName', key: 'departmentName' },
        { title: '员工职务', dataIndex: 'position', key: 'position' },
        { title: '员工角色', dataIndex: 'role', key: 'role' },
        { title: '登录名', dataIndex: 'loginName', key: 'loginName' },
        { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      staffData: [
        {
          staffCode: 'df0207',
          staffName: '卢宇翔',
          mnemonicCode: 'lyx',
          departmentName: '机汇智能建站',
          position: '',
          role: '销售代表 服务代表 市场总监 ',
          loginName: 'lyx'
        }
      ],
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.visibleDel = false;
    },
    toClick(type, text, record, index) {
      this.$emit('on-click-fav', type, text, record, index);
    },
    addFav() {
      this.$emit('on-add-fav');
    },
    modifyFav() {
      this.$emit('on-mod-fav');
    },
    onClose() {
      this.$emit('on-close');
    },
    delFav() {
      this.visibleDel = true;
    },
    hideModal() {
      this.$emit('on-del');
    },
    handleOk() {
      this.$emit('on-fav-ok');
    },
    handleCancel() {
      this.$emit('on-fav-cancel');
    },
    toAdd() {
      this.$emit('on-add');
    },
    onCallback() {
      this.$emit('on-callback');
    }
  }
};
</script>

<style scoped>
.tabs-box {
  margin-top: 20px;
}
.flex {
  display: flex;
}
.space-between {
  justify-content: space-between;
}
</style>
