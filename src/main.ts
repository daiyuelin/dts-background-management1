/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 13:37:27
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-09 18:13:15
 */
import { createApp } from 'vue'
//import ElementPlus from 'element-plus'
import router from './router/router'
import './assets/main.css'
import 'element-plus/dist/index.css'
import "lib-flexible-computer";
import store from './store'
//import './permission'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import "virtual:svg-icons-register";
import * as echarts from 'echarts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$echarts = echarts;

app.use(router);
app.use(store);
//app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.component('svg-icon', SvgIcon);
app.mount('#app')
