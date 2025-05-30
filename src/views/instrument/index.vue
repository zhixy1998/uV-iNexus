<template>
  <section class="page">
    <on-or-off />
    <state-monitor class="!mt-6" />
  </section>
</template>

<script lang="ts" setup>
import OnOrOff from './components/OnOrOff.vue'
import StateMonitor from './components/StateMonitor.vue'

</script>

<style scoped lang="less">
.page {
  // background: #f8f8f8;
}
</style>
