<template>
	<div class="student-chart">
    <div class="chart" style="height:800px" ref="jobLocation"></div>
	</div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      locationStatus:null
    };
  },
  props: ["jobLocationInfo"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      setTimeout(function () {
          myChart.on('mouseup', function (params) {
              if (!down) {
                  return;
              }
              down = false;
              var e = params.event;
              var geoCoord = myChart.convertFromPixel('series', [e.offsetX, e.offsetY]);
              myChart.setOption({
                  series: [{
                      center: geoCoord,
                      zoom: 4,
                      animationDurationUpdate: 1000,
                      animationEasingUpdate: 'cubicInOut'
                  }]
              });
          });
          var down;
          myChart.on('mousedown', function () {
              down = true;
          });
          myChart.on('mousemove', function () {
              down = false;
          });

      }, 0);

      this.locationStatus = echarts.init(this.$refs.jobLocation);
      this.locationStatus.setOption({
        title: {
        text: '降水量',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    visualMap: {
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],
        calculable: true
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
    animation: true,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    series: [
        {
            name: 'a',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        var icon = params.data.value[1] ? 'up' : 'down';
                        var valueType = params.data.value[1] ? 'valueUp' : 'valueDown';
                        return params.name
                            + '：{' + valueType + '|' + params.value + '} {' + icon + '|}';
                    },
                    position: 'inside',
                    backgroundColor: '#fff',
                    padding: [4, 5],
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.5)',
                    color: '#777',
                    rich: {
                        valueUp: {
                            color: '#019D2D',
                            fontSize: 14
                        },
                        valueDown: {
                            color: 'red',
                            fontSize: 14
                        },
                         up: {
                            height: 14,
                            align: 'center',
                        },
                        down: {
                            height: 14,
                            align: 'center',
                        }
                    }
                },
                emphasis: {
                    show: true
                }
            },
            data: this.jobLocationInfo
        }
    ]
      });
    }
  }
};
</script>
<style scoped>
.student-chart {
  width: 1300px;
  margin: 0 auto;
}
.chart {
  width: 1300px;
  height: 600px;
  margin: 30px auto;
  border-radius:5px;
}
</style>
