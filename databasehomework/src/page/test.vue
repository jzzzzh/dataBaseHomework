// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div id="test">
    <div class="common-layout">
      <el-container>
        <el-header>
          <headerMy> fs</headerMy>
        </el-header>

        <el-container>
          <el-aside>
            <sidebarMY>vfd </sidebarMY>
          </el-aside>

          <el-main>
            <p>djd</p>
          </el-main>
        </el-container>

        <el-footer>
          <footerMY> fsa</footerMY>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
  
  <script>
import headerMy from "@/components/header.vue";
import sidebarMY from "@/components/sidebar.vue";
import mainMY from "@/components/main.vue";
import footerMY from "@/components/footer.vue";
export default {
  name: "test",
  components: {
    headerMy,
    sidebarMY,
    mainMY,
    footerMY
  }
};
</script>
  
  <style lang="less" scoped>
@import "../style/mixin";
</style>
