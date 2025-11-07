<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <a-modal
      v-model:visible="modelValue"
      title="详情"
      width="60%"
      :bodyStyle="{
        padding: '20px 10% 20px 9%',
      }"
      :footer="null"
    >
      <div v-for="item in detailList" :key="item.key" class="flex !leading-12 text-[15px]">
        <div class="w-[120px] shrink-0">{{ item.label }}：</div>
        <div>{{ detail?.mainData[item.key] || '-' }}</div>
      </div>
      <div class="flex !leading-12 text-[15px]">
        <div class="w-[120px] shrink-0">检测方法：</div>
        <a-table
          :showHeader="false"
          :pagination="false"
          :bordered="true"
          :columns="columns"
          :data-source="detail?.identityTypeList"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <span
                class="cursor-pointer"
                :style="{ color: primaryColor }"
                @click="handleDetail(record)"
                >查看详情</span
              >
              <!-- <span class="!ml-4 cursor-pointer" :style="{ color: primaryColor }">生成方法</span> -->
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>
    <method-modal ref="methodModalRef" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { getStandardDetail } from '@/api'
import { useAppStore } from '@/stores'

import methodModal from './methodModal.vue'

const { primaryColor } = useAppStore()

// 对话框
const modelValue = ref(false)
const showModal = async (id: string) => {
  modelValue.value = true
  await getDetail(id)
}
const detail = ref<any>()
const getDetail = async (id: string) => {
  const { code, data } = await getStandardDetail(id)
  if (code === 200) {
    detail.value = data
  }
}

const detailList = [
  {
    label: '行业',
    key: 'industry',
  },
  {
    label: '标准类型',
    key: 'industryType',
  },
  {
    label: '标准号',
    key: 'standardNumber',
  },
  {
    label: '标准名称',
    key: 'standardName',
  },
  {
    label: '状态',
    key: 'releaseStatus',
  },
  {
    label: '发布时间',
    key: 'releaseDate',
  },
  {
    label: '失效时间',
    key: 'expirationDate',
  },
]

const columns = [
  {
    name: '',
    dataIndex: 'standard_identity',
    key: 'standard_identity',
  },
  {
    name: '',
    dataIndex: 'detection_type',
    key: 'detection_type',
  },
  {
    name: '',
    key: 'action',
  },
]

// 详情
const methodModalRef = ref()
const handleDetail = (record: any) => {
  methodModalRef.value.showModal(record.id)
}

defineExpose({
  showModal,
})
</script>

<style scoped lang="less"></style>
