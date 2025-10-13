<template>
  <uvModal v-model="model" title="方法设置">
    <template #content> </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import uvModal from '@/components/uvModal/index.vue'
const model = defineModel()
</script>
