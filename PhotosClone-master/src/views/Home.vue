<template>
  <div id="Home">

      <Background />
      <Banner/>
  </div>
</template>

<script>
import Banner from '../components/banner/Banner.vue';
import Background from '../components/background/Background.vue';
export default {
    name:"Home",
    components: {Banner,Background},
    mounted:function(){
      let user = localStorage.getItem("user");
      if(user)
      {
        this.$router.push("/dashboard");
      }
    }
}
</script>

<style scoped>



</style>