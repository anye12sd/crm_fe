<template>
  <a-drawer
    title="分类信息"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
    width="80%"
  >
    <a-descriptions bordered size="small">
      <a-descriptions-item label="客户名"> 东莞市知行易网络科技有限公司 </a-descriptions-item>
      <a-descriptions-item label="联系人姓名"> 黎嘉铭 </a-descriptions-item>
      <a-descriptions-item label="性别"> 女 </a-descriptions-item>
      <a-descriptions-item label="直接上级"> </a-descriptions-item>
      <a-descriptions-item label="职务"> </a-descriptions-item>
      <a-descriptions-item label="状态"> 在职 </a-descriptions-item>
      <a-descriptions-item label="人员特性"> 决策人 </a-descriptions-item>
      <a-descriptions-item label="称呼"></a-descriptions-item>
      <a-descriptions-item label="电子邮件"></a-descriptions-item>
      <a-descriptions-item label="QQ"></a-descriptions-item>
      <a-descriptions-item label="移动电话">13422377229</a-descriptions-item>
      <a-descriptions-item label="统一联络时间"></a-descriptions-item>
      <a-descriptions-item label="客户邮件"></a-descriptions-item>
      <a-descriptions-item label="移动电话呼叫次数"></a-descriptions-item>
      <a-descriptions-item label="客户电话"></a-descriptions-item>
      <a-descriptions-item label="办公电话"></a-descriptions-item>
      <a-descriptions-item label="市府网"></a-descriptions-item>
      <a-descriptions-item label="传真"></a-descriptions-item>
      <a-descriptions-item label="婚姻状况">其他</a-descriptions-item>
      <a-descriptions-item label="修改人"></a-descriptions-item>
      <a-descriptions-item label="家庭电话"></a-descriptions-item>
      <a-descriptions-item label="身份证号"></a-descriptions-item>
      <a-descriptions-item label="详细地址"></a-descriptions-item>
      <a-descriptions-item label="出生日期"></a-descriptions-item>
      <a-descriptions-item label="每月联系"></a-descriptions-item>
      <a-descriptions-item label="每月联系方式"></a-descriptions-item>
      <a-descriptions-item label="成熟度"></a-descriptions-item>
    </a-descriptions>
    <div class="tabs-box">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="负责员工">
          <a-table rowKey="staffCode" :columns="columns" :data-source="data">
            <template slot="title">
              <div class="flex space-between">
                <div>员工列表</div>
                <div>
                  <a-button>新增</a-button>
                </div>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <a-button-group>
                <a-tooltip title="删除">
                  <a-popconfirm
                    title="删除当前数据？"
                    ok-text="确认并删除"
                    cancel-text="取消"
                    @confirm="toClick(text, record, index)"
                  >
                    <a-icon slot="icon" type="question-circle-o" style="color: #faad14" />
                    <a-button icon="delete"></a-button>
                  </a-popconfirm>
                </a-tooltip>
              </a-button-group>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="负责部门"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="3" tab="影响"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="4" tab="单位变更"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="5" tab="价值变动"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="6" tab="参与的市场活动"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="7" tab="相关反馈"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="8" tab="相关任务"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="9" tab="工作记录"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="10" tab="工作日程"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="11" tab="销售机会"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="12" tab="待办事宜"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="13" tab="已收邮件"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="14" tab="已发邮件"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="15" tab="附件"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: 'ViewCategoryDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      columns: [
        { title: '员工编码', dataIndex: 'staffCode', key: 'staffCode' },
        { title: '员工姓名', dataIndex: 'staffName', key: 'staffName' },
        { title: '助记码', dataIndex: 'mnemonicCode', key: 'mnemonicCode' },
        { title: '部门名称', dataIndex: 'departmentName', key: 'departmentName' },
        { title: '员工职务', dataIndex: 'position', key: 'position' },
        { title: '员工角色', dataIndex: 'role', key: 'role' },
        { title: '登录名', dataIndex: 'loginName', key: 'loginName' },
        { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      data: [
        {
          staffCode: 'df0207',
          staffName: '卢宇翔',
          mnemonicCode: 'lyx',
          departmentName: '机汇智能建站',
          position: '',
          role: '销售代表 服务代表 市场总监 ',
          loginName: 'lyx'
        }
      ]
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    toClick(type, text, record, index) {
      this.$emit('on-click-btn', type, text, record, index);
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
