<!--
- 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
- 本软件受商业机密法和版权法保护。
- 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
- 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
-->

<template>
  <uvModal v-model="model" title="修约设置" @handle-ok="handleOk" @handle-cancel="handleCancel">
    <template #content>
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 6 }"
        :rules="rules"
      >
        <a-form-item label="修约变量" name="resultIdentity">
          <a-select
            v-model:value="formState.resultIdentity"
            placeholder="请选择"
            :options="resultIdentityOptions"
          >
          </a-select>
        </a-form-item>
        <a-button type="primary" @click="handleAdd">新增修约条件</a-button>
      </a-form>
      <div class="flex-1 overflow-hidden !mt-[10px]">
        <vxeTable ref="tableRef" :options="tableOptions">
          <template #active="{ row }">
            <text class="cursor-pointer text-[#FF0F0F]" @click="handleDelete(row)">删除</text>
          </template>
        </vxeTable>
      </div>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { conciseCheckApproximateRange } from '@/api'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

// 表单
const formRef = ref()

const formState: Record<string, any> = reactive({
  resultIdentity: '',
})
const rules = {
  resultIdentity: [{ required: true, message: '请选择修约变量', trigger: 'change' }],
}
const basicRules = (type: string) => {
  return [
    {
      // 只能输入数字（包括小数）
      validator({ cellValue }: any) {
        if (cellValue && !/^-?\d+(\.\d+)?$/.test(cellValue)) {
          return new Error('只能输入数字')
        }
      },
      trigger: 'blur',
    },
    {
      // 检查上下限大小
      validator({ cellValue, row, column }: any) {
        if (!cellValue) return
        const fieldName = column.property
        const currentValue = parseFloat(cellValue)
        const lower = parseFloat(row.lowerLimit ?? 0) // 下限
        const upper = parseFloat(row.upperLimit ?? 0) // 上限
        if (fieldName === 'upperLimit' && lower) {
          if (currentValue < lower) return new Error('上限值不能小于下限值')
        } else if (fieldName === 'lowerLimit' && upper) {
          if (currentValue > upper) return new Error('下限值不能大于上限值')
        }
      },
      trigger: 'blur',
    },
    {
      // 检查是否为空
      validator({ row }: any) {
        if (!row.lowerLimit && row.lowerLimit != 0 && !row.upperLimit && row.upperLimit != 0) {
          return new Error('上下限值不能同时为空')
        }
      },
      trigger: 'blur',
    },
    // {
    //   // 检查是否在其他行的区间内
    //   validator({ cellValue, row }: any) {
    //     if (!cellValue) return
    //     const currentValue = parseFloat(cellValue)
    //     for (const item of tableOptions.value.data) {
    //       // 跳过当前行
    //       if (item === row) continue
    //       // 确保有下限值
    //       if (item.lowerLimit && item.upperLimit) {
    //         const lower = parseFloat(item.lowerLimit) // 下限
    //         const upper = parseFloat(item.upperLimit) // 上限
    //         const isHasUpper = item.isUpperLimitIncluded
    //         const isHasLower = item.isLowerLimitIncluded
    //         // 检查当前值是否在其他行的区间内
    //         if (!isNaN(lower) && !isNaN(upper)) {
    //           if (
    //             (isHasLower && !isHasUpper && currentValue >= lower && currentValue < upper) ||
    //             (!isHasLower && isHasUpper && currentValue > lower && currentValue <= upper) ||
    //             (isHasLower && isHasUpper && currentValue >= lower && currentValue <= upper) ||
    //             (!isHasLower && !isHasUpper && currentValue > lower && currentValue < upper)
    //           ) {
    //             return new Error(`${type}不能在其他上下限值区间内`)
    //           }
    //         }
    //       }
    //     }
    //   },
    //   trigger: 'blur',
    // },
  ]
}
const tableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  minHeight: '300px',
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showStatus: false,
  },
  validConfig: {
    msgMode: 'full',
    theme: 'normal',
    // showErrorMessage: false,
    // showMessage: false,
  },
  editRules: {
    upperLimit: basicRules('上限值'),
    lowerLimit: basicRules('下限值'),
    isUpperLimitIncluded: [
      {
        // 检查是否在其他行的区间内
        validator({ row }: any) {
          const lower = parseFloat(row.lowerLimit) // 下限
          const upper = parseFloat(row.upperLimit) // 上限
          const isHasUpper = row.isUpperLimitIncluded
          const isHasLower = row.isLowerLimitIncluded
          if (lower === upper && (!isHasUpper || !isHasLower)) {
            return new Error('必须勾选')
          }
        },
        trigger: 'change',
      },
    ],
    isLowerLimitIncluded: [
      {
        // 检查是否在其他行的区间内
        validator({ row }: any) {
          const lower = parseFloat(row.lowerLimit) // 下限
          const upper = parseFloat(row.upperLimit) // 上限
          const isHasUpper = row.isUpperLimitIncluded
          const isHasLower = row.isLowerLimitIncluded
          if (lower === upper && (!isHasUpper || !isHasLower)) {
            return new Error('必须勾选')
          }
        },
        trigger: 'change',
      },
    ],
    decimalPlaces: [{ required: true, message: '请填写有效位数' }],
    roundingType: [{ required: true, message: '请填写修约方式' }],
  },
  columns: [
    {
      field: 'lowerLimit',
      title: '下限值',
      cellRender: {
        name: 'VxeInput',
      },
    },
    {
      width: 80,
      field: 'isLowerLimitIncluded',
      title: '包含',
      cellRender: {
        name: 'VxeCheckbox',
      },
    },
    {
      field: 'upperLimit',
      title: '上限值',
      cellRender: {
        name: 'VxeInput',
      },
    },
    {
      width: 80,
      field: 'isUpperLimitIncluded',
      title: '包含',
      cellRender: {
        name: 'VxeCheckbox',
      },
    },

    {
      field: 'roundingType',
      title: '修约方式',
      cellRender: {
        name: 'VxeSelect',
        options: [
          {
            label: '有效位数',
            value: 1,
          },
          {
            label: '小数位数',
            value: 2,
          },
        ],
      },
    },
    {
      field: 'decimalPlaces',
      title: '位数',
      cellRender: {
        name: 'VxeSelect',
        options: [
          {
            label: '1',
            value: 1,
          },
          {
            label: '2',
            value: 2,
          },
          {
            label: '3',
            value: 3,
          },
          {
            label: '4',
            value: 4,
          },
          {
            label: '5',
            value: 5,
          },
          {
            label: '6',
            value: 6,
          },
          {
            label: '7',
            value: 7,
          },
          {
            label: '8',
            value: 8,
          },
        ],
      },
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      width: '100px',
      slots: {
        default: 'active',
      },
    },
  ],
  data: [] as any[],
})
const resultIdentityOptions = ref<any[]>([]) // 修约变量选项
// 表格
const tableRef = ref()
// 新增 | 删除
const handleAdd = () => {
  tableOptions.value.data.push({})
}
const handleDelete = (row: any) => {
  const index = tableOptions.value.data.indexOf(row)
  tableOptions.value.data.splice(index, 1)
}

// 弹窗
const model = ref(false)
const emit = defineEmits(['update:modelValue', 'sampleParamsChange'])
const handleCancel = () => {
  model.value = false
  formRef.value.resetFields()
  tableOptions.value.data = []
}
const showModel = (resultParams: any, measureType: string, approxParams?: any) => {
  const options =
    resultParams && resultParams.length
      ? resultParams.map((item: any) => {
          return {
            label: item.params?.resultName,
            value: item.params?.resultIdentity,
          }
        })
      : []
  if (measureType === '定量测定')
    resultIdentityOptions.value = options.concat([
      {
        label: '拟合浓度',
        value: 'fitConcentration',
      },
    ])
  else resultIdentityOptions.value = options
  if (approxParams) {
    Object.assign(formState, approxParams)
    tableOptions.value.data = approxParams.roundingParams
  }
  model.value = true
}
const handleOk = async () => {
  if (!tableOptions.value.data.length) {
    message.error('请至少填写一条修约条件')
    return
  }
  // 表格校验
  const tableValidResult = await tableRef.value.gridRef.fullValidate(true)
  // 检查表格验证结果
  if (tableValidResult && Object.keys(tableValidResult).length > 0) return
  try {
    await formRef.value.validate() // 表单校验
  } catch (error) {
    console.log('校验未通过:', error)
    return
  }
  const params = {
    resultIdentity: formState.resultIdentity,
    resultIdentityName: resultIdentityOptions.value.find(
      (item: any) => item.value === formState.resultIdentity,
    )?.label,
    roundingParams: tableOptions.value.data,
  }
  const res = await conciseCheckApproximateRange(params)
  if (res.code === 200) {
    if (res.data) {
      emit('sampleParamsChange', params)
      handleCancel()
    } else {
      message.error(res.message)
    }
  }
}
defineExpose({
  showModel,
})
</script>

<style lang="less" scoped>
:deep(.vxe-table--render-default .vxe-body--column .vxe-cell--valid-error-tip) {
  bottom: 0px;
  font-size: 10px;
}
:deep(.vxe-cell) {
  height: 40px !important;
  line-height: 40px !important;
}
</style>
