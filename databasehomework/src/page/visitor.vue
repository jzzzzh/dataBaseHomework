<template>
    <div>
      <elm-header></elm-header>
      <pie :visitorList="userList"></pie>
    </div>
  </template>
  
  <script>
  import header from '@/components/header';
  import visitorPie from '@/components/visitorPie';
  export default {
    components: {
      'elm-header': header,
      pie: visitorPie
    },
    data() {
      return {
        userList: []
      };
    },
    activated() {
      this.initData();
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less" scoped>
  
  </style>
  