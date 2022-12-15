<template>
  <div class="main">
    <div>
      <div class="title">添加课程</div>
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
          <el-option label="必修" value="1" />
          <el-option label="选修" value="0" />
        </el-select>
      </el-form-item>
       <el-form-item label="学分">
        <el-input v-model="credit" />
      </el-form-item>

      <el-popconfirm title="是否要提交"
                     confirm-button-text="是"
                     cancel-button-text="否"
                     @confirm="addcourse">
        <template #reference>
          <el-button type="primary">提交</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "teaAddCourse",
  components:{
    ElMessage
  },
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
        "token": this.$cookies.get("token")
      }
    };
    url = "teacher/addCourse";

            data.append("name", this.className);
            data.append("major", this.major);
            data.append("max_num", this.maxNum);
            data.append("Compulsory", this.Compulsory);
            data.append("credit", this.credit);
            data.append("teacher_id", this.$cookies.get("uuid"));
            axios.post(url,data,config).then(res=>{
            //console.log(res);
            // alert("添加成功");
              ElMessage.success("添加成功")
          }).catch(err=>{
            //console.log(err);
            // alert("添加失败");
              ElMessage.error("添加失败");
          })
        }
}
};


</script>

<style scoped>

.main{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}
.title{
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
}
</style>
