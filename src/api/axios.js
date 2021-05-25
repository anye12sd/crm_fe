import axios from 'axios';
import router from '../router';
import VueCookies from 'vue-cookies';
import { message, notification } from 'ant-design-vue';
import qs from 'qs';

// 跳转登录页
const toLogin = () => {
  // 携带当前页面路由，在登录页面完成登录后返回当前页面
  let {
    query: { redirectUrl },
    path
  } = router.currentRoute;
  if (!redirectUrl) {
    redirectUrl = path;
  }
  let redirectRouterQuery = router.currentRoute.query
    // 跳转进登录页面丢失query参数，这样需要把参数补回
  let redirectQuery = "?"
  for(var key in redirectRouterQuery){
    redirectQuery += key + '=' + redirectRouterQuery[key] + '&'
  }
  const origin = window.location.origin;
    // window.location.href = `/login?origin=${origin}&redirectUrl=${redirectUrl}`;
  router.push({path: '/login', query:{redirect: redirectUrl + redirectQuery}})
    // window.location.href = `$process{.env.VUE_APP_API_BASE_URL}/login?origin=${origin}&redirectUrl=${redirectUrl}`;
};

// 异常处理函数
const errorHandler = (error) => {
  console.log('API ERROR', error);
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401) {
      VueCookies.remove('crmToken');
      VueCookies.remove('loginName');
      localStorage.removeItem('router')
      // toLogin前必须先移除这两个cookie否则会无限跳转，你可以试试
      toLogin();
    } else {
      const { message, code } = data;
      notification.error({
        message: message,
        description: code
      });
    }
  }
};
// 设置环境域名
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL =
// window.location.hostname === 'localhost' ? process.env.VUE_APP_API_BASE_URL : '/api';
axios.defaults.headers.get['Content-Type'] = 'text/plain';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // eslint-disable-next-line no-invalid-this
          message.error({
            content: '登录过期，3s后返回登录界面',
            duration: 3
          });
          VueCookies.remove('crmToken');
          VueCookies.remove('loginName');
          localStorage.removeItem('router')
          setTimeout(() => {
            // router.beforeEach((to, from, next) => {
            //   next({ path: '/login', query: { redirect: to.path } });
            // });
            toLogin();
          }, 3000);
          break;
        case 502:
          message.error({
            content: error.response.data.msg + '，请联系管理员',
            duration: 3
          });
          break;
        case 500:
          message.error({
            content: error.response.data.msg + '，请联系管理员',
            duration: 3
          });
          break;
        case 404:
          message.error({
            content: error.response.data.msg + '，请联系管理员',
            duration: 3
          });
          break;
        case 400:
          message.error({
            content: error.response.data.msg,
            duration: 3
          });
          break;
        case 403:
          message.error({
            content: error.response.data.msg,
            duration: 3
          });
          break;
        default:
          message.error({
            content: error.response.data.msg + '，请联系管理员' + error.response.status,
            duration: 3
          });
          break;
      }
    }
    return error.response.data
  }
);
axios.interceptors.request.use(
  (config) => {
    // 每次接口请求重新获取token
    let crmToken = '';
    crmToken = VueCookies.get('crmToken');
    config.headers.Authorization = `${crmToken}`;
    return config;
  },
  (err) => {
    // eslint-disable-next-line no-invalid-this
    message.error({
      closeable: true,
      content: '网络请求错误'
    });
    return err;
  }
);

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true // 自动携带 cookie
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 每次接口请求重新获取token
  let crmToken = '';
  crmToken = VueCookies.get('crmToken');
  config.headers.Authorization = `${crmToken}`;
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }
  return config;
}, errorHandler);

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default axios;
