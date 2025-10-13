<template>
  <section>
    <uv-collapse :parentActiveKey="activeKey" title="仪器状态监控" @changeCollapse="changeCollapse">
      <template #slot-content>
        <div class="!leading-9">
          <text class="flex flex-row justify-end !text-[#0038a8]">查看详情</text>
          [图片待定]
        </div>
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import uvCollapse from '@/components/uvCollapse/index.vue'

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}

onMounted(async () => {})
</script>

<style scoped lang="less"></style>
