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
            <el-table-column prop="courseuuid" label="id" width="100" />
            <el-table-column prop="courseName" label="学生名字" width="100" />
            <el-table-column prop="bixiu" label="学生性别" />
            <el-table-column prop="credit" label="学生专业" />
            <el-table-column prop="checkscore" label="学生班级" />
            <el-table-column label="选择" width="200">
              <template #default="scope">
                <el-button @click="gototeaAddScore(scope.row)" v-show="this.from == 1">修改成绩</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <div>
      <el-form-item label="课程名">
        <el-input v-model="courseName" />
      </el-form-item>
      <el-form-item label="学生id">
        <el-input v-model="studentuuid" />
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
    </div>
    <el-button type="primary" @click="addscore">发布</el-button>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "teaAddScore",
  data(){
    return{
      cousename:null,
      courseNum:null,
      from: 0,
      classInfo: null,
      stuuuid : null,
      dialogVisible: false
    }
  },
  mounted() {
    this.classInfo =  JSON.parse(this.$route.query.classInfo);
    this.from =  JSON.parse(this.$route.query.from);
    let data = new FormData();
    let url = "";
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.$store.state.token
      },
    };
  //  获取信息，如果从1来可以修改，如果从0来不可以修改

  },
  methods:{
    gototeaAddScore(a)
    {
      //打开添加成绩窗口
      this.dialogVisible = true;
    }
    addscore()
    {
    //  添加成绩
    }
  }
};
</script>

<style scoped>
</style>
