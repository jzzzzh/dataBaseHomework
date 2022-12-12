<template>
  <div class="main">
    <div style="text-align: center">
      <div style="font-weight: bold; font-size: large; margin-bottom: 20px">课程</div>
      <div>
        课程名：{{cousename}}
      </div>
      <div>
        课程号：{{courseNum}}
      </div>
      <div >
        <div style="text-align: center; width:1200px">
          <el-table :data="reslist" stripe style="width: 100%">
            <el-table-column prop="studentinfo.student.uuid" label="id" width="100" />
            <el-table-column prop="studentinfo.student.name" label="学生名字" width="100" />
            <el-table-column prop="studentinfo.student.sex" label="学生性别" />
            <el-table-column prop="studentinfo.student.major" label="学生专业" />
            <el-table-column prop="studentinfo.student.class_num" label="学生班级" />
            <el-table-column prop="dailyscore" label="平时成绩" />
            <el-table-column prop="checkscore" label="考勤成绩" />
            <el-table-column prop="examscore" label="考试成绩" />
            <el-table-column prop="score" label="总成绩" />
            <el-table-column label="选择" width="200">
              <template #default="scope">
                <el-button @click="gototeaAddScore(scope.row)" v-show="this.from == 1">修改成绩</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div id="test" style="width: 300px; height: 300px"></div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="发布成绩"
    width="30%"
    :before-close="handleClose"
  >
    <div>
      <el-form-item label="学生编号">
        {{studentinfo.student.uuid}}
      </el-form-item>
      <el-form-item label="学生姓名">{{studentinfo.student.name}}
      </el-form-item>
      <el-form-item label="平时成绩">
        <el-input v-model="dailyscore" />
      </el-form-item>
      <el-form-item label="考勤成绩">
        <el-input v-model="checkscore" />
      </el-form-item>
      <el-form-item label="考试成绩">
        <el-input v-model="examscore" />
      </el-form-item>
      <el-form-item label="总成绩">
       {{sumScore}}
      </el-form-item>
    </div>
    <el-button type="primary" @click="addscore">发布</el-button>
    <el-button type="danger" @click="this.dialogVisible = faLSE">关闭</el-button>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import * as echarts from 'echarts';
export default {
  name: "teaAddScore",
  components:{
    ElMessage,
    echarts
  },
  data(){
    return{
      cousename:null,
      courseNum:null,
      from: 0,
      classInfo: null,
      stuuuid : null,
      dialogVisible: false,
      reslist: null,
      studentinfo: null,
      dailyscore: 0,
      checkscore: 0,
      examscore: 0,
    }
  },
  computed:{
    sumScore:function(){
      return Math.ceil(this.dailyscore * 0.3 + this.checkscore * 0.2 + this.examscore* 0.5);
    }
  },
  mounted() {

    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('test'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      // xAxis: {
      //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      // },
      xAxis: {
        data: ['数据']
      },
      yAxis: {},
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ],
          radius: '50%'
        }
      ]
    });














    this.classInfo =  JSON.parse(this.$route.query.classInfo);
    this.from =  JSON.parse(this.$route.query.from);
    console.log(this.classInfo);
    console.log(this.from);
    this.cousename = this.classInfo.name;
    this.courseNum = this.classInfo.uuid;
    let data = new FormData();
    data.append("courseuuid", this.courseNum* 1);
    let url = "teacher/selectScoreByCourseID";
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.$cookies.get("token")
      },
    };
    axios.post(url,data,config).then(
      res=>{

        console.log("res")
        console.log(res.data.data);
        this.reslist = res.data.data.score;
        if(this.reslist.length > 0)
        {
          let len = this.reslist.length;
          let url2 = 'student/findByID'
          for(let i = 0; i < len; i++)
          {
            let data2 = new FormData();
            data2.append("id", this.reslist[i].studentuuid);
            axios.post(url2,data2, config).then(
              res=>{
                this.reslist[i].studentinfo = res.data.data;
              }
            )
          }
          console.log(this.reslist);
        }
      }
    )
  //  获取信息，如果从1来可以修改，如果从0来不可以修改

  },
  methods:{
    gototeaAddScore(e)
    {
      //打开添加成绩窗口
      this.dialogVisible = true;
      console.log(e.studentinfo);
      this.studentinfo = e.studentinfo;
      this.sumScore = e.score;
      this.dailyscore = e.dailyscore;
      this.examscore = e.examscore;
      this.checkscore = e.checkscore;
      },
    addscore()
    {
    //  添加成绩
      let url = "teacher/updateScoreByid";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": this.$cookies.get("token")
        },
      };
      let data = new FormData();
      data.append("score", this.sumScore);
      data.append("examscore", this.examscore)
      data.append("dailyscore", this.dailyscore)
      data.append("checkscore", this.checkscore)
      data.append("studentuuid", this.studentinfo.student.uuid)
      data.append("courseuuid", this.courseNum);
      data.append("is_updated",1);
      axios.post(url,data,config).then(
        res=>{
            ElMessage.success("添加成功");
        }
      ).catch(
        err=> {
          ElMessage.error("添加失败");
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
