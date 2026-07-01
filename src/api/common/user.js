import { http } from '@/api/config';


// 获取用户信息
export const getUserInfo = (params, config) => {
  return http({
    method: 'get',
    url: '/user/info',
    params,
    ...config,
  });
};