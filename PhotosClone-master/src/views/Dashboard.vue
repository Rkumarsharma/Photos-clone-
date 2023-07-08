<template>
  <div id="dashboard">
    <Header v-bind:name="user.first_name" />
    <div class="picture_wrapper" v-if="!inProgress">
      <Picture
        v-for="picture in pictures"
        :key="picture.id"
        v-bind:uid="picture.id"
        v-bind:image="picture.picture"
        @deleteSuccess="getAllPictues"
      />
    </div>
    <div class="text-center" v-else>
  <b-spinner variant="danger" style="width: 3rem; height: 3rem; margin:20px;" label="Spinning"></b-spinner>
</div>
    <UploadPic @uploadSuccess="getAllPictues"/>
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";
import Picture from "../components/picture/Picture.vue";
import UploadPic from "../components/uploadpic/UploadPic.vue";
export default {
  name: "Dashboard",
  components: { Header, Picture, UploadPic },
  data() {
    return {
      user: {},
      pictures: [],
      inProgress:true,
    };
  },
  methods: {
    getAllPictues: function () {
      this.axios
        .get("/picture/")
        .then((res) => {
          this.$data.inProgress=false;
          this.$data.pictures = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted: function () {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push("/");
    } else {
      this.$data.user = JSON.parse(user);
      this.axios.defaults.headers.common["Authorization"] =
        "Token " + this.$data.user.token;
    }
    this.getAllPictues();
  },
};
</script>

<style scoped>
.picture_wrapper {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 260px);
}
</style>