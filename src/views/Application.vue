<template>
    <div class="apps-main">
        <van-nav-bar
            title="应用"
            right-text="分享"
            @click-right="showShare = true"
        />
        <van-search
                v-model="searchValue"
                placeholder="请输入搜索关键词"
                input-align="center"
                :shape="round"
        />
        <el-carousel :interval="4000">
            <el-carousel-item v-for="image in images" :key="images">
                <el-image :src="image">
                    <template #placeholder>
                        <div class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </template>
                </el-image>
            </el-carousel-item>
        </el-carousel>
        <van-grid class="apps-items" :column-num="2" :gutter="10">
            <van-grid-item icon="hot-o" to="/DXX" text="青年大学习" />
            <van-grid-item icon="search" to="/Search" text="搜索" />
            <van-grid-item icon="chart-trending-o" to="/Gate/Index" text="云锁" />
            <van-grid-item icon="notes-o" to="/Course" text="备忘录" />
            <van-grid-item icon="warn-o" to="/Rocket" text="测试" />
            <van-grid-item icon="edit" to="/Settings" text="编辑" />
        </van-grid>
    </div>
    <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
    />
    <nav-buttom></nav-buttom>
</template>

<script>
    import NavButtom from "../components/NavButtom";
    export default {
        name: "Application",
        components: {NavButtom},
        data() {
            return {
                images: [
                    '/img/Application/rocket-colors-banner.jpg',
                    '/img/Application/nchu-utp-banner.jpg',
                    '/img/Application/gate-banner.jpg',
                ],
                showShare: false,
                options: [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                ],
                searchValue:'',
            };
        },
        methods:{
            onSelect(option) {
                this.$toast(option.name);
                this.showShare = false;
            },
        }
    }
</script>

<style scoped>
    .apps-main{
        height: 120vh;
        display: block;
        background-color: #f7f8fa;
    }
    .apps-items{
        margin-top: 5%;
    }
    .van-grid-item{
        cursor: pointer;
    }
</style>
