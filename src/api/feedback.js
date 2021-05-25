/**
 * 反馈接口
 */

import axios from './axios';

export default {
  // 创建反馈
  postFdbk(data) {
    return axios.post('/feedback', data);
  },
  // 创建反馈
  putFdbk(data) {
    return axios.put('/feedback', data);
  },
  // 反馈列表
  getFdbk(data) {
    return axios.get('/feedback/list', { params: data });
  },
  // 反馈列表详情
  getFdbkDetail(id) {
    return axios.get('/feedback/detail/' + id);
  },
  // 查询反馈相关选项
  getFdbkParams() {
    return axios.get('/fdbk/params');
  },
  // 查询反馈分类
  getFdbkclass() {
    return axios.get('/fdbk/class');
  },
  // 查询反馈状态
  getFdbkstatus() {
    return axios.get('/fdbk/status');
  },
  // 查询反馈类型
  getFdbkType() {
    return axios.get('/fdbk/type');
  },
  // 查询反馈重要性
  getFdbkseverity() {
    return axios.get('/fdbk/severity');
  },
  // 反馈处理过程列表
  getFdbkresult(data) {
    return axios.get('/fdbk/result', { params: data });
  },
  // 创建反馈处理过程
  postFdbkresult(data) {
    return axios.post('/fdbk/result', data);
  },
  // 更新反馈处理过程
  putFdbkresult(id, data) {
    return axios.put(`/fdbk/result/${id}`, data);
  },
  // 删除反馈处理过程
  delFdbkresult(id) {
    return axios.delete(`/fdbk/result/${id}`);
  }
};
