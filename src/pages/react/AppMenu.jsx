// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 路由模块
import { withRouter } from 'react-router-dom';

// 第三方模块
import { fromJS, is } from 'immutable';
import { cloneDeep } from 'lodash';

// 布局组件
import { LaySider } from './layouts/LayMain';

// 公共组件
import IconFont from './components/IconFont';

// UI组件
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;


class AppMenu extends PureComponent {
  static propTypes = {
    // Props
    i18n: PropTypes.object,
    menu: PropTypes.array,
    routeInfo: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  goto = item => {
    this.props.history.push(item.key);
  };

  render() {
    const { i18n: { getText }, menu, routeInfo } = this.props;
    let defaultOpenKeys = [];
    let defaultSelectedKeys = [];
    if (routeInfo.lastChildrenKey) {
      defaultOpenKeys = [ routeInfo.lastChildrenKey ];
    }
    if (routeInfo.lastKey) {
      defaultSelectedKeys = [ routeInfo.lastKey ];
    }

    // return (
    //   <LaySider>
    //     <Menu
    //       key={routeInfo.lastKey}
    //       defaultOpenKeys={defaultOpenKeys}
    //       defaultSelectedKeys={defaultSelectedKeys}
    //       mode="inline"
    //       onSelect={this.goto}
    //       theme="dark"
    //       inlineIndent={12}
    //     >
    //       <Item key="/home">Home</Item>
    //       <SubMenu key="/others" title="Others">
    //         <Item key="/others/less">Less</Item>
    //         <Item key="/others/module">Module</Item>
    //       </SubMenu>
    //     </Menu>
    //   </LaySider>
    // );

    return (
      <LaySider>
        <Menu
          key={routeInfo.lastKey}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          onSelect={this.goto}
          theme="dark"
          inlineIndent={12}
        >
          {
            menu.map(item => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        <IconFont className="app__menu-icon" type={item.icon}/>
                        {getText(item.title)}
                      </span>
                    }
                  >
                    {
                      item.children.map(child => (
                        <Item key={child.path}>
                          {getText(child.title)}
                        </Item>
                      ))
                    }
                  </SubMenu>
                );
              } else {
                return (
                  <Item key={item.path}>
                    <IconFont className="app__menu-icon" type={item.icon}/>
                    {getText(item.title)}
                  </Item>
                );
              }
            })
          }
        </Menu>
      </LaySider>
    );
  }
}

export default withRouter(AppMenu);