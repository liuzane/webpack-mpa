/*
* @method setStorage
* @param { key: String, required } { data: Any, required } { hours: Number }
* @return { Boolean }
*/
export function setStorage(key, data, hours) {
  let expires;

  if (!key || !data) {
    console.error('[localStorage Error]: Key and Data is a must parameter');
    return false;
  }

  expires = hours ? new Date().getTime() + 1000 * 60 * 60 * hours : new Date(0).getTime();
  localStorage.setItem(key, JSON.stringify({ data, expires }));
  
  return true;
}

/*
* @method getStorage
* @param { key: String, required }
* @return { Boolean | null }
*/
export function getStorage(key) {
  let data, nowTime = new Date().getTime();

  if (!key) console.error('[localStorage Error]: Key is a must parameter');

  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }

  if (!data) return null;

  if (!data.expires || data.expires >= nowTime) {
    return data.data;
  } else {
    localStorage.removeItem(key);
    return null;
  }
}

/*
* @method clearStorage
* @param { key: String, required }
* @return null
*/
export function clearStorage(key) {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
}