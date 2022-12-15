<template>
  <div class="main">
  <div>
    <div>
      <div class="title">请输入公告</div>
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" v-model="detail" />
      </el-form-item>
      <el-form-item label="署名">
        <el-input v-model="name" />
      </el-form-item>
    </div>
    <el-button type="primary" @click="addnotice">发布</el-button>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "teaAddNotice",
  components:{
    ElMessage
  },
  data() {
    return {
      title: "",
      detail: "",
      name: "",
    };
  },
  methods: {
    addnotice() {
      let data = new FormData();
      let url = "";
      url = "teacher/addNotice";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          token: this.$cookies.get("token")
        }
      };

      url = "teacher/addNotice";
            data.append("title", this.title);
            data.append("detail", this.detail);
            data.append("teacheruuid", this.$cookies.get("uuid"));
            data.append("teachername", this.name);
            axios.post(url,data,config).then(res=>{
            //console.log(res);
            // alert("发布成功");
              ElMessage.success("发布成功");
              this.title = "";
              this.detail = "";
              this.name = "";
          }).catch(err=>{
            //console.log(err);
            // alert("发布失败");
              ElMessage.success("发布失败");
          })
    }
  }
};
</script>

<style scoped>
.example-basic .el-date-editor {
  margin: 8px;
}

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
