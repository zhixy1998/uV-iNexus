<template>
  <div class="flex items-center justify-between py-3 headTitle">
    <div class="text-lg flex">
      <span class="!font-bold">{{ title }}</span>
      <slot name="leftExtra"></slot>
    </div>
    <div class="mx-auto">
      <slot name="center"></slot>
    </div>

    <slot name="btn"> </slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="less">
.headTitle {
  border-bottom: 1px solid #f0f0f0;
}
</style>
