<template>
  <section>
    <a-button type="primary" class="!flex flex-row items-center" @click="selfCheck">
      <template #icon>
        <sync-outlined />
      </template>
      重新自检
    </a-button>
    <a-divider />
    <div class="!mt-6 !leading-9">
      <a-row>
        <a-col :span="2">
          <text class="text-[16px]"> 联机： </text>
        </a-col>
        <a-col :span="22">
          <div class="flex flex-row flex-wrap text-[16px]">
            <text>{{ instrumentDetail.connectMessage }}</text>
            <loading-outlined v-if="loadingSelfCheck" class="!ml-10 !text-[#0038a8]" />
            <check-outlined v-else class="!ml-10 !text-[#67c23a]" />
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2">
          <text class="text-[16px]"> 仪器序列号： </text>
        </a-col>
        <a-col :span="22">
          <div class="flex flex-row flex-wrap text-[16px]">
            <text>{{ instrumentDetail.deviceSerialNumber }}</text>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2">
          <text class="text-[16px]"> 附件类型： </text>
        </a-col>
        <a-col :span="22">
          <div class="flex flex-row flex-wrap text-[16px]">
            <text>{{ instrumentDetail.appendMessage }}</text>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2">
          <text class="text-[16px]"> 仪器初始化： </text>
        </a-col>
        <a-col :span="22">
          <div class="text-[16px]">
            <div v-for="(item, index) in instrumentDetail.intMessage.list" :key="index">
              {{ index + 1 }}.{{ item }}
              <loading-outlined v-if="loadingSelfCheck" class="!ml-10 !text-[#0038a8]" />
              <check-outlined v-else class="!ml-10 !text-[#67c23a]" />
            </div>
            <div>
              {{ instrumentDetail.intMessage.bw }}
              <loading-outlined v-if="loadingSelfCheck" class="!ml-10 !text-[#0038a8]" />
              <check-outlined v-else class="!ml-10 !text-[#67c23a]" />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { CheckOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { onMounted, type Ref, ref } from 'vue'

import { type TInstrumentDetail } from './components/OnOrOff'

const instrumentDetail: Ref<TInstrumentDetail> = ref({
  deviceSerialNumber: '',
  isDevOpened: '',
  isInited: '',
  connectMessage: '',
  appendMessage: '',
  intMessage: {
    bt: '',
    list: [],
    bw: '',
  },
})
const getInstrumentDetail = async () => {
  instrumentDetail.value = {
    deviceSerialNumber: 'SN-XXXX-XX-XX-XX',
    isDevOpened: '0',
    isInited: '0',
    connectMessage: 'connect to device：ip=1.1.1.2  port=30500，连接中',
    appendMessage: 'XX-XXXX',
    intMessage: {
      bt: '仪器初始化',
      list: [
        '读取波长列表',
        '读取初始化状态',
        '氘灯最高能量值',
        '钨灯最高能量值',
        '气灯已工作时长',
        '钨灯已工作时长',
      ],
      bw: '初始化成功',
    },
  }
}
const loadingSelfCheck = ref(false)
const selfCheck = async () => {
  loadingSelfCheck.value = true
  instrumentDetail.value.isInited = '3'
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  instrumentDetail.value.isInited = '1'
  loadingSelfCheck.value = false
}

onMounted(async () => {
  await getInstrumentDetail()
  await selfCheck()
})
</script>

<style lang="less" scoped></style>
