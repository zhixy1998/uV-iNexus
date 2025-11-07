<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="报告预览">
    <template #content>
      <div class="h-150 border-1 flex">
        <div
          class="flex items-center gap-4 flex-col w-[10%] h-full overflow-auto border-r-1 cursor-pointer p-4"
        >
          <img
            class="w-20"
            v-for="item in imgOptions"
            :key="item.id"
            :class="{
              '!border-1': item.id === activityId,
            }"
            :src="item.thumbnail_base64"
            @click="previewImgFun(item.id)"
          />
        </div>
        <div class="w-[90%] bg-[#f5f5f5] relative">
          <a-button type="primary" class="!absolute top-2 right-2 z-100" @click="createReportFun"
            >生成报告
          </a-button>
          <uvOfficePdf :file-src="previewImg" />
        </div>
      </div>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import imgTop from '@/assets/images/report/quant_horz_chart_top.bmp'
import imgBottom from '@/assets/images/report/quant_vert_chart_bottom.bmp'
import imgLeft from '@/assets/images/report/quant_vert_chart_left.bmp'
import imgRight from '@/assets/images/report/quant_vert_chart_right.bmp'
import imgText from '@/assets/images/report/quant_vert_chart_text.bmp'
import imgChartOnly from '@/assets/images/report/quant_vert_chart_only.bmp'
import imgTextOnly from '@/assets/images/report/quant_horz_text_only.bmp'
import { message } from 'ant-design-vue'
import { getTotalTemplateSimple, previewTemplateSimple, reportDocsDownlodad } from '@/api'
import { useDownloadFile } from '@/composables/useDownloadFile.ts'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  modelValue: Boolean,
  taskId: String,
  sampleId: Array,
  analysisId: Array,
  measureType: {
    type: String,
    default: '光谱扫描',
  },
  showAbsOrT: String,
  digit: Number,
  pictureBlob: [String, Blob],
  isRepeatMode: Boolean,
})
const measureTypeInt = computed(() => {
  switch (props.measureType) {
    case '光谱扫描':
      return 0
    case '时间扫描':
      return 1
    case '定量测定':
      return 2
    case '光度测量':
      return 3
  }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const previewImg = ref('')
const activityId = ref('')
// const imgOptions = [
//   {
//     type: 'imgTop',
//     src: imgTop,
//   },
//   {
//     type: 'imgBottom',
//     src: imgBottom,
//   },
//   {
//     type: 'imgLeft',
//     src: imgLeft,
//   },
//   {
//     type: 'imgRight',
//     src: imgRight,
//   },
//   {
//     type: 'imgText',
//     src: imgText,
//   },
//   {
//     type: 'imgChartOnly',
//     src: imgChartOnly,
//   },
//   {
//     type: 'imgTextOnly',
//     src: imgTextOnly,
//   },
// ]
const imgOptions = ref<Record<string, any>[]>([])
const getTotalTemplateSimpleFun = async () => {
  const { code, data } = await getTotalTemplateSimple({
    desc: '0',
    page: '1',
    page_size: '100',
    experiment_type: measureTypeInt.value,
  })
  if (code === 200) {
    imgOptions.value = data.template_list
    activityId.value = data.template_list[0].id
    await previewTemplateSimpleFun(data.template_list[0].id)
  }
}
const previewTemplateSimpleFun = async (id: string) => {
  const params: Record<string, any> = {
    template_id: id,
    task_id: props.taskId,
    serial_number: localStorage.getItem('deviceSerialNumber') || '',
    // is_repeat_mode: props.isRepeatMode ? '1' : '0',
  }
  // if (props.sampleId) {
  //   params.sample_id = props.sampleId.join(',')
  // }
  if (props.analysisId) {
    params.analysis_id = props.analysisId.join(',')
  }
  if (props.pictureBlob) {
    params.image_base64 = props.pictureBlob
  }
  if (props.showAbsOrT === '1' || props.showAbsOrT === '0') {
    params.all_display = props.showAbsOrT
  }
  if (props.digit) {
    params.digit = props.digit
  }
  const { code, data } = await previewTemplateSimple(params)
  if (code === 200) {
    previewImg.value = data.pdf
  }
}
const previewImgFun = (id: string) => {
  activityId.value = id
  previewTemplateSimpleFun(id)
}
const createReportFun = async () => {
  const params: Record<string, any> = {
    task_id: props.taskId as string,
    template_id: activityId.value,
    serial_number: localStorage.getItem('deviceSerialNumber') || '',
    // is_repeat_mode: props.isRepeatMode ? '1' : '0',
  }
  // if (props.sampleId) {
  //   params.sample_id = props.sampleId.join(',')
  // }
  if (props.analysisId) {
    params.analysis_id = props.analysisId.join(',')
  }
  if (props.pictureBlob) {
    params.image_base64 = props.pictureBlob
  }
  if (props.showAbsOrT === '1' || props.showAbsOrT === '0') {
    params.all_display = props.showAbsOrT
  }
  if (props.digit) {
    params.digit = props.digit
  }
  const res = await reportDocsDownlodad(params)
  useDownloadFile(res.data, `${props.measureType}报告.docx`)
}
onMounted(() => {
  getTotalTemplateSimpleFun()
})
</script>

<style lang="less" scoped></style>
