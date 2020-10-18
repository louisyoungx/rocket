<template>
  <loading-rocket :ShowTitle="title" :style="{display: load}" :class="{'rocket-fadeOut':fadeOut}" @click="isLoading()"></loading-rocket>
  <div id="app" class="main" :style="{display: loaded}" :class="{'rocket-fadeIn':fadeIn}">
    <navbar></navbar>
    <div>
      <p style="font-size: 25px">你说什么？</p>
    </div>
    <div class="main">
      <img class="banner" style="width: 90%" src="../assets/images/IMG_3922@0.5x.jpg" alt="">
      <div>
        <p style="font-size: 25px">李美妮是大笨蛋</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '../components/Navbar'
import LoadingRocket from '../components/LoadingRocket'

export default {
  name: 'Home',
  data(){
    return{
      title:'点 击 进 入',
      load:'',
      loaded:'none',
      fadeOut:false,
      fadeIn:false,
    }
  },
  components: {
    Navbar,
    HelloWorld,
    LoadingRocket
  },
  mounted () {
  },
  methods:{
    isLoading() {
      this.fadeOut = true;
      const that = this
      setTimeout(function () {
        that.fadeOut = false;
        that.loaded = '';
        that.fadeIn = true;
        that.load = 'none';
        setTimeout(function () {
          that.fadeIn = false;
          that.load = 'none';
          that.loaded = '';
        },1000)
      },300)
    },
  }
}
</script>
<style lang="scss" scoped>
  .main{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  #app{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .banner{
    img{
      width: 80%;
    }
  }
</style>
