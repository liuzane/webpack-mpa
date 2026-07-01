// 基础模块
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import { fromJS, is } from 'immutable';


class ClickOutside extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    children: PropTypes.element,
    onOutside: PropTypes.func,
  };

  static defaultProps = {
    onOutside: () => {},
  };

  constructor(props) {
    super(props);
    this.Tag = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.isOutside);
  }

  componentWillunmount() {
    document.removeEventListener('click', this.isOutside);
  }

  isOutside = event => {
    let [ isChild, node ] = [ false, event.target ];
    while (node && node.id !== 'root') {
      if (is(fromJS(node), fromJS(this.refs.tag))) {
        isChild = true;
        break;
      }
      node = node.parentNode;
    }
    if (!isChild) {
      this.props.onOutside();
    }
  }

  render() {
    const { tag, children, ...restProps } = this.props;
    return (
      <this.props.tag
        ref={this.Tag}
        onClick={ this.isOutside }
        {...restProps}
      >
        { children }
      </this.props.tag>
    );
  }
}

export default ClickOutside;