<template>
  <div>
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
      <!-- <el-form-item label="是否必修">
        <el-select v-model="Compulsory" placeholder="是否必修">
          <el-option label="必修" value="0" />
          <el-option label="选修" value="1" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="学分">
        <el-input v-model="credit" />
      </el-form-item> -->
    </div>
    <el-button type="primary" @click="addcourse">提交</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "teaAddCourse",
  data() {
    return {
      className: "",
      major: "",
      maxNum: "",
      Compulsory: null,
      credit: null
    };
  },
  methods: {
  addcourse()
  {
    let data = new FormData();
    let url = "";
    let config = {
      headers: {
        "Content-Type": "multipart/form-data ",
        "token": this.$store.state.token
      }
    };
    url = "teacher/teaAddCourse";
            data.append("className", this.className);
            data.append("major", this.major);
            data.append("maxNum", this.maxNum);
            data.append("Compulsory", this.Compulsory);
            data.append("credit", this.credit);
    
            axios.post(url,data,config).then(res=>{
            console.log(res);
            alert("添加成功");
          }).catch(err=>{
            console.log(err);
            alert("添加失败");
          })
        }
}
};


</script>

<style scoped>
</style>
