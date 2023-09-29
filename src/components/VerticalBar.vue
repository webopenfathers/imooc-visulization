<template>
  <div>
    <div>【服务资源占用比】</div>
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

const renderChart = () => {
  const options = {
    xAxis: {
      type: 'category',
      data: props.data.servers.map((item) => item.name),
      axisLabel: {
        color: '#9eb1c8',
      },
    },
    yAxis: {
      type: 'value',
      show: false,
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
    },
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true,
    },
    series: [
      {
        type: 'bar',
        data: props.data.servers.map((item) => ({
          name: item.name,
          value: item.value,
        })),
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
          position: 'top',
          textStyle: {
            color: '#fff',
          },

          // 格式化数据
          formatter: '{c}%',
        },
      },
    ],
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
