<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relatuve">
      <div class="detail-card-title">业务参数配置</div>
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
            <div class="!mb-3 text-[15px] !font-bold">标准曲线配置</div>
            <a-form-item class="!pl-8" label="配置：" name="standardCurveConf">
              <a-radio-group
                v-model:value="ruleForm.standardCurveConf"
                name="checkboxgroup"
                :options="curveOptions"
              />
            </a-form-item>
            <div class="!mb-3 text-[15px] !font-bold">测量过程参数配置</div>
            <a-form-item label="显示已删除：" name="showDeleted" class="!pl-8">
              <a-switch v-model:checked="ruleForm.showDeleted" />
            </a-form-item>
            <a-form-item label="显示样品测量时间：" name="showMeasureTime" class="!pl-8">
              <a-switch v-model:checked="ruleForm.showMeasureTime" />
            </a-form-item>
            <div class="!mb-3 text-[15px] !font-bold">业务数据自动保存配置</div>
            <div class="!pl-8 flex">
              <a-form-item label="启动自动保存：" name="autoSaveSwitch" class="!mr-40">
                <a-switch v-model:checked="ruleForm.autoSaveSwitch" />
              </a-form-item>
              <a-form-item
                v-if="ruleForm.autoSaveSwitch"
                label="自动保存时间："
                name="autoSaveTime"
                class="!mr-40"
              >
                <div class="flex items-center gap-3">
                  <a-select
                    v-model:value="ruleForm.autoSaveTime"
                    class="!w-[150px]"
                    :options="saveTimeOptions"
                  >
                  </a-select>
                  分钟
                </div>
              </a-form-item>
            </div>
            <div class="!mb-3 text-[15px] !font-bold">用户自动登出时间配置</div>
            <div class="!pl-8 flex">
              <a-form-item label="启动自动登出：" name="autoLeaveSwitch" class="!mr-40">
                <a-switch v-model:checked="ruleForm.autoLeaveSwitch" />
              </a-form-item>
              <a-form-item
                v-if="ruleForm.autoLeaveSwitch"
                label="自动登出时间："
                name="autoLeaveTime"
                class="!mr-40"
              >
                <div class="flex items-center gap-3">
                  <a-select
                    v-model:value="ruleForm.autoLeaveTime"
                    class="!w-[150px]"
                    :options="logoutTimeOptions"
                  >
                  </a-select>
                  小时
                </div>
              </a-form-item>
            </div>
            <div class="!mb-3 text-[15px] !font-bold">历史UVWin数据查看工具路径配置</div>
            <a-form-item label="exe文件路径：" name="filePath" class="!pl-8">
              <a-input v-model:value="ruleForm.filePath" class="!w-[400px]" />
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

import { getBusinessParam, resetBusinessParam, saveBusinessParam } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  standardCurveConf: '',
  showDeleted: false,
  showMeasureTime: false,
  autoSaveSwitch: false,
  autoSaveTime: '5',
  autoLeaveSwitch: false,
  autoLeaveTime: '24',
  filePath: '',
})
const ruleFormRules: Record<string, Rule[]> = {
  standardCurveConf: [
    { required: true, message: '请选择标准曲线配置', trigger: ['blur', 'change'] },
  ],
  showDeleted: [{ required: true, message: '请选择是否显示已删除', trigger: ['blur', 'change'] }],
  showMeasureTime: [
    { required: true, message: '请选择是否显示样品测量时间', trigger: ['blur', 'change'] },
  ],
  autoSaveSwitch: [
    { required: true, message: '请选择是否开启自动保存', trigger: ['blur', 'change'] },
  ],
  autoSaveTime: [{ required: true, message: '请选择自动保存时间', trigger: ['blur', 'change'] }],
  autoLeaveSwitch: [
    { required: true, message: '请选择是否开启自动登出', trigger: ['blur', 'change'] },
  ],
  autoLeaveTime: [{ required: true, message: '请选择自动登出时间', trigger: ['blur', 'change'] }],
  filePath: [{ required: true, message: '请填写exe文件路径', trigger: ['blur', 'change'] }],
}

const curveOptions = [
  {
    label: '显示R',
    value: '1',
  },
  {
    label: '显示R2',
    value: '2',
  },
]

const saveTimeOptions = [
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '5',
    value: '5',
  },
]

const logoutTimeOptions = [
  {
    label: '8',
    value: '8',
  },
  {
    label: '12',
    value: '12',
  },
  {
    label: '24',
    value: '24',
  },
  {
    label: '永远',
    value: '永远',
  },
]

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetBusinessParam()
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
      const { code, message } = await saveBusinessParam(ruleForm.value)
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
  const { code, data } = await getBusinessParam()
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
