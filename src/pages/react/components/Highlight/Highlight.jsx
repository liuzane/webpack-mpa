// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import hljs from 'highlight.js';

// 样式
import './style/Highlight.css';
import 'highlight.js/styles/github.css';

hljs.configure({
  tabReplace: '  ', // 4 spaces
  classPrefix: 'hljs-',
});


class Highlight extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    code: PropTypes.string,
  };

  static defaultProps = {
    language: 'jsx',
  };
  
  constructor (props) {
    super(props);
    this.state = {
      html: ''
    };
  }
  
  componentDidMount() {
    this.setLanguageHTML();
  }

  setLanguageHTML = () => {
    const { language, code } = this.props;
    const html = hljs.highlight(language, code.replace(/^\s+|\s$/g, '')).value;
    this.setState({ html });
  };

  render() {
    const { language } = this.props;
    const { html } = this.state;
    return (
      <figure className={ 'highlight ' + language }>
        <span className="highlight-language">{ language }</span>
        <pre className="highlight-code"><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
      </figure>
    );
  }
}

export default Highlight;