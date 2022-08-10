import axios from 'axios';
import { message } from 'antd';

export const baseURL = 'http://api.chennick.wang'; // 服务地址

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {}
});

instance.interceptors.request.use(
  function (config) {
    // 通过headers请求头把token(登录凭证)带到后端
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   function (response) {
//     let res = null;
//     // 数据过滤
//     if (response.status === 200) {
//       if (response.data && response.data.err === 0) {
//         res = response.data.data;
//       } else if (response.data && response.data.err === -1) {
//         // 当err=-1时，表示token无效或过期了，跳转到登录页重新登录
//       } else {
//         // 当业务失败时，弹出交互提示框，把错误告诉用户
//         message.fail(response.data.msg);
//       }
//     }
//     return res;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(function (response) {
  if (typeof response.data !== 'object') {
    message.error('服务端异常');
    return Promise.reject(response);
  }
  if (response.data.code !== 200) {
    if (response?.data?.msg) message.error(response.data.msg);
    if (response.data.code === 401) {
      // window.location.href = '/login';
      // message.error('token失效， 登录过期');
      window.localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(response.data);
  }
  return response.data;
});

export default instance;
