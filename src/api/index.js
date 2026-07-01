// 开发环境开启 mock
// if (process.env.NODE_ENV === 'development') {
  require('./__server-mock__');
// }

// Api
const api = {};

// 读取所有js文件
const apiFiles = require.context('./', true, /^\.\/(?!_|.*_|index|config).*\.js$/);

apiFiles.keys().forEach(file => {
  const apiFile = apiFiles(file);
  for (const key in apiFile) {
    if (apiFile.hasOwnProperty(key) && !(key in api)) {
      api[key] = apiFile[key];
    } else if (key in api) {
      console.error('[Api Error]: This ' + key + ' method already exists in the Api, In the ' + file + ' file');
    }
  }
});

export default api;

// Axios
export { default as axios } from 'axios';