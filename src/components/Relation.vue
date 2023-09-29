<template>
  <div>
    <div>【数据传递信息】</div>
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
      show: false,
      type: 'value',
    },
    yAxis: {
      show: false,
      type: 'value',
    },

    series: [
      // 配置一 graph图表类型
      {
        type: 'graph',
        layout: 'none',
        // 设置二维直角坐标系
        coordinateSystem: 'cartesian2d',
        // 设置节点大小
        symbolSize: 26,
        z: 3,
        // 设置边界线条文字
        edgeLabel: {
          normal: {
            show: true,
            color: '#FFF',
            textStyle: {
              fontSize: 14,
            },
            formatter: function (params) {
              return params.data.speed
            },
          },
        },
        // 处理圆点下面的文字
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#5e5e5e',
          },
        },

        //  线条上面的箭头
        edgeSymbol: ['none', 'arrow'],
        // 设置 线条上面的箭头大小
        edgeSymbolSize: 8,
        // 根据id设置不同的源数据
        data: props.data.relations.map((item) => {
          if (item.id !== 0) {
            // 非数据中心
            return {
              name: item.name,
              value: item.value,
            }
          } else {
            // 数据中心
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              // 设置数据中心渐变
              itemStyle: {
                normal: {
                  // 渐变色
                  color: {
                    colorStops: [
                      { offset: 0, color: '#157eff' },
                      {
                        offset: 1,
                        color: '#35c2ff',
                      },
                    ],
                  },
                },
              },
              // label
              label: {
                normal: {
                  fontSize: 14,
                },
              },
            }
          }
        }),
        // 设置节点之间连接线的数据关系links
        links: props.data.relations.map((item) => ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          // 线条样式
          lineStyle: {
            normal: {
              // 颜色
              color: '#12b5d0',
              // 曲线率
              curveness: 0.2,
            },
          },
          // 设置线条上kb/s样式
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0],
          },
        })),
      },
      // 配置二 lines---配置会动的箭头
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        // 线特效的配置
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55,155,255,0.6)',
          symbolSize: 12,
        },
        lineStyle: {
          normal: {
            // 曲线率
            curveness: 0.2,
          },
        },
        // 线的数据级，前后线需要重合。数据固定
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
          [{ coord: [0, 100] }, { coord: [50, 200] }],
          [{ coord: [50, 200] }, { coord: [100, 100] }],
          [{ coord: [50, 200] }, { coord: [100, 300] }],
        ],
      },
    ],
  }

  myChart.setOption(options)
}

// 监听数据改变重新渲染
watch(() => props.data, renderChart)
</script>
