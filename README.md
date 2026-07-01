# [Laboratory](https://liuzane.github.io/laboratory/)
This is a the React experiment project.

## Features
* Create-React-App
* Multi-page application
* React Router & React Redux
* Ant Design
* International language
* ESLint validation
* In and out of the animation
* The react-app-rewired configuration

## Account
username: admin

password: 123456

## How to add environment variables
Add the [.env](https://github.com/liuzane/laboratory/blob/master/.env) file to the project root directory.
> Note: the [CRA removes the node environment variable](https://www.html.cn/create-react-app/docs/adding-custom-environment-variables/). To add the variable, you need to prefix it with REACT_APP_
 
> If you want to change the port and so on configuration, please refer to the [CRA advanced configuration](https://www.html.cn/create-react-app/docs/advanced-configuration/).

```text
REACT_APP_SCRIPT=$npm_lifecycle_event   // Plus $ means to get a variable in process.env
REACT_APP_xxx=xxx                       
```

## How to use API?
Add code to the api.js file.

```javascript
import axios from 'axios';

export const login = (data, config) => {
  return axios({
    method: 'post',
    url: '/user/login',
    data,
    ...config,
  });
};

export const getListPersons = (params, config) => {
  return axios({
    method: 'get',
    url: '/user/list',
    params,
    ...config,
  });
};
```
In the JS file
> Note: aliases are used below

> The @ symbol is configured in webpack, where it stands for src/ and points to src/api

```javascript
import { login } from '@/api';

// Send request
login({ username: 'admin', password: '123456' }).then(
  response => {
    // succeed
  }, 

  error => {
    // failed
  }
);
```
## How to cancel the request?
Change the code above to the code below.
```javascript
import axios, { login } from 'api';

const source = axios.CancelToken.source();

// Send request
login({ username: 'admin', password: '123456' }, { cancelToken: source.token }).then(
  response => {
    // succeed
  }, 

  error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      // failed
    }
  }
);

// cancel request
source.cancel('Operation canceled by the user.');
```
