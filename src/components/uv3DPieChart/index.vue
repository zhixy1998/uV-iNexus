<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div ref="chartRef" class="pie-3d-chart" :style="{ width, height }"></div>
</template>

<script lang="ts">
import 'echarts-gl'

import * as echarts from 'echarts'
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface Pie3DDataItem {
  name: string
  value: number
  proportion: string
  itemStyle?: {
    color?: string
    opacity?: number
  }
}

export interface Pie3DChartProps {
  data: Pie3DDataItem[]
  width?: string
  height?: string
  title?: string
  internalDiameterRatio?: number
  boxHeight?: number
  showLegend?: boolean
  showTooltip?: boolean
  showLabel?: boolean
}

export default defineComponent({
  name: 'Pie3DChart',
  props: {
    data: {
      type: Array as () => Pie3DDataItem[],
      required: true,
      default: () => [],
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    title: {
      type: String,
      default: '预警类型统计',
    },
    internalDiameterRatio: {
      type: Number,
      default: 0,
    },
    boxHeight: {
      type: Number,
      default: 20,
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const chartRef = ref<HTMLElement | null>(null)
    let chartInstance: echarts.ECharts | null = null

    // 生成扇形的曲面参数方程
    const getParametricEquation = (
      startRatio: number,
      endRatio: number,
      isSelected: boolean,
      isHovered: boolean,
      k: number,
      h: number,
    ) => {
      const midRatio = (startRatio + endRatio) / 2
      const startRadian = startRatio * Math.PI * 2
      const endRadian = endRatio * Math.PI * 2
      const midRadian = midRatio * Math.PI * 2

      // 如果只有一个扇形，则不实现选中效果
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false
      }

      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
      const hoverRate = isHovered ? 1.05 : 1

      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        x(u: number, v: number) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        y(u: number, v: number) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        z(u: number, v: number) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u)
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
        },
      }
    }

    // 生成模拟3D饼图的配置项
    const getPie3D = (
      pieData: Pie3DDataItem[],
      internalDiameterRatio: number,
      boxHeight: number,
    ) => {
      const series = []
      let sumValue = 0
      let startValue = 0
      let endValue = 0
      const legendData: string[] = []

      const k =
        typeof internalDiameterRatio !== 'undefined'
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3

      for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value

        const seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k,
          },
        }

        if (typeof pieData[i].itemStyle !== 'undefined') {
          const { itemStyle } = pieData[i]
          if (typeof pieData[i].itemStyle?.color !== 'undefined') {
            ;(seriesItem as any).itemStyle = { color: pieData[i].itemStyle?.color }
          }
          if (typeof pieData[i].itemStyle?.opacity !== 'undefined') {
            ;(seriesItem as any).itemStyle = {
              ...(seriesItem as any).itemStyle,
              opacity: pieData[i].itemStyle?.opacity,
            }
          }
        }

        series.push(seriesItem)
      }

      for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + (series[i] as any).pieData.value
        ;(series[i] as any).pieData.startRatio = startValue / sumValue
        ;(series[i] as any).pieData.endRatio = endValue / sumValue
        ;(series[i] as any).parametricEquation = getParametricEquation(
          (series[i] as any).pieData.startRatio,
          (series[i] as any).pieData.endRatio,
          false,
          false,
          k,
          boxHeight,
        )
        startValue = endValue
        legendData.push(series[i].name as string)
      }

      return {
        title: {
          show: false,
          text: props.title,
          left: 'left',
          textStyle: {
            fontSize: 14,
            color: '#333',
          },
        },
        legend: {
          show: props.showLegend,
          orient: 'horizontal',
          bottom: 50,
          // top: 'center',
          // formatter: (name: string) => {
          //   if (pieData.length) {
          //     const item = pieData.filter((item) => item.name === name)[0]
          //     return `  ${name}：${item.value}个,占比：${item.proportion}%`
          //   }
          //   return name
          // },
        },
        tooltip: {
          show: props.showTooltip,
          formatter: (params: any) => {
            const dataIndex = params.seriesIndex
            return `${params.marker}${params.seriesName}：${pieData[dataIndex].value}个，占比：${pieData[dataIndex].proportion}%`
          },
        },
        labelLine: {
          show: props.showLabel,
          normal: {
            show: props.showLabel,
            length: 10,
            length2: 10,
          },
        },
        label: {
          show: props.showLabel,
          position: 'outside',
          formatter: '{b} \n{d}%',
          textStyle: {
            fontSize: '14px',
          },
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: props.boxHeight,
          top: '-10%',
          left: '-5%',
          viewControl: {
            alpha: 35,
            beta: 30,
            rotateSensitivity: 1,
            zoomSensitivity: 0,
            panSensitivity: 0,
            distance: 350,
          },
        },
        series,
      }
    }

    // 初始化图表
    const initChart = () => {
      if (!chartRef.value) return

      // 销毁旧实例
      if (chartInstance) {
        chartInstance.dispose()
      }

      // 创建新实例
      chartInstance = echarts.init(chartRef.value)
      const option = getPie3D(props.data, props.internalDiameterRatio, props.boxHeight)
      chartInstance.setOption(option)

      // 添加窗口大小变化监听
      window.addEventListener('resize', handleResize)
    }

    // 处理窗口大小变化
    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    }

    // 组件挂载时初始化图表
    onMounted(() => {
      initChart()
    })

    // 组件卸载前销毁图表
    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      window.removeEventListener('resize', handleResize)
    })

    // 监听数据变化
    watch(
      () => props.data,
      () => {
        initChart()
      },
      { deep: true },
    )

    // 监听其他属性变化
    watch(
      () => [
        props.title,
        props.internalDiameterRatio,
        props.boxHeight,
        props.showLegend,
        props.showTooltip,
        props.showLabel,
      ],
      () => {
        initChart()
      },
    )

    return {
      chartRef,
    }
  },
})
</script>

<style scoped>
.pie-3d-chart {
  width: 100%;
  height: 500px;
}
</style>
