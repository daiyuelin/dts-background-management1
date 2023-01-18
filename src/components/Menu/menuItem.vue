<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-12-27 14:16:59
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:52:09
-->
<script lang="ts" setup>
const props = defineProps<{
  readonly data: any;
}>();
</script>

<template>
  <template v-for="item in props.data" :key="item.path">
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 0"
      class="m-normal"
    >
      <template #title>
        <svg-icon
          :iconName="item.icon"
          :iconClass="item.icon"
          style="width: 1em; height: 1em;margin-right:5px;"
        />
        <span>{{ item.name }}</span>
      </template>
      <menu-item class="el-menu-item" :data="item.children" />
    </el-sub-menu>
    <el-menu-item class="el-menu-item" :index="item.path" v-else>
      <svg-icon
          :iconName="item.icon"
          :iconClass="item.icon"
          style="width: 1em; height: 1em;margin-right:5px;"
        />
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>
<style scoped>
.el-menu-item {
  /* padding: 0 8px !important; */
  user-select: none;
}
.is-active {
  border-radius: 2px;
  background-color: #63bcfa !important;
  color: #ffffff !important;
}
</style>
