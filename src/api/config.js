import axios from 'axios';
import address from '@/address';

// 基本配置实例
export const localeMock = axios.create({
  baseURL: address.LOCALEMOCK_ADDRESS,
  headers: { 'Content-Type': 'application/json' },
});

export const http = axios.create({
  baseURL: address.SERVER_ADDRESS,
  headers: { 'Content-Type': 'application/json' },
});

export const heweather = axios.create({
  baseURL: address.HEWEATHER_ADDRESS,
  headers: { 'Content-Type': 'application/json' },
});


// 响应拦截器
const handleInterceptors = instances => {
  instances.forEach(instance => {
    instance.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        const data = response.data;
        return data.success && data.code === '200' || data.HeWeather6 ? data : Promise.reject(data);
      },

      function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  });
};

handleInterceptors([ localeMock, http ]);

// 和风天气响应拦截器
heweather.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const data = response.data.HeWeather6[0];

    return data.status === 'ok' ? data : Promise.reject({ message: data.status });
  },
);