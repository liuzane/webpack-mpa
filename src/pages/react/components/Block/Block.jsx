// 基础模块
import React, { forwardRef } from 'react';

// 第三方组件
import { SyncOutlined } from '@ant-design/icons';

// 样式
import './Block.less';

const Block = forwardRef(
  ({ scroll, loading = false, className, children, ...restProps }, ref) => {
    const scrollClassName = scroll ? ' scroll' : '';
    const otherClassName = className ? ' ' + className : '';
    return (
      <div
        ref={ref}
        className={'block' + scrollClassName + otherClassName}
        {...restProps}
      >
        {loading && <SyncOutlined className="block-loading" spin />}
        {children}
      </div>
    );
  }
);

export default Block;
