<template>
    <gate-base>
        <h2>用户</h2>
        <hr>
        <div class="container marketing">

            <!-- Three columns of text below the carousel -->
            <div class="row">
                <div v-for="user in Users" class="card" style="width: 18rem;">
                    <img class="rounded-circle" src="../../../assets/images/gate-logo.jpg" alt="Generic placeholder image" width="140" height="140">
                    <div class="card-body">
                        <h5 class="card-title center-div">{{user.name}}</h5>
                        <h6 class="card-subtitle center-div mb-2 text-muted">{{user.Limit}}</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <p class="center-div">
                            <a class="btn btn-secondary" href="#" role="button">
                                详情 »
                            </a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </gate-base>
</template>

<script>
    import GateBase from "./components/GateBase";
    export default {
        name: "GateUsers",
        components: {GateBase},
        data(){
            return{
                Users:[
                    {
                        name:"Louis",
                        Limit:'管理员',
                    },
                    {
                        name:"XuYu",
                        Limit:'用户',
                    },
                    {
                        name:"DZZ",
                        Limit:'用户',
                    },
                    {
                        name:"XLH",
                        Limit:'用户',
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rounded-circle{
        margin: 5% auto 0;
    }
    .card{
        margin: 2%;
    }
    .center-div{
        text-align: center;
    }
    .btn{
        margin-top: 5%;
        border-color: rgba(112,126,154,0.7);
        background-color: rgba(112,126,154,0.7);
    }
</style>
