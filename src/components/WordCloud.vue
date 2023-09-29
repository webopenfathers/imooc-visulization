<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
  const options = {}

  myChart.setOption(options)
}
</script>
