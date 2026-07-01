<template>
  <ul class="todo">
    <li 
      v-for="(item, index) in floor" 
      :key="index"
      className="todo-list"
      :style="{ color: item.color }"
    >{{ item.index }}</li>
  </ul>
</template>

<script>
export default {
  name: 'floors',

  data() {
    return {
      floor: Array.apply(null, { length: 20 }).map((item, index) => ({
        index,
        color: `rgba(${ this.random(255) }, ${ this.random(255) }, ${ this.random(255) }, 1)`,
      })),
    };
  },

  methods: {
    random(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>

<style>
.todo {
  color: #000;
  font-size: 24px;
  line-height: 100px;
	text-align: center;
}

.todo-list {
  height: 100px;
}
</style>