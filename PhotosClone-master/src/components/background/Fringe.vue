<template>
  <div>
    <div class="circle" v-bind:style="{background: 'url('+ this.$props.background + ') ' +this.$props.color,boxShadow:'0px 0px 10px 3px '+this.$props.color}"></div>
  </div>
</template>

<script>
export default {
  name: "Fringe",
  props:["color","background"]
};
</script>

<style scoped>
.circle {
  border-radius: 50%;
  background-size: contain;
  width: 30vmin;
  height: 30vmin;
  margin: 10vmin;
  animation-name: randomMotion;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}
.circle:hover{
  cursor: pointer;
}
@keyframes randomMotion {
  0%{
    transform: translate(0%,0%);
  }
  50%{
    transform: translate(100px,-110px) scale(120%,120%);
  }
  100%{
    transform: translate(-100px,-110px) scale(130%,130%);
  }
}
</style>