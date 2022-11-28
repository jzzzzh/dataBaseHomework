<template>
    <div class="tendency">
      <div id="tendency" style="width:90%;height:450px;"></div>
    </div>
  </template>
  
  <script>
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/title';  //主标题
  import 'echarts/lib/component/legend'; //不同线的颜色和名字
  import 'echarts/lib/component/toolbox';  //工具栏 有导出图片 数据视图 动态类型转换 数据区域缩放 重置 5个工具
  import 'echarts/lib/component/markPoint';  //
  import 'echarts/lib/component/tooltip'; //提示框的组件
  export default {
    props: ['sevenDay', 'sevenDate'],
    mounted () {
      this.myCharts = echarts.init(document.getElementById('tendency'));
      this.ininData();
    },
    methods: {

    },
    watch: {
      sevenDay: function(value) {
        this.ininData();
      },
      sevenDate: function(value) {
        this.ininData();
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .tendency {
    display: flex;
    justify-content: center;
  }
  </style>
  
  