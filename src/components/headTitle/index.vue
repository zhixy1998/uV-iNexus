<template>
  <div class="flex items-center justify-between border-b py-3">
    <div class="text-xl flex">
      <span>{{ title }}</span>
      <slot name="leftExtra"></slot>
    </div>
    <div class="mx-auto">
      <slot name="center"></slot>
    </div>

    <slot name="btn">
    </slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: String,
})
</script>

<style scoped></style>
