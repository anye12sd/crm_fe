<template>
  <a-layout class="main-layout">
    <table-list
      :columns="columns"
      :table-data="tableData"
      :loading="tableLoading"
      :headerContent="headerContent"
      :buttons="buttons"
      :pagination="pagination"
      @on-add="toAdd"
      @on-search="toSearch"
      @on-click-btn="onClickBtn"
      @on-statistics="showStatistics"
      @on-change-table="onChangeTable"
    ></table-list>
    <a-modal
      :visible="visible"
      :title="modalTitle"
      @ok="handleOk"
      @cancel="handleCancel"
      :ok-text="okText"
      cancel-text="取消"
    >
      <a-form-model
        ref="clientCateForm"
        :model="formData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="标题" prop="typeName">
          <a-input v-model="formData.typeName" placeholder="标题" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="businessIntro">
          <a-input v-model="formData.businessIntro" placeholder="描述" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
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
const tableData = [
  {
    clctTitle: '收藏标题',
    clctIntro: '收藏描述',
    link: ''
  }
];
const columns = [
  {
    title: '标题',
    dataIndex: 'clctTitle',
    key: 'clctTitle',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: '描述',
    dataIndex: 'clctIntro',
    key: 'clctIntro'
  }
];
import qs from 'qs';
import api from '@/api/contact';
import TableList from '@/components/TableList';

export default {
  name: 'ClientContactFav',
  components: { TableList },
  data() {
    return {
      tableLoading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      tableData,
      columns,
      buttons: ['view', 'delete', 'edit'],
      headerContent: ['add', 'excel', 'statistics', 'search'],
      modalTitle: '',
      visible: false,
      statisticsVisible: false,
      formData: {},
      type: 'add',
      okText: '',
      clctId: "",
      rules: {
        typeName: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      pagination: {
        total: 0,
        current: 1,
        page_size: 10
      },
    };
  },
  mounted() {
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
      this.tableLoading = true;
      api
        .getCnctCollection(params)
        .then((res) => {
          console.log(res)
          if(res.code == 0){
            const pagination = { ...this.pagination };
            pagination.total = res.data.count;
            this.pagination = pagination;
            this.tableData = res.data.rows;
            this.tableData.map(item => {item.link = '/client_center/client_contact_fav_detail?code=' + item.clctId})
          }
          this.tableLoading = false;
        })
    },
    toAdd() {
      this.type = 'add';
      this.okText = '确认';
      this.visible = true;
      this.modalTitle = '添加收藏夹';
    },
    toSearch() {
      this.type = 'edit';
      this.okText = '查询';
      this.visible = true;
      this.modalTitle = '编辑收藏夹';
    },
    onClickBtn(type, text, record, index) {
      let id = record.clctId;
      if (type === 'delete') {
        api.delCnctCollection(id).then((res) => {
          console.log(res);
          if (res.code == '0') {
            this.$message.success('删除成功！');
            this.fetch();
          }else{
            this.$message.error(res.msg);
          }
        })
        .catch(err => {console.log(err)})
      } else if (type === 'view') {
        this.$router.push({
          path: '/client_center/client_contact_fav_detail',
          query: { code: id }
        });
      } else {
        this.clctId = record.clctId
        this.type = 'edit';
        this.okText = '确认';
        this.visible = true;
        this.modalTitle = '修改收藏夹';
        this.formData.typeName = record.clctTitle
        this.formData.businessIntro = record.clctIntro
      }
    },
    handleOk() {
      this.$refs.clientCateForm.validate((valid) => {
        if (valid) {
          if (this.type === 'add') {
            const data = {
              clctTitle: this.formData.typeName,
              clctIntro: this.formData.businessIntro
            };
            api.postCnctCollection(data).then((res) => {
              console.log(res);
              if (res.code == '0') {
                this.$message.success('新增成功！');
                this.formData.businessIntro = ""
                this.formData.typeName = ""
                this.fetch();
              }else{
                this.$message.error(res.msg);
              }
            })
            .catch(err => {console.log(err)})
            this.visible = false;
          } else if(this.type === 'edit'){
            const data = {
              clctTitle: this.formData.typeName,
              clctIntro: this.formData.businessIntro
            };
            api.putCnctCollection(this.clctId, data).then((res) => {
              console.log(res);
              if (res.code == '0') {
                this.$message.success('修改成功！');
                this.fetch();
              }else{
                this.$message.error(res.msg);
              }
            })
                    .catch(err => {console.log(err)})
            this.visible = false;
          } else {
            const params = {
              page: 1,
              clctTitle: this.formData.typeName,
              clctIntro: this.formData.businessIntro
            };
            api
              .getCnctCollection(params)
              .then((res) => {
                console.log(res);
                const pagination = { ...this.pagination };
                pagination.total = res.data.count;
                this.pagination = pagination;
                this.tableData = res.data.rows;
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
            this.visible = false;
          }
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.formData = {};
      this.type = '';
      this.modalTitle = '';
      this.$refs.clientCateForm.resetFields();
    },
    showStatistics(){
      this.statisticsVisible = true
    },
    hideStatistics() {
      this.statisticsVisible = false
    },
  }
};
</script>

<style scoped></style>