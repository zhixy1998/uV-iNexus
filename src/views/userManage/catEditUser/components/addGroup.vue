<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="model"
    title="新增小组"
    @handleOk="createNewGroupFun"
    @handleCancel="resetModalForm"
    :maskClosable="false"
    width="600px"
  >
    <template #content>
      <uvForm
        :key="formRenderKey"
        ref="uvFormRef"
        :labelCol="{ style: { width: '120px' } }"
        :wrapperCol="{ style: { width: 'calc(100% - 120px)' } }"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
        @change="handleFormChange"
      />
    </template>
  </uvModal>
</template>

<script lang="ts" setup>
import { createNewGroup } from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType } from '@/types/common'
import { message } from 'ant-design-vue'
import { computed, reactive, ref, watch } from 'vue'

// 类型定义
interface AddGroupFormState {
  groupName: string
  description?: string
  roleId: string
  status: number
}

// Props & Emit
const props = defineProps<{
  modelValue: boolean
  treeRoles: { label: string; value: string }[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'create-group-success'): void
}>()

// 响应式状态
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const uvFormRef = ref<InstanceType<typeof uvForm> | null>(null)
const formState = reactive<AddGroupFormState>({
  groupName: '',
  description: '',
  roleId: '',
  status: 1, // 默认启用
})

const formRenderKey = ref<number>(0)

// 表单配置 - 将textarea改为input并添加type="textarea"属性
const formOptions = computed<formOptionsType[]>(() => [
  {
    type: 'input', // 修复：使用支持的input类型
    label: '小组名称',
    props: 'groupName',
    required: true,
    placeholder: '请输入小组名称',
    maxlength: 51,
  },
  {
    type: 'input', // 修复：使用input类型，通过props指定textarea
    label: '小组描述',
    props: 'description',
    placeholder: '请输入小组描述（可选）',
    maxlength: 200,
    // 添加textarea相关属性
    inputProps: {
      type: 'textarea',
      rows: 3,
      style: { width: '100%', resize: 'vertical' }, // 控制textarea宽度和可调整性
    },
  },
  {
    type: 'select',
    label: '关联角色',
    props: 'roleId',
    options: props.treeRoles,
    required: true,
    placeholder: '请选择关联角色',
    showSearch: true,
    filterOption: (input: string, option: any) =>
      option.label.toLowerCase().includes(input.toLowerCase()),
  },
  {
    type: 'radio',
    label: '状态',
    props: 'status',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
    required: true,
  },
])

// 表单校验规则
const formRules = reactive({
  groupName: [
    { required: true, message: '请输入小组名称', trigger: 'blur' },
    { min: 2, max: 50, message: '小组名称长度必须在2-50字符之间', trigger: 'blur' },
  ],
  roleId: [{ required: true, message: '请选择关联角色', trigger: 'change' }],
})

// 表单变化处理
const handleFormChange = (_key: string, _value: any) => {
  // 可以在这里添加额外的表单处理逻辑
}

// 重置表单
const resetModalForm = () => {
  formState.groupName = ''
  formState.description = ''
  formState.roleId = ''
  formState.status = 1
  formRenderKey.value += 1

  if (uvFormRef.value) {
    try {
      ;(uvFormRef.value as any).resetFields?.()
    } catch (e) {
      console.log('表单重置错误:', e)
    }
  }
}

// 提交新增小组
const createNewGroupFun = async () => {
  if (!uvFormRef.value) return

  const validateSuccess = await uvFormRef.value.onSubmit()
  if (!validateSuccess) {
    message.warning('表单填写不完整，请检查后提交')
    return
  }

  const submitData = {
    groupName: formState.groupName.trim(),
    description: formState.description?.trim() || '',
    roleId: formState.roleId,
    status: formState.status,
  }

  try {
    const { code } = await createNewGroup(submitData)
    if (code === 200) {
      message.success('小组创建成功')
      emit('create-group-success')
      model.value = false
      resetModalForm()
    } else {
      message.error('创建失败')
    }
  } catch (error) {
    console.error('创建小组失败:', error)
    message.error('创建失败，请检查网络')
  }
}

// 监听弹窗状态
watch(
  model,
  (isVisible) => {
    if (!isVisible) {
      resetModalForm()
    }
  },
  { immediate: true },
)
</script>
