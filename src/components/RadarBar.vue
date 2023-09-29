<template>
  <div>
    <div>【云端报警风险】</div>
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
    // 雷达图的坐标系配置
    radar: {
      // 雷达图名字
      name: {
        textStyle: {
          color: '#05D5FF',
          fontSize: 14,
        },
      },
      // 雷达图形状
      shape: 'polygon',
      // 居中位置
      center: ['50%', '50%'],
      radius: '80%',
      // 起始角度
      startAngle: 120,
      // 轴线配置
      axisLabel: {
        lineStyle: {
          color: 'rgba(5,213,255,.8)',
        },
      },
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(5,213,255,.8)',
        },
      },
      // 指示器文字
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: 100,
      })),

      // 不拆分区域
      splitArea: {
        show: false,
      },
    },
    // 坐标位置极点
    polar: {
      center: ['50%', '50%'],
      radius: '0%',
    },
    // 坐标轴角度
    angleAxis: {
      // 最小角度
      min: 0,
      // 分割线间隔
      interval: 5,
      // 逆时针方向
      clockwise: false,
    },
    // 径向轴
    radiusAxis: {
      //  最小值
      min: 0,
      // 间隔
      interval: 20,
      // 不展示分割线
      splitLine: {
        show: true,
      },
    },
    // 图表核心配置
    series: {
      type: 'radar',
      symbol: 'circle',
      // 拐角大小
      symbolSize: 10,
      // item样式
      itemStyle: {
        normal: {
          color: '#05d5ff',
        },
      },
      // 填充区域
      areaStyle: {
        normal: {
          color: '#05d5ff',
          opacity: 0.5,
        },
      },
      // 线条颜色
      lineStyle: {
        width: 2,
        color: '#05d5ff',
      },
      label: {
        normal: {
          show: true,
          color: '#fff',
        },
      },
      data: [
        {
          value: props.data.risks.map((item) => item.value),
        },
      ],
    },
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
