/**
 * 客户相关接口
 */

import axios from './axios';

export default {
  // 参与的市场活动列表
  getActivityList(data) {
    return axios.get('/frnd/cmpg/list', { params: data });
  },
  // 相关联系人列表
  getRelatedConnectList(data) {
    return axios.get('/frnd/cnct/list', { params: data });
  },
  // 负责部门列表
  getRelatedDeptList(data) {
    return axios.get('/frnd/dept/list', { params: data });
  },
  // 新增负责部门
  postAddDept(data) {
    return axios.post('/frnd/dept', data );
  },
  // 删除负责部门
  delDept(id) {
    return axios.delete('/frnd/dept/' + id );
  },
  // 查询负责员工/相关员工
  getMember(data) {
    return axios.get('/frnd/emp/list', {params: data});
  },
  // 新增负责员工/相关员工
  postAddMember(data) {
    return axios.post('/frnd/emp', data);
  },
  // 删除负责员工/相关员工
  delMember(id) {
    return axios.delete(`/frnd/emp/${id}`);
  },
  // 查询负责员工变动列表
  getChangeMember(data) {
    return axios.get('/frnd/emp/change/list', {params: data});
  },
  // 查询相关账户列表
  getRelatedAccountList(data) {
    return axios.get('/frnd/facc/list', {params: data});
  },
  // 查询相关反馈列表
  getRelatedFdbkList(data) {
    return axios.get('/frnd/fdbk/list', {params: data});
  },
  // 查询相关工作记录列表
  getRelatedRecordList(data) {
    return axios.get('/frnd/jrnl/list', {params: data});
  },
};
