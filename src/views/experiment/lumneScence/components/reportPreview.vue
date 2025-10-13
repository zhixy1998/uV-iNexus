<template>
  <section>
    <headTitle title="结果数据">
      <template #btn>
        <div class="flex gap-4 items-center">
          <uvHasIconBtn content="生成报告"> </uvHasIconBtn>
          <uvHasIconBtn content="打印"> </uvHasIconBtn>
        </div>
      </template>
    </headTitle>
    <br />
    <div class="flex items-center gap-4">
      <span class="!font-bold">报告</span>
      <div class="flex items-center">
        <span>报告模板</span>
        <a-select ref="select" v-model:value="value1" @change="handleChange" class="w-xs !ml-2">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
    </div>
    <uvOfficeDocx :file-url="'/preview.docx'"/>
    <div class="flex justify-around">
      <uvHasIconBtn content="保存结果"> </uvHasIconBtn>
      <uvHasIconBtn content="结果打印"> </uvHasIconBtn>
      <uvHasIconBtn content="数据导出"> </uvHasIconBtn>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import headTitle from '@/components/headTitle'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvOfficeDocx from '@/components/uvOfficeDocx/index.vue'
const value1 = ref('')
const handleChange = () => {}
</script>
