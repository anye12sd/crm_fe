<template>
  <a-layout>
    <a-layout-header class="main-header">
      <a-row v-if="headerContent.length" type="flex" justify="start" class="bottom-20">
        <a-col v-if="headerContent.includes('add')" class="main-header-div">
          <a-button type="primary" icon="plus" @click="toAdd" class="main-header-div-add"
            >新增</a-button
          >
        </a-col>
        <a-col v-if="headerContent.includes('text')" class="main-header-div">
          <p class="main-header-text">编码规则：<span>X-XX-XXX-XXX-0001</span></p>
        </a-col>
        <a-col v-if="headerContent.includes('clientext')" class="main-header-div">
          <p class="main-header-text">编码规则：<span>XXX-XXXX</span></p>
        </a-col>
        <a-col v-if="headerContent.includes('organSelect')" class="main-header-div">
          <a-select default-value="2" style="width: 150px" @change="handleChange">
            <a-select-option value="1"> 全部</a-select-option>
            <a-select-option value="2"> JiHuiCRM</a-select-option>
            <a-select-option value="3"> JiHuiKey</a-select-option>
            <a-select-option value="4"> JiHuiDSS</a-select-option>
          </a-select>
        </a-col>
        <a-col v-if="headerContent.includes('tableSelect')" class="main-header-div">
          <a-select
            style="width: 150px"
            :default-value="tableSelectIndex"
            @change="tableSelectChange"
          >
            <template v-for="(item) in tableColumnsArray">
              <a-select-option :name="item.engName" :key="item.engName" :value="item.id">
                {{ item.name }}</a-select-option
              >
            </template>
          </a-select>
        </a-col>
        <div class="main-header-div-fr-box">
          <a-col v-if="headerContent.includes('rightAdd')" class="main-header-div">
            <a-button type="link" @click="toAdd">新增</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('displaylist')" class="main-header-div">
            <a-button type="link" @click="toDisplay">我的显示</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('myOrder')" class="main-header-div">
            <a-button type="link" @click="toMyOrder">我的订阅</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('search')" class="main-header-div">
            <a-button type="link" @click="toSearch">查询</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('select')" class="main-header-div">
            <a-select
              default-value="我的查询"
              dropdownClassName="header-search-group-box"
              style="width: 150px"
              @change="headerSelectChange"
            >
              <a-select-opt-group>
                <a-select-option value="我的查询" key="mySearch"> 我的查询 </a-select-option>
              </a-select-opt-group>
              <a-select-opt-group v-if="headerContentSelect.length" class="header-search-group">
                <template v-for="item in headerContentSelect">
                  <a-select-option :key="item.label" :value="item.name">
                    {{ item.name }}
                  </a-select-option>
                </template>
              </a-select-opt-group>
              <a-select-opt-group>
                <a-select-option value="加入到我的查询" key="joinToMySearch" @click="addItem">
                  加入到我的查询
                </a-select-option>
                <a-select-option value="整理我的查询" key="arrangeMySearch" @click="arrangeItem">
                  整理我的查询
                </a-select-option>
              </a-select-opt-group>
            </a-select>
            <a-modal
              :title="addTitle"
              :visible="addvisible"
              @ok="addOk"
              @cancel="addCancel"
              ok-text="确认"
              cancel-text="取消"
            >
              <a-form-model layout="horizontal" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="查询名称">
                  <a-input placeholder="查询名称" />
                </a-form-model-item>
                <a-form-model-item label="日期偏移">
                  <a-radio-group :options="plainOptions" @change="dateChange" />
                </a-form-model-item>
                <a-form-model-item label="">
                  <a-checkbox @change="defaultChange"> 默认查询 </a-checkbox>
                </a-form-model-item>
              </a-form-model>
            </a-modal>
          </a-col>
          <a-col v-if="headerContent.includes('excel')" class="main-header-div">
            <a-button type="link">excel</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('statistics')" class="main-header-div">
            <a-button type="link" @click="toStatistics">统计</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('addFromCollect')" class="main-header-div">
            <a-button type="link" @click="toStatistics">从收藏夹新增</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('clew')" class="main-header-div">
            <a-button type="link">线索</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('complete')" class="main-header-div">
            <a-button type="link">完成情况</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('more')" class="main-header-div">
            <a-button type="link">更多...</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('displayOrder')" class="main-header-div">
            <a-button type="link">显示顺序</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('collect')" class="main-header-div">
            <a-button type="link" @click="toCollect">加入收藏</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('customerCollect')" class="main-header-div">
            <a-button type="link" @click="toCollect">客户收藏</a-button>
          </a-col>
          <a-col v-if="headerContent.includes('partnerCollect')" class="main-header-div">
            <a-button type="link" @click="toCollect">伙伴收藏</a-button>
          </a-col>
        </div>
      </a-row>
    </a-layout-header>
    <a-layout-content class="main-content no-padding" :class="{'hidePage': hidePage }">
      <a-table
        :columns="
          buttons.length === 0
            ? [...columns]
            : buttons.includes('able')
            ? [...columns, ...stopFlagColumns, ...operatColumns]
            : [...columns, ...operatColumns]
        "
        :data-source="tableData"
        :row-key="tableKey || ((tableData, index) => pagination ?  index + (pagination.current * 10) : index)"
        :expanded-row-keys="expandIds"
        :row-selection="hasRowHeaderSelect ? rowSelection : null"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        @expandedRowsChange="expandChange"
        :scroll="{ x: operateBtnFixed ? columns.length * 130 : 0 }"
      >
        <!--                目前先把所有列固定并把table宽改成列数*130，正常operateBtnFixed为false应为0-->
        <template slot="new">
          <a-tag color="red">new</a-tag>
        </template>
        <template slot="stopFlag" slot-scope="text">
          <a-tag :hidden="text === 1" color="green">在用</a-tag>
          <a-tag :hidden="text === 0" color="red">停用</a-tag>
        </template>
        <template slot="saleFlag" slot-scope="text">
          <a-tag v-if="text == 1" color="green">是</a-tag>
          <a-tag v-if="text == 0" color="red">否</a-tag>
        </template>
        <template slot="buyFlag" slot-scope="text">
          <a-tag v-if="text == 1" color="green">是</a-tag>
          <a-tag v-if="text == 0" color="red">否</a-tag>
        </template>
        <template slot="snFlag" slot-scope="text">
          <a-tag v-if="text == 1" color="green">是</a-tag>
          <a-tag v-if="text == 0" color="red">否</a-tag>
        </template>
        <template slot="empGender" slot-scope="text">
          <span>{{ text === 1 ? '女' : '男' }}</span>
        </template>
        <template slot="noticeRead" slot-scope="noticeRead">
          <a-tag :hidden="noticeRead == 0" color="green">已读</a-tag>
          <a-tag :hidden="noticeRead == 1" color="red">new</a-tag>
        </template>
        <template slot="link" slot-scope="text, record">
          <router-link tag="a" :to="{ path: record.link }">{{ text }}</router-link>
        </template>
        <template slot="link2" slot-scope="text, record">
          <!--          某些表可能会有两个超链接的，按顺序排,-->
          <router-link tag="a" :to="{ path: record.link2 }">{{ text }}</router-link>
        </template>
        <template slot="link3" slot-scope="text, record">
          <!--          某些表可能会有特殊超链接的，例如客户中心-客户信息-->
          <router-link tag="a" :to="{ path: record.link3 }">{{ text }}</router-link>
          <a :href="'https://www.baidu.com/s?wd=' + text" target="_blank" style="margin: 0 6px"
            >百度</a
          >
          <a
            :href="'http://www.tianyancha.com/search?key=' + text + '&checkFrom=searchBox'"
            target="_blank"
            >信用</a
          >
        </template>
        <template slot="link4" slot-scope="text">
          <!--          某些表可能会有两个超链接的，按顺序排,-->
          <a :href="'http://' + text" target="_blank">{{ text }}</a>
          <!-- <router-link tag="a" :to="{path: record.link4}">{{text}}</router-link> -->
        </template>
        <template slot="link5" slot-scope="text, record">
          <router-link tag="a" :to="{ path: record.link5 }">{{ text }}</router-link>
        </template>
        <template slot="link6" slot-scope="text, record">
          <router-link tag="a" :to="{ path: record.link6 }">{{ text }}</router-link>
        </template>
        <template slot="operat" slot-scope="text, record, index">
          <a-button-group>
            <template v-for="item in tableBtns">
              <a-tooltip
                v-show="buttons.includes(item.type)"
                v-if="item.type === 'able'"
                :key="item.type"
                :title="record.stopFlag ? '启用' : '停用'"
              >
                <a-button
                  :icon="record.stopFlag ? 'eye-invisible' : 'eye'"
                  @click="toClick(item.type, text, record, index)"
                ></a-button>
              </a-tooltip>
              <a-tooltip
                v-show="buttons.includes(item.type)"
                v-else-if="item.type === 'delete'"
                :key="item.type"
                :title="item.label"
              >
                <a-popconfirm
                  title="删除当前数据？"
                  ok-text="确认并删除"
                  cancel-text="取消"
                  @confirm="toClick(item.type, text, record, index)"
                >
                  <a-icon slot="icon" type="question-circle-o" style="color: #faad14" />
                  <a-button :icon="item.value"></a-button>
                </a-popconfirm>
              </a-tooltip>
              <a-tooltip
                v-show="buttons.includes(item.type)"
                v-else-if="item.type === 'default'"
                :key="item.type"
                :title="item.label"
              >
                <a-button
                  :icon="item.value"
                  :disabled="record.isDefault ? true : false"
                  @click="toClick(item.type, text, record, index)"
                ></a-button>
              </a-tooltip>
              <a-tooltip
                v-show="buttons.includes(item.type)"
                v-else-if="item.type === 'like'"
                :key="item.type"
                :title="item.label"
              >
                <a-button
                  :icon="item.value"
                  :disabled="record.isDefault ? true : false"
                  @click="toClick(item.type, text, record, index)"
                ></a-button>
              </a-tooltip>
              <a-tooltip
                v-show="buttons.includes(item.type)"
                v-else
                :key="item.type"
                :title="item.label"
              >
                <a-button
                  :icon="item.value"
                  @click="toClick(item.type, text, record, index)"
                ></a-button>
              </a-tooltip>
            </template>
          </a-button-group>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  components: {
    // VNodes: {
    //   functional: true,
    //   render: (h, ctx) => ctx.props.vnodes
    // }
  },
  props: {
    hasRowHeaderSelect: Boolean, // 控制table表头是否有复选框或者单选框按钮，false为无
    isCheckbox: Boolean, // 控制table表头为复选框还是单选框，true为checkbox
    tableKey: String,
    columns: Array,
    tableData: Array,
    FormAdd: Array,
    plainOptions: Array,
    buttons: {
      type: Array,
      default: () => {
        return [];
      }
    },
    hidePage: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    tableSelectIndex: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    loading: Boolean,
    batchBtn: Boolean,
    pagination: Object,
    headerContent: {
      type: Array,
      default: () => {
        return [];
      }
    },
    operateBtnFixed: Boolean,
    addTitle: String,
    myQuery: String,
    headerContentSelect: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableColumnsArray: Array
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      tableBtns: [
        {
          label: '详情',
          value: 'container',
          type: 'view'
        },
        {
          label: '编辑',
          value: 'edit',
          type: 'edit'
        },
        {
          label: '复制',
          value: 'copy',
          type: 'copy'
        },
        {
          label: '增加下级',
          value: 'apartment',
          type: 'sub'
        },
        {
          label: '上传',
          value: 'upload',
          type: 'upload'
        },
        {
          label: '启用/停用',
          value: 'able',
          type: 'able'
        },
        {
          label: '删除',
          value: 'delete',
          type: 'delete'
        },
        {
          label: '分配给自己',
          value: 'like',
          type: 'like'
        }
      ],
      isExtanded: false,
      selectIds: [],
      expandIds: [],
      stopFlagColumns: [
        {
          title: '状态',
          dataIndex: 'stopFlag',
          key: 'stopFlag',
          width: 100,
          scopedSlots: { customRender: 'stopFlag' }
        }
      ],
      operatColumns: [
        {
          title: '操作',
          dataIndex: 'operat',
          key: 'operat',
          width: this.buttons.length * 32 + 32,
          fixed: this.operateBtnFixed ? 'right' : false,
          scopedSlots: { customRender: 'operat' }
        }
      ],
      showTotal: (total = this.pagination.total) => {
        return `共 ${total} 条记录`;
      },
      addvisible: false
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.$emit('on-select', selectedRows);
        },
        onSelect: (record, selected, selectedRows, nativeEvent) => {
          console.log('selectedRowKeys345345345:', record);
          this.$emit('on-row-select', record, selected);
        },
        type: this.isCheckbox ? 'checkbox' : 'radio'
      };
    }
  },
  methods: {
    open() {
      this.addvisible = true;
    },
    close() {
      this.addvisible = false;
    },
    toAdd() {
      this.$emit('on-add');
    },
    toSearch() {
      this.$emit('on-search');
    },
    toDisplay() {
      this.$emit('on-display');
    },
    toCollect() {
      this.$emit('on-collect');
    },
    toControl() {
      this.$emit('on-control');
    },
    toStatistics() {
      this.$emit('on-statistics');
    },
    handleChange() {
      this.$emit('on-selectChange');
    },
    toClick(type, text, record, index) {
      this.$emit('on-click-btn', type, text, record, index);
    },
    toBatch(type) {
      this.$emit('on-batch', type, this.selectIds);
    },
    selectChange(id) {
      this.$emit('on-select', id);
      this.selectIds = id;
    },
    addItem() {
      this.$emit('on-additem');
    },
    arrangeItem() {
      this.$emit('on-arrangeitem');
    },
    dateChange(value) {
      this.$emit('on-date', value);
    },
    defaultChange(checkedValues) {
      this.$emit('on-default', checkedValues);
    },
    addOk() {
      this.$emit('on-addOk');
    },
    addCancel() {
      this.$emit('on-addCancel');
    },
    expandChange(id) {
      this.expandIds = id;
    },
    expandAllChange() {
      this.isExtanded = !this.isExtanded;
      if (this.isExtanded) {
        this.expandAllRowKeys(this.tableData);
      } else {
        this.expandIds = [];
      }
    },
    expandAllRowKeys(arr) {
      arr.forEach((item) => {
        this.expandIds.push(item[this.tableKey]);
        if (item.children) {
          this.expandAllRowKeys(item.children);
        }
      });
    },
    paginationChange(current, pageSize) {
      this.$emit('on-page', current, pageSize);
    },
    toMyOrder(){

    },
    tableSelectChange(val, option) {
      // 表头select框事件change监听（资源中心-消息中心详情）
      this.$emit('on-tableSelectChange', { val: val, key: option.data.key });
    },
    headerSelectChange(val, option) {
      // 表头select框事件change监听（我的查询）
      this.$emit('on-headerSelectChange', option.data.key);
    },
    handleTableChange(pagination) {
      this.$emit('on-change-table', pagination);
    }
  }
};
</script>

<style>
.main-footer.active .ant-row-flex {
  justify-content: space-between;
}
</style>