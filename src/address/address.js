// http方式
const protocol = window.location.protocol;
const host = window.location.host;

// 命名方式  XXX_YYY_ADDRESS， XXX 所属服务，YYY 服务页面。
const address = Object.seal({
  SERVER_ADDRESS: null, // 服务地址
  LOCALEMOCK_ADDRESS: null, // 本地 Mock 地址
  EASYMOCK_ADDRESS: null, // EasyMock 地址
  HEWEATHER_ADDRESS: null, // 和风天气地址
});

/* eslint-disable-next-line no-undef */
switch (NODE_ENV) {
  // 开发环境地址
  case 'start':
    address.SERVER_ADDRESS = null;
    address.LOCALEMOCK_ADDRESS = '/';
    address.HEWEATHER_ADDRESS = 'https://free-api.heweather.net';
    break;

  // 生产环境地址
  case 'production':
    /* eslint-disable-next-line no-undef */
    address.SERVER_ADDRESS = PUBLIC_URL;
    address.LOCALEMOCK_ADDRESS = '/';
    address.HEWEATHER_ADDRESS = 'https://free-api.heweather.net';
    break;

  // 默认地址
  default:
    address.SERVER_ADDRESS = '/';
    address.LOCALEMOCK_ADDRESS = '/';
    address.EASYMOCK_ADDRESS = '/easy-mock';
    address.HEWEATHER_ADDRESS = 'https://free-api.heweather.net';
    break;
}

// 处理 address.js
for (const key in address) {
  if (!address[key]) {
    address[key] = `${ protocol }//${ host }`;
    continue;
  }

  if (address[key][0] === '/') {
    address[key] = `${ protocol }//${ host }${ address[key] }`;
    continue;
  }

  if (!(/^https?:\/\/.*/.test(address[key]))) {
    address[key] = `${ protocol }//${ address[key] }`;
  }
}

export default address;