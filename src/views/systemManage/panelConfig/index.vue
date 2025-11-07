<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">系统面板配置</div>
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
          <div>
            <div class="!mb-3 text-[15px] !font-bold">实验测试页面面板设置</div>
            <div class="!pl-8 flex">
              <a-form-item label="启用方法统计面板：" name="methodListSwitch" class="!mr-40">
                <a-switch v-model:checked="ruleForm.methodListSwitch" />
              </a-form-item>
              <a-form-item label="启用项目统计面板：" name="projectStatisticsSwitch" class="!mr-40">
                <a-switch v-model:checked="ruleForm.projectStatisticsSwitch" />
              </a-form-item>
              <a-form-item label="启用任务统计面板：" name="taskListSwitch">
                <a-switch v-model:checked="ruleForm.taskListSwitch" />
              </a-form-item>
            </div>
            <div class="!mb-3 text-[15px] !font-bold">登录面板设置</div>
            <div class="!pl-8">
              <div class="flex">
                <a-form-item label="启用快捷登录：" name="quickLoginSwitch" class="!mr-40">
                  <a-switch v-model:checked="ruleForm.quickLoginSwitch" />
                </a-form-item>
                <a-form-item
                  v-if="ruleForm.quickLoginSwitch"
                  label="默认使用快捷登录："
                  name="defaultQuickLogin"
                >
                  <a-switch v-model:checked="ruleForm.defaultQuickLogin" />
                </a-form-item>
              </div>

              <a-form-item label="自动开机：" name="isAutoBoot">
                <a-switch v-model:checked="ruleForm.isAutoBoot" />
              </a-form-item>
              <a-form-item label="自动进入实验测试：" name="isAutoEnterExperiment">
                <a-switch v-model:checked="ruleForm.isAutoEnterExperiment" />
              </a-form-item>
            </div>
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

import { getPanelConf, resetPanelConf, savePanelConf } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  methodListSwitch: false,
  projectStatisticsSwitch: false,
  taskListSwitch: false,
  quickLoginSwitch: false,
  defaultQuickLogin: false,
  isAutoBoot: false,
  isAutoEnterExperiment: false,
})
const ruleFormRules: Record<string, Rule[]> = {
  methodListSwitch: [
    { required: true, message: '请选择是否启用方法列表面板', trigger: ['blur', 'change'] },
  ],
  projectStatisticsSwitch: [
    { required: true, message: '请选择是否启用项目统计面板', trigger: ['blur', 'change'] },
  ],
  taskListSwitch: [
    { required: true, message: '请选择是否启用任务统计面板', trigger: ['blur', 'change'] },
  ],
  quickLoginSwitch: [
    { required: true, message: '请选择是否启用快捷登录', trigger: ['blur', 'change'] },
  ],
  defaultQuickLogin: [
    { required: true, message: '请选择是否自动进入快捷登录', trigger: ['blur', 'change'] },
  ],
  isAutoBoot: [{ required: true, message: '请选择是否启用自动开机', trigger: ['blur', 'change'] }],
  isAutoEnterExperiment: [
    { required: true, message: '请选择是否启用简洁模式', trigger: ['blur', 'change'] },
  ],
}

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetPanelConf()
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
      const { code, message } = await savePanelConf(ruleForm.value)
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
  const { code, data } = await getPanelConf()
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
