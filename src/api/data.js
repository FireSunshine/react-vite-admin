import request from '@/utils/axios';

export const getData = (params) => request({ url: '/api/bill/data', method: 'get', params });
