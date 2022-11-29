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


axios.defaults.baseURL = "/api";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(store)
  .use(VueAxios, axios)
  .use(router)
  .use(VueCookies)
  .use(ElementPlus)
  .mount("#app");
