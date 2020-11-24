<template>
    <nav-index></nav-index>
    <div class="index-main">
        <div class="index-banner-div cloud-service section intro-1">
            <div class="container-font">
                <img class="bannerlogo" src="../assets/images/ROCKET-banner-logo.png" alt="移动背景">
                <img class="moving-bg" style="height: 100vh" src="../assets/images/banner_bot.jpeg" alt="移动背景">
            </div>
        </div>
        <div class="index-content-div banner_con" style="position: relative;">
            <p class="en-h1"><span>Louis启动台<br>网页级单页面工具与应用程序</span></p>
            <p class="en-p">以跨平台开发技术、定制服务、学习数据库、生产力工具<br>全面赋能生态之力</p>
        </div>
    </div>

</template>

<script>
    import NavIndex from "../components/NavIndex";
    export default {
        name: "Index",
        components: {NavIndex}
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/index_min.css";
    .index-main{
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 10%;
    }
    .index-banner-div{
        flex-grow: 1;
    }
    .index-content-div{
        flex-grow: 1;
    }
    .bannerlogo{
        max-width: 900px;
        width: 100%;
    }
</style>
