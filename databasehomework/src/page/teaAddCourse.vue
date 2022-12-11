<template>
  <div>
  <div class="main">
  <div>
    <el-form-item label="课程名">
      <el-input v-model="className" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="major" />
    </el-form-item>
    <el-form-item label="最大人数">
      <el-input v-model="maxNum" />
    </el-form-item>
    <el-form-item label="是否必修">
      <el-select v-model="Compulsory" placeholder="是否必修">
        <el-option label="必修" value="0" />
        <el-option label="选修" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="学分">
      <el-input v-model="credit" />
    </el-form-item>
  </div>
  </div>
  <el-button type="primary">提交</el-button>
    </div>
</template>

<script>
export default {
  name: "teaAddCourse",
  data(){
    return{
      className:"",
      major:"",
      maxNum:"",
      Compulsory:null,
      credit:null
    }
  }
};
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
