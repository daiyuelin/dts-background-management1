<!--
 * @Description: 页面hearder栏
 * @Author: YushengSenior
 * @Date: 2021-10-29 16:45:04
 * @LastEditTime: 2022-12-27 14:22:11
 * @LastEditors: Dai YueLin
-->
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const handleGoPage = () => {
  router.push('');
};
</script>
<template>
  <el-header class="header">
    <div class="head">
      <div class="g-head">
        <div class="m-logo-box" @click="handleGoPage">
          <span class="logoText" style="margin-left:20px">DTS-online Background management</span>
        </div>
      </div>
      <div>
        <!-- <Notice /> -->
      </div>
    </div>
  </el-header>
</template>
<style scoped>
.logoText {
  color: #220051 !important;
  font-family: BMWTypeNext;
}
.head {
  height: 64px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}

.g-head {
  width: 100%;
}

.rightOperationArea {
}

.header {
}

.m-width {
  width: 17rem;
}

.m-logo-box {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  user-select: none;
}

.m-logo {
  width: 9.5rem;
  height: 2.4375rem;
  line-height: 2.4375rem;
}

.m-normal {
  width: 100%;
}

.m-menu {
  overflow-y: scroll;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.m-menu::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.b-text {
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
}
</style>
