<template>
    <article>
        <h3>用户 <span class="badge new">报告</span></h3>
        <div class="labeled-chart-container">
            <div class="canvas-holder">
                <canvas id="chartjs-1" class="chartjs" width="1222" height="610" style="height: 305px; width: 611px;"></canvas>
            </div>
        </div>
    </article>
    <article>
        <h3>用户 <span class="badge new">报告</span></h3>
        <div class="labeled-chart-container">
            <div class="canvas-holder">
                <canvas id="chartjs-2" class="chartjs" width="1222" height="610" style="height: 305px; width: 611px;"></canvas>
            </div>
        </div>
    </article>
</template>

<script>
    import chart from 'chart.js'
    export default {
        name: "GateReports",
        mounted() {
            // Colour variables
            const
                C1 = "rgba(255, 99, 132, 0.2)",
                C2 = "rgba(255, 159, 64, 0.2)",
                C3 = "rgba(255, 205, 86, 0.2)",
                C4 = "rgba(75, 192, 192, 0.2)",
                C5 = "rgba(54, 162, 235, 0.2)",
                C6 = "rgba(153, 102, 255, 0.2)",
                C7 = "rgba(201, 203, 207, 0.2)";

            const Ddata = {
                labels:["Louis","XuYu","DZZ","XLH","Others"],
                datasets:[{
                    label:"My First Dataset",
                    data:[757,163,109,171,169],
                    backgroundColor:[
                        C1,
                        C2,
                        C3,
                        C4,
                        C5,
                    ],
                    hoverBackgroundColor:[
                        C6,
                        C6,
                        C6,
                        C6,
                        C6,
                    ]
                }]
            }

            const Doptions = {

            }

            const ctx = document.getElementById("chartjs-1");

            // 环形图
            const myDoughnutChart = new Chart(ctx,{
                type:"doughnut",
                data:Ddata,
            });

            //雷达图
            new Chart(document.getElementById("chartjs-2"),{"type":"radar","data":{"labels":["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],"datasets":[{"label":"My First Dataset","data":[65,59,90,81,56,55,40],"fill":true,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(255, 99, 132)"},{"label":"My Second Dataset","data":[28,48,40,19,96,27,100],"fill":true,"backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgb(54, 162, 235)","pointBackgroundColor":"rgb(54, 162, 235)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(54, 162, 235)"}]},"options":{"elements":{"line":{"tension":0,"borderWidth":3}}}});

        },
        methods:{
            Colour(col, amt) {
                var usePound = false;

                if (col[0] == "#") {
                    col = col.slice(1);
                    usePound = true;
                }

                var num = parseInt(col,16);

                var r = (num >> 16) + amt;

                if (r > 255) r = 255;
                else if  (r < 0) r = 0;

                var b = ((num >> 8) & 0x00FF) + amt;

                if (b > 255) b = 255;
                else if  (b < 0) b = 0;

                var g = (num & 0x0000FF) + amt;

                if (g > 255) g = 255;
                else if (g < 0) g = 0;

                return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

            }
        }
    }
</script>

<style scoped>

</style>
