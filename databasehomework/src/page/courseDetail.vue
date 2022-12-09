<template>
  <div>
    ppp
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

</style>
