/**
 * 验证数据类型
 * @method typeOf
 * @param {any} obj
 * @return {string}
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };

  return map[toString.call(obj)];
}

/**
 * 深拷贝
 * @method deepCopy
 * @param {object|array} data
 * @return {object|array}
 */
export function deepCopy(data) {
  const type = typeOf(data);
  let object;

  if (type === 'array') {
    object = [];
  } else if (type === 'object') {
    object = {};
  } else {
    return data;
  }

  if (type === 'array') {
    for (let i = 0; i < data.length; i++) {
      object.push(deepCopy(data[i]));
    }
  } else if (type === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        object[key] = deepCopy(data[key]);
      }
    }
  }
  return object;
}

/**
 * 生成 UUID
 * @method uuid
 * @return {string}
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

/**
 * 下载
 * @method download
 * @param {string} url
 * @param {string} name
 */
export function download(url, name) {
  const aDom = document.createElement('a');
  aDom.download = name;
  aDom.href = url;
  document.body.appendChild(aDom);
  aDom.click();
  aDom.remove(); // 下载之后把创建的元素删除
}

/**
 * 根据名称获取路径参数
 * @method getUrlArg
 * @param {string} name
 * @return {string}
 */
export function getUrlArg(name) {
  const search = window.location.search;
  const regexp = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const arg = search.substr(1).match(regexp);
  return arg ? arg[2] : '';
}

/**
 * 将路径参数转化为对象格式
 * @method getUrlQuery
 * @param {string} url
 * @return {object}
 */
export function getUrlQuery(url) {
  const query = url.substring(url.indexOf('?') + 1).split('&');
  const params = {};
  query.forEach((item) => {
    const key_value = item.split('=');
    params[key_value[0]] = key_value[1];
  });
  return params;
}

/**
 * 将对象格式转化为路径参数
 * @method setUrlQuery
 * @param {object} params
 * @return {string}
 */
export function setUrlQuery(params) {
  let querys = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      querys.push(key + '=' + params[key]);
    }
  }
  return querys.join('&');
}

/**
 * 获取对象深层值
 * @method getDeepValueOfObject
 * @param {object|array} object
 * @param {string} keyPath
 * @param {any} [defaultValue]
 * @return {any}
 */
export function getDeepValueOfObject(object, keyPath, defaultValue) {
  const isString = typeof keyPath === 'string';
  if (!isString) {
    console.warn('[getDeepValueOfObject Warning]: keyPath is not a string, type ' + typeof keyPath);
  }

  if (object && keyPath && isString) {
    const keys = keyPath.split('.');
    let value = object;
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        value = defaultValue;
      }
    }
    return value;
  } else {
    return defaultValue;
  }
}

/**
 * 转化为千位分隔符格式
 * @method toThousands
 * @param {number|string} number
 * @return {string}
 */
export function toThousands(number) {
  if (Math.abs(Number(number)) >= 1000) {
    const [ integer, float ] = (number || 0).toString().split('.');
    const thousandsInteger = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return thousandsInteger + (float ? '.' + float : '');
  } else {
    return number;
  }
}

/**
 * 合并
 * @method merge
 * @param {object|array} ...items
 * @return {T}
 */
export function merge(firstItem, ...items) {
  const isSameType = (obj1, obj2) =>
    typeOf(obj1) === typeOf(obj2) && (typeOf(obj1) === 'object' || typeOf(obj1) === 'array');
  const recursive = (obj1, obj2) => {
    for (let key in obj2) {
      if (isSameType(obj1[key], obj2[key])) {
        obj1[key] = recursive(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  };

  if (items && items.length > 0) {
    items.forEach((item) => {
      if (isSameType(firstItem, item)) {
        firstItem = recursive(firstItem, item);
      }
    });
  }

  return firstItem;
}

/**
 * 差集
 * @method differenceArray
 * @param {string} key
 * @param {...array} array
 * @return {array}
 */
export function differenceArray(key, ...arrays) {
  const obj = {};
  const diffArr = [];
  for (let index = 0; index < arrays.length; index++) {
    arrays[index].forEach((item) => {
      obj[item] = obj[item] ? obj[item] + 1 : 1;
    });
  }
  return diffArr;
}