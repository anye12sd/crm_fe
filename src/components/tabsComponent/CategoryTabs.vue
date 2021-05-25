<template>
  <div class="tabs-box">
    <a-tabs @change="callback">
      <template v-for="(item) in usedTabsColumns">
        <a-tab-pane :key="item.name">
          <span slot="tab">{{ item.name}}
            <a-badge
              showZero
              :count="item.count"
              :number-style="{
                backgroundColor: '#fff',
                color: '#999'
              }"
          /></span>
          <table-list
            :columns="specialColumns.length ? specialColumns : item.columns"
            :table-data="item.specsData"
            :headerContent="item.headerContent"
            :loading="loading"
            :buttons="item.buttons"
            :FormAdd="item.FormAdd"
            :addTitle="item.addTitle"
            :headerContentSelect="item.headerContentSelect"
            :operateBtnFixed="item.operateBtnFixed"
            :pagination="pagination"
            @on-add="toAdd"
            @on-display="toDisplay"
            @on-collect="toCollect"
            @on-click-btn="childBtnClicked"
            @on-change-table="handleTableChange"
            @on-statistics="toStatistics"
            @on-arrangeitem="onArrangeitem"
            @on-search="toSearch"
          ></table-list>
        </a-tab-pane>
      </template>
      <a-button type="link" v-if="settingShow" slot="tabBarExtraContent" @click="tabsSelect">
        设置
      </a-button>
    </a-tabs>
  </div>
</template>

<script>
import TableList from '@/components/TableList';

export default {
  name: 'CategoryTabs',
  components: { TableList },
  props: {
    usedTabs: Array,
    usedTabsColumns: Object,
    pagination: Object,
    loading: Boolean,
    settingShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    specialColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },
  data() {
    return {
      currentTabs: 0,
      requiredButton: true,
      requiredTimeButton: true,
      requiredFlowButton: true,
      operateBtnFixed: true,
    };
  },
  watch:{
    usedTabsColumns:{//深度监听
      handler(val, oldVal){
        if(val != oldVal){
          setTimeout(function(){
            let tabs = document.getElementsByClassName('ant-tabs-tab');
            tabs[0].click();
          }, 500)
        }
      },
      deep:true //true 深度监听
    },
    specialColumns:{//深度监听
      handler(val, oldVal){
        this.specialColumns = val
      },
      deep:true //true 深度监听
    },
  },
  mounted() {
    let tabs = document.getElementsByClassName('ant-tabs-tab');
    tabs[0].click();
  },
  methods: {
    toDisplay() {
      this.$emit('on-display', this.currentTabs);
    },
    toStatistics(){
      this.$emit('on-statistics');
    },
    toAdd() {
      this.$emit('on-add');
    },
    callback(key) {
      console.log(key);
      this.currentTabs = key;
      this.$emit('on-callback', key);
    },
    childBtnClicked(type, text, record, index) {
      this.$emit('on-click-btn', type, text, record, index);
    },
    handleTableChange(pagination) {
      this.$emit('on-change-table', pagination);
    },
    onArrangeitem(){
      console.log(345)
      this.$emit('on-arrangeitem');
    },
    toSearch() {
      this.$emit('on-search');
    },
    toCollect() {
      this.$emit('on-collect');
    },
    tabsSelect(){
      this.$emit('on-tabsSelect');
    }
  }
};
</script>

<style>
.tabs-box .ant-badge-not-a-wrapper:not(.ant-badge-status) {
  vertical-align: baseline;
}
.tabs-box .ant-badge-count {
  min-width: 16px;
  height: 16px;
  padding: 0px 2px;
  line-height: 16px;
  font-size: 12px;
}
.ant-tabs-nav .ant-tabs-tab:hover .ant-badge-count,
.ant-tabs-nav .ant-tabs-tab:active .ant-badge-count,
.ant-tabs-nav .ant-tabs-tab-active .ant-badge-count {
  color: #40a9ff !important;
}
</style>
