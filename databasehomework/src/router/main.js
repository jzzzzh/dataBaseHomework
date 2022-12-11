import { createRouter, createWebHistory } from "vue-router";
import test from "@/page/test";
import ChangePassword from "@/page/ChangePassword";
import register from "@/page/register";
import login from "@/page/login";
import home from "@/page/home";
import addCourse from "@/page/addCourse";
import teaAddCourse from "@/page/teaAddCourse";
import teaAddNotice from "@/page/teaAddNotice";
import myCourse from "@/page/myCourse";
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
  },
  {
    path: "/teaAddCourse",
    name: "teaAddCourse",
    component: teaAddCourse
  },
  {
    path: "/myCourse",
    name: "myCourse",
    component: myCourse
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
