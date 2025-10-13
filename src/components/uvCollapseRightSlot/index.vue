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
          <div class="flex items-center justify-between">
            <div class="title">{{ title }}</div>
            <div class="margin-auto" @click.stop>
              <slot name="slot-center"></slot>
            </div>
            <slot name="slot-header"> </slot>
          </div>
        </template>
        <slot name="slot-content" @click.stop></slot>
      </a-collapse-panel>
    </a-collapse>
  </section>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'

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
