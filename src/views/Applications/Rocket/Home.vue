<template>
  <div class="all">
    <loading-rocket :ShowTitle="title" :style="{display: load}" :class="{'rocket-fadeOut':fadeOut}" @click="isLoading()"></loading-rocket>
    <div id="app" class="main" :style="{display: loaded}" :class="{'rocket-fadeIn':fadeIn}">
      <nav-index></nav-index>

      <section class="banner ">
        <div class="cloud-service section intro-1">
          <div class="container-font">
            <img class="bannerlogo" src="../../../assets/images/ROCKET-banner-logo.png" alt="移动背景">
            <img class="moving-bg" src="../../../assets/images/banner_bot.jpeg" alt="移动背景">
          </div>
        </div>
        <div class="banner_con" style="position: relative;">
          <p class="en-h1"><span>Louis启动台<br>网页级单页面工具与应用程序</span></p>
          <p class="en-p">以跨平台开发技术、定制服务、学习数据库、生产力工具<br>全面赋能生态之力</p>
        </div>
      </section>

      <div>
        <p style="font-size: 25px">你说什么？</p>
      </div>
      <div class="main">
        <img class="banner" style="width: 90%" src="../../../assets/images/IMG_3922@0.5x.jpg" alt="">
        <div>
          <p style="font-size: 25px">李美妮是大笨蛋</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LoadingRocket from '../../../components/LoadingRocket'
import NavIndex from "../../../components/NavIndex";

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
    NavIndex,
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
  @import "../../../assets/css/index_min.css";
  .all {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
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
