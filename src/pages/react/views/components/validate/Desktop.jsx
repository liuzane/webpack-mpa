// 基础模块
import React, { PureComponent } from 'react';

// 第三方模块
import _ from 'lodash';

// UI组件
import { Input, Button } from 'antd';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 组件
import Validate from './Validate';

// 样式
import './style/Desktop.less';


class Desktop extends PureComponent {
  constructor() {
    super();
    this.state = {
      model: {
        name: '',
        phone: '',
      },
      rules: {
        name: {
          required: true,
          message: 'Please type name',
        },
        phone: [
          {
            required: true,
            message: 'Please type phone',
          },
          {
            validator(rule, value, callback) {
              console.log('rule', rule);
              console.log('value', value);
              if (!/^1\d{10}$/.test(value)) {
                callback('Please type the correct phone, inside');
              } else {
                callback();
              }
            },
            message: 'Please type the correct phone, outside',
          }
        ]
      }
    };
  }

  onSetValue = (key, e) => {
    const value = e.target.value;
    const model = _.cloneDeep(this.state.model);
    model[key] = value;
    this.setState({ model });
  };

  handleValidate = () => {
    Validate.validate((error, model) => {
      console.log('error', error);
      console.log('model', model);
    });
  };

  render() {
    const { model, rules } = this.state;
    return (
      <LayContent>
        <Validate model={ model } rules={ rules }>
          {
            (messages) => (
              <div className="validate-wrap">
                <div className="validate-row">
                  <Input value={ model.name } placeholder="Please type name"
                         onChange={ this.onSetValue.bind(this, 'name') }
                  />
                  <p>{ messages.name }</p>
                </div>
                <div className="validate-row">
                  <Input value={ model.phone } placeholder="Please type phone"
                         onChange={ this.onSetValue.bind(this, 'phone') }
                  />
                  <p>{ messages.phone }</p>
                </div>
                <Button onClick={ this.handleValidate }>验证</Button>
              </div>
            )
          }
        </Validate>
      </LayContent>
    );
  }
}

export default Desktop;