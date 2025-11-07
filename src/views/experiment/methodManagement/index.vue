<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container h-full">
    <div class="uv-table-page">
      <div class="flex items-center justify-between !mb-[10px]">
        <div class="text-[18px] !font-bold" :style="{ color: primaryColor }">方法列表</div>
        <div class="flex">
          <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleImport">
            <template #icon>
              <upload-outlined />
            </template>
            导入
          </a-button>
          <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleExport">
            <template #icon>
              <download-outlined />
            </template>
            导出
          </a-button>
          <a-button
            type="primary"
            class="!flex flex-row items-center !mr-10"
            @click.stop="() => (methodsVisible = true)"
          >
            <template #icon>
              <PlusOutlined />
            </template>
            新建
          </a-button>
          <a-button
            type="primary"
            danger
            class="!flex flex-row items-center !text-[#fff]"
            @click="handleDelete(1)"
          >
            <template #icon>
              <delete-outlined />
            </template>
            批量删除
          </a-button>
        </div>
      </div>
      <a-divider
        class="uv-divider"
        :style="{
          backgroundColor: primaryColor,
        }"
      />
      <div class="content-box !pt-4 flex-1 flex flex-col">
        <uvForm
          ref="uvFormRef"
          :formOptions="formOptions"
          :formState="formState"
          :formRules="formRules"
          :columnCount="3"
        />
        <div class="absolute right-[35px]">
          <a-button @click="resetFun">清空</a-button>
          <a-button type="primary" class="!ml-4" @click="searchFun">搜索</a-button>
        </div>
        <div class="flex-1 overflow-hidden">
          <vxeTable
            ref="tableRef"
            :options="tableOptions"
            @changePage="handlePageChange"
            @checkboxChange="handleCheckboxChange"
            @sortChange="handleSortChange"
          >
            <template #active="{ row }">
              <text
                class="cursor-pointer !mr-5"
                :style="{ color: primaryColor }"
                @click="handleDetail(row)"
                >详情
              </text>
              <text
                class="cursor-pointer"
                :style="{ color: '#f5222d' }"
                @click="handleDelete(2, row)"
                >刪除
              </text>
            </template>
          </vxeTable>
        </div>
      </div>
    </div>

    <import-modal
      ref="importModalRef"
      :acceptTypes="'.xls,.xlsx'"
      importUrl="/com/persee/workstation/uv-inexus/experimenttest/sys/methodImport"
      @import-success="importSuccess"
    />
    <create-methods
      v-model="methodsVisible"
      v-if="methodsVisible"
      @createMethodsSuccess="searchFun"
    />
  </section>
</template>

<script lang="ts" setup>
import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { message, Modal, notification } from 'ant-design-vue'
import type { formOptionsType } from '@/types/common'
import createMethods from '@/views/experiment/experimentTest/components/createMethods.vue'
import { useAppStore } from '@/stores'
import { deleteMethod, listOfMethods, methodExport } from '@/api'

const { primaryColor } = useAppStore()
import { useDownloadFile } from '@/composables/useDownloadFile'

const tableOptions = ref({
  loading: false,
  height: '100%',
  sortConfig: {
    remote: true,
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [
    { type: 'checkbox', fixed: 'left', width: 50 },
    {
      title: '方法名称',
      field: 'methodName',
    },
    {
      title: '创建人',
      field: 'creator',
    },
    {
      title: '创建时间',
      field: 'createTime',
    },
    {
      title: '所属项目',
      field: 'project',
    },
    {
      title: '最近使用时间',
      field: 'recentUsageTime',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: '操作',
      slots: {
        default: 'active',
      },
    },
  ],
  data: [] as any[],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '方法名称',
    props: 'methodName',
  },
])
const selectedRowKeys = ref([])
const formState = reactive<{
  methodName: string
  remark: string
}>({
  methodName: '',
  remark: '',
})
const formRules = reactive({})
const methodsVisible = ref(false)
const resetFun = () => {
  formState.methodName = ''
  formState.remark = ''
  tableOptions.value.pagerConfig.currentPage = 1
  tableOptions.value.pagerConfig.pageSize = 20
  fetchData()
}
// 导入
const importModalRef = ref()
const handleImport = (type: string) => {
  importModalRef.value.showModal()
}
const importSuccess = () => {
  searchFun()
}
// 导出
const handleExport = async (type: string) => {
  if (!selectedRowKeys.value.length) {
    message.warn('请选择需要导出的数据！')
    return
  }
  const query = {
    ids: selectedRowKeys.value,
  }
  const res = await methodExport(query)
  useDownloadFile(res, '方法列表.xlsx')
}
const searchFun = () => {
  tableOptions.value.pagerConfig.currentPage = 1
  tableOptions.value.pagerConfig.pageSize = 20
  fetchData()
}
const handleSortChange = (field: string, order: string) => {
  tableOptions.value.pagerConfig.currentPage = 1
  tableOptions.value.pagerConfig.pageSize = 20
  fetchData(order)
}
const handleCheckboxChange = (checkedArr: any) => {
  console.log(checkedArr, '调用了这里！')
  selectedRowKeys.value = checkedArr
}
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
}
const fetchData = async (sort?: string) => {
  tableOptions.value.loading = true
  const { code, data } = await listOfMethods({
    pageNum: tableOptions.value.pagerConfig.currentPage,
    pageSize: tableOptions.value.pagerConfig.pageSize,
    methodName: formState.methodName,
    sort: sort === 'descend' ? '0' : '1',
  })
  if (code === 200) {
    tableOptions.value.data = data.data
    tableOptions.value.pagerConfig.total = data.total || 0
  }
  tableOptions.value.loading = false
}
const handleDelete = (type: number, row?: any) => {
  let ids: any = []
  if (type === 1) {
    if (selectedRowKeys.value.length === 0) return message.warning('请选择要批量删除的数据')
    ids = selectedRowKeys.value
    Modal.confirm({
      title: '提示',
      content: '是否确认批量删除？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        try {
          await deleteMethodsFun(ids)
        } catch (error) {
          console.error('删除出错:', error)
        }
      },
      onCancel() {},
    })
  } else {
    ids = [row.id]
    Modal.confirm({
      title: '提示',
      content: '是否确认删除？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        try {
          await deleteMethodsFun(ids)
        } catch (error) {
          console.error('删除出错:', error)
        }
      },
      onCancel() {},
    })
  }
}
const deleteMethodsFun = async (ids: any) => {
  const { data, code } = await deleteMethod({
    params: ids,
  })
  if (code === 200) {
    message.success('删除成功')
    searchFun()
  }
}
const handleDetail = (row: any) => {}
onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped></style>
