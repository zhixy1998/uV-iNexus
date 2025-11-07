<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="新建用户" @handleOk="createNewUserFun">
    <template #content>
      <uvForm
        ref="uvFormRef"
        :labelCol="{
          style: { width: '100px' },
        }"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

import { createNewUser, getGroupInfo } from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType } from '@/types/common'
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'createUserSuccess'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
interface UserInfo {
  userName: string
  userRealName: string
  phone: string
  email: string
  userPosition: string | null
  groupName: string
  groupNo: string
  systemIdentityName: string | null
  systemIdentityId: string
}
const formOptions = reactive<formOptionsType[]>([
  {
    type: 'input',
    label: '账号',
    props: 'userName',
  },
  {
    type: 'password',
    label: '密码',
    props: 'password',
  },
  {
    type: 'input',
    label: '真实姓名',
    props: 'userRealName',
  },
  {
    type: 'radio',
    label: '系统用户角色',
    props: 'systemIdentityId',
    options: [
      {
        label: '开发人员',
        value: '1',
      },
      {
        label: '产线人员',
        value: '2',
      },
      {
        label: '维修人员',
        value: '3',
      },
      {
        label: '客户',
        value: '4',
      },
    ],
  },
  {
    type: 'input',
    label: '手机号',
    props: 'phone',
  },
  {
    type: 'input',
    label: '邮箱',
    props: 'email',
  },
  {
    type: 'select',
    label: '所属组名',
    props: 'groupNo',
    options: [],
  },
])
const formRules = reactive({
  projectName: [
    {
      required: true,
      message: '请输入项目名称',
      trigger: 'blur',
    },
  ],
})
const uvFormRef = ref<InstanceType<typeof uvForm>>()
const formState = reactive<Partial<UserInfo>>({})
const getGroupInfoFun = async () => {
  const { code, data } = await getGroupInfo()
  if (code === 200) {
    console.log(formOptions[4], 'data', data)
    formOptions[6].options = data.map((item: any) => ({
      label: item.groupName,
      value: item.groupNo,
    }))
  }
}
const createNewUserFun = async () => {
  if (!(await uvFormRef.value?.onSubmit())) return
  const { code, data } = await createNewUser(formState)
  if (code === 200) {
    message.success('创建用户成功')
    emit('createUserSuccess')
    model.value = false
  }
}
onMounted(() => {
  getGroupInfoFun()
})
</script>
