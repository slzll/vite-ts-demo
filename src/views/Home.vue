<template>
  <section class="home_page">
    <div class="title">Home Page</div>
    <div>
      <router-link :to="{ name: 'gif' }">GIF</router-link>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    setup() {},
  });
</script>

<style lang="scss">
  @import "../styles/common/common";

  .home_page {
    //在此使用了背景颜色变量
    @include background_color("background_color");
    //再次使用了文字颜色变量
    @include font_color("text-color");

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 1s, color 0.6s;
    .title {
      margin-bottom: 20px;
    }
    .btn {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 40px;
      margin: 0 auto;
    }
  }
</style>
