import { createRouter, createWebHistory } from "vue-router";
import addfood from "@/page/addfood";
import addshop from "@/page/addshop";
import adminList from "@/page/adminList";
import adminSet from "@/page/adminSet";
import edit from "@/page/edit";
import foodList from "@/page/foodList";
import home from "@/page/home";
import info from "@/page/info";
import login from "@/page/login";
import manage from "@/page/manage";
import orderList from "@/page/orderList";
import shopList from "@/page/shopList";
import userList from "@/page/userList";
import visitor from "@/page/visitor";
import ChangePassword from "@/page/ChangePassword";
const routes = [
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: "/addfood",
    name: "addfood",
    component: addfood
  },
  {
    path: "/addshop",
    name: "addshop",
    component: addshop
  },
  {
    path: "/adminList",
    name: "adminList",
    component: adminList
  },
  {
    path: "/adminSet",
    name: "adminSet",
    component: adminSet
  },
  {
    path: "/edit",
    name: "edit",
    component: edit
  },
  {
    path: "/foodList",
    name: "foodList",
    component: foodList
  },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/info",
    name: "info",
    component: info
  },
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/manage",
    name: "manage",
    component: manage
  },
  {
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
    path: "/visitor",
    name: "visitor",
    component: visitor
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
