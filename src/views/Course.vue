<template>
  <navbar></navbar>
  <div>
    <div>
      <h1>{{title}}</h1>
      <hr>
      <div>
        <h2>添加课程</h2>
        <div>
          <label>课程名称</label>
          <label>
            <input type="text" v-model="courseInfo.name">
          </label>
        </div>
        <div>
          <label>课程价格</label>
          <label>
            <input type="text" v-model="courseInfo.price">
          </label>
        </div>
        <div>
          <button @click="addCourse">添加课程</button>
        </div>
      </div>
      <hr>
      <div class="course-list">
        <h2>课程列表</h2>
        <table>
          <tr>
            <th>课程列表</th>
            <th>课程价格</th>
            <th>操作</th>
          </tr>
          <tr v-for="(course,index) in courseList" :key="course.id">
            <td>{{course.name}}</td>
            <td>{{course.price}}</td>
            <td><button @click="addCourseCart(index)">添加到购物车</button></td>
          </tr>
        </table>
      </div>
      <hr>
      <div>
        <h2>购物车</h2>
        <cart :courseItem="courseItem" @removeItem="removeItem(index)"></cart>
      </div>
    </div>
  </div>
</template>

<script>
    import Cart from "../components/Cart";
    import Navbar from '../components/Navbar'
    export default {
      name: "t1",
      components: {
        Navbar,
        Cart},
      methods:{
        removeItem(index){
          this.courseItem.splice(index,1)
        },
        addCourse(){
          this.courseList.push(this.courseInfo)
        },
        addCourseCart(index){
          console.log(this.courseList[index]);
          let course = this.courseList[index];
          let isHasCourse = this.courseItem.find(x=>x.id === course.id)
          let number = 1;
          let isActive = true;
          if (isHasCourse != null) {
            isHasCourse.number += 1;
          } else {
            this.courseItem.push({
              ...course,
              number,
              isActive,
            })
          }
        }
      },
      data(){
          return{
            title:'购物车',
            courseInfo:[
              {
                name:'',
                price:'',
              }],
            courseItem:[],
            courseList:[
              {
                id:0,
                name:'web全栈开发师',
                price:'190',
              },
              {
                id:1,
                name:'python人工智能',
                price:'200',
              }
            ]
          }
        },
    }
</script>

<style lang="scss" scoped>
  .course-list{
    margin: auto;
  }
</style>
