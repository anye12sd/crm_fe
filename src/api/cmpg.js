/**
 * 市场活动相关接口
 */

import axios from './axios';

export default {
  // 创建市场活动
  postCmpg(data) {
    return axios.post('/cmpg', data);
  },
  // 查询市场活动列表
  getCmpgList(data) {
    return axios.get('/cmpg/list', { params: data });
  },
  // 查询市场活动分类
  getCmpgClass() {
    return axios.get('/cmpg/class');
  },
  // 查询市场活动详情
  getCmpgDetail(id) {
    return axios.get('/cmpg/detail/' + id);
  },
  // 更新市场活动
  putCmpg(id, data) {
    return axios.put(`/cmpg/${id}`, data);
  },
  // 激活市场活动
  putCmpgAction(id) {
    return axios.put(`/cmpg/${id}/action`);
  },
  // 关闭市场活动
  putCmpgStop(id) {
    return axios.put(`/cmpg/${id}/stop`);
  }
};
