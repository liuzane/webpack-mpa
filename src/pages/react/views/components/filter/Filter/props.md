~~~typescript
interface Props {
  label: string;
  key: string;
  componentType: string; // 'DatePicker.RangePicker'
  props?: object;
  events?: {
    // onChange, onSearch
    onXXX: {
      debounceTimer: 500;
      request: request;
    };
  };

  request?: string | { apiName: string; params?: object; dataPath?: string; forceUpdate?: boolean; callback?: function; } | Array<request>;

  datasource?: {
    key: string; // store.datasource.state.key
    dataPath: string;
    renderToPropKey?: string; // 如果 renderToPropKey 为假值，则数据会渲染到 datasource.data
    label?: string; // datasource 的数据渲染到 renderToPropKey map返回对象的 label，例如 Select options 结构的label
    value?: string; // 如上
    callback?: (data: any) => any;
  };

  linkage?: {
    resetKeys: string | Array<string>;
    request: request;
  };

  children?: (props: object) => ReactNode;
}
~~~