<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 13:37:27
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-10 10:48:21
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
    <div style="display: flex; align-items: center;justify-content: space-between;">
      <div class="btn" style="width: 38%; display: flex; align-items: center">
        <div v-for="(button, index) in buttons" :id="button.text" :key="index">
          <el-button
            :key="button.text"
            :id="button.text + 2"
            type="text"
            text
            size="large"
            @click="onclickbtn(button.text)"
            >{{ button.text }}</el-button
          >
        </div>
      </div>
      <div style="display:flex;margin-right:0.9rem;">
        <el-date-picker
          v-model="timeValue"
          name="date"
          label="Date"
          type="daterange"
          range-separator="至"
          start-placeholder="startTime"
          end-placeholder="endTime"
        />
        <div style="margin-left:25px">
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
import { Search} from "@element-plus/icons-vue";
import moment from "moment";
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";
const uuid = ref(uuidv4());
const buttons = [
  { type: "text", text: "PV" },
  { type: "text", text: "UV" },
  { type: "text", text: "TS" },
  { type: "text", text: "DAU" },
];
// 类型初始化默认PV
const type = ref('PV')
const onclickbtn = (e: any) => {
  // 选中类型
  type.value = e
  buttons.forEach((b) => {
    if (b.text == e) {
      document.getElementById(b.text).style.borderBottom = "1px solid orange";
      document.getElementById(b.text + 2).style.color = "orange";
    } else {
      document.getElementById(b.text).style.borderBottom = "1px solid white";
      document.getElementById(b.text + 2).style.color = "black";
    }
  });
  console.log(e);
};
let myChart: any;
const { proxy }: any = getCurrentInstance();
const xData = ref(["2023-01-01", "2023-01-02", "2023-01-03"])
const yData= ref([0, 5, 3])
const setEchartsData = () => {
  myChart.setOption({
    xAxis: {
      type: "category",
      data: xData.value,
      boundaryGap: false,
      axisLabel: {
        textstyle: {
          fontFamily: "BMWTypeNext",
        },
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yData.value,
        type: "line",
        label: { show: true },
        areaStyle: {
          z: 3,
          coordinateSystem: "cartesian2d",
          legendHoverLink: true,
          clip: true,
        },
      },
    ],
    tooltip: {
      trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    color: ["#4095C2"],
  });
};
const initEcharts = (): void => {
  //设置echart数据
  setEchartsData();
};
//定义时间
 const timeValue = ref([moment().subtract(6, "day").valueOf(), new Date()]);
 // 
 const queryData = () =>{
   xData.value=['a','b','c']
   yData.value=[1,2,3]
   let a = {startTime:moment(timeValue.value[0]).format("YYYY-MM-DD"),endTime:moment(timeValue.value[1]).format("YYYY-MM-DD")}
   console.log(a)
   initEcharts()
 }

onMounted(() => {
  document.getElementById("PV").style.borderBottom = "1px solid orange";
  document.getElementById("PV2").style.color = "orange";
  let a = document.getElementById(`echarts-comp-${uuid.value}`);
  myChart = proxy.$echarts.init(a);
  initEcharts();
   window.addEventListener("resize", () => {
    console.log(myChart)
    myChart.resize(); //resize 页面大小改变，调整大小
  });
});
</script>

<style lang="scss" scoped>
.btn {
  padding-top: 10px;
  padding-left: 15px;
}
</style>
