<template>
  <div>
    <a-input v-model:value="value" placeholder="Basic usage" />
    <a-button>...</a-button>
    <a-input v-model="valuePath" type="file" directory></a-input>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const valuePath = ref<string>('')
const value = ref<string>('')
</script>
