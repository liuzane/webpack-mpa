<template>
  <div class="antd-ui">
    <h1>Ant Design Vue 组件示例</h1>

    <!-- Button 示例 -->
    <section class="antd-ui__section">
      <h2>Button 按钮</h2>
      <div class="antd-ui__demo">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button danger>Danger Button</Button>
        <Button type="link">Link Button</Button>
      </div>
      <Highlight language="html" :code="buttonCode" />
    </section>

    <!-- Input 示例 -->
    <section class="antd-ui__section">
      <h2>Input 输入框</h2>
      <div class="antd-ui__demo">
        <Input placeholder="Basic input" style="width: 200px;" />
        <InputPassword placeholder="Password input" style="width: 200px;" />
        <InputSearch placeholder="Search input" style="width: 200px;" />
      </div>
      <Highlight language="html" :code="inputCode" />
    </section>

    <!-- Card 示例 -->
    <section class="antd-ui__section">
      <h2>Card 卡片</h2>
      <div class="antd-ui__demo">
        <Card title="Default Card" style="width: 300px;">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
      <Highlight language="html" :code="cardCode" />
    </section>

    <!-- Tag 示例 -->
    <section class="antd-ui__section">
      <h2>Tag 标签</h2>
      <div class="antd-ui__demo">
        <Tag>Tag 1</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="error">Error</Tag>
        <Tag color="processing">Processing</Tag>
      </div>
      <Highlight language="html" :code="tagCode" />
    </section>

    <!-- Progress 示例 -->
    <section class="antd-ui__section">
      <h2>Progress 进度条</h2>
      <div class="antd-ui__demo">
        <Progress :percent="60" />
        <Progress :percent="80" status="active" />
        <Progress :percent="100" status="success" />
        <Progress :percent="50" status="exception" />
      </div>
      <Highlight language="html" :code="progressCode" />
    </section>
  </div>
</template>

<script>
import { Button, Input, Card, Tag, Progress } from 'ant-design-vue';
import InputPassword from 'ant-design-vue/lib/input/Password';
import InputSearch from 'ant-design-vue/lib/input/Search';
import Highlight from '@-vue/components/Highlight';

const buttonCode = `<template>
  <div>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="link">Link Button</Button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';

export default {
  components: { Button },
};
<\/script>`;

const inputCode = `<template>
  <div>
    <Input placeholder="Basic input" />
    <InputPassword placeholder="Password input" />
    <InputSearch placeholder="Search input" />
  </div>
</template>

<script>
import { Input } from 'ant-design-vue';
import InputPassword from 'ant-design-vue/lib/input/Password';
import InputSearch from 'ant-design-vue/lib/input/Search';

export default {
  components: { Input, InputPassword, InputSearch },  
};
<\/script>`;


const cardCode = `<template>
  <Card title="Default Card" style="width: 300px;">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</template>

<script>
import { Card } from 'ant-design-vue';

export default {
  components: { Card },
};
<\/script>`;

const tagCode = `<template>
  <div>
    <Tag>Tag 1</Tag>
    <Tag color="success">Success</Tag>
    <Tag color="warning">Warning</Tag>
    <Tag color="error">Error</Tag>
    <Tag color="processing">Processing</Tag>
  </div>
</template>

<script>
import { Tag } from 'ant-design-vue';

export default {
  components: { Tag },
};
<\/script>`;

const progressCode = `<template>
  <div>
    <Progress :percent="60" />
    <Progress :percent="80" status="active" />
    <Progress :percent="100" status="success" />
    <Progress :percent="50" status="exception" />
  </div>
</template>

<script>
import { Progress } from 'ant-design-vue';

export default {
  components: { Progress },
};
<\/script>`;

export default {
  name: 'antd-ui',
  components: {
    Button,
    Input,
    InputSearch,
    InputPassword,
    Card,
    Tag,
    Progress,
    Highlight,
  },
  data() {
    return {
      buttonCode,
      inputCode,
      cardCode,
      tagCode,
      progressCode,
    };
  },
};
</script>

<style>
.antd-ui {
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.antd-ui h1 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 40px;
  text-align: center;
}

.antd-ui__section {
  background: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.antd-ui__section h2 {
  font-size: 20px;
  color: #606266;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.antd-ui__demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 20px;
  background: #fafafa;
  border-radius: 6px;
}
</style>