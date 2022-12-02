import { createRouter, createWebHistory } from "vue-router";

import test from "@/page/test";
import ChangePassword from "@/page/ChangePassword";
import register from "@/page/register";
import login from "@/page/login";
import home from "@/page/home";
import addCourse from "@/page/addCourse";
import teaAddCourse from "@/page/teaAddCourse";
import courseDetail from "@/page/courseDetail";
const routes = [
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: courseDetail
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
