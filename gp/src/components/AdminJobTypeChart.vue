<template>
	<div class="student-chart">
        <div class="chart" style="height:800px" ref="jobType"></div>
	</div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";

export default {
  data() {
    return {
      typeStatus:null
    };
  },
  props: ["jobTypeInfo"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
      let bgColor = '#2E2733'; 
      for (var j = 0; j < this.jobTypeInfo.length; ++j) {
        var level1 = this.jobTypeInfo[j].children;
        for (var i = 0; i < level1.length; ++i) {
            var block = level1[i].children;
            for (var star = 0; star < block.length; ++star) {
                block[star].label = {
                    color:colors[j],
                    downplay: {
                        opacity: 0.5
                    }
                };
                if (block[star].children) {
                    block[star].children.forEach(function (book) {
                        book.value = 1;
                        book.label = {
                          color:colors[j]
                        };
                    });
                }
            }
        level1[i].itemStyle = colors[j];
    }
}
      this.typeStatus = echarts.init(this.$refs.jobType);
      this.typeStatus.setOption({
        title: {
          text: "职位分布情况",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        backgroundColor: '#2E2733',
        color: ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'],
        series: [{
            type: 'sunburst',
            center: ['50%', '48%'],
            data: this.jobTypeInfo,
            label: {
                rotate: 'radial',
                color: bgColor,
            },
            itemStyle: {
                borderColor: bgColor,
                borderWidth: 2
            },
            levels: [{}, {
                r0: 0,
                r: 40,
                label: {
                    rotate: 0,
                    fontSize:10
                }
            }, {
                r0: 40,
                r: 105
            }, {
                r0: 115,
                r: 140,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: colors[2],
                    color: 'transparent'
                },
                label: {
                    rotate: 'tangential',
                    fontSize: 10,
                    color: colors[0]
                }
            }, {
                r0: 140,
                r: 145,
                itemStyle: {
                    shadowBlur: 80,
                    shadowColor: colors[0]
                },
                label: {
                    position: 'outside',
                    textShadowBlur: 5,
                    textShadowColor: '#333',
                },
                downplay: {
                    label: {
                        opacity: 0.5
                    }
                }
            }]
        }]
      });
    }
  }
};
</script>
<style scoped>
.student-chart {
  width: 750px;
  margin: 0 auto;
  background-color:#2E2733;
}
.chart {
  width: 600px;
  height: 600px;
  margin: 30px auto;
  border-radius:5px;
}
</style>
