// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div id="test">
        <div class="common-layout">

<el-container>
    <el-header >
        <header>
        </header>
    </el-header>

<el-container>
<el-aside width="200px">
    <sidebar></sidebar>
</el-aside>
<el-main>
</el-main>
</el-container>

<el-footer>
    <footer>
    </footer>
</el-footer>
    </el-container>
  </div>
    </div>
  </template>
  
  <script>
  import header from "@/components/header.vue"
  import sidebar from "@/components/sidebar.vue"
  import main from "@/components/main.vue"
  import footer from "@/components/footer.vue"
  export default {
    name:"test",
    components:{
        header,
        sidebar,
        main,
        footer
    },
    data() {
      return {
        
      };
    },
    mounted() {
    
    },
    watch: {

    },
    methods:{
    }}
  </script>
  
  <style lang="less" scoped>
  @import '../style/mixin';
  </style>
