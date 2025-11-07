<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <a-collapse
      v-model:activeKey="activeKey"
      :ghost="true"
      expandIconPosition="end"
      @changeCollapse="changeCollapse"
    >
      <template #expandIcon="{ isActive }">
        <up-circle-filled class="!text-[25px]" v-if="isActive" />
        <down-circle-filled class="!text-[25px]" v-else />
      </template>
      <a-collapse-panel key="1">
        <template #header>
          <div class="btn-info-box flex flex-row items-center">
            <div
              v-for="(item, index) in buttonList"
              :key="item.id"
              class="button-item flex-1"
              :class="{
                'border-r-2 border-[#c5c5c5]': index !== buttonList.length - 1,
              }"
              @click.stop="item.onClick()"
            >
              <div class="icon-box !mr-[15px]" :style="{ width: item.width, height: item.height }">
                <check-circle-outlined
                  v-if="item.id === '1' && instrumentDetail.isDevOpened"
                  class="text-[28px] !text-[#67c23a]"
                />
                <img v-else :src="item.iconSrc" :alt="item.text" />
              </div>
              <div :style="{ color: item.color }" class="text-[18px] !font-bold">
                {{ item.text }}
              </div>
            </div>
            <!-- <div class="text-[16px] self-inspection-info" style="position: relative">
              <div class="!mr-[30px] flex items-center">
                仪器序列号：
                <div v-if="findDeviceLoading">
                  <loading-outlined :style="{ color: primaryColor }" />
                </div>
                <span v-else>{{ instrumentDetail.deviceSerialNumber || '-' }}</span>
              </div>
              <div v-if="deviceStatusStore.deviceSerialNumber">
                仪器初始化状态：
                <span :class="getCheckStatus(instrumentDetail.isInited ?? 0)?.className">{{
                  getCheckStatus(instrumentDetail.isInited ?? 0)?.label
                }}</span>
              </div>
            </div> -->
          </div>
        </template>
        <div class="!leading-10 pl-[30px] pr-[30px] text-[#3E3A39]">
          <div class="flex flex-row justify-between">
            <div>仪器名称：{{ deviceStatusStore.deviceName || '-' }}</div>
            <div>仪器型号：{{ deviceStatusStore.deviceModel || '-' }}</div>
            <div class="flex flex-row">
              仪器序列号：
              <div v-if="findDeviceLoading">
                <loading-outlined :style="{ color: primaryColor }" />
              </div>
              <span v-else>{{ deviceStatusStore.deviceSerialNumber || '-' }}</span>
            </div>
            <div>
              激活状态：
              <span v-if="deviceStatusStore.isActivated == 0" class="text-[#ff0f0f]">未激活</span>
              <span v-else>已激活</span>
            </div>
            <div>
              初始化状态：
              <span :class="getCheckStatus(deviceStatusStore.isInited ?? 0)?.className">{{
                getCheckStatus(deviceStatusStore.isInited ?? 0)?.label
              }}</span>
            </div>
          </div>
          <div class="flex flex-row">
            <text class="text-[14px]"> 联机信息： </text>
            <div class="flex flex-row flex-wrap text-[14px]">
              <text>{{
                deviceStatusStore.deviceSerialNumber
                  ? instrumentDetail.connectMessage || '-'
                  : '未连接到仪器'
              }}</text>
            </div>
          </div>
          <div class="flex flex-row">
            <text class="text-[14px]"> 附件类型： </text>
            <div class="flex flex-row flex-wrap text-[14px]">
              <text>{{
                deviceStatusStore.deviceSerialNumber ? instrumentDetail.appendMessage || '-' : '-'
              }}</text>
            </div>
          </div>
          <div class="flex flex-row">
            <text class="text-[14px]"> 仪器初始化： </text>
            <div class="text-[14px]">
              <template
                v-if="
                  deviceStatusStore.deviceSerialNumber &&
                  instrumentDetail.intMessage &&
                  instrumentDetail.intMessage.length
                "
              >
                <div
                  v-for="(item, index) in instrumentDetail.intMessage"
                  :key="index"
                  class="flex flex-row items-center"
                >
                  <div class="w-[200px]">{{ index + 1 }}.{{ item.initProject }}</div>
                  <loading-outlined
                    v-if="item.initStatus === 0"
                    class="!ml-10"
                    :style="{ color: primaryColor }"
                  />
                  <check-outlined
                    v-else-if="item.initStatus === 1"
                    class="!ml-10 !text-[#67c23a]"
                  />
                  <close-outlined
                    v-else-if="item.initStatus === 2"
                    class="!ml-10 !text-[#d40303]"
                  />
                </div>
              </template>
              <template v-else> - </template>
            </div>
          </div>
          <div
            v-if="deviceStatusStore.isInited == 3"
            class="flex justify-center"
            @click="handleStopInited"
          >
            <a-button type="primary">停止</a-button>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <edit-name-modal ref="editNameModalRef" @update:name="getInstrumentDetail" />
  </section>
</template>

<script lang="ts" setup>
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PoweroffOutlined,
  SyncOutlined,
  DownCircleFilled,
  UpCircleFilled,
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, onMounted, type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  closeInstrument,
  getInstrumentInfo,
  getSerialNumber,
  initInstrument,
  startInstrument,
  stopInitInstrument,
} from '@/api'
import closeIcon from '@/assets/images/instrument/close.png'
import searchIcon from '@/assets/images/instrument/search.png'
import selfInspectionIcon from '@/assets/images/instrument/self_inspection.png'
import renameIcon from '@/assets/images/instrument/rename.png'
import startIcon from '@/assets/images/instrument/start.png'
import { usePolling } from '@/composables/usePolling'
import { useAppStore, useDeviceStatusStore } from '@/stores'
import router from '@/router'
import editNameModal from './editNameModal.vue'
const deviceStatusStore = useDeviceStatusStore()

const { primaryColor } = useAppStore()

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}

// 按钮数组
const buttonList = [
  {
    id: '0',
    iconSrc: searchIcon,
    text: '查找仪器',
    color: '#113371',
    width: '31px',
    onClick: async () => {
      if (deviceStatusStore.isInited != 3) {
        await getSerialNumberInfo()
        await getInstrumentDetail()
      } else {
        message.error('仪器正在初始化')
      }
    }, // 查找仪器
  },
  {
    id: '1',
    iconSrc: startIcon,
    text: '启动仪器',
    color: '#67c23a',
    width: '32px',
    onClick: () => startInstrumentFun(), // 开机
  },
  // {
  //   id: '3',
  //   iconSrc: closeIcon,
  //   text: '软关机',
  //   color: '#FF0F0F',
  //   width: '32px',
  //   onClick: () => closeInstrumentFun(), // 关机
  // },
  {
    id: '2',
    iconSrc: selfInspectionIcon,
    text: '重新初始化',
    color: '#1391be',
    width: '32px',
    height: '32px',
    onClick: () => initInstrumentFun(), // 初始化
  },
  {
    id: '4',
    iconSrc: renameIcon,
    text: '仪器命名',
    color: '#FFAE00',
    width: '33px',
    height: '36px',
    onClick: () => handleReName(), // 初始化
  },
]

// 查找仪器 仪器序列号
const findDeviceLoading = ref(false)
const getSerialNumberInfo = async () => {
  deviceStatusStore.setDeviceSerialNumber('')
  findDeviceLoading.value = true
  const { code, data } = await getSerialNumber()
  if (code === 200) {
    instrumentDetail.value.deviceSerialNumber = data[0].deviceSerialNumber
    instrumentDetail.value.isInited = data[0].isInited
    instrumentDetail.value.isDevOpened = data[0].isDevOpened
    deviceStatusStore.setDeviceName(data[0].deviceName) // 仪器名称
    deviceStatusStore.setDeviceModel(data[0].deviceModelName) // 仪器型号
    deviceStatusStore.setDeviceSerialNumber(data[0].deviceSerialNumber) // 仪器序列号
    deviceStatusStore.setAttachmentType({
      totalPoolNum: data[0].totalPoolNum,
      attachmentName: data[0].attachmentName,
      attachmentKind: data[0].attachmentKind,
    }) // 附件类型
    deviceStatusStore.setIsDevOpened(data[0].isDevOpened) // 开机状态
    deviceStatusStore.setIsInited(data[0].isInited) // 初始化状态
    deviceStatusStore.setIsActivated(data[0].isActivated) // 激活状态
    findDeviceLoading.value = false
  } else {
    nextTick(() => {
      if (classicSwitch.value)
        // 是否开启了实验测试默认进入经典模式
        router.push(`/experiment/methodOptimizationHome`) // 经典模式
      // else router.push(`/experiment/wizardMode/quantityDetermind`) // 向导模式
      else router.push(`/experiment/methodOptimizationHome`) // 经典模式
    })
  }
}

// 启动仪器
const startInstrumentFun = async () => {
  if (!!instrumentDetail.value.isDevOpened) {
    message.warning('您已启动仪器')
    return
  }
  const { code, data } = await startInstrument({
    deviceSerialNumber: instrumentDetail.value.deviceSerialNumber,
  })
  if (code === 200) {
    if (data) await initInstrumentFun()
  }
}

// 仪器详情
export type TInstrumentDetail = {
  deviceSerialNumber: string
  isDevOpened: number | null
  isInited: number | null
  connectMessage: string
  connectStatus: number | null
  appendMessage: string
  intMessage: {
    initTaskNum: number
    initProject: string
    initStatus: number
  }[]
}
const instrumentDetail: Ref<TInstrumentDetail> = ref({
  deviceSerialNumber: '', // 序列号
  isDevOpened: null, // 开机状态 0:未开机 1:已开机 3:软关机
  isInited: null, // 初始化状态 0：未完成；1：成功； 2：失败； 3：进行中  4：已停止
  connectMessage: '', // 连接信息
  connectStatus: null, // 连接状态 0-未连接，1-联机中，2-联机成功，3-联机失败
  appendMessage: '', // 附加信息
  intMessage: [], //初始化详细信息 initStatus初始化任务状态 0-进行中，1-成功，2-失败
})
const getInstrumentDetail = async () => {
  const { code, data } = await getInstrumentInfo({
    deviceSerialNumber: instrumentDetail.value.deviceSerialNumber,
  })
  if (code === 200) {
    deviceStatusStore.setIsInited(data.isInited)
    deviceStatusStore.setIsActivated(data.isActivated) // 激活状态
    deviceStatusStore.setDeviceName(data.deviceName) // 仪器名称
    instrumentDetail.value = {
      ...data,
      intMessage: data.intMessage.sort((a: { initTaskNum: number }, b: { initTaskNum: number }) => {
        return a.initTaskNum - b.initTaskNum
      }),
    }
  }
  if (instrumentDetail.value.isInited === 3) {
    // 初始化进行中 启动轮询
    activeKey.value = '1'
    await handleResetPolling() // 重启轮询
  } else if (instrumentDetail.value.isInited === 1 && simpleMode.value) {
    // 初始化成功且勾选了经典模式
    nextTick(() => {
      if (classicSwitch.value)
        // 是否开启了实验测试默认进入经典模式
        router.push(`/experiment/methodOptimizationHome`) // 经典模式
      // else router.push(`/experiment/wizardMode/quantityDetermind`) // 向导模式
      else router.push(`/experiment/methodOptimizationHome`) // 经典模式
    })
  }
}

// 初始化
const initStatus = ref<boolean>(false)
const initInstrumentFun = async () => {
  const { code, data, message } = await initInstrument({
    deviceSerialNumber: instrumentDetail.value.deviceSerialNumber,
  })
  if (code === 200) {
    initStatus.value = data
    await getInstrumentDetail()
  }
}
const selfCheckStatus = [
  {
    label: '未初始化',
    value: 0,
    className: 'text-[#ffae00]',
  },
  {
    label: '成功',
    value: 1,
    className: 'text-[#67c23a]',
  },
  {
    label: '失败',
    value: 2,
    className: 'text-[#ff0f0f]',
  },
  {
    label: '进行中',
    value: 3,
    className: 'text-[#0038a8]',
  },
  {
    label: '已停止',
    value: 4,
    className: 'text-[#ff0f0f]',
  },
]
const getCheckStatus = (value: number) => {
  return selfCheckStatus.find((item) => item.value === value)
}
let pollingInstance: ReturnType<typeof usePolling> | null = null
const startPolling = async (deviceSerialNumber: string) => {
  if (pollingInstance) {
    pollingInstance.stop()
  }
  // 动态创建新的轮询实例
  pollingInstance = usePolling(() =>
    getInstrumentInfo({
      deviceSerialNumber,
    }),
  )
  // 监听数据变化
  watch<TInstrumentDetail | null | undefined>(
    () => pollingInstance?.data.value,
    (newValue) => {
      if (newValue) {
        deviceStatusStore.setIsInited(newValue.isInited)
        instrumentDetail.value = {
          ...newValue,
          intMessage: newValue.intMessage.sort(
            (a: { initTaskNum: number }, b: { initTaskNum: number }) =>
              a.initTaskNum - b.initTaskNum,
          ),
        }
        if (
          instrumentDetail.value.isInited === 1 ||
          instrumentDetail.value.isInited === 2 ||
          instrumentDetail.value.isInited === 4
        ) {
          stopPolling()
          if (instrumentDetail.value.isInited === 1 && simpleMode.value) {
            setTimeout(() => {
              if (classicSwitch.value) {
                router.push(`/experiment/methodOptimizationHome`).catch((err) => {
                  console.error('路由跳转失败:', err)
                })
              } else {
                router.push(`/experiment/methodOptimizationHome`).catch((err) => {
                  console.error('路由跳转失败:', err)
                })
                // router.push(`/experiment/wizardMode/quantityDetermind`).catch((err) => {
                //   console.error('路由跳转失败:', err)
                // })
              }
            }, 100)
          }
        }
      }
    },
    { deep: true },
  )
  await pollingInstance.start()
}
const stopPolling = async () => {
  if (pollingInstance) {
    pollingInstance.stop()
    pollingInstance = null
  }
}
const handleResetPolling = async () => {
  await stopPolling()
  await startPolling(instrumentDetail.value.deviceSerialNumber) // 启动轮询
}

// 停止初始化
const handleStopInited = async () => {
  const { code } = await stopInitInstrument()
  if (code === 200) {
    // const nowData = instrumentDetail.value.intMessage.find((item) => item.initStatus === 0)
    Modal.success({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: `仪器初始化将在此任务成功后停止`,
      okText: '知道了',
    })
  }
}

// 软关机
const closeInstrumentFun = async () => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '是否确认关闭仪器？',
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      const closeModal = Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode(
          'div',
          { style: { textAlign: 'center', padding: '10px 0px 30px', fontSize: '16px' } },
          [
            createVNode(LoadingOutlined, { style: { marginRight: '20px', fontSize: '20px' } }),
            '正在关机...',
          ],
        ),
        closable: false,
        maskClosable: false,
        keyboard: false,
        centered: true,
        footer: null,
      })
      const { code, data } = await closeInstrument({
        deviceSerialNumber: instrumentDetail.value.deviceSerialNumber,
      })
      if (code === 200) {
        closeModal.destroy()
        message.success('已关机！')
        await getInstrumentDetail()
      }
    },
    onCancel() {},
  })
}

// 仪器命名
const editNameModalRef = ref()
const handleReName = () => {
  editNameModalRef.value.showModal()
}

const simpleMode = ref(false) // 是否登录时勾选了实验测试
const classicSwitch = ref(false) // 是否开启了实验测试默认进入经典模式
onMounted(async () => {
  // 获取路由的query参数
  const route = useRoute()
  // 是否自动开机
  const isOnlyData = route.query && route.query.isOnlyData === 'true' ? true : false
  // 是否自动跳转经典模式 勾选这个了一定勾选上了自动开机
  simpleMode.value = route.query && route.query.simpleMode === 'true' ? true : false
  classicSwitch.value = route.query && route.query.classicSwitch === 'true' ? true : false
  instrumentDetail.value.deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''
  if (!instrumentDetail.value.deviceSerialNumber) await getSerialNumberInfo() // 获取序列号和初始化状态
  if (instrumentDetail.value.deviceSerialNumber) {
    if (isOnlyData) {
      if (instrumentDetail.value.isDevOpened === 3) {
        // 软关机状态 开机
        await startInstrumentFun()
      } else if (instrumentDetail.value.isDevOpened === 1) {
        // 开机状态
        if (instrumentDetail.value.isInited === 0) {
          // 初始化未完成
          await initInstrumentFun() // 仪器初始化 启动初始化
        }
      }
    }
    if (instrumentDetail.value.isInited !== 0) {
      await getInstrumentDetail() // 如果获取序列号的时候初始化状态不是未初始化 调用查询仪器信息接口
    }
  }
})
</script>

<style scoped lang="less">
.btn-info-box {
  box-shadow: 4px 4px 0px 0px #c5c5c5;
  border-radius: 30px;
  background: #f4faff;
  .button-item {
    padding: 10px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    cursor: pointer;
    .icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .self-inspection-info {
    width: 100%;
    padding: 10px 30px;
    display: flex;
    align-items: center;
  }
}
.start-button {
  display: flex;
  align-items: center;

  .started-font {
    margin-left: 15px;
    text-wrap: nowrap;
    font-size: 16px;
    color: #67c23a;
  }
}

.ant-divider-horizontal {
  margin: 12px -25px 0px -25px;
}

:deep(.ant-collapse-item) {
  border-radius: 30px !important;
  > .ant-collapse-header {
    display: flex;
    align-items: center;
  }
}

:deep(.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow) {
  font-size: 25px !important;
  font-weight: bold !important;
  color: #d4d5d6 !important;
}

:deep(.ant-collapse-expand-icon) {
  position: absolute;
  right: 20px;
}

:deep(.ant-collapse-item > .ant-collapse-header) {
  padding: 0px !important;
}
</style>
