<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-12-27 14:16:59
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-10 10:43:36
-->

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./menuItem.vue";
const props = withDefaults(
  defineProps<{
    readonly menuHeaderData: any;
    readonly horizontal?: string;
  }>(),
  {
    horizontal: "horizontal",
  }
);

const route = useRoute();

const handleOpen = (key: string | number, keyPath: Array<string>) => {
};
const handleClose = (key: string | number, keyPath: Array<string>) => {
};

const currentPath = computed(() => {
  const { path } = route;
  return path;
});
</script>
<template>
  <el-menu
    background-color="#1F2A42"
    text-color="#FFFFFF"
    active-text-color="#333333"
    :horizontal="horizontal"
    class="m-normal menu-box"
    @open="handleOpen"
    @close="handleClose"
    router
    :default-active="currentPath"
  >
    <MenuItem :data="props.menuHeaderData" />
  </el-menu>
</template>
<style scoped>
.menu-box {
  /* padding: 0 1rem; */
}
</style>
