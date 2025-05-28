<template>
  <div class="w-full h-screen">
    <a-config-provider :theme="appStore.naiveThemeOverrides">
      <RouterView />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
const appStore = useAppStore()
</script>
