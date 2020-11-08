<template>
    <gate-base>
        <!--Table-->
        <div class="gate-table">

            <h2>记录</h2>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>用户</th>
                        <th>时间</th>
                        <th>快照</th>
                        <th>授权</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in records" :key="user.ID">
                        <td>{{user.ID}}</td>
                        <td>{{user.User}}</td>
                        <td>{{user.Time}}</td>
                        <td>

                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="AddIndexStr1(user.ID)">
                                快照
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" :id="AddIndexStr2(user.ID)" tabindex="-1" role="dialog" :aria-labelledby="user.ID" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="user.ID">快照</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="card" style="width: 18rem;">
                                                <img class="card-img-top" :src="user.Snapshoot" alt="Card image cap">
                                                <div class="card-body">
                                                    <h5 class="card-title">{{user.User}}</h5>
                                                    <h6 class="card-subtitle mb-2 text-muted">{{user.Time}}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                        <td>{{user.Limit}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </gate-base>
</template>

<script>
    import GateBase from "./components/GateBase";
    import axios from "axios";
    export default {
        name: "GateRecords",
        components: {GateBase},
        data(){
            return{
                url:'/API/Security/records/',
                chart_labels:["9.17", "9.18", "9.19", "9.20", "9.21", "9.22", "9.23"],
                chart_data:[52, 26, 64, 22, 19, 42, 96],
                records:[],
                chart_setting_option:{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                    legend: {
                        display: false,
                    }
                }
            }
        },
        mounted() {
            axios.get(this.url).then(res=>{
                console.log(res.data);
                this.records = res.data.records
                this.chart_labels = res.data.chart_labels
                this.chart_data = res.data.chart_data
                const ctx = document.getElementById("myChart");
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.chart_labels,
                        datasets: [{
                            data: this.chart_data,
                            lineTension: 0,
                            backgroundColor: 'transparent',
                            borderColor: '#007bff',
                            borderWidth: 4,
                            pointBackgroundColor: '#007bff'
                        }]
                    },
                    options: this.chart_setting_option,
                });
            })
            const c = this.chart;
        },
        methods:{
            AddIndexStr1(ID){
                return "#index-" + ID
            },
            AddIndexStr2(ID){
                return "index-" + ID
            },
        }
    }
</script>

<style lang="scss" scoped>
    .gate-row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .gate-row-el{
        width: 50%;
    }
    .modal-body{
        margin: 0 auto;
    }
</style>
