import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import employee from './modules/employee';

// 动态路由生成
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        permission,
        user,
        employee,
    },
    state: {},
    mutations: {},
    actions: {},
    getters
});
