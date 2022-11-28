<template>
    <div class="visitorPie">
      <div id="pie" style="width: 90%;height: 450px;"></div>
    </div>
  </template>
  
  <script>
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/component/title';  //主标题
  import 'echarts/lib/component/legend'; //不同线的颜色和名字
  import 'echarts/lib/component/tooltip'; //提示框的组件
  
  export default {
    props: ['visitorList'],
    mounted() {
      this.myCharts = echarts.init(document.getElementById('pie'));
      this.initData();
    },
    methods: {

    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      visitorList(_value) {
        this.initData();
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .visitorPie {
    justify-content: center;
    display: flex;
    margin-top: 20px;
  }
  </style>
  