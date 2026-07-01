<template>
  <span :class="['iconfont', 'icon-' + type]"/>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    type: {
      type: String,
      required: true,
    },
  }
}
</script>

<style>
  @import '~@/iconfont/iconfont.css';
</style>
