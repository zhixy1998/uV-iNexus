<template>
  <div class="chart-box" id="echartsHorizontalBar"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  yAxisOptions: {
    type: Object,
    default: () => ({
      data: [],
    }),
  },
  seriesData: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const option = {
  barWidth: 15,
  xAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      //  改变x轴颜色
      show: false,
    },
    axisLabel: {
      //  改变x轴字体颜色和大小
      textStyle: {
        fontSize: 14,
      },
    },
  },
  yAxis: {
    type: 'category',
    data: props.yAxisOptions.data,
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.2)',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      //  改变y轴颜色
      show: false,
    },
    axisLabel: {
      //  改变y轴字体颜色和大小
      //formatter: '{value} m³ ', //  给y轴添加单位
      textStyle: {
        fontSize: 14,
      },
    },
  },
  series: [
    {
      type: 'bar',
      name: '',
      barWidth: 25,
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'insideRight', //在上方显示
            textStyle: {
              //数值样式
              color: '#FFFFFF',
              fontSize: 14,
            },
          },
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: 'rgba(47,248,255,.8)',
            },
            {
              offset: 1,
              color: 'rgba(47,248,255,0)',
            },
          ]),
          barBorderRadius: 2,
        },
      },
      data: props.seriesData,
    },
  ],
}
const chartInstance = ref<echarts.ECharts | null>(null)
const initChart = () => {
  const chartBox = document.getElementById('echartsHorizontalBar') as HTMLElement
  if (!chartBox) return
  chartInstance.value = echarts.init(chartBox)
  if (option) chartInstance.value?.setOption(option)
}

const resizeHandler = () => {
  if (chartInstance.value?.isDisposed?.() === false) {
    chartInstance.value.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  if (chartInstance.value) {
    chartInstance.value?.dispose()
  }
})
</script>

<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
