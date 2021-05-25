/**
 * 登录接口
 */

import axios from './axios';

export default {
  // 登录
  postLogin(data) {
    return axios.post('/login', data);
  }
};
