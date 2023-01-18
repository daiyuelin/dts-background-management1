<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-14 09:19:07
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-12-28 10:40:28
-->
<template>
  <el-button @click="clickLogin">ceshi</el-button>
  <div class="ceshi">ceshi</div>
  <div style="margin-top:50px">
    <el-radio-group v-model="radio1" class="select-sg">
      <el-radio-button label="Stork"></el-radio-button>
      <el-radio-button label="GR"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    let radio1 = ref("Stork");
    const router = useRouter();
     const  clickLogin = async() => {
      router.push({ path: "/hello", query: { userId: "123" } });
    let a = await import('../utils/system')
    };
    const state = reactive({});
    return {
      ...toRefs(state),
      clickLogin,
      radio1,
    };
  },
};
</script>


<style lang="scss" scoped>
.ceshi {
  width: 192px;
  background: red;
  font-size: 20px;
}
</style>
