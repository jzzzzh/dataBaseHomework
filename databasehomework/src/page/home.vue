<template>
    <div>
      <div v-show="isStudent" style="margin: 20px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>欢迎光临.{{student.name}}</span>
            </div>
          </template>
          <div>
            <el-descriptions title="用户信息" :column="3" border>
              <el-descriptions-item
                label="姓名"
                label-align="center"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px"
              >{{student.name}}</el-descriptions-item
              >
              <el-descriptions-item label="性别" label-align="center" align="center"
              >{{ student.sex }}</el-descriptions-item
              >
              <el-descriptions-item label="学号" label-align="center" align="center"
              >{{student.uuid}}</el-descriptions-item
              >
              <el-descriptions-item label="年级" label-align="center" align="center">
                {{student.grade}}
              </el-descriptions-item>
              <el-descriptions-item label="班级" label-align="center" align="center"
              >{{student.class_num}}</el-descriptions-item
              >
              <el-descriptions-item label="专业" label-align="center" align="center"
              >{{student.major}}</el-descriptions-item
              >
            </el-descriptions>
          </div>
          <div>
            <el-button type="danger"  @click="getInfo" data-s="student" style="margin-top: 20px">修改密码</el-button>
          </div>
        </el-card>
      </div>
      <div v-show="!isStudent" style="margin: 20px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>欢迎光临, {{teacher.name}}</span>
          </div>
        </template>
        <div>
          <el-descriptions title="用户信息" :column="3" border>
            <el-descriptions-item
              label="姓名"
              label-align="center"
              align="center"
              label-class-name="my-label"
              class-name="my-content"
              width="150px"
            >{{teacher.name}}</el-descriptions-item
            >
            <el-descriptions-item label="性别" label-align="center" align="center"
            >{{ teacher.sex }}</el-descriptions-item
            >
            <el-descriptions-item label="工号" label-align="center" align="center"
            >{{teacher.uuid}}</el-descriptions-item
            >
            <el-descriptions-item label="专业" label-align="center" align="center"
            >{{teacher.major}}</el-descriptions-item
            >
            <el-descriptions-item label="年龄" label-align="center" align="center"
            >{{teacher.age}}</el-descriptions-item
            >
          </el-descriptions>
        </div>
        <div>
          <el-button type="danger" @click="changePassword" data-s="teacher" style="margin-top: 20px">修改密码</el-button>
        </div>
      </el-card>
      </div>
      <div style="margin: 20px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>公告栏</span>
            </div>
          </template>
          <div>
              <p>这是公告</p>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    components: {
    },
    data () {
      return {
        student:{
          name:"",
          sex:"",
          uuid:"",
          grade:"",
          class_num:"",
          major:"",
          password:""
        },
        teacher:{
          name:"",
          uuid:"",
          sex:"",
          major:"",
          age:"",
          password:"",
        },
        isStudent: true
      };
    },
    computed: {

    },
    mounted () {
      let that = this;
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
      if(that.$store.state.model == 0)
      {
        that.isStudent = true;
      }
      else {
        that.isStudent = false;
      }
      if(this.isStudent = true)
      {
        let data = new FormData();
        console.log(this.$store.state.username);
        data.append("id", this.$store.state.username * 1);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": this.$store.state.token
          },
        };
        let url = "";
        url = 'student/findByID';
        axios.post(url,data,config).then(res=>{
          console.log(res);
          let data = res.data.data;
          this.student.major = data.student.major;
          this.student.sex = data.student.sex;
          this.student.name = data.student.name;
          this.student.uuid = data.student.uuid;
          this.student.grade = data.student.grade;
          this.student.class_num = data.student.class_num;
        }).catch(err=>{
          console.log(err);
        })
      }
      else {
        let data = new FormData();
        data.append("id", this.$store.state.username);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": this.$store.state.token
          },
        };
        let url = "";
        url = 'teacher/findByID';
        axios.post(url,data,config).then(res=>{
          console.log(res)
          let data = res.data.data;
          this.teacher.major = data.teacher.major;
          this.teacher.sex = data.teacher.sex;
          this.teacher.name = data.teacher.name;
          this.teacher.uuid = data.teacher.uuid;
          this.teacher.age = data.teacher.age;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods: {
      changePassword(s){
        console.log(s);
      },
      getInfo()
      {
        if(this.isStudent = true)
        {
          let data = new FormData();
          data.append("id", this.$store.state.username);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data ",
              "token": this.$store.state.token
            },
          };
          let url = "";
          url = 'student/findByID';
          axios.post(url,data,config).then(res=>{
            console.log(res)
            let data = res.data.data;
            this.student.major = data.student.major;
            this.student.sex = data.student.sex;
            this.student.name = data.student.name;
            this.student.uuid = data.student.uuid;
            this.student.grade = data.student.grade;
            this.student.class_num = data.student.class_num;
          }).catch(err=>{
            console.log(err);
          })
        }
        else {
          let data = new FormData();
          data.append("id", this.$store.state.username);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data ",
              "token": this.$store.state.token
            },
          };
          let url = "";
          url = 'teacher/findByID';
          axios.post(url,data,config).then(res=>{
            console.log(res)
            let data = res.data.data;
            this.teacher.major = data.teacher.major;
            this.teacher.sex = data.teacher.sex;
            this.teacher.name = data.teacher.name;
            this.teacher.uuid = data.teacher.uuid;
            this.teacher.age = data.teacher.age;
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>

  </style>
  
