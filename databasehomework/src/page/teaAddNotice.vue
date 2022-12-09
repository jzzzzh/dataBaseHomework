<template>
  <div>
    <div>
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="detail" />
      </el-form-item>

      <!-- <el-form-item label="是否必修">
      <el-select v-model="Compulsory" placeholder="是否必修">
        <el-option label="必修" value="0" />
        <el-option label="选修" value="1" />
      </el-select>
    </el-form-item> -->
      <!-- <div class="example-basic">
    <el-time-picker v-model="value1" placeholder="发布时间" />
  </div> -->
    </div>
    <el-button type="primary" @click="addnotice">发布</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "teaAddNotice",
  data() {
    return {
      title: "",
      detail: ""
    };
  },
  methods: {
    addnotice() {
      let data = new FormData();
      let url = "";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          token: this.$store.state.token
        }
      };

      url = "teacher/teaAddNotice";
            data.append("title", this.title);
            data.append("detail", this.detail);
            axios.post(url,data,config).then(res=>{
            console.log(res);
            alert("发布成功");
          }).catch(err=>{
            console.log(err);
            alert("发布失败");
          })
    }
  }
};
</script>

<style scoped>
.example-basic .el-date-editor {
  margin: 8px;
}
</style>
