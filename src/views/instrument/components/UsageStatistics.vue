<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uv-collapse
      :parentActiveKey="activeKey"
      title="仪器使用统计"
      style-name="background: #F4FAFF"
      @changeCollapse="changeCollapse"
    >
      <template #slot-content>
        <div class="!leading-9 !mb-10 flex flex-row items-center justify-between">
          <text class="text-[14px] !font-bold">仪器使用率统计</text>
          <div class="flex flex-row items-center">
            <a-range-picker
              v-model:value="ruleForm.dateRange"
              :placeholder="['请选择日期', '请选择日期']"
              @change="changeDateRange"
            />
            <div class="!ml-6 button" :style="{ color: primaryColor }" @click.stop="handleDetail">
              全部统计
            </div>
          </div>
        </div>
        <div class="charts-container">
          <echarts-line
            :legendData="['仪器1', '仪器2']"
            :xAxisOptions="xAxisOptions"
            :yAxisOptions="yAxisOptions"
            :seriesOptions="seriesOptions"
            className="h-[240px]"
          />
        </div>
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

import uvCollapse from '@/components/uvCollapse/index.vue'
import { useAppStore } from '@/stores'

const router = useRouter()
const { primaryColor } = useAppStore()

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
    lineStyle: {
      width: 4,
    },
    data: [100, 50, 80, 88, 10, 20],
  },
  {
    name: '仪器2',
    type: 'line',
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

<style scoped lang="less">
.charts-container {
  display: flex;
  justify-content: center;
}

.button {
  padding: 0px 5px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 11px;
  color: #113371;
  background: #e6e6e6;
  cursor: pointer;
}
</style>
