<template>
    <div>
      <elm-header></elm-header>
      <div id="shopList">
        <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
         <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
         <el-table-column
        label="店铺名称"
        prop="name">
       </el-table-column>
       <el-table-column
        label="店铺地址"
        prop="address">
       </el-table-column>
       <el-table-column
        label="店铺介绍"
        prop="description">
       </el-table-column>
        <el-table-column
        label="操作"
        width="200">
          <template scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleAddFood(scope.$index, scope.row)">添加食品</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange"
        style="margin-top: 10px;">
        </el-pagination>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form label-width="100px" :model="currentShop">
            <el-form-item label="店铺名称" >
              <el-input v-model="currentShop.name" auto-complete= "false"></el-input>
            </el-form-item>
             <el-form-item label="详细地址">
              <el-autocomplete v-model="address.address" placeholder="请输入地址" :fetch-suggestions="querySearchAsync" @select="handleSelect" style="width: 100%;"></el-autocomplete>
              <span>当前城市: {{city.name}}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <el-input v-model="currentShop.description"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="currentShop.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
              <el-cascader
                :options="options"
                change-on-select
                v-model="currentShopCategory">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商铺图片">
              <el-upload
              class="avatar-uploader"
              :action="cangduUrl + 'v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="currentShop.image_path" :src="dataImgUrl + currentShop.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleComfirmDialog">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import header from '@/components/header';
  export default {
    data () {
      return {
        cangduUrl,
        dataImgUrl,
        tableData: [],
        limit: 20,
        offset: 0,
        total: 0,
        city: {},
        dialogFormVisible: false,
        currentShop: {},
        options: [],
        currentShopCategory: [],
        address: {
          address: '',
          latitude: '',
          longitude: ''
        }
      };
    },
    components: {
      'elm-header': header
    },
    activated() {
      this.initData();
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less">
  #shopList {
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
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
  </style>
  
  