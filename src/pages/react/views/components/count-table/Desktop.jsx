// 基础模块
import React, { PureComponent } from 'react';

// api
import api, { axios } from '@/api';

// UI组件
import { InputNumber, Button, message } from 'antd';

// 组件
import CountTable from './CountTable';
// import EditableTable from './EditableTable';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';


export default class Desktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.source = axios.CancelToken.source();
    this.columns = [
      {
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
        filters: [ {
          text: 'London',
          value: 'London',
        }, {
          text: 'New York',
          value: 'New York',
        } ],
      },

      {
        title: 'Age',
        align: 'center',
        dataIndex: 'age',
        validate: ({ getFieldDecorator }, dataIndex, record) => {
          return getFieldDecorator(dataIndex, {
            rules: [
              { required: true, message: '请输入年龄', },
              {
                validator: (rule, value, callback) => {
                  if (value <= 0) {
                    callback('年龄必须大于 0');
                  } else {
                    callback();
                  }
                },
              },
            ],
            initialValue: record[dataIndex],
          })(<InputNumber onChange={ this.onInputChange.bind(this, dataIndex, record) }/>);
        },
      },

      {
        title: 'Address',
        align: 'center',
        dataIndex: 'address',
      },

      {
        title: 'Action',
        align: 'center',
        render: (text, record, index) => {
          return (
            <div className="btns">
              <Button
                type="primary"
                size="small"
                onClick={ this.test }
              >
                Check
              </Button>
              <Button size="small">Edit</Button>
              <Button type="danger" size="small">Delete</Button>
            </div>
          );
        },
      },
    ];
    this.footer = [
      {
        // align: 'center',
        dataIndex: 'name',
        render: (rowData) => {
          return '合计';
        },
      },

      {
        // align: 'center',
        dataIndex: 'age',
        render: (rowData) => {
          return '年龄：' + rowData.reduce((pervious, current) => pervious + current);
          // return '年龄'
        },
      },
    ];

    this.CountTable = React.createRef();
  }

  componentDidMount() {
    this.getListPersons();
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  updateTableData = (key, value, record) => {
    let data = JSON.parse(JSON.stringify(this.state.data));

    // data.map(table => {
    //  const index = table.dataSource.findIndex(item => item[key] === value);
    //  if (index > -1) table.dataSource.splice(index, 1, record);
    //  return table;
    // });
    const index = data.findIndex(item => item[key] === value);

    if (index > - 1) data.splice(index, 1, record);

    return data;
  };

  onInputChange = (key, record, value) => {
    record[key] = value;
    this.setState({ data: this.updateTableData('id', record.id, record) });
  };

  getListPersons = () => {
    this.setState({ loading: true });
    api.getListPersons({ page: 1, size: 2 }, { cancelToken: this.source.token }).then(
      response => {
        this.setState({ loading: false, data: response.data });
      },

      error => {
        if (!axios.isCancel(error)) {
          message.error(error.message);
          this.setState({ loading: false });
        }
      }
    );
  };

  validate = () => {
    let isPass = true;
    const forms = this.CountTable.current.forms;
    const validate = (error, values) => {
      console.log(error, values);
      if (error) isPass = false;
    };

    for (let key in forms) {
      forms[key].validateFields(validate);
    }

    if (isPass) {
      message.success('succeed');
    }
  };

  render() {
    const { columns, footer } = this;
    const { data, loading } = this.state;

    return (
      <LayContent>
        <CountTable
          className="desktop-table"
          columns={ columns }
          data={ data }
          footer={ footer }
          loading={ loading }
          onChange={
            (pagination, filters, sorter) => {
              console.log(filters);
            }
          }
          ref={ this.CountTable }
          rowKey="id"
        />

        <div style={ { textAlign: 'center', marginTop: '10px' } }>
          <Button onClick={ this.validate } type="primary">验证</Button>
        </div>

        {/* <EditableTable */ }
        {/* data={ data } */ }
        {/* loading={ loading } */ }
        {/* columns={ columns } */ }
        {/* rowKey="id" */ }
        {/* /> */ }
      </LayContent>
    );
  }
}