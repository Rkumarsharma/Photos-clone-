<template>
  <div id="header">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-2 d-flex">
          <img src="../../assets/logo.png" class="mr-3" height="50px" alt="Photos"> <h2 class="h2 ml-3">Welcome {{name}}</h2>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-button size="md" class="my-2 my-sm-0" variant="info" @click="logout"
              >Logout</b-button
            >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props:["name"],
  methods:{
      logout:function(){
          if(localStorage.getItem("user"))
          {
              localStorage.removeItem("user");
          }
          let vm = this;
          this.axios.get("/user/logout",{headers:{"Authorization":""}}).then(()=>{
              vm.$router.push("/");
          }).catch(()=>{
              alert("An error occured")
          })
      }
  },
};
</script>

<style>
</style>