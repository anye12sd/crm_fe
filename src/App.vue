<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
  name: 'App',
  components: {},
  data() {
    return {
      zhCN
    };
  }
};
</script>

<style>
html,
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node {
  --antd-wave-shadow-color: #fff !important;
}
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.left {
  float: left;
}
.right {
  float: right;
}
.title {
  padding: 1% 1% 0;
  text-align: left;
  background-color: #fff;
}
.ant-table-wrapper {
  background-color: #fff;
}
.title .main_title {
  font-weight: 700;
}
.title .info {
  line-height: 2;
  margin-left: 10%;
}
.checked-tr-of-add-table,
.checked-td-of-add-table {
  background-color: #ebf7ff;
}
.show_drawer .ant-drawer-body {
  padding: 24px 24px 77px 24px;
}
.ant-tree:after {
  content: '';
  clear: both;
  display: block;
}
.ant-tree li {
  width: 45%;
  float: left;
}
.show_drawer .ant-tree > li:first-child {
  padding-top: 0;
}
.ant-col {
  margin-bottom: 10px;
}
</style>
