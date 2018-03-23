<template>
	<div class="student-chart">
		<div class="chart" style="height:800px" ref="sendType">
    </div>
	</div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";

export default {
  data() {
    return {
      sendType: null,
    };
  },
  props: ["studentSendList"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chartData = [];
      this.studentSendList.forEach((op)=>{
        if (chartData.length > 0) {
          let isInside = false;
          chartData.forEach((og)=>{
            if (op.jobInfo.jobTypeSecond === og.name) {
              og.value += 1;
              if (!(op.jobInfo.jobTypeThird in og.secondLevel)) {
                og.secondLevel.push(op.jobInfo.jobTypeThird)
              }
              isInside = true;
              return
            }
          })
          if (!isInside) {
            chartData.push({'name':op.jobInfo.jobTypeSecond,'value':1,'secondLevel':[op.jobInfo.jobTypeThird]});
          }
        }else{
          chartData.push({'name':op.jobInfo.jobTypeSecond,'value':1,'secondLevel':[op.jobInfo.jobTypeThird]});
        }
      })
      chartData.forEach((op)=>{
        op.secondLevel = op.secondLevel.join()
      })
      this.sendStatus = echarts.init(this.$refs.sendType);
      // 把配置和数据放这里
      this.sendStatus.setOption({
        title: {
          text: "投递情况",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        color: ['#68B3C8'],
        tooltip: {
          trigger: "item",
          formatter:function (op) {
            return '投递情况<br/>'+op.name+' : '+op.value+' ['+op.percent+'% ]<br/>'+op.data.secondLevel
          }
          // formatter:"{a} <br/>{b} : {c} ({d}%)<br/>"+
        },
        visualMap: {
          show: false,
          min: 1,
          max: chartData.sort(function(a, b) {return a.value - b.value;})[0].value,
          inRange: {
            colorLightness: [0.5, 1]
          }
        },
        roseType: 'angle',
        series: [
          {
            name: "反馈情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: chartData.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "gray"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "black"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#95E1D3",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.student-chart {
  width: 900px;
  margin: 0 auto;
}
.chart {
  width: 600px;
  height: 300px;
  margin: 0 auto;
}
</style>
