<template>
  <a-select
    :value="modelValue"
    mode="mode"
    style="width: 100%"
    :placeholder="placeholder"
    :options="[...Array(25)].map((_, i) => ({ options: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  mode: {
    type: String,
    default: 'multiple',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  modelValue: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`)
  emit('update:modelValue', value)
}
const options = ref(['a1', 'b2'])
</script>
