<template>
    <div id="footer">
      <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">菜单</el-menu-item>
    <el-sub-menu index="2">
      <template #title>设置</template>
      <el-menu-item index="2-1">个人信息</el-menu-item>
      <el-menu-item index="2-2">更改信息</el-menu-item>
      <el-menu-item index="2-3">退出登录</el-menu-item>
    </el-sub-menu>
    
    <div>
      <el-avatar> user </el-avatar>
    </div>
  </el-menu>
  <div class="h-6" />
    </div>
    
  </template>
  
  <script>
  import {mapState, mapActions} from 'vuex';
  export default {
    name:"header",
    data() {
      return {
        imgUrl
      };
    },
    computed: {
      ...mapState(['adminInfo'])
    },
    created () {
      if (!this.adminInfo.id) {
        this.updateAdminInfo();
      }
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less" scoped>
  #header {
    display: flex;
    background-color: #eff2f7;
    height: 60px;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 37px;
    align-items: center;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
  </style>
  
