// 用户
import { http } from '@/api/config';


// 登录
export const login = (data, config) => {
  return http({
    method: 'post',
    url: '/user/login',
    data,
    ...config,
  });
};