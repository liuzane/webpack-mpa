<template>
  <div class="setup">
    <div class="setup__row">
      <span class="setup__label">value:</span>
      <ant-Button @click="onUpdateValue(value + 1)">+</ant-Button>
      <ant-input :value="value" class="setup__input" />
      <ant-Button @click="onUpdateValue(value - 1)">-</ant-Button>
    </div>
    <div class="setup__row">
      <span class="setup__label">location.x:</span>
      <ant-Button @click="onUpdateLocation('x', location.x + 1)">+</ant-Button>
      <ant-input :value="location.x" class="setup__input" />
      <ant-Button @click="onUpdateLocation('x', location.x - 1)">-</ant-Button>
    </div>
    <div class="setup__row">
      <span class="setup__label">location.y:</span>
      <ant-Button @click="onUpdateLocation('y', location.y + 1)">+</ant-Button>
      <ant-input :value="location.y" class="setup__input" />
      <ant-Button @click="onUpdateLocation('y', location.y - 1)">-</ant-Button>
    </div>
  </div>
</template>

<script>
  // 基础模块
  import { ref, reactive, onMounted } from 'vue';

  // 混入
  // import  from '@/mixins/';

  // UI组件
  import { Button, Input } from 'ant-design-vue';

  // 组件
  // import  from '';

  export default {
    name: 'setup',

    components: {
      AntButton: Button,
      AntInput: Input,
    },

    setup(props, context) {
      // 透传 Attributes（非响应式的对象，等价于 $attrs）
      console.log('context.attrs', context.attrs)

      // 插槽（非响应式的对象，等价于 $slots）
      console.log('context.slots', context.slots)

      // 触发事件（函数，等价于 $emit）
      console.log('context.emit', context.emit)

      // 暴露公共属性（函数）
      console.log('context.expose', context.expose)

      const counter = ref(0);
      const location = reactive({
        x: 90,
        y: 135
      });

      onMounted(() => {
        counter.value = 3;
      });

      return {
        value: counter,
        location,
      };
    },

    methods: {
      onUpdateValue(value) {
        this.value = value;
      },

      onUpdateLocation(key, value) {
        this.location[key] = value;
      }
    },
  };
</script>

<style>
  .setup__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    padding: 8px;
  }

  .setup__label {
    width: 150px;
  }

  .setup__input {
    margin: 0 8px;
  }
</style>