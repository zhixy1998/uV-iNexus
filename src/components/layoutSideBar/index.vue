<template>
  <div class="layoutSiderBar">
    <h1>This is an layoutSiderBar</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {},
  setup() {
    return {
      selectedKeys1: ref<string[]>(['2']),
    }
  },
})
</script>
