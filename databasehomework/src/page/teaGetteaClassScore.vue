<template>
  <div class="main">
    <div style="text-align: center">
      <div>课程评价</div>
      <div style="margin-top: 20px">
        平均分:{{ave}}
      </div>
    <div style="text-align: center; width:100%; margin-top: 10px">
      <el-table :data="reslist" stripe style="width: 800px" height="250">
        <el-table-column prop="detail" label="评价" width="500" />
        <el-table-column prop="score" label="分数" />
      </el-table>
    </div>
      <div style="display: flex; width: 100%; height: 400px;justify-content: center ">
        <div
          id="test"
          style="width: 300px; height: 300px; margin-top: 20px;"
        ></div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "teaGetClassScore",
  data(){
    return{
      classInfo: null,
      reslist: null,
      ave: 100,
      lllist: [],
      less20: 0,
      less40: 0,
      less60: 0,
      less80: 0,
      less100: 0,
    }
  },
  mounted() {
    this.classInfo =  JSON.parse(this.$route.query.classInfo);
    //console.log(this.classInfo);
    let sum = 0;
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
        let ll = res.data.data.tsList;
        // console.log(ll)
        for(let j = 0; j < ll.length; j++)
        {
          let i = ll[j];
          sum += i.score;
          // console.log(i.score)
          if(i.score <= 20)
          {
            this.less20 = this.less20 + 1;
          }
          else if(i.score <= 40 && i.score > 20)
          {
            this.less40 = this.less40 +1;
          }
          else if(i.score <= 60&&i.score > 40)
          {
            this.less60 =  this.less60 +1;
          }
          else if(i.score <= 80&&i.score > 60)
          {
            this.less80 =  this.less80 +1;
          }
          else if(i.score <= 100 && i.score > 80)
          {
            this.less100 =  this.less100 +1;
          }
          this.lllist.push(i.score);
        }
        if(ll.length > 0) {
          this.ave = sum / ll.length
        }
        this.reslist = res.data.data.tsList;
        let myChart = echarts.init(document.getElementById("test"));
        myChart.setOption({
          title: {
            text: "评价成绩分布"
          },
          tooltip: {},
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              type: "pie",
              data: [
                {
                  value: this.less20,
                  name: "一星差评"
                },
                {
                  value: this.less40,
                  name: "两星较差"
                },
                {
                  value: this.less60,
                  name: "三星一般"
                },
                {
                  value: this.less80,
                  name: "四星不错"
                },
                {
                  value: this.less100,
                  name: "五星很好"
                }
              ],
              radius: "50%"
            }
          ]
        });
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
