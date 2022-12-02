import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/main";
import store from "./store/main";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as echarts from 'echarts'
import dayjs from 'dayjs'

axios.defaults.baseURL = "/api";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);
const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$echarts = echarts;
app.use(store)
  .use(VueAxios, axios)
  .use(router)
  .use(VueCookies)
  .use(ElementPlus)
  .mount("#app");
