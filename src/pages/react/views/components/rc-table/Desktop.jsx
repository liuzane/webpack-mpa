// 基础模块
import React, { PureComponent } from 'react';

// api
import api from '@/api';

// UI组件
import Table from 'rc-table';
import { Button } from 'antd';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import 'rc-table/assets/index.css';


class Desktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    // this.columns = [
    //   {
    //     key: 'a',
    //     title: '表头1',
    //     dataIndex: 'a',
    //     colSpan: 2,
    //   },
    //   {
    //     id: '123',
    //     title: '表头2',
    //     dataIndex: 'b',
    //     colSpan: 0,
    //     key: 'b',
    //     render: function (o, row, index) {
    //       let obj = {
    //         children: o,
    //         props: {}
    //       }
    //       if (index === 0) {
    //         obj.props.rowSpan = 2;
    //       }
    //       if (index === 1) {
    //         obj.props.rowSpan = 0;
    //       }
    //       return obj;
    //     }
    //   },
    //   {
    //     key: 'c',
    //     title: '表头3',
    //     dataIndex: 'c',
    //   },
    //   {
    //     key: 'd',
    //     title: '操作',
    //     dataIndex: '',
    //     render: function () {
    //       return <a href="#">操作</a>
    //     }
    //   }
    // ];
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
      },

      {
        title: 'Address',
        align: 'center',
        dataIndex: 'address',
      },

      // {
      //   key: 'Address1',
      //   title: 'Address1',
      //   align: 'center',
      //   dataIndex: 'address.js',
      // },

      // {
      //   key: 'Address2',
      //   title: 'Address2',
      //   align: 'center',
      //   dataIndex: 'address.js',
      // },

      {
        title: 'Action',
        align: 'center',
        // width: 300,
        render: (text, record, index) => {
          return (
            <div className="btns">
              <Button
                type="primary"
                size="small"
                onClick={this.test}
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
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ loading: true });
    api.getListPersons({ page: 1, size: 100 }).then(response => {
      this.setState({ dataSource: response.data });
    });
  };

  render() {
    return (
      <LayContent>
        <Table
          columns={this.columns}
          data={this.state.dataSource}
          scroll={{ x: 300, y: 400 }}
          className="table"
        />
      </LayContent>
    );
  }
}

export default Desktop;