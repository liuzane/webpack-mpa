// 基础模块
import React from 'react';

// 布局组件
import { LayContainer, LayBlock } from '@-react/layouts/LayMain';

// 子组件
import Decorators from './Decorators';
import Generics from './Generics';

const Desktop: React.FC = () => {
  return (
    <LayContainer>
      <LayBlock>
        <Decorators />
      </LayBlock>
      <LayBlock>
        <Generics />
      </LayBlock>
    </LayContainer>
  );
};

export default Desktop;