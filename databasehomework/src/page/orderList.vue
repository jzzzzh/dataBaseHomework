<template>
    <div>
      <elm-header></elm-header>
      <div id="orderList">
        <el-table 
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        :row-key="row => row.index"
        :expand-row-keys="expandRow"
        @expand="handleExpand">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="用户名">
                  {{props.row.user_name}}
                </el-form-item>
                <el-form-item label="店铺名称">
                  {{props.row.restaurant_name}}
                </el-form-item>
                <el-form-item label="收货地址">
                  {{props.row.address}}
                </el-form-item>
                <el-form-item label="店铺 ID">
                  {{props.row.restaurant_id}}
                </el-form-item>
                <el-form-item label="店铺地址">
                  {{props.row.restaurant_address}}
                </el-form-item>        
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
          label="订单 ID"
          prop="id">
          </el-table-column>
          <el-table-column
          label="总价格"
          prop="total_amount">
          </el-table-column>
          <el-table-column
          label="订单状态"
          prop="status_code">
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
        expandRow: []
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
  #orderList {
    padding: 20px;
  
    .table-expand {
      font-size: 0;
  
      label {
         width: 90px;
         color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      } 
    }
  }
  
  </style>
  