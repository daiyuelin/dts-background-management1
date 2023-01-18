<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2023-01-17 14:25:08
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-18 08:45:22
-->
<template>
  <div>
    1111122233333444
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import orange from "../../assets/image/orange.png";
import { v4 as uuidv4 } from "uuid";
import {
  Delete,
  View,
  EditPen,
  Hide,
  Search,
  Plus,
} from "@element-plus/icons-vue";
import { ref, reactive, nextTick, onMounted, getCurrentInstance } from "vue";
import moment from "moment";
const tableData = ref([]);
onMounted(() => {
  tableData.value = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ];
});
const { proxy }: any = getCurrentInstance();
</script>
<style lang="scss" scoped>
.aaa {
  height: 200px;
  width: 200px;
  background: #00ff00 url("../../assets/image/orange.png") no-repeat center;
}
</style>
