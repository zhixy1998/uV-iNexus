<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="model"
    title="新建用户"
    @handleOk="createNewUserFun"
    @handleCancel="resetModalForm"
    :maskClosable="false"
    width="600px"
  >
    <template #content>
      <!-- 小组加载状态 -->
      <div v-if="isLoadingGroups" class="mb-4 flex items-center text-gray-500">
        <LoadingOutlined spin class="mr-2" /> 加载小组中...
      </div>

      <!-- 新增用户表单 -->
      <uvForm
        :key="formRenderKey"
        ref="uvFormRef"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
        @change="handleFormChange"
      />
    </template>
  </uvModal>
</template>

<script lang="ts" setup>
import { createNewUser, getGroupsByRoleId } from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType, selectOption } from '@/types/common'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, nextTick, reactive, ref, watch } from 'vue'

// 类型定义
interface AddUserFormState {
  username: string
  password: string
  realName: string
  phone?: string
  email?: string
  roleId: string
  groupId: string
  status: number
}

// Props & Emit
const props = defineProps<{
  modelValue: boolean
  treeRoles: { label: string; value: string }[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'create-user-success'): void
}>()

// 响应式状态
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const uvFormRef = ref<InstanceType<typeof uvForm> | null>(null)
const formState = reactive<AddUserFormState>({
  username: '',
  password: '',
  realName: '',
  phone: '',
  email: '',
  roleId: '',
  groupId: '',
  status: 1,
})

// 小组数据相关
const tempGroups = ref<selectOption[]>([])
const isLoadingGroups = ref<boolean>(false)
const formRenderKey = ref<number>(0)

// 表单配置
const formOptions = computed<formOptionsType[]>(() => [
  {
    type: 'input',
    label: '账号',
    props: 'username',
    required: true,
    placeholder: '请输入3-50字符的账号（不重复）',
    maxLength: 50,
  },
  {
    type: 'password',
    label: '密码',
    props: 'password',
    required: true,
    placeholder: '请输入至少6字符的密码',
    maxLength: 20,
  },
  {
    type: 'input',
    label: '真实姓名',
    props: 'realName',
    required: true,
    placeholder: '请输入用户真实姓名',
    maxLength: 20,
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
    type: 'select',
    label: '所属小组',
    props: 'groupId',
    options: tempGroups.value,
    required: true,
    disabled: isLoadingGroups.value || !formState.roleId,
    placeholder: formState.roleId ? '请选择所属小组' : '请先选择关联角色',
    key: `add-group-key-${formState.roleId}-${formRenderKey.value}`,
    showSearch: true,
    filterOption: (input: string, option: any) =>
      option.label.toLowerCase().includes(input.toLowerCase()),
  },
  {
    type: 'input',
    label: '手机号',
    props: 'phone',
    placeholder: '请输入11位手机号（可选）',
    maxLength: 11,
  },
  {
    type: 'input',
    label: '邮箱',
    props: 'email',
    placeholder: '请输入正确格式的邮箱（可选）',
    maxLength: 100,
  },
])

// 表单校验规则
const formRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 50, message: '账号长度必须在3-50字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6字符', trigger: 'blur' },
  ],
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择关联角色', trigger: 'change' }],
  groupId: [{ required: true, message: '请选择所属小组', trigger: 'change' }],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确11位手机号', trigger: 'blur', required: false },
  ],
  email: [{ type: 'email', message: '请输入正确邮箱格式', trigger: 'blur', required: false }],
})

// 核心修复：确保调用getGroupsByRoleId接口
const loadGroupsByRoleId = async (roleId: string) => {
  // 强制校验，确保参数有效
  if (!roleId) {
    message.warning('角色ID不能为空')
    return
  }

  // 防止重复调用
  if (isLoadingGroups.value) return

  console.log(`[接口调用] 开始加载角色ID=${roleId}的小组数据，调用getGroupsByRoleId`)
  isLoadingGroups.value = true
  tempGroups.value = [] // 清空旧数据
  formState.groupId = '' // 清空选择

  try {
    // 强制调用接口，与详情页保持一致
    const response = await getGroupsByRoleId(roleId)
    console.log(`[接口返回] getGroupsByRoleId结果:`, response)

    // 处理接口返回
    if (response?.code === 200) {
      // 转换数据格式
      tempGroups.value = (response.data || []).map((group: any) => ({
        label: group.groupName,
        value: String(group.id),
      }))

      if (tempGroups.value.length === 0) {
        message.info('该角色暂无关联小组')
      }
    } else {
      message.error(`加载小组失败: ${response?.message || '未知错误'}`)
    }
  } catch (error) {
    console.error(`[接口错误] getGroupsByRoleId调用失败:`, error)
    message.error('调用小组接口失败，请检查接口是否存在或网络连接')
  } finally {
    isLoadingGroups.value = false
    await nextTick()
    formRenderKey.value += 1 // 强制刷新下拉框
    console.log(`[接口流程] 小组加载完成，共${tempGroups.value.length}个小组`)
  }
}

// 核心修复：确保角色变化时触发接口调用
const handleFormChange = async (key: string, value: any) => {
  console.log(`表单字段${key}变化，新值:`, value)

  // 角色选择变化时，强制调用接口
  if (key === 'roleId') {
    // 无论值是否相同，只要有变化就处理
    if (value !== formState.roleId) {
      formState.roleId = value
      // 即使值为空也处理
      if (value) {
        await loadGroupsByRoleId(value)
      } else {
        // 清空角色时也清空小组
        tempGroups.value = []
        formState.groupId = ''
        formRenderKey.value += 1
      }
    }
  }
}

// 重置表单
const resetModalForm = () => {
  formState.username = ''
  formState.password = ''
  formState.realName = ''
  formState.phone = ''
  formState.email = ''
  formState.roleId = ''
  formState.groupId = ''
  tempGroups.value = []
  formRenderKey.value += 1

  if (uvFormRef.value) {
    try {
      ;(uvFormRef.value as any).resetFields?.()
    } catch (e) {
      console.log('表单重置错误:', e)
    }
  }
}

// 提交新增用户
const createNewUserFun = async () => {
  if (!uvFormRef.value) return

  const validateSuccess = await uvFormRef.value.onSubmit()
  if (!validateSuccess) {
    message.warning('表单填写不完整，请检查后提交')
    return
  }

  const submitData = {
    username: formState.username.trim(),
    password: formState.password.trim(),
    realName: formState.realName.trim(),
    phone: formState.phone?.trim() || '',
    email: formState.email?.trim() || '',
    roleId: formState.roleId,
    groupId: formState.groupId,
    status: formState.status,
  }

  try {
    const { code } = await createNewUser(submitData)
    if (code === 200) {
      message.success('创建成功')
      emit('create-user-success')
      model.value = false
      resetModalForm()
    } else {
      message.error('创建失败')
    }
  } catch (error) {
    message.error('创建失败，请检查网络')
  }
}

// 监听弹窗状态
watch(
  model,
  (isVisible) => {
    if (!isVisible) {
      resetModalForm()
    } else {
      formState.roleId = ''
      formState.groupId = ''
      tempGroups.value = []
      formRenderKey.value += 1
    }
  },
  { immediate: true },
)

// 额外保障：监听roleId变化，确保触发加载
watch(
  () => formState.roleId,
  async (newVal) => {
    console.log(`roleId监听器触发，新值: ${newVal}`)
    if (newVal && model.value) {
      await loadGroupsByRoleId(newVal)
    }
  },
)
</script>

<style lang="less" scoped>
:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 100px !important;
}
</style>
