<template>
    <div>
      <elm-header></elm-header>
      <div id="adminList">
        <el-table 
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        >
          <el-table-column
          label="姓名"
          prop="user_name">
          </el-table-column>
          <el-table-column
          label="注册日期"
          prop="create_time">
          </el-table-column>
          <el-table-column
          label="地址"
          prop="city">
          </el-table-column>
           <el-table-column
          label="权限"
          prop="admin">
          </el-table-column>
        </el-table>
        <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange"
        style="margin-top: 10px;">
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import header from '@/components/header';
  export default {
    data() {
      return {
        tableData: [],
        offset: 0,
        limit: 20,
        total: 0,
      };
    },
    components: {
      'elm-header': header
    },
    created() {
      this.initData();
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less" scoped>
  #adminList {
    padding: 20px;
  }
  </style>
  