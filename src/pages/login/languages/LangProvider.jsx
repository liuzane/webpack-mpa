// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 多语言模块
import { IntlProvider } from 'react-intl';

// 多语言列表
import { defaultLanguage, languages } from './languages';

class LangProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    const browserLanguage = window.navigator.language.toLocaleLowerCase();

    this.language = languages.find(item => item.code === browserLanguage) ? browserLanguage : defaultLanguage.code;
    this.messages = require(`./locales/${this.language}.json`);
  }

  render() {
    const { children } = this.props;

    return (
      <IntlProvider
        locale={ this.language }
        messages={ this.messages }
        defaultLocale={ defaultLanguage.code }
      >
        { children }
      </IntlProvider>
    );
  }
}

export default LangProvider;