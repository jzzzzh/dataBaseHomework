<template>
    <div>
      <div v-show="isStudent" style="margin: 20px">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>欢迎光临，{{student.name}}</span>
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
            <el-button type="danger"  @click="changePassword" data-s="student" style="margin-top: 20px">修改密码</el-button>
            <logout style="margin-top: 20px"></logout>
            <el-button @click="visible = true" style="margin-top: 20px">
              修改信息
            </el-button>
          </div>
        </el-card>
      </div>
      <div v-show="!isStudent" style="margin: 20px">
      <el-card class="box-card" shadow="hover">
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
          <logout style="margin-top: 20px"></logout>
          <el-button @click="visible = true" style="margin-top: 20px">
            修改信息
          </el-button>
        </div>
      </el-card>
      </div>
      <div style="margin: 20px">
        <el-card class="box-card" shadow="hover">
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
      <el-drawer v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">修改个人信息</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </template>
        <el-form
          label-position="top"
          label-width="100px"
          :model="student"
          style="max-width: 460px"
          v-show="isStudent"
        >
          <el-form-item label="姓名">
            <el-input v-model="student.name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="student.sex" />
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="student.grade" />
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="student.class_num" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="student.major" />
          </el-form-item>
        </el-form>

        <el-form
          label-position="top"
          label-width="100px"
          :model="teacher"
          style="max-width: 460px"
          v-show="!isStudent"
        >
          <el-form-item label="姓名">
            <el-input v-model="teacher.name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="teacher.sex" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="teacher.major" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="teacher.age" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="upload">提交</el-button>
      </el-drawer>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import logout from "@/components/logout";
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  export default {
    components: {
      logout,
      CircleCloseFilled
    },
    data () {
      return {
        visible:false,
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
        console.log(token);
        this.$store.commit("setmyToken", token);
        this.$store.commit("setmyName", name);
        this.$store.commit("setModel", model);
        console.log(that.$store.state.model)
        this.$store.commit("setIsLogin");
      }
      if(that.$store.state.model == 0)
      {
        that.isStudent = true;
      }
      else {
        that.isStudent = false;
      }
      if(this.isStudent == true)
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
      changePassword() {
        this.$router.push('/ChangePassword');
      },
      upload()
      {
        let data = new FormData();
        let url = "";
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": this.$store.state.token
          },
        };
        if(this.isStudent)
        {
          data.append("name", this.student.name);
          data.append("sex", this.student.sex);
          data.append("grade", this.student.grade * 1);
          data.append("class_num", this.student.class_num * 1);
          data.append("major", this.student.major);
          data.append("uuid", this.student.uuid);
          url = "student/changeStudentInfo";
        }
        else
        {
            url = "teacher/changeTeacherInfo";
            data.append("name", this.teacher.name);
            data.append("sex", this.teacher.sex);
            data.append("major", this.teacher.major);
            data.append("uuid", this.teacher.uuid);
            data.append("age", this.teacher.age);
        }
        axios.post(url,data,config).then(res=>{
          // console.log(res);
          alert("修改成功");
        }).catch(err=>{
          // console.log(err);
          alert("修改失败");
        })
      }
    }
  };
  </script>
  
  <style lang="less" scoped>

  </style>
  
