<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!leading-9 text-[16px] !pl-8">
    <report-template
      title="报告模板列表"
      :menuType="3"
      :columns="tableColumns"
      :updateData="updateData"
      :templateId="currentRow?.id"
      @handleCurrentRowChange="handleCurrentRowChange"
    />
    <div class="title" :style="{ color: primaryColor }">源码展示区</div>
    <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
    <div class="content-box">
      <div>模板名称：{{ currentRow?.name }}</div>
      <div class="flex items-center justify-between">
        <div>模板源码：{{ currentRow?.name }}</div>
        <a-button type="primary" class="!flex flex-row items-center">
          <template #icon>
            <sync-outlined />
          </template>
          重新生成模板
        </a-button>
      </div>
      <div class="!mt-4 content-box-code">111</div>
    </div>
    <div class="title" :style="{ color: primaryColor }">文件预览区</div>
    <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
    <div class="file-preview-box">
      <uvOfficeDocx :file-url="fileContent" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { SyncOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'

import { getReportContent } from '@/api'
import { useAppStore } from '@/stores'
import reportTemplate from '@/views/reportDesign/components/reportTemplate.vue'

const { primaryColor } = useAppStore()

// 表格
const updateData = ref(false) // 更新数据
const tableColumns = [
  {
    title: '模板ID',
    field: 'id',
    sortable: true,
    width: 120,
  },
  {
    title: '模板名称',
    field: 'name',
  },
  {
    title: '类型',
    field: 'type_decs',
  },
  {
    title: '创建时间',
    field: 'create_datetime',
    sortable: true,
    width: 170,
  },
  {
    title: '修改时间',
    field: 'update_datetime',
    sortable: true,
    width: 170,
  },
  {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: 120,
    slots: {
      default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
    },
  },
]
const currentRow = ref<any>() // 选中的模板id
const handleCurrentRowChange = async (row: { id: number; type_decs: string }) => {
  currentRow.value = row
  fileContent.value = ''
  await getFileContent()
}

// 预览
const fileContent = ref<string>('')
const getFileContent = async () => {
  console.log('currentRow.value', currentRow.value)
  const { code, data } = await getReportContent({
    template_id: currentRow.value.id,
  })
  if (code === 200) {
    fileContent.value =
      'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' +
      data.template_content
  }
}

onMounted(() => {})
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}
.content-box {
  padding: 25px 20px 35px;
  font-size: 15px;
  .content-box-code {
    border: 1px solid rgba(187, 187, 187, 0.7);
    padding: 20px;
  }
}
.file-preview-box {
  max-height: 600px;
  overflow-y: auto;
}
</style>
