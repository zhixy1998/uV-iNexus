<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

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
