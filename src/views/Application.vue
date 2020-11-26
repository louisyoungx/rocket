<template>
    <van-nav-bar
        title="应用"
        right-text="分享"
    />
    <div class="apps-main">
        <van-grid clickable :column-num="2">
            <van-grid-item icon="home-o" text="路由跳转" to="/" />
            <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        </van-grid>
    </div>
    <nav-buttom></nav-buttom>
</template>

<script>
    import NavButtom from "../components/NavButtom";
    export default {
        name: "Application",
        components: {NavButtom}
    }
</script>

<style scoped>
    .apps-main{
        display: block;
    }
</style>
