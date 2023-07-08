<template>
  <div class="background">
    <div v-for="(fringe, index) in fringes" :key="index">
      <Fringe v-bind:color="fringe.color" v-bind:background="fringe.background" />
    </div>
  </div>
</template>
<script>
import Fringe from "./Fringe.vue";
export default {
  name: "Background",
  components: { Fringe },
  data() {
    return {
      colors: [
        "#0165fc",
        "#3f00ff",
        "#cfff00",
        "#66ff00",
        "#fe6700",
        "#ff7f50",
        "#fe01b1",
        "#8f00f1",
        "#f2013f",
        "#eb5406",
        "#b00149",
        "#001155",
      ],
      keywords:["human","smile","dance","reading","walk","enjoy","play","music"],
      fringes: [],
    };
  },
  methods:{
      keywordsGenerator: function* (index){
          while(index>-1)
          {
              index = (index+1)%this.$data.keywords.length;
              yield index;
          }
      }
  },
  mounted: function () {
    let vm = this;
    let keywordsGen = this.keywordsGenerator(0);
    for (let i = 0; i < 10; i++) {
      vm.$data.fringes.push({ color: vm.$data.colors[parseInt((Math.random() * 10) % vm.$data.colors.length)],"background":"https://source.unsplash.com/300x300/?"+vm.$data.keywords[keywordsGen.next().value]});
    }

    setInterval(() => {
      for (let i = 0; i < (Math.random() * 10) % parseInt(vm.$data.colors.length); i++) {
        vm.$data.fringes.push({
          color:
            vm.$data.colors[
              parseInt((Math.random() * 10) % vm.$data.colors.length)
            ],
            background:"https://source.unsplash.com/300x300/?"+vm.$data.keywords[keywordsGen.next().value]
        });
      }
      for (
        let i = 0;
        i < (Math.random() * 10) % parseInt(vm.$data.colors.length/2);
        i++
      ) {
        vm.$data.fringes.shift();
      }
    }, 20000);
  },
};
</script>

<style scoped>
.background {
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>