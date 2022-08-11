import request from '@/utils/axios';

// 如果是GET 请求， 入参使用params字段
// 如果是POST请求， 入参使用data字段

// 获取用户信息
export const getUserInfo = (params) => request({ url: '/api/user/get_userinfo', method: 'get', params });
// 修改用户信息
export const modifyUserInfo = (data) => request({ url: '/api/user/edit_userinfo', method: 'post', data });
// 修改密码
export const modifyPassword = (data) => request({ url: '/api/user/modify_pass', method: 'post', data });
