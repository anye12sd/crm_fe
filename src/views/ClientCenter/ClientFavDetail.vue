<template>
  <a-layout class="main-layout">
    <description-item
      @on-mod="onMod"
      @on-batch="onBatch"
      @on-addnew="onAddnew"
      @on-fav-ok="onFavOk"
      @on-confirm="onConfirm"
      :formModal="formModal"
      :modalTitle="modalTitle"
      :titleButtons="titleButtons"
      :description="description"
      :descriptionColumn="descriptionColumn"
    ></description-item>
    <category-tabs
      class="client_li"
      :usedTabs="usedTabs"
      :usedTabsColumns="tabsSelected"
      @on-add="toAdd"
      @on-callback="onCallback"
      @on-tabsSelect="tabsSelect"
    ></category-tabs>
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
        :rules="rules"
      >
        <a-form-model-item label="标题" prop="typeName">
          <a-input v-model="formModal.typeName" placeholder="标题" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="formModal.businessIntro" placeholder="描述" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
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
import qs from 'qs';
import api from '@/api/friend';
import DescriptionItem from '../../components/DescriptionItem';
import CategoryTabs from '../../components/tabsComponent/CategoryTabs';
import TabsSelectDrawer from "../../components/TabsSelectDrawer";
const usedTabs = ['客户', '员工'];
const description = {
  title: '收藏标题',
  description: '收藏描述'
};
const usedTabsColumns = {
  clientColumns: {
    name: '客户',
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
      { title: '详情地址', dataIndex: 'address', key: 'address' },
      { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
    ],
    specsData: [
      // {
      //   clientCode: 'df0207',
      //   clientName: '卢宇翔',
      //   clientMnemonicCode: 'lyx',
      //   lastTime: '2020-12-21',
      //   mode: '',
      //   email: '472487136@qq.com',
      //   website: 'www.baidu.com',
      //   telephone: '0579-87100888',
      //   address: '永康市'
      // }
    ],
    buttons: ['delete'],
    headerContent: ['add'],
    operateBtnFixed: true
  },
  staffColumns: {
    name: '员工',
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
      // {
      //   staffCode: 'df0207',
      //   staffName: '卢宇翔',
      //   mnemonicCode: 'lyx',
      //   departmentName: '机汇智能建站',
      //   position: '',
      //   role: '销售代表 服务代表 市场总监 ',
      //   loginName: 'lyx'
      // }
    ],
    buttons: ['delete'],
    headerContent: ['add'],
    operateBtnFixed: true,
  }
};
export default {
  name: 'ClienFavDetail',
  components: {TabsSelectDrawer, DescriptionItem, CategoryTabs },
  data() {
    return {
      pane: null,
      description,
      descriptionColumn: [
        { name: 'title', span: 3 },
        { name: 'description', span: 3 }
      ],
      formModal: {
        title: '',
        description: ''
      },
      type: '',
      usedTabs: usedTabs,
      usedTabsColumns: usedTabsColumns,
      modalTitle: '',
      visible: false,
      titleButtons: ['add', 'mod', 'batch', 'del'],
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
      checkedAAAAA: ['staffColumns'],
      // tabs选择参数结束
    };
  },
  created() {
    this.getParams();
  },
  mounted(){
    this.getShowList()
    this.getOriginColumns()
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query;
      // 将数据放在当前组件的数据内
      console.log('routerParams', routerParams);
      this.formModal.id = routerParams.record.clctId;
      this.formModal.title = routerParams.record.clctTitle;
      this.formModal.description = routerParams.record.clctIntro;
    },
    onAddnew() {
      this.type = 'add';
      this.modalTitle = '新增收藏夹';
      this.formModal.title = '';
      this.formModal.description = '';
    },
    onMod() {
      this.type = 'mod';
      this.modalTitle = '修改收藏夹';
    },
    onBatch() {},
    // 新增/修改收藏夹
    onFavOk() {
      if (this.type === 'add') {
        const data = {
          clctTitle: this.formModal.title,
          clctIntro: this.formModal.description
        };
        api.postFrndCollection(qs.stringify(data)).then((res) => {
          console.log(res);
          this.$message.success('新增成功！');
          this.loading = false;
        });
      } else {
        const id = this.formModal.id;
        const data = {
          clctTitle: this.formModal.title,
          clctIntro: this.formModal.description
        };
        api.putFrndCollection(id, qs.stringify(data)).then((res) => {
          console.log(res);
          this.$message.success('修改成功！');
          this.loading = false;
        });
      }
    },
    // 删除收藏夹
    onConfirm() {
      const id = this.formModal.id;
      api.delFrndCollection(id).then((res) => {
        if (res.message === 'success') {
          this.$message.success('删除成功！');
        }
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      });
    },
    onCallback(key) {
      this.pane = key;
    },
    toAdd() {
      if (this.pane === 0) {
        this.$router.push({ path: '/client_center/client_list_detail' });
      } else {
        this.$router.push({ path: '/client_center/staff_list_detail' });
      }
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
  }
};
</script>

<style>
.client_li {
  padding-top: 0;
}
.client_li .ant-tabs-bar {
  margin: 0 24px;
}
</style>