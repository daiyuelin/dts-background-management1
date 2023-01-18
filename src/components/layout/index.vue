<!--
 * @Description:
 * @Autor: Dai YueLin
 * @Date: 2022-12-27 13:51:15
 * @LastEditors: Dai YueLin
<<<<<<< HEAD
 * @LastEditTime: 2023-01-09 18:33:01
=======
 * @LastEditTime: 2023-01-09 13:44:59z
>>>>>>> 3bc2ecedcbb837948c291aa747a91c7831cf191c
-->
<script setup lang="ts">
import Menu from "@/components/Menu/index.vue";
import Header from "@/components/Header/index.vue";
// 统一设置 是否使用服务器菜单
import router from "@/router/router";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// const routeData = reactive(
//   router.options.routes.filter((i:any) => !i.hiddenInMenu)
// );
const routeData = ref([
  {
    path: "/Dashboard",
    name: "Dashboard",
    // icon: "kpiAdd",
    children: [
      {
        path: "/Dashboard/detail",
        name: "Dashboard",
      },
    ],
  },
  {
    path: "/ContentManagement",
    name: "Content Management",
    children: [
      {
        path: "/ContentManagement/TrainingLibrary",
        name: "TrainingLibrary"
      },
      {
        path: "/ContentManagement/News",
        name: "News"
      },
      {
        path: "/ContentManagement/NewsLetter",
        name: "NewsLetter"
      },
    ],
  },
  {
    path: "/SystemManagement",
    name: "SystemManagement",
    children: [
      {
        path: "/SystemManagement/UserManagement",
        name: "UserManagement",
      },
      {
        path: "/SystemManagement/RoleList",
        name: "RoleList",
      },
    ],
  },
]);
</script>

<template>
  <el-container class="container" direction="vertical">
    <Header class="header" />
    <el-container class="sec_container">
      <Menu class="menu" :menuHeaderData="routeData" />
      <el-main class="main_container">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>

</style>
