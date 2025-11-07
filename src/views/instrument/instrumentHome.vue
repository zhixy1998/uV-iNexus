<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <!-- <navHeader :navList="navList" className="w-[20%] h-[110px]" class="!mb-[30px]" /> -->
    <on-or-off />
    <state-monitor class="!mt-[20px]" />
    <!-- <div class="flex justify-between !mt-[20px]">
      <usage-statistics class="w-[35%]" />
      <use-history class="!ml-[40px] w-[65%]" />
    </div> -->
  </section>
</template>

<script lang="ts" setup>
import autolabConfigIcon from '@/assets/images/instrument/autolab_config_icon.png'
import historicalTaskIcon from '@/assets/images/instrument/historical_task_icon.png'
import instrumentCalibrationIcon from '@/assets/images/instrument/instrument_calibration_icon.png'
import instrumentConfigIcon from '@/assets/images/instrument/instrument_config_icon.png'
import softwareActivation from '@/assets/images/instrument/softwareActivation.png'
import usageStatisticsIcon from '@/assets/images/instrument/usage_statistics_icon.png'

import OnOrOff from './components/OnOrOff.vue'
import StateMonitor from './components/StateMonitor.vue'
import UsageStatistics from './components/UsageStatistics.vue'
import UseHistory from './components/UseHistory.vue'

const navList = [
  {
    name: '仪器配置',
    icon: instrumentConfigIcon,
    className: 'w-[54px]',
    color: '#5CB265',
    toPath: '/instrument/instrumentConfig',
  },
  {
    name: '自动进样器配置',
    icon: autolabConfigIcon,
    className: 'w-[42px]',
    color: '#5B81D1',
    toPath: '/instrument/autolabConfig',
  },
  {
    name: '仪器校正',
    icon: instrumentCalibrationIcon,
    className: 'w-[47px]',
    color: '#937DDA',
    toPath: '/instrument/instrumentCalibration',
  },
  {
    name: '历史检测任务',
    icon: historicalTaskIcon,
    className: 'w-[46px]',
    color: '#DAB27D',
    toPath: '/instrument/historicalTask',
  },
  {
    name: '仪器使用统计',
    icon: usageStatisticsIcon,
    className: 'w-[43px]',
    color: '#D57DDA',
    toPath: '/instrument/usageStatisticsDetail',
  },
  {
    name: '软件激活',
    icon: softwareActivation,
    className: 'w-[43px]',
    color: '#113371',
    toPath: '/instrument/softwareActivation',
  },
]
</script>

<style scoped lang="less"></style>
