<template>
  <div>
    <div>【大区数据信息】</div>
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

// 1.初始化 echarts 实例
let myChart = null
const target = ref(null)

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
})

// 2.构建 option 配置对象
const renderChart = () => {
  const options = {
    // x轴展示数据
    xAxis: {
      show: false,
      type: 'value',
      // 设置x轴动态最大值,防止顶到头
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
    },
    // y轴展示数据
    yAxis: {
      type: 'category',
      data: props.data.regions.map((item) => item.name),
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#9eb1c8',
      },
    },
    // 图表绘制的位置 对应 上下左右
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    // 核心配置
    series: [
      {
        type: 'bar',
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        // 设置柱形图每个柱子背景色
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180,180,180,.2)',
        },
        // 指定每个柱子的样式
        itemStyle: {
          color: '#479AD3',
          barBorderRadius: 5,
          shadowColor: 'rgba(0,0,0,.3)',
          shadowBlur: 5,
        },
        // 指定每个柱子的宽度
        barWidth: 12,
        // 柱子上方的字体
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff',
          },
        },
      },
    ],
  }

  // 3.通过 实例.setOption(option)
  myChart.setOption(options)
}

// 监听data变化,重新渲染图表
watch(
  () => props.data,
  () => {
    renderChart()
  }
)
</script>
