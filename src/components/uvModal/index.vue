<template>
  <div>
    <a-modal
      v-model:visible="model"
      :title="title"
      :width="`${props.size === 'big' ? '70%' : '30%'}`"
      @ok="handleOk"
      :bodyStyle="bodyStyle"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
      </template>
      <slot name="content"></slot>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
type ModelSize = 'small' | 'big'
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  size: {
    type: String,
    default: 'big',
  },
})
// const modelWidth = computed(() => (props.size === 'big' ? '70%' : '30%'))
const model = defineModel()
const loading = ref<boolean>(false)
const emit = defineEmits(['handleOk', 'handleCancel'])
const showModal = () => {
  model.value = true
}
const bodyStyle = reactive({
  padding: '20px 10% 0px 9%',
})
const handleOk = () => {
  loading.value = true
  emit('handleOk')
  setTimeout(() => {
    loading.value = false
    model.value = false
  }, 2000)
}

const handleCancel = () => {
  model.value = false
  emit('handleCancel')
}
</script>
