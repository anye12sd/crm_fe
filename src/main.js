import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import 'babel-polyfill'

import './permission'; // 用户登录验证
import 'ant-design-vue/dist/antd.css';
import './assets/css/ant-design-reset.css';
import './global.css';
import './assets/css/ant-design-reset.css';

import {
  Affix,
  BackTop,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Form,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  Modal,
  Menu,
  message,
  PageHeader,
  Pagination,
  Popconfirm,
  DatePicker,
  Radio,
  Result,
  Row,
  Select,
  Steps,
  Tabs,
  Table,
  Tree,
  TreeSelect,
  Tooltip,
  Spin,
  Tag,
  Carousel, Popover, Empty
} from 'ant-design-vue';
Vue.use(Affix)
  .use(BackTop)
  .use(Badge)
  .use(Button)
  .use(Card)
  .use(Checkbox)
  .use(Col)
  .use(ConfigProvider)
  .use(Descriptions)
  .use(Divider)
  .use(Drawer)
  .use(Dropdown)
  .use(FormModel)
  .use(Form)
  .use(Icon)
  .use(Input)
  .use(InputNumber)
  .use(Layout)
  .use(Modal)
  .use(Menu)
  .use(Pagination)
  .use(PageHeader)
  .use(Popconfirm)
  .use(DatePicker)
  .use(Radio)
  .use(Result)
  .use(Row)
  .use(Select)
  .use(Steps)
  .use(Tabs)
  .use(Table)
  .use(Tree)
  .use(TreeSelect)
  .use(Tooltip)
    .use(Spin)
    .use(Tag).use(Carousel).use(Popover).use(Empty);
Vue.prototype.$message = message;
message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3
});
// 全局页头
import PageHeaderBread from './components/PageHeader';
Vue.component('PageHeader', PageHeaderBread);
Vue.use(VueCookies);
// VueCookies
Vue.prototype.$VueCookies = VueCookies;

import regTest from './utils/regTest'
Vue.use(regTest)

router.beforeEach((to, from, next) => {
  console.log(55555,to.name)
  let loginName;
  loginName = VueCookies.get('loginName');
  if (!loginName && to.name !== 'Login') {
    next({ path: '/login', query: { redirect: to.path } });
  } else {
    if (to.name === 'Login' && loginName) {
      next({ path: '/index', query: { redirect: to.path } });
    } else {
      next();
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
