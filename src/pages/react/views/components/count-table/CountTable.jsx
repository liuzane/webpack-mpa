/* eslint-disable no-trailing-spaces */
// 基础模块
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// UI组件库
import { Form, Table, Spin } from 'antd';

// 样式
import './style/CountTable.less';

const FormItem = Form.Item;

// Context
const CountTableRowContext = React.createContext();
const CountTableFormsContext = React.createContext();

const countTableCls = (postfix = '') => 'count-table' + postfix;


const CountTableRow = ({ index, ...props }) => {
  const form = {};
  return (
    <CountTableFormsContext.Consumer>
      {
        forms => {
          if (index && !forms[index]) forms[index] = form;
          return (
            <CountTableRowContext.Provider value={ form }>
              <tr { ...props } />
            </CountTableRowContext.Provider>
          );
        }
      }
    </CountTableFormsContext.Consumer>
  );
};


const CountTableFormRow = Form.create()(CountTableRow);


const CountTableCell = ({ validate, dataIndex, record, children, ...props }) => {
  if (typeof validate !== 'function' && validate !== undefined) {
    console.error('[ Validate Error ]: validate must is function!');
  }
  
  return (
    <td { ...props }>
      {
        validate ? (
          <CountTableRowContext.Consumer>
            {
              form => {
                return (
                  <FormItem>
                    { validate(form, dataIndex, record) }
                  </FormItem>
                );
              }
            }
          </CountTableRowContext.Consumer>
        ) : children
      }
    </td>
  );
};


const CountTableBody = ({ rowKey, ...restProps }) => {
  if (!rowKey) console.warn('[ CountTable rowKey Warn ]: rowKey is' + rowKey);
  
  const components = {
    body: {
      row: CountTableFormRow,
      cell: CountTableCell,
    },
  };

  return (
    <div className={ countTableCls('__body') }>
      <Table
        bordered
        components={ components }
        onRow={ record => ({ index: record[rowKey] }) }
        pagination={ false }
        rowKey={ rowKey }
        size="small"
        { ...restProps }
      />
    </div>
  );
};


const CountTableBodyTitle = ({ title }) => {
  if (!title || !(title instanceof Array)) {
    console.warn('[ CountTable Warn ]: title must is array!');
    return null;
  }
  
  return (
    <div className={ countTableCls('__title') }>
      {
        title.map((item, i) => (<span key={ i }>{ item.label }：{ item.value }</span>))
      }
    </div>
  );
};


class CountTableBodyFooter extends PureComponent {
  static propTypes = {
    footer: PropTypes.array,
    dataSource: PropTypes.array,
    dataKey: PropTypes.string,
  };
  
  handleRowData = (data, item) => {
    const dataKey = this.props.dataKey;
    let rowData = [];
    
    data.forEach(row => {
      if (row[dataKey] && row[dataKey].length > 0) {
        rowData = rowData.concat(this.handleRowData(row[dataKey], item));
      } else {
        rowData.push(item.dataIndex && !item.allData ? row[ item.dataIndex ] : row);
      }
    });

    return rowData;
  };
  
  render() {
    const { footer, dataSource } = this.props;
    
    return (
      <div className={ countTableCls('__footer') }>
        {
          footer.map((item, index) => {
            return (
              <div
                className={ countTableCls('__footer-cell') }
                key={ index }
                style={{
                  width: typeof item.width === 'number' ? item.width + 'px' : item.width,
                  textAlign: item.align,
                }}
              >
                { item.render(this.handleRowData(dataSource, item)) }
              </div>
            );
          })
        }
      </div>
    );
  }
}


export default class CountTable extends PureComponent {
  static propTypes = {
    // 是否开启多个table模式，默认单个table
    multiple: PropTypes.bool,
    // 数据源
    data: PropTypes.array,
    // 多个table时，数据源的key，默认dataSource
    dataKey: PropTypes.string,
    // Antd Table表头属性，多加一个属性validate: (form, dataIndex, record) => React.Node可以验证
    columns: PropTypes.array,
    // CountTable表头，参考columns，
    titles: PropTypes.array,
    // 底部计算，参考columns，渲染函数参数不一样render: (rowData) => Any
    footer: PropTypes.array,
    // Antd Table Loading属性，单个表格用在Antd Table，多个表格则使用内置Loading
    loading: PropTypes.bool,
    // Antd Table 行Key属性
    rowKey: PropTypes.string,
    // 当有多个表格时，多个表格的key值，如果每个table数据中没有key属性，则使用index作为key
    tableKey: PropTypes.string,
    // Antd Table scroll属性
    scroll: PropTypes.object,
    
    // 样式
    className: PropTypes.string,
    style: PropTypes.object,
  };
  
  static defaultProps = {
    multiple: false,
    dataKey: 'dataSource',
    className: '',
  };
  
  constructor(props) {
    super(props);
    this.forms = {};
  }
  
  resetForms = () => {
    this.forms = {};
  };
  
  render() {
    const {
      multiple,
      data,
      dataKey,
      titles,
      loading,
      footer,
      tableKey,
      className,
      style,
      ...restProps
    } = this.props;

    const columns = restProps.columns.map(col => ({
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        validate: col.validate,
      })
    }));

    const TitleComponent = (title = titles) => title ? () => (<CountTableBodyTitle title={ title } />) : null;

    let TableComponent, FooterComponent;

    delete restProps.columns;
  
    if (multiple) {
      TableComponent = data.map((table, index) => {
        const dataSource = table[ dataKey ];
        let key = '';
  
        if (!dataSource) {
          console.error('[ CountTable Error ]: ' + dataKey + ' is ' + dataSource);
        }
  
        if (tableKey && table[tableKey]) {
          key = table[tableKey];
        } else if (table.key) {
          key = table.key;
        } else {
          key = index;
        }
  
        return (
          <CountTableBody
            columns={ columns }
            dataSource={ dataSource }
            key={ key }
            title={ TitleComponent(table.title) }
            { ...restProps }
          />
        );
      });
    } else {
      TableComponent = (
        <CountTableBody
          columns={ columns }
          dataSource={ data }
          loading={ loading }
          title={ TitleComponent() }
          { ...restProps }
        />
      );
    }
    
    if (footer && footer.length > 0 && data.length > 0) {
      FooterComponent = (
        <CountTableBodyFooter
          dataKey={ dataKey }
          dataSource={ data }
          footer={ footer }
        />
      );
    }
    
    return (
      <div
        className={ `${ countTableCls() } ${ className }`.trim() }
        style={ style }
      >
        {
          loading && multiple ? (
            <div className={ countTableCls('__loading') }>
              <Spin size="large" spinning />
            </div>
          ) : (
            <Fragment>
              <CountTableFormsContext.Provider value={ this.forms }>
                { TableComponent }
              </CountTableFormsContext.Provider>

              { FooterComponent }
            </Fragment>
          )
        }
      </div>
    );
  }
}