/**
 * 员工相关接口
 */

import axios from './axios';

export default {
  // 员工列表
  getMemberList(data) {
    return axios.get('/employee/list', { params: data });
  },
  // 员工列表
  getMemberDetail(id) {
    return axios.get('/employee/detail/' + id )
  },
  // 新增负责员工
  postAddDutyMember(data) {
    return axios.post('/cnct/emp', data );
  },
  // 删除负责员工
  deleteDutyMember(id) {
    return axios.delete('/cnct/emp/' + id);
  },
  // 联系人负责员工列表
  getDutyMemberList(data) {
    return axios.get('/cnct/emp/list', {params: data});
  },
};
