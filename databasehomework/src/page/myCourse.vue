<template>
    <div class="main">
      <div style="text-align: center">
        <div style="font-weight: bold; font-size: large; margin-bottom: 20px">学生课程</div>
      <div >
        <div style="text-align: center; width:1200px">
          <el-table :data="reslist" stripe style="width: 100%">
            <el-table-column prop="courseuuid" label="id" width="100" />
            <el-table-column prop="courseName" label="课程名" width="100" />
            <el-table-column prop="bixiu" label="是否必修" />
            <el-table-column prop="credit" label="学分" />
            <el-table-column prop="checkscore" label="签到成绩" />
            <el-table-column prop="dailyscore" label="平时成绩" />
            <el-table-column prop="examscore" label="考试成绩" />
            <el-table-column prop="score" label="总成绩" />
            <el-table-column label="选择" width="200">
              <template #default="scope">
                <el-button @click="gotopingfen(scope.row)" v-show="scope.row.score != 0">评分</el-button>
                <el-popconfirm title="是否要删除"
                               confirm-button-text="是"
                               cancel-button-text="否"
                               @confirm="deleteCourse(scope.row)">
                  <template #reference>
                    <el-button v-show="scope.row.score == 0" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      </div>
    </div>
  <el-dialog
    v-model="centerDialogVisible"
    title="教师评价"
    width="30%"
    align-center
  >
    <div>
      <p>教师编号:{{teacheruuid}}</p>
      <p>教师姓名:{{teachername}}</p>
      <p>课程名:{{coursename}}</p>
      <el-rate v-model="value" :colors="colors" />
      <el-input
        v-model="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="请输入评价"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="uploadScore">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  name: "myCourse",
  components:[
    ElMessage
  ],
  data(){
    return{
      reslist:[],
      centerDialogVisible: false,
      teacheruuid: null,
      teachername: null,
      colors :['#99A9BF', '#F7BA2A', '#FF9900'],
      value:0,
      coursename:null,
      textarea:null,
      courseuuid: null,
    }
  },
  mounted() {
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
    let url = "student/selectScoreByid";
    data.append("studentuuid", this.$cookies.get("uuid"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.$store.state.token
      },
    };
    axios.post(url,data,config).then(
      res=>{
        //console.log(res);
        this.reslist = res.data.data.Score;
        for(let i = 0; i < res.data.data.Score.length; i++)
        {
          this.reslist[i].bixiu = (this.reslist[i].Compulsory==1?"是":"否");
        }
      }
    )
  },
  methods:{
    uploadScore()
    {
      let url = "student/insertTeacherScore";
      let data = new FormData();
      data.append("studentuuid",this.$cookies.get("uuid"));
      data.append("teacheruuid",this.teacheruuid);
      data.append("score",this.value * 20);
      data.append("detail",this.textarea);
      data.append("courseuuid",this.courseuuid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": this.$store.state.token
        },
      };
      axios.post(url, data, config).then(
        res=>{
          ElMessage.success("提交成功");
        }
      ).catch(
        err=>{
          ElMessage.error("请勿重复提交");
        }
      )
      this.centerDialogVisible = false;
    },
    gotopingfen(e)
    {
      this.coursename = e.courseName;
      this.courseuuid = e.courseuuid;
      //console.log(this.value)
      this.value = 0;
      //console.log(e);
      this.centerDialogVisible = true;
      let data = new FormData();
      let url = "student/selectCourseBycourseid";
      data.append("uuid", e.courseuuid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": this.$store.state.token
        },
      };
      axios.post(url,data,config).then(
        res=>{
            //console.log(res.data.data.course.teacher_id);
            this.teacheruuid = res.data.data.course.teacher_id;
            let data2 = new FormData();
            data2.append("id", this.teacheruuid*1);
            let url2 = "teacher/findByID";
            let config = {
                 headers: {
                    "Content-Type": "multipart/form-data",
                    "token": this.$store.state.token
                   },
                };
            axios.post(url2, data2, config).then(
              res=>{
                //console.log(res.data.data);
                this.teachername = res.data.data.teacher.name;
                //console.log(this.teachername);
              }
            )
        }
      )
    },
    deleteCourse(e)
    {
      //console.log(e);
      let data = new FormData();
      data.append("studentuuid", this.$cookies.get("uuid"));
      data.append("courseuuid", e.courseuuid);
      let url = "student/deleteCourseByid";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": this.$store.state.token
        },
      };
      axios.post(url,data,config).then(
        res=>{
          ElMessage.success("删除成功");
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
  .main0{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    /*min-height: calc(100vh - 200px);*/
  }
  body{margin: 0; padding: 0 ;}
</style>
