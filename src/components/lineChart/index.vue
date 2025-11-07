<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <!-- <a-input v-model:value="inputValue" class="!mb-4 !w-300"></a-input> -->
  <div ref="chartRef" class="dynamic-line-chart" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import type { PropType } from 'vue'
import { onBeforeUnmount, onMounted, reactive, ref, toRefs, watch } from 'vue'
// 定义数据类型
interface ChartDataItem {
  x: number | string
  y: number | string
  marked?: number
  feng?: number
  gu?: number
  [key: string]: any
}
interface MarkPointItem {
  name: string
  coord: [number, number]
  symbol?: string
  symbolSize?: number
  itemStyle?: {
    color: string
  }
  label?: {
    show: boolean
  }
}
interface xAxisType {
  min: number | string
  max: number | string
}
const props = defineProps({
  initialData: {
    type: Array as PropType<ChartDataItem[]>,
    default: () => [],
  },
  showMark: {
    type: Boolean,
    default: true,
  },
  yAxisOptions: {
    type: Object,
    default: () => ({
      min: '',
      max: '',
    }),
  },
  xAxisOptions: {
    type: Object as PropType<xAxisType>,
    default: () => ({
      min: 0,
      max: 800,
    }),
  },
  markSelect: {
    type: Array,
    default: () => [],
  },
  color: {
    type: String,
    default: '#000',
  },
  lineName: {
    type: String,
    default: '波长',
  },
  yAxisName: {
    type: String,
    default: '',
  },
  xAxisName: {
    type: String,
    default: '',
  },
})
// let dataLineChart = reactive<ChartDataItem[]>(
//   props.initialData?.length
//     ? [...props.initialData]
//     : Array.from({ length: 10 }, (_, i) => ({
//         x: i + 1,
//         y: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, // 2000~5000 随机数
//         marked: Math.random() < 0.5 ? 0 : 1,
//         feng: Math.random() < 0.5 ? 0 : 1,
//         gu: Math.random() < 0.5 ? 0 : 1,
//       })),
// )
let dataLineChart = reactive<ChartDataItem[]>(props.initialData)
const chartRef = ref<HTMLDivElement>()
let chart: ECharts | null = null
watch(
  () => [props.initialData, props.color, props.lineName, props.yAxisName],
  ([newValue, newColor, newName, newYName]) => {
    // let selectMarkArr: (MarkPointItem | null)[] = []
    dataLineChart = [...newValue] as ChartDataItem[]
    // if (props.markSelect.includes('标记点')) {
    //   selectMarkArr = [...generateMarkedPoints()]
    //   const markDataArr = selectMarkArr.filter((item): item is MarkPointItem => item !== null)
    //   chart?.setOption({
    //     series: [
    //       {
    //         markPoint: {
    //           data: props.showMark ? markDataArr : [],
    //         },
    //       },
    //     ],
    //   })
    // }
    nextTick(() => {
      chart?.setOption({
        title: {
          text: newYName,
        },
        xAxis: [
          {
            data: dataLineChart.map((item) => item.x), // 为了兼容数据缩放器等组件仍保留原始 x 数据
          },
        ],
        series: [
          {
            name: newName,
            itemStyle: {
              color: newColor || '#000',
            },
            data: dataLineChart.map((item) => [item.x, item.y]),
          },
        ],
      })
      changeMarkChart()
    })
  },
  {
    deep: true,
  },
)
watch(
  () => props.markSelect,
  (newValue) => {
    changeMarkChart()
    // let selectMarkArr: (MarkPointItem | null)[] = []
    // newValue.forEach((item) => {
    //   switch (item) {
    //     case '波峰':
    //       selectMarkArr = [...selectMarkArr, ...generateFengPoints()]
    //       break
    //     case '标记点':
    //       selectMarkArr = [...selectMarkArr, ...generateMarkedPoints()]
    //       break
    //     case '波谷':
    //       selectMarkArr = [...selectMarkArr, ...generateGuPoints()]
    //       break
    //   }
    // })
    // const markDataArr = selectMarkArr.filter((item): item is MarkPointItem => item !== null)
    // chart?.setOption({
    //   series: [
    //     {
    //       markPoint: {
    //         data: props.showMark ? markDataArr : [],
    //       },
    //     },
    //   ],
    // })
  },
  {
    deep: true,
  },
)
watch(
  () => props.yAxisOptions,
  (newValue) => {
    chart?.setOption({
      yAxis: newValue,
    })
  },
  {
    deep: true,
  },
)
watch(
  () => props.xAxisOptions,
  (newValue) => {
    chart?.setOption({
      xAxis: {
        min: newValue.min,
        max: newValue.max,
      },
      // 同时确保数据范围也更新
      // dataZoom: [
      //   {
      //     start: newValue.min || 0,
      //     end: newValue.max || 800,
      //   },
      // ],
    })
  },
  {
    deep: true,
  },
)
const unit = computed(() => {
  const matchResult = props.xAxisName.match(/\((.*?)\)/)
  return matchResult ? matchResult[1] : ''
})
const getMartArr = () => {
  let selectMarkArr: (MarkPointItem | null)[] = []
  props.markSelect.forEach((item) => {
    switch (item) {
      case '波峰':
        selectMarkArr = [...selectMarkArr, ...generateFengPoints()]
        break
      case '标记点':
        selectMarkArr = [...selectMarkArr, ...generateMarkedPoints()]
        break
      case '波谷':
        selectMarkArr = [...selectMarkArr, ...generateGuPoints()]
        break
    }
  })
  const markDataArr = selectMarkArr.filter((item): item is MarkPointItem => item !== null)
  return markDataArr
}
const changeMarkChart = () => {
  const markDataArr = getMartArr()
  chart?.setOption({
    series: [
      {
        markPoint: {
          data: props.showMark ? markDataArr : [],
        },
      },
    ],
  })
}
const generateFengPoints = (): (MarkPointItem | null)[] => {
  return dataLineChart.map((item, index) => {
    if (Number(item.feng)) {
      return {
        name: '波峰',
        coord: [Number(item.x), Number(item.y)], // 自动匹配纵坐标
        symbol:
          'path://M489.90890884 1017.28884579l0-662.73273745L551.27305136 354.55610835 551.27305135 1017.28884579l-61.3641425-2e-8z M306.28092891 358.28692148L515.86227332 1.43220042l215.24570478 356.85472106-424.82704919 0z',
        symbolSize: 20,
        symbolKeepAspect: true,
        symbolOffset: [0, -9],
        itemStyle: {
          color: '#d8001b',
        },
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'top', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
      }
    } else {
      return null
    }
  })
}
const generateGuPoints = (): (MarkPointItem | null)[] => {
  return dataLineChart.map((item, index) => {
    if (Number(item.gu)) {
      return {
        name: '波谷',
        coord: [Number(item.x), Number(item.y)], // 自动匹配纵坐标
        symbol:
          'path://M533.74591785 3.77295909l0 652.37753843L473.34059007 656.15049752 473.34059007 3.77295909l60.40532778 1e-8z M714.5047106 663.14464499L508.1980747 1014.42351103l-211.88249064-351.27886604 418.18912654 0z', // 替换为你的 SVG Path
        symbolSize: 20,
        symbolKeepAspect: true,
        symbolOffset: [0, 9],
        itemStyle: {
          color: '#70b503',
        },
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'bottom', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
      }
    } else {
      return null
    }
  })
}
const generateMarkedPoints = (): (MarkPointItem | null)[] => {
  return dataLineChart.map((item, index) => {
    if (Number(item.marked)) {
      return {
        name: '标记',
        coord: [Number(item.x), Number(item.y)], // 自动匹配纵坐标
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'bottom', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
        symbolSize: 20,
      }
    } else {
      return null
    }
  })
}
let resizeObserver: ResizeObserver | null = null
// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  const option: EChartsOption = {
    backgroundColor: '#fff',
    title: {
      text: props.yAxisName,
      textStyle: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#556677',
      },
      left: 'left', // 或者使用 '0' 或具体像素值
      top: 'top', // 或者使用 '0' 或具体像素值
      padding: [10, 0], // [上, 右, 下, 左] 内边距
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: 'middle',
      left: '3%',
      // right: '4%',
      bottom: '5%',
      height: '80%',
      containLabel: true,
    },
    legend: {
      bottom: '5%',
      textStyle: {
        color: '#90979c',
      },
      type: 'scroll',
    },
    calculable: true,
    xAxis: [
      {
        type: 'value',
        min: props.xAxisOptions.min,
        max: props.xAxisOptions.max,
        axisLine: {
          lineStyle: {
            color: 'rgba(204,187,225,0.5)',
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}',
          showMinLabel: true,
          showMaxLabel: true,
        },
        name: props.xAxisName,
        nameTextStyle: {
          color: '#556677',
        },
      },
    ],
    yAxis: [
      {
        // min: props.yAxisOptions.min,
        // max: props.yAxisOptions.max,
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#556677',
          formatter: '{value}',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#DCE2E8',
          },
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        height: 20, // 减小高度
        xAxisIndex: [0],
        bottom: 2, // 调整位置
        start: 200,
        end: 800,
        handleIcon:
          'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '80%', // 减小手柄大小
        handleStyle: {},
        textStyle: {
          fontSize: 10, // 减小字体大小
        },
      },
      {
        type: 'inside',
        show: true,
        start: 1,
        end: 35,
        zoomLock: true, // 可选，锁定缩放比例
      },
    ],
    series: [
      {
        name: props.lineName,
        type: 'line',
        symbolSize: 10,
        symbol: 'none',
        markPoint: {
          // data: [],
          data: props.showMark ? getMartArr() : [],
        },
        itemStyle: {
          color: props.color || '#000',
        },
        data: dataLineChart.map((item) => [item.x, item.y]),
      },
    ],
  }
  chart.setOption(option)

  // 窗口 resize 自适应
  window.addEventListener('resize', handleResize)
  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(chartRef.value)
}

// 截图
const captureChart = () => {
  return new Promise((resolve) => {
    const imgData = chart?.getDataURL({
      type: 'png', // 格式：png/jpeg
      pixelRatio: 2, // 放大倍数（提高清晰度）
      backgroundColor: '#fff', // 背景色
    })
    resolve(imgData)
  })
  // 获取 base64 图片数据
  // const imgData = chart?.getDataURL({
  //   type: 'png', // 格式：png/jpeg
  //   pixelRatio: 2, // 放大倍数（提高清晰度）
  //   backgroundColor: '#fff', // 背景色
  // })

  // // 下载图片
  // const link = document.createElement('a')
  // link.href = imgData as string
  // link.download = 'chart.png' // 文件名
  // link.click()
}
// 销毁图表
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    window.removeEventListener('resize', handleResize)
  }
})

// 响应式调整
const handleResize = () => {
  chart?.resize()
}

// 初始化
onMounted(async () => {
  await initChart()
})
defineExpose({ captureChart })
</script>

<style scoped>
.dynamic-line-chart {
  background: #dce2e8;
  border-radius: 4px;
}
</style>
