// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import moment from 'moment';

// 组件
import Filter from './Filter';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';


class Desktop extends PureComponent {
  static propTypes = {
    string: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      output: [],
    };
    this.filterOptions = [
      {
        label: '省：',
        key: 'province',
        componentType: 'Select',
        props: {
          showArrow: true,
          placeholder: '全部',
        },
        request: 'getProvinces',
        datasource: {
          key: 'provinces',
          dataPath: 'china.provinces',
          renderToPropKey: 'options',
        },
        linkage: {
          resetKeys: [ 'city', 'county' ],
          request: {
            apiName: 'getCities',
            params: (value) => ({ province: value }),
            forceUpdate: true,
          },
        },
      },

      {
        label: '市：',
        key: 'city',
        componentType: 'Select',
        props: {
          showArrow: true,
          placeholder: '全部',
        },
        datasource: {
          key: 'cities',
          renderToPropKey: 'options',
        },
        linkage: {
          resetKeys: 'county',
          request: {
            apiName: 'getCounties',
            params: (value) => ({ city: value }),
            forceUpdate: true,
          },
        },
      },

      {
        label: '区/县：',
        key: 'county',
        componentType: 'Select',
        props: {
          showArrow: true,
          placeholder: '全部',
        },
        datasource: {
          key: 'counties',
          renderToPropKey: 'options',
        },
      },

      {
        label: '日期：',
        key: 'dates',
        componentType: 'DatePicker.RangePicker',
        props: {
          defaultValue: [
            moment().subtract({
              weeks: 1,
            }),
            moment().subtract({
              days: 1,
            }),
          ],
          disabledDate: (currentDate) =>
            currentDate.isBefore(moment().subtract(3, 'months')) || currentDate.isAfter(moment()),
        },
      },

      {
        label: '',
        key: 'checked',
        componentType: 'Checkbox',
        children: (props) => 'Checkbox'
      },

      {
        label: '',
        key: 'fruits',
        componentType: 'Checkbox.Group',
        props: {
          options: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ]
        }
      },

      {
        label: '',
        key: 'radio.group',
        componentType: 'Radio.Group',
        props: {
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
          ]
        }
      },

      {
        label: '',
        key: 'switch',
        componentType: 'Switch',
        props: {
          style: {
            width: 'auto',
            flexGrow: 0,
          },
          checkedChildren: <CheckOutlined />,
          unCheckedChildren: <CloseOutlined />,
          defaultChecked: true,
        },
      },
    ];
  }

  componentDidMount() {

  }

  getData = (model) => {
    console.log('getData, model', model);
    this.setState({ output: Object.entries(model) });
  }

  render() {
    return (
      <LayContent>
        <Filter
          layout={{
            item: {
              width: '33%',
            },
            label: {
              width: 60,
            },
          }}
          options={this.filterOptions}
          buttonWrapStyle={{
            width: '99%',
          }}
          onFilter={this.getData}
          onReset={this.getData}
        />
        {
          this.state.output.map((item, index) => (
            <p key={index}>{item[0]}: {item[1] && item[1].toString()}</p>
          ))
        }
      </LayContent>
    );
  }
}

export default Desktop;