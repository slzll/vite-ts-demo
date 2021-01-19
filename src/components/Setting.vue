<template>
  <setting-two ref="icon" class="setting-icon" theme="outline" size="24" fill="#fff" @click="toggleSetting" />
  <section class="app-setting" v-show="showSetting">
    <transition name="fade">
      <div v-show="showMask" class="setting-mask" @click="toggleSetting"></div>
    </transition>
    <div class="setting-wrapper" ref="settingWrapper">
      <div class="setting-box">
        <div>模式选择</div>
        <div @click="changeTheme" class="theme-box">
          <div v-if="dark" class="theme-item light-theme">
            <sun theme="outline" size="14" fill="#333" />
            <span>日间模式</span>
          </div>
          <div v-else class="theme-item dark-theme">
            <moon theme="outline" size="14" fill="#fff" />
            <span>暗黑模式</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { DefineComponent, defineComponent, ref } from "vue";
  import { onBeforeRouteLeave } from "vue-router";
  import { SettingTwo, Sun, Moon } from "@icon-park/vue-next";
  import { DomUtil } from "../utils/utils";

  export default defineComponent({
    components: { SettingTwo, Sun, Moon },
    setup() {
      const dark = ref(false);
      const changeTheme = () => {
        dark.value = !dark.value;
        window.document.documentElement.setAttribute("data-theme", dark.value ? "dark" : "light");
      };
      window.document.documentElement.setAttribute("data-theme", "light");

      const showSetting = ref(false);
      const showMask = ref(false);
      const settingWrapper = ref<HTMLElement | null>(null);
      const icon = ref<DefineComponent | null>(null);
      const listenAnimate = () => {
        if (settingWrapper.value) {
          const $el = new DomUtil(settingWrapper.value);
          const $icon = new DomUtil(icon.value?.$el);
          $el.off("animationend", listenAnimate).removeClass("slide-right");
          $icon.removeClass("slide-right");
          showSetting.value = false;
        }
      };
      const toggleSetting = () => {
        showMask.value = !showMask.value;
        const settingWrapperElement = settingWrapper.value;
        if (settingWrapperElement) {
          const $el = new DomUtil(settingWrapperElement);
          const $icon = new DomUtil(icon.value?.$el);
          if (showMask.value) {
            showSetting.value = true;
            $el.addClass("slide-left");
            $icon.addClass("slide-left");
          } else {
            $icon.removeClass("slide-left").addClass("slide-right");
            $el.removeClass("slide-left").addClass("slide-right").on("animationend", listenAnimate);
          }
        }
      };

      onBeforeRouteLeave((to, from) => {
        if (settingWrapper.value) {
          const $el = new DomUtil(settingWrapper.value);
          $el.off("animationend", listenAnimate);
        }
      });
      return { dark, changeTheme, showSetting, showMask, settingWrapper, icon, toggleSetting };
    },
  });
</script>

<style lang="scss" scoped>
  @import "../styles/mixin";
  @import "../styles/common/common";
  $setting-width: 300px;

  .setting-icon {
    position: absolute;
    top: 1rem;
    right: $setting-width;
    @include square(48px);
    @include borderRadius(4px 0 0 4px);
    background: $brand-primary;
    @include flex(center, center);
    z-index: 1001;
    cursor: pointer;
    transform: translateX(300px);
  }

  .app-setting {
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;

    .setting-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.35);
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.25s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .setting-wrapper {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      z-index: 1000;
      transform: translateX(300px);
    }

    .setting-box {
      position: relative;
      z-index: 1001;
      @include wh($setting-width, 100%);
      @include background_color("background_color");
      @include font_color("text-color");
      padding: 20px;

      .theme-box {
        margin-top: 15px;
        .theme-item {
          @include flex(center, center, null, inline-flex);
          padding: 5px 10px;
          @include borderRadius(30px);
          @include background_color("text-color");
          @include font_color("background_color");
          font-size: 14px;
          cursor: pointer;

          .i-icon {
            margin-right: 3px;
          }
        }
      }
    }
  }
  .slide-left {
    animation: slideLeft 0.25s forwards;
  }
  .slide-right {
    animation: slideRight 0.25s forwards;
  }

  @keyframes slideLeft {
    0% {
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slideRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300px);
    }
  }
</style>
