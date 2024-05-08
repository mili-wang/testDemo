import request from '@/utils/request';

// 获取
export function getMessage(params = {}) {
  return request({
    url: '/api/rand.qinghua',
    method: 'POST',
    data: params
  })
}