<template>
  <div id="uploadBtn">
    <b-modal
      hide-footer
      hide-header
      v-model="modalShow"
      header-text-variant="primary"
    >
      <h2 class="text-danger">{{error_message}}</h2>
      <b-form @submit="uploadPicture">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          accept="image/*"
          placeholder="Choose an image or drop it here..."
          drop-placeholder="Drop image here..."
          class="addPic"
          required
        ></b-form-file>
        <div class="text-center">
          <img v-bind:src="imgPreview" width="250" alt="" class="my-3 text-center" />
        </div>
        <b-button variant="info" block size="lg" class="my-3" type="submit" v-if="!inProgress"
          >Submit</b-button
        >
        <b-button variant="secondary" block size="lg" class="my-3" v-else
          >Please wait...</b-button
        >
      </b-form>
    </b-modal>
    <b-button
      variant="info"
      size="lg"
      @click="
        () => {
          modalShow = !modalShow;
        }
      "
      ><h1 class="h1"><b-icon-upload></b-icon-upload></h1
    ></b-button>
  </div>
</template>

<script>
export default {
  name: "UploadPic",
  data() {
    return {
      modalShow: false,
      file: null,
      inProgress:false,
      error_message:""
    };
  },
  computed: {
    imgPreview: function () {
      if (this.$data.file) {
        return URL.createObjectURL(this.$data.file);
      }
      return "";
    },
  },
  methods:{
    uploadPicture:function(e){
      e.preventDefault();
      let formdata = new FormData();
      formdata.append("picture",this.$data.file);
      this.$data.inProgress=true;
      this.axios.post("/picture/upload",formdata,{"header":{"Content-Type":"multipart/form-data"}}).then(()=>{
        this.$data.modalShow = false;
        this.$emit("uploadSuccess");
        this.$data.file=null;
      }).catch((err)=>{
        this.$data.error_message = err.message;
      }).finally(()=>{
        this.$data.inProgress=false;
      })
    }
  }
};
</script>

<style scoped>
.custom-file-input .custom-file-label::after {
  content: "Add";
}
#uploadBtn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 4000;
}
</style>