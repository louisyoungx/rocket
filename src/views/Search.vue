<template>
    <div class="search-main">
        <div id="bodyBox" @click="bodyClick()">
            <video id="liveBgBox" autoplay="true" loop="true" muted="true"></video>
            <img class="bgbox" id="bgbox" :class="{'focus':courseFocus, 'focusCourse':boxFocus}" alt="" src="../assets/images/search-bg.jpg" style="display: block; opacity: 1;">
            <div class="cover" id="cover" style="opacity: 1;"></div>
            <div class="title" id="title" :class="{'title-move':boxFocus, 'none':courseFocus}">
                <h1 id="titleText">12:44</h1>
            </div>
            <div id="searchOptBox" class="">
                <span class="searchOpt selected" id="baiduSearchOpt">
                    <i class="iconfont" id="iconBaidu">Baidu</i>
                </span>
                <span class="searchOpt" id="bingSearchOpt">
                    <i class="iconfont" id="iconBing">Bing</i>
                </span>
                <span class="searchOpt" id="googleSearchOpt">
                    <i class="iconfont" id="iconGoogle">Google</i>
                </span>
            </div>
            <form id="form" action="https://www.baidu.com/baidu" target="_blank">
                <label for="input0">
                    <input type="text" class="input ypoctonod" @click="inputClick()" :class="{'none':courseFocus}" id="input0" name="word" size="30" placeholder="Search" autocomplete="off" style="opacity: 1;">
                </label>
            </form>
            <div class="keyword" id="keyword" style="height: auto; opacity: 0; display: none;"></div>
            <div class="quotebox waves-effect waves-light hide" id="quotebox" style="z-index: 1; animation: 0s ease 0s 1 normal none running none;">
                <span class="quote-bg"></span>
                <p class="quote-content" id="quoteContent"></p>
                <p class="quote-author" id="quoteAuthor"></p>
                <span id="btnAddQuoteToNote" role="button" tabindex="0"><i class="iconfont" id="iconAddQuoteToNote"></i><span id="txtAddQuoteToNote"> 收藏到便笺</span></span>
            </div>
            <ul class="course" :class="{'course-click':courseStatus, 'none':boxFocus}"  @click="courseClick()">
                <li class="course-iten-first"></li>
                <li class="course-item">
                    <p class="course-item-name">{{course.name}}</p>
                    <!--<p class="course-item-teacher">{{course.teacher}}</p>-->
                    <div class="course-item-div">
                        <h3 class="course-item-time" style="width: 100%">{{course.time}}</h3>
                        <h3 class="course-item-classroom" style="width: 100%">{{course.classroom}}</h3>
                    </div>
                </li>
                <hr>
                <li class="course-item" v-for="one in todayCourses">
                    <p class="course-item-name">{{one.课程[0].课程名}}</p>
                    <!--<p class="course-item-teacher">{{course.teacher}}</p>-->
                    <div class="course-item-div">
                        <h3 class="course-item-time" style="width: 100%">{{one.课程[0].教师}}</h3>
                        <h3 class="course-item-classroom" style="width: 100%">{{one.课程[0].教室}}</h3>
                    </div>
                </li>
            </ul>

        </div>
    </div>
    <nav-buttom></nav-buttom>
</template>

<script>
    import NavButtom from "../components/NavButtom";
    import axios from "axios";
    export default {
        name: "Search",
        components: {NavButtom},
        data(){
            return{
                boxFocus: false,
                courseFocus: false,
                focus: false,
                courseStatus:false,
                url: '/API/Class/CourseJson/Louis/',
                courseList: [],
                course: {
                    name: '',
                    teacher: '',
                    classroom: '',
                    time: '',
                },
                todayCourses:[],
                timeInfo: [
                    "8:00-9:40",
                    "8:00-9:40",
                    "10:00-11:40",
                    "10:00-11:40",
                    "13:30-15:10",
                    "13:30-15:10",
                    "16:30-18:30",
                    "16:30-18:30"
                ],
            }
        },
        mounted() {
            const date = new Date()
            const week = date.getDay()
            const hour = date.getHours()
            const min = date.getMinutes()
            let which = this.whichCourse(hour, min);
            // console.log(week, hour, min);
            axios.get(this.url).then(res => {
                console.log(res.data);
                let Res  = res.data;
                let courseInfo = res.data[week-1].节次;
                this.todayCourses = courseInfo;

                /*
                for (let i = 0; i < this.course.length; i++){
                    console.log(this.course[i]);
                }
                */
                // which = 3;
                let course = null;
                const result = courseInfo.filter(function (item, index, array) {
                    // console.log(item, index)
                    if (parseInt(item.节次名) === which) {
                        course = item.课程[0];
                    }
                });
                if (course == null && week !== 7){
                    course = Res[week].节次[0].课程[0]
                    which = parseInt(Res[week].节次[0].节次名)
                    Res = null;
                }
                this.courseList = course;
                course = null;
                this.course.name = this.courseList.课程名
                this.course.teacher = this.courseList.教师
                this.course.classroom = this.courseList.教室
                this.course.time = this.timeInfo[which]
                // console.log(this.courseList);
                console.log(this.course);
                console.log(this.todayCourses[0].课程[0].课程名);
            })

            // console.log(typeof this.course);



        },
        methods:{
            whichCourse(hour, min=0){
                if (hour >= 0 && hour < 8){
                    return 1;
                }
                else if(hour >=8 && hour <10) {
                    return 3;
                }
                else if(hour >=10 && hour <14) {
                    return 5;
                }
                else if(hour >=14 && hour <16) {
                    return 7;
                }
                else if(hour >=19 && hour <24) {
                    return 0;
                }
            },
            bodyClick() {
                if (this.focus === true){
                    this.boxFocus = false;
                    this.focus = false;
                }
            },
            inputClick() {
                this.boxFocus =  true;
                const that = this;
                setTimeout(function (){
                    that.focus = true;
                }, 100);
            },
            courseClick() {
                this.courseFocus =  !this.courseFocus;
                this.courseStatus = !this.courseStatus;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/search-main.css";

    @media screen and (max-width: 600px){
        .title-move {
            position: absolute;
            margin-top: 10vh;
            font-size: 10vw;
        }
        .input:hover{
            left: 10%;
            top: 30vh;
            width: 80%;
        }
        .course{
            width: 90% !important;
        }
        .course-item-name{
            width: 100%;
            font-size: 6vw !important;
            white-space:nowrap;
        }
        .course-item-time .course-item-classroom{
            white-space:nowrap !important;
            font-size: 4vw !important;
            width: 100% !important;
            p {
                width: 100% !important;
            }
        }
    }
/*    .search-main{
        position: absolute;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        justify-items: center;
    }*/
    .focusCourse{
        filter: blur(10px);
    }
    .none{
        display: none;
        opacity: 0;
    }
    .course{
        margin: 0 auto;
        opacity: 0.5;
        position: relative;
        top:85%;
        background-color: white;
        width: 50%;
        height: 50%;
        border-radius: 5vw;
        transition: all 0.25s;
        transition-property: all;
        transition-duration: 0.25s;
        transition-timing-function: ease;
        transition-delay: 0s;
        h1 {
            color: black !important;
        }
    }
    .course-click{
        top: 20% !important;
        border-radius: 10vw;
    }
    .course-iten-first{
        height: 1px;
        width: 100%;
    }
    .course-item{
        margin: 5vw;
        display: flex;
        flex-wrap: nowrap;
        h3{
            float:right;
            text-align: right;
        }
    }

    .course-item-div{
        display: flex;
        justify-content: right;
        flex-wrap: wrap;
        opacity: 0.8;
    }

    .course-item-name{
        width: 60%;
        font-size: 30px;
        white-space:nowrap;
    }
    .course-item-time .course-item-classroom{
        white-space:nowrap !important;
        font-size: 50px;
        width: 100% !important;
        p {
            width: 100% !important;
        }
    }
</style>
