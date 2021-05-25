<template>
  <a-layout>
    <a-layout-header class="main-header">
      <a-descriptions :title="descriptionTitle" bordered size="small">
        <template v-for="(item, key, index) in descriptionColumn">
          <!--                    详情页里的复选框（例：资源中心-产品信息-产品信息详情）-->
          <a-descriptions-item
            v-if="item.name == 'checkbox'"
            :key="index"
            :label="global[item]"
            :span="item.span"
          >
            <a-checkbox-group
              :options="description[item.name]"
              :default-value="['可采购']"
              :disabled="!descriptionEdit"
              @change="descriptionItemCheckboxChange"
            />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'feedbackType' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="typeChange" style="width: 100%">
              <template v-for="(itemtype, index) in fdbktype">
                <a-select-option :key="index" :value="itemtype.id">{{
                  itemtype.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'feedbackCategory' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            {{ descriptionData[item.name] }}
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'status' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="fdbkstatusChange" style="width: 100%">
              <template v-for="(itemstatus, index) in fdbkstatus">
                <a-select-option :key="index" :value="itemstatus.id">{{
                  itemstatus.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'important' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="importantChange" style="width: 100%">
              <template v-for="(itemimportant, index) in importants">
                <a-select-option :key="index" :value="itemimportant.id">{{
                  itemimportant.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'emergency' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="emergencyChange" style="width: 100%">
              <template v-for="(itememergency, index) in emergencys">
                <a-select-option :key="index" :value="itememergency.id">{{
                  itememergency.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'deadline' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-date-picker class="date_picker" @change="dateChange" />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'feedbackTargetType' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-radio-group :options="plainOptions1" v-model="item.value" @change="radioChange1" />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'departmentName' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="deptNameChange" style="width: 100%">
              <template v-for="(itemedeptName, index) in deptNames">
                <a-select-option :key="index" :value="itemedeptName.id">{{
                  itemedeptName.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'feedbackerType' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-radio-group :options="plainOptions2" v-model="item.value" @change="radioChange2" />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'feedbacker' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-input v-if="descriptionEdit" v-model="descriptionData[item.name]" readonly />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'categoryName' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="cateNameChange" style="width: 100%" allowClear>
              <template v-for="(itemecateName, index) in cateNames">
                <a-select-option :key="index" :value="itemecateName.id">{{
                  itemecateName.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'recognizeWay' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="rcnzWayChange" style="width: 100%" allowClear>
              <template v-for="(itemercnzWay, index) in rcnzWays">
                <a-select-option :key="index" :value="itemercnzWay.id">{{
                  itemercnzWay.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'customerCode' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-input
              v-model="inputs.value1"
              style="width: 100px"
              oninput="if(value.length > 3)value = value.slice(0, 3)"
            />
            <span>-</span>
            <a-input
              v-model="inputs.value2"
              style="width: 100px"
              oninput="if(value.length > 4)value = value.slice(0, 4)"
            />
            <a-icon type="search" style="margin: 0 4px" @click="clientSearch" />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'customerName' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-input
              v-model="descriptionData[item.name]"
              style="width: 400px; margin-bottom: 5px"
            />
            <div>
              <a-checkbox :checked="checked" @change="changeAccount"> 自动创建帐户 </a-checkbox>
            </div>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'superiorDepartment' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-input
              class="ant-input"
              style="width: 400px"
              v-model="descriptionData[item.name]"
              readonly
            />
            <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
            <a-icon type="sync" @click="empty" />
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'paymentCredit' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="paymentChange" style="width: 100%" allowClear>
              <template v-for="(itemepayment, index) in payments">
                <a-select-option :key="index" :value="itemepayment.id">{{
                  itemepayment.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="item.name == 'identificationWay' && descriptionEdit"
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            <a-select default-value @change="identWayChange" style="width: 100%" allowClear>
              <template v-for="(itemeidentWay, index) in identWays">
                <a-select-option :key="index" :value="itemeidentWay.id">{{
                  itemeidentWay.title
                }}</a-select-option>
              </template>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item
            v-else-if="
              (item.name == 'createTime' ||
                item.name == 'creator' ||
                item.name == 'changeTime' ||
                item.name == 'closeMember' ||
                item.name == 'closeTime' ||
                item.name == 'changer' ||
                item.name == 'lastContactTime' ||
                item.name == 'reactivity' ||
                item.name == 'valueScales' ||
                item.name == 'industry' ||
                item.name == 'marketMode' ||
                item.name == 'clientSource') &&
              descriptionEdit
            "
            :key="index"
            :label="global[item.name]"
            :span="item.span"
          >
            ---
          </a-descriptions-item>
          <a-descriptions-item v-else :key="index" :label="global[item.name]" :span="item.span">
            {{ descriptionEdit ? '' : description[item.name] }}
            <a-input v-if="descriptionEdit" v-model="descriptionData[item.name]"></a-input>
          </a-descriptions-item>
        </template>
      </a-descriptions>
      <!-- <a-row
        v-if="editButtons.length && descriptionEdit"
        type="flex"
        justify="start"
        class="top-20"
      >
        <a-col v-if="editButtons.includes('save')" class="main-header-div">
          <a-button @click="toSave" size="small" class="main-header-add">保存</a-button>
        </a-col>
        <a-col v-if="editButtons.includes('reset')" class="main-header-div">
          <a-button @click="toReset" size="small" class="main-header-add">重置</a-button>
        </a-col>
        <a-col v-if="editButtons.includes('quit')" class="main-header-div">
          <a-button @click="toQuit" size="small" class="main-header-add">退出</a-button>
        </a-col>
      </a-row>
      <a-row
        v-if="titleButtons.length && !descriptionEdit"
        type="flex"
        justify="start"
        class="top-20"
      >
        <a-col v-if="titleButtons.includes('add')" class="main-header-div">
          <a-button @click="toAdd" size="small" class="main-header-add">新增</a-button>
        </a-col>
        <a-col v-if="titleButtons.includes('mod')" class="main-header-div">
          <a-button @click="toMod" size="small" class="main-header-mod">修改</a-button>
        </a-col>
        <a-col v-if="titleButtons.includes('batch')" class="main-header-div">
          <a-button @click="toBatch" size="small" class="main-header-batch">批量处理</a-button>
        </a-col>
        <a-col v-if="titleButtons.includes('del')" class="main-header-div">
          <a-popconfirm
            title="是否删除当前数据？"
            ok-text="是"
            cancel-text="否"
            @confirm="confirm"
            @cancel="cancel"
          >
            <a-button class="main-header-div-del" size="small">删除</a-button>
          </a-popconfirm>
        </a-col>
        <a-col v-if="titleButtons.includes('out')" class="main-header-div">
          <a-button @click="$router.go(-1)" size="small" class="main-header-div-out">返回</a-button>
        </a-col>
      </a-row> -->
    </a-layout-header>
  </a-layout>
</template>

<script>
import global from '@/utils/global';
export default {
  props: {
    titleButtons: Array,
    editButtons: Array,
    descriptionTitle: String,
    description: Object,
    descriptionColumn: Array,
    descriptionEdit: Boolean,
    checked: Boolean,
    inputs: Object,
    fdbktype: Array,
    fdbkstatus: Array,
    importants: Array,
    emergencys: Array,
    deptNames: Array,
    plainOptions1: Array,
    plainOptions2: Array,
    cateNames: Array,
    rcnzWays: Array,
    payments: Array,
    identWays: Array
  },
  name: 'DescriptionItem',
  data() {
    return {
      global: global.itemList,
      descriptionData: this.description
      // descriptionEdit: false
    };
  },
  mounted() {
    console.log(this.descriptionData);
    console.log(this.description);
  },
  methods: {
    descriptionItemCheckboxChange(value) {
      this.$emit('descriptionItemCheckboxChange', value);
    },
    // 反馈信息-反馈类型
    typeChange(value) {
      this.$emit('typeChange', value);
    },
    // 反馈信息-状态
    fdbkstatusChange(value) {
      this.$emit('fdbkstatusChange', value);
    },
    // 反馈信息-重要性
    importantChange(value) {
      this.$emit('importantChange', value);
    },
    // 反馈信息-紧急性
    emergencyChange(value) {
      this.$emit('emergencyChange', value);
    },
    // 反馈信息-解决期限
    dateChange(date, dateString) {
      this.$emit('dateChange', date, dateString);
    },
    // 反馈信息-反馈对象类型
    radioChange1(e) {
      this.$emit('radioChange1', e);
    },
    // 反馈信息-部门名称
    deptNameChange(value) {
      this.$emit('deptNameChange', value);
    },
    // 反馈信息-反馈者类型
    radioChange2(e) {
      this.$emit('radioChange2', e);
    },
    // 客户信息-客户编码
    clientSearch() {
      this.$emit('clientSearch');
    },
    // 客户信息-客户名
    changeAccount(e) {
      this.$emit('changeAccount', e);
    },
    // 客户信息-分类名称
    cateNameChange(value) {
      this.$emit('cateNameChange', value);
    },
    // 客户信息-上级单位选择
    showSearch() {
      this.$emit('showSearch');
    },
    // 客户信息-上级单位清空
    empty() {
      this.$emit('empty');
    },
    // 客户信息-识别方式
    rcnzWayChange(value) {
      this.$emit('rcnzWayChange', value);
    },
    // 客户信息-付款信用
    paymentChange(value) {
      this.$emit('paymentChange', value);
    },
    // 客户信息-认证方式
    identWayChange(value) {
      this.$emit('identWayChange', value);
    },
    toAdd() {
      this.$emit('on-addnew');
    },
    toSave() {
      this.$emit('on-save');
    },
    toReset() {
      this.$emit('on-reset');
    },
    toQuit() {
      this.$emit('on-quit');
    },
    toMod() {
      this.$emit('on-mod');
    },
    toBatch() {
      this.$emit('on-batch');
    },
    toDel() {
      this.$emit('on-del');
    },
    confirm(e) {
      this.$emit('on-confirm');
    },
    cancel(e) {
      console.log(e);
    },
    handleOk() {
      this.$emit('on-fav-ok');
    },
    handleCancel() {
      this.$emit('on-fav-cancel');
    }
  }
};
</script>

<style>
.global-content .main-header .top-20 .main-header-div {
  margin-right: 8px;
}
.date_picker {
  width: 100%;
}
</style>