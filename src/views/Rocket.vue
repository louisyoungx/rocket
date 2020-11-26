<template>
    <van-nav-bar
            title="云端智能锁"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
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
                loading: true,
            };
        },
        methods: {
            onClickLeft() {
                Toast('返回');
            },
            onClickRight() {
                Toast('按钮');
            },
        },
    };
</script>

<style lang="css" scoped>

</style>
