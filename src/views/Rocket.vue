<template>
  <section class="features container">
    <article>
      <h3>6 种图表类型</h3>
      <div id="js-carousel" class="canvas-holder hover-highlight carousel position-1"><canvas width="782" height="488" id="carousel-radar" style="width: 391px; height: 244px;"></canvas><canvas width="782" height="488" id="carousel-polar-area" style="width: 391px; height: 244px;"></canvas><canvas width="782" height="488" id="carousel-bar" style="width: 391px; height: 244px;"></canvas><canvas width="782" height="488" id="carousel-doughnut" style="width: 391px; height: 244px;"></canvas><canvas width="782" height="488" id="carousel-line" style="width: 391px; height: 244px;"></canvas><canvas width="782" height="488" id="carousel-pie" style="width: 391px; height: 244px;"></canvas></div>
      <p>Visualize your data in 6 different ways. Each of them animated, with a load of customisation options and interactivity extensions.</p>
    </article>
    <article>
      <h3>基于 HTML5</h3>
      <div id="js-mouse-bubbles" class="canvas-holder canvas-node-demo hover-highlight">
        <code>
          <span class="operator">&lt;</span><span class="node-name">canvas</span><span class="operator">&gt;</span>
        </code>
        <canvas width="800" height="500" class="aspect-spacer" style="width: 100%; height: auto;"></canvas>
      </div>
      <p>Chart.js uses the HTML5 canvas element. It's supported in all modern browsers, and polyfills support for IE7/8.</p>
    </article>
    <article>
      <h3>简单、灵活</h3>
      <div class="canvas-holder hover-highlight">
        <canvas width="782" height="488" id="micro-line" style="width: 391px; height: 244px;"></canvas>
      </div>
      <p>Chart.js is dependency free and super lightweight. All six core chart types are only <strong>11.01kb</strong> when minified, concatenated and served gzipped.</p>
    </article>
    <article>
      <h3>Responsive <span class="badge new">新</span></h3>
      <div class="canvas-holder">
        <img width="400" height="250" src="//s.nodejs.cn/chart/assets/responsive.svg">
      </div>
      <p>Chart.js will resize your chart if the browser changes size, along with providing the perfect scale granularity for that size</p>
    </article>
    <article>
      <h3>Modular <span class="badge new">新</span></h3>
      <div class="labeled-chart-container">
        <div class="canvas-holder">
          <canvas id="modular-doughnut" width="482" height="482" style="width: 241px; height: 241px;">
          </canvas>
        </div>
        <ul class="doughnut-legend"><li><span style="background-color:#5B90BF"></span>Core</li><li><span style="background-color:#96b5b4"></span>Bar</li><li><span style="background-color:#a3be8c"></span>Doughnut</li><li><span style="background-color:#ab7967"></span>Radar</li><li><span style="background-color:#d08770"></span>Line</li><li><span style="background-color:#b48ead"></span>Polar Area</li></ul></div>
      <p>Chart.js is modular, and each of the chart types have been split up, so you can load only which chart types you need for your project</p>
    </article>
    <article>
      <h3>Interactive <span class="badge new">新</span></h3>
      <div class="canvas-holder half">
        <canvas id="interactive-bar" width="782" height="488" style="width: 391px; height: 244px;">
        </canvas>
      </div>
      <p>Chart.js provides default simple support for canvas tooltips on hover/touch, but you can extend chart interactions to trigger events in your application</p>
    </article>
  </section>
</template>

<script>
  import axios from "axios";
  import $ from 'jquery'
  import chart from 'chart.js'

  export default {
    name: 'Rocket',
    data(){
    },
    mounted () {
      // Colour variables
      var red = "#bf616a",
              blue = "#5B90BF",
              orange = "#d08770",
              yellow = "#ebcb8b",
              green = "#a3be8c",
              teal = "#96b5b4",
              pale_blue = "#8fa1b3",
              purple = "#b48ead",
              brown = "#ab7967";


      var baseDataset = {
                fill: 'rgba(222,225,232,0.4)',
                stroke: 'rgba(222,225,232,1)',
                highlight: 'rgba(222,225,232,0.8)',
                highlightStroke: 'rgba(222,225,232,1)'
              },
              overlayDataset = {
                fill: 'rgba(91,144,191,0.4)',
                stroke: 'rgba(91,144,191,1)',
                highlight: 'rgba(91,144,191,0.8)',
                highlightStroke: 'rgba(91,144,191,1)'
              };

      var data = [],
              barsCount = 50,
              labels = new Array(barsCount),
              updateDelayMax = 500,
              $id = function(id){
                return document.getElementById(id);
              },
              random = function(max){ return Math.round(Math.random()*100)},
              helpers = Chart.helpers;


      Chart.defaults.global.responsive = true;


      for (var i = barsCount - 1; i >= 0; i--) {
        data.push(Math.round(Math.random() * 100));
      };
      new Chart($id('hero-bar').getContext('2d')).Bar({
        labels : labels,
        datasets : [{
          fillColor : '#2B303B',
          data : data
        }]
      },{
        showScale : false,
        barShowStroke : false,
        barValueSpacing: 1,
        showTooltips : false,
        onAnimationComplete : function(){
          // Get scope of the hero chart during updates
          var heroChart = this,
                  timeout;
          // Stop this running every time the update is fired
          this.options.onAnimationComplete = randomUpdate;

          this.options.animationEasing = 'easeOutQuint';

          randomUpdate();

          function randomUpdate(){
            heroChart.stop();
            clearTimeout(timeout);
            // Get a random bar
            timeout = setTimeout(function(){
              var randomNumberOfBars = Math.floor(Math.random() * barsCount),
                      i;
              for (i = randomNumberOfBars - 1; i >= 0; i--) {
                heroChart.datasets[0].bars[Math.floor(Math.random() * barsCount)].value = Math.round(Math.random() * 100);
              };
              heroChart.update();
            },Math.random() * updateDelayMax);
          };
        }
      });


      //Run any of the smaller demo charts here.

      // Six up carousel
      (function(){
        var contexts = {
                  polar : $id('carousel-polar-area').getContext('2d'),
                  radar : $id('carousel-radar').getContext('2d'),
                  line : $id('carousel-line').getContext('2d'),
                  bar : $id('carousel-bar').getContext('2d'),
                  doughnut : $id('carousel-doughnut').getContext('2d'),
                  pie : $id('carousel-pie').getContext('2d')
                },
                chartInstances = [];

        var data = {
          multiSets: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                fillColor: baseDataset.fill,
                strokeColor: baseDataset.stroke,
                pointColor: baseDataset.stroke,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                highlightFill: baseDataset.highlight,
                pointHighlightStroke: baseDataset.highlightStroke,
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: "My Second dataset",
                fillColor: overlayDataset.fill,
                strokeColor: overlayDataset.stroke,
                pointColor: overlayDataset.stroke,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: overlayDataset.highlightStroke,
                highlightFill: overlayDataset.highlight,
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]
          },
          segments : [
            {
              value : 25,
              color : orange,
              highlight : Colour(orange, 10),
              label : "Orange"
            },
            {
              value: 14,
              color: blue,
              highlight : Colour(blue, 10),
              label : "Blue"
            },
            {
              value: 6,
              color: yellow,
              highlight : Colour(yellow, 10),
              label : "Yellow"
            },
            {
              value : 28,
              color : purple,
              highlight : Colour(purple, 10),
              label : "Purple"
            },
            {
              value: 18,
              color: teal,
              highlight: Colour(teal, 10),
              label: "Teal"
            }

          ]
        }


        var config = {
          animation: false,
          onAnimationComplete: function(){
            this.options.animation = true;
          }
        };
        chartInstances.push(new Chart(contexts.radar).Radar(data.multiSets, config));
        chartInstances.push(new Chart(contexts.polar).PolarArea(data.segments, config));
        chartInstances.push(new Chart(contexts.bar).Bar(data.multiSets, config));
        chartInstances.push(new Chart(contexts.doughnut).Doughnut(data.segments, config));
        chartInstances.push(new Chart(contexts.line).Line(data.multiSets, config));
        chartInstances.push(new Chart(contexts.pie).Pie(data.segments, config));


        var iteratePosition = (function(){
          var position = 1;

          return function(){
            position++;
            return (position > chartInstances.length) ? position = 1 : position;
          };
        })();

        var carousel = $id('js-carousel');


        helpers.addEvent(carousel, 'click', function(){
          var positionPrefix = 'position-',
                  carouselPosition = iteratePosition(),
                  chartToScrollTo = chartInstances[carouselPosition-1];

          this.className = this.className.replace(new RegExp(positionPrefix+'[1-6]'), positionPrefix+carouselPosition);

          chartToScrollTo.clear();
          chartToScrollTo.render();
        });

      })();

      // Canvas demo

      (function(){
        var mousetrap = $id('js-mouse-bubbles'),
                canvas = mousetrap.getElementsByTagName('canvas')[0],
                ctx = canvas.getContext('2d'),
                colour = 'rgba(239,241,245, <%= alpha %>)',
                maxSize = 50;

        helpers.retinaScale({
          canvas: canvas,
          ctx: ctx
        });

        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        helpers.addEvent(mousetrap, 'mousemove', drawTriangle);

        helpers.addEvent(mousetrap, 'click', function(){
          helpers.clear({
            width: canvas.width,
            height: canvas.height,
            ctx: ctx
          });
        });

        setInterval(function(){
          setTimeout(drawTriangle, Math.random() * 400)
        }, 150);

        function drawTriangle(){
          var x = Math.random() * canvas.width,
                  y = Math.random() * canvas.height,
                  width = Math.round((maxSize * Math.random() / 2)),
                  height = Math.sqrt(3) * width;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * (Math.PI * 2));
          ctx.beginPath();
          ctx.moveTo(-1 * width, 0);
          ctx.lineTo(0, -1 * height);
          ctx.lineTo(width, 0);
          ctx.closePath();
          ctx.fillStyle = colour.replace('<%= alpha %>', Math.random() + 0.2);
          ctx.fill();
          ctx.restore();
        };
      })();


      // Simple & flexible
      // Micro line chart
      (function(){
        var canvas = $id('micro-line'),
                ctx = canvas.getContext('2d'),
                lineChartData = [0, 6, 9, 10, 11, 14, 20];

        var Line = new Chart(ctx).Line({
          labels: new Array(lineChartData.length),
          datasets: [{
            strokeColor: overlayDataset.stroke,
            pointColor: '#fff',
            pointStrokeColor: overlayDataset.stroke,
            data: lineChartData
          }]
        }, {
          showScale: false,
          showTooltips: false,
          datasetStrokeWidth: 6,
          datasetFill: false,
          pointDotRadius : 9,
          pointDotStrokeWidth: 4,
          animation: false,
          animationEasing: 'easeInOutQuint',
          onAnimationComplete: function(){
            this.options.animation = true;
          }
        });

        helpers.addEvent(canvas, 'click', function(){
          lineChartData.reverse();
          Line.stop();
          helpers.each(Line.datasets[0].points, function(point, index){
            point.value = lineChartData[index];
          });
          Line.update();
        })
      })();

      // Modular doughnut
      (function(){

        var canvas = $id('modular-doughnut'),
                colours = {
                  "Core": blue,
                  "Line": orange,
                  "Bar": teal,
                  "Polar Area": purple,
                  "Radar": brown,
                  "Doughnut": green
                };

        var moduleData = [

          {
            value: 7.57,
            color: colours["Core"],
            highlight: Colour(colours["Core"], 10),
            label: "Core"
          },

          {
            value: 1.63,
            color: colours["Bar"],
            highlight: Colour(colours["Bar"], 10),
            label: "Bar"
          },

          {
            value: 1.09,
            color: colours["Doughnut"],
            highlight: Colour(colours["Doughnut"], 10),
            label: "Doughnut"
          },

          {
            value: 1.71,
            color: colours["Radar"],
            highlight: Colour(colours["Radar"], 10),
            label: "Radar"
          },

          {
            value: 1.64,
            color: colours["Line"],
            highlight: Colour(colours["Line"], 10),
            label: "Line"
          },

          {
            value: 1.37,
            color: colours["Polar Area"],
            highlight: Colour(colours["Polar Area"], 10),
            label: "Polar Area"
          }

        ];
        //
        var moduleDoughnut = new Chart(canvas.getContext('2d')).Doughnut(moduleData, { tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%= value %>kb", animation: false });
        //
        var legendHolder = document.createElement('div');
        legendHolder.innerHTML = moduleDoughnut.generateLegend();
        // Include a html legend template after the module doughnut itself
        helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
          helpers.addEvent(legendNode, 'mouseover', function(){
            var activeSegment = moduleDoughnut.segments[index];
            activeSegment.save();
            activeSegment.fillColor = activeSegment.highlightColor;
            moduleDoughnut.showTooltip([activeSegment]);
            activeSegment.restore();
          });
        });
        helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
          moduleDoughnut.draw();
        });
        canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

      })();

      // Interative micro bar chart

      (function(){
        var canvas = $id('interactive-bar'),
                ctx = canvas.getContext('2d'),
                microBar = new Chart(ctx).Bar({
                  labels: new Array(7),
                  datasets: [{
                    fillColor : "rgba(239,241,245,1)",
                    strokeColor : "rgba(0,0,0,0)",
                    highlightFill: "rgba(230,233,240,1)",
                    data: [random(), random(), random(), random(), random(), random(), random()]
                  }]
                }, {
                  animation: false,
                  showScale: false,
                  barShowStroke: false,
                  tooltipXPadding: 10,
                  tooltipYPadding: 6,
                  tooltipFontSize: 18,
                  tooltipFontStyle: 'bold',
                  // Boolean - If we want to override with a hard coded scale
                  scaleOverride: true,

                  // ** Required if scaleOverride is true **
                  // Number - The number of steps in a hard coded scale
                  scaleSteps: 2,
                  // Number - The value jump in the hard coded scale
                  scaleStepWidth: 50,
                  // Number - The scale starting value
                  scaleStartValue: 0,
                });

        helpers.addEvent(canvas, 'mousemove', function(evt){
          var bars =microBar.getBarsAtEvent(evt);
          if (bars.length > 0){
            canvas.style.cursor = "pointer";
          }
          else {
            canvas.style.cursor = "default";
          }
        });

        helpers.addEvent(canvas, 'click', function(evt){
          microBar.options.animation = true;
          microBar.options.onAnimationComplete = function(){
            this.showTooltip(this.activeElements, true);
          };
          var bars = microBar.getBarsAtEvent(evt);
          helpers.each(bars, function(bar){
            bar.value = Math.max(random(), 5);
          });
          if (bars.length > 0){
            microBar.update();
          }
        });

      })();

        function Colour(col, amt) {

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
      },
    methods:{
    }
  }
</script>

<style lang="css" scoped>
  * {
    padding: 0;
    margin: 0;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  body {
    position: relative;
    font-family: "Proxima Nova", 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', 'sans-serif';
    color: #232830;
  }
  lesshat-selector {
    -lh-property: 0; }
  ::selection{color: #dfe1e8; background: #5b90bf}
  ::-moz-selection{color: #dfe1e8; background: #5b90bf;
  }
  .aspect-ratio {
    width: 100%;
    padding-bottom: 40%;
    position: relative;
    background-color: #232830;
    border-bottom: 10px solid #5b90bf;
  }
  header {
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
    color: #dfe1e8;
    z-index: 3;
  }
  header h1 {
    margin-bottom: 30px;
  }
  header h2 {
    margin-bottom: 30px;
  }
  @media only screen and (max-width: 600px) {
    header {
      color: #232830;
      top: 100%;
      margin-top: 10px;
      padding: 40px 10px;
      background-color: #fafafa;
      border-bottom: 1px solid #e1e1e1;
      -webkit-transform: translateY(0%);
      -moz-transform: translateY(0%);
      -o-transform: translateY(0%);
      -ms-transform: translateY(0%);
      transform: translateY(0%);
    }
    header h1 {
      font-size: 38px;
      margin-bottom: 10px;
    }
    header h2 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    header .btn {
      min-width: 136px;
      font-size: 14px;
      padding: 18px 20px;
      margin: 0 5px;
    }
  }
  .content-main {
    background-color: #fff;
    z-index: 2;
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 600px) {
    .content-main {
      padding-top: 256px;
    }
  }
  .container {
    margin: 0 auto;
  }
  .container:after {
    content: '';
    display: table;
  }
  .canvas-holder {
    padding: 4px 0;
    margin: 20px 0;
    position: relative;
  }
  .canvas-holder img {
    width: 100%;
    height: auto;
  }
  .aspect-spacer {
    width: 100% !important;
    height: auto !important;
    display: inline-block;
  }
  .canvas-node-demo {
    position: relative;
  }
  .canvas-node-demo code {
    z-index: -1;
    position: absolute;
    width: 100%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-family: "Proxima Nova", 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', 'sans-serif';
    text-align: center;
    color: #b0bace;
  }
  .canvas-node-demo .operator {
    font-size: 36px;
  }
  .canvas-node-demo .node-name {
    font-size: 50px;
  }
  .labeled-chart-container {
    padding-right: 150px;
    min-height: 180px;
    position: relative;
  }
  @media only screen and (max-width: 600px) {
    .labeled-chart-container {
      padding-right: 130px;
    }
  }
  .doughnut-legend {
    list-style: none;
    position: absolute;
    right: 8px;
    top: 0;
  }
  .doughnut-legend li {
    display: block;
    padding-left: 30px;
    position: relative;
    margin-bottom: 4px;
    border-radius: 5px;
    padding: 2px 8px 2px 28px;
    font-size: 14px;
    cursor: default;
    -webkit-transition: background-color 200ms ease-in-out;
    -moz-transition: background-color 200ms ease-in-out;
    -o-transition: background-color 200ms ease-in-out;
    transition: background-color 200ms ease-in-out;
  }
  .doughnut-legend li:hover {
    background-color: #fafafa;
  }
  .doughnut-legend li span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 100%;
    border-radius: 5px;
  }
  .carousel {
    white-space: nowrap;
    overflow: hidden;
  }
  .carousel canvas {
    display: inline-block;
    -webkit-transition: -webkit-transform 400ms ease-out;
    -moz-transition: -moz-transform 400ms ease-out;
    -o-transition: -o-transform 400ms ease-out;
    transition: -webkit-transform 400ms ease-out,-moz-transform 400ms ease-out,-o-transform 400ms ease-out,transform 400ms ease-out;
  }
  .position-6 canvas {
    -webkit-transform: translateX(-500%);
    -moz-transform: translateX(-500%);
    -o-transform: translateX(-500%);
    -ms-transform: translateX(-500%);
    transform: translateX(-500%);
  }
  .position-5 canvas {
    -webkit-transform: translateX(-400%);
    -moz-transform: translateX(-400%);
    -o-transform: translateX(-400%);
    -ms-transform: translateX(-400%);
    transform: translateX(-400%);
  }
  .position-4 canvas {
    -webkit-transform: translateX(-300%);
    -moz-transform: translateX(-300%);
    -o-transform: translateX(-300%);
    -ms-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  .position-3 canvas {
    -webkit-transform: translateX(-200%);
    -moz-transform: translateX(-200%);
    -o-transform: translateX(-200%);
    -ms-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  .position-2 canvas {
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  .position-1 canvas {
    -webkit-transform: translateX(0%);
    -moz-transform: translateX(0%);
    -o-transform: translateX(0%);
    -ms-transform: translateX(0%);
    transform: translateX(0%);
  }
  .hover-highlight {
    border-radius: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: background-color 200ms ease-in-out;
    -moz-transition: background-color 200ms ease-in-out;
    -o-transition: background-color 200ms ease-in-out;
    transition: background-color 200ms ease-in-out;
  }
  .hover-highlight:hover {
    background-color: rgba(239, 241, 245, 0.3);
    border-radius: 10px;
  }
  .hover-highlight canvas {
    cursor: pointer;
  }
  #hero-bar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  h1 {
    font-size: 62px;
    font-weight: 600;
  }
  @media only screen and (max-width: 978px) {
    h1 {
      font-size: 48px;
    }
  }
  h2 {
    font-weight: 400;
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 20px 0;
    text-align: center;
    font-size: 18px;
    line-height: 28px;
  }
  a {
    color: #5b90bf;
    text-decoration: none;
    border-bottom: 1px solid;
  }
  .features article {
    width: 33.33%;
    padding: 40px;
    float: left;
  }
  @media only screen and (max-width: 978px) {
    .features article {
      width: 50%;
    }
    .features article:nth-child(2n+1) {
      clear: left;
    }
  }
  @media only screen and (max-width: 600px) {
    .features article {
      width: auto;
      float: none;
      border-bottom: 1px solid #e1e1e1;
      padding: 20px 12px;
    }
    .features article:last-child {
      border-bottom: none;
    }
  }
  .features h3 {
    margin: 40px 0 60px 0;
    font-size: 32px;
  }
  @media only screen and (max-width: 600px) {
    .features h3 {
      font-size: 28px;
    }
  }
  .btn {
    margin: 0 10px;
    padding: 18px 26px;
    min-width: 220px;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    background-color: #1C1F26;
    border-radius: 5px;
    font-size: 18px;
    color: #dfe1e8;
    -webkit-transition: 200ms background-color;
    -moz-transition: 200ms background-color;
    -o-transition: 200ms background-color;
    transition: 200ms background-color;
  }
  .btn.red {
    background-color: #bf616a;
  }
  .btn.red:hover {
    background-color: #b9525c;
  }
  .btn.blue {
    background-color: #5b90bf;
  }
  .btn.blue:hover {
    background-color: #4c86b9;
  }
  .badge {
    background-color: #ebcb8b;
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 6px;
    color: #fff;
    vertical-align: top;
    margin-left: 4px;
  }
  footer {
    margin-top: 20px;
    text-align: center;
    clear: both;
  }
  .download-banner {
    padding: 60px 12px;
    background-color: #eff1f5;
  }
  .download-banner h2 {
    line-height: 40px;
  }
  .download-banner h2 span {
    padding: 0 5px;
  }
  @media only screen and (max-width: 600px) {
    .download-banner h2 {
      line-height: normal;
      font-size: 22px;
    }
    .download-banner h2 span {
      display: block;
      margin: 12px 0;
      font-size: 16px;
    }
  }
  .owner-notice {
    padding: 20px 12px;
    background-color: #232830;
    color: rgba(250, 250, 250, 0.3);
    border-top: 10px solid #5b90bf;
    -webkit-transition: color 200ms ease-out;
    -moz-transition: color 200ms ease-out;
    -o-transition: color 200ms ease-out;
    transition: color 200ms ease-out;
  }
  .owner-notice a {
    color: rgba(250, 250, 250, 0.3);
    -webkit-transition: color 200ms ease-out;
    -moz-transition: color 200ms ease-out;
    -o-transition: color 200ms ease-out;
    transition: color 200ms ease-out;
  }
  .owner-notice:hover {
    color: #fafafa;
  }
  .owner-notice:hover a {
    color: #fafafa;
  }
</style>
