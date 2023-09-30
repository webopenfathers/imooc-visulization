<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapJson from '@/assets/MapData/china.json'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const target = ref(null)
let myChart = null
onMounted(() => {
  // 注册地图json文件
  echarts.registerMap('china', mapJson)
  myChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    // 时间线
    timeline: {
      data: props.data.voltageLevel,
      axisType: 'category',
      // 时间线自动切换
      autoPlay: true,
      // 切换时间
      playInterval: 3000,
      // 时间轴位置
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      // 时间轴文本
      label: {
        // 默认字体
        normal: {
          textStyle: {
            color: '#ddd',
          },
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      // 每个小圆点大小
      symbolSize: 10,
      // 线的颜色
      lineStyle: {
        color: '#555',
      },
      // 选中每个小圆点的颜色
      checkpointStyle: {
        // 每个小圆点边框颜色
        borderColor: '#888',
        // 每个小圆点边框宽度
        borderWidth: 2,
        // 控件样式
        controlStyle: {
          // 下一步按钮
          showNextBtn: true,
          // 上一步按钮
          showPrevBtn: true,
          // 默认样式
          normal: {
            color: '#666',
            borderColor: '#666',
          },
          // 高亮样式
          emphasis: {
            color: '#aaa',
            borderColor: '#aaa',
          },
        },
      },
    },
    // 柱形图展示范围
    baseOption: {
      grid: {
        right: '2%',
        top: '15%',
        bottom: '10%',
        width: '20%',
      },
      // 地图配置
      geo: {
        show: true,
        map: 'china',
        // 开启缩放
        roam: true,
        zoom: 0.8,
        // 中心点==经纬度
        center: [113.83531246, 34.0267395887],
        // 默认状态下省份样式
        itemStyle: {
          normal: {
            borderColor: 'rgba(147,235,248,1)',
            borderWidth: 1,
            // 区域颜色
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              // 设置渐变色
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(147,235,248,0)',
                },
                {
                  offset: 1,
                  color: 'rgba(147,235,248,.2)',
                },
              ],
            },
          },
          // 鼠标移入高亮色值设置
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0,
          },
        },
      },
    },
    options: [],
  }

  // 柱形图
  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroundColor: '#142037',
      title: [
        // 大title
        {
          text: '2019-2023 年度数据统计',
          left: 0,
          top: 0,
          textStyle: {
            color: '#ccc',
            fontSize: 30,
          },
        },
        // 小标题
        {
          id: 'statistic',
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#ccc',
            fontSize: 20,
          },
        },
      ],
      xAxis: {
        type: 'value',
        // 脱离0值比例
        scale: true,
        position: 'top',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: '#aaa',
          },
        },
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd',
          },
        },
        data: props.data.categoryData[item]
          .sort((a, b) => {
            return a.value - b.value
          })
          .map((item) => item.name),
      },
      series: [
        {
          type: 'bar',
          zlevel: 1.5,
          itemStyle: {
            normal: {
              color: props.data.colors[index],
            },
          },
          data: props.data.categoryData[item]
            .sort((a, b) => {
              return a.value - b.value
            })
            .map((item) => item.value),
        },
        {
          // 散点图
          type: 'effectScatter',
          // 指定散点图坐标系
          coordinateSystem: 'geo',
          // 数据==>省份名 经纬度 数据
          data: props.data.topData[item],
          // 点的大小
          symbolSize: function (val) {
            return val[2] / 6
          },
          // 绘制波纹特效
          rippleEffect: {
            brushType: 'stroke',
          },
          // 文字
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
            },
          },
          // 每一项的样式
          itemStyle: {
            normal: {
              color: props.data.colors[index],
              shadowBlur: 5,
              showShadowColor: props.data.colors[index],
            },
          },
        },
      ],
    })
  })

  myChart.setOption(options)
}
</script>
