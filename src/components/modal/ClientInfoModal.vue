<template>
  <a-modal v-model="clientInfor" :title="prompt.title" width="1000px" class="Fmodal" :footer="null">
    <a-descriptions bordered size="small">
      <a-descriptions-item :label="prompt.code" :span="2">
        <a-input style="width: 12.723%" oninput="if(value.length > 3)value = value.slice(0, 3)" />
        <span>-</span>
        <a-input style="width: 12.723%" oninput="if(value.length > 4)value = value.slice(0, 4)" />
        <a-icon type="search" style="margin: 0 4px" @click="clientSearch" />
      </a-descriptions-item>
      <a-descriptions-item :label="prompt.mnemonic">
        <a-input :placeholder="prompt.mnemonic" />
      </a-descriptions-item>
      <a-descriptions-item :label="prompt.name" :span="2">
        <div class="li_name" style="width: 300px; margin-bottom: 5px">
          <a-input :placeholder="prompt.name" />
        </div>
        <div class="li_account">
          <a-checkbox :checked="checked" @change="accountChange"> 自动创建帐户 </a-checkbox>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="分类名称" :key="selectKey">
        <a-select @change="cateChange" placeholder="请选择分类名称" style="width: 100%" allowClear>
          <a-select-option v-for="(item, index) in cateData" :key="item.id" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item label="上级单位" :span="2"> </a-descriptions-item>
      <a-descriptions-item label="最近联络时间">
        <a-input disabled />
      </a-descriptions-item>
      <a-descriptions-item label="详细地址" :span="3">
        <a-input placeholder="详细地址" style="width: 300px" />
      </a-descriptions-item>
      <a-descriptions-item label="传真" :span="1">
        <a-input placeholder="传真" />
      </a-descriptions-item>
      <a-descriptions-item label="电话" :span="2">
        <a-input placeholder="电话" />
      </a-descriptions-item>
      <a-descriptions-item label="邮编" :span="1">
        <a-input placeholder="邮编" />
      </a-descriptions-item>
      <a-descriptions-item label="电子邮件" :span="1">
        <a-input placeholder="电子邮件" />
      </a-descriptions-item>
      <a-descriptions-item label="反应特性" :span="1">
        <a-input placeholder="反应特性" />
      </a-descriptions-item>
      <a-descriptions-item label="付款信用" v-if="prompt.pay" :span="3" :key="selectKey">
        <a-select @change="payChange" placeholder="请选择付款信用" style="width: 100%" allowClear>
          <a-select-option v-for="(item, index) in payData" :key="item.id" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item label="备注" :span="3">
        <a-textarea allow-clear :rows="3" />
      </a-descriptions-item>
    </a-descriptions>
    <div class="change-box">
      <a-button size="small" style="margin-right: 6px" @click="saveForm">保存</a-button>
      <a-button size="small" @click="onReset" style="margin-right: 6px"> 重置 </a-button>
      <a-button size="small" @click="goOut">退出</a-button>
    </div>
  </a-modal>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
  labelColy: { span: 6 },
  wrapperColy: { span: 16 }
};
export default {
  name: 'ClientInfoModal',
  props: {
    form: Object,
    prompt: Object,
    cateData: Array,
    payData: Array
  },
  data() {
    return {
      formItemLayout,
      visible: false,
      checked: true,
      clientInfor: false,
      selectedRowKeys: [],
      selectedFriend: '',
      selectKey: ''
    };
  },
  methods: {
    open() {
      this.clientInfor = true;
    },
    clientSearch() {
      this.$message.warning('编码输入信息不全，只能匹配其中一段!');
    },
    cateChange(value) {
      this.$emit('on-change-cate', value);
    },
    accountChange(e) {
      this.$emit('on-change-account', e);
    },
    payChange(value) {
      this.$emit('on-change-pay', value);
    },
    onReset() {
      this.form = {};
      this.selectKey = Math.random();
    },
    saveForm() {},
    goOut() {
      this.clientInfor = false;
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