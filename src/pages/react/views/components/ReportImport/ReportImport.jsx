// 基础模块
import React, { PureComponent } from 'react';

// 第三方模块
import xlsx from 'xlsx';
import moment from 'moment';
import { cloneDeep } from 'lodash';

// API
import { flowEnergizeImportMoney } from './api';

// 方法
import { download, getUrlArg } from '@/utils/assist';

// 第三方组件
import { Form, Select, Button, message } from 'antd';
import { PlusOutlined, DownloadOutlined, SaveOutlined } from '@ant-design/icons';

// 公共组件
import GridLayout from '@/components/GridLayout';
import Block from '@/components/Block';
import EditableTable from './EditableTable';

// 样式
import './ReportImport.less';

// 配置
import * as config from './config';


class ReportImport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      module: '',
      dataSource: [],
      saveLoading: false,
    };

    this.layout = config.layout;

    this.modules = config.modules;

    this.columns = [];

    this.form = React.createRef();
    this.file = React.createRef();
  }

  // 初始化
  componentDidMount() {
    const module = getUrlArg('module');
    this.setState({ module });
    this.columns = config.columns(module);
    this.form.current.setFieldsValue({ module });
  }

  // 模式选择
  handleModeChange = (value) => {
    this.columns = config.columns(value);
    this.setState({ module: value, dataSource: [] });
  }

  // 拖文件进来
  handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    try {
      await this.form.current.validateFields();
      this.excelToJson(files[0]);
    } catch (error) {
      console.log('Form Failed:', error);
    }
  }

  // 点击进来
  handleChooseFile = async (e) => {
    e.stopPropagation();
    try {
      await this.form.current.validateFields();
      this.file.current.click();
    } catch (error) {
      console.log('Form Failed:', error);
    }
  }

  // 处理文件
  fileChange = (e) => {
    this.excelToJson(e.currentTarget.files[0]);
  }

  // Excel转为Json
  excelToJson = (file) => {
    console.log('file', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: 'binary' });
      console.log('workbook', workbook);
      const json = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      console.log('json', json);
      const dataSource = json.map((row, index) => {
        const newRow = { index: index + 1 };
        for (let key in row) {
          if (config.excelColumnName[key]) {
            switch (key) {
              case config.enums.date.name: {
                const date = new Date((row[key] - 1) * 86400000 - 1);
                date.setYear(date.getFullYear() - 70);
                date.setDate(date.getDate() - 1);
                newRow[config.excelColumnName[key]] = moment(date).format('YYYY-MM-DD');
                break;
              }

              case config.enums.cost.name:
              case config.enums.income.name: {
                if (Number(row[key]) || row[key] == 0) {
                  newRow[config.excelColumnName[key]] = row[key].toFixed(2);
                } else {
                  message.error(`第 ${ index + 1 } 条数据格式有误：${ key }: ${ row[key] }`, 10);
                }
                break;
              }
              
              default: {
                newRow[config.excelColumnName[key]] = row[key];
                break;
              }
            }
          }
        }
        return newRow;
      });
      console.log('dataSource', dataSource);
      this.setState({ dataSource });
      this.form.current.resetFields();
      this.file.current.value = '';
    };
    reader.readAsBinaryString(file);
  }

  // 下载模板
  downloadTemplate = async () => {
    try {
      const { module } = await this.form.current.validateFields();
      let fields = Object.values(config.enums).map(item => item.name);

      switch (module) {
        case config.enums.date.key:
          fields = fields.filter(name => name !== config.enums.city.name && name !== config.enums.channel.name);
          break;

        case config.enums.city.key:
          fields = fields.filter(name => name !== config.enums.channel.name);
          break;

        case config.enums.channel.key:
          fields = fields.filter(name => name !== config.enums.city.name);
          break;
      }
      console.log('fields', fields);

      const sheet = {
        '!ref': 'A1:' + String.fromCharCode(65 + fields.length - 1) + (fields.length - 1)
      };
      fields.forEach((name, index) => {
        sheet[String.fromCharCode(65 + index) + 1] = { v: name };
      });
      console.log('sheet', sheet);

      const SheetName = 'sheet1';
      const workbook = {
        SheetNames: [ SheetName ],
        Sheets: {
          [SheetName]: sheet
        },
      };
      const options = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      };
      console.log('workbook', workbook);
      const wbout = xlsx.write(workbook, options);
      const buffer = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buffer);
      for (let index = 0; index < view.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF;
      const blob = new Blob([ view ], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      download(url, config.enums[module].name + '-模板.xlsx');
    } catch (error) {
      console.log('Form Failed:', error);
    }
  }

  // 表格数据变更保存
  onTableSave = (row) => {
    console.log('row', row);
    const dataSource = [ ...this.state.dataSource ];
    const index = dataSource.findIndex((item) => row.index === item.index);
    const item = dataSource[index];
    dataSource.splice(index, 1, { ...item, ...row });
    this.setState({ dataSource });
  }

  // 校验数据格式
  validateDataSource = (data) => {
    const dataSource = cloneDeep(data);
    let pass = true;
    let msg = '';
    dataSource.forEach(item => {
      delete item.index;
      if (!/^\d{4}-[01]\d-[0-3]\d/.test(item[config.enums.date.dataIndex])) {
        pass = false;
        msg = '日期 ' + item[config.enums.date.dataIndex] + ' 格式错误！';
      }
    });
    return {
      pass,
      msg,
      dataSource,
    };
  }

  // 上传保存
  handleSave = () => {
    const { module, dataSource } = this.state;
    if (!module || dataSource.length === 0) return;
    const result = this.validateDataSource(dataSource);
    if (!result.pass) {
      return message.warning(result.msg);
    }
    const params = {
      module,
      data: result.dataSource,
    };
    this.setState({ saveLoading: true });
    flowEnergizeImportMoney(params).then(
      response => {
        console.log('response', response);
        this.setState({ saveLoading: false });
        message.success('保存成功');
      },

      error => {
        this.setState({ saveLoading: false });
        message.error(error.msg || (error.response.statusText));
      }
    );
  }

  render() {
    const { dataSource, saveLoading } = this.state;

    return (
      <GridLayout layout={ this.layout }>
        <Block key="header" className="report-import-left">
          <Form
            ref={ this.form }
            wrapperCol={ { span: 16 } }
            colon
            style={ { margin: 10 } }
          >
            <Form.Item
              name="module"
              label="模块"
              rules={ [
                {
                  required: true,
                  message: '请选择模块'
                },
              ] }
            >
              <Select options={ this.modules } onChange={ this.handleModeChange }/>
            </Form.Item>
          </Form>
          <div
            className="report-import-import"
            onDrop={ this.handleDrop }
            onDragOver={ e => e.preventDefault() }
            onClick={ this.handleChooseFile }
          >
            <PlusOutlined style={ { fontSize: 18 } }/>
            <span style={ { marginTop: 20 } }>点击或拖到这里导入</span>
            <input
              ref={ this.file }
              type="file"
              style={ { display: 'none' } }
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onClick={ e => e.stopPropagation() }
              onChange={ this.fileChange }
            />
          </div>
        </Block>
        <Block key="table">
          <EditableTable
            title={ () => (
              <>
                <Button
                  icon={ <DownloadOutlined/> }
                  onClick={ this.downloadTemplate }
                >
                  模板下载
                </Button>
                <Button
                  type="primary"
                  style={ { marginLeft: 20 } }
                  icon={ <SaveOutlined/> }
                  loading={ saveLoading }
                  disabled={ dataSource.length === 0 }
                  onClick={ this.handleSave }
                >
                  保存
                </Button>
              </>
            ) }
            columns={ this.columns }
            dataSource={ dataSource }
            rowKey="index"
            bordered
            scroll={ { y: 320 } }
            onSave={ this.onTableSave }
          />
        </Block>
      </GridLayout>
    );
  }
}

export default ReportImport;