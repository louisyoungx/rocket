<template>
  <div class="all wrapper">
    <loading-rocket :ShowTitle="title" :style="{display: load}" :class="{'rocket-fadeOut':fadeOut}" @click="isLoading()"></loading-rocket>
    <div id="app" class="container class-container main" :style="{display: loaded}" :class="{'rocket-fadeIn':fadeIn}">
      <h2 class="class-title">180851班青年大学习</h2>
      <!--总结-->
      <div>
        <p>180851班共 {{res.AllNum}} 人，已完成 {{res.DoNum}} 人，未完成 {{res.DontNum}} 人</p>
      </div>
      <div class="class-card-container">
        <!--已完成名单-->
        <div class="card class-card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">已完成</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{res.Time}}</h6>
            <div v-for="member in res.DoMember">
              <p>{{member.index}}-{{member.name}}</p>
            </div>
          </div>
        </div>
        <!--未完成名单-->
        <div  class="card class-card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">未完成</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{res.Time}}</h6>
            <div v-for="member in res.NotMember">
              <p>{{member.index}}-{{member.name}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import $ from 'jquery'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min'
  import BScroll from 'better-scroll'
  import LoadingRocket from '../components/LoadingRocket'
  import Navbar from '../components/Navbar'

  export default {
    name: 'DxxInfo',
    components: { Navbar, LoadingRocket },
    data(){
      return{
        title:"L o a d i n g . . . ",
        enter:false,
        url:"/API/Class/DXXJson/",
        res:"",
        load:'',
        loaded:'none',
        fadeOut:false,
        fadeIn:false,
      }
    },
    mounted () {
      axios.get(this.url).then(res=>{
        console.log(res.data)
        this.res = res.data
        this.enter = true
        this.title = "点 击 进 入"

        this.nextTick(()=>{
          new BScroll('.wrapper', {
            pullUpLoad: true,
            scrollbar: true,
            pullDownRefresh: true
            // and so on
          })
        })
      })
    },
    methods:{
      isLoading() {
        if(this.enter === true) {
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
            }, 1000)
          }, 300)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .all {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{
    background: #fff;
  }
  .class-container{
    margin-top: 10%;
  }
  .class-title{
    margin-bottom: 5%;
  }
  .class-card-container{
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    justify-content: space-around;
    align-items: flex-start;
    align-content: space-around;
  }
  .class-card{
    margin-bottom: 5%;
  }

</style>
