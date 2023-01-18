<!--
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 13:37:27
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-10 10:25:36
-->
<template>
  <div>
    <div
      style="
        width: 100%;
        height: 5.20833vw;
        border-radius: 1.04167vw;
        box-shadow: 0px 0.10417vw 0.3125vw 0px rgb(0 0 0 / 21%);
        display: flex;
        justify-content: space-around;
      "
    >
      <div style="display: flex; align-items: center">
        <img style="width: 0.3646rem; height: 0.3646rem" :src="blue" />
        <div
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <div
            style="
              color: rgb(38, 95, 201);
              font-size: 36px;
              text-align: left;
              font-family: BMWTypeNext;
              padding-left: 15px;
            "
          >
            0
          </div>
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-bottom: 10px;
            "
          >
            <div
              style="
                font-size: 20px;
                text-align: left;
                font-family: BMWTypeNext;
              "
            >
              PV
            </div>
            <div
              style="
                color: rgb(16, 16, 16);
                font-size: 14px;
                text-align: left;
                font-family: BMWTypeNext;
                vertical-align: middle;
                padding-top: 6px;
                margin-left: 5px;
              "
            >
              浏览量
            </div>
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <img style="width: 0.3646rem; height: 0.3646rem" :src="orange" />
        <div
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <div
            style="
              color: rgb(236, 145, 93);
              font-size: 36px;
              text-align: left;
              font-family: BMWTypeNext;
              padding-left: 15px;
            "
          >
            0
          </div>
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-bottom: 10px;
            "
          >
            <div
              style="
                font-size: 20px;
                text-align: left;
                font-family: BMWTypeNext;
              "
            >
              PV
            </div>
            <div
              style="
                color: rgb(16, 16, 16);
                font-size: 14px;
                text-align: left;
                font-family: BMWTypeNext;
                vertical-align: middle;
                padding-top: 6px;
                margin-left: 5px;
              "
            >
              浏览量
            </div>
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <img style="width: 0.3646rem; height: 0.3646rem" :src="purple" />
        <div
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <div
            style="
              color: rgb(115, 93, 236);
              font-size: 36px;
              text-align: left;
              font-family: BMWTypeNext;
              padding-left: 15px;
            "
          >
            0
          </div>
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-bottom: 10px;
            "
          >
            <div
              style="
                font-size: 20px;
                text-align: left;
                font-family: BMWTypeNext;
              "
            >
              PV
            </div>
            <div
              style="
                color: rgb(16, 16, 16);
                font-size: 14px;
                text-align: left;
                font-family: BMWTypeNext;
                vertical-align: middle;
                padding-top: 6px;
                margin-left: 5px;
              "
            >
              浏览量
            </div>
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <img style="width: 0.3646rem; height: 0.3646rem" :src="pink" />
        <div
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <div
            style="
              color: #ec5d7d;
              font-size: 36px;
              text-align: left;
              font-family: BMWTypeNext;
              padding-left: 15px;
            "
          >
            0
          </div>
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-bottom: 10px;
            "
          >
            <div
              style="
                font-size: 20px;
                text-align: left;
                font-family: BMWTypeNext;
              "
            >
              PV
            </div>
            <div
              style="
                color: rgb(16, 16, 16);
                font-size: 14px;
                text-align: left;
                font-family: BMWTypeNext;
                vertical-align: middle;
                padding-top: 6px;
                margin-left: 5px;
              "
            >
              浏览量
            </div>
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </div>
    </div>
    <LineCharts />
    <ChannelBar />
    <ChannelDetailsBar />
    <DepartmentBar />
  </div>
</template>

<script setup lang="ts">
import orange from "../../assets/image/orange.png";
import blue from "../../assets/image/blue.png";
import purple from "../../assets/image/purple.png";
import pink from "../../assets/image/pink.png";
import LineCharts from "./LineCharts.vue"
import ChannelBar from "./ChannelBar.vue"
import ChannelDetailsBar from "./ChannelDetailsBar.vue"
import DepartmentBar from "./DepartmentBar.vue"




import { useStore } from "vuex";
import { reactive } from "vue";
</script>

<style lang="scss" scoped>
</style>
