
<template>
  <div>
    <b-modal
    hide-footer hide-header
      v-model="modalShow"
      header-text-variant="primary"
    >
     <h2 class="h2 text-center text-primary my-0 py-0">{{formType|capitalize}}</h2>
     <h3 class="text-danger">{{error_message}}</h3>
      <b-form class="my-0" @submit="submit" @reset="reset">
        <b-form-group
          v-if="formType=='signup'"
          id="name-group"
          label="Name:"
          label-for="email"
          class="my-0"

        >
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Enter name"
            v-bind:disabled="inProgress"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="email-group"
          label="Email address:"
          label-for="email"
          class="my-0"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            v-bind:disabled="inProgress"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="password-group"
          label="password:"
          label-for="password"
          class="my-0"
        >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            v-bind:disabled="inProgress"
            required
          ></b-form-input>
        </b-form-group>
        <b-button class="mt-3" variant="primary" type="submit" v-show="!inProgress" block>{{formType|capitalize}}</b-button>
        <b-button class="mt-2" variant="danger" type="reset" v-show="!inProgress" block>Cancel</b-button>
        <b-button class="mt-2" variant="secondary" v-show="inProgress" block>Please wait..</b-button>
      </b-form>
    </b-modal>
    <div id="banner">
      <div class="text">One place for all memories</div>
      <div class="get_started">
        <div>
          <b-button class="btn" variant="primary" @click="()=>{this.showModal('login')}">
            Login
          </b-button>
        </div>
        <div>
          <b-button class="btn" variant="primary" @click="()=>{this.showModal('signup')}"> Signup </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton, BModal } from "bootstrap-vue";
export default {
  name: "Banner",
  components: { BButton, BModal },
  filters: {
    capitalize: function (inp) {
      return inp[0].toUpperCase()+inp.substring(1);
    },
  },
  data() {
    return {
      modalShow: false,
      formType: "login",
      form:{email:"",name:"",password:""},
      inProgress:false,
      error_message:""
    };
  },
  methods: {
    showModal: function (formType) {
    this.$data.formType=formType;
      this.$data.modalShow = true;
    },
    submit:function(e){
        e.preventDefault();
        let vm=this;
        this.axios.post("/user/"+this.$data.formType,this.$data.form,{headers:{"Authorization":""}}).then((res)=>{
          vm.$data.error_message="";
          let user = res.data;
          localStorage.setItem("user",JSON.stringify(user));
          vm.axios.defaults.headers.common['Authorization'] = "Token "+user.token;
          vm.$router.push("/dashboard");
        }).catch((err)=>{
          vm.$data.error_message=err.response.data.message;
        }).finally(()=>{
          vm.$data.inProgress=false;
        });
        this.$data.inProgress=true;
    },
    reset:function(e){
        e.preventDefault();
        this.$data.modalShow=false;
        this.$data.form={"name":"","email":"","password":""}
    }
  },
};
</script>

<style scoped>
#banner {
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  min-height: 300px;
}
#banner .text {
  font-family: "Playfair Display", serif;
  background: #2c2b2ccc;
  font-size: 3rem;
  font-weight: bolder;
  margin: 10px;
}

#banner .get_started {
  display: flex;
  justify-content: center;
  align-items: center;
}
#banner .get_started > div {
  margin: 10px 30px 0px 0px;
}
#banner .btn {
  font-size: 1.3rem;
}
</style>