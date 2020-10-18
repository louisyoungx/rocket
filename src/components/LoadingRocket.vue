<template>
  <div class="rocket-container">
    <div class="rocket-img">
      <img src="../assets/images/rocket.png" alt="火箭">
    </div>
    <i v-for="light in lights" :style="{ height:light.height + 'px', left:light.left + 'vw', animationDuration:light.time + 's' }"></i>
    <div>
      <p class="rocket-title rocket-flare">{{ShowTitle}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    'name': 'LoadingRocket',
    props:['ShowTitle'],
    data(){
      return{
        lights:[],
      }
    },
    mounted () {
      let num = 40;
      for (let i=0; i<num; i++){
        //create element i
        this.lights.push({
          height: this.rand(1, 40),
          left: this.rand(1, 99),
          time: this.rand(5, 30)/10,
        })
      }
    },
    methods: {
      rand(m,n){
        return Math.ceil(Math.random() * (n-m+1)) + m - 1;
      }
    },
  }
</script>

<style scoped>
  @import "../assets/css/rocket.css";
  body{
    background: rgb(0,2,19);
  }
</style>
