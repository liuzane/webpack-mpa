// 基础模块
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 路由跳转方法
import { goto } from './router';

// 方法
import { setCookie } from '@/utils/cookie';

// API
import api from '@/api';

// UI库组件
import { Form, Input, Icon, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// 多语言组件
import { injectIntl, FormattedMessage } from 'react-intl';

// 公共组件
import LayLogin from './layouts/LayLogin';

// 样式
import './style/Login.css';

// 验证必填项函数
const validate = (rules, params) => {
  return {
    rules,
    ...params
  };
};


class Login extends Component {
  static propTypes = {
    intl: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.formRef = React.createRef();
  }

  login = (values) => {
    this.setState({ loading: true });
    api.login(values).then(
      response => {
        const search = window.location.search;
        setCookie({ key: 'token', value: response.data.id, hours: 0.5 });
        message.success(response.message);
        this.setState({ loading: false });
        goto(search ? decodeURIComponent(search.replace('?url=', '')) : '/');
      },

      error => {
        message.error(error.message);
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <LayLogin>
        <Form ref={this.formRef} onFinish={this.login}>
          <h3 className="login__title">
            <FormattedMessage id="login.title" />
          </h3>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: formatMessage({ id: 'login.username-empty' }) },
            ]}
          >
            <Input
              onPressEnter={ this.login }
              placeholder={ formatMessage({ id: 'login.username' }) }
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: formatMessage({ id: 'login.password-empty' }) },
            ]}
          >
            <Input
              onPressEnter={ this.login }
              placeholder={ formatMessage({ id: 'login.password' }) }
              prefix={ <LockOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} /> }
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="login__btn"
              block
              loading={ this.state.loading }
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="login.loginText"/>
            </Button>
          </Form.Item>
        </Form>
      </LayLogin>
    );
  }
}

const IntlLogin = injectIntl(Login);

export default IntlLogin;