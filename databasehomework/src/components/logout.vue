<template>
      <el-button type="danger" @click="logout" text>退出</el-button>
</template>

<script>
export default {
  name: "logout",
  methods:{
    logout(){
      console.log(this.$store.state.token);
      this.$store.commit("logout");
      console.log(this.$store.state.token);
      console.log(this.$cookies.get("token"));
      this.$cookies.remove("token");
      this.$cookies.remove("uuid");
      this.$cookies.remove("model");
      this.$cookies.remove("password");
      console.log(this.$cookies.get("token"));
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>

</style>
