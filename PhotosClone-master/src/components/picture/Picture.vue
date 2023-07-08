<template>
  <div class="pic" @click="showDeleteBtn" @mouseleave="()=>{showContext=false}">
      <img v-bind:src="this.axios.defaults.baseURL+image" alt="">
      <div class="picBtn" v-if="showContext">
            <b-button size="lg" class="my-2 my-sm-0" variant="danger" @click="deletePic"
              >Delete</b-button
            >
            <b-button size="lg" class="my-2 my-sm-0" variant="primary" @click="openInNewTab"
              >View</b-button
            >
      </div>
  </div>
</template>

<script>
export default {
    name:"picture",
    props:['image','uid'],
    data(){
        return{
            showContext:false,
        }
    },
    methods:{
        openInNewTab:function(){
            window.open(this.axios.defaults.baseURL+this.$props.image,"_blank");
        },
        deletePic:function()
        {
            this.axios.delete("/picture/"+this.$props.uid).then(()=>{
                this.$emit("deleteSuccess");
            }).catch((err)=>{console.log(err)})
        },
        showDeleteBtn:function(e){
            e.preventDefault();
            this.$data.showContext=true;
        }

    }
}
</script>

<style scoped>
.pic{
    width: 250px;
    height: 250px;
    margin: 10px;
    box-shadow: 0px 0px 3px 1px rgb(156, 156, 156);
    position: relative;
    transition-duration: 200ms;
}
.pic:hover{
    box-shadow: 0px 0px 5px 2px rgb(156, 156, 156);
    cursor: pointer;
}
.pic img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.pic .picBtn{
    position: relative;
    z-index: 20;
    display: flex;
    justify-content: space-around;
}
</style>