<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 13:37:27
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-10 10:43:43
-->
<template>
  <div
    style="
      width: 100%;
      border-radius: 1.04167vw;
      box-shadow: 0px 0.10417vw 0.3125vw 0px rgb(0 0 0 / 21%);
      margin-top: 15px;
      display: flex;
      flex-direction: column;
    "
  >
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div class="btn" style="width: 38%; display: flex; align-items: center">
        <span style="font-size: 20px; font-weight: bold">
          Channel Details PV
        </span>
      </div>
      <div style="display: flex; margin-right: 0.9rem">
        <div style="margin-right: 10px">
          <el-select v-model="type" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-date-picker
          v-model="timeValue"
          name="date"
          label="Date"
          type="daterange"
          range-separator="至"
          start-placeholder="startTime"
          end-placeholder="endTime"
        />
        <div style="margin-left: 25px">
          <el-button type="primary" :icon="Search" @click="queryData" />
        </div>
      </div>
    </div>
    <div>
      <div
        :id="`echarts-comp-${uuid}`"
        :style="{ width: '100%', height: '300px' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { Search } from "@element-plus/icons-vue";
import moment from "moment";
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";
const uuid = ref(uuidv4());

let myChart: any;
const { proxy }: any = getCurrentInstance();
const xData = ref(["home", "home1", "home2"]);
const yData = ref([0, 5, 3]);
const setEchartsData = () => {
  myChart.setOption({
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: xData.value,
      axisLabel: {
        interval: 0,
        textStyle: {
          fontFamily: "BMWTypeNext",
        },
      },
    },
    color: ["#5087ec", "#4e9c8f"],
    series: [
      {
        data: yData.value,
        type: "bar",
        label: { show: true },
      },
    ],
    tooltip: {
      trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
  });
};
const initEcharts = (): void => {
  //设置echart数据
  setEchartsData();
};
//定义时间
const timeValue = ref([moment().subtract(6, "day").valueOf(), new Date()]);
//
const queryData = () => {
  let a = {
    startTime: moment(timeValue.value[0]).format("YYYY-MM-DD"),
    endTime: moment(timeValue.value[1]).format("YYYY-MM-DD"),
  };
  console.log(a);
  myChart.setOption(
    {
      grid: { containLabel: true },
      legend: {
        show: true,
        right: 150,
        top:10
      },
      yAxis: {
        type: "category",
        show: true,
        data: ["home1", "home2", "home3"],
        axisLabel: {
          interval: 0,
          textStyle: {
            fontFamily: "BMWTypeNext",
          },
        },
      },
      xAxis: {
        type: "value",
      },
      color: ["#5087ec", "#4e9c8f"],
      series: [
        {
          name: "Homepage",
          stack: "over",
          type: "bar",
          label: { show: true },
          data: [3, 2, 1],
        },
        {
          name: "more",
          stack: "over",
          type: "bar",
          label: { show: true },
          data: [1, 2, 3],
        },
      ],
      tooltip: {
        trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
    },
    true
  );
};
// 下拉框选中值
const type = ref("");
//下拉框选项值
const options = ref([
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
]);

onMounted(() => {
  let a = document.getElementById(`echarts-comp-${uuid.value}`);
  myChart = proxy.$echarts.init(a);
  initEcharts();
  window.addEventListener("resize", () => {
    console.log(myChart);
    myChart.resize(); //resize 页面大小改变，调整大小
  });
});
</script>

<style lang="scss" scoped>
.btn {
  padding-top: 10px;
  padding-left: 15px;
  height: 41px;
}
</style>
