<template>
  <a-drawer
    :visible="friendModal"
    title="客户/伙伴/供应商选择"
    width="960px"
    class="Fmodal"
    @close="onClose"
  >
    <a-row :gutter="24">
      <a-form layout="vertical" hide-required-mark class>
        <a-col :span="8">
          <a-form-item
            compact
            label="编码"
            :label-col="formItemLayout.labelColT"
            :wrapper-col="formItemLayout.wrapperColT"
          >
            <a-input
              style="width: 59.886667px"
              oninput="if(value.length > 3)value = value.slice(0, 3)"
            />
            <span>-</span>
            <a-input
              style="width: 59.886667px"
              oninput="if(value.length > 3)value = value.slice(0, 4)"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            compact
            :label="type === 'client' ? '客户列表' : '合作伙伴列表'"
            :label-col="formItemLayout.labelColT"
            :wrapper-col="formItemLayout.wrapperColT"
          >
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            compact
            label="识别方式"
            :label-col="formItemLayout.labelColT"
            :wrapper-col="formItemLayout.wrapperColT"
          >
            <a-select default-value @change="handleChange"></a-select>
          </a-form-item>
        </a-col>
      </a-form>
      <a-col :span="24" class="search_this">
        <a-button block class="search">查询</a-button>
        <a-button block class="advanced_search" @click="openAdvancedData" v-if="advancedData"
          >高级查询</a-button
        >
        <a-button block class="advanced_search" @click="offAdvancedData" v-if="!advancedData"
          >高级查询</a-button
        >
      </a-col>
      <a-form layout="vertical" hide-required-mark class="advanced_show" v-if="!advancedData">
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
        :row-key="(record) => record.id"
        :columns="type === 'client' ? clientColumns : partnerColumns"
        :data-source="type === 'client' ? clientData : partnerData"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio'
        }"
        size="middle"
      >
        <template slot="title">
          <div class="left">
            <span v-if="type === 'client'">客户列表</span><span v-else>合作伙伴列表</span>
          </div>
          <div class="right">
            <a @click="addFriend">新增</a>
            <client-info
              :prompt="prompt"
              :cateData="cateData"
              :payData="payData"
              @on-change-cate="cateChange"
              @on-change-pay="payChange"
              @on-change-account="AccountChange"
              ref="cltinfo"
            ></client-info>
          </div>
        </template>
      </a-table>
    </a-row>
    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px'
      }"
    >
      <a-button @click="onClose" style="margin-right: 8px"> 取消 </a-button>
      <a-button @click="onOk" type="primary"> 选用 </a-button>
    </div>
  </a-drawer>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
  labelColT: { span: 8 },
  wrapperColT: { span: 16 }
};
import ClientInfo from '../modal/ClientInfoModal';
export default {
  name: 'FriendSelect',
  components: { ClientInfo },
  props: {
    type: String,
    clientColumns: Array,
    partnerColumns: Array,
    clientData: Array,
    partnerData: Array
  },
  data() {
    return {
      prompt: {},
      formItemLayout,
      friendModal: false,
      advancedData: true,
      selectedRowKeys: [],
      cateData: [],
      payData: [
        { id: 0, title: '爽快' },
        { id: 1, title: '普通' },
        { id: 2, title: '尚可' },
        { id: 3, title: '延迟' },
        { id: 4, title: '为难' }
      ]
    };
  },
  methods: {
    open() {
      this.friendModal = true;
    },
    onClose() {
      this.$emit('on-close');
      this.selectedRowKeys = [];
    },
    close() {
      this.friendModal = false;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    openAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    offAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    onSelectChange(selectedRowKeys) {
      this.$emit('on-select', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    addFriend() {
      if (this.type === 'client') {
        this.prompt.title = '客户信息';
        this.prompt.code = '客户编码';
        this.prompt.name = '客户名';
        this.prompt.mnemonic = '客户助记符';
        this.prompt.pay = true;
        this.cateData = [
          { id: 0, title: '钻石客户' },
          { id: 1, title: '金牌客户' },
          { id: 2, title: '银牌客户' },
          { id: 3, title: '铜牌客户' },
          { id: 4, title: '流失客户' },
          { id: 5, title: '大客户' }
        ];
        this.$refs.cltinfo.open();
      } else {
        this.prompt.title = '合作伙伴信息';
        this.prompt.code = '伙伴编码';
        this.prompt.name = '伙伴名';
        this.prompt.mnemonic = '伙伴助记符';
        this.prompt.pay = false;
        this.cateData = [
          { id: 0, title: '钻石客户1' },
          { id: 1, title: '金牌客户1' },
          { id: 2, title: '银牌客户1' },
          { id: 3, title: '铜牌客户1' },
          { id: 4, title: '流失客户1' },
          { id: 5, title: '大客户1' }
        ];
        this.$refs.cltinfo.open();
      }
    },
    cateChange(value) {
      console.log(value);
    },
    payChange(value) {
      console.log(value);
    },
    AccountChange(value) {
      console.log(value);
    },
    onOk() {
      this.$emit('on-ok');
      this.selectedRowKeys = [];
    }
  }
};
</script>