// 基础模块
import { Component } from 'react';
import PropTypes from 'prop-types';

// 第三方模块
import { fromJS, is } from 'immutable';
import _ from 'lodash';


class Validate extends Component {
  static propTypes = {
    model: PropTypes.object,
    rules: PropTypes.object,
    children: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      originalModel: {},
      isValidated: {},
    };
    Validate.validate = this.validate;
  }

  // 初始化设置原始model数据
  componentWillMount() {
    const { model } = this.props;
    this.setState({ originalModel: model });
  }

  // 如果更新了 model 就获取 messages
  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.model), fromJS(nextProps.model))) {
      const messages = this.getValidateMessages(nextProps.model);
      this.setState({ messages });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  // 验证规则项
  validateRuleItem = (rule, value) => {
    if (rule.required && !value) {
      return rule.message;
    }
    
    if (rule.validator) {
      let message;
      const callback = errorMsg => {
        message = errorMsg || rule.message;
      };
      rule.validator(rule, value, callback);
      return message;
    }
  }

  // 获取验证错误信息
  getValidateMessages = (model, isValidate) => {
    const messages = {};
    const { rules } = this.props;
    const { originalModel, isValidated } = this.state;

    for (const key in rules) {
      if (isValidate || (model[key] !== undefined && (model[key] !== originalModel[key] || isValidated[key]))) {
        // 计算 key 更新次数
        isValidated[key] = true;

        // 如果规则项是数组
        if (_.isArray(rules[key])) {
          for (let i = 0; i < rules[key].length; i++) {
            const message = this.validateRuleItem(rules[key][i], model[key]);
            if (message) {
              messages[key] = message;
              break;
            }
          }
          continue;
        }
        
        // 如果规则项是对象
        if (_.isPlainObject(rules[key])) {
          const message = this.validateRuleItem(rules[key], model[key]);
          if (message) messages[key] = message;
          continue;
        }
      }
    }

    this.setState({ countModel: _.cloneDeep(isValidated) });

    return messages;
  }

  // 外部调用验证方法
  validate = (callback) => {
    const { model } = this.props;
    const messages = this.getValidateMessages(model, true);
    const error = Object.keys(messages).length > 0 ? messages : null;
    this.setState({ messages });
    callback(error, model);
  }

  render () {
    const { children } = this.props;
    const { messages } = this.state;

    return children(messages);
  }
}

export default Validate;