<template>
  <div id="login">
    <div>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>成绩管理系统</span>
          </div>
        </template>
        <el-form class="form"
                 label-position="right"
                 label-width="100px"
                 :model="formLabelAlign"
                 style="max-width: 460px; margin-bottom: 30px; height: 550px"
        >
          <el-form-item label="身份">
            <el-select v-model="model" placeholder="选择身份">
              <el-option label="学生" value="0" />
              <el-option label="老师" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="myname" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="checkpassword" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="sex" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="major" />
          </el-form-item>
          <el-form-item label="年龄" v-show="model==1">
            <el-input v-model="age" />
          </el-form-item>
          <el-form-item label="年级" v-show="model==0">
            <el-input v-model="grade" />
          </el-form-item>
          <el-form-item label="班级" v-show="model==0">
            <el-input v-model="classnum" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="code" />
          </el-form-item>
          <div @click="MyhandleCanvas">
            <canvas id="canvas" style="width: 130px; height: 33px"> </canvas>
          </div>
        </el-form>
        <el-button class="loginButton" @click="this.$router.push('/')" type="primary" style="width: 40%">返回</el-button>
        <el-button class="loginButton" @click="register" type="primary" style="width: 40%">注册</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { h } from 'vue'
import { ElNotification } from 'element-plus'

export default {
  name: "register",
  data(){
    return{
      model:null,
      myname:"",
      password:"",
      checkpassword:"",
      sex:"",
      major:"",
      age:"",
      grade:"",
      classnum:"",
      code:"",
      true_code: "",//保存正确的验证码
      yanzhen_arr:[],
    }
  },
  mounted() {
    this.draw(this.yanzhen_arr);
  },
  methods:{
    register()
    {
      if(this.true_code == this.code)
      {
        if(this.password == this.checkpassword)
        {
          let data = new FormData();
          let url = "";
          let config = {
            headers: {
              "Content-Type": "multipart/form-data ",
            },
          };
          if(this.model == 0)
          {
            //  stu
            url = "student/register";
            data.append("name", this.myname);
            data.append("sex", this.sex);
            data.append("grade", this.grade);
            data.append("class_num", this.classnum);
            data.append("major", this.major);
            data.append("password", this.password)
          }
          else
          {
            // tea
            url = "teacher/register";
            data.append("name", this.myname);
            data.append("sex", this.sex);
            data.append("age", this.age);
            data.append("major", this.major);
            data.append("password", this.password);
          }
          axios.post(url,data,config).then(res=>{
            console.log(res);
            alert("注册成功");
            ElNotification({
              title: '您的账号',
              message: res.data.data.id,
              duration: 0,
            })
            this.$router.push('/');
          }).catch(err=>{
            console.log(err);
            alert("注册失败");
          })
        }
        else
        {
          alert("密码不同");
        }}
      else {
        alert("验证码错误");
      }
    },
    draw(show_num)
    {
      var canvas_width =  document.querySelector("#canvas").clientWidth;
      var canvas_height = document.querySelector("#canvas").clientHeight;
      var canvas = document.getElementById("canvas"); //获取到canvas
      var context = canvas.getContext("2d"); //获取到canvas画图
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      var sCode =
        "a,b,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length; //获取到数组的长度

      //4个验证码数
      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = this.randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
      }
      //验证码上显示6条线条
      for (var i = 0; i <= 5; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.stroke();
      }
      //验证码上显示31个小点
      for (let i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }

      //最后把取得的验证码数组存起来，方式不唯一
      let num = show_num.join("");
      // console.log(num);
      this.true_code = num
    },
    //得到随机的颜色值
    randomColor() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    MyhandleCanvas(){
      this.draw(this.yanzhen_arr);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin';
*{
  margin: 0;
  padding: 0;
}
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324057;
  position: absolute;
  .wh(100%,100%);
  .form {
    background-color: white;
    border-radius: 5px;
    flex-basis: 370px;
    height: 260px;
    position: relative;
    padding: 25px;
    box-sizing: border-box;

    &:before {
      display: block;
      position: absolute;
      font-size: 34px;
      color: #fff;
      top: -100px;
      left: 0;
      width: 370px;
      text-align: center;
    }
    .loginButton {
      width: 100%;
    }
    .tip {
      color: red;
      font-size: 12px;
      text-align: center;
    }
  }
}
.form-fade-enter-active, .form-fade-leave-active {
  transition: all 1s ease-in-out;
}
.form-fade-enter, .form-fade-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
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
