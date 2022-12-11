<template>
  <div>
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
    <el-button type="primary" @click="addnotice">发布</el-button>
  </div>
</template>

<script>
export default {
  name: "teaAddScore"
};
</script>

<style scoped>
</style>
