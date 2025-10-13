<template>
  <section class="!leading-9 text-[16px]">
    <div>
      <div class="title">仪器开关机配置</div>
      <div class="flex flex-row items-center !mt-4 !pl-15">
        <div>定时开机：</div>
        <a-switch v-model:checked="powerForm.checked" class="!ml-4" />
        <a-time-picker
          v-model:value="powerForm.time"
          format="HH:mm"
          placeholder="请选择时间"
          class="!ml-6"
        />
        <div class="!ml-4 alarm-clock-img">
          <img src="@/assets/images/alarmClock.png" alt="闹钟" class="" />
        </div>
      </div>
      <a-divider />
    </div>
    <div>
      <div class="title">仪器基础配置</div>
      <div class="!mt-4 !pl-15">
        <a-form
          :model="basicConfigForm"
          name="basicConfigForm"
          :rules="rules"
          :label-col="{ style: { width: '130px' } }"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
        >
          <a-form-item label="通讯端口：" name="txdk">
            <a-radio-group v-model:value="basicConfigForm.txdk" :options="portOptions" />
          </a-form-item>
          <a-form-item label="附件设置：" name="fjsz">
            <a-radio-group v-model:value="basicConfigForm.fjsz" :options="attachSettingsOptions" />
          </a-form-item>
          <a-form-item label="光谱带宽设置：" name="gpdk">
            <a-select
              ref="select"
              v-model:value="basicConfigForm.gpdk"
              show-search
              style="width: 220px"
              placeholder="请选择仪器光谱带宽设置"
              :options="bandwidthOptions"
            >
            </a-select>
            <text class="!ml-2 text-[15px]">nm</text>
            <text class="!ml-4 text-[#999] text-[15px]">（可变光谱带宽不输入）</text>
          </a-form-item>
        </a-form>
        <div class="flex flex-row items-center justify-center !mt-15">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" class="!ml-20" @click="handleConfirm">确认</a-button>
          <a-button type="primary" class="!ml-20" @click="handleFactory">恢复出厂设置</a-button>
        </div>
      </div>
      <a-divider />
    </div>
    <div class="flex flex-row items-center">
      <div class="title">软件激活</div>
      <a-button type="primary" class="!ml-15" @click="handleActive">激活</a-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'

// 仪器开关机
const powerForm = ref({
  time: '',
  checked: false,
})
// 仪器基础配置
const basicConfigForm = ref({
  txdk: '',
  fjsz: '',
  gpdk: '',
})
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请选择通讯端口', trigger: 'change' }],
  fjsz: [{ required: true, message: '请选择附件设置', trigger: 'change' }],
  gpdk: [{ required: true, message: '请选择仪器光谱带宽设置', trigger: 'change' }],
}
const portOptions = [
  {
    label: '串口',
    value: '1',
  },
  {
    label: '网口',
    value: '2',
  },
  {
    label: 'WIFI',
    value: '3',
  },
]
const attachSettingsOptions = [
  {
    label: '固定池',
    value: '1',
  },
  {
    label: '八联池',
    value: '2',
  },
  {
    label: '五联池',
    value: '3',
  },
  {
    label: '流动池',
    value: '4',
  },
  {
    label: '积分球',
    value: '5',
  },
]
const bandwidthOptions = [
  {
    label: '400',
    value: '400',
  },
  {
    label: '500',
    value: '500',
  },
]
const handleCancel = () => {
  console.log('取消')
}
const handleConfirm = (values: any) => {
  console.log('确认 ', values)
}
const handleFactory = () => {
  console.log('恢复出厂设置')
}
// 软件激活
const handleActive = () => {
  console.log('激活')
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
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

::v-deep .ant-radio-wrapper {
  margin-inline-end: 30px !important;
}

::v-deep .ant-form-item-label > label {
  font-size: 16px !important;
}

::v-deep .ant-form label {
  font-size: 15px;
}
</style>
