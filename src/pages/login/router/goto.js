// 地址
import address from '@/address';

export default function (targetPath) {
  /* eslint-disable-next-line no-undef */
  window.location.href= address.SERVER_ADDRESS + targetPath;
}