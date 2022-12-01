<template>
  <div>
    <el-card class="box-card" shadow="hover" v-show="!isTrue">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>

        </div>
      </template>
      <el-form class="form"
               label-position="right"
               label-width="100px"
               :model="formLabelAlign"
               style="max-width: 460px; margin-bottom: 30px"
      >
        <el-form-item label="账号">
          {{this.$store.state.username}}
        </el-form-item>
        <el-form-item label="身份">
          {{this.$store.state.model==0?"学生":"老师"}}
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" />
        </el-form-item>
      </el-form>
      <el-button class="loginButton" @click="checkPassword" type="primary" style="width: 40%">修改密码</el-button>
    </el-card>
    <el-card class="box-card" shadow="hover" v-show="isTrue">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
        </div>
      </template>
      <el-form class="form"
               label-position="right"
               label-width="100px"
               :model="formLabelAlign"
               style="max-width: 460px; margin-bottom: 30px"
      >
        <el-form-item label="账号">
          {{this.$store.state.username}}
        </el-form-item>
        <el-form-item label="身份">
          {{this.$store.state.model==0?"学生":"老师"}}
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ChangePassword" />
        </el-form-item>
        <el-form-item label="再输入密码">
          <el-input v-model="CheckChangePassword" />
        </el-form-item>
      </el-form>
      <el-button class="loginButton" @click="finalCheckPassword" type="primary" style="width: 40%">修改密码</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChangePassword",
  data(){
    return{
      password : "",
      isTrue : false,
      ChangePassword:"",
      CheckChangePassword:""
    }
  },
  mounted() {
      if(this.$store.state.username=="" || this.$store.state.model=="" || this.$store.state.token=="")
      {
        if(this.$cookies.get("token")!= null && this.$cookies.get("uuid")!= null && this.$cookies.get("model")!= null)
        {
          let token = this.$cookies.get("token");
          let name = this.$cookies.get("uuid");
          let model = this.$cookies.get("model");
          this.$store.commit("setmyToken", token);
          this.$store.commit("setmyName", name);
          this.$store.commit("setModel", model);
          this.$store.commit("setIsLogin");
        }
        else {
          this.$store.commit("logout");
          this.$cookies.remove("token");
          this.$cookies.remove("uuid");
          this.$cookies.remove("model");
          this.$cookies.remove("password");
          this.$router.push("/");
        }
      }
  },
  methods:{
    checkPassword()
    {
      if(this.password == this.$cookies.get("password"))
      {
        this.isTrue = true;
        console.log("yes");
      }
      else {
        this.isTrue = false;
      }
    },
    finalCheckPassword()
    {
      if(this.ChangePassword == this.CheckChangePassword)
      {
        if(this.ChangePassword == this.password)
        {
          alert("密码不能相同");
        }
        else
        {
          let data = new FormData();
          data.append("uuid", this.$store.state.username);
          data.append("password", this.ChangePassword);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
              "token": this.$store.state.token
            },
          };
          let url = "";
          if(this.$store.state.model == 0)
          {
            url = 'student/changePassword';
          }
          else
          {
            url = 'teacher/changePassword';
          }
          axios.post(url,data,config).then(res=>{
            alert("修改成功");
            this.$store.commit("logout");
            this.$cookies.remove("token");
            this.$cookies.remove("uuid");
            this.$cookies.remove("model");
            this.$cookies.remove("password");
            this.$router.push("/");
          }).catch(err=>{
            console.log(err);
          })
        }
      }
      else
      {
        alert("请重新输入密码");
      }
    }
  }
};
</script>

<style scoped>
#canvas {
  width:130px;
  height:33px;
  float: right;
  margin-right: 1%;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 80px;
}
</style>
