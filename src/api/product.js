/**
 * 产品相关接口
 */

import axios from './axios';

export default {
  // 产品列表
  getProductList(data) {
    return axios.get('/product/list', { params: data });
  },
  // 产品详情
  getProductDetail(id) {
    return axios.get('/product/detail/' + id);
  },
  // 查询编码规则
  getCodeRule(data) {
    return axios.get('/code_rule', { params: data });
  },
  // 查询下一个产品编码
  getNextCode(data) {
    return axios.get('/prod/code', { params: data });
  },
  // 产品分类列表
  getProductClassList(data) {
    return axios.get('/prod/class/list', { params: data });
  },
  // 新增产品
  postAddProduct(data) {
    return axios.post('/product', data);
  }
};
