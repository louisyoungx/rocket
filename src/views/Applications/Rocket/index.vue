<template>
    <van-nav-bar
            title="云端智能锁"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />


    <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <van-grid clickable :column-num="2">
        <van-grid-item icon="home-o" text="路由跳转" to="/" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
    </van-grid>

    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
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
