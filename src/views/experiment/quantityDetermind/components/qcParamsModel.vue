<!--
- 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
- 本软件受商业机密法和版权法保护。
- 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
- 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
-->

<template>
  <uvModal v-model="model" title="质控设置" @handle-ok="handleOk" @handle-cancel="handleCancel">
    <template #content>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ style: { width: '120px' } }"
      >
        <a-form-item label="质控类型" name="controlType">
          <template v-if="typeOptions.length">
            <a-radio-group v-model:value="formState.controlType" :options="typeOptions" />
          </template>
          <span v-else>-</span>
        </a-form-item>
        <a-form-item label="质控描述" name="controlDesc">
          <div>{{ controlDesc }}</div>
        </a-form-item>
        <a-form-item label="下限值" name="lowerLimit">
          <div class="flex items-center">
            <a-input-number
              v-model:value="formState.lowerLimit"
              :min="0"
              :step="1"
              class="!w-[200px]"
            />
            <a-form-item-rest>
              <a-checkbox v-model:checked="formState.isLowerLimitIncluded" class="!ml-[20px]"
                >包含下限值</a-checkbox
              >
            </a-form-item-rest>
          </div>
        </a-form-item>
        <a-form-item label="上限值" name="upperLimit">
          <div class="flex items-center">
            <a-input-number
              v-model:value="formState.upperLimit"
              :min="0"
              :step="1"
              class="!w-[200px]"
            />
            <a-form-item-rest>
              <a-checkbox v-model:checked="formState.isUpperLimitIncluded" class="!ml-[20px]"
                >包含上限值</a-checkbox
              >
            </a-form-item-rest>
          </div>
        </a-form-item>
      </a-form>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'

const emit = defineEmits(['update:modelValue', 'sampleParamsChange'])
const model = ref(false)

// 表单
const typeOptions = ref<any[]>([]) // 质控类型选项
const formState: Record<string, any> = reactive({
  controlType: '',
  upperLimit: '',
  isUpperLimitIncluded: false,
  lowerLimit: '',
  isLowerLimitIncluded: false,
})
const rules = {
  controlType: [{ required: true, message: '请选择质控类型', trigger: 'change' }],
  upperLimit: [
    {
      validator: (value: number) => {
        if ((value || value === 0) && (formState.lowerLimit || formState.lowerLimit === 0)) {
          if (
            (formState.isLowerLimitIncluded && value <= formState.lowerLimit) ||
            (!formState.isLowerLimitIncluded && value < formState.lowerLimit)
          ) {
            return Promise.reject('上限不能小于下限！')
          }
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
  lowerLimit: [
    {
      validator: (_rule: any, value: number) => {
        if ((value || value === 0) && (formState.upperLimit || formState.upperLimit === 0)) {
          if (
            (formState.isUpperLimitIncluded && value >= formState.upperLimit) ||
            (!formState.isUpperLimitIncluded && value > formState.upperLimit)
          ) {
            return Promise.reject('下限不能大于上限！')
          }
        }
        return Promise.resolve()
      },
      trigger: ['blur'],
    },
  ],
}
// 质控描述
const controlDesc = computed(() => {
  const small = formState.isLowerLimitIncluded ? '<=' : '<' // 下限
  const big = formState.isUpperLimitIncluded ? '<=' : '<' // 上限
  const type = typeOptions.value.find((item: any) => item.value === formState.controlType)
  const title = type ? type.label : '质控类型'
  if (
    (formState.lowerLimit || formState.lowerLimit === 0) &&
    (formState.upperLimit || formState.upperLimit === 0)
  )
    return `当不满足${formState.lowerLimit}${small}${title}${big}${formState.upperLimit}时，会有警告提示`
  else if (
    (formState.lowerLimit || formState.lowerLimit === 0) &&
    !formState.upperLimit &&
    formState.upperLimit !== 0
  )
    return `当不满足${formState.lowerLimit}${small}${title}时，会有警告提示`
  else if (
    !formState.lowerLimit &&
    formState.lowerLimit !== 0 &&
    (formState.upperLimit || formState.upperLimit === 0)
  )
    return `当不满足${title}${big}${formState.upperLimit}时，会有警告提示`
  else return `-`
})
const formRef = ref()

// 弹窗
const handleOk = async () => {
  try {
    await formRef.value.validate() // 表单校验
    if (!formState.upperLimit && !formState.lowerLimit) {
      message.error('请至少填写一个上限或下限')
      return
    }
    emit('sampleParamsChange', {
      ...formState,
      controlDesc: controlDesc.value,
    })
    handleCancel()
  } catch (error) {}
}
const handleCancel = () => {
  model.value = false
  formRef.value.resetFields()
  formState.isLowerLimitIncluded = false
  formState.isUpperLimitIncluded = false
}
const showModel = (resultParams: any, measureType: string, qcParams?: any) => {
  if (measureType === '定量测定')
    typeOptions.value = [
      {
        label: '测量值质控',
        value: '1',
      },
      {
        label: '斜率质控',
        value: '2',
      },
      {
        label: '截距质控',
        value: '3',
      },
      {
        label: '标曲R质控',
        value: '4',
      },
      {
        label: '标曲R2质控',
        value: '5',
      },
      {
        label: '空白样品质控',
        value: '6',
      },
    ]
  else
    typeOptions.value = [
      {
        label: '测量值质控',
        value: '1',
      },
    ]
  if (qcParams) Object.assign(formState, qcParams)
  model.value = true
}
defineExpose({
  showModel,
})
</script>

<style lang="less" scoped></style>
