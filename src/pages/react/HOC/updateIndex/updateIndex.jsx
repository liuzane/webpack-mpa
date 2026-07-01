// 基础模块
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import { fromJS, is } from 'immutable';


function updateIndex (WrappedComponent) {
	class UpdateIndex extends Component {
		static propTypes = {
			index: PropTypes.number,
			setIndex: PropTypes.func
		};

		componentDidMount () {
			this.props.setIndex(this.props.index);
		}

		shouldComponentUpdate (nextProps, nextState) {
			return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
		}

		render () {
			return <WrappedComponent { ...this.props } />;
		}
	}

	// 约定高阶组件名字
	UpdateIndex.displayName = `UpdateIndex(${ getDisplayName(WrappedComponent) })`;

	// 拷贝原始组件的所有静态方法
	UpdateIndex.staticMethod = WrappedComponent.staticMethod;

	return UpdateIndex;
}

function getDisplayName (WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default updateIndex;