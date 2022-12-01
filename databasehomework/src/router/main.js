import { createRouter, createWebHistory } from "vue-router";
import ChangePassword from "@/page/ChangePassword";
import register from "@/page/register";
import login from "@/page/login";
import home from "@/page/home";
import addCourse from "@/page/addCourse";
const routes = [
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/addCourse",
    name: "addCourse",
    component: addCourse
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
