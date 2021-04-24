/**
 * 工作记录相关接口
 */

import axios from './axios';

export default {
  // 创建工作记录
  postJrnl(data) {
    return axios.post('/jrnl', data);
  },
  // 查询工作记录列表
  getJrnlList(data) {
    return axios.get('/jrnl/list', { params: data });
  },
  // 查询工作记录分类
  getTaskClassAll(data) {
    return axios.get('/task/class/all', { params: data });
  },
  // 查询工作记录可用动作
  getJrnlAction() {
    return axios.get('/jrnl/action');
  }
};
