/**
 * 销售订单接口
 */

import axios from './axios';

export default {
    // 销售订单列表
    getSalesOrderList(data) {
        return axios.get('/so/list', { params: data });
    },
    // 销售订单分类
    getSalesOrderCate(data) {
        return axios.get('/order_class', { params: data });
    },
    // 查询下一个订单编码
    getSalesOrderNextCode(data) {
        return axios.get('/so/code', { params: data });
    },
    // 查询订单详情
    getSalesOrderDetail(data) {
        return axios.get('/so/detail/' + data, );
    },
    // 创建销售订单
    postAddSalesOrder(data) {
        return axios.post('/so', data );
    },
};
