<template>
  <section>
    <per-see-collapse
      :parentActiveKey="activeKey"
      title="仪器状态监控"
      @changeCollapse="changeCollapse"
    >
      <template #slot-header>
        <a-divider />
      </template>
      <template #slot-content>
        <div class="!leading-9"></div>
      </template>
    </per-see-collapse>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import PerSeeCollapse from '@/components/PerSeeCollapse.vue'

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}

onMounted(async () => {})
</script>

<style scoped lang="less"></style>
