// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 路由模块
import { withRouter } from 'react-router-dom';

// 路由跳转方法
import { goto } from './router';

// 方法
import { clearCookie } from '@/utils/cookie';
import { clearStorage } from '@/utils/local-storage';

// 布局组件
import { LayHeader } from './layouts/LayMain';

// UI组件库
import { Dropdown, Menu, Button, Modal, Breadcrumb } from 'antd';
import { UserOutlined, UnlockOutlined, PoweroffOutlined, CaretDownOutlined } from '@ant-design/icons';


class AppHeader extends PureComponent {
  static propTypes = {
    // State
    username: PropTypes.string,
    // Action
    resetUser: PropTypes.func,
    // Props
    i18n: PropTypes.object,
    location: PropTypes.object,
    routeInfo: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const language = props.i18n.getLanguage();
    const languageList = props.i18n.getLanguageList();
    const currentLanguage = languageList.find(item => item.code === language);
    if (currentLanguage) {
      this.languageKey = currentLanguage.code;
      this.languageName = currentLanguage.name;
    }
  }

  // 切换语言并保存到本地
  handleLanguage = ({ key }) => {
    this.props.i18n.setLanguage(key);
    window.location.reload();
  };

  // 处理用户行为
  handleUser = ({ item, key, keyPath }) => {
    const { resetUser, i18n: { getText } } = this.props;

    switch (key) {
      case 'userInfo':
        break;

      case 'password':
        break;

      case 'logout':
        Modal.confirm({
          centered: true,
          title: getText('page.header.logout.title'),
          content: getText('page.header.logout.content'),
          okText: getText('global.okText'),
          cancelText: getText('global.cancelText'),
          onOk: () => {
            clearCookie();
            clearStorage('userInfo');
            resetUser();
            goto('/login.html');
          }
        });
        break;

      default:
        break;
    }
  };

  // 渲染用户行为下拉列表
  renderUserMenu() {
    const { i18n: { getText } } = this.props;
    return (
      <Menu onClick={ this.handleUser }>
        <Menu.Item key="userInfo">
          <UserOutlined className="app__menu-icon" />
          {getText('page.header.personalInfo')}
        </Menu.Item>

        <Menu.Item key="password">
          <UnlockOutlined className="app__menu-icon" />
          {getText('page.header.changePassword')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item className="app__logout" key="logout">
          <PoweroffOutlined className="app__menu-icon" />
          {getText('page.header.logout')}
        </Menu.Item>
      </Menu>
    );
  }

  // 渲染多语言下拉列表
  renderLanguageMenu() {
    const languageList = this.props.i18n.getLanguageList();
    return (
      <Menu
        defaultSelectedKeys={[ this.languageKey ]}
        onClick={ this.handleLanguage }
        selectedKeys={[ this.languageKey ]}
      >
        {
          languageList.map(lang => (
            <Menu.Item key={ lang.code }>
              <span>{ lang.name }</span>
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
  
  render() {
    const { i18n: { getText }, username, routeInfo } = this.props;
    let breadcrumbs = [];
    if (routeInfo.pathRoutes) {
      breadcrumbs = routeInfo.pathRoutes;
    }

    return (
      <LayHeader className="app__header">
        {
          routeInfo.lastKey === '/home' ? (
            <h2 className="app__title">
              {getText('page.header.title')}
            </h2>
          ) : (
            <div className="app__breadcrumb">
              <Breadcrumb>
                {
                  breadcrumbs.map(route => (
                    <Breadcrumb.Item key={route.path}>
                      {getText(route.title)}
                    </Breadcrumb.Item>
                  ))
                }
              </Breadcrumb>
              <h3 className="app__breadcrumb-name">
                {
                  breadcrumbs.length > 0 ? getText(breadcrumbs[breadcrumbs.length - 1].title) : null
                }
              </h3>
            </div>
          )
        }
        
        <Dropdown
          className="app__dropdown"
          overlay={ this.renderLanguageMenu.bind(this) }
          placement="bottom"
        >
          <div className="app__dropdown-title">
            <Button size="small">{ this.languageName }</Button>
          </div>
        </Dropdown>

        <Dropdown
          className="app__dropdown"
          overlay={ this.renderUserMenu.bind(this) }
          placement="bottom"
        >
          <div className="app__dropdown-title">
            <span className="app__dropdown-title-text">{ username }</span>
            <CaretDownOutlined style={{ color: 'rgba(0, 0, 0, .5)' }} />
          </div>
        </Dropdown>
      </LayHeader>
    );
  }
}

const RouterHeader = withRouter(AppHeader);

// State
const mapStateToProps = ({ user }) => ({
  username: user.name,
});

// Dispatch
const mapDispatchToProps = ({ user }) => ({
  resetUser: user.resetUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterHeader);