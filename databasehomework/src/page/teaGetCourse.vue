<template>
  <div class="main">
    <div style="text-align: center">
      <div style="font-weight: bold; font-size: large; margin-bottom: 20px">主教师课程</div>
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
                <el-button @click="gototeaAddScore(scope.row, 1)" v-show="scope.row.score == 1">进入</el-button>
                <el-popconfirm title="是否要删除"
                               confirm-button-text="是"
                               cancel-button-text="否"
                               @confirm="deleteCourse(scope.row)">
                  <template #reference>
                    <el-button v-show="scope.row.score == 0" type="danger">删除课程</el-button>
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
export default {
  name: "teaGetCourse",
  data()
  {
    return{

    }
  },
  mounted() {
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
    }
  }
};
</script>

<style scoped>

</style>
