<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="websocket-demo">
    <!-- <div class="connection-status">
      <span :class="['status-indicator', { connected: isConnected }]"></span>
      {{ isConnected ? '已连接' : '未连接' }}
    </div>

    <div class="controls">
      <a-button @click="handleConnect" :disabled="isConnected">连接</a-button>
      <a-button @click="handleDisconnect" :disabled="!isConnected">断开</a-button>
      <a-button @click="sendMessage" :disabled="!isConnected">发送消息</a-button>
    </div>

    <div class="messages">
      <h3>消息列表</h3>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          {{ msg.content }} - {{ msg.timestamp }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import useWebSocket from '@/composables/useWebSocket'

// const appStore = useAppStore()

// const { isConnected, messages, connect, disconnect, sendMessage, subscribe } = useWebSocket()
// const subscriptionIds = ref({
//   sub1: '',
//   sub2: '',
//   sub3: '',
//   sub4: '',
//   sub5: '',
//   sub6: '',
//   sub7: '',
//   sub8: '',
// })
// const deviceStatusStore = useDeviceStatusStore()
// const handleConnect = async () => {
//   await connect({
//     // 可以添加认证头等信息
//   })
//   const deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010'
//   sendMessage('/app/measure/start', deviceSerialNumber)

//   // 连接成功后订阅主题
//   if (isConnected.value) {
//     subscriptionIds.value.sub1 = subscribe('/topic/measure', (message) => {
//       // console.log('Received message1:', message)
//       if (message) {
//         appStore.setNm(message.x)
//         appStore.setAbs(message.y)
//       }
//       messages.value.push(message)
//     })
//     // 光谱带宽
//     subscriptionIds.value.sub2 = subscribe('/topic/Bandwidth', (message) => {
//       // console.log('Received message2:', message)
//       if (message) {
//         appStore.setBandwidth(message.Bandwidth)
//       }
//     })
//     // 换灯波长
//     subscriptionIds.value.sub3 = subscribe('/topic/ChangeLampWl', (message) => {
//       // console.log('Received message3:', message)
//       if (message) {
//         appStore.setChangeLampWl(message.ChangeLampWl)
//       }
//     })
//     // 响应时间
//     subscriptionIds.value.sub4 = subscribe('/topic/time', (message) => {
//       // console.log('Received message4:', message)
//       appStore.setResponseTime(message.time)
//       // messages.value.push(message)
//     })
//     // 当前池号
//     subscriptionIds.value.sub5 = subscribe('/topic/Pos', (message) => {
//       // console.log('Received message5:', message)
//       appStore.setPoolNumber(message.Pos)
//     })
//     // 光度模式
//     subscriptionIds.value.sub6 = subscribe('/topic/photomode', (message) => {
//       // console.log('Received message5:', message)
//       // appStore.setUnit(message.Pos)
//     })
//     subscriptionIds.value.sub7 = subscribe('/topic/LampPos', (message) => {
//       if (message) {
//         deviceStatusStore.setLightList(message.dataList)
//       }
//     })
//     subscriptionIds.value.sub8 = subscribe('/topic/sampletyple', (message) => {
//       if (message) {
//         deviceStatusStore.setAttachmentType(message.sampletyple)
//       }
//     })
//   }
// }

// const handleDisconnect = () => {
//   disconnect()
// }

// const sendMessageFun = () => {
//   sendMessage('/app/sendMessage', {
//     content: 'Hello from Vue!',
//     timestamp: new Date().toISOString(),
//   })
// }
</script>

<style scoped>
.websocket-demo {
  padding: 20px;
}

.connection-status {
  margin-bottom: 20px;
}

.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 10px;
}

.status-indicator.connected {
  background-color: green;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
}

.messages {
  margin-top: 20px;
}

.messages ul {
  list-style-type: none;
  padding: 0;
}

.messages li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
</style>
