<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!leading-9 text-[16px] !pl-8">
    <div class="title !mb-3" :style="{ color: primaryColor }">设计全景沙盘</div>
    <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
    <div class="content-box">
      <div class="sub-title !mb-3">原始记录模板统计</div>
      <echarts-rose :seriesData="seriesData" id="echartsRose" />
      <div class="sub-title !mb-3 !mt-3">测量数据模板统计</div>
      <echarts-rose :seriesData="seriesData2" id="echartsRose2" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { getReportIndustry } from '@/api'
import EchartsRose from '@/components/echartsRose/index.vue'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()
const seriesData = ref<any[]>([])
const seriesData2 = ref<any[]>([])

const getIndustry = async () => {
  const { code, data } = await getReportIndustry()
  if (code === 200) {
    seriesData.value = Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }))
  }
}

onMounted(() => {
  getIndustry()
})
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}
.content-box {
  padding: 30px 20px;
}
.sub-title {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
}
</style>
