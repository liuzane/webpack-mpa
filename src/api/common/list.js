import { http } from '@/api/config';


// 获取人员列表
export const getListPersons = (params, config) => {
  return http({
    method: 'get',
    url: '/list/persons',
    params,
    ...config,
  });
};