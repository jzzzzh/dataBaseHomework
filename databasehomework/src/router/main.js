import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/page/HelloWorld";
// import myTest from "@/page/test";
const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld
  },
  {
    path: "/test",
    name: "test",
    component: HelloWorld
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
