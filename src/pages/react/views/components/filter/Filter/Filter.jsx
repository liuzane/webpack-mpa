// 基础模块
import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 第三方模块
import { cloneDeep, debounce } from 'lodash';
import memoizeOne from 'memoize-one';

// 方法
import { typeOf, getDeepValueOfObject } from '@/utils/assist';

// 第三方组件
import components from './components';
import * as Icon from '@ant-design/icons';

// Antd Components Default Props
import defaultProps from './defaultProps';

// 样式
import './Filter.less';

class Filter extends PureComponent {
  static propTypes = {
    options: PropTypes.array,
    datasource: PropTypes.object,
    request: PropTypes.func,
    defaultModel: PropTypes.object,
    initFilter: PropTypes.bool,
    layout: PropTypes.shape({
      item: PropTypes.object, // CSSProperties
      label: PropTypes.object, // CSSProperties
    }),
    className: PropTypes.string,
    style: PropTypes.object, // CSSProperties
    buttonWrapStyle: PropTypes.object, // CSSProperties
    filterButton: PropTypes.element,
    resetButton: PropTypes.element,
    otherButton: PropTypes.element,
    children: PropTypes.node,
    onFilter: PropTypes.func,
    onReset: PropTypes.func,
  };

  static defaultProps = {
    defaultModel: {},
    initFilter: true,
    layout: {},
    className: '',
  };

  // static getDerivedStateFromProps(props, state) {
  //   return null;
  // };

  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      model: {},
    };
  }

  // 初始化
  componentDidMount() {
    this.initFilters(() => {
      this.props.initFilter && this.handleFilter();
    });
  }

  // 设置 datasource
  componentWillReceiveProps(nextProps) {
    const { datasource } = nextProps;
    const { filters } = this.state;
    if (filters.length > 0) {
      const newFilters = filters.map((item) => {
        return this.setDatasource(item, datasource);
      });
      this.setState({ filters: newFilters });
    }
  }

  // 初始化配置
  initFilters = (callback) => {
    const { options, datasource, defaultModel } = this.props;
    const model = cloneDeep(this.state.model);
    const filters = cloneDeep(options).map((item, index) => {
      // 设置默认值
      if (item.key) {
        model[item.key] = this.setDefaultValue(item, defaultModel);
      }

      // 设置默认Props
      if (defaultProps[item.componentType]) {
        item.props = Object.assign(cloneDeep(defaultProps[item.componentType]), item.props || {});
      }

      // 请求配置
      if (item.request) {
        this.onRequest(item.request, model[item.key], item);
      }

      // 设置 datasource
      if (item.datasource) {
        item = this.setDatasource(item, datasource);
      }

      // 联动配置
      let linkageChange = () => {};
      if (item.linkage) {
        linkageChange = this.setLinkageChange(item);
      }

      // 事件配置
      const events = this.setEvents(item, linkageChange);

      return {
        ...item,
        events,
        component: this.setComponentByType(item.componentType),
      };
    });
    this.setState({ filters, model }, callback);
  };

  // 设置默认值
  setDefaultValue = (item, defaultModel) => {
    let newDefaultValue = defaultModel[item.key] ?? '';
    if (item.props) {
      if (item.props.defaultValue !== undefined) {
        newDefaultValue = item.props.defaultValue;
      }
      if (item.props.value !== undefined) {
        newDefaultValue = item.props.value;
      }
    }
    return newDefaultValue;
  };

  // 请求配置
  onRequest = (options, value, item) => {
    const { request } = this.props;
    if (options) {
      let newOptions = {};
      switch (typeOf(options)) {
        case 'string':
          newOptions.apiName = options;
          break;

        case 'object':
          newOptions = cloneDeep(options);
          if (typeOf(options.params) === 'function') {
            const model = cloneDeep(this.state.model);
            newOptions.params = options.params(value, item, model);
          }
          break;

        case 'array':
          options.forEach((option) => this.onRequest(option, value, item));
          break;
      }

      request(newOptions);
    }
  };

  // 设置 datasource
  setDatasource = (item, datasource) => {
    if (datasource?.[item?.datasource?.key]) {
      const { key, dataPath, renderToPropKey, callback, label, value } = item.datasource;
      const data = dataPath ? getDeepValueOfObject(datasource[key], dataPath, []) : datasource[key];
      const newData = callback ? callback(data) : data;
      item.datasource.data = newData;
      if (renderToPropKey) {
        const props = { ...item.props };
        props[renderToPropKey] = callback
          ? newData
          : typeOf(data) === 'array'
          ? data.map((row) => ({
              label: label ? row[label] : row,
              value: value ? row[value] : row,
            }))
          : data;
        item.props = props;
      }
    }
    return item;
  };

  // 设置事件
  setEvents = (item, linkageChange) => {
    const events = {};
    if (typeOf(item.events) === 'object') {
      for (const eventName in item.events) {
        const { request, debounceTimer = 500 } = item.events[eventName];
        if (request) {
          events[eventName] = debounce((value) => {
            this.onRequest(request, value, item);
            if (item.linkage?.eventName && item.linkage.eventName !== 'onChange') {
              linkageChange(value);
            }
          }, debounceTimer);
        }
      }
    }

    const newEvents = {};
    switch (item.componentType) {
      case 'Checkbox.Group':
      case 'InputNumber':
      case 'Select':
      case 'Switch':
        newEvents.onChange = (value) => {
          this.onChange(
            item.key,
            value,
            events.onChange ? events.onChange.bind(this, value) : linkageChange.bind(this, value)
          );
        };
        break;

      case 'DatePicker':
      case 'DatePicker.RangePicker':
      case 'TimePicker':
      case 'TimePicker.RangePicker':
        newEvents.onChange = (dates, dateStrings) => {
          this.onChange(
            item.key,
            dates,
            events.onChange ? events.onChange.bind(this, dates) : linkageChange.bind(this, dates)
          );
        };
        break;

      case 'Checkbox':
        newEvents.onChange = (e) => {
          const checked = e.target.checked;
          this.onChange(
            item.key,
            checked,
            events.onChange ? events.onChange.bind(this, checked) : linkageChange.bind(this, checked)
          );
        };
        break;

      case 'Input':
      case 'Radio':
      case 'Radio.Group':
      case 'MultiInput':
      default:
        newEvents.onChange = (e) => {
          const value = e.target.value;
          this.onChange(
            item.key,
            value,
            events.onChange ? events.onChange.bind(this, value) : linkageChange.bind(this, value)
          );
        };
        break;
    }
    return { ...events, ...newEvents };
  };

  // 联动配置事件
  setLinkageChange = (item) => {
    const { resetKeys, request } = item.linkage;
    return (value) => {
      const { options, defaultModel } = this.props;
      this.onRequest(request, value, item);
      if (resetKeys) {
        const newModel = cloneDeep(this.state.model);
        switch (typeOf(resetKeys)) {
          case 'string':
            const option = options.find((item) => item.key === resetKeys);
            if (option) {
              newModel[resetKeys] = this.setDefaultValue(option, defaultModel);
            }
            break;

          case 'array':
            const keys = {};
            resetKeys.forEach((item) => (keys[item] = true));
            options.forEach((option) => {
              if (keys[option.key]) {
                newModel[option.key] = this.setDefaultValue(option, defaultModel);
              }
            });
            break;
        }
        this.setState({ model: newModel });
      }
    };
  };

  // 根据 componentType 设置组件
  setComponentByType = (componentType) => {
    const types = componentType.split('.');
    return types.reduce((total, currentValue) => {
      return total[currentValue];
    }, components);
  };

  // Component Change Event
  onChange = (key, value, callback) => {
    const model = cloneDeep(this.state.model);
    model[key] = value;
    this.setState({ model }, callback);
  };

  // 过滤
  handleFilter = () => {
    const { onFilter } = this.props;
    const model = cloneDeep(this.state.model);
    onFilter && onFilter(model);
  };

  // 重置
  handleReset = () => {
    const { onReset } = this.props;
    this.initFilters(() => {
      const model = cloneDeep(this.state.model);
      onReset && onReset(model);
    });
  };

  // 设置组件宽度
  setComponentWidth = memoizeOne((label, style) => {
    const labelWidth = typeof label?.width === 'number' ? label?.width + 'px' : label?.width;
    return {
      width: 'calc(100% - ' + labelWidth + ')',
      ...style,
    };
  });

  // 设置组件Props
  setProps = memoizeOne((item = {}, model, loading) => {
    const props = item.props || {};
    const newProps = {};
    if (props.notFoundContent) {
      newProps.notFoundContent = props.notFoundContent(loading);
    }

    return { ...props, ...newProps, ['Checkbox|Switch'.includes(item.componentType) ? 'checked' : 'value']: model[item.key] };
  });

  render() {
    const {
      datasource: { loading },
      layout,
      className,
      style,
      buttonWrapStyle,
      filterButton,
      resetButton,
      otherButton,
      children,
    } = this.props;
    const { filters, model } = this.state;

    return (
      <div className={'filter' + (className ? ' ' + className : '')} style={style}>
        {filters.map((item) => (
          <div
            key={item.key}
            className={'filter-item' + (item.className ? ' ' + item.className : '')}
            style={{ ...layout.item, ...item.style }}
          >
            <span className="filter-label" style={layout.label}>
              {item.label}
            </span>
            <item.component
              className="filter-component"
              {...this.setProps(item, model, loading)}
              style={this.setComponentWidth(layout.label, item?.props?.style)}
              {...item.events}
            >
              {item.children && item.children(item)}
            </item.component>
          </div>
        ))}
        {children && <div className="filter-item">{children}</div>}
        <div className="filter-item--last" style={{ ...layout.item, ...buttonWrapStyle }}>
          {otherButton}
          {resetButton ? (
            cloneElement(resetButton, { onClick: this.handleReset })
          ) : (
            <components.Button
              style={{ marginLeft: 20 }}
              icon={<Icon.ReloadOutlined />}
              onClick={this.handleReset}
            >
              重置
            </components.Button>
          )}
          {filterButton ? (
            cloneElement(filterButton, { onClick: this.handleFilter })
          ) : (
            <components.Button
              type="primary"
              icon={<Icon.SearchOutlined />}
              onClick={this.handleFilter}
            >
              搜索
            </components.Button>
          )}
        </div>
      </div>
    );
  }
}

// State
const mapStateToProps = (state) => ({
  datasource: state.datasource,
});

// Dispatch
const mapDispatchToProps = (dispatch) => ({
  request: dispatch.datasource.request,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
