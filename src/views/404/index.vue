<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2023-01-09 10:30:15
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-09 11:11:18
-->
<template>
  <div class="box">
    <img class="bgimg" src="../../assets/404后台@2x.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
const router = useRouter();
ElMessage({
  showClose: true,
  message: "Error !",
  type: "error",
});
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 200px;
}
.bgimg {
  width: 600px;
  height: 600px;
}
</style>

function ElMessage(arg0: { showClose: boolean; message: string; type: string; }) {
  throw new Error("Function not implemented.");
}
