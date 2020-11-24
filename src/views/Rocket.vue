<template>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger" >危险按钮</van-button>
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="primary" loading-text="加载中..." />
</template>

<script>
    export default {
        name: 'Rocket',
        data() {
            return {
                active: 'home',
            };
        },
    };
</script>

<style lang="css" scoped>

</style>
