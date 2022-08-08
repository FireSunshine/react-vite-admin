import request from '@/utils/axios';

// 如果是GET 请求， 入参使用params字段
// 如果是POST请求， 入参使用data字段

export const uploadImage = (data) => request({ url: '/api/upload', method: 'post', data });
