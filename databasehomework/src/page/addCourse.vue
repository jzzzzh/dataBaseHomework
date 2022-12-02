<template>
    <div style="height:100%; width:100%; display: flex; align-items: center; justify-content: center;min-height: calc(100vh - 200px); ">
      <div style="text-align: center; ">
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
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="id" width="100" />
          <el-table-column prop="name" label="课程名" width="100" />
          <el-table-column prop="address" label="老师编号" />
          <el-table-column prop="address" label="专业" />
          <el-table-column prop="address" label="最多人数" />
          <el-table-column prop="address" label="是否必修" />
          <el-table-column prop="address" label="学分" />
          <el-table-column label="选择" >
            <template #default="scope">
              <el-button @click="goToDetail(scope.row)">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      </div>
    </div>
  <div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addCourse",
  data(){
    return{
      value: null,
      searchValue:"",
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
      reslist : null
    }
  },
  mounted() {
  },
  methods:{
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
            if(value == 1)
            {
              //课程号
              data.append()

            }
            else if(value == 2)
            {
              //专业
            }
            else if(value == 3)
            {
              //课程名
            }
            else
            {
              //教师号
            }
            axios.post(url,data,config).then(
              res=>{
                this.reslist = res.data.data;
                console.log(this.reslist);
              }
            ).catch(err=>{
              console.log(err);
            })
        }
        else
        {
          alert("请输入搜索内容");
        }
      }
      else
      {
        alert("请选择查询方式");
      }
    },
    goToDetail(e)
    {
      console.log(e);
      this.$router.push({
        name: 'courseDetail',//页面名字
        path:'/courseDetail',//页面路劲 和上面名字任意一个都可以
        query: {courseid: JSON.stringify(e)} // 参数传值
      })
    }
  }
};
</script>

<style scoped>
body{margin: 0; padding: 0 ;}
</style>
