<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container !h-full">
    <div class="uv-table-page">
      <div class="flex items-center justify-between !mb-3">
        <div class="text-[18px] !font-bold" :style="{ color: primaryColor }">项目列表</div>
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
          <a-button type="primary" class="!flex flex-row items-center !mr-10">
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
      <a-divider :style="{ backgroundColor: primaryColor }" class="uv-divider" />
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
                >详情</text
              >
              <text
                class="cursor-pointer"
                :style="{ color: '#f5222d' }"
                @click="handleDelete(2, row)"
                >刪除</text
              >
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
  </section>
</template>

<script lang="ts" setup>
import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import type { formOptionsType } from '@/types/common'
import { reactive, ref } from 'vue'
import { useAppStore } from '@/stores'
import { deleteProject, getProjectsManagementList, methodExport } from '@/api'
const { primaryColor } = useAppStore()
import { useDownloadFile } from '@/composables/useDownloadFile'
const tableOptions = ref({
  loading: false,
  height: '100%',
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [
    { type: 'checkbox', fixed: 'left', width: 50 },
    {
      field: 'projectName',
      title: '项目名称',
      minWidth: 120,
      fixed: 'left',
    },
    {
      field: 'creatorKey',
      title: '创建人',
      minWidth: 100,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 100,
    },
    {
      field: 'methodNum',
      title: '方法个数',
      minWidth: 100,
    },
    {
      field: 'taskNum',
      title: '任务个数',
      minWidth: 100,
    },
    {
      field: 'lastUpdatedTime',
      title: '更新时间',
      minWidth: 100,
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      minWidth: 80,
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
    },
  ],
  data: [] as any[],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '项目名称',
    props: 'projectName',
  },
])
const selectedRowKeys = ref([])
const formState = reactive<{
  projectName: string
}>({
  projectName: '',
})
const formRules = reactive({})
const resetFun = () => {
  formState.projectName = ''
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
  selectedRowKeys.value = checkedArr
}
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
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
          await deleteProjectFun(ids)
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
          await deleteProjectFun(ids)
        } catch (error) {
          console.error('删除出错:', error)
        }
      },
      onCancel() {},
    })
  }
}
const deleteProjectFun = async (ids: any) => {
  const { data, code } = await deleteProject({
    params: ids,
  })
  if (code === 200) {
    message.success('删除成功')
    searchFun()
  }
}
const fetchData = async (sort?: string) => {
  tableOptions.value.loading = true
  const { code, data } = await getProjectsManagementList({
    page: tableOptions.value.pagerConfig.currentPage,
    size: tableOptions.value.pagerConfig.pageSize,
    keyword: formState.projectName,
    sort: sort === 'descend' ? '0' : '1',
  })
  if (code === 200) {
    tableOptions.value.data = data.records
    tableOptions.value.pagerConfig.total = data.total || 0
  }
  tableOptions.value.loading = false
}
const handleDetail = (row: any) => {}
onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped></style>
