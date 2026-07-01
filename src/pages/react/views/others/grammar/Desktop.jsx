// 基础模块
import React, { PureComponent } from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

// 样式
import './style/Desktop.less';

const code = `
const obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
console.log(obj)   // {property1: true, property2: 'Hello'}
`;


class Desktop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.Grammar = React.createRef();
  }

  componentDidMount() {

  }
  
  handleRefs = () => {
    console.log(this.Grammar);
  };

  render() {
    const { className, style } = this.props;
    
    return (
      <LayContent>
        <h1
          ref={ this.Grammar }
          className={ className }
          style={ style }
        >
          <button onClick={ this.handleRefs }>Grammar</button>
        </h1>
        <HighlightCode code={ code } />
      </LayContent>
    );
  }
}

export default Desktop;