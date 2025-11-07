<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">算法配置</div>
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
          <div class="!mt-2 text-[15px] !font-bold">台阶消除算法配置</div>
          <a-form-item class="!mt-2 !pl-8" label="透过率门限系数K：" name="transmittance">
            <a-input
              v-model:value="ruleForm.transmittance"
              style="width: 30%"
              placeholder="请输入透过率门限系数K"
            />
          </a-form-item>
          <a-form-item class="!pl-8" label="Abs门限系数K：" name="abs">
            <a-input
              v-model:value="ruleForm.abs"
              style="width: 30%"
              placeholder="请输入Abs门限系数K"
            />
          </a-form-item>
          <a-form-item class="!pl-8" label="积分球门限系数K ：" name="integratingSphere">
            <a-input
              v-model:value="ruleForm.integratingSphere"
              style="width: 30%"
              placeholder="请输入积分球门限系数K "
            />
          </a-form-item>
          <div class="!mb-2 text-[15px] !font-bold">寻峰阈值配置</div>
          <div class="!pl-8 flex">
            <a-form-item label="峰谷差：" name="peakValleyDiff" class="!mr-[100px]">
              <div class="flex items-center gap-3">
                <a-input
                  v-model:value="ruleForm.peakValleyDiff"
                  class="w-[100px]"
                  placeholder="请输入峰谷差"
                />
                %
              </div>
            </a-form-item>
            <a-form-item label="峰间距：" name="peakInterval">
              <a-input
                v-model:value="ruleForm.peakInterval"
                class="w-[100px]"
                placeholder="请输入峰间距"
              />
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="clear-btn cursor-pointer" @click="handleFactory">
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
      <div class="icon-box gap-10">
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

import { getAlgorithmConf, resetAlgorithmConf, saveAlgorithmConf } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  transmittance: '',
  abs: '',
  integratingSphere: '',
  peakValleyDiff: '',
  peakInterval: '',
})
const ruleFormRules: Record<string, Rule[]> = {
  transmittance: [
    { required: true, message: '请输入透过率门限系数K', trigger: ['blur', 'change'] },
  ],
  abs: [{ required: true, message: '请输入Abs门限系数K', trigger: ['blur', 'change'] }],
  integratingSphere: [
    { required: true, message: '请输入积分球门限系数K', trigger: ['blur', 'change'] },
  ],
  peakValleyDiff: [{ required: true, message: '请输入峰谷差', trigger: ['blur', 'change'] }],
  peakInterval: [{ required: true, message: '请输入峰间距', trigger: ['blur', 'change'] }],
}

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetAlgorithmConf()
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
      const { code, message } = await saveAlgorithmConf(ruleForm.value)
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
  const { code, data } = await getAlgorithmConf()
  if (code === 200) {
    ruleForm.value = {
      ...data,
    }
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
  width: 150px;
}
</style>
