import request from '@/utils/axios';

// 如果是GET 请求， 入参使用params字段
// 如果是POST请求， 入参使用data字段
export const getAccountList = (params) => request({ url: '/api/bill/list', method: 'get', params });

// 删除账单
export const deleteAccount = (data) => request({ url: '/api/bill/delete', method: 'post', data });
// 获取消费类型
export const getCostType = (params) => request({ url: '/api/type/list', method: 'get', params });
// 添加账单
export const addCostType = (data) => request({ url: '/api/bill/add', method: 'post', data });
