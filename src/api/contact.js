/**
 * 联系人相关接口
 */

import axios from './axios';

export default {
  // 联系人列表
  getContactList(data) {
    return axios.get('/contact/list', { params: data });
  },
  // 联系人详情
  getContactDetail(id) {
    return axios.get('/contact/detail/' + id );
  },
  // 查询联系人收藏夹列表
  getCnctCollection(data) {
    return axios.get('/cnct/collection/list', { params: data });
  },
  // 创建联系人
  postContact(data) {
    return axios.post('/contact', data);
  },
  // 新增联系人收藏夹
  postCnctCollection(data) {
    return axios.post('/cnct/collection', data);
  },
  // 更新联系人
  putContact(id, data) {
    return axios.put(`/contact/${id}`, data);
  },
  // 更新联系人收藏夹
  putCnctCollection(id, data) {
    return axios.put(`/cnct/collection/${id}`, data);
  },
  // 删除联系人
  delContact(id) {
    return axios.delete(`/contact/${id}`);
  },
  // 删除联系人收藏夹
  delCnctCollection(id) {
    return axios.delete(`/cnct/collection/${id}`);
  },
  // 获取参与的市场活动列表
  getActivityList(data) {
    return axios.get(`/cnct/cmpg/list`, {params: data});
  },
  // 获取工作记录列表
  getWorkRecordList(data) {
    return axios.get(`/cnct/jrnl/list`, {params: data});
  },
  // 获取相关反馈列表
  getFdbkList(data) {
    return axios.get(`/cnct/fdbk/list`, {params: data});
  },
  // 删除负责部门
  delDept(id) {
    return axios.delete(`/cnct/dept/${id}`);
  },
  // 新增负责部门
  postAddDepartment(data) {
    return axios.post('/cnct/dept', data );
  },
  // 负责部门列表
  getDutyDepartment(data) {
    return axios.get('/cnct/dept/list', { params: data });
  },
};
