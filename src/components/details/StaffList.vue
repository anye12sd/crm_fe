<template>
  <a-layout class="main-layout">
    <a-layout-header class="main-header">
      <a-descriptions title="员工选择" bordered size="small">
        <a-descriptions-item label="员工编码">
          <a-input v-model="form.staffCode" placeholder="员工编码" />
        </a-descriptions-item>
        <a-descriptions-item label="助记码">
          <a-input v-model="form.mnemonicCode" placeholder="助记码" />
        </a-descriptions-item>
        <a-descriptions-item label="员工姓名">
          <a-input v-model="form.staffName" placeholder="员工姓名" />
        </a-descriptions-item>
        <a-descriptions-item label="部门名称" :span="2">
          <a-select
            @change="handleChange"
            placeholder="请选择部门名称"
            style="width: 40.5%; margin-right: 10px"
            allowClear
          >
            <a-select-option v-for="(item, index) in sectionData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
          <a-checkbox @change="lowChange"> 包含下级部门 </a-checkbox>
        </a-descriptions-item>
        <a-descriptions-item label="员工角色">
          <a-select
            @change="roleChange"
            placeholder="请选择员工角色"
            style="width: 100%"
            allowClear
          >
            <a-select-option v-for="(item, index) in roleData" :key="item.id" :value="index">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
      </a-descriptions>
      <div class="input_right">
        <div class="left">
          <span style="margin-right: 10px">状态</span>
          <a-checkbox-group
            :options="plainOptions"
            :default-value="['在用']"
            @change="onCheckChange"
          />
        </div>
        <div class="right">
          <a-button type="primary" size="small"> 查询 </a-button>
          <a-button type="link" size="small" @click="openChange" v-if="advancedData">
            高级查询
          </a-button>
          <a-button type="link" size="small" @click="offChange" v-if="!advancedData">
            高级查询
          </a-button>
        </div>
      </div>
      <a-divider />
      <div v-show="!advancedData">
        <a-descriptions
          bordered
          size="small"
          :column="{ xxl: 4, xl: 4, lg: 2, md: 2, sm: 2, xs: 2 }"
        >
          <a-descriptions-item label="身份证号">
            <a-input v-model="form.IDCard" placeholder="身份证号" />
          </a-descriptions-item>
          <a-descriptions-item label="生日">
            <a-range-picker @change="birthdayChange" style="width: 100%" />
          </a-descriptions-item>
          <a-descriptions-item label="籍贯">
            <a-input v-model="form.nativePlace" placeholder="籍贯" />
          </a-descriptions-item>
          <a-descriptions-item label="员工地址">
            <a-input v-model="form.staffAddress" placeholder="员工地址" />
          </a-descriptions-item>
          <a-descriptions-item label="性别">
            <a-select @change="sexChange" placeholder="请选择性别" style="width: 100%" allowClear>
              <a-select-option v-for="(item, index) in sexData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="备注">
            <a-input v-model="form.remarks" placeholder="备注" />
          </a-descriptions-item>
          <a-descriptions-item label="学历">
            <a-select
              @change="educationChange"
              placeholder="请选择学历"
              style="width: 100%"
              allowClear
            >
              <a-select-option v-for="(item, index) in educationData" :key="item.id" :value="index">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-descriptions-item>
          <a-descriptions-item label="入职时间">
            <a-input v-model="form.entryTime" placeholder="入职时间" />
          </a-descriptions-item>
          <a-descriptions-item label="离职时间">
            <a-input v-model="form.departureTime" placeholder="离职时间" />
          </a-descriptions-item>
          <a-descriptions-item label="QQ">
            <a-input v-model="form.qq" placeholder="QQ" />
          </a-descriptions-item>
          <a-descriptions-item label="民族">
            <a-input v-model="form.nation" placeholder="民族" />
          </a-descriptions-item>
          <a-descriptions-item label="微信号">
            <a-input v-model="form.wechat" placeholder="微信号" />
          </a-descriptions-item>
          <a-descriptions-item label="现住址">
            <a-input v-model="form.currentAddress" placeholder="现住址" />
          </a-descriptions-item>
          <a-descriptions-item label="兴趣爱好">
            <a-input v-model="form.hobby" placeholder="兴趣爱好" />
          </a-descriptions-item>
          <a-descriptions-item label="政治面貌">
            <a-input v-model="form.politicalOutlook" placeholder="政治面貌" />
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
      </div>
      <a-table
        class="staff_table"
        :columns="columns"
        :data-source="tableData"
        rowKey="staffCode"
        :pagination="pagination"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: selectChange }"
      >
        <template slot="title">
          <div class="left">员工列表</div>
        </template>
        <template slot="footer">
          <a-button size="small" @click="selectData" style="margin-right: 8px">选用</a-button>
          <a-button size="small" @click="selectAllData" style="margin-right: 8px"
            >全部选用</a-button
          >
          <a-button size="small" @click="clearAll">清空</a-button>
        </template>
      </a-table>
    </a-layout-header>
  </a-layout>
</template>

<script>
export default {
  name: 'StaffList',
  props: {
    poData: Array,
    educationData: Array,
    sexData: Array,
    roleData: Array,
    sectionData: Array,
    form: Object
  },
  data() {
    return {
      columns: [
        {
          title: '员工编码',
          dataIndex: 'staffCode',
          key: 'staffCode'
        },
        {
          title: '员工姓名',
          dataIndex: 'staffName',
          key: 'staffName'
        },
        {
          title: '助记码',
          dataIndex: 'mnemonicCode',
          key: 'mnemonicCode'
        },
        {
          title: '部门名称',
          dataIndex: 'deptName',
          key: 'deptName'
        },
        {
          title: '移动电话',
          dataIndex: 'mobilephone',
          key: 'mobilephone'
        },
        {
          title: '办公电话',
          dataIndex: 'officephone',
          key: 'officephone'
        },
        {
          title: '电子邮件',
          dataIndex: 'email',
          key: 'email'
        }
      ],
      tableData: [
        {
          staffCode: '0000',
          staffName: '签到系统',
          mnemonicCode: 'qdxt',
          deptName: '业务机构管理机构',
          mobilephone: '13838438438',
          officephone: '87181154',
          email: 'qq@qq.com'
        },
        {
          staffCode: '0001',
          staffName: '测试名称',
          mnemonicCode: 'csmc',
          deptName: '测试管理机构',
          mobilephone: '18383483483',
          officephone: '84511817',
          email: 'qq@qq.com'
        }
      ],
      pagination: {
        total: 2,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条数据`
      },
      advancedData: true,
      selectedRowKeys: [],
      plainOptions: [
        { label: '在用', value: '在用' },
        { label: '停用', value: '停用' }
      ]
    };
  },
  methods: {
    open() {
      this.advancedData = false;
    },
    close() {
      this.advancedData = true;
    },
    selectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    selectAllData() {},
    selectData() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择客户!');
      } else {
        this.selectedRowKeys = [];
      }
    },
    clearAll() {
      this.selectedRowKeys = [];
    },
    handleChange(value) {
      this.$emit('on-change-mode', value);
    },
    lowChange(value) {
      this.$emit('on-change-low', value);
    },
    roleChange(value) {
      this.$emit('on-change-role', value);
    },
    sexChange(value) {
      this.$emit('on-change-sex', value);
    },
    educationChange(value) {
      this.$emit('on-change-education', value);
    },
    birthdayChange(date, dateString) {
      this.$emit('on-change-birthday', date, dateString);
    },
    openChange() {
      this.$emit('on-change-open');
    },
    offChange() {
      this.$emit('on-change-off');
    },
    onCheckChange(value) {
      console.log(value);
      this.$emit('on-change-check', value);
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
