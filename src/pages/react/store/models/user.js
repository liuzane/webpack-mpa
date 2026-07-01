// 第三方模块
import _ from 'lodash';

// API
import api from '@/api';

// 方法
import { getStorage, setStorage } from '@/utils/local-storage';

// 成功回调
const successCallback = function (callback, errCallback, response) {
  if (callback) callback(response);
  this.updateUser(response.data);
};

// 失败回调
const errorCallback = function (errCallback, error) {
  console.error(error);
  if (errCallback) {
    errCallback(error);
  }
};

const initialState = Object.freeze({
  id: '',
  name: '',
  username: '',
  permission: [],
  language: '',
});


export default {
  state: { ...initialState },

  reducers: {
    updateUser(state, data) {
      const userInfo = getStorage('userInfo');
      
      data = Object.assign({}, userInfo, data);

      setStorage('userInfo', data, 24);

      for (const key in state) {
        if (state.hasOwnProperty(key) && data[key] !== undefined) {
          state[key] = data[key];
        }
      }

      return _.cloneDeep(state);
    },
    
    resetUser() {
      return { ...initialState };
    },
  },

  effects: {
    userLogin({ params, callback, errCallback }, rootState) {
      if (!params || !params.username || !params.password) {
        console.error('[userLogin Error]: Please confirm params is complete?');
        return;
      }

      return api.login(params).then(
        successCallback.bind(this, callback, errCallback),
        errorCallback.bind(this, errCallback)
      );
    },

    getUserInfo (params, rootState, callback, errCallback) {
      if (!params || !params.id) {
        console.error('[getUserInfo Error]: Please confirm params is complete?', params);
        return;
      }
  
      return api.getUserInfo(params).then(
        successCallback.bind(this, callback, errCallback),
        errorCallback.bind(this, errCallback)
      );
    },
  },
};