<template>
  <section>
    <uv-collapse :parentActiveKey="activeKey" title="仪器使用统计" @changeCollapse="changeCollapse">
      <template #slot-content>
        <div class="!leading-9 !mb-10 flex flex-row items-center justify-between">
          <text class="text-[15px]">仪器使用率统计</text>
          <div class="flex flex-row items-center">
            <a-range-picker
              v-model:value="ruleForm.dateRange"
              :placeholder="['请选择开始日期', '请选择结束日期']"
              @change="changeDateRange"
            />
            <text class="!ml-6 !text-[#0038a8] cursor-pointer" @click.stop="handleDetail"
              >查看全部统计</text
            >
          </div>
        </div>
        <echarts-line
          :legendData="['仪器1', '仪器2']"
          :xAxisOptions="xAxisOptions"
          :yAxisOptions="yAxisOptions"
          :seriesOptions="seriesOptions"
        />
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

import EchartsLine from '@/components/echartsLine/index.vue'
import uvCollapse from '@/components/uvCollapse/index.vue'

const router = useRouter()

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}
// 日期筛选
const ruleForm = ref({
  dateRange: [],
})
const changeDateRange = (value: []) => {
  console.log('changeDateRange', value)
}
// 统计图
const xAxisOptions = {
  name: '月份',
  data: ['1月', '2月', '3月', '4月', '5月', '6月'],
}
const yAxisOptions = {
  name: '使用率',
  min: 0,
  max: 100,
}
const seriesOptions = ref([
  {
    name: '仪器1',
    type: 'line',
    itemStyle: {
      color: '#5b9bd5',
      borderColor: '#5b9bd5',
      borderWidth: 4,
    },
    lineStyle: {
      width: 4,
    },
    data: [100, 50, 80, 88, 10, 20],
  },
  {
    name: '仪器2',
    type: 'line',
    itemStyle: {
      color: '#ed7d31',
      borderColor: '#ed7d31',
      borderWidth: 4,
    },
    lineStyle: {
      width: 4,
    },
    data: [60, 70, 80, 98, 50, 70],
  },
])

// 跳转详情
const handleDetail = () => {
  router.push({ name: 'usageStatisticsDetail' })
}
onMounted(async () => {})
</script>

<style scoped lang="less"></style>
