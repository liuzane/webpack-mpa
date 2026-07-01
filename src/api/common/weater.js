import { heweather } from '@/api/config';


// 获取天气信息
export const getWeaterByType = (params, config) => {
  const type = params.type || 'now';
  delete params.type;
  return heweather({
    method: 'get',
    url: `/s6/weather/${ type }`,
    params,
    ...config,
  });
};

// 获取空气信息
export const getAirByType = (params, config) => {
  const type = params.type || 'now';
  delete params.type;
  return heweather({
    method: 'get',
    url: `/s6/air/${ type }`,
    params,
    ...config,
  });
};