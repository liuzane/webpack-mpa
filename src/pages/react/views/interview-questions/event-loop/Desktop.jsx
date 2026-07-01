// 基础模块
import React from 'react';

// 布局组件
import { LayContainer, LayBlock } from '@-react/layouts/LayMain';

// 子组件
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';

const Desktop = () => {
  return (
    <LayContainer>
      <LayBlock>
        <Example1 />
      </LayBlock>
      <LayBlock>
        <Example2 />
      </LayBlock>
      <LayBlock>
        <Example3 />
      </LayBlock>
      <LayBlock>
        <Example4 />
      </LayBlock>
    </LayContainer>
  );
};

export default Desktop;