/**
 * 问题讨论相关接口
 */

import axios from './axios';

export default {
    // 创建市场活动
    postAddDiscuss(data) {
        return axios.post('/cmpg/forum', data);
    },
    // 查询问题讨论列表
    getDiscussList(data) {
        return axios.get('/cmpg/forum/list', { params: data });
    },
    // 删除问题讨论
    delDiscuss(data) {
        return axios.delete('/cmpg/forum/' + data);
    },
    // 更新问题讨论
    putDiscuss(id, data) {
        return axios.put('/cmpg/forum/' + id, data);
    },
};
