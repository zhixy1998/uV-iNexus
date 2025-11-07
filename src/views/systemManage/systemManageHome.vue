<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">系统管理</div>
      <div class="detail-card-content !pl-10">
        <a-form
          ref="ruleFormRef"
          :model="ruleForm"
          name="runConfigForm"
          :rules="ruleFormRules"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
        >
          <div class="!mb-3 text-[15px] !font-bold">基础配置</div>
          <a-form-item class="!pl-8" label="系统语言选择：" name="language">
            <a-select
              ref="select"
              v-model:value="ruleForm.language"
              class="!w-[200px]"
              :options="languageOptions"
              placeholder="请选择系统语言"
            ></a-select>
          </a-form-item>
          <div class="!mb-3 text-[15px] !font-bold">物联代理配置信息</div>
          <a-form-item class="!pl-8" label="代理ip配置" name="ipConfiguration">
            <a-input
              v-model:value="ruleForm.ipConfiguration"
              placeholder="请输入代理ip"
              class="!w-[300px]"
            />
          </a-form-item>
          <a-form-item class="!pl-8" label="代理端口配置" name="portConfiguration">
            <a-input
              v-model:value="ruleForm.portConfiguration"
              placeholder="请输入代理端口"
              class="!w-[300px]"
            />
          </a-form-item>
          <div class="!mb-3 text-[15px] !font-bold">远程访问配置</div>
          <div class="!pl-8">
            <a-form-item label="允许远程控制：" name="remoteControl" class="!mr-[80px]">
              <a-switch v-model:checked="ruleForm.remoteControl" />
            </a-form-item>
            <a-form-item label="允许远程数据访问：" name="remoteDataAccess" class="!mr-[80px]">
              <a-switch v-model:checked="ruleForm.remoteDataAccess" />
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="clear-btn cursor-pointer" @click="handleFactory">
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
      <div class="icon-box">
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { UndoOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { onMounted, ref } from 'vue'

import { getSystemManage, resetSystemManage, saveSystemManage } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  language: null,
  remoteControl: false,
  remoteDataAccess: false,
  ipConfiguration: '',
  portConfiguration: '',
})
const ruleFormRules: Record<string, Rule[]> = {
  language: [{ required: true, message: '请选择系统语言', trigger: ['blur', 'change'] }],
  remoteControl: [
    { required: true, message: '请选择是否允许远程控制', trigger: ['blur', 'change'] },
  ],
  remoteDataAccess: [
    { required: true, message: '请选择是否允许远程数据访问', trigger: ['blur', 'change'] },
  ],
  ipConfiguration: [
    {
      required: true,
      message: '请输入代理ip配置',
      trigger: ['blur', 'change'],
    },
  ],
  portConfiguration: [
    {
      required: true,
      message: '请输入代理端口配置',
      trigger: ['blur', 'change'],
    },
  ],
}
const languageOptions = [
  {
    value: '简体中文',
    label: '中文',
  },
]

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetSystemManage()
  if (code === 200) {
    notification.success({
      message: '成功',
      description: message,
      duration: 3,
    })
    await getDetail()
  }
}
// 保存
const handleSubmit = () => {
  ruleFormRef.value
    .validate()
    .then(async () => {
      const { code, message } = await saveSystemManage(ruleForm.value)
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: message,
          duration: 3,
        })
        await getDetail()
      }
    })
    .catch(() => {})
}

const getDetail = async () => {
  const { code, data } = await getSystemManage()
  if (code === 200) {
    ruleForm.value = data
  }
}

onMounted(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.icon-box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-btn {
  position: absolute;
  top: 15px;
  right: 30px;
}

.detail-box {
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }
  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
  }
}

:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 280px;
}
</style>
