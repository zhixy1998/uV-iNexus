<template>
  <a-button block @click="buttonClick" class="!w-auto !flex-grow-0">
    <template #icon>
      <div class="flex items-center gap-1 px-2 justify-center">
        <slot name="icon"></slot>
        {{ content }}
      </div>
    </template>
  </a-button>
</template>
<script lang="ts" setup>
const props = defineProps({
  content: String,
})
const emits = defineEmits(['click'])
const buttonClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>
