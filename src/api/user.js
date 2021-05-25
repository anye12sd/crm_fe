/**
 * 用户相关接口
 */

import axios from './axios';

export default {
    // 登录授权验证
    postAuth(data) {
        return axios.post('/auth', data);
    },
    // 查询路由信息
    getRouters() {
        return axios.get('/routers');
    },
    // 保存我的显示
    postMyShow(data) {
        return axios.post('/emp_profile', data);
    },
    // 查询路由信息
    getMyShow(data) {
        return axios.get('/emp_profile', {params: data});
    },

};
