// 基础模块
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Weather extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
  };

  constructor (props) {
    super(props);
    const language = props.language.search('-') > -1 ? props.language.split('-')[0] : props.language;
    window.WIDGET = {
      CONFIG: {
        'layout': 2,
        'width': '500',
        'height': '300',
        'background': 1,
        'dataColor': 'ffffff',
        'language': language,
        'key': '54ccfb1d4159431db97d9f1adac745ed'
      }
    };
    this.script = null;
  }

  componentDidMount () {
    this.script = document.createElement('script');
    this.script.src = 'https://widget.heweather.net/standard/static/js/he-standard-common.js?v=1.1';
    document.body.appendChild(this.script);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.script);
    document.body.removeChild(this.script);
  }

  render () {
    return (
      <div id="he-plugin-standard" />
    );
  }
}

// State
const mapStateToProps = ({ user }) => ({
  language: user.language,
});

export default connect(
  mapStateToProps,
  null
)(Weather);