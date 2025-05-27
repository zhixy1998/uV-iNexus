<template>
  <div class="w-full h-screen">
    <n-config-provider :theme-overrides="appStore.naiveThemeOverrides">
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
const appStore = useAppStore()
</script>