<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="w-full h-screen">
    <a-config-provider :theme="appStore.naiveThemeOverrides">
      <RouterView />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { px2remTransformer, useStyleProvider } from 'ant-design-vue'
import { ref, watch } from 'vue'
import useWebSocket from '@/composables/useWebSocket.ts'
import { useMethodsParamsRange } from '@/composables/useMethodsParamsRange'
const appStore = useAppStore()

const px2rem = px2remTransformer({
  rootValue: 16,
})

// 使用组合式 API
useStyleProvider({
  transformers: [px2rem],
})
const route = useRoute()
watch(
  () => appStore.measureMode,
  (val) => {
    if (val === '1') {
      startMeasureLoading()
    } else {
      finishMeasureLoading()
    }
  },
)
// 监听路由变化
watch(
  route,
  (to, from) => {
    console.log('路由变化:', to, from)
    // 区分主副页面
    const queryParams = to.query
    if (queryParams && queryParams.sub === 'true') {
      sessionStorage.setItem('sub', 'true')
      console.log(
        !sessionStorage.getItem('sub'),
        sessionStorage.getItem('sub'),
        '!sessionStorage.getItem(sub)',
      )
    }
    // console.log(!sessionStorage.getItem('sub'),sessionStorage.getItem('sub'),'!sessionStorage.getItem(sub)')
  },
  { immediate: true },
)

const originalTitle = document.title
const loadingEmojis = [
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
] // 用于循环的静态 Emoji
let currentEmojiIndex = 0
let loadingInterval: number | null = null

// 启动加载动画
const startMeasureLoading = () => {
  // 如果已有定时器，先清理
  if (loadingInterval) {
    clearInterval(loadingInterval)
  }
  loadingInterval = window.setInterval(() => {
    currentEmojiIndex = (currentEmojiIndex + 1) % loadingEmojis.length
    document.title = `${originalTitle}   ${loadingEmojis[currentEmojiIndex]} 测量中...`
  }, 800)
}

// 停止加载动画
function finishMeasureLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval)
    loadingInterval = null
  }
  document.title = originalTitle
}

const beforeUnloadTime = ref(0)
const gapTime = ref(0)

const beforeunloadHandler = () => {
  beforeUnloadTime.value = new Date().getTime()
}

const unloadHandler = () => {
  gapTime.value = new Date().getTime() - beforeUnloadTime.value
  //判断是窗口关闭还是刷新
  if (gapTime.value <= 5 && !sessionStorage.getItem('sub')) {
    localStorage.clear()
  }
}

/**************************************** webSocket连接 *********************************/
const { isConnected, messages, connect, disconnect, sendMessage, subscribe, addSubscription } =
  useWebSocket()
const subscriptionId = ref<any>('')
const deviceStatusStore = useDeviceStatusStore()
nextTick(() => {
  watch(
    () => deviceStatusStore.isInited,
    (newValue: any) => {
      if (newValue == 1) handleConnect()
      else {
        if (isConnected.value) handleDisconnect()
      }
    },
    {
      immediate: true,
      deep: true,
    },
  )
})
const handleConnect = async () => {
  await connect({})
  const deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''
  sendMessage('/app/detection/start', deviceSerialNumber)
  // 连接成功后订阅主题
  if (isConnected.value) {
    subscriptionId.value = addSubscription('/topic/detection', (message) => {
      // console.log('接收到消息：', message)
      if (message) {
        appStore.setNm(message.x)
        appStore.setAbs(message.y)
        appStore.setBandwidth(message.bandwidth) // 光谱带宽
        appStore.setChangeLampWl(message.changeLampWl) // 换灯波长
        appStore.setResponseTime(message.time) // 响应时间
        appStore.setPoolNumber(
          message.pos > message.totalPoolNum || message.pos == message.totalPoolNum
            ? ''
            : message.pos,
        ) // 当前池号
        appStore.setLuminosity(message.luminosity) // 光度模式
        deviceStatusStore.setLightList(message.dataList) // 灯状态
        deviceStatusStore.setAttachmentType({
          totalPoolNum: message.totalPoolNum,
          attachmentKind: message.attachmentKind,
          attachmentName: message.attachmentName,
        }) // 附件类型池数量
      }
    })
  }
}
const handleDisconnect = () => {
  disconnect()
}

/**************************************** 仪器参数范围信息 *********************************/
nextTick(() => {
  watch(
    () => deviceStatusStore.deviceSerialNumber,
    (newValue: any) => {
      if (newValue) {
        useMethodsParamsRange()
      }
    },
    {
      immediate: true,
      deep: true,
    },
  )
})

onMounted(() => {
  //监听 beforeunload 事件，在页面即将卸载时记录时间戳
  window.addEventListener('beforeunload', () => beforeunloadHandler())
  // 监听 unload 事件，在页面完全卸载时计算时间差
  window.addEventListener('unload', () => unloadHandler())
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeunloadHandler)
  window.removeEventListener('unload', unloadHandler)
  handleDisconnect()
})
</script>
