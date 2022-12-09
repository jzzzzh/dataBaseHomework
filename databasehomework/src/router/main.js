import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
=======

import test from "@/page/test";
>>>>>>> 4ebd70012fbb73e76e01b8d26542eed22a351754
import ChangePassword from "@/page/ChangePassword";
import register from "@/page/register";
import login from "@/page/login";
import home from "@/page/home";
import addCourse from "@/page/addCourse";
<<<<<<< HEAD
import test from "@/page/test";
import teaAddCourse from "@/page/teaAddCourse"
import teaAddNotice from "@/page/teaAddNotice"


=======
import teaAddCourse from "@/page/teaAddCourse";
import courseDetail from "@/page/courseDetail";
>>>>>>> 4ebd70012fbb73e76e01b8d26542eed22a351754
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
<<<<<<< HEAD
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
=======
>>>>>>> 4ebd70012fbb73e76e01b8d26542eed22a351754
    path: "/test",
    name: "test",
    component: test
  },
<<<<<<< HEAD
 {
    path: "/addCourse",
    name: "addCourse",
    component: addCourse
=======
  {
    path: "/addCourse",
    name: "addCourse",
    component: addCourse
  },
  {
    path: "/teaAddCourse",
    name: "teaAddCourse",
    component: teaAddCourse
>>>>>>> 4ebd70012fbb73e76e01b8d26542eed22a351754
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
