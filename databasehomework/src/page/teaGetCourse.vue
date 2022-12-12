<template>
  <div class="main">
    <div style="text-align: center">
      <div style="font-weight: bold; font-size: large; margin-bottom: 20px">我的课程</div>
      <div >
        <div style="text-align: center; width:1200px">
          <el-table :data="reslist" stripe style="width: 100%">
            <el-table-column prop="uuid" label="id" width="100" />
            <el-table-column prop="name" label="课程名" width="100" />
            <el-table-column prop="bixiu" label="是否必修" />
            <el-table-column prop="credit" label="学分" />
            <el-table-column label="选择" width="200">
              <template #default="scope">
                <el-button @click="gototeaAddScore(scope.row, 1)">进入</el-button>
                <el-popconfirm title="是否要删除"
                               confirm-button-text="是"
                               cancel-button-text="否"
                               @confirm="deleteCourse(scope.row)">
                  <template #reference>
                    <el-button type="danger">删除课程</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
<!--    <div style="font-weight: bold; font-size: large; margin-bottom: 20px">副教师课程</div>-->
<!--    <div >-->
<!--      <div style="text-align: center; width:1200px">-->
<!--        <el-table :data="reslist" stripe style="width: 100%">-->
<!--          <el-table-column prop="courseuuid" label="id" width="100" />-->
<!--          <el-table-column prop="courseName" label="课程名" width="100" />-->
<!--          <el-table-column prop="bixiu" label="是否必修" />-->
<!--          <el-table-column prop="credit" label="学分" />-->
<!--          <el-table-column prop="checkscore" label="签到成绩" />-->
<!--          <el-table-column prop="dailyscore" label="平时成绩" />-->
<!--          <el-table-column prop="examscore" label="考试成绩" />-->
<!--          <el-table-column prop="score" label="总成绩" />-->
<!--          <el-table-column label="选择" width="200">-->
<!--            <template #default="scope">-->
<!--              <el-button @click="gotopingfen(scope.row)" v-show="scope.row.score == 1">进入</el-button>-->
<!--              <el-popconfirm title="是否要删除"-->
<!--                             confirm-button-text="是"-->
<!--                             cancel-button-text="否"-->
<!--                             @confirm="deleteCourse(scope.row)">-->
<!--                <template #reference>-->
<!--                  <el-button v-show="scope.row.score == 0" type="danger">删除课程</el-button>-->
<!--                </template>-->
<!--              </el-popconfirm>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "teaGetCourse",
  components:{
    ElMessage
  },
  data()
  {
    return{
      reslist:null,

    }
  },
  mounted() {
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
        console.log(res.data.data.CourseByMainTeacherID);
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
        console.log(err);
        ElMessage.error("获取失败");
      }
    )
  },
  methods:{
    gototeaAddScore(a,b)
    {
      this.$router.push({
        path:"/teaAddScore",
        query: {
          classInfo: JSON.stringify(a),
          from: JSON.stringify(b)
        }
      })
    },
    deleteCourse(e)
    {
      console.log(e);
      let url = "teacher/deleteCourseByCourseID";
      let data = new FormData();
      data.append("uuid",e.uuid );
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
