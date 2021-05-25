import router from './router';
import store from './store';
import cookies from 'vue-cookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 页面载入进度条设置，不显示 Spinner
NProgress.configure({ showSpinner: false });

// 设置无需登录验证的白名单
const whiteList = ['404', '403', 'Author', 'Login', 'Index'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = cookies.get('crmToken');
  if (token) {
    if (!store.getters.roles) {
      // 获取用户权限
      const roles = await store.dispatch('getInfo');
      // 根据用户权限动态创建路由
      await store.dispatch('generateRoutes', { roles });
      router.addRoutes(store.getters.addRouters);
      const redirect = decodeURIComponent(to.query.redirectUrl || to.path);
      console.log(243424,to.path, redirect)
      if (to.path === redirect) {
        console.log(1)
        next({ ...to, replace: true });
      } else {
        console.log(2)
        next({ path: redirect });
      }
    } else {
      console.log(3)
      next();
    }
  } else {
    console.log(to.name)
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next();
      NProgress.done();
      // const origin = window.location.origin;
      // window.location.href = `${process.env.VUE_APP_SSO_URL}/login/user?origin=${origin}&redirectUrl=${to.path}`;
    }
  }
  console.log(store.getters);
  // if (!store.getters.roles) {
  //   // 获取用户权限
  //   const roles = await store.dispatch('getInfo');
  //   console.log(store.dispatch('getInfo'));
  //   // 根据用户权限动态创建路由
  //   await store.dispatch('generateRoutes', { roles });
  //   router.addRoutes(store.getters.addRouters);
  //   const redirect = decodeURIComponent(to.query.redirectUrl || to.path);
  //   if (to.path === redirect) {
  //     next({ ...to, replace: true });
  //   } else {
  //     next({ path: redirect });
  //   }
  // } else {
  //   next();
  // }
});

router.afterEach(() => {
  NProgress.done();
});
