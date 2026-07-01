// 方法
import { getStorage, setStorage } from '@/utils/local-storage';

// 检索搜索值是否为 key 子字符串
const isMatch = function (searchKey, object) {
  const keys = Object.keys(object);

  return keys.find(key => key.search(searchKey) !== -1);
};

export default function (packages, language) {
  const packageKey = (getStorage('language') || language || navigator.language);
  let baseLanguage = packageKey.replace(/_.{2}/, '');
  let languagePackage = {};

  // 优雅降级
  if (packages[packageKey]) {
    languagePackage = packages[packageKey];
  } else if (isMatch(baseLanguage, packages)) {
    languagePackage = packages[isMatch(baseLanguage, packages)];
  } else {
    languagePackage = packages['en-US'];
  }

  // 保存语言选项
  if (languagePackage.language) {
    setStorage('language', languagePackage.language);
  }

  return languagePackage;
}