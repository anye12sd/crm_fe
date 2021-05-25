<template>
  <client-list
    :form="form"
    :modeData="modeData"
    :columns="columns"
    :tableData="tableData"
    :pagination="pagination"
    :categoryData="categoryData"
    :featuresData="featuresData"
    :modelData="modelData"
    :industryData="industryData"
    :sourceData="sourceData"
    :levelData="levelData"
    :creditData="creditData"
    @on-change-mode="onChangeMode"
    @on-change-cate="onChangeCate"
    @on-change-features="onChangeFeatures"
    @on-change-credit="onChangeCredit"
    @on-change-level="onChangeLevel"
    @on-change-source="onChangeSource"
    @on-change-industry="onChangeIndustry"
    @on-change-model="onChangeModel"
    @on-change-open="onChangeOpen"
    @on-change-off="onChangeOff"
    @on-change-table="onChangeTable"
    ref="client"
  ></client-list>
</template>

<script>
import api from '@/api/friend';
import ClientList from '@/components/details/ClientList';
export default {
  name: 'ClienListDetail',
  components: { ClientList },
  data() {
    return {
      form: {
        code: '',
        name: '',
        mnemonic: '',
        mode: '',
        number: '',
        category: '',
        features: '',
        credit: '',
        level: '',
        source: '',
        industry: '',
        model: ''
      },
      columns: [
        {
          title: '客户编码',
          dataIndex: 'clientCode',
          key: 'clientCode'
        },
        {
          title: '客户名',
          dataIndex: 'clientName',
          key: 'clientName'
        },
        {
          title: '客户助记符',
          dataIndex: 'clientMnemonic',
          key: 'clientMnemonic'
        },
        {
          title: '电话',
          dataIndex: 'telephone',
          key: 'telephone'
        },
        {
          title: '电子邮件',
          dataIndex: 'email',
          key: 'email'
        }
      ],
      tableData: [
        {
          clientCode: '111-0000',
          clientName: '智客商服投资管理有限公司',
          clientMnemonic: 'zk',
          telephone: '87456321',
          email: 'qq@qq.com'
        },
        {
          clientCode: '263-2715',
          clientName: '测试公司',
          clientMnemonic: 'cs',
          telephone: '87456444',
          email: 'ali@ali.com'
        }
      ],
      pagination: {
        total: 0,
        current: 1,
        page_size: 10,
        showTotal: (total) => `共 ${total} 条数据`
      },
      params: {
        //第几页
        page: 1
      },
      modeData: [
        { id: '0', title: '身份证' },
        { id: '1', title: '机汇网用户名' }
      ],
      categoryData: [
        { id: '0', title: '钻石客户' },
        { id: '1', title: '金牌客户' },
        { id: '2', title: '银牌客户' },
        { id: '3', title: '铜牌客户' },
        { id: '4', title: '流失客户' },
        { id: '5', title: '大客户' }
      ],
      featuresData: [
        { id: '0', title: '积极参与' },
        { id: '1', title: '2次联系有反应' },
        { id: '2', title: '毫无反应' },
        { id: '3', title: '品质型' }
      ],
      modelData: [
        { id: '0', title: '全部出口' },
        { id: '1', title: '部分出口' },
        { id: '2', title: '小量出口' },
        { id: '3', title: '想扩大出口' },
        { id: '4', title: '非标注化交易' },
        { id: '5', title: '批发' },
        { id: '6', title: '招商加盟' },
        { id: '7', title: '工程定制类' },
        { id: '8', title: '零售' },
        { id: '9', title: '机构官网' }
      ],
      industryData: [
        { id: '0', title: '机械设备+五金工具' },
        { id: '1', title: '家用电器（锅，杯，拖把，电饼铛等）' },
        { id: '2', title: '运动健身（加深器材，运动骑行，休闲保健）' },
        { id: '3', title: '门业及配件' },
        { id: '4', title: '其它（文教，标牌，垃圾桶，有色金属，反光材料）' },
        { id: '5', title: '居民生活/商业服务' },
        { id: '6', title: '批发和零售业' },
        { id: '7', title: '住宿和餐饮业' },
        { id: '8', title: '租赁和商务服务业' },
        { id: '9', title: '文化、体育和娱乐业' },
        { id: '10', title: '其它行业（不包含五金行业）' }
      ],
      sourceData: [
        { id: '0', title: '网络联系' },
        { id: '1', title: '市场活动' },
        { id: '2', title: '朋友介绍' },
        { id: '3', title: '自行开发' },
        { id: '4', title: '广告影响' },
        { id: '5', title: '市场调查' },
        { id: '6', title: 'CRM系统' },
        { id: '7', title: '收购合并' },
        { id: '8', title: '单仁同学' },
        { id: '9', title: '搜索引擎' },
        { id: '10', title: 'B2B平台' },
        { id: '11', title: '购买名单' },
        { id: '12', title: '百度' }
      ],
      levelData: [
        { id: '0', title: '1 钻石客户（营销型网站）' },
        { id: '1', title: '2 金牌客户（续费两年以上）' },
        { id: '2', title: '3 银牌客户（网站）' },
        { id: '3', title: '4 铜牌客户（邮箱）' },
        { id: '4', title: '5 流失客户' },
        { id: '5', title: '上门网' },
        { id: '6', title: '培训客户' },
        { id: '7', title: '6 铁牌客户（域名）' },
        { id: '8', title: 'A【潜在】3A踢单' },
        { id: '9', title: 'B【潜在】出方案' },
        { id: '10', title: 'C【潜在】持续挖掘' },
        { id: '11', title: 'D【潜在】信息已确认' },
        { id: '12', title: 'E【无效】无意向、不跟进' },
        { id: '13', title: 'F【潜在】外贸准客户' }
      ],
      creditData: [
        { id: '0', title: '爽快' },
        { id: '1', title: '普通' },
        { id: '2', title: '尚可' },
        { id: '3', title: '延迟' },
        { id: '4', title: '为难' }
      ]
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    // 页码切换
    onChangeTable(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.page_size = pagination.page_size;
      this.fetch();
    },
    fetch() {
      this.loading = true;
      api
        .getFriendList(this.params)
        .then((res) => {
          console.log(res);
          const pagination = { ...this.pagination };
          pagination.total = res.data.count;
          this.pagination = pagination;
          this.tableData = res.data.rows;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].friendClassId === 1) {
              this.tableData[i].friendClassId = '大客户';
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onChangeMode(value) {
      console.log(value);
      this.mode = value;
    },
    onChangeCate(value) {
      console.log(value);
      this.category = value;
    },
    onChangeFeatures(value) {
      console.log(value);
      this.category = value;
    },
    onChangeCredit(value) {
      console.log(value);
      this.category = value;
    },
    onChangeLevel(value) {
      console.log(value);
      this.category = value;
    },
    onChangeSource(value) {
      console.log(value);
      this.category = value;
    },
    onChangeIndustry(value) {
      console.log(value);
      this.category = value;
    },
    onChangeModel(value) {
      console.log(value);
      this.category = value;
    },
    onChangeOpen() {
      this.$refs.client.open();
    },
    onChangeOff() {
      this.$refs.client.close();
    }
  }
};
</script>