<template>
  <el-descriptions title="欢迎光临">
    <el-descriptions-item label="联系方式">1627299</el-descriptions-item>
    <el-descriptions-item label="我们的地址">江安</el-descriptions-item>
  </el-descriptions>
</template>
  
  <script>
import { mapState, mapActions } from "vuex";
export default {
  name: "header",
  data() {
    return {};
  },
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
  
