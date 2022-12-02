<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">菜单</el-menu-item>
      <el-sub-menu index="2">
        <template #title>设置</template>
        <el-menu-item index="2-1">退出登录</el-menu-item>
      </el-sub-menu>

      <div style="text-align: right; margin: 0">
        <el-button type="primary" @click="visible = false">退出</el-button>
      </div>
    </el-menu>
    <div class="h-6" />
  </div>
</template>
  
<script>
export default {
  name: "header",
  data() {},
  computed: {},
  created() {},
  methods: {}
};
</script>
  
  <style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.exit {
  padding: 20px 0px 20px;
}
.shezhi {
  color: green;
}
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
  
