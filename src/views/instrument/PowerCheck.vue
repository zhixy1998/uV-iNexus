<template>
  <div class="Powercheck">
    <a-button type="primary" @click="takeAxios">Primary Button</a-button>
  </div>
</template>

<script lang="ts" setup>
import { getUserInfo } from '@/api'
const takeAxios = async () => {
  const data = await getUserInfo()
  console.log(data)
}
</script>
