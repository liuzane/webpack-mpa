<template>
  <div class="not-found">
    <img src="@/images/404.png" alt="" class="not-found__img">
    <p class="not-found__text">哎呀迷路了...</p>
    <div class="not-found__reason">
      <p>可能的原因：</p>
      <ul class="not-found__reason-list">
        <li>原来的页面不存在了</li>
        <li>您的权限不够</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </div>
    <Button @click="back">返回上一页</Button>
  </div>
</template>

<script>
  // UI组件
  import { Button } from 'ant-design-vue';

  export default {
    name: 'not-found',

    components: {
      Button,
    },

    methods: {
      back() {
        this.$router.go(-1);
      },
    },
  };
</script>

<style>
  .not-found {
    text-align: center;
  }

  .not-found__img {
    display: block;
    height: 155px;
    margin: 40px auto;
  }

  .not-found__text {
    line-height: 22px;
    font-size: 17px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;
    text-align: center;
    color: #262b31;
  }

  .not-found__reason {
    color: #9ca4ac;
    font-size: 13px;
    line-height: 13px;
    text-align: left;
    width: 210px;
    margin: 13px auto 30px;
  }

  .not-found__reason-list {
    list-style-type: disc;
  }

  .not-found__reason-list > li {
    margin-top: 10px;
    margin-left: 36px;
  }
</style>