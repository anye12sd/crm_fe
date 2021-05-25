<template>
  <a-layout id="app">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="left-sider-logo" v-if="!collapsed">
        <img src="http://cdn.jihui88.com/upload/j/j2/jhw_xlk/picture/2021/04/15/19947b2a-f4a4-4c4d-86e5-b1f537351aee.png" alt="logo">
      </div>
      <div class="left-sider-logo-short" v-else>
        <img src="http://cdn.jihui88.com/upload/j/j2/jhw_xlk/picture/2021/04/15/6778cf2a-d90b-42b0-a8ed-a7240a7e7f88.png" alt="logo">
      </div>
      <a-menu
        v-model="selectedKeys"
        theme="dark"
        mode="inline"
        :inlineCollapsed="collapsed"
        :openKeys="openKeys"
        @openChange="onOpenChange"
      >
        <template v-for="item in menus">
          <a-menu-item v-if="!item.children" :key="item.path">
            <router-link :to="{ path: item.path }">
              <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menuInfo="item" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout id="layout" ref="layout" :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-header class="global-header" />
      <a-layout-header
        class="global-header global-header-fixed"
        :style="{ width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)' }"
      >
        <span class="global-header-trigger">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </span>
        <div class="menu_login" style="font-size: 14px; float: right; padding-right: 24px">
          <a-popover v-model="searchVisible" overlayClassName="search-box" trigger="click">
            <div slot="content">
              <a-input-group compact style="width: 420px">
                <a-select v-model="searchSelect" style="width: 160px">
                  <template v-for="(item) in selectList">
                    <a-select-option :key="item.id" :value="item.id">
                      {{item.label}}
                    </a-select-option>
                  </template>
                </a-select>
                <a-input style="width: 50%; border-radius: 0" v-model="searchInput" />
              </a-input-group>
              <a-button type="primary" icon="search" class="search-btn">查询</a-button>
            </div>
            <a-icon type="search" class="menu_login_search"/>
          </a-popover>
          <a-popover v-model="bellVisible" overlayClassName="bell-box" trigger="click">
            <div slot="content">
              <a-tabs default-active-key="1" @change="tabsCallback" :tabBarGutter="0">
                <a-tab-pane key="1" tab="通知（0）">
                  <div class="bell-empty">
                    <a-empty description="暂无最新通知"/>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="消息（4）">
                  <div class="bell-empty">
                    <a-empty description="暂无最新消息"/>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="3" tab="待办（30）">
                  <div class="bell-empty">
                    <a-empty description="暂无最新待办"/>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
            <a-icon type="bell" class="menu_login_bell"/>
          </a-popover>
          <a-popover v-model="userVisible" trigger="click">
            <div slot="content">
              <div class="popover-content-userInfo-box">
                <div class="popover-content-userInfo">
                  <img v-if="headerImg" src="" alt="">
                  <a-icon v-else type="user" class="menu_login_header" style="color: #f85901"/>
                  {{ account }}
                </div>
                <div class="popover-content-operation">
                  <div class="flex popover-content-operation-flex">
                    <div>
                      <a-icon type="file-protect" style="font-size: 22px"/>
                      <p>待我处理</p>
                    </div>
                    <div>
                      <a-icon type="select" style="font-size: 22px"/>
                      <p>我发起的</p>
                    </div>
                    <div>
                      <a-icon type="team" style="font-size: 22px"/>
                      <p>我参与的</p>
                    </div>
                  </div>
                  <div class="flex loginout-box">
                    <div>账户管理</div>
                    <a href="javascript:void(0);" @click="signOut" class="signout">
                      <span>退出登录</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <img v-if="headerImg" src="" alt="">
            <a-icon v-else type="user" class="menu_login_header" style="color: #f85901"/>
            {{ account }}
          </a-popover>
          <a-select v-model="systemSelect" style="margin-left: 15px; width: 80px" @change="handleChange">
            <a-select-option :value="1">
              CRM
            </a-select-option>
            <a-select-option :value="2">
              KEY
            </a-select-option>
          </a-select>
        </div>
      </a-layout-header>
      <a-layout-content class="global-content">
        <page-header></page-header>
        <router-view :key="$route.meta.id" />
        <a-back-top :target="target" :visibilityHeight="140"></a-back-top>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SubMenu from '@/components/SubMenu';
import { Modal } from 'ant-design-vue';
import VueCookies from 'vue-cookies';
import { mapState } from 'vuex';
const selectList = [
  {id: 1, label: '客户/伙伴/供应商'},
  {id: 2, label: '联系人'},
  {id: 3, label: '销售机会'},
  {id: 4, label: '反馈'},
  {id: 5, label: '市场任务'},
  {id: 6, label: '销售任务'},
  {id: 7, label: '服务任务'},
  {id: 8, label: '运营任务'},
  {id: 9, label: '采购任务'},
  {id: 10, label: '报价单'},
  {id: 11, label: '销售订单'},
  {id: 12, label: '采购订单'},
  {id: 13, label: '产品'},
  {id: 14, label: '知识'},
  {id: 15, label: '市场活动'},
]
export default {
  name: 'BasicLayout',
  components: {
    SubMenu
  },
  data() {
    return {
      menus: [],
      collapsed: false,
      selectList,
      searchSelect: 1,
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      account: VueCookies.get('loginName'),
      headerImg: false,
      systemSelect: 1,
      userVisible: false,
      bellVisible: false,
      searchVisible: false,
      searchContent: '',
      searchInput: ''
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.routers
    })
  },
  created() {
    const routes = this.mainMenu.find((item) => item.path === '/');
    this.menus = (routes && routes.children) || [];
    console.log(this.menus)
    // 监听路由变化刷新菜单状态
    this.$watch('$route', () => {
      this.updateMenu();
    });
    // 监听侧边菜单折叠状态
    this.$watch('collapsed', (val) => {
      if (val) {
        // 如果菜单被设置为折叠，保存当前菜单展开状态到临时数组，并将开展状态数组清空
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        // 如果侧边菜单被展开，将临时数组赋值回状态数组
        this.openKeys = this.cachedOpenKeys;
      }
    });
  },
  mounted() {
    this.updateMenu();
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    target() {
      return document.querySelector('#layout');
    },
    updateMenu() {
      // 现有匹配的路由深拷贝，不会改变原有数组
      const routes = this.$route.matched.concat();
      // 当前访问数组是否在菜单中隐藏
      const { hidden } = this.$route.meta;
      // 判断层级深度
      if (hidden) {
        // 如果不是二级菜单或者为隐藏，在路由数组中删除最后一个元素（当前页面对应的路由）
        routes.pop();
        // 将上上级路由设置为选中路由
      } else {
        // 将路由数组中最后一个元素设置为选中（当前页面对应的路由）
        // this.selectedKeys = [routes.pop().path];
      }
      this.selectedKeys = [routes[routes.length - 1].path];
      const openKeys = [];
      // 将路由数组中所有元素的 path 存入展开菜单的数组中
      routes.forEach((item) => {
        item.path && openKeys.push(item.path);
      });
      // 如果侧边栏为折叠状态，暂时保存菜单展开状态
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
    },
    onOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
    // 退出
    signOut() {
      const that = this;
      Modal.confirm({
        title: '提示',
        content: () => <div>是否退出登录？</div>,
        onOk() {
          that.$cookies.remove('loginName');
          that.$cookies.remove('crmToken');
          localStorage.removeItem('router')
          that.$message.warning({
            closeable: true,
            content: '退出成功！',
            duration: 1
          });
          setTimeout(() => {
            let query = that.$route.query
            let url = '?'
            for(let key in query){
              url += key + '=' + query[key] + '&'
            }
            that.$router.push({
              path: '/login',
              query: { redirect: that.$route.path + url }
            });
          }, 2000);
        },
        onCancel() {},
        class: 'test'
      });
    },
    userHide(){
      this.userVisible = false
    },
    tabsCallback(){

    }
  }
};
</script>

<style >
@import './BasicLayout.css';
.left-sider-logo,.left-sider-logo-short{
  text-align: center;
  height: 60px;
}
.left-sider-logo img{
  width: 120px;
  padding: 15px 0
}
.left-sider-logo-short img{
  width: 50px;
  padding: 18px 0
}
.menu_login_header{
  margin-right: 8px;
  width: 30px;
  height: 30px;
  border: 1px solid #f85901;
  line-height: 33px !important;
  border-radius: 50%;
}
.menu_login_bell, .menu_login_search{
  margin-right: 22px;
}
.popover-content-userInfo-box{
  width: 260px;
}
.popover-content-userInfo{
  padding: 32px 36px;
  margin: -12px -16px;
  background: #bae7ff;
}
.popover-content-operation{
  padding-top: 32px;
}
.popover-content-operation-flex{
  margin: 20px;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.loginout-box{
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  justify-content: space-between;
}
.bell-box .ant-popover-inner-content{
  width: 300px;
  padding: 0
}
  .bell-box .ant-tabs-nav{
    padding: 0 10px
  }
  .bell-box .bell-empty{
    padding: 25px 20px
  }
  .search-box{
    width: 500px;
    position: relative;
  }
.search-box .search-btn{
    position: absolute !important;
  border-radius: 0 4px 4px 0;
    top: 22px;
    right: 33px;
  }
</style>
