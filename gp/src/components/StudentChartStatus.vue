<template>
	<div class="student-chart">
    <div class="chart" style="height:800px" ref="sendStatus">
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
      sendStatus:null
    };
  },
  props: ["studentSendList"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let statusData = [];
      this.studentSendList.forEach((op)=>{
        if (statusData.length > 0) {
          let isInside = false;
          statusData.forEach((og)=>{
            if (op.sendStatus === og.name) {
              og.value += 1;
              isInside = true;
              return
            }
          })
          if (!isInside) {
            statusData.push({'name':op.sendStatus,'value':1});
          }
        }else{
          statusData.push({'name':op.sendStatus,'value':1});
        }
      })
      this.sendStatus = echarts.init(this.$refs.sendStatus);
      // 把配置和数据放这里
      this.sendStatus.setOption({
        title: {
          text: "反馈情况",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "item",
          formatter:"{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 1,
          max: statusData.sort(function(a, b) {return a.value - b.value;})[0].value,
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
            data: statusData.sort(function(a, b) {
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
                color: "#F38181",
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
