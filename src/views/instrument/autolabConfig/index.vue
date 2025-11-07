<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="text-[16px] uv-container-gap">
    <div class="detail-card !relative">
      <div class="detail-card-title">基本配置</div>
      <div class="detail-card-content">
        <a-form
          ref="basicConfigFormRef"
          :model="basicConfigForm"
          name="basicConfigForm"
          :rules="basicConfigRules"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
          layout="inline"
        >
          <div class="detail-card-content-item w-[100%]">
            <div class="left-box">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[15px] text-[#133379]">基本信息</span>
            </div>
            <div class="right-box">
              <a-form-item label="通讯端口：" name="messagePort" class="!mr-[70px]">
                <a-select
                  v-model:value="basicConfigForm.messagePort"
                  :options="portOptions"
                  placeholder="请选择通信端口"
                  class="!w-[180px]"
                >
                </a-select>
              </a-form-item>
              <a-form-item label="通信状态：" class="!mr-[70px]">
                <div class="flex items-center">
                  <div class="text-[14px]">
                    {{ basicConfigForm.connectStatus ? '已连接' : '已断开' }}
                  </div>
                  <div class="button !ml-[15px]" @click="handleOnline">联机</div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="detail-card-content-item w-[100%] !mt-[20px]">
            <div class="left-box">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[15px] text-[#133379]">功能配置</span>
            </div>
            <div class="right-box">
              <a-form-item label="开机自动对进样器初始化：" name="isStartInit">
                <a-switch v-model:checked="basicConfigForm.isStartInit" />
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
      <div class="icon-box flex flex-row items-center">
        <!-- <div @click="handleClear(0)" class="cursor-pointer">
          <undo-outlined class="!text-[#d40303]" />
          <span class="!ml-1 text-[14px] !text-[#d40303]">撤销</span>
        </div> -->
        <div @click="handleSubmit(0, basicConfigFormRef)" class="cursor-pointer">
          <save-outlined class="!ml-10" :style="{ color: primaryColor }" />
          <span class="!ml-1 text-[14px]" :style="{ color: primaryColor }">保存</span>
        </div>
      </div>
    </div>
    <div class="detail-card">
      <div class="detail-card-title">运行参数配置</div>
      <div class="detail-card-content">
        <a-form
          ref="runConfigFormRef"
          :model="runConfigForm"
          name="runConfigForm"
          :rules="runConfigRules"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
        >
          <div class="flex">
            <div class="detail-card-content-item w-[50%] !mr-[30px]">
              <div class="left-box">
                <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
                <span class="!font-bold text-[15px] text-[#133379]">泵速配置</span>
              </div>
              <div class="right-box form-lh">
                <a-form-item label="进样速度：" name="enterSpeed">
                  <a-select
                    v-model:value="runConfigForm.enterSpeed"
                    :options="speedOptions"
                    placeholder="请选择进样速度"
                  >
                  </a-select>
                </a-form-item>
                <a-form-item label="清洗速度：" name="washSpeed">
                  <a-select
                    v-model:value="runConfigForm.washSpeed"
                    :options="speedOptions"
                    placeholder="请选择清洗速度"
                  ></a-select>
                </a-form-item>
              </div>
            </div>
            <div class="detail-card-content-item w-[50%]">
              <div class="left-box">
                <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
                <span class="!font-bold text-[15px] text-[#133379]">时间配置</span>
              </div>
              <div class="right-box form-label">
                <a-form-item label="进样时间：" name="enterTime">
                  <div class="flex items-center">
                    <a-input-number
                      id="inputNumber"
                      v-model:value="runConfigForm.enterTime"
                      :min="1"
                      style="width: 70%"
                      placeholder="请输入进样时间"
                    />
                    <span class="!ml-2 text-[14px]">秒</span>
                  </div>
                </a-form-item>
                <a-form-item label="清洗时间：" name="washTime">
                  <div class="flex items-center">
                    <a-input-number
                      id="inputNumber"
                      v-model:value="runConfigForm.washTime"
                      :min="1"
                      style="width: 70%"
                      placeholder="请输入清洗时间"
                    />
                    <span class="!ml-2 text-[14px]">秒</span>
                  </div>
                </a-form-item>
                <a-form-item label="停泵等待时间：" name="waitingTime">
                  <div class="flex items-center">
                    <a-input-number
                      id="inputNumber"
                      v-model:value="runConfigForm.waitingTime"
                      :min="1"
                      style="width: 80%"
                      placeholder="请输入停泵等待时间"
                    />
                    <span class="!ml-2 text-[14px]">秒</span>
                  </div>
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="detail-card-content-item w-[100%] !mt-[20px]">
            <div class="left-box">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[15px] text-[#133379]">清洗配置</span>
            </div>
            <div class="right-box">
              <a-form-item label="进样之前清洗：" name="isWashBeforeEnter">
                <a-switch v-model:checked="runConfigForm.isWashBeforeEnter" />
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
      <div class="icon-box flex flex-row items-center">
        <!-- <div @click="handleClear(1)" class="cursor-pointer">
          <undo-outlined class="!text-[#d40303]" />
          <span class="!ml-1 text-[14px] !text-[#d40303]">撤销</span>
        </div> -->
        <div @click="handleSubmit(1, runConfigFormRef)" class="cursor-pointer">
          <save-outlined class="!ml-10" :style="{ color: primaryColor }" />
          <span class="!ml-1 text-[14px]" :style="{ color: primaryColor }">保存</span>
        </div>
      </div>
    </div>
    <div class="detail-card">
      <div class="detail-card-title">进样盘参数配置</div>
      <div class="detail-card-content">
        <a-form
          ref="configFormRef"
          :model="configForm"
          name="configForm"
          :rules="configRules"
          :label-col="{ style: { width: '130px' } }"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
        >
          <div class="detail-card-content-item w-[100%] !mt-[20px]">
            <div class="left-box">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[15px] text-[#133379]">进样盘配置</span>
            </div>
            <div class="right-box flex items-center">
              <div class="w-[300px] h-[auto] !mr-[20px]">
                <img class="w-[100%] h-[100%]" src="@/assets/images/instrument/sampler.png" />
              </div>
              <div>
                <a-form-item label="盘区设定：" name="panel">
                  <a-checkbox-group
                    v-model:value="configForm.panel"
                    name="checkboxgroup"
                    :options="panelOptions"
                  />
                </a-form-item>
                <a-form-item label="盘架设定：">
                  <a-select
                    v-model:value="configForm.plateRail[0]"
                    class="!mr-4 !w-[140px]"
                    :options="plateRailOptions"
                    :disabled="getDisabled('L')"
                    placeholder="请选择"
                  ></a-select>
                  <a-select
                    v-model:value="configForm.plateRail[1]"
                    class="!mr-4 !w-[140px]"
                    :options="plateRailOptions"
                    :disabled="getDisabled('M')"
                    placeholder="请选择"
                  ></a-select>
                  <a-select
                    v-model:value="configForm.plateRail[2]"
                    class="!w-[140px]"
                    :options="plateRailOptions"
                    :disabled="getDisabled('R')"
                    placeholder="请选择"
                  ></a-select>
                </a-form-item>
                <a-form-item label="编号信息：">
                  <a-input
                    class="!mr-4 !w-[140px]"
                    v-model:value="configForm.numInfo[0]"
                    :disabled="getDisabled('L')"
                    placeholder="请输入"
                  />
                  <a-input
                    class="!mr-4 !w-[140px]"
                    v-model:value="configForm.numInfo[1]"
                    :disabled="getDisabled('M')"
                    placeholder="请输入"
                  />
                  <a-input
                    class="!w-[140px]"
                    v-model:value="configForm.numInfo[2]"
                    :disabled="getDisabled('R')"
                    placeholder="请输入"
                  />
                </a-form-item>
                <div class="flex flex-wrap image-box">
                  <div
                    v-for="item in imgDataList"
                    :key="item.title"
                    :class="[
                      item.num === 10 ? 'w-[130px]' : 'w-[144px]',
                      item.num ? 'img-item' : '',
                    ]"
                  >
                    <template v-if="item.num">
                      <div class="img-item-content">
                        <div
                          v-for="circleItem in item.num"
                          :key="circleItem"
                          class="img-item-content-circle"
                          :class="[
                            item.num === 10 ? 'w-[38px]' : 'w-[30px]',
                            item.num === 10 ? 'h-[38px]' : 'h-[30px]',
                          ]"
                          :style="{
                            backgroundColor: item.circleBgColor,
                          }"
                        ></div>
                      </div>
                      <div class="text-center !mt-1 !text-[18px] !text-[#6c6c6c]">
                        {{ item.title }}
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-form>
      </div>

      <div class="icon-box flex flex-row items-center">
        <div @click="handleSubmit(2, configFormRef)" class="cursor-pointer">
          <save-outlined class="!ml-10" :style="{ color: primaryColor }" />
          <span class="!ml-1 text-[14px]" :style="{ color: primaryColor }">保存</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { SaveOutlined, UndoOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { onMounted, ref } from 'vue'

import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()
import { notification } from 'ant-design-vue'

import { checkConnect, getInjectorConf, setInjectorConf, setInjectorTray } from '@/api'

const deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''

// 基本配置
const basicConfigFormRef = ref()
const basicConfigForm = ref({
  messagePort: null,
  connectStatus: 0,
  isStartInit: true,
})
const basicConfigRules: Record<string, Rule[]> = {
  messagePort: [{ required: true, message: '请选择通讯端口', trigger: ['blur', 'change'] }],
  isStartInit: [
    { required: true, message: '请选择开机是否自动对进样器初始化', trigger: ['blur', 'change'] },
  ],
}
const portOptions = [
  {
    label: 'COM1',
    value: 1,
  },
  {
    label: 'COM2',
    value: 2,
  },
]
const handleOnline = async () => {
  const { code, message } = await checkConnect()
  if (code === 200) {
    notification.success({
      message: '成功！',
      description: message,
      duration: 3,
    })
    await getDetail()
  }
}
// 运行参数配置
const runConfigFormRef = ref()
const runConfigForm = ref({
  enterSpeed: null,
  washSpeed: null,
  enterTime: '',
  washTime: '',
  waitingTime: '',
  isWashBeforeEnter: false,
})
const runConfigRules: Record<string, Rule[]> = {
  enterSpeed: [{ required: true, message: '请选择进样速度', trigger: ['blur', 'change'] }],
  washSpeed: [{ required: true, message: '请选择清洗速度', trigger: ['blur', 'change'] }],
  enterTime: [{ required: true, message: '请选择进样时间', trigger: ['blur', 'change'] }],
  washTime: [{ required: true, message: '请选择清洗时间', trigger: ['blur', 'change'] }],
  waitingTime: [{ required: true, message: '请选择停泵等待时间', trigger: ['blur', 'change'] }],
  isWashBeforeEnter: [
    { required: true, message: '请选择进样之前是否清洗', trigger: ['blur', 'change'] },
  ],
}
const speedOptions = [
  {
    label: '低速运行',
    value: 1,
  },
  {
    label: '中速运行',
    value: 2,
  },
  {
    label: '高速运行',
    value: 3,
  },
]
// 基本配置
const configFormRef = ref()
const configForm = ref<any>({
  panel: ['', '', ''],
  plateRail: [null, null, null],
  numInfo: [null, null, null],
})
const configRules: Record<string, Rule[]> = {
  panel: [{ required: true, message: '请选择盘区设定', trigger: ['blur', 'change'] }],
  plateRail: [{ required: true, message: '请选择盘架设定', trigger: ['blur', 'change'] }],
  numInfo: [{ required: true, message: '请填写编号信息', trigger: ['blur', 'change'] }],
}
const panelOptions = [
  {
    label: '启用L样品区',
    value: 'L',
    title: 'L',
  },
  {
    label: '启用M样品区',
    value: 'M',
    title: 'M',
  },
  {
    label: '启用R样品区',
    value: 'R',
    title: 'R',
  },
]
const plateRailOptions = [
  {
    label: '10位（50ml）',
    value: 1,
    num: 10,
    circleBgColor: '#FCCA00',
  },
  {
    label: '18位（25ml）',
    value: 2,
    num: 18,
    circleBgColor: '#CCF783',
  },
  {
    label: '10位（50ml）',
    value: 3,
    num: 10,
    circleBgColor: '#FCCA00',
  },
]

// 详情
const getDetail = async () => {
  if (deviceSerialNumber) {
    const { code, data } = await getInjectorConf()
    if (code === 200) {
      basicConfigForm.value = {
        messagePort: data.messagePort,
        connectStatus: data.connectStatus,
        isStartInit: !!data.isStartInit,
      }
      runConfigForm.value = {
        enterSpeed: data.enterSpeed || null,
        washSpeed: data.washSpeed || null,
        enterTime: data.enterTime,
        washTime: data.washTime,
        waitingTime: data.waitingTime,
        isWashBeforeEnter: !!data.isWashBeforeEnter,
      }
      if (data.paramList && data.paramList.length) {
        const LItems = data.paramList.find((item: any) => item.panel === 'L')
        const MItems = data.paramList.find((item: any) => item.panel === 'M')
        const RItems = data.paramList.find((item: any) => item.panel === 'R')
        configForm.value = {
          panel: [
            !!LItems.isSelected ? 'L' : '',
            !!MItems.isSelected ? 'M' : '',
            !!RItems.isSelected ? 'R' : '',
          ],
          plateRail: [LItems.plateRail, MItems.plateRail, RItems.plateRail],
          numInfo: [LItems.numInfo, MItems.numInfo, RItems.numInfo],
        }
        showImgFun(data.paramList)
      } else {
        configForm.value = {
          panel: [false, false, false],
          plateRail: [null, null, null],
          numInfo: [null, null, null],
        }
      }
    }
  }
}
const showImg = ref(false)
const imgDataList = ref<
  {
    title: string
    num: number | undefined
    circleBgColor: string | undefined
  }[]
>([])

const getDisabled = (value: string) => {
  return !configForm.value.panel.find((p: string) => p === value)
}

// 保存
const handleSubmit = async (type: number, refName: any) => {
  let res: any
  if (type === 0 || type === 1) {
    refName
      .validate()
      .then(async () => {
        res = await setInjectorConf({
          ...basicConfigForm.value,
          ...runConfigForm.value,
          isStartInit: basicConfigForm.value.isStartInit ? 1 : 0,
          isWashBeforeEnter: runConfigForm.value.isWashBeforeEnter ? 1 : 0,
        })
      })
      .catch(() => {})
  } else if (type === 2) {
    refName
      .validate()
      .then(async () => {
        const query = panelOptions.map((item, index) => {
          const isSelected =
            configForm.value.panel.findIndex((p: string) => p === item.value) !== -1
          return {
            panel: item.value,
            isSelected: isSelected ? 1 : 0,
            plateRail: isSelected ? configForm.value.plateRail[index] : '',
            numInfo: isSelected ? configForm.value.numInfo[index] : '',
            deviceSerialNumber,
          }
        })
        res = await setInjectorTray(query)
        showImgFun(query)
      })
      .catch(() => {})
  }
  if (res && res.code === 200) {
    notification.success({
      message: '成功！',
      description: res.message,
      duration: 3,
    })
    await getDetail()
  }
}

const showImgFun = (query: any) => {
  showImg.value = true
  imgDataList.value = query.map((item: any) => {
    const selectedOption = plateRailOptions.find((p) => p.value === item.plateRail)
    return {
      title: item.panel,
      num: selectedOption?.num,
      circleBgColor: selectedOption?.circleBgColor,
    }
  })
}

onMounted(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.page-container {
  padding: 20px;
  box-shadow: 8px 8px 27px 2px #c5c5c5 !important;
  border-radius: 30px;
  background: #ffffff;
  .detail-card-content-item {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    border-radius: 12px;
    // background-color: #f1f1f1;
    .left-box {
      width: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-box {
      padding: 20px 20px 20px 30px;
      border-left: 1px solid rgba(187, 187, 187, 0.7);
    }
    .button {
      padding: 0px 10px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: bold;
      line-height: 24px;
      color: #113371;
      background: #cdcaca;
      cursor: pointer;
    }
  }
}

.form-lh {
  :deep(.ant-form-item) {
    line-height: 66px !important;
  }
}
.form-label {
  :deep(.ant-form-item-label) {
    width: 100px;
  }
}

.icon-box {
  position: absolute;
  top: 15px;
  right: 30px;
}

.image-box {
  zoom: 0.45;
  .img-item {
    border: 1px solid rgba(187, 187, 187, 0.7);
    margin: 20px 10px;
    padding: 8px;
    .img-item-content {
      padding: 6px 11px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border: 1px solid rgba(187, 187, 187, 0.7);
      background: #efefef;
      .img-item-content-circle {
        margin: 5px 0px;
        border-radius: 50%;
      }
    }
  }
}

:deep(.ant-form-item-label > label) {
  font-size: 14px !important;
  margin-right: 10px;
}

:deep(.ant-form label) {
  font-size: 14px;
}

:deep(.ant-form-item) {
  line-height: 45px;
  margin-bottom: 0px;
}
</style>
