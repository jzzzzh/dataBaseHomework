<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <!-- <h5 class="mb-2">Default colors</h5> -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>成绩查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">必修成绩查询</el-menu-item>
              <el-menu-item index="1-2">选修成绩查询</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu> -->

          <!-- <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item> -->

        <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>综合查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">个人信息</el-menu-item>
              <el-menu-item index="2-2">课程信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <span>修改密码</span>
          </el-menu-item>
  

          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>课程评价</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12"> </el-col>
    </el-row>
  </div>
</template>
  
  <script>
export default {
  name: "sidebar",
  data() {
    return {};
  },
  computed: {},
  methods: {}
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
  
