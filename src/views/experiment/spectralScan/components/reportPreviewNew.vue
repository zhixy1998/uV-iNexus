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
          <!-- <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
        </a-select>
      </template>
      <template #slot-content>
        <uvOffice :file-url="fileContentReport" />
      </template>
    </uvCollapseRightSlot>
    <br />
    <uvCollapseRightSlot :parent-active-key="activityRecord">
      <template #slot-title>
        <a-checkbox v-model:checked="checkedRecord" @click.stop
          ><div class="title">原始记录模板</div></a-checkbox
        >
      </template>
      <template #slot-header>
        <uvHasIconBtn
          content="预览"
          @click.stop
          @click="exportOriginalReportDocxFun('record')"
        ></uvHasIconBtn>
      </template>
      <template #slot-center>
        <a-select
          ref="select"
          v-model:value="templateValueRecord"
          @change="handleChange"
          class="w-xs !ml-2"
        >
          <a-select-option
            v-for="(item, index) in templatesArrRecord"
            :value="item.id"
            :key="`${index}item`"
            >{{ item.name }}</a-select-option
          >
          <!-- <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
        </a-select>
      </template>
      <template #slot-content>
        <uvOffice :file-url="fileContentRecord" />
      </template>
    </uvCollapseRightSlot>
    <br />
  </section>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

import {
  exportOriginalReportDocx,
  getReportTemplate,
  spectrumExportDoc,
  spectrumGetBookMark,
} from '@/api'
import headTitle from '@/components/headTitle'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvOffice from '@/components/uvOffice/index.vue'
const templateValueReport = ref('')
const templateValueRecord = ref('')
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
const templatesArrRecord = ref<
  {
    id: string
    name: string
  }[]
>([])
const booksArr = ref([])
const checkedReport = ref(false)
const checkedRecord = ref(false)
const activityReport = ref<string[]>([])
const activityRecord = ref<string[]>([])
const fileContentReport = ref<string | ArrayBuffer>('/preview.docx')
const fileContentRecord = ref<string | ArrayBuffer>('/preview.docx')
const getBooks = () => {
  spectrumGetBookMark({
    template_id: templateValueReport.value,
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
      template_id: templateValueReport.value,
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

      // }

      // const url = window.URL.createObjectURL(blob)
      // fileContent.value = url
    } catch (err) {
      console.log(err, 'err')
    }
  }, 100)
}
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
// 结果数据中 选中的样品id
const checkedSampleKeys = ref('')
const updateChekedSampleKeys = (data: any) => {
  checkedSampleKeys.value = data
}
defineExpose({ updateChekedSampleKeys })
const exportOriginalReportDocxFun = async (type?: string) => {
  if (type === 'report') {
    activityReport.value = ['1']
  } else if (type === 'record') {
    activityRecord.value = ['1']
  }
  try {
    const params: Record<string, any> = {
      task_id: props.taskId || '',
      noToken: true,
      responseType: 'blob',
    }
    if (!type) {
      const arr = [templateValueReport.value, templateValueRecord.value].filter((item) => item)
      // console.log(arr, 'arr', arr.length)
      if (arr.length < 1) {
        message.error('请选择模板')
        return
      }
      if (!(checkedReport.value || checkedRecord.value)) {
        message.error('请选择模板')
        return
      }
      if (checkedReport.value) params.report_template_id = templateValueReport.value
      if (checkedRecord.value) params.original_template_id = templateValueRecord.value
      params.sample_id = checkedSampleKeys.value
    } else if (type === 'report') {
      if (!templateValueReport.value) {
        message.error('请选择报告模板')
        return
      }
      params.report_template_id = templateValueReport.value
    } else if (type === 'record') {
      if (!templateValueRecord.value) {
        message.error('请选择原始记录模板')
        return
      }
      params.original_template_id = templateValueRecord.value
    }
    const { data, headers } = await exportOriginalReportDocx(params)
    // const contentType = headers['content-type']
    // const blob = new Blob(data, {
    //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // })
    // console.log(data instanceof Blob, 'typeof data')
    // const fileReader = new FileReader()
    // fileReader.readAsArrayBuffer(blob)
    // fileReader.onload = () => {
    if (type === 'report') {
      fileContentReport.value = data as ArrayBuffer
    } else if (type === 'record') {
      fileContentRecord.value = data as ArrayBuffer
    } else {
      const url = window.URL.createObjectURL(new Blob([data]))

      // 创建一个a标签，并设置download属性来触发下载
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${props.measurementType}模板.docx`) // 设置下载后的文件名
      document.body.appendChild(link)
      link.click()
      // 清理资源
      link.remove()
      window.URL.revokeObjectURL(url)
    }
    // }

    // const url = window.URL.createObjectURL(blob)
    // fileContent.value = url
  } catch (err) {
    console.log(err, 'err')
  }
}
onMounted(async () => {
  // spectrumGetTemplate({ noToken: true }).then(({ code, data }) => {
  //   templatesArr.value = data.template_list
  //   templateValue.value = templatesArr.value[0].id
  //   getBooks()
  // })
  templatesArrReport.value = (await getReportTemplateFun('1')) as any
  templatesArrRecord.value = (await getReportTemplateFun('0')) as any
  console.log(templatesArrRecord.value, templatesArrReport.value, 'templatesArrRecord')
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
