<template>
  <div>
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
      bottom: '10%',
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
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
