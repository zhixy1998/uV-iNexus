<template>
  <uvModal v-model="model" title="通用参数修改">
    <template #content>
      <h1 class="text-base">弹出框弹出情境设置</h1>
      <a-checkbox-group v-model:value="valueTip" class="!mb-8">
        <a-row v-for="(item, index) in plainOptions" :key="`${index}check`">
          <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
        </a-row>
      </a-checkbox-group>
      <h1 class="text-base">最近信息显示设置</h1>
      <div class="flex items-center !mb-8">
        仅显示最近使用的<a-input v-model:value="value" class="!w-10 !mx-4" />个任务
      </div>
      <h1 class="text-base">结果数据目录设置</h1>
      <div class="flex items-center !mb-8">默认的数据导出路径<uvFileInput></uvFileInput></div>
      <h1 class="text-base">测量设置</h1>
      <a-checkbox-group v-model:value="value2">
        <a-row v-for="(item, index) in plainOption1" :key="`${index}check`">
          <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
        </a-row>
      </a-checkbox-group>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'

import headTitle from '@/components/headTitle'
import uvFileInput from '@/components/uvFileInput/index.vue'
import uvModal from '@/components/uvModal/index.vue'
const model = defineModel()
const valueTip = ref([])
const value = ref([])
const value1 = ref([])
const value2 = ref([])
const plainOptions = [
  { label: '测量前弹框提示', value: 'Apple' },
  { label: '测量后弹框提示', value: 'Pear' },
  { label: '测量后奏提示音', value: 'Orange' },
]
const plainOption1 = [{ label: '显示删除样品', value: 'Apple' }]
</script>
