/**
 * 工作记录相关接口
 */

import axios from './axios';

export default {
  // 查询工作记录分类
  getWorkRecordType(data) {
    return axios.get('/task/class/all', { params: data });
  },
  // 查询工作记录可用动作
  getAction(data) {
    return axios.get('/jrnl/action');
  },
  // 查询工作记录列表
  getWorkRecordList(data) {
    return axios.get('/jrnl/list', { params: data });
  },
  // 查询工作记录详情
  getWorkRecordDetail(id) {
    return axios.get('/jrnl/detail/' + id);
  },
  // 创建工作记录
  postAddWorkRecord(data) {
    return axios.post('/jrnl', data );
  },
};
