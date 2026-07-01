// API
import api from '@/api';

// 方法
import { typeOf, getDeepValueOfObject } from '@/utils/assist';

// 接口名称对应状态名称
const dictionary = {
  getProvinces: 'provinces',
  getCities: 'cities',
  getCounties: 'counties',
};

// 初始化状态
const initialState = Object.freeze({
  provinces: [],
  cities: [],
  counties: [],
});

export default {
  state: {
    ...initialState,
    loading: false,
  },

  reducers: {
    setState(state, data) {
      Object.assign(state, data);
      return {
        ...state,
      };
    },

    resetState() {
      return {
        ...initialState,
      };
    },
  },

  effects: {
    request(options, rootState, callback) {
      let apiName, params, dataPath, forceUpdate, newCallback;
      if (typeOf(options) === 'string') {
        apiName = options;
        newCallback = callback;
      } else if (typeOf(options) === 'object') {
        apiName = options.apiName;
        params = options.params;
        dataPath = options.dataPath;
        forceUpdate = options.forceUpdate;
        newCallback = options.callback || callback;
      } else {
        console.error('[Store Api Error]: apiName is ' + apiName + ', type is ' + typeof apiName);
        return;
      }

      if (!api[apiName] || !dictionary[apiName]) {
        console.error(
          '[Store Api Error]: ' + (!dictionary[apiName] ? 'dictionary[apiName]' : 'api[apiName]') + ' is undefined'
        );
        return;
      }

      if (rootState.datasource[dictionary[apiName]].length > 0 && !forceUpdate) {
        return;
      }

      this.setState({ loading: true });

      return api[apiName](params).then(
        (response) => {
          const data = dataPath ? getDeepValueOfObject(response, dataPath) : response.data;
          this.setState({
            loading: false,
            [dictionary[apiName]]: data,
          });
          newCallback && newCallback(response);
        },

        (error) => {
          this.setState({ loading: false });
        }
      );
    },
  },
};
