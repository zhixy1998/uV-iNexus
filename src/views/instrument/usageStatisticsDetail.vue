<template>
  <section>
    <div class="flex flex-row items-center justify-end">
      <a-range-picker
        v-model:value="ruleForm.dateRange"
        :placeholder="['请选择开始日期', '请选择结束日期']"
        @change="changeDateRange"
      />
    </div>
    <uv-collapse :parentActiveKey="activeKeyStatistics" title="仪器使用率统计" class="!mt-6">
      <template #slot-content>
        <echarts-line
          :legendData="['仪器1', '仪器2']"
          :xAxisOptions="statisticsChartOptions.xAxisOptions"
          :yAxisOptions="statisticsChartOptions.yAxisOptions"
          :seriesOptions="statisticsChartOptions.seriesOptions"
        />
      </template>
    </uv-collapse>
    <uv-collapse :parentActiveKey="activeKeyUser" title="用户使用率统计" class="!mt-6">
      <template #slot-content>
        <echarts-rose :seriesData="seriesDataUser" />
      </template>
    </uv-collapse>
    <uv-collapse :parentActiveKey="activeKeyType" title="检测类型分项统计" class="!mt-6">
      <template #slot-content>
        <echarts-bar
          :xAxisOptions="typeChartOptions.xAxisOptions"
          :yAxisOptions="typeChartOptions.yAxisOptions"
          :seriesData="typeChartOptions.seriesData"
        />
      </template>
    </uv-collapse>
    <uv-collapse :parentActiveKey="activeKeyProject" title="检测项目分项统计" class="!mt-6">
      <template #slot-content>
        <echarts-horizontal-bar
          :yAxisOptions="projectChartOptions.yAxisOptions"
          :seriesData="projectChartOptions.seriesData"
        />
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import { reactive, type Ref, ref } from 'vue'

import EchartsBar from '@/components/echartsBar/index.vue'
import EchartsHorizontalBar from '@/components/echartsHorizontalBar/index.vue'
import EchartsLine from '@/components/echartsLine/index.vue'
import EchartsRose from '@/components/echartsRose/index.vue'
import uvCollapse from '@/components/uvCollapse/index.vue'

// 日期筛选
const ruleForm = ref({
  dateRange: [],
})
const changeDateRange = (value: []) => {
  console.log('changeDateRange', value)
}
// 仪器使用率统计
const activeKeyStatistics = ref<string>('')
const statisticsChartOptions = reactive({
  xAxisOptions: {
    name: '月份',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxisOptions: {
    name: '使用率',
    min: 0,
    max: 100,
  },
  seriesOptions: [
    {
      name: '仪器1',
      type: 'line',
      // itemStyle: {
      //   color: '#5b9bd5',
      //   borderColor: '#5b9bd5',
      //   borderWidth: 4,
      // },
      lineStyle: {
        width: 3,
      },
      data: [100, 50, 80, 88, 10, 20],
    },
    {
      name: '仪器2',
      type: 'line',
      // itemStyle: {
      //   color: '#ed7d31',
      //   borderColor: '#ed7d31',
      //   borderWidth: 4,
      // },
      lineStyle: {
        width: 3,
      },
      data: [60, 70, 80, 98, 50, 70],
    },
  ],
})
// 用户使用率统计
const activeKeyUser = ref<string>('')
const seriesDataUser = [
  {
    name: '用户1',
    value: 100,
  },
  {
    name: '用户2',
    value: 80,
  },
  {
    name: '用户3',
    value: 60,
  },
  {
    name: '用户4',
    value: 40,
  },
  {
    name: '用户5',
    value: 20,
  },
]
// 检测类型分项统计
const activeKeyType = ref<string>('')
const typeChartOptions = reactive({
  xAxisOptions: {
    name: '检测类型',
    data: ['类型1', '类型2', '类型3', '类型4', '类型5', '类型6'],
  },
  yAxisOptions: {
    name: '使用次数',
  },
  seriesData: [120, 39, 48, 90, 67, 100],
})
// 检测项目分项统计
const activeKeyProject = ref<string>('')
const projectChartOptions = reactive({
  yAxisOptions: {
    data: ['氨氮', '总磷', '总氮', '茶多酚', '铝', '硝酸盐'],
  },
  seriesData: [120, 39, 48, 90, 67, 100],
})
</script>

<style lang="less" scoped></style>
