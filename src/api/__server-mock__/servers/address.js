import { Random } from 'mockjs';
import adapter from '../adapter';

// 省
adapter.onGet('/china/provinces').reply(config => {
  const data = Array.apply(null, { length: 3 }).map((item, i) => {
    return Random.province();
  });

  return [ 200, { code: '200', success: true, data: { china: { provinces: data } }, message: '' } ];
});

// 市
adapter.onGet('/china/cities').reply(config => {
  let { province } = config.params;

  const data = Array.apply(null, { length: 3 }).map((item, i) => {
    return province + '-' + Random.city();
  });

  return [ 200, { code: '200', success: true, data, message: '' } ];
});

// 区/县
adapter.onGet('/china/counties').reply(config => {
  let { city } = config.params;

  const data = Array.apply(null, { length: 3 }).map((item, i) => {
    return city + '-' + Random.county();
  });

  return [ 200, { code: '200', success: true, data, message: '' } ];
});
