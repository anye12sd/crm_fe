<template>
  <div class="hello">
    <a-drawer
      title="查询数据"
      placement="right"
      width="800"
      :visible="visible"
      class="drawer_open"
      @close="onClose"
    >
      <a-form layout="vertical" hide-required-mark>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="创建时间"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="修改时间"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="最近联络时间"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" />
              <a-checkbox @change="onChange" class="exclude">排除</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="订单日期"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" />
              <a-checkbox @change="onChange" class="exclude">排除</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="预期交付日期"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" />
              <a-checkbox @change="onChange" class="exclude">排除</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              compact
              label="编码"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                style="width: 12.723%"
                oninput="if(value.length > 3)value = value.slice(0, 3)"
              />
              <span>-</span>
              <a-input
                style="width: 12.723%"
                oninput="if(value.length > 3)value = value.slice(0, 3)"
              />
              <span>-</span>
              <a-input
                style="width: 12.723%"
                oninput="if(value.length > 4)value = value.slice(0, 4)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="客户"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <input
                class="ant-input"
                style="width: 34%"
                type="text"
                v-model="selectedFriend.friendName"
                readonly
              />
              <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
              <a-modal
                v-model="friendModal"
                title="客户中心"
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
                        label="客户/伙伴名称"
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
                      <div class="left">客户列表</div>
                      <div class="right">
                        <a @click="addFriend">新增</a>
                        <a-modal
                          v-model="friendInfor"
                          title="客户信息"
                          @ok="infoSearch"
                          width="1000px"
                          ok-text="保存"
                          cancel-text="取消"
                          class="Fmodal"
                        >
                          <a-row :gutter="24">
                            <a-form layout="vertical" hide-required-mark class>
                              <a-col :span="8">
                                <a-form-item
                                  compact
                                  label="客户编码"
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
                                  label="客户名"
                                  :label-col="formItemLayout.labelColT"
                                  :wrapper-col="formItemLayout.wrapperColT"
                                >
                                  <a-input allow-clear />
                                </a-form-item>
                              </a-col>
                              <a-col :span="8">
                                <a-form-item
                                  compact
                                  label="分类名称"
                                  :label-col="formItemLayout.labelColT"
                                  :wrapper-col="formItemLayout.wrapperColT"
                                >
                                  <span>大客户</span>
                                </a-form-item>
                              </a-col>
                              <a-col :span="8">
                                <a-form-item
                                  compact
                                  label="最近联络时间"
                                  :label-col="formItemLayout.labelColT"
                                  :wrapper-col="formItemLayout.wrapperColT"
                                >
                                  <span>---</span>
                                </a-form-item>
                              </a-col>
                              <a-col :span="8">
                                <a-form-item
                                  compact
                                  label="域名1"
                                  :label-col="formItemLayout.labelColT"
                                  :wrapper-col="formItemLayout.wrapperColT"
                                >
                                  <a-input
                                    allow-clear
                                    v-decorator="[
                                      'gender',
                                      {
                                        rules: [
                                          { required: true, message: 'Please input your name' }
                                        ]
                                      }
                                    ]"
                                  />
                                </a-form-item>
                              </a-col>
                            </a-form>
                          </a-row>
                        </a-modal>
                      </div>
                    </template>
                  </a-table>
                </a-row>
              </a-modal>
              <a-icon type="sync" @click="empty" />
              <a-checkbox @change="onChange" class="exclude">包含下级</a-checkbox>
              <a-checkbox @change="onChange" class="exclude">包含关联</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="客户助记符"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="客户名"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="分类名称"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-select default-value @change="handleChange">
                  <a-select-option value="钻石客户">钻石客户</a-select-option>
                  <a-select-option value="金牌客户">金牌客户</a-select-option>
                  <a-select-option value="银牌客户">银牌客户</a-select-option>
                  <a-select-option value="铜牌客户">铜牌客户</a-select-option>
                  <a-select-option value="流失客户">流失客户</a-select-option>
                  <a-select-option value="大客户">大客户</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="电话"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="电子邮件"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="联系人姓名"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="负责员工"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <input class="ant-input" style="width: 85%" type="text" readonly />
                <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
                <a-icon type="sync" @click="empty" />
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="负责部门"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-select default-value @change="handleChange">
                  <a-select-option value="集团总公司">集团总公司</a-select-option>
                  <a-select-option value="集团财务部">集团财务部</a-select-option>
                  <a-select-option value="阳光队">阳光队</a-select-option>
                  <a-select-option value="开拓队">开拓队</a-select-option>
                  <a-select-option value="飞跃队">飞跃队</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="识别方式"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-select default-value @change="handleChange">
                  <a-select-option value="机汇网用户名">机汇网用户名</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-form-item
                label="识别号码"
                :label-col="formItemLayout.labelColy"
                :wrapper-col="formItemLayout.wrapperColy"
              >
                <a-input />
              </a-form-item>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-col :span="12" style="padding: 0">
              <a-checkbox @change="onChange" class="exclude exclude1">在用</a-checkbox>
              <a-checkbox @change="onChange" class="exclude">停用</a-checkbox>
              <a-checkbox @change="onChange" class="exclude">现有客户</a-checkbox>
              <a-checkbox @change="onChange" class="exclude">潜在客户</a-checkbox>
            </a-col>
            <a-col :span="12" style="padding: 0">
              <a-checkbox @change="onChange" class="exclude exclude1">无负责员工</a-checkbox>
              <a-checkbox @change="onChange" class="exclude">无负责部门</a-checkbox>
            </a-col>
          </a-col>
        </a-row>
      </a-form>
      <a-button type="link" @click="openData" class="showborder openborder" v-if="showData">
        展开
        <a-icon type="double-left" />
      </a-button>
      <a-button type="link" @click="offData" class="showborder offborder" v-if="!showData">
        收起
        <a-icon type="double-left" />
      </a-button>
      <a-form layout="vertical" hide-required-mark v-if="!showData">
        <a-row :gutter="24">
          <div class="toggleShow">
            <a-col :span="24">
              <a-col :span="12" style="padding: 0">
                <a-form-item
                  label="移动电话"
                  :label-col="formItemLayout.labelColy"
                  :wrapper-col="formItemLayout.wrapperColy"
                >
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0">
                <a-form-item
                  label="传真"
                  :label-col="formItemLayout.labelColy"
                  :wrapper-col="formItemLayout.wrapperColy"
                >
                  <a-input />
                </a-form-item>
              </a-col>
            </a-col>
            <a-col :span="24">
              <a-col :span="12" style="padding: 0">
                <a-form-item
                  label="创建人"
                  :label-col="formItemLayout.labelColy"
                  :wrapper-col="formItemLayout.wrapperColy"
                >
                  <input class="ant-input" style="width: 85%" type="text" readonly />
                  <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
                  <a-icon type="sync" @click="empty" />
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0">
                <a-form-item
                  label="修改人"
                  :label-col="formItemLayout.labelColy"
                  :wrapper-col="formItemLayout.wrapperColy"
                >
                  <input class="ant-input" style="width: 85%" type="text" readonly />
                  <a-icon type="search" style="margin: 0 4px" @click="showSearch" />
                  <a-icon type="sync" @click="empty" />
                </a-form-item>
              </a-col>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="备注"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input />
              </a-form-item>
            </a-col>
          </div>
        </a-row>
      </a-form>
      <div
        :style="{
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 22px',
          background: '#fff',
          textAlign: 'left',
          zIndex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0
        }"
      >
        <a-button type="primary" @click="onClose" :style="{ marginRight: '8px' }">查询</a-button>
        <a-button @click="onClose">取消</a-button>
      </div>
    </a-drawer>
  </div>
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
    title: '客户编码',
    dataIndex: 'friendId',
    scopedSlots: { customRender: 'friendId' }
  },
  {
    title: '客户名',
    dataIndex: 'friendName',
    scopedSlots: { customRender: 'friendName' }
  },
  {
    title: '客户助记符',
    className: 'friendMnemonic',
    dataIndex: 'friendMnemonic'
  },
  {
    title: '电话',
    dataIndex: 'friendPhone'
  },
  {
    title: '电子邮件',
    dataIndex: 'friendEmail'
  }
];

const friendData = [
  {
    key: '1',
    friendId: '000-000-0000',
    friendName: '张三',
    friendMnemonic: '001',
    friendPhone: '13838383888',
    friendEmail: 'zhangsan@zs.com'
  },
  {
    key: '2',
    friendId: '000-000-0001',
    friendName: '李四',
    friendMnemonic: '002',
    friendPhone: '13434343444',
    friendEmail: 'lisi@ls.com'
  },
  {
    key: '3',
    friendId: '000-000-0002',
    friendName: '王五',
    friendMnemonic: '003',
    friendPhone: '13535353555',
    friendEmail: 'wangwu@ww.com'
  }
];
export default {
  name: 'Form',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      friendColumns,
      friendData,
      formItemLayout,
      showData: true,
      advancedData: true,
      visible: false,
      friend: '',
      friendModal: false,
      friendInfor: false,
      selectedRowKeys: [],
      selectedFriend: ''
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    openData() {
      this.showData = !this.showData;
    },
    offData() {
      this.showData = !this.showData;
    },
    openAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    offAdvancedData() {
      this.advancedData = !this.advancedData;
    },
    onClose() {
      this.visible = !this.visible;
      this.showData = true;
    },
    empty() {
      this.selectedFriend = '';
    },
    showSearch() {
      this.friendModal = true;
    },
    hideSearch() {
      this.friendModal = false;
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedFriend = this.friendData[this.selectedRowKeys - '1'];
    },
    addFriend() {
      this.friendInfor = true;
    },
    infoSearch() {
      this.friendInfor = false;
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  }
};
</script>

<style>
.left {
  float: left;
}
.right {
  float: right;
}
.ant-drawer-body {
  padding: 24px 24px 0 24px;
}
.drawer_open .ant-form-vertical .ant-form-item-label {
  line-height: 32px;
  background: #f6f6f6;
  padding: 0 5px;
  text-align: center;
}
.exclude {
  padding-left: 10px;
}
.exclude1 {
  padding-left: 0;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0;
}
.ant-checkbox + span {
  padding-right: 0;
  padding-left: 4px;
}
.showborder {
  width: 100%;
  margin-top: 10px;
}
.showborder:hover,
.showborder:focus,
.showborder:active {
  border-color: none;
}
.showborder.openborder .anticon svg {
  transform: rotate(-90deg);
}
.showborder.offborder .anticon svg {
  transform: rotate(90deg);
}
.toggleShow {
  overflow: hidden;
  padding-top: 20px;
  margin-top: 7px;
  position: relative;
  padding-bottom: 60px;
}
.toggleShow:after {
  content: '';
  display: block;
  width: calc(100% - 30px);
  background: #e9e9e9;
  height: 1px;
  position: absolute;
  top: 0;
  left: 15px;
}
.ant-calendar-picker {
  width: 40%;
}
.ant-form-item-label {
  text-align: left;
}
.Fmodal .ant-modal-body {
  padding: 24px 24px 10px 24px;
}
.Fmodal .ant-modal-footer {
  border-top: none;
}
.Fmodal .ant-table-pagination.ant-pagination {
  margin-bottom: 0;
}
.ant-form:after,
.ant-table-title:after {
  content: '';
  display: block;
  clear: both;
}
.advanced_show {
  margin-top: 15px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}
.advanced_show .ant-form-item {
  padding-bottom: 0;
}
</style>
