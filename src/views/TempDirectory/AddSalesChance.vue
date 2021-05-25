<template>
  <a-layout class="main-layout">
    <a-layout-header class="main-header">
      <a-descriptions bordered size="small">
        <a-descriptions-item label="客户/伙伴名称" :span="3">
          <a-input
            readonly
            v-model="form.switchName"
            placeholder="客户/伙伴名称"
            style="width: 300px; margin-right: 15px"
          />
          <a-radio-group v-model="form.friend" @change="friendChange">
            <a-radio :value="1"> 客户 </a-radio>
            <a-radio :value="2"> 合作伙伴 </a-radio>
          </a-radio-group>
          <friend-select
            :type="type"
            :clientColumns="clientColumns"
            :partnerColumns="partnerColumns"
            :clientData="clientData"
            :partnerData="partnerData"
            @on-ok="onOk"
            @on-select="onSelect"
            @on-close="friendClose"
            ref="friend"
          ></friend-select>
        </a-descriptions-item>
        <a-descriptions-item label="主题" :span="3">
          <a-input v-model="form.theme" placeholder="主题" style="width: 300px" />
        </a-descriptions-item>
        <a-descriptions-item label="预期日期">
          <a-date-picker v-model="form.expect" @change="expectChange" style="width: 100%" />
        </a-descriptions-item>
        <a-descriptions-item label="销售预期">
          <a-input v-model="form.salesExpect" placeholder="销售预期" style="width: 300px" />
        </a-descriptions-item>
        <a-descriptions-item label="来源类型">
          <a-select
            v-model="form.sourceType"
            @change="sourceTypeChange"
            placeholder="请选择分类名称"
            style="width: 300px"
            allowClear
          >
            <a-select-option v-for="(item, index) in sourceTypeData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="部门名称">
          <a-select
            v-model="form.deptName"
            @change="deptNameChange"
            placeholder="请选择分类名称"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in deptNameData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="负责员工">
          <input
            class="ant-input"
            style="width: 300px"
            type="text"
            v-model="form.responsibleStaff"
            readonly
          />
          <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
          <a-modal
            v-model="friendModal"
            title="员工选择"
            @ok="hideSearch"
            width="1000px"
            ok-text="选用"
            cancel-text="取消"
            class="Fmodal"
          >
            <a-row :gutter="24">
              <a-form layout="vertical" hide-required-mark class>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="员工编码"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-input v-model="form.staffCode" allowClear />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="助记码"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-input v-model="form.mnemonic" allowClear />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="员工姓名"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-input v-model="form.staffName" allowClear />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="部门名称"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-select default-value @change="handleChange"></a-select>
                  </a-form-item>
                </a-col>
              </a-form>
              <a-col :span="24" class="search_this">
                <a-button block class="search">查询</a-button>
                <a-button
                  block
                  class="advanced_search"
                  @click="openAdvancedData"
                  v-if="advancedData"
                  >高级查询</a-button
                >
                <a-button
                  block
                  class="advanced_search"
                  @click="offAdvancedData"
                  v-if="!advancedData"
                  >高级查询</a-button
                >
              </a-col>
              <a-form
                layout="vertical"
                hide-required-mark
                class="advanced_show"
                v-if="!advancedData"
              >
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="备注"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-input />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="联系人姓名"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-input />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    compact
                    label="反应特性"
                    :label-col="formItemLayout.labelColT"
                    :wrapper-col="formItemLayout.wrapperColT"
                  >
                    <a-select default-value @change="handleChange"></a-select>
                  </a-form-item>
                </a-col>
              </a-form>
            </a-row>
            <a-row :gutter="24">
              <a-table
                bordered
                class="friend_table"
                :columns="friendColumns"
                :data-source="friendData"
                :rowSelection="{
                  selectedRowKeys: selectedRowKeys,
                  onChange: onSelectChange,
                  type: 'radio'
                }"
                size="middle"
              >
                <template slot="title">
                  <div class="left">员工列表</div>
                </template>
              </a-table>
            </a-row>
          </a-modal>
          <a-icon type="sync" @click="empty" />
        </a-descriptions-item>
        <a-descriptions-item label="成熟度">
          <a-select
            @change="maturityChange"
            v-model="form.maturityCate"
            placeholder="请选择成熟度"
            style="width: 300px"
            allowClear
          >
            <a-select-option v-for="(item, index) in maturityData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="群号">
          <a-input v-model="form.group" placeholder="群号" />
        </a-descriptions-item>
        <a-descriptions-item label="下次跟进时间" :span="2">
          <a-input v-model="form.nextTime" placeholder="下次跟进时间" />
        </a-descriptions-item>
        <a-descriptions-item label="描述" :span="3">
          <a-textarea v-model="form.describe" allow-clear />
        </a-descriptions-item>
      </a-descriptions>
      <div class="change-box">
        <a-button size="small" style="margin-right: 6px" @click="saveForm">保存</a-button>
        <a-button size="small" @click="onReset" style="margin-right: 6px"> 重置 </a-button>
        <a-button size="small" @click="$router.go(-1)">退出</a-button>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
  labelColy: { span: 6 },
  wrapperColy: { span: 16 },
  labelColT: { span: 8 },
  wrapperColT: { span: 16 }
};
const friendColumns = [
  {
    title: '员工编码',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '员工姓名',
    dataIndex: 'staffName',
    scopedSlots: { customRender: 'staffName' }
  },
  {
    title: '助记码',
    className: 'mnemonicCode',
    dataIndex: 'mnemonicCode'
  },
  {
    title: '部门名称',
    dataIndex: 'deptName'
  },
  {
    title: '移动电话',
    dataIndex: 'mobilePhone'
  },
  {
    title: '办公电话',
    dataIndex: 'officephone'
  },
  {
    title: '电子邮件',
    dataIndex: 'email'
  }
];

const friendData = [
  {
    key: '1',
    code: '0000',
    staffName: '张三',
    mnemonicCode: '001',
    deptName: '集团总公司',
    mobilePhone: '13967938689',
    officephone: '87173500',
    email: 'zhangsan@zs.com'
  },
  {
    key: '2',
    code: '0001',
    staffName: '李四',
    mnemonicCode: '002',
    deptName: '东方五金网总公司',
    mobilePhone: '13967938689',
    officephone: '87173500',
    email: 'lisi@ls.com'
  },
  {
    key: '3',
    code: '0002',
    staffName: '王五',
    mnemonicCode: '003',
    deptName: '机汇网网络营销事业部',
    mobilePhone: '13967938689',
    officephone: '87173500',
    email: 'wangwu@ww.com'
  }
];

const clientColumns = [
  {
    title: '客户编码',
    dataIndex: 'clientCode',
    scopedSlots: { customRender: 'clientCode' }
  },
  {
    title: '客户名',
    dataIndex: 'clientName',
    scopedSlots: { customRender: 'clientName' }
  },
  {
    title: '客户助记符',
    className: 'clientMnemonic',
    dataIndex: 'clientMnemonic'
  },
  {
    title: '电话',
    dataIndex: 'telephone'
  },
  {
    title: '电子邮件',
    dataIndex: 'email'
  }
];

const partnerColumns = [
  {
    title: '伙伴编码',
    dataIndex: 'partnerCode',
    scopedSlots: { customRender: 'partnerCode' }
  },
  {
    title: '伙伴名',
    dataIndex: 'partnerName',
    scopedSlots: { customRender: 'partnerName' }
  },
  {
    title: '伙伴助记符',
    className: 'partnerMnemonic',
    dataIndex: 'partnerMnemonic'
  },
  {
    title: '电话',
    dataIndex: 'telephone'
  },
  {
    title: '电子邮件',
    dataIndex: 'email'
  }
];
import FriendSelect from '../../components/drawers/FriendSelect';

export default {
  name: 'ClientAdd',
  components: { FriendSelect },
  data() {
    return {
      friendColumns,
      friendData,
      formItemLayout,
      form: {
        switchName: '',
        responsibleStaff: ''
      },
      type: '',
      sourceTypeData: [
        { id: 0, title: '市场活动' },
        { id: 1, title: '反馈' },
        { id: 2, title: '上门销售' },
        { id: 3, title: '公司分配' },
        { id: 4, title: '电话销售' },
        { id: 5, title: '网络联系' },
        { id: 6, title: '朋友介绍' },
        { id: 7, title: '自行开发' },
        { id: 8, title: '广告影响' },
        { id: 9, title: '市场调查' },
        { id: 10, title: '智客会' }
      ],
      deptNameData: [
        { id: 0, title: '集团总公司' },
        { id: 1, title: '集团财务部' },
        { id: 2, title: '集团人力资源' },
        { id: 3, title: '东方五金总公司' },
        { id: 4, title: '东方五金增值部' },
        { id: 5, title: '东方五金设计部' }
      ],
      maturityData: [
        { id: 0, title: '5 3A踢单' },
        { id: 1, title: '4出方案' },
        { id: 2, title: '3持续挖掘' },
        { id: 3, title: '2需求已确认' },
        { id: 4, title: '1机会库' },
        { id: 5, title: '成功' },
        { id: 6, title: '失败' }
      ],
      clientColumns,
      partnerColumns,
      //客户列表data
      clientData: [
        {
          id: 0,
          clientCode: '111-2222',
          clientName: '测试客户01',
          clientMnemonic: 'test01',
          telephone: '',
          email: ''
        }
      ],
      //伙伴列表data
      partnerData: [
        {
          id: 0,
          partnerCode: '111-2222',
          partnerName: '伙伴01',
          partnerMnemonic: 'hb01',
          telephone: '',
          email: ''
        }
      ],
      advancedData: true,
      friendModal: false,
      selectRowKeys: [],
      selectedRowKeys: [],
      selectFriend: '',
      selectedFriend: ''
    };
  },
  methods: {
    friendChange(e) {
      const value = e.target.value;
      if (value === 1) {
        this.type = 'client';
        this.$refs.friend.open();
      } else {
        this.type = 'partner';
        this.$refs.friend.open();
      }
    },
    expectChange(date, dateString) {
      console.log(date, dateString);
    },
    sourceTypeChange(value) {
      console.log(value);
    },
    deptNameChange(value) {
      console.log(value);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    maturityChange(value) {
      console.log(value);
    },
    showSearch() {
      this.friendModal = true;
    },
    hideSearch() {
      this.friendModal = false;
      this.form.responsibleStaff = this.selectedFriend.staffName;
    },
    empty() {
      this.form.responsibleStaff = '';
    },
    // 客户/伙伴名选用
    onSelect(selectedRowKeys) {
      if (this.type === 'client') {
        this.selectRowKeys = selectedRowKeys;
        this.selectFriend = this.clientData[this.selectRowKeys];
      } else {
        this.selectRowKeys = selectedRowKeys;
        this.selectFriend = this.partnerData[this.selectRowKeys];
      }
    },
    // 客户/伙伴名选中
    onOk() {
      if (this.type === 'client') {
        this.form.switchName = this.selectFriend.clientName;
      } else {
        this.form.switchName = this.selectFriend.partnerName;
      }
      this.selectRowKeys = [];
      this.selectFriend = [];
      this.$refs.friend.close();
    },
    friendClose() {
      this.selectRowKeys = [];
      this.selectFriend = [];
      this.$refs.friend.close();
    },
    openAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    offAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedFriend = this.friendData[this.selectedRowKeys - '1'];
    },
    onReset() {
      this.form = {};
    },
    saveForm() {
      console.log(this.form);
    }
  }
};
</script>

<style>
.change-box {
  background: #fff;
  padding-left: 24px;
}
</style>