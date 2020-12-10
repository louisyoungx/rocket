<template>
    <van-nav-bar
            title="云端智能锁"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="source">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
    </div>

    <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
    </el-date-picker>

    <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <van-grid clickable :column-num="2">
        <van-grid-item icon="home-o" text="路由跳转" to="/" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
    </van-grid>

    <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="image in images" :key="images">
            <el-image :src="image">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </el-carousel-item>
    </el-carousel>

    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Rocket',
        data() {
            return {
                active: 'home',
                loading: true,
                images: [
                    'https://s3.ax1x.com/2020/11/26/DBS0tP.jpg',
                    'https://s3.ax1x.com/2020/11/26/DBp3En.jpg',
                    'https://s3.ax1x.com/2020/11/26/DBSwkt.jpg',
                ],
                url: '/API/Class/CourseJson/Louis/',
                message: "666",
                course: '',
            };
        },
        mounted() {
            axios.get(this.url).then(res => {
                console.log(res.data);
            })
            //this.course = courseInfo()
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
    .source{
        padding: 24px;
    }
</style>
