<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="text-[16px] uv-container">
    <div class="flex flex-row items-center justify-end">
      <div @click="handleConfirm" class="cursor-pointer">
        <save-outlined class="!ml-10" :style="{ color: primaryColor }" />
        <span class="!ml-1 text-[14px]" :style="{ color: primaryColor }">保存</span>
      </div>
      <div class="cursor-pointer !ml-[15px]" @click="handleFactory">
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
    </div>
    <div class="detail-card !mt-[10px]">
      <div class="detail-card-title">仪器开关机配置</div>
      <div class="detail-card-content flex !pl-10 flex flex-row items-center">
        <div>定时开机：</div>
        <a-switch class="!ml-4" v-model:checked="powerForm.isTimeStartUp" />
        <a-radio-group class="!ml-10" v-model:value="powerForm.repeat" :options="repeatOptions" />
        <a-time-picker
          v-model:value="powerForm.startUpTime"
          format="HH:mm"
          valueFormat="HH:mm"
          placeholder="请选择时间"
        />
        <a-select
          v-model:value="powerForm.week"
          mode="multiple"
          placeholder="请选择星期"
          :options="weekOptions"
          :maxTagCount="1"
          class="!ml-4 !w-60"
        ></a-select>
        <div class="!ml-4 alarm-clock-img">
          <img src="@/assets/images/alarmClock.png" alt="闹钟" class="" />
        </div>
      </div>
    </div>
    <div class="detail-card !mt-[20px]">
      <div class="detail-card-title">仪器基础配置</div>
      <div class="detail-card-content !pl-10">
        <a-form
          :model="basicConfigForm"
          ref="basicConfigFormRef"
          :rules="basicConfigRules"
          :hideRequiredMark="true"
          v-bind="{ labelCol: { span: 3 } }"
          labelAlign="left"
        >
          <a-form-item label="通讯端口：" name="messagePort">
            <a-radio-group v-model:value="basicConfigForm.messagePort" :options="portOptions" />
          </a-form-item>
          <a-form-item label="附件设置：" name="annexSetting">
            <a-radio-group
              v-model:value="basicConfigForm.annexSetting"
              :options="attachSettingsOptions"
            />
          </a-form-item>
          <a-form-item label="光谱带宽设置：" name="bandWidth">
            <a-auto-complete
              v-model:value="basicConfigForm.bandWidth"
              :options="bandwidthOptions"
              style="width: 220px"
              placeholder="请选择仪器光谱带宽"
            />
            <text class="!ml-2 text-[15px]">nm</text>
            <text class="!ml-4 text-[#999] text-[15px]">（可变光谱带宽不输入）</text>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <!-- <div class="flex flex-row items-center">
      <div class="title">软件激活</div>
      <a-button type="primary" class="!ml-15" @click="handleActive">激活</a-button>
    </div> -->
  </section>
</template>

<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'

import { addInstrumentConfig, getBandwidthOptions, getInstrumentConfig } from '@/api'
import { SaveOutlined, UndoOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/stores'
const { primaryColor } = useAppStore()
const deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''

// 光谱带宽
const bandwidthOptions = ref([])
const getBandwidthOptionsFun = async () => {
  const { code, data } = await getBandwidthOptions()
  if (code === 200) {
    bandwidthOptions.value = data.map((item: number) => ({
      label: item,
      value: item,
    }))
  }
}
// 仪器开关机
const powerForm = ref({
  startUpTime: '',
  isTimeStartUp: false,
  repeat: null,
  week: [],
})
const repeatOptions = [
  {
    label: '重复模式',
    value: 0,
  },
  {
    label: '单次模式',
    value: 1,
  },
]
const weekOptions = [
  {
    label: '周一',
    value: 1,
  },
  {
    label: '周二',
    value: 2,
  },
  {
    label: '周三',
    value: 3,
  },
  {
    label: '周四',
    value: 4,
  },
  {
    label: '周五',
    value: 5,
  },
  {
    label: '周六',
    value: 6,
  },
  {
    label: '周日',
    value: 7,
  },
]
// 仪器基础配置
const basicConfigForm = ref({
  messagePort: 0,
  annexSetting: 0,
  bandWidth: 0,
})
const basicConfigRules = reactive({
  messagePort: [{ required: true, message: '请选择通讯端口', trigger: ['blur', 'change'] }],
  annexSetting: [{ required: true, message: '请选择附件设置', trigger: ['blur', 'change'] }],
  bandWidth: [{ required: true, message: '请选择仪器光谱带宽', trigger: ['blur', 'change'] }],
})
const portOptions = [
  {
    label: '串口',
    value: 0,
  },
  {
    label: '网口',
    value: 1,
  },
  {
    label: 'WIFI',
    value: 2,
  },
]
const attachSettingsOptions = [
  {
    label: '固定池',
    value: 0,
  },
  {
    label: '八联池',
    value: 1,
  },
  {
    label: '五联池',
    value: 2,
  },
  {
    label: '流动池',
    value: 3,
  },
  {
    label: '积分球',
    value: 4,
  },
]

// 提交
const basicConfigFormRef = ref()
const handleConfirm = () => {
  basicConfigFormRef.value
    .validate()
    .then(async () => {
      const query = {
        startUpTime: powerForm.value.startUpTime,
        isTimeStartUp: powerForm.value.isTimeStartUp ? 1 : 0,
        ...basicConfigForm.value,
        deviceSerialNumber,
        bandWidth: Number(basicConfigForm.value.bandWidth).toFixed(2),
      }
      const { code, message } = await addInstrumentConfig(query)
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: message,
          duration: 3,
        })
      }
    })
    .catch(() => {})
}
const handleFactory = () => {
  console.log('恢复出厂设置')
}

// 获取详情
const getInstrumentConfigDetail = async () => {
  if (deviceSerialNumber) {
    const { code, data } = await getInstrumentConfig({
      deviceSerialNumber,
    })
    if (code === 200) {
      basicConfigForm.value = { ...data }
    }
  }
}

onMounted(async () => {
  await getBandwidthOptionsFun() // 光谱带宽选项
  await getInstrumentConfigDetail() // 获取参数详情
})
// 软件激活
const handleActive = () => {
  // 跳转到系统管理软件激活
  console.log('激活')
}
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.alarm-clock-img {
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}

:deep(.ant-radio-wrapper) {
  margin-inline-end: 30px !important;
  font-size: 15px;
}

:deep(.ant-form-item-label > label) {
  font-size: 16px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

// :deep(.ant-form-item) {
//   margin-bottom: 10px;
// }
</style>
