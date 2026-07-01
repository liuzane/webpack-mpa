// 基础模块
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Redux extends Component {
  static propTypes = {
    // State
    array: PropTypes.array,
    // Dispatch
    func: PropTypes.func,
    // Props
    string: PropTypes.string,
  };
  
  render() {
    return ();
  };
}

// State
const mapStateToProps = state => ({
  one: state.user.one,
});

// Dispatch
const mapDispatchToProps = dispatch => ({
  emit: dispatch.user.emit,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Redux);