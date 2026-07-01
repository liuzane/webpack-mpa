import { Random } from 'mockjs';
import adapter from '../adapter';

let Data = Array.apply(null, { length: 100 }).map((item, i) => {
  return {
    id: Random.guid(),
    roId: Random.guid(),
    name: Random.name(),
    age: Random.integer(20, 50),
    address: Random.county(true),
  }; 
});

// 获取人员列表
adapter.onGet('/list/persons').reply(config => {
  let { page, size } = config.params;

  let data = [];

  for (let i = page - 1, iLength = Data.length; i < page * size && i < iLength; i ++) {
    data.push(Data[i]);
  }

  return [ 200, { code: '200', success: true, data, message: '' } ];
});