<template>
  <section class="page">
    <on-or-off />
    <state-monitor class="!mt-6" />
    <usage-statistics class="!mt-6" />
    <use-history class="!mt-6" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import OnOrOff from './components/OnOrOff.vue'
import StateMonitor from './components/StateMonitor.vue'
import UsageStatistics from './components/UsageStatistics.vue'
import UseHistory from './components/UseHistory.vue'
</script>

<style scoped lang="less">
.page {
  // background: #f8f8f8;
}
</style>
