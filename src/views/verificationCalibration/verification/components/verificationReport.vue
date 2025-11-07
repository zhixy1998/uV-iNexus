<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="page-container">
    <headTitle title="报告预览">
      <template #btn>
        <div class="flex gap-4 items-center">
          <uvHasIconBtn content="生成报告" @click="exportOriginalReportDocxFun()"> </uvHasIconBtn>
          <uvHasIconBtn content="打印"> </uvHasIconBtn>
        </div>
      </template>
    </headTitle>
    <br />
    <uvCollapseRightSlot :parentActiveKey="activityReport">
      <template #slot-title>
        <a-checkbox v-model:checked="checkedReport" @click.stop
          ><div class="title">报告模板</div></a-checkbox
        >
      </template>
      <template #slot-header>
        <uvHasIconBtn
          content="预览"
          @click.stop
          @click="exportOriginalReportDocxFun('report')"
        ></uvHasIconBtn>
      </template>
      <template #slot-center>
        <a-select
          ref="select"
          v-model:value="templateValueReport"
          @change="handleChange"
          class="w-xs !ml-2"
        >
          <a-select-option
            v-for="(item, index) in templatesArrReport"
            :value="item.id"
            :key="`${index}item`"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </template>
      <template #slot-content>
        <uvOffice :file-url="fileContentReport" />
      </template>
    </uvCollapseRightSlot>
    <br />
  </section>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { getReportTemplate } from '@/api'
import headTitle from '@/components/headTitle'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvOffice from '@/components/uvOffice/index.vue'
const templateValueReport = ref('')
const props = defineProps({
  imageBase64: String,
  taskId: String,
  measurementType: String,
})
const emits = defineEmits(['screenshot'])
const handleChange = () => {}
const templatesArrReport = ref<
  {
    id: string
    name: string
  }[]
>([])
const checkedReport = ref(false)
const activityReport = ref<string[]>([])
const fileContentReport = ref<string | ArrayBuffer>('/preview.docx')
const getReportTemplateFun = (type: string) => {
  return new Promise(async (resolve) => {
    getReportTemplate({
      type: type,
    }).then(({ code, data }) => {
      if (code === 200) {
        const list = data.template_list?.map((item: any) => {
          return {
            name: item.name,
            id: item.id,
          }
        })
        resolve(list)
      }
    })
  })
}
const exportOriginalReportDocxFun = async (type?: string) => {}
onMounted(async () => {
  // templatesArrReport.value = (await getReportTemplateFun('1')) as any
})
</script>
<style lang="less" scoped>
.page-container {
  padding: 0px 31px;
  border-radius: 12px;
  color: #153471;
  background-color: rgba(233, 241, 253, 0.5);
  .headTitle {
    border-bottom: 1px solid #153471;
    margin: 0px -31px;
    padding: 12px 31px;
  }
  :deep(.ant-collapse-item) {
    border-radius: 0px !important;
  }
}
.title {
  width: 100px !important;
  font-size: 16px;
  font-weight: bold;
}
</style>
