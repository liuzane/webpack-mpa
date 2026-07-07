<template>
  <div class="lodash-demo">
    <h1>Lodash 工具库示例</h1>

    <!-- debounce 示例 -->
    <section class="lodash-demo__section">
      <h2>_.debounce - 防抖</h2>
      <div class="lodash-demo__demo">
        <p>快速输入，观察延迟输出效果：</p>
        <input
          type="text"
          v-model="searchText"
          placeholder="输入搜索内容..."
          class="lodash-demo__input"
        />
        <p class="lodash-demo__result">输出: {{ debouncedResult }}</p>
      </div>
      <Highlight language="javascript" :code="debounceCode" />
    </section>

    <!-- throttle 示例 -->
    <section class="lodash-demo__section">
      <h2>_.throttle - 节流</h2>
      <div class="lodash-demo__demo">
        <button @click="handleClick" class="lodash-demo__btn">
          点击计数 (节流)
        </button>
        <p class="lodash-demo__result">点击次数: {{ clickCount }}</p>
        <p class="lodash-demo__result">实际触发: {{ triggerCount }}</p>
      </div>
      <Highlight language="javascript" :code="throttleCode" />
    </section>

    <!-- cloneDeep 示例 -->
    <section class="lodash-demo__section">
      <h2>_.cloneDeep - 深拷贝</h2>
      <div class="lodash-demo__demo">
        <p>原始对象: {{ JSON.stringify(originalObj, null, 2) }}</p>
        <button @click="modifyDeepClone" class="lodash-demo__btn">
          修改深拷贝对象
        </button>
        <p class="lodash-demo__result">深拷贝后修改原对象: {{ JSON.stringify(deepCloneObj, null, 2) }}</p>
      </div>
      <Highlight language="javascript" :code="cloneDeepCode" />
    </section>

    <!-- get 示例 -->
    <section class="lodash-demo__section">
      <h2>_.get - 安全取值</h2>
      <div class="lodash-demo__demo">
        <p>复杂对象: {{ JSON.stringify(complexObj, null, 2) }}</p>
        <p class="lodash-demo__result">
          安全取值: _.get(obj, 'a.b.c', '默认值') = {{ safeGetResult }}
        </p>
        <p class="lodash-demo__result">
          不存在路径: _.get(obj, 'x.y.z', '默认值') = {{ safeGetResult2 }}
        </p>
      </div>
      <Highlight language="javascript" :code="getCode" />
    </section>

    <!-- groupBy 示例 -->
    <section class="lodash-demo__section">
      <h2>_.groupBy - 分组</h2>
      <div class="lodash-demo__demo">
        <p>原始数组: {{ JSON.stringify(users, null, 2) }}</p>
        <p class="lodash-demo__result">按城市分组: {{ JSON.stringify(groupedUsers, null, 2) }}</p>
      </div>
      <Highlight language="javascript" :code="groupByCode" />
    </section>

    <!-- deburr 示例 -->
    <section class="lodash-demo__section">
      <h2>_.deburr - 去除重音符号</h2>
      <div class="lodash-demo__demo">
        <p>原始: "café résumé naïve"</p>
        <p class="lodash-demo__result">处理后: {{ deburrResult }}</p>
      </div>
      <Highlight language="javascript" :code="deburrCode" />
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import Highlight from '@-vue/components/Highlight';

export default {
  name: 'lodash-demo',
  components: {
    Highlight,
  },
  data() {
    return {
      searchText: '',
      debouncedResult: '',
      clickCount: 0,
      triggerCount: 0,
      originalObj: { name: 'Alice', age: 25, tags: ['vue', 'react'] },
      deepCloneObj: {},
      complexObj: { a: { b: { c: 'hello' } } },
      safeGetResult: '',
      safeGetResult2: '',
      users: [
        { name: '张三', city: '北京' },
        { name: '李四', city: '上海' },
        { name: '王五', city: '北京' },
        { name: '赵六', city: '广州' },
      ],
      groupedUsers: {},
      deburrResult: '',
      // code 片段
      debounceCode: `// 防抖：延迟执行，频繁触发时重置计时
const debouncedSearch = _.debounce((text) => {
  this.debouncedResult = text;
}, 300);`,
      throttleCode: `// 节流：每1秒最多执行一次
const throttledClick = _.throttle(() => {
  this.triggerCount++;
}, 1000);`,
      cloneDeepCode: `// 深拷贝：完全独立副本
const cloned = _.cloneDeep(this.originalObj);
cloned.name = 'Bob';
cloned.tags.push('angular');`,
      getCode: `// 安全获取深层属性，不存在的路径返回默认值
_.get(obj, 'a.b.c', '默认值'); // 'hello'
_.get(obj, 'x.y.z', '默认值'); // '默认值'`,
      groupByCode: `// 按城市分组
_.groupBy(this.users, 'city');`,
      deburrCode: `// 去除重音符号
_.deburr('café résumé naïve'); // 'cafe resume naive'`,
    };
  },
  mounted() {
    this.deepCloneObj = _.cloneDeep(this.originalObj);
    this.safeGetResult = _.get(this.complexObj, 'a.b.c', '默认值');
    this.safeGetResult2 = _.get(this.complexObj, 'x.y.z', '默认值');
    this.groupedUsers = _.groupBy(this.users, 'city');
    this.deburrResult = _.deburr('café résumé naïve');

    // 定义防抖和节流函数（作为实例属性）
    this.debouncedSearch = _.debounce((text) => {
      this.debouncedResult = text;
    }, 300);

    this.throttledClick = _.throttle(() => {
      this.triggerCount++;
    }, 1000);
  },
  watch: {
    searchText(val) {
      this.debouncedSearch(val);
    },
  },
  methods: {
    handleClick() {
      this.clickCount++;
      this.throttledClick();
    },
    modifyDeepClone() {
      const cloned = _.cloneDeep(this.originalObj);
      cloned.name = 'Bob';
      cloned.tags.push('angular');
      this.deepCloneObj = cloned;
    },
  },
};
</script>

<style>
.lodash-demo {
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.lodash-demo h1 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 40px;
  text-align: center;
}

.lodash-demo__section {
  background: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.lodash-demo__section h2 {
  font-size: 20px;
  color: #606266;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f56c6c;
}

.lodash-demo__demo {
  margin-bottom: 20px;
  padding: 20px;
  background: #fafafa;
  border-radius: 6px;
}

.lodash-demo__demo p {
  margin-bottom: 12px;
  color: #606266;
}

.lodash-demo__input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.lodash-demo__input:focus {
  border-color: #667eea;
}

.lodash-demo__btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.lodash-demo__btn:hover {
  transform: scale(1.05);
}

.lodash-demo__result {
  padding: 10px 15px;
  background: #fff5f5;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>