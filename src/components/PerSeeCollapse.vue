<template>
  <section>
    <a-collapse
      v-model:activeKey="activeKey"
      expandIconPosition="end"
      class="!bg-white"
      @change="changeCollapse"
    >
      <a-collapse-panel key="1">
        <template #header>
          <div class="title">{{ title }}</div>
          <slot name="slot-header"> </slot>
        </template>
        <slot name="slot-content"></slot>
      </a-collapse-panel>
    </a-collapse>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue'

const props = defineProps({
  parentActiveKey: {
    type: [String, Array, Number] as PropType<string | string[] | number>,
    default: '1',
  },
  title: {
    type: String,
    default: '仪器开关机',
  },
})
const activeKey = ref<string | string[] | number>('')
watch(
  () => props.parentActiveKey,
  (newValue) => {
    activeKey.value = newValue
  },
  { immediate: true },
)
// 触发事件
const emit = defineEmits(['changeCollapse'])
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value
  emit('changeCollapse', value)
}
</script>

<style scoped lang="less">
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
