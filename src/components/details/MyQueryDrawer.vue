<template>
  <a-drawer :title="myQuery" :visible="queryvisible" @close="onClose" width="50%">
    <a-table
      :loading="loading"
      :columns="
        btns.length === 0
          ? [...queryColumns]
          : [...stopFlagColumns, ...queryColumns, ...operatColumns]
      "
      :data-source="queryData"
      :row-key="(queryData, index) => index"
      :pagination="false"
    >
      <template slot="e" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="operat" slot-scope="text, record, index">
        <a-button-group>
          <template v-for="item in tableBtns">
            <a-tooltip
              v-show="btns.includes(item.type)"
              v-if="item.type === 'delete'"
              :key="item.type"
              :title="item.label"
            >
              <a-popconfirm
                title="删除当前数据？"
                ok-text="确认并删除"
                cancel-text="取消"
                @confirm="toQueryClick(item.type, text, record, index)"
              >
                <a-icon slot="icon" type="question-circle-o" style="color: #faad14" />
                <a-button :icon="item.value"></a-button>
              </a-popconfirm>
            </a-tooltip>
            <a-tooltip
              v-show="btns.includes(item.type)"
              v-else-if="item.type === 'star'"
              :key="item.type"
              :title="item.label"
            >
              <a-popconfirm
                title="是否设为默认？"
                ok-text="是"
                cancel-text="否"
                @confirm="toQueryClick(item.type, text, record, index)"
              >
                <a-icon slot="icon" type="question-circle-o" style="color: #faad14" />
                <a-button class="ant-btn-icon-only">
                  <template v-if="record.stopFlag === '1'">
                    <a-icon type="star" />
                  </template>
                  <template v-if="record.stopFlag === '2'">
                    <a-icon type="star" theme="filled" />
                  </template>
                </a-button>
              </a-popconfirm>
            </a-tooltip>
          </template>
        </a-button-group>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: {
    queryColumns: Array,
    queryData: Array,
    operateFixed: Boolean,
    myQuery: String,
    loading: Boolean,
    btns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      tableBtns: [
        {
          label: '删除',
          value: 'delete',
          type: 'delete'
        },
        {
          label: '设为默认',
          value: 'star',
          type: 'star'
        }
      ],
      stopFlagColumns: [
        {
          title: '序号',
          key: 'e',
          dataIndex: 'e',
          scopedSlots: { customRender: 'e' }
        }
      ],
      operatColumns: [
        {
          title: '操作',
          dataIndex: 'operat',
          key: 'operat',
          width: this.btns.length * 32 + 32,
          fixed: this.operateFixed ? 'right' : false,
          scopedSlots: { customRender: 'operat' }
        }
      ],
      queryvisible: false
    };
  },
  methods: {
    queryopen() {
      this.queryvisible = true;
    },
    queryclose() {
      this.queryvisible = false;
    },
    onClose() {
      this.$emit('on-close');
    },
    toQueryClick(type, text, record, index) {
      this.$emit('on-queryclick-btn', type, text, record, index);
    }
  }
};
</script>