import { createRouter, createWebHistory } from "vue-router";
import ChangePassword from "@/page/ChangePassword";
import register from "@/page/register";
import login from "@/page/login";
import home from "@/page/home";
import addCourse from "@/page/addCourse";
import test from "@/page/test";
import teaAddCourse from "@/page/teaAddCourse"
import teaAddNotice from "@/page/teaAddNotice"


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
    path: "/teaAddCourse",
    name: "teaAddCourse",
    component: teaAddCourse
  },
  {
    path: "/teaAddNotice",
    name: "teaAddNotice",
    component: teaAddNotice
  },
  {
    path: "/test",
    name: "test",
    component: test
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
