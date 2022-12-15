<template>
    <div class="main">
        <div style="width: 400px">
                  <el-card class="box-card">
                    <template #header>
                      <div class="card-header">
                        <span>{{NoticeInfo.title}}</span>
                      </div>
                    </template>
                    <div>
                      <p>{{NoticeInfo.detail}}</p>
                      <p>{{NoticeInfo.teachername}}</p>
                      <p>{{NoticeInfo.time}}</p>
                    </div>
                    <el-popconfirm title="是否要删除"
                                   confirm-button-text="是"
                                   cancel-button-text="否"
                                   @confirm="deleteNotice">
                      <template #reference>
                        <el-button type="warning">删除</el-button>
                      </template>
                    </el-popconfirm>
                  </el-card>
          <div style="margin-top: 40px">选择发送对象</div>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">私发</el-radio>
            <el-radio label="2" size="large">班级发</el-radio>
          </el-radio-group>
          <div v-if="radio1==1">
            <el-form-item label="请输入学号">
              <el-input v-model="stuuuid" />
            </el-form-item>
            <el-popconfirm title="是否要发送"
                           confirm-button-text="是"
                           cancel-button-text="否"
                           @confirm="sendNotice">
              <template #reference>
                <el-button type="danger">发送公告</el-button>
              </template>
            </el-popconfirm>
          </div>
          <div v-if="radio1==2">
            <el-table :data="reslist" stripe style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="uuid" label="id" width="80" />
              <el-table-column prop="name" label="课程名" width="80" />
              <el-table-column prop="bixiu" label="是否必修" width="80" />
              <el-table-column prop="credit" label="学分" width="80"  />
            </el-table>
            <el-popconfirm title="是否要发送"
                           confirm-button-text="是"
                           cancel-button-text="否"
                           @confirm="sendNotice"
            >
              <template #reference>
                <el-button type="danger" style="margin-top: 20px">发送公告</el-button>
              </template>
            </el-popconfirm>
          </div>

        </div>

    </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "NoticeInfo",
  components:[
    ElMessage
  ],
  data(){
    return{
      NoticeInfo : {
        uuid:null,
        title:"",
        detail:"",
        time:null,
        teachername:"",
      },
      radio1 : 0,
      stuuuid: null,
      classuuid: null,
      reslist: null,
      stuidlist: []
    }
  },
  mounted() {
    this.NoticeInfo = JSON.parse(this.$route.query.NoticeInfo);
    //console.log(this.NoticeInfo);
    let that = this;
    if(this.$cookies.get("token")!= null && this.$cookies.get("uuid")!= null && this.$cookies.get("model")!= null)
    {
      let token = this.$cookies.get("token");
      let name = this.$cookies.get("uuid");
      let model = this.$cookies.get("model");
      //console.log(token);
      this.$store.commit("setmyToken", token);
      this.$store.commit("setmyName", name);
      this.$store.commit("setModel", model);
      //console.log(that.$store.state.model)
      this.$store.commit("setIsLogin");
    }
    let data = new FormData();
    data.append("teacher_id", this.$cookies.get("uuid"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.$store.state.token
      },
    };
    let url = "teacher/selectCourseByMainTeacherID";
    axios.post(url, data, config).then(
      res=>{
        // console.log(res.data.data.CourseByMainTeacherID);
        this.reslist = res.data.data.CourseByMainTeacherID;
        for(let i = 0; i < this.reslist.length; i++) {
          if (this.reslist[i].Compulsory == 1) {
            this.reslist[i].bixiu = "是";
          } else {
            this.reslist[i].bixiu = "否";
          }
        }
      }
    ).catch(
      err=>{
        //console.log(err);
        ElMessage.error("获取失败");
      }
    )
  },
  methods:{
    sendNotice() {
      let data = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "token": this.$cookies.get("token")
        }
      };
      data.append("noticeuuid",this.NoticeInfo.uuid);
      data.append("teacheruuid", this.$cookies.get("uuid"));
      let url = "teacher/insertNoticeToStudent";
      if(this.radio1 == 1)
      {
        data.append("studentuuid", this.stuuuid);
        axios.post(url,data,config).then(
          res=>{
            ElMessage.success("发送成功");
          }
        ).catch(
          err=>{
            ElMessage.error("发送失败");
          }
        )
      }
      else {
        //console.log(this.classuuid);
        if(this.classuuid.length > 0)
        {
          let url2 = "teacher/selectScoreByCourseID";
          let config2 = {
            headers: {
              "Content-Type": "multipart/form-data",
              "token": this.$cookies.get("token")
            },
          };
          for(let i = 0; i < this.classuuid.length; i++)
          {
            let data2 = new FormData();
            data2.append("courseuuid", this.classuuid[i].uuid* 1);
            axios.post(url2,data2,config2).then(
              res=>{
                //console.log(res.data.data);
                if(res.data.data.score.length > 0)
                {
                  for(let j = 0; j < res.data.data.score.length; j++)
                  {
                    this.stuidlist.push(res.data.data.score[j].studentuuid);
                  }
                }

              }
            ).catch(
              err=>{
                //console.log(err);
              }
            )
          }
          //console.log(this.stuidlist);
          let tmp = new Set(this.stuidlist);
          //console.log(tmp);
          let tmpp = Array.from(tmp);
          //console.log(tmpp);
          this.stuidlist = tmpp;
          if(this.stuidlist.length > 0)
          {
            for(let k = 0; k < this.stuidlist.length; k++)
            {
              let data3 = new FormData();
              data3.append("noticeuuid",this.NoticeInfo.uuid);
              data3.append("teacheruuid", this.$cookies.get("uuid"));
              data3.append("studentuuid", this.stuidlist[k]*1);
              axios.post(url,data3,config).then(
                res=>{
                  ElMessage.success("发送成功");
                }
              ).catch(
                err=>{
                  ElMessage.error("发送失败，请确认是否已经发送");
                }
              )
            }
          }
        }
        else
        {
          ElMessage.error("请选择再发送")
        }
      }
    },
    handleSelectionChange(e)
    {
      //console.log(e);
      this.classuuid = e;
    },
    deleteNotice(){
      let data = new FormData();
      let url = "teacher/deleteNoticeByNoticeID";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token":  this.$cookies.get("token")
        },
      };
      data.append("uuid", this.NoticeInfo.uuid);
      axios.post(url,data,config).then(
        res=>{
          ElMessage.success("删除成功");
          this.$router.push("/home");
        }
      ).catch(
        err=>{
          ElMessage.error("删除失败");
        }
      )
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
</style>
