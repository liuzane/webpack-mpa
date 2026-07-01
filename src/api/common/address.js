import { http } from '@/api/config';


// 获取省列表
export const getProvinces = (config) => {
  return http({
    method: 'get',
    url: '/china/provinces',
    ...config,
  });
};

// 获取市列表
export const getCities = (params, config) => {
  return http({
    method: 'get',
    url: '/china/cities',
    params,
    ...config,
  });
};

// 获取区/县列表
export const getCounties = (params, config) => {
  return http({
    method: 'get',
    url: '/china/counties',
    params,
    ...config,
  });
};