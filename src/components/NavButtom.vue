<template>
    <van-tabbar route z-index="10000" class="index-nav-buttom">
        <van-tabbar-item replace to="/Index" name="home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/Application" name="apps" icon="apps-o">应用</van-tabbar-item>
        <van-tabbar-item replace to="/Gate/Index" name="friends" icon="chart-trending-o">云锁</van-tabbar-item>
        <van-tabbar-item replace to="/" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "NavButtom"
    }
</script>

<style scoped>
    .index-nav-buttom{
        display: none;
    }
    @media only screen and (max-width: 991px){
        .index-nav-buttom{
            display: flex;
        }
    }
</style>
