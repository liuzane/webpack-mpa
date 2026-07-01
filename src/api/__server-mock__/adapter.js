import { http } from '../config';
import MockAdapter from 'axios-mock-adapter';


let mockAdapter = new MockAdapter(http, { delayResponse: 1500 });


export default mockAdapter;

/**
 * How to use
import { Random } from 'mockjs';
import adapter from '../adapter';

let Data = Array.apply(null, { length: 100 }).map((item, i) => {
  return {
    id: Random.guid(),

  };
});


//
adapter.onGet('/').reply(config => {
  let params = config.params;
  return new Promise((resolve, reject) => {
    let data = [];

    resolve([ 200, { code: '200', success: true, data, message: '' } ]);
  });
});

//
adapter.onPost('/').reply(config => {
  let params = config.data;
  return new Promise((resolve, reject) => {
    let data = [];

    resolve([ 200, { code: '200', success: true, data, message: '' } ]);
  });
});
 * */