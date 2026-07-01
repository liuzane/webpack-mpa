<template>
  <ant-layout class="app">
    <ant-sider
      v-model:collapsed="collapsed"
      collapsible
      class="app__sider"
    >
      <div class="app__logo">
        <!-- eslint-disable-next-line no-undef -->
        <a :href="PUBLIC_URL">
          <img
            :class="{ 'app__logo-image': true, 'app__logo-image--center': collapsed }"
            src="./assets/logo.svg"
            alt=""
          >
        </a>
        <span v-if="!collapsed" class="app__logo-text">Laboratory</span>
      </div>

      <ant-menu
        :selectedKeys="menuSelectedKeys"
        v-model:openKeys="menuOpenKeys"
        theme="dark"
        mode="inline"
        :inlineIndent="12"
        class="app__menu"
      >
        <app-sub-menus :menus="menus"/>
      </ant-menu>
    </ant-sider>

    <ant-layout>
      <ant-header class="app__header">
        <div class="app__breadcrumb">
          <ant-breadcrumb>
            <ant-breadcrumb-item
              v-for="item in breadcrumbs"
              :key="item.path"
            >
              {{ $getText(item.name) }}
            </ant-breadcrumb-item>
          </ant-breadcrumb>
          <h3 class="app__breadcrumb-name">{{ $getText(breadcrumbs[breadcrumbs.length - 1]?.name) }}</h3>
        </div>

        <ul class="app__tooltip">
          <ant-dropdown trigger="click">
            <li>
              <img
                class="app__avatar"
                src="~@-vue/assets/avatar.jpg"
                alt=""
              >
              <span class="app__username">Admin</span>
            </li>
            <template #overlay>
              <ant-menu class="app__dropdown-menu">
                <template v-for="(menu, index) in dropdownMenus" :key="index">
                  <ant-menu-item
                    v-if="menu.title"
                    :key="index"
                    @click="menu.click"
                  >
                    <template v-if="menu.icon" #icon>
                      <icon :type="menu.icon"/>
                    </template>
                    <span>{{ $getText(menu.title) }}</span>
                  </ant-menu-item>
                  <ant-menu-divider v-else/>
                </template>
              </ant-menu>
            </template>
          </ant-dropdown>
          <ant-dropdown>
            <li>
              <icon type="earth"/>
            </li>
            <template #overlay>
              <ant-menu>
                <ant-menu-item v-for="(item, index) in $getLanguageList()" :key="index">{{ item.name }}</ant-menu-item>
              </ant-menu>
            </template>
          </ant-dropdown>
        </ul>
      </ant-header>

      <ant-content class="app__page">
        <router-view/>
      </ant-content>
    </ant-layout>
  </ant-layout>
</template>

<script>
  // 基础模块
  import { h } from 'vue';

  // 请求
  // import axios, {  } from 'api';

  // 第三方工具
  import { cloneDeep } from 'lodash';

  // 方法
  // import  from '@/utils/';

  // 路由菜单
  import menus from '@-vue/router/menus';

  // UI组件
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Layout, Menu, Breadcrumb, Dropdown, Modal } from 'ant-design-vue';

  const { Header, Sider, Content } = Layout;
  const { SubMenu, Item: MenuItem, Divider: MenuDivider } = Menu;
  const { Item: BreadcrumbItem } = Breadcrumb;

  // 公共组件
  import Icon from '@-vue/components/Icon';

  // 组件
  // import  from '';

  export default {
    name: 'App',

    components: {
      AntLayout: Layout,
      AntHeader: Header,
      AntSider: Sider,
      AntContent: Content,
      AntMenu: Menu,
      AntSubMenu: SubMenu,
      AntMenuItem: MenuItem,
      AntMenuDivider: MenuDivider,
      AntBreadcrumb: Breadcrumb,
      AntBreadcrumbItem: BreadcrumbItem,
      AntDropdown: Dropdown,
      Icon,
      AppSubMenus: {
        name: 'app-sub-menus',
        props: ['menus'],
        components: {
          AntSubMenu: SubMenu,
          AntMenuItem: MenuItem,
          Icon,
        },
        template: `
          <template v-for="menu in menus" :key="menu.path">
            <template v-if="menu.children">
              <ant-sub-menu :key="menu.path">
                <template v-if="menu.icon" #icon>
                  <icon :type="menu.icon"/>
                </template>
                <template #title>{{ $getText(menu.name) }}</template>
                <app-sub-menus :menus="menu.children" />
              </ant-sub-menu>
            </template>
            <template v-else>
              <ant-menu-item :key="menu.path">
                <template v-if="menu.icon" #icon>
                  <icon :type="menu.icon"/>
                </template>
                <router-link :to="menu.path">{{ $getText(menu.name) }}</router-link>
              </ant-menu-item>
            </template>
          </template>
        `
      },
    },

    data() {
      return {
        menus,
        collapsed: false,
        menuSelectedKeys: [],
        menuOpenKeys: [],
        dropdownMenus: [
          { title: 'app.dropdown.my-center', icon: 'user' },
          { title: 'app.dropdown.change-password', icon: 'password' },
          { divider: true },
          { title: 'app.dropdown.logout', icon: 'logout', click: this.handleLogout },
        ],
      };
    },

    computed: {
      breadcrumbs() {
        const { pathKeys } = this.getRoutePathInfo(this.$route.path);
        let newMenus = cloneDeep(menus);
        return pathKeys.reduce((total, pathname) => {
          const menu = newMenus.find((menu) => menu.path === pathname);
          if (menu) {
            if (menu.children) newMenus = menu.children;
            return total.concat(menu);
          } else {
            return total;
          }
        }, []);
      },
    },

    watch: {
      '$route.path'(path) {
        const { pathname, pathKeys, openKeys } = this.getRoutePathInfo(path);
        this.menuSelectedKeys = [pathname];
        this.menuOpenKeys = [...new Set(this.menuOpenKeys.concat(openKeys))];
      }
    },

    methods: {
      getRoutePathInfo(path) {
        const pathnames = path.replace(/[#]?\//g, ',/').split(',').filter(name => name);
        const pathKeys = pathnames.reduce((total, current) => {
          const lastPathname = total[total.length - 1];
          total.push(lastPathname ? lastPathname + current : current);
          return total;
        }, []);
        const openKeys = pathKeys.slice(0, pathKeys.length - 1);
        return {
          pathname: pathKeys[pathKeys.length - 1],
          pathnames,
          pathKeys,
          openKeys,
        };
      },

      handleLogout() {
        Modal.confirm({
          title: 'app.logout.title?',
          icon: h(ExclamationCircleOutlined),
          okText: 'global.okText',
          cancelText: 'global.cancelText',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      }
    },
  }
</script>

<style lang="less">
  @import '~@-vue/styles/variable.less';

  .app {
    height: 100%;
    overflow: hidden;
  }

  .app__sider {
    overflow: hidden;
  }

  .app__logo {
    height: 64px;
    position: relative;
  }

  .app__logo-image {
    width: 32px;
    height: 32px;
    vertical-align: top;
    position: absolute;
    top: 50%;
    left: 5%;
    margin-top: -16px;
    animation: logo-spin 5s ease-in-out infinite;
  }

  .app__logo-image--center {
    left: 50%;
    margin-left: -16px;
  }

  .app__logo-text {
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    background-color: #334454;
    color: rgba(255, 255, 255, .8);
    font-size: 16px;
    line-height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .app__menu {
    // width: calc(100% + 17px) !important;
    width: 100% !important;
    height: calc(100% - 64px);
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .app__menu::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .app__header {
    padding: 0 8px;
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .app__breadcrumb {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
  }

  .app__breadcrumb-name {
    color: rgba(0, 0, 0, 0.85);
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
  }

  .app__tooltip {
    float: right;
    height: 100%;
  }

  .app__tooltip > li {
    /*display: inline-block;*/
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }

  .app__tooltip > li:hover {
    background: #f8f8f9;
  }

  .app__avatar {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
  }

  .app__username {
    margin-left: 8px;
    line-height: 24px;
  }

  .app__dropdown-menu {
    .iconfont {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item:last-child {
      color: @error-color;
    }
  }

  .app__page {
    margin: 8px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }

  @keyframes logo-spin {
    0% {
      transform: rotateY(0deg);
    }

    45% {
      transform: rotateY(0deg);
    }

    55% {
      transform: rotateY(180deg);
    }

    100% {
      transform: rotateY(180deg);
    }
  }
</style>
