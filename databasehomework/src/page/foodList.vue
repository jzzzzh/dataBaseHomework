<template>
    <div>
      <elm-header></elm-header>
      <div id="foodList">
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
                <el-form-item label="食品名称">
                  {{props.row.name}}
                </el-form-item>
                <el-form-item label="餐馆名称">
                  {{props.row.restaurant_name}}
                </el-form-item>
                <el-form-item label="食品 ID">
                  {{props.row.item_id}}
                </el-form-item>
                <el-form-item label="餐馆 ID">
                  {{props.row.restaurant_id}}
                </el-form-item>
                <el-form-item label="食品介绍">
                  {{props.row.description}}
                </el-form-item>
                <el-form-item label="餐馆地址">
                  {{props.row.restaurant_address}}
                </el-form-item>
                <el-form-item label="食品评分">
                  {{props.row.rating}}
                </el-form-item>
                <el-form-item label="食品分类">
                  {{props.row.category_name}}
                </el-form-item>
                <el-form-item label="月销量">
                  {{props.row.month_sales}}
                </el-form-item>             
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
          label="食品名称"
          prop="name">
          </el-table-column>
           <el-table-column
          label="食品介绍"
          prop="description">
          </el-table-column>
           <el-table-column
          label="食品评分"
          prop="rating">
          </el-table-column>
          <el-table-column
          label="操作"
          width="160">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
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
          <el-form label-width="100px" :model="selectRow">
            <el-form-item label="食品名称" >
              <el-input v-model="selectRow.name"></el-input>
            </el-form-item>
            <el-form-item label="食品介绍" >
              <el-input v-model="selectRow.description"></el-input>
            </el-form-item>
            <el-form-item label="食品分类">
              <el-select v-model="selectMenuIndex" :placeholder="selectMenu.label" @change="handleChange">
                <el-option
                v-for="item in allMenu"
                :key="item.value"
                :label="item.label"
                :value="item.index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商铺图片">
              <el-upload
              class="avatar-uploader"
              :action="cangduUrl + 'v1/addimg/food'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="selectRow.image_path" :src="dataImgUrl + selectRow.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div id="specTable">
            <el-table
            :data="specs"
            highlight-current-row
            style="width: 100%;margin-bottom: 20px;">
              <el-table-column
              label="规格"
              prop="specs">
              </el-table-column>
              <el-table-column
              label="包装费"
              prop="packing_fee">
              </el-table-column>
              <el-table-column
              label="价格"
              prop="price">
              </el-table-column>
              <el-table-column
              label="操作">
                <template scope="scope">
                  <el-button size="small" type="danger" @click="handleDeleteSpec(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="handleAddSpec">添加规格</el-button>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleComfirmDialog">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="添加规格" :visible.sync="dialogSpecFormVisible">
          <el-form label-width="100px" :model="newSpec" :rules="specRule">
            <el-form-item label="规格" prop="specs">
              <el-input v-model="newSpec.specs"></el-input>
            </el-form-item>
            <el-form-item label="包装费">
              <el-input-number v-model="newSpec.packing_fee" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="newSpec.price" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSpecFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSpecComfirmDialog">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import header from '@/components/header.vue';
  export default {
    components: {
      'elm-header': header
    },
    data() {
      return {
        tableData: [],
        expandRow: [],
        selectMenu: {},
        selectRow: {},
        allMenu: [],
        specRule: {
          specs: [
            {required: true, message: '请输入规格', trigger: 'blur'}
          ] 
        },
        newSpec: {
          specs: '',
          packing_fee: 20,
          price: 0
        },
        restaurant_id: null,
        selectMenuIndex: null,
        offset: 0,
        limit: 20,
        total: 0,
        dialogFormVisible: false,
        dialogSpecFormVisible: false,
        dataImgUrl,
        cangduUrl
      };
    },
    computed: {
      specs: function() {
        let specArr = [];
        if (this.selectRow.specfoods) {
          this.selectRow.specfoods.forEach((item) => {
            specArr.push({
              specs: item.specs_name,
              price: item.price,
              packing_fee: item.packing_fee
            });
          });
        }
        return specArr;
      }
    },
    created() {
      this.restaurant_id = this.$route.query.restaurant_id; //这里的值虽然为undefined可是在后台筛选的时候是等于获取所有
    },
    activated() {
      this.initData();
    },
    methods: {
    }
  };
  </script>
  
  <style lang="less">
  #foodList {
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
  
    #specTable {
      text-align: center;
    }
  }
  </style>
  
  