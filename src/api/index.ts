import { request } from '@/utils/request'
/**
 * @description 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/user/detail',
    method: 'get',
  })
}
