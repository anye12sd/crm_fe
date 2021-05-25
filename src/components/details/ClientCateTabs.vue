<template>
  <div class="tabs-box">
    <a-tabs @change="callback">
      <template v-for="(item, key, index) in usedTabsColumns">
        <a-tab-pane :key="index" :tab="item.name">
          <table-list
            :columns="item.columns"
            :table-data="item.specsData"
            :headerContent="item.headerContent"
            :buttons="item.buttons"
            :operateBtnFixed="item.operateBtnFixed"
            @on-add="toAdd"
          ></table-list>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script>
import TableList from '@/components/TableList';

const onlyAddButtons = ['add'];
const onlyDeleteButtons = ['delete'];
const onlyViewAndDeleteButtons = ['view', 'delete'];

export default {
  name: 'CategoryTabs',
  components: { TableList },
  props: {
    usedTabs: Array,
    usedTabsColumns: Object
  },
  data() {
    return {
      operateBtnFixed: true
    };
  },
  mounted() {
    let tabs = document.getElementsByClassName('ant-tabs-tab');
    tabs[0].click();
  },
  methods: {
    toAdd() {
      this.$emit('on-add');
    },
    callback(key) {
      this.$emit('on-callback', key);
    }
  }
};
</script>