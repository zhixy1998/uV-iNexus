<template>
  <div class="about">
    <n-space vertical>
      <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
      <n-input v-model:value="value" type="textarea" placeholder="基本的 Textarea" />
      <n-button @click="takeAxios">Default</n-button>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getUserInfo } from '@/api'
const value = ref('')
const takeAxios = async () => {
  await getUserInfo()
}
</script>