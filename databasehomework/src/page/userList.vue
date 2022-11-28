<template>
    <div class="fillcontain">
      <elm-header></elm-header>
      <div id='userList'>
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="注册日期"
          width="220">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户姓名	"
          width="220">
        </el-table-column>
        <el-table-column
          prop="address"
          label="注册地址">
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange"
        style="margin-top: 10px;"
      >
      </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import header from '@/components/header';
  
  export default {
    components: {
      'elm-header': header
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        offset: 0,
        limit: 20,
        total: 0,
      };
    },
    created() {
      this.initData();
      this.getUsersCount();
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less" scoped>
  #userList {
    padding: 20px;
  }
  </style>
  
  