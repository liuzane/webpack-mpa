/*
* @method setCookie
* @param { params: Object }
*   [ key: String, required ]
*   [ value: Any, required ]
*   [ hours: Number ]
*   [ path: String, example: '/' ]
*   [ domain: String, example: document.domain ]
* @return null
*/
export function setCookie (params) {
  let time = new Date(), expires = '', path = '', domain = '';

  if (!params.key || !params.value) {
    console.error('[Cookie Error]: key, value must be set.');
    return;
  }

  if (params.hours) {
    try {
      Number(params.hours);
    } catch (e) {
      console.error('[Cookie Error]: expires must is number.');
    }
    
    time.toGMTString(time.setTime(time.getTime() + 1000 * 60 * 60 * params.hours));
    expires = 'expires=' + time + ';';
  }

  if (params.path) path = 'path=' + params.path + ';';

  if (params.domain) domain = 'domain=' + params.domain;
  
  document.cookie = params.key + '=' + params.value + ';' + expires + path + domain;
}

/*
* @method getCookie
* @param { key: String }
* @return { undefined | Any | false }
*/
export function getCookie (key) {
  if (!key) {
    console.error('[Cookie Error]: not set key.');
    return;
  }

  let arr = document.cookie.split(';');

  for (let i = 0; i < arr.length; i ++) {
    arr[i] = arr[i].replace(/^\s*|\s*$/, '');
    if (arr[i].indexOf(key) === 0 && arr[i].indexOf('=') === key.length) {
      return arr[i].substring(key.length + 1, arr[i].length);
    }
  }

  return false;
}

/*
* @method clearCookie
* @param { params: Object }
*   [ path: String ]
*   [ domain: String ]
* @return null
*/
export function clearCookie (params) {
  let arr = document.cookie.split(';'), path = '', domain = '';

  if (!params) params = {};
  if (params.path) path = 'path=' + params.path + ';';
  if (params.domain) domain = 'domain=' + params.domain + ';';

  for (let i = 0; i < arr.length; i ++) {
    let key = arr[i].substring(0, arr[i].indexOf('='));
    document.cookie = key + '=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;' + path + domain;
  }
}