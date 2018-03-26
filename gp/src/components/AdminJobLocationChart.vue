<template>
	<div class="student-chart">
    <div class="chart" style="height:800px" ref="jobLocation"></div>
	</div>
</template>

<script>
import echarts from "echarts";
import chinaJson from "./../assets/json/china.json";

export default {
  data() {
    return {
      locationStatus: null
    };
  },
  props: ["jobLocationInfo"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let na = [];
      let max = 0;
      this.jobLocationInfo.forEach(op => {
        let arr = "";
        arr = op.name.substring(0, op.name.length - 1);
        if (op.value > max) {
          max = op.value;
        }
        na.push({ name: arr, value: op.value });
      });
      echarts.registerMap("china", chinaJson);
      this.locationStatus = echarts.init(this.$refs.jobLocation);
      this.locationStatus.setOption({
				title: {
          text: "职位地理分布",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
					trigger: "item",
					formatter: (op)=> {
						return op.value ? '详细信息<br />地理位置：'+op.name +'<br/>职位数量：'+op.value : '该地区目前没有职位'
					},
				},
        visualMap: {
          min: 0,
          max: max + 1,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
					calculable: false,
					show:false,
					inRange: {
            color: ['#e0ffff', '#006edd']
	        },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            saveAsImage: {}
          }
				},
        animation: true,
        animationDurationUpdate: 1000,
        animationEasingUpdate: "cubicInOut",
        series: [
          {
            name: "a",
            type: "map",
						mapType: "china",
						itemStyle:{
                normal:{
								label:{show:true},
								},
						},
            roam: true,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  var valueType = params.data.value[1]
                    ? "valueUp"
                    : "valueDown";
                  return (
                    params.name 
                  );
                },
                position: "inside",
                backgroundColor: "#fff",
                padding: [4, 5],
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.5)",
                color: "#777",
                rich: {
                  valueUp: {
                    color: "#019D2D",
                    fontSize: 14
                  },
                  valueDown: {
                    color: "red",
                    fontSize: 14
                  }
                }
              },
              emphasis: {
								show: true,
              }
						},
            data: na
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.student-chart {
  width: 750px;
  margin: 0 auto;
}
.chart {
  width: 750px;
  height: 600px;
  margin: 30px auto;
  border-radius: 5px;
}
</style>
