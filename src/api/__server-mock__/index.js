// 读取目录下所有js文件
const MockFiles = require.context('./', true, /^\.\/servers\/(?!_).*\.js$/);

MockFiles.keys().forEach(file => {
  MockFiles(file);
});