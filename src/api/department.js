/**
 * 部门相关接口
 */

import axios from './axios';

export default {
  // 部门列表
  getDepartmentList(data) {
    return axios.get('/department/list', { params: data });
  },
  // 部门详情
  getDeptDetail(id) {
    return axios.get('/department/detail' + id);
  },
};
