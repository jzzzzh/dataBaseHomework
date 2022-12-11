<template>
  <div class="main">
      <div>
        <p>
          课程详情
        </p>
      </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "courseDetail",
  data(){
    return{
      item:null,

    }
  },
  mounted() {
    this.item =  JSON.parse(this.$route.query.courseid);
    console.log(this.item);
  }
};
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
