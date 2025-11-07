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
          <uvHasIconBtn content="生成报告" @click="generateReport"> </uvHasIconBtn>
          <uvHasIconBtn content="打印"> </uvHasIconBtn>
        </div>
      </template>
    </headTitle>
    <br />
    <div class="flex items-center gap-4">
      <span class="!font-bold">报告</span>
      <div class="flex items-center">
        <span>报告模板</span>
        <a-select
          ref="select"
          v-model:value="templateValue"
          @change="handleChange"
          class="w-xs !ml-2"
        >
          <a-select-option
            v-for="(item, index) in templatesArr"
            :value="item.id"
            :key="`${index}item`"
            >{{ item.name }}</a-select-option
          >
          <!-- <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
        </a-select>
      </div>
    </div>
    <br />
    <uvOffice :file-url="fileContent" />
    <!-- <uvOffice :file-url="'/previewExcel.xlsx'"/> -->
    <br />
    <div class="flex justify-around">
      <uvHasIconBtn content="保存结果"> </uvHasIconBtn>
      <uvHasIconBtn content="结果打印"> </uvHasIconBtn>
      <uvHasIconBtn content="数据导出"> </uvHasIconBtn>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { spectrumExportDoc, spectrumGetBookMark, spectrumGetTemplate } from '@/api'
import headTitle from '@/components/headTitle'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvOffice from '@/components/uvOffice/index.vue'
const templateValue = ref('')
const props = defineProps({
  imageBase64: String,
})
const emits = defineEmits(['screenshot'])
const handleChange = () => {}
const templatesArr = ref<
  {
    id: string
    name: string
  }[]
>([])
const booksArr = ref([])
const fileContent = ref<string | ArrayBuffer>('/preview.docx')
const getBooks = () => {
  spectrumGetBookMark({
    template_id: templateValue.value,
  }).then(({ code, data }) => {
    if (code === 200) {
      booksArr.value = data.bookmarks
    }
  })
}
const generateReport = async () => {
  await emits('screenshot')
  setTimeout(async () => {
    const templateData = {
      template_id: templateValue.value,
      bookmark_data: [
        {
          bookmarket_name: 'MeasureRangeValue',
          type: 0,
          value: 'sahfafjsl',
        },
        {
          bookmarket_name: 'img_img',
          type: 2,
          value: props.imageBase64,
        },
        {
          bookmarket_name: 'sheet_sheet',
          type: 1,
          value: [
            ['a', 'b', 'c'],
            [1, 2, 3],
            [4, 5, 6],
          ],
        },
      ],
    }
    try {
      const { data, headers } = await spectrumExportDoc({
        noToken: true,
        data: templateData,
        responseType: 'blob',
      })
      const contentType = headers['content-type']
      // const blob = new Blob(data, {
      //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // })
      // console.log(data instanceof Blob, 'typeof data')
      // const fileReader = new FileReader()
      // fileReader.readAsArrayBuffer(blob)
      // fileReader.onload = () => {
      fileContent.value = data as ArrayBuffer
      // }

      // const url = window.URL.createObjectURL(blob)
      // fileContent.value = url
    } catch (err) {
      console.log(err, 'err')
    }
  }, 100)
}
onMounted(async () => {
  spectrumGetTemplate({ noToken: true }).then(({ code, data }) => {
    templatesArr.value = data.template_list
    templateValue.value = templatesArr.value[0].id
    getBooks()
  })
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
</style>
