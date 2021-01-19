<template>
  <setting />
  <router-view class="router_view" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Setting } from "./components";
  export default defineComponent({
    components: {
      Setting,
    },
  });
</script>

<style lang="scss" scoped>
  .router_view {
    position: relative;
    /* z-index: 999; */
  }
</style>
