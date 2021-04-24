/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/config/router.config'; // 基础路由
import { generatorDynamicRouter } from '@/router/generator-routers';

export default {
    state: {
        routers: constantRouterMap, // 默认赋值为基础路由
        addRouters: [] // 动态创建的路由
    },
    mutations: {
        // 设置路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            console.log(466)
        }
    },
    actions: {
        // 生成路由
        async generateRoutes({ commit }) {
            const routers = await generatorDynamicRouter();
            console.log('登录页', routers)
            commit('SET_ROUTERS', routers);
        }
    }
};
