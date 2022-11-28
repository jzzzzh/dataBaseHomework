<template>
    <div>
      <elm-header></elm-header>
      <el-row style="margin-top: 20px">
        <el-col :span="12" :offset="4">
          <el-form label-width="110px" :model="formData" :rules="rules" ref="formData">
            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-autocomplete placeholder="请输入地址" style="width: 100%" :fetch-suggestions="querySearchAsync" @select="handleSelect" v-model="formData.address"></el-autocomplete>
              <span>当前城市: {{city.name}}</span>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.number="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺简介">
              <el-input v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item label="店铺标语">
              <el-input v-model="formData.promotion_info"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
              <el-cascader
                :options="options"
                change-on-select
                v-model="selectedCategory">
              </el-cascader>
            </el-form-item>
            <el-form-item label="店铺特点">
              <span>品牌保证 </span><el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
              <span>蜂鸟专送 </span><el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
              <span>新开店铺 </span><el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
            </el-form-item>
            <el-form-item>
              <span>外卖保 </span><el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
              <span>准时达 </span><el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
              <span>开发票 </span><el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
            </el-form-item>
            <el-form-item label="配送费">
               <el-input-number  :min="0" :max="20" v-model="formData.float_delivery_fee"></el-input-number>
            </el-form-item>
             <el-form-item label="起送费">
               <el-input-number  :min="0" :max="100" v-model="formData.float_minimum_order_amount"></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间">
              <el-time-select :picker-options="poptions" placeholder="起始时间" v-model="formData.startTime"></el-time-select>
              <el-time-select :picker-options="poptions" placeholder="结束时间" v-model="formData.endTime"></el-time-select>
            </el-form-item>
            <el-form-item label="上传店铺头像">
              <el-upload
              class="avatar-uploader"
              :action="cangduUrl + 'v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.image_path" :src="dataImgUrl + formData.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="上传营业执照">
              <el-upload
              class="avatar-uploader"
              :action="cangduUrl + 'v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleBussinessLicenseSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.business_license_image" :src="dataImgUrl + formData.business_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="上传餐饮服务许可证">
              <el-upload
              class="avatar-uploader"
              :action="cangduUrl + 'v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleRestaurantServiceLicenseSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.catering_service_license_image" :src="dataImgUrl + formData.catering_service_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="优惠活动">
              <el-select v-model="currentOption" placeholder="请选择" @change="handleChangeSelect">
                <el-option
                v-for="item in activitiesOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
                > 
                </el-option>
              </el-select>
            </el-form-item>
            <el-table :data="activities" style="100%" highlight-current-row>
              <el-table-column label="活动标题" prop="icon_name"> 
              </el-table-column>
              <el-table-column label="活动名称" prop="name"> 
              </el-table-column>
              <el-table-column label="活动详情" prop="description"> 
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template scope="scope">
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
              </el-table-column>
            </el-table>
            <div class="form-button">
              <el-button type="primary" @click="handleCreate('formData')">立即创建</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
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
        poptions: {
          start: '05:30',
          step: '00:15',
          end: '23:30'
        },
        cangduUrl,
        dataImgUrl,
        formData: {
          name: '',
          address: '',
          phone: '',
          latitude: '',
          longitude: '',
          category: '',
          float_delivery_fee: 5,
          float_minimum_order_amount: 20,
          description: '',
          promotion_info: '',
          is_premium: true,
          delivery_mode: true,
          new: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: '',
          business_license_image: '',
          catering_service_license_image: '',
        },
        city: {},
        rules: {
          name: [
            {required: true, message: '请输入商店名称', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系电话'},
            {type: 'number', message: '电话号码必须是数字'}
          ]
        },
        options: [],
        selectedCategory: ['快餐便当', '简餐'],
        activitiesOption: [
          {
            value: 0,
            label: '满减优惠' 
          },
          {
            value: 1,
            label: '优惠大酬宾'
          },
          {
            value: 2,
            label: '新用户立减'
          },
          {
            value: 3,
            label: '进店领券'
          }
        ],
        currentOption: 0,
        activities: [
          {
            icon_name: '减', 
            name: '满减优惠', 
            description: '满30减5，满60减8'
          }
        ]
      };
    },
    created() {
      this.initData();
    },
    methods: {
  
    }
  };
  </script>
  
  <style lang="less">
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
  .form-button {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
  }
  </style>
  