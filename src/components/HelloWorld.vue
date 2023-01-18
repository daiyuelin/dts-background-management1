<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 13:37:27
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-12-28 13:39:09
-->
<template>
  <div>
    <div class="ceshi">ceshi</div>
    <h2>{{ store.getters.token }}</h2>
    <h1>{{ a }}</h1>
    <h3>{{ getdata() }}</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { reactive } from "vue";
import { getToken, setToken } from "@/utils/system";

const formInline = reactive({
  user: "111",
  region: "",
});
const store = useStore();
let a = store.getters.token;
const handleSelectAll = (data: any) => {
  let a = data;
};

const getdata = () => {
  return "";
};
const onSubmit = () => {
  formInline.user = "222";
};
</script>

<style lang="scss" scoped>

</style>
