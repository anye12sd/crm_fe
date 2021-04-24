/**
 * 消息相关接口
 */

import axios from './axios';

export default {
    // 消息新增
    postMessageAdd(data) {
        return axios.post('/notice', { params: data });
    },
    // 查询消息列表
    getMessageList(data) {
        return axios.get('/notice/list', { params: data });
    },
    // 查询重要性
    getSeverityList() {
        return axios.get('/notice/severity');
    },
    // 删除消息
    postDeleteMessage(data) {
        return axios.post('/notice/delete', { params: data });
    },
    // 消息设置为已读或者未读
    postSetNewsStatus(data) {
        return axios.post('/notice/read', data );
    },
};
