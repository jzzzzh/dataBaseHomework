<template>

    <div style="height:100%; width:100%; display: flex; align-items: center; justify-content: center;min-height: calc(100vh - 200px); ">
      <div style="text-align: center; ">
        <div style="font-weight: bold; font-size: large">学生选课</div>
      <div style="display: flex;">
          <el-select v-model="value" clearable placeholder="Select" style="margin: 20px 20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="searchValue" style=" margin: 20px 20px"/>
        <el-button style="width: 100px; margin: 20px 20px" @click="search">搜索</el-button>
      </div>
      <div style="text-align: center; width: 1200px">
        <el-table :data="reslist" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="uuid" label="id" width="100" />
          <el-table-column prop="name" label="课程名" width="100" />
          <el-table-column prop="teacher_id" label="老师编号" />
          <el-table-column prop="major" label="专业" />
          <el-table-column prop="max_num" label="最多人数" />
          <el-table-column prop="Compulsory" label="是否必修" />
          <el-table-column prop="credit" label="学分" />
          <el-table-column label="选择" >
            <template #default="scope">
              <el-button @click="goToDetail(scope.row)">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <div>
          <el-button style="margin-top: 20px" @click="update">提交</el-button>
        </div>
      </div>
    </div>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="课程信息"
      width="30%"
      align-center
    >
      <div>
        <el-descriptions title="课程信息" :column="1">
          <el-descriptions-item label="课程名">{{info.name}}</el-descriptions-item>
          <el-descriptions-item label="课程号">{{info.uuid}}</el-descriptions-item>
          <el-descriptions-item label="老师名字">{{ teachername }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{info.major}}</el-descriptions-item>
          <el-descriptions-item label="是否必修">{{info.Compulsory == 1?"是":"否"}}</el-descriptions-item>
          <el-descriptions-item label="学分">{{info.credit}}</el-descriptions-item>
          <el-descriptions-item label="老师评分">{{teacherScore}}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
export default {
  name: "addCourse",
  components:[
    ElMessage
  ],
  data(){
    return{
      value: null,
      select : null,
      searchValue:"",
      centerDialogVisible: false,
      teacherScore: 100,
      options : [
        {
          value: 1,
          label: '课程号',
        },
        {
          value: 2,
          label: '专业',
        },
        {
          value: 3,
          label: '课程名',
        },
        {
          value: 4,
          label: '教师号',
        },
        {
          value: 5,
          label: '教师名',
        }
      ],
      tableData:[
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
      reslist : [],
      info: null,
      teachername: null,
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
  },
  methods:{
    update()
    {
      if(this.select != null)
      {
        let len = this.select.length;
        //console.log(len);
        let url = "student/insertCourseByid";
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": this.$store.state.token
          },
        };
        for(let i = 0; i < len; i++)
        {
          let data = new FormData();
          //console.log(this.$store.state.username);
          data.append("studentuuid",this.$store.state.username);
          data.append("courseuuid",this.select[i].uuid);
          axios.post(url,data,config).then(
            res=>{
              //console.log(res);
              ElMessage.success(this.select[i].name + "提交成功");
            }
          ).catch(
            err=>{
              ElMessage.error(this.select[i].name + "提交失败,请确认是否已经选上");
            }
          )
        }
      }
      else
      {
        ElMessage.error("请选择课程添加");
      }
    },
    handleSelectionChange(val)
    {
      this.select = val;
      //console.log(this.select);
    },
    search()
    {
      if(this.value != null)
      {
        if(this.searchValue != "")
        {
          let data = new FormData();
          let url = "";
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
              "token": this.$store.state.token
            },
          };
            if(this.value == 1)
            {
              //课程号
              data.append("uuid", this.searchValue);
              url = "student/selectCourseBycourseid";
            }
            else if(this.value == 2)
            {
              //专业
              data.append("major", this.searchValue);
              url = "student/selectCourseBymajor";
            }
            else if(this.value == 3)
            {
              //课程名
              data.append("name", this.searchValue);
              url = "student/selectCourseByname";
            }
            else if(this.value == 4)
            {
              //教师号
              data.append("teacher_id", this.searchValue);
              url = "student/selectCourseByteacherID";
            }
            else
            {
              let data2 = new FormData();
              let url2 = "student/selectTeacherByName";
              data2.append('name', this.searchValue);
              axios.post(url2, data2, config).then(
                res=>{
                  //console.log(res.data.data.teachers);
                  let len = res.data.data.teachers.length;
                  //console.log(len + "len");
                  for(let i = 0; i < len; i++) {
                    let data3 = new FormData();
                    data3.append("teacher_id", res.data.data.teachers[i].uuid * 1);
                    url = "student/selectCourseByteacherID";
                    axios.post(url, data3, config).then(
                      res => {
                        //console.log(res);
                        let tmp = this.reslist;
                        let Myreslist = res.data.data.course;
                        //console.log(Myreslist);
                        //console.log(Myreslist.length)
                        if (Myreslist.length == undefined) {
                          tmp.push(Myreslist);
                        } else {
                          let len = Myreslist.length;
                          for (let i = 0; i < len; i++) {
                            tmp.push(Myreslist[i]);
                          }
                        }
                        //console.log(tmp);
                        this.reslist = tmp;
                        //console.log(this.reslist);
                      }
                    ).catch(err => {
                      //console.log(err);
                    })
                  }
                }
              )
            }
            if(this.value != 5) {
              axios.post(url, data, config).then(
                res => {
                  //console.log(res);
                  let tmp = [];
                  let Myreslist = res.data.data.course;
                  //console.log(Myreslist);
                  //console.log(Myreslist.length)
                  if (Myreslist.length == undefined) {
                    tmp.push(Myreslist);
                  } else {
                    let len = Myreslist.length;
                    for (let i = 0; i < len; i++) {
                      tmp.push(Myreslist[i]);
                    }
                  }

                  //console.log(tmp);
                  this.reslist = tmp;
                  //console.log(this.reslist);
                }
              ).catch(err => {
                //console.log(err);
              })
            }
        }
        else
        {
          ElMessage.error("请输入搜索内容");
        }
      }
      else
      {
        ElMessage.error("请选择查询方式");
      }
    },
    goToDetail(e)
    {
      //console.log(e);
      // this.$router.push({
      //   name: 'courseDetail',//页面名字
      //   path:'/courseDetail',//页面路劲 和上面名字任意一个都可以
      //   query: {courseid: JSON.stringify(e)} // 参数传值
      // })
      this.info = e;
      this.centerDialogVisible = true;
      let data = new FormData();
      let url = "teacher/findByID";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": this.$store.state.token
        },
      };
      data.append("id",e.teacher_id*1);
      axios.post(url,data,config).then(
        res=>{
          //console.log(res.data.data.teacher.name);
          this.teachername = res.data.data.teacher.name;
        }
      )
    }
  }
};
</script>

<style scoped>
body{margin: 0; padding: 0 ;}
</style>
