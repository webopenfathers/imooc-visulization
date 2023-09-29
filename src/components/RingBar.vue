<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
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
  myChart = echarts.init(target.value)
  renderChart()
})

const getSeriesData = () => {
  const series = []
  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      // 饼图
      type: 'pie',
      // 逆时针
      clockWise: false,
      // 鼠标移入不需要展示饼图动画
      hoverAnimation: false,
      // 饼图半径依次递减--环形
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      // 中心点一致
      center: ['55%', '55%'],
      // 不需要展示label
      label: {
        show: false,
      },
      // 数据
      data: [
        { value: item.value, name: item.name },
        // 配置最大数据
        {
          value: 1000,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    })
    // 底层
    series.push({
      name: item.name,
      type: 'pie',
      // 不需要任何事件
      silent: true,
      // 位于最底层
      z: 1,
      // 逆时针
      clockWise: false,
      // 关闭动画
      hoverAnimation: false,
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show: false,
      },
      // 数据绘制整个圆的2/3
      data: [
        // 底线
        {
          value: 7.5,
          itemStyle: {
            color: 'rgb(3,31,62)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
        // 透明区
        {
          value: 2.5,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    })
  })

  return series
}

const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      // 图例形状
      icon: 'circle',
      // 图例位置
      top: '14%',
      left: '60%',
      data: props.data.abnormals.map((item) => item.name),
      // width:-5
      orient: 'vertical',
      // 设置色块宽度
      itemWidth: 10,
      // 设置色块高度
      itemHeight: 10,
      // 图例之间的间距
      itemGap: 6,
      // 设置字体
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: 'rgba(255,255,255,0.8)',
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a}<br>{b}:{c}{d}',
    },
    //  Y轴
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
      },
    ],
    // X 轴
    xAxis: [
      {
        show: false,
      },
    ],
    // 核心配置
    series: getSeriesData(),
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
