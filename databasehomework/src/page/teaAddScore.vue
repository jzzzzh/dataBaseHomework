<template>
  <div class="main">
    <div style="text-align: center">
      <div style="font-weight: bold; font-size: large; margin-bottom: 20px">
        课程
      </div>
      <div>课程名：{{ cousename }}</div>
      <div>课程号：{{ courseNum }}</div>
      <div>
        <div style="text-align: center; width: 1200px">
          <el-table :data="reslist" stripe style="width: 100%">
            <el-table-column
              prop="studentinfo.student.uuid"
              label="id"
              width="100"
            />
            <el-table-column
              prop="studentinfo.student.name"
              label="学生名字"
              width="100"
            />
            <el-table-column prop="studentinfo.student.sex" label="学生性别" />
            <el-table-column
              prop="studentinfo.student.major"
              label="学生专业"
            />
            <el-table-column
              prop="studentinfo.student.class_num"
              label="学生班级"
            />
            <el-table-column prop="dailyscore" label="平时成绩" />
            <el-table-column prop="checkscore" label="考勤成绩" />
            <el-table-column prop="examscore" label="考试成绩" />
            <el-table-column prop="score" label="总成绩" />
            <el-table-column label="选择" width="200">
              <template #default="scope">
                <el-button
                  @click="gototeaAddScore(scope.row)"
                  v-show="this.from == 1"
                  >修改成绩</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div
            id="test"
            style="width: 300px; height: 300px"
            v-show="value == 1"
          ></div>
          <div
            id="test2"
            style="width: 300px; height: 300px"
            v-show="value == 2"
          ></div>
          <div
            id="test3"
            style="width: 300px; height: 300px"
            v-show="value == 3"
          ></div>
          <div
            id="test4"
            style="width: 300px; height: 300px"
            v-show="value == 4"
          ></div>
        </div>
        <div>
          <div
            id="quan"
            style="width: 300px; height: 300px"
            v-show="value == 1"
          ></div>
          <div
            id="quan2"
            style="width: 300px; height: 300px"
            v-show="value == 2"
          ></div>
          <div
            id="quan3"
            style="width: 300px; height: 300px"
            v-show="value == 3"
          ></div>
          <div
            id="quan4"
            style="width: 300px; height: 300px"
            v-show="value == 4"
          ></div>
        </div>
        <div>
          <div
            id="zhu"
            style="width: 100%; height: 300px"
            v-show="value == 1"
          ></div>
          <div
            id="zhu2"
            style="width: 100%; height: 300px"
            v-show="value == 2"
          ></div>
          <div
            id="zhu3"
            style="width: 100%; height: 300px"
            v-show="value == 3"
          ></div>
          <div
            id="zhu4"
            style="width: 100%; height: 300px"
            v-show="value == 4"
          ></div>
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
        {{ studentinfo.student.uuid }}
      </el-form-item>
      <el-form-item label="学生姓名"
        >{{ studentinfo.student.name }}
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
        {{ sumScore }}
      </el-form-item>
    </div>
    <el-button type="primary" @click="addscore">发布</el-button>
    <el-button type="danger" @click="this.dialogVisible = faLSE"
      >关闭</el-button
    >
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
export default {
  name: "teaAddScore",
  components: {
    ElMessage,
    echarts
  },
  data() {
    return {
      cousename: null,
      courseNum: null,
      from: 0,
      classInfo: null,
      stuuuid: null,
      dialogVisible: false,
      reslist: null,
      studentinfo: null,
      dailyscore: 0,
      checkscore: 0,
      examscore: 0,
      avergSumScore: 0,
      avergCheckScore: 0,
      avergExamScore: 0,
      avergDailyScore: 0,
      upperExamScoreNum: 100,
      lowerExamScoreNum: 50,
      upperDailyScoreNum: 100,
      lowerDailyScoreNum: 50,
      upperCheckScoreNum: 100,
      lowerCheckScoreNum: 50,
      upperScoreNum: 100,
      lowerScoreNum: 50,
      //考试成绩分布
      lower60ExamScoreNum: 120,
      upper60ExamScoreNum: 120,
      upper70ExamScoreNum: 120,
      upper80ExamScoreNum: 120,
      upper90ExamScoreNum: 120,
      //daily成绩分布
      lower60DailyScoreNum: 120,
      upper60DailyScoreNum: 120,
      upper70DailyScoreNum: 120,
      upper80DailyScoreNum: 120,
      upper90DailyScoreNum: 120,
      //check成绩分布
      lower60CheckScoreNum: 120,
      upper60CheckScoreNum: 120,
      upper70CheckScoreNum: 120,
      upper80CheckScoreNum: 120,
      upper90CheckScoreNum: 120,
      //总成绩分布
      lower60ScoreNum: 120,
      upper60ScoreNum: 120,
      upper70ScoreNum: 120,
      upper80ScoreNum: 120,
      upper90ScoreNum: 120,
      value: 1,
      SumExamList: [],
      nameList: [],
      ExamList: [],
      DailyExamList: [],
      CheckExamList: [],
      ExamListAver: 0,
      DailyExamListAver: 0,
      CheckExamListAver: 0,
      SumExamListAver: 0,
      upperAverage: [
        {
          value: 335,
          name: "直接访问"
        },
        {
          value: 234,
          name: "联盟广告"
        },
        {
          value: 1548,
          name: "搜索引擎"
        }
      ]
    };
  },
  computed: {
    sumScore: function () {
      return Math.ceil(
        this.dailyscore * 0.3 + this.checkscore * 0.2 + this.examscore * 0.5
      );
    }
  },
  mounted() {
    this.classInfo = JSON.parse(this.$route.query.classInfo);
    this.from = JSON.parse(this.$route.query.from);
    console.log(this.classInfo);
    console.log(this.from);
    this.cousename = this.classInfo.name;
    this.courseNum = this.classInfo.uuid;
    let data = new FormData();
    data.append("courseuuid", this.courseNum * 1);
    let url = "teacher/selectScoreByCourseID";
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: this.$cookies.get("token")
      }
    };
    axios
      .post(url, data, config)
      .then((res) => {
        console.log("res");
        console.log(res.data.data);
        this.reslist = res.data.data.score;
        if (this.reslist.length > 0) {
          let len = this.reslist.length;
          let url2 = "student/findByID";
          for (let i = 0; i < len; i++) {
            let data2 = new FormData();
            data2.append("id", this.reslist[i].studentuuid);
            axios.post(url2, data2, config).then((res) => {
              this.reslist[i].studentinfo = res.data.data;
            });
          }
          console.log(this.reslist);
        }
      })
      .then((res) => {
        this.calAverage();
        //  获取信息，如果从1来可以修改，如果从0来不可以修改

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("test"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "总成绩分布"
          },
          tooltip: {},
          // xAxis: {
          //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          // },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              type: "pie",
              data: [
                {
                  value: this.upperScoreNum,
                  name: "高于平均分"
                },
                {
                  value: this.lowerScoreNum,
                  name: "低于平均分"
                }
              ],
              radius: "50%"
            }
          ]
        });

        let myChart2 = echarts.init(document.getElementById("test2"));
        // 绘制图表
        myChart2.setOption({
          title: {
            text: "平时成绩分布"
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
                  value: this.upperDailyScoreNum,
                  name: "高于平均分"
                },
                {
                  value: this.lowerDailyScoreNum,
                  name: "低于平均分"
                }
              ],
              radius: "50%"
            }
          ]
        });

        let myChart3 = echarts.init(document.getElementById("test3"));
        // 绘制图表
        myChart3.setOption({
          title: {
            text: "出勤成绩分布"
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
                  value: this.upperCheckScoreNum,
                  name: "高于平均分"
                },
                {
                  value: this.lowerCheckScoreNum,
                  name: "低于平均分"
                }
              ],
              radius: "50%"
            }
          ]
        });

        let myChart4 = echarts.init(document.getElementById("test4"));
        // 绘制图表
        myChart4.setOption({
          title: {
            text: "考试成绩分布"
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
                  value: this.upperExamScoreNum,
                  name: "高于平均分"
                },
                {
                  value: this.lowerExamScoreNum,
                  name: "低于平均分"
                }
              ],
              radius: "50%"
            }
          ]
        });

        let zhuChart = echarts.init(document.getElementById("zhu"));
        zhuChart.setOption({
          title: {
            text: "总成绩柱状图"
          },
          xAxis: {
            data: this.nameList
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: this.SumExamList,
              radius: "50%"
            }
          ]
        });

        let zhuChart2 = echarts.init(document.getElementById("zhu2"));
        zhuChart2.setOption({
          title: {
            text: "考试成绩柱状图"
          },
          xAxis: {
            data: this.nameList
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: this.ExamList,
              radius: "50%"
            }
          ]
        });

        let zhuChart3 = echarts.init(document.getElementById("zhu3"));
        zhuChart3.setOption({
          title: {
            text: "出勤成绩柱状图"
          },
          xAxis: {
            data: this.nameList
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: this.DailyExamList,
              radius: "50%"
            }
          ]
        });

        let zhuChart4 = echarts.init(document.getElementById("zhu4"));
        zhuChart4.setOption({
          title: {
            text: "日常成绩柱状图"
          },
          xAxis: {
            data: this.nameList
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: this.DailyExamList,
              radius: "50%"
            }
          ]
        });

        let quanChart = echarts.init(document.getElementById("quan"));
        quanChart.setOption({
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "5%",
            left: "center"
          },
          series: [
            {
              name: "成绩分布",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: lower60ScoreNum, name: "60分以下" },
                { value: upper60ScoreNum, name: "60-70" },
                { value: upper70ScoreNum, name: "70-80" },
                { value: upper80ScoreNum, name: "80-90" },
                { value: upper90ScoreNum, name: "90分以上" }
              ]
            }
          ]
        });
        
        let quanChart2 = echarts.init(document.getElementById("quan2"));
        quanChart2.setOption({
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "5%",
            left: "center"
          },
          series: [
            {
              name: "考试成绩分布",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: lower60ExamScoreNum, name: "60分以下" },
                { value: upper60ExamScoreNum, name: "60-70" },
                { value: upper70ExamScoreNum, name: "70-80" },
                { value: upper80ExamScoreNum, name: "80-90" },
                { value: upper90ExamScoreNum, name: "90分以上" }
              ]
            }
          ]
        });

        let quanChart3= echarts.init(document.getElementById("quan3"));
        quanChart3.setOption({
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "5%",
            left: "center"
          },
          series: [
            {
              name: "出勤成绩分布",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: lower60CheckScoreNum, name: "60分以下" },
                { value: upper60CheckScoreNum, name: "60-70" },
                { value: upper70CheckScoreNum, name: "70-80" },
                { value: upper80CheckScoreNum, name: "80-90" },
                { value: upper90CheckScoreNum, name: "90分以上" }
              ]
            }
          ]
        });

        let quanChart4 = echarts.init(document.getElementById("quan4"));
        quanChart4.setOption({
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "5%",
            left: "center"
          },
          series: [
            {
              name: "日常成绩分布",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: lower60DailyScoreNum, name: "60分以下" },
                { value: upper60DailyScoreNum, name: "60-70" },
                { value: upper70DailyScoreNum, name: "70-80" },
                { value: upper80DailyScoreNum, name: "80-90" },
                { value: upper90DailyScoreNum, name: "90分以上" }
              ]
            }
          ]
        });
      });
  },
  methods: {
    calAverage() {
      //算平均分，最高分，最低分
      console.log("cal");
      console.log(this.reslist);
      let t = this.reslist;
      let len = t.length;
      let sumsum = 0;
      let sumDaily = 0;
      let sumCheck = 0;
      let sumExam = 0;
      if (len > 0) {
        for (
          let i = 0;
          i < len;
          i++ //算各种成绩总和，求平均
        ) {
          console.log(this.reslist[i].student);
          this.nameList.push(this.reslist[i].studentinfo.student.name);
          this.ExamList.push(this.reslist[i].examscore);
          this.SumExamList.push(this.reslist[i].score);
          this.DailyExamList.push(this.reslist[i].dailyscore);
          this.CheckExamList.push(this.reslist[i].checkscore);
          sumsum += this.reslist[i].score;
          sumDaily += this.reslist[i].dailyscore;
          sumCheck += this.reslist[i].checkscore;
          sumExam += this.reslist[i].examscore;
        }
        this.SumExamListAver = Math.floor(sumsum / len);
        this.DailyExamListAver = Math.floor(sumDaily / len);
        this.CheckExamListAver = Math.floor(sumCheck / len);
        this.ExamListAver = Math.floor(sumExam / len);
        console.log(this.SumExamListAver);
        console.log(this.DailyExamListAver);
        console.log(this.CheckExamListAver);
        console.log(this.ExamListAver);
        //高于和低于平均分
        let upperexamnum = 0;
        let lowerexamnum = 0;
        let upperdailynum = 0;
        let lowerdailynum = 0;
        let upperchecknum = 0;
        let lowerchecknum = 0;
        let uppernum = 0;
        let lowernum = 0;
        //考试成绩分布
        let lowerexam60num = 0;
        let upperexam60num = 0;
        let upperexam70num = 0;
        let upperexam80num = 0;
        let upperexam90num = 0;
        //daily成绩分布
        let lowerdaily60num = 0;
        let upperdaily60num = 0;
        let upperdaily70num = 0;
        let upperdaily80num = 0;
        let upperdaily90num = 0;
        //check成绩分布
        let lowercheck60num = 0;
        let uppercheck60num = 0;
        let uppercheck70num = 0;
        let uppercheck80num = 0;
        let uppercheck90num = 0;
        //总成绩分布
        let lower60num = 0;
        let upper60num = 0;
        let upper70num = 0;
        let upper80num = 0;
        let upper90num = 0;

        for (
          let i = 0;
          i < len;
          i++ //大于考试平均分人数
        ) {
          if (this.reslist[i].examscore >= this.ExamListAver) {
            upperexamnum += 1;
          } else {
            lowerexamnum += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //大于daily平均分人数
        ) {
          if (this.reslist[i].dailyscore >= this.DailyExamListAver) {
            upperdailynum += 1;
          } else {
            lowerdailynum += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //大于check平均分人数
        ) {
          if (this.reslist[i].checkscore >= this.CheckExamListAver) {
            upperchecknum += 1;
          } else {
            lowerchecknum += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //大于score平均分人数
        ) {
          if (this.reslist[i].score >= this.SumExamListAver) {
            uppernum += 1;
          } else {
            lowernum += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //考试大于60分人数,各分数段人数
        ) {
          if (this.reslist[i].examscore < 60) {
            lowerexam60num += 1;
          } else if (
            this.reslist[i].examscore < 70 &&
            this.reslist[i].examscore >= 60
          ) {
            upperexam60num += 1;
          } else if (
            this.reslist[i].examscore < 80 &&
            this.reslist[i].examscore >= 70
          ) {
            upperexam70num += 1;
          } else if (
            this.reslist[i].examscore < 90 &&
            this.reslist[i].examscore >= 80
          ) {
            upperexam80num += 1;
          } else if (
            this.reslist[i].examscore <= 100 &&
            this.reslist[i].examscore >= 90
          ) {
            upperexam90num += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //总成绩大于60分人数,各分数段人数
        ) {
          if (this.reslist[i].score < 60) {
            lower60num += 1;
          } else if (
            this.reslist[i].score < 70 &&
            this.reslist[i].score >= 60
          ) {
            upper60num += 1;
          } else if (
            this.reslist[i].score < 80 &&
            this.reslist[i].score >= 70
          ) {
            upper70num += 1;
          } else if (
            this.reslist[i].score < 90 &&
            this.reslist[i].score >= 80
          ) {
            upper80num += 1;
          } else if (
            this.reslist[i].score <= 100 &&
            this.reslist[i].score >= 90
          ) {
            upper90num += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //daily大于60分人数,各分数段人数
        ) {
          if (this.reslist[i].dailyscore < 60) {
            lowerdaily60num += 1;
          } else if (
            this.reslist[i].dailyscore < 70 &&
            this.reslist[i].dailyscore >= 60
          ) {
            upperdaily60num += 1;
          } else if (
            this.reslist[i].dailyscore < 80 &&
            this.reslist[i].dailyscore >= 70
          ) {
            upperdaily70num += 1;
          } else if (
            this.reslist[i].dailyscore < 90 &&
            this.reslist[i].dailyscore >= 80
          ) {
            upperdaily80num += 1;
          } else if (
            this.reslist[i].dailyscore <= 100 &&
            this.reslist[i].dailyscore >= 90
          ) {
            upperdaily90num += 1;
          }
        }

        for (
          let i = 0;
          i < len;
          i++ //check大于60分人数,各分数段人数
        ) {
          if (this.reslist[i].checkscore < 60) {
            lowercheck60num += 1;
          } else if (
            this.reslist[i].checkscore < 70 &&
            this.reslist[i].checkscore >= 60
          ) {
            uppercheck60num += 1;
          } else if (
            this.reslist[i].checkscore < 80 &&
            this.reslist[i].checkscore >= 70
          ) {
            uppercheck70num += 1;
          } else if (
            this.reslist[i].checkscore < 90 &&
            this.reslist[i].checkscore >= 80
          ) {
            uppercheck80num += 1;
          } else if (
            this.reslist[i].checkscore <= 100 &&
            this.reslist[i].checkscore >= 90
          ) {
            uppercheck90num += 1;
          }
        }
        this.upperExamScoreNum = upperexamnum; //考试成绩
        this.lowerExamScoreNum = lowerexamnum;
        this.upperDailyScoreNum = upperdailynum; //daily成绩
        this.lowerDailyScoreNum = lowerdailynum;
        this.upperCheckScoreNum = upperchecknum; //check成绩
        this.lowerCheckScoreNum = lowerchecknum;
        this.upperScoreNum = uppernum; //总成绩
        this.lowerScoreNum = lowernum;
        //考试成绩分布
        this.lower60ExamScoreNum = lowerexam60num;
        this.upper60ExamScoreNum = upperexam60num;
        this.upper70ExamScoreNum = upperexam70num;
        this.upper80ExamScoreNum = upperexam80num;
        this.upper90ExamScoreNum = upperexam90num;
        //daily成绩分布
        this.lower60DailyScoreNum = lowerdaily60num;
        this.upper60DailyScoreNum = upperdaily60num;
        this.upper70DailyScoreNum = upperdaily70num;
        this.upper80DailyScoreNum = upperdaily80num;
        this.upper90DailyScoreNum = upperdaily90num;
        //check成绩分布
        this.lower60CheckScoreNum = lowercheck60num;
        this.upper60CheckScoreNum = uppercheck60num;
        this.upper70CheckScoreNum = uppercheck70num;
        this.upper80CheckScoreNum = uppercheck80num;
        this.upper90CheckScoreNum = uppercheck90num;
        //总成绩分布
        this.lower60ScoreNum = lower60num;
        this.upper60ScoreNum = upper60num;
        this.upper70ScoreNum = upper70num;
        this.upper80ScoreNum = upper80num;
        this.upper90ScoreNum = upper90num;
        //select
        //30.60.80.90
        // v-if="num == 1"
        //平均分
        //成绩图
      }
    },
    gototeaAddScore(e) {
      //打开添加成绩窗口
      this.dialogVisible = true;
      console.log(e.studentinfo);
      this.studentinfo = e.studentinfo;
      this.sumScore = e.score;
      this.dailyscore = e.dailyscore;
      this.examscore = e.examscore;
      this.checkscore = e.checkscore;
    },
    addscore() {
      //  添加成绩
      let url = "teacher/updateScoreByid";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: this.$cookies.get("token")
        }
      };
      let data = new FormData();
      data.append("score", this.sumScore);
      data.append("examscore", this.examscore);
      data.append("dailyscore", this.dailyscore);
      data.append("checkscore", this.checkscore);
      data.append("studentuuid", this.studentinfo.student.uuid);
      data.append("courseuuid", this.courseNum);
      data.append("is_updated", 1);
      axios
        .post(url, data, config)
        .then((res) => {
          ElMessage.success("添加成功");
        })
        .catch((err) => {
          ElMessage.error("添加失败");
        });
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}
</style>
