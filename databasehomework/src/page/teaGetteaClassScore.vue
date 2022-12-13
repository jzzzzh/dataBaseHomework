<template>
  <div class="main">
    <div style="text-align: center">
      <div>课程评价</div>
    <div style="text-align: center; width:100%">
      <el-table :data="reslist" stripe style="width: 800px">
        <el-table-column prop="detail" label="评价" width="500" />
        <el-table-column prop="score" label="分数" />
      </el-table>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "teaGetClassScore",
  data(){
    return{
      classInfo: null,
      reslist: null
    }
  },
  mounted() {
    this.classInfo =  JSON.parse(this.$route.query.classInfo);
    //console.log(this.classInfo);
    let data = new FormData();
    data.append("courseuuid", this.classInfo.uuid* 1);
    data.append("teacheruuid", this.classInfo.teacher_id * 1);
    let url = "teacher/selectTeacherScoreByTeacherIDAndCourseID";
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.$cookies.get("token")
      },
    };
    axios.post(url,data,config).then(
      res=>{
        //console.log(res.data.data.tsList);
        this.reslist = res.data.data.tsList;
      }
    )
  },
  methods:{

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
