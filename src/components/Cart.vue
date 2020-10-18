<template>
  <div>
    <table>
      <tr>
        <th>勾选</th>
        <th>课程名称</th>
        <th>课程价格</th>
        <th>数量</th>
        <th>总价</th>
      </tr>
      <tr v-for="(course,index) in courseItem" :key="course.id">
        <th><input type="checkbox" v-model="course.isActive"></th>
        <th>{{course.name}}</th>
        <th>{{course.price}}</th>
        <th>
          <button @click="minus(index)">-</button>
          {{course.number}}
          <button @click="add(index)">+</button>
        </th>
        <th>{{course.price*course.number}}</th>
      </tr>
      <tr>
        <th></th>
        <th>选中</th>
        <th>{{chooseCourse}}/{{allCourse}}</th>
        <th>总价</th>
        <th>{{sumPrice}}</th>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
        name: "Cart",
        props:['courseItem'],
        methods:{
          minus(index){
            let number = this.courseItem[index].number
            if (number > 1){
              this.courseItem[index].number -= 1
            }
            else {
              this.$emit('removeItem',index)
            }
          },
          add(index){
            this.courseItem[index].number += 1
          }
      },
      computed:{
          chooseCourse(){
            return this.courseItem.filter(course=>course.isActive).length
          },
          allCourse(){
            return this.courseItem.length
          },
          sumPrice(){
            let sum = 0;
            this.courseItem.forEach(course=>{
              if(course.isActive){
                sum += course.price * course.number
              }
            })
            return sum;
          },

      }
    }
</script>

<style scoped>

</style>
