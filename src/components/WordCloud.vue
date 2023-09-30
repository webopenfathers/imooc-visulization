<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

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

const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `rgb(${r},${g},${b})`
}

const renderChart = () => {
  const options = {
    tooltip: {
      show: true,
      borderColor: '#fe9a8bb3',
      borderWidth: 1,
      padding: [10, 15, 10, 15],
      confine: true,
      backgroundColor: 'rgba(255, 255, 255, .9)',
      textStyle: {
        color: 'hotpink',
        lineHeight: 22,
      },
      extraCssText:
        'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;',
    },
    series: [
      {
        type: 'wordCloud',
        // 设置文字大小范围
        sizeRange: [8, 46],
        // 设置文字旋转
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 渲染动画
        layoutAnimation: true,
        // 字体样式
        textStyle: {
          // 随机色值
          color: randomRGB,
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000',
          },
        },
        data: props.data.datas,
      },
    ],
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
