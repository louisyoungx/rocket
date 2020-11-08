<template>
    <gate-base>
        <!--Dashboard-->
        <div class="gate-dashboard">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">近期开门次数</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button class="btn btn-sm btn-outline-secondary">Share</button>
                        <button class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        This week
                    </button>
                </div>
            </div>

            <canvas class="my-4 chartjs-render-monitor" id="myChart" width="1114" height="470" style="display: block; height: 235px; width: 557px;"></canvas>

        </div>
        <!--Dashboard-->
        <div class="gate-dashboard">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1>用户进出<span class="badge new">次数/时间</span></h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <button @click="ChartSwap()" type="button" class="btn btn-sm btn-outline-secondary">切换</button>
                </div>
            </div>
            <div class="gate-row">
                <canvas :style="{display: chart1}" id="chartjs-1" class="chartjs gate-row-el" width="1222" height="610" style="width: 100%;"></canvas>
                <canvas :style="{display: chart2}" id="chartjs-2" class="chartjs gate-row-el" width="1222" height="610" style="width: 100%;"></canvas>
            </div>
        </div>
        <!--Table-->
        <div class="gate-table">

            <h2>开门记录</h2>
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
    import axios from "axios";
    import GateBase from "./components/GateBase";

    export default {
        name: "GateIntegrations",
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
                },
                chart1:"",
                chart2:"none",
            }
        },
        mounted() {
            axios.get(this.url).then(res=>{
                console.log(res.data);
                this.records = res.data.records
                this.chart_labels = res.data.chart_labels
                this.chart_data = res.data.chart_data

                //折线图
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

            // 环形图
            if (this.chart1 === ""){
                this.DoughnutChart()
            }//雷达图
            else if(this.chart1 === "none"){
                this.RadarChart()
            }
        },
        methods:{
            AddIndexStr1(ID){
                return "#index-" + ID
            },
            AddIndexStr2(ID){
                return "index-" + ID
            },
            ChartSwap(){
                if (this.chart1 === ""){
                    this.chart1 = "none";
                    this.chart2 = ""
                    this.RadarChart()
                }else if(this.chart1 === "none"){
                    this.chart1 = "";
                    this.chart2 = "none"
                    this.DoughnutChart()
                }
                console.log(this.chart1, this.chart2);
            },
            DoughnutChart(){
                // 环形图
                const
                    C1 = "rgba(255, 99, 132, 0.2)",
                    C2 = "rgba(255, 159, 64, 0.2)",
                    C3 = "rgba(255, 205, 86, 0.2)",
                    C4 = "rgba(75, 192, 192, 0.2)",
                    C5 = "rgba(54, 162, 235, 0.2)",
                    C6 = "rgba(153, 102, 255, 0.2)",
                    C7 = "rgba(201, 203, 207, 0.2)";

                const myDoughnutChart = new Chart(document.getElementById("chartjs-1"),{
                    type:"doughnut",
                    data:{
                        labels:["Louis","XuYu","DZZ","XLH","Others"],
                        datasets:[{
                            label:"My First Dataset",
                            data:[757,163,109,171,169],
                            backgroundColor:[
                                C1, C2, C3, C4, C5,
                            ],
                            hoverBackgroundColor:[
                                C6, C6, C6, C6, C6,
                            ]
                        }]
                    },
                });
            },
            RadarChart(){
                new Chart(document.getElementById("chartjs-2"),{"type":"radar","data":{"labels":["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],"datasets":[{"label":"My First Dataset","data":[65,59,90,81,56,55,40],"fill":true,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(255, 99, 132)"},{"label":"My Second Dataset","data":[28,48,40,19,96,27,100],"fill":true,"backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgb(54, 162, 235)","pointBackgroundColor":"rgb(54, 162, 235)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(54, 162, 235)"}]},"options":{"elements":{"line":{"tension":0,"borderWidth":3}}}});
            }
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
