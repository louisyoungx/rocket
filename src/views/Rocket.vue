<template>


  <div class="container class-container">
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
</template>

<script>
  import axios from "axios";
  import $ from 'jquery'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min'
  import LoadingRocket from '../components/LoadingRocket'
  import Navbar from '../components/Navbar'

  export default {
    name: 'Rocket',
    components: { Navbar, LoadingRocket },
    data(){
      return{
        url:"/API/Class/DXXJson/",
        res:"",
      }
    },
    mounted () {
      axios.get(this.url).then(res=>{
        console.log(res.data)
        this.res = res.data
      })
    },
    methods:{
    }
  }
</script>

<style lang="scss" scoped>
  body{
    background: #fff;
  }
  .class-container{
    margin-top: 10%;
  }
  .class-card-container{
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    justify-content: space-around;
    align-items: flex-start;
    align-content: space-around;
  }
  .class-card{}

</style>
