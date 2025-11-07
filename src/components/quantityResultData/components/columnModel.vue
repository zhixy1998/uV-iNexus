<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="列配置" width="800px" @handleOk="saveInputParamMapTableHeadFun">
    <template #content>
      <PlusCircleOutlined class="!text-xl cursor-pointer" @click="addRow" />
      <a-table
        :columns="columns"
        :data-source="tableData"
        size="small"
        :pagination="false"
        :scroll="{ y: 500 }"
      >
        <template #headName="{ record }">
          <a-input
            v-model:value="record.headName"
            placeholder="请输入列名"
            @blur="(e: any) => (record.printTitle = e.target.value)"
            :disabled="record.locate !== 'data'"
          />
        </template>
        <template #printTitle="{ record }">
          <a-input
            v-model:value="record.printTitle"
            placeholder="请输入打印列名"
            :disabled="record.locate !== 'data'"
          />
        </template>
        <template #paramIdentity="{ record }">
          <a-select
            ref="select"
            v-model:value="record.paramIdentity"
            :allowClear="true"
            class="w-full"
          >
            <a-select-option
              v-for="item in sortArr"
              :key="item.resultIdentity"
              :value="item.resultIdentity"
              :disabled="item.disabled"
              >{{ item.paramName }}
            </a-select-option>
          </a-select>
        </template>
        <template #operation="{ record }">
          <DeleteOutlined
            class="cursor-pointer"
            @click="deleteFun(record)"
            v-if="record.locate && record.locate == 'data'"
          />
        </template>
      </a-table>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { generateUniqueId } from '@/composables'
type ApiParams = {
  queryInputParamMapTableHead: Record<string, any> // 查询映射关系及表头
  saveInputParamMapTableHead: Record<string, any> // 查询已绑定的映射关系
  queryInputParam: Record<string, any>
}
const props = defineProps({
  modelValue: Boolean,
  taskId: {
    type: String,
  },
  methodId: {
    type: String,
  },
  tableHeadData: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  measureType: {
    type: String,
    default: '光谱扫描',
  },
  // sampleKind 0 标准样品 1 未知样品
  sampleKind: {
    type: String,
    default: '0',
  },
  apiParams: {
    type: Object,
    required: true,
  },
})

watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      queryInputParamMapTableHeadFun()
    }
  },
)
watch(
  () => props.methodId,
  (newValue) => {
    if (newValue) {
      queryInputParamFun()
    }
  },
)

const columns = computed(() => {
  if (props.measureType === '定量测定' && props.sampleKind === '0') {
    return [
      { title: '列名', dataIndex: 'headName', slots: { customRender: 'headName' }, width: 150 },
      {
        title: '打印列名',
        dataIndex: 'printTitle',
        slots: { customRender: 'printTitle' },
        width: 150,
      },
      {
        title: '操作',
        width: 100,
        key: 'operation',
        slots: { customRender: 'operation' },
      },
    ]
  } else {
    return [
      { title: '列名', dataIndex: 'headName', slots: { customRender: 'headName' }, width: 150 },
      {
        title: '打印列名',
        dataIndex: 'printTitle',
        slots: { customRender: 'printTitle' },
        width: 150,
      },
      {
        title: '输入参数',
        dataIndex: 'paramIdentity',
        slots: { customRender: 'paramIdentity' },
        width: 200,
      },
      {
        title: '操作',
        width: 100,
        key: 'operation',
        slots: { customRender: 'operation' },
      },
    ]
  }
})
const sortArr = ref<
  {
    paramName: string
    resultIdentity: string
    disabled?: boolean
  }[]
>([])
const emit = defineEmits(['update:modelValue', 'saveParamMapTableHeadSuccess'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const tableDataProps = props.tableHeadData.map((item) => {
  return {
    headName: item.name,
    printTitle: item.printTitle || item.name,
    identity: item.identity,
    locate: item.locate,
  }
})
const tableData = ref<Record<string, any>>(tableDataProps)
watch(
  () => [tableData.value, sortArr.value],
  ([newValue, newSortArr]) => {
    const paramIdentityArr = newValue.map((item: any) => item.paramIdentity)
    sortArr.value.forEach((item) => {
      if (paramIdentityArr.includes(item.resultIdentity)) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
  },
  {
    deep: true,
  },
)
const queryInputParamMapTableHeadFun = async () => {
  const params: Record<string, any> = { taskId: props.taskId }
  if (props.measureType === '定量测定') {
    params.sampleKind = props.sampleKind
  }
  const { data, code } = await props.apiParams.queryInputParamMapTableHead(params)
  if (code === 200) {
    tableData.value.forEach((item: any) => {
      data?.forEach((itemData: any) => {
        if (itemData.headIdentity === item.identity) {
          item.paramIdentity = itemData.paramIdentity
          item.paramName = itemData.paramName
        }
      })
    })
  }
}
const queryInputParamFun = async () => {
  const { data, code } = await props.apiParams.queryInputParam({ methodId: props.methodId })
  if (code === 200) {
    sortArr.value = data
  }
}
const saveInputParamMapTableHeadFun = async () => {
  const taskHeadsArr = tableData.value.map((item: any) => {
    return {
      name: item.headName,
      identity: item.identity,
      printTitle: item.printTitle,
      locate: item.locate,
    }
  })
  const mapRelationArr = tableData.value
    .map((item: any) => {
      return {
        headName: item.headName,
        headIdentity: item.identity,
        paramName: item.paramName,
        paramIdentity: item.paramIdentity,
      }
    })
    .filter((item: any) => item.paramIdentity)
  const params: Record<string, any> = {
    taskId: props.taskId,
    taskHeads: taskHeadsArr,
    mapRelation: mapRelationArr,
  }
  if (props.measureType === '定量测定') {
    params.sampleKind = props.sampleKind
  }
  const { code } = await props.apiParams.saveInputParamMapTableHead(params)
  if (code === 200) {
    message.success('保存成功')
    model.value = false
    emit('saveParamMapTableHeadSuccess')
  }
}
const addRow = () => {
  const newRow = { identity: generateUniqueId(), locate: 'data' }
  tableData.value.push(newRow)
}
const deleteFun = (record: any) => {
  tableData.value = tableData.value.filter((item: any) => item.identity !== record.identity)
}
onMounted(() => {
  queryInputParamMapTableHeadFun()
  queryInputParamFun()
})
</script>
