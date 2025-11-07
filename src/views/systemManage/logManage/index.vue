<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">系统日志管理</div>
      <div class="detail-card-content">
        <div v-for="item in dataList" :key="item.value" class="!leading-[46px] !pl-10">
          <div class="flex items-center">
            <a-switch v-model:checked="ruleForm[item.value]" @change="handleChange(item)" />
            <span class="!ml-2">{{ item.label }}</span>
          </div>
          <div v-if="item.children && item.children.length" class="!pl-10">
            <div v-for="child in item.children" :key="child.value" class="flex items-center">
              <a-switch v-model:checked="ruleForm[child.value]" />
              <span class="!ml-2">{{ child.label }}</span>
            </div>
          </div>
        </div>
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
import { onMounted, ref } from 'vue'

import { changeSystemLogSwitch, getSystemLogSwitch, resetLogSwitch } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

const dataList = ref<any>([
  {
    label: '仪器使用统计功能开关',
    value: 'statUsageTotalSwitch',
    children: [
      {
        label: '仪器使用率统计',
        value: 'statUsageEnabled',
      },
      {
        label: '用户使用率统计',
        value: 'statUserEnabled',
      },
      {
        label: '检测类型分项统计',
        value: 'statTypeEnabled',
      },
      {
        label: '检测项目分项统计',
        value: 'statItemEnabled',
      },
      {
        label: '检测任务详细信息',
        value: 'statDetailEnabled',
      },
    ],
  },
  {
    label: '仪器使用记录功能开关',
    value: 'statUsageRecordEnabled',
  },
])
const handleChange = (item: any) => {
  if (item.children && item.children.length > 0) {
    item.children.forEach((child: any) => {
      ruleForm.value[child.value] = ruleForm.value[item.value]
    })
  }
}
const ruleForm = ref<any>({})
const getRuleFormInfo = async () => {
  ruleForm.value = {}
  dataList.value.forEach((item: any) => {
    ruleForm.value[item.value] = false
    if (item.children) {
      item.children.forEach((child: any) => {
        ruleForm.value[child.value] = false
      })
    }
  })
}

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetLogSwitch()
  if (code === 200) {
    notification.success({
      message: '成功',
      description: message,
      duration: 3,
    })
    await getSystemLogSwitchInfo()
  }
}
// 保存
const handleSubmit = async () => {
  const { code, message } = await changeSystemLogSwitch(ruleForm.value)
  if (code === 200) {
    notification.success({
      message: '成功！',
      description: message,
      duration: 3,
    })
    await getSystemLogSwitchInfo()
  }
}

const getSystemLogSwitchInfo = async () => {
  const { code, data } = await getSystemLogSwitch()
  if (code === 200) {
    ruleForm.value = {
      ...data,
    }
  }
}

onMounted(async () => {
  await getRuleFormInfo()
  await getSystemLogSwitchInfo()
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
</style>
