<template>
    <van-nav-bar
            title="云端智能锁"
            left-text="返回"
            right-text="· · ·"
            left-arrow="ture"
            @click-left="onClickLeft"
            @click-right="showShare = true"
    />
    <div class="all">
        <form class="form-signin">
            <a href="/gate">
                <img class="gate-logo mb-4" src="../../../assets/images/gate-logo.jpg" alt="">
            </a>
            <h1 class="h3 mb-3 font-weight-normal" style="color: #fff">认证</h1>
            <label for="inputEmail" class="sr-only">username</label>
            <input v-model="username" type="text" id="inputEmail" class="form-control" placeholder="用户名" required autofocus>
            <label for="inputPassword" class="sr-only">password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="密码" required>
            <button @click="SendRequest(username, password)" type="button" class="gate-open-button btn btn-lg btn-primary btn-block">开门</button>
            <a href="/Gate/Index">
                <p class="mt-5 mb-3 text-muted">&copy; 云端智能锁</p>
            </a>
        </form>
    </div>
    <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
    />
</template>

<script>
    import ajax from 'jquery'
    import $ from 'jquery'
    import Swal from 'sweetalert2'
    export default {
        name: "GateOpen",
        data(){
            return{
                url:'/API/Security/open-gate/',
                username:"",
                password:"",
                showShare: false,
                options: [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                ],
            }
        },
        mounted() {
        },
        methods:{
            SendRequest(username, password){
                console.log(username);
                //console.log(password);
                $.ajax({
                    url:this.url,
                    type:'POST',
                    data:{
                        'username':username,
                        'password':password,
                    },
                    dataType:'json'
                }).done(function (res) {
                    console.log(res);
                    if (res === 200){
                        Swal.fire({
                            title:'成功！',
                            html:'已为你打开门',
                            icon:'success',
                            confirmButtonText: '确定',
                        }).then((result) => {
                            window.location=document.referrer
                        })
                    }else if(res === 404){
                        Swal.fire({
                            icon: 'error',
                            title: '糟糕...',
                            html: '用户名或密码错误',
                        })
                    }
                })
            },
            onClickLeft() {
                window.history.back();
            },
            onSelect(option) {
                this.$toast(option.name);
                this.showShare = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    html,body {
        background-color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-items: center;
        align-content: center;
    }
    body {display: -ms-flexbox;display: -webkit-box;display: flex;-ms-flex-align: center;-ms-flex-pack: center;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;padding-top: 40px;padding-bottom: 40px;background-color: #f5f5f5;}
    .form-signin {width: 100%;max-width: 330px;padding: 15px;margin: 0 auto;}
    .form-signin .checkbox {font-weight: 400;}
    .form-signin .form-control {position: relative;box-sizing: border-box;height: auto;padding: 10px;font-size: 16px;}
    .form-signin .form-control:focus {z-index: 2;}
    .form-signin input[type="email"] {margin-bottom: -1px;border-bottom-right-radius: 0;border-bottom-left-radius: 0;}
    .form-signin input[type="password"] {margin-bottom: 10px;border-top-left-radius: 0;border-top-right-radius: 0;}
    .gate-logo{
        background-color: #fff;
        color: #fff;
        width: 80%;
        border-radius: 50%;
        text-align: center;
        border: #fff;
        border-width: 500px;
    }
    .form-signin{
        text-align: center;
    }
    .gate-open-button{
        margin-top: 5%;
        border-color: rgba(112,126,154,0.7);
        background-color: rgba(112,126,154,0.7);
    }
    .all{
        display: flex;
        align-items: center;
        height: 100vh;
        background-image: linear-gradient(45deg, rgba(237,183,185,0.7), rgba(82,113,147,0.7));
    }
</style>
