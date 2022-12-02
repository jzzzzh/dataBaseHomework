import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD

import home from "@/page/home";
import login from "@/page/login";
import test from "@/page/test";

=======
>>>>>>> ebeab57f77491ba861fead621501eb957adc960d
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
<<<<<<< HEAD
    path: "/orderList",
    name: "orderList",
    component: orderList
  },
  {
    path: "/shopList",
    name: "shopList",
    component: shopList
  },
  {
    path: "/userList",
    name: "userList",
    component: userList
  },
  {
    path: "/test",
    name: "test",
    component: test
  },
  {
    path: "/visitor",
    name: "visitor",
    component: visitor
=======
    path: "/addCourse",
    name: "addCourse",
    component: addCourse
>>>>>>> ebeab57f77491ba861fead621501eb957adc960d
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
