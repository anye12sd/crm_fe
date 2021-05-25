/**
 * 客户相关接口
 */

import axios from './axios';

export default {
  // 客户列表
  getFriendList(data) {
    return axios.get('/friend/list', { params: data });
  },
  // 客户详情列表
  getFriendDetail(id) {
    return axios.get('/friend/detail/' + id );
  },
  // 查询所有客户分类
  getFrndClass(data) {
    return axios.get('/frnd/class/all', { params: data });
  },
  // 创建客户
  postFriend(data) {
    return axios.post('/friend', data);
  },
  // 更新指定客户
  putFriend(id, data) {
    return axios.put(`/friend/${id}`, data);
  },
  // 删除指定客户
  delFriend(id) {
    return axios.delete(`/friend/${id}`);
  },
  // 查询客户收藏夹列表
  getFrndCollection(data) {
    return axios.get(`/frnd/collection/list`, { params: data });
  },
  // 新增客户收藏夹
  postFrndCollection(data) {
    return axios.post('/frnd/collection', data);
  },
  // 更新客户收藏夹
  putFrndCollection(id, data) {
    return axios.put(`/frnd/collection/${id}`, { params: data });
  },
  // 删除收藏夹
  delFrndCollection(id) {
    return axios.delete(`/frnd/collection/${id}`);
  },
};
