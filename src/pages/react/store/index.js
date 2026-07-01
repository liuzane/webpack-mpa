// 基础模块
import { init } from '@rematch/core';

// Store Models
const models = {};

// 读取所有js文件
const StoreModules = require.context('./models', false, /^\.\/[^_].+\.js$/);

StoreModules.keys().forEach(file => {
  const fileName = file.replace(/(\.\/|\.js)/g, '');

  models[fileName] = StoreModules(file).default;
});

const store = init({
  models,
});

export default store;

export const { dispatch, getState } = store;

// 获取
// getState().user;

// 提交（同步和异步都是该方法提交，异步把后面的方法名换成异步的方法名就可以了）
// dispatch.user.updateUser(x, y);