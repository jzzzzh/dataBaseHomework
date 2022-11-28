<template>
  <div id="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(meta,index) in $route.meta" v-bind:key="index">{{meta}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown menu-align='start'  @command="handleMenu">
      <span class="el-dropdown-link">
        <img :src="imgUrl + adminInfo.avatar" width="36px" height="36px">
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="homepage">首页</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>

<style scoped>

</style>
