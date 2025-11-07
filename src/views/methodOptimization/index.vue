<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <overlayCanPart
    :spinning="
      (appStore.deviceMeasureMode === 2 && appStore.measureMode === '1') || appStore.zeroLoading
    "
    :show-stop-button="measurementType === '光谱扫描' || measurementType === '时间扫描'"
    :tip="tipContent"
    class="!h-full"
    @stop="handleStop"
  >
    <div class="methodOptimization">
      <!--    <section class="nav-box">-->
      <!--      <div-->
      <!--        v-for="item in navList"-->
      <!--        :key="item.icon"-->
      <!--        class="flex items-center justify-center nav-item"-->
      <!--        :style="{ background: item.name === measurementType ? '#e0eafc' : '#f4faff' }"-->
      <!--        @click="changeTab(item.name)"-->
      <!--      >-->
      <!--        <div class="icon-box" :style="{ backgroundImage: `url(${item.icon})` }"></div>-->
      <!--        <div class="text-[16px]" :style="{ color: item.color }">{{ item.name }}</div>-->
      <!--      </div>-->
      <!--    </section>-->
      <div
        class="w-full bg-[#F4FAFF] flex px-2 gap-4 shadow shadow-gray-400/50 !mb-3 !rounded-[10px]"
      >
        <div
          v-for="item in navList"
          :key="item.icon"
          class="text-[16px] px-5 py-1 nav-card cursor-pointer flex items-center"
          :class="{ active: item.name === measurementType }"
          @click="changeTab(item.name)"
        >
          <div class="text-[18px] !font-bold">{{ item.name }}</div>
        </div>
        <div class="flex items-center gap-5">
          <div>
            名称：{{ quickModeObj.taskName
            }}<span class="text-red-500" v-if="!quickModeObj.saveStatus">【未保存】</span>
          </div>
          <div>使用方法：{{ quickModeObj.methodName }}</div>
          <!--        <div class="flex items-center">-->
          <!--          <span class="text-[14px] text-[#595757]">自动保存时间(分)</span>-->
          <!--          <a-select-->
          <!--            v-model:value="saveTime"-->
          <!--            class="w-[130px] !m-2"-->
          <!--            :options="saveTimeOptions"-->
          <!--            @change="handleSaveTimeChange"-->
          <!--          >-->
          <!--          </a-select>-->
          <!--          &lt;!&ndash; <a-input-number v-model:value="saveTime" :min="0" class="w-xs !m-2" /> &ndash;&gt;-->
          <!--        </div>-->
        </div>
      </div>
      <div class="uv-container">
        <!--      <temporaryDataTable />-->
        <threeLayout :measureType="measurementType" ref="threeLayoutRef" />
      </div>
    </div>
  </overlayCanPart>
</template>
<script lang="ts">
export default {
  name: 'MethodOptimization', // 组件名称，需唯一且与 include 匹配
}
</script>
<script lang="ts" setup>
import { getInstrumentInfo, getPanelConf, querySaveState } from '@/api'
import doubleGroupMeasurementIcon from '@/assets/images/experiment/double_group_measurement_icon.png'
import photometricMeasurementIcon from '@/assets/images/experiment/photometric_measurement_icon.png'
import quantitativeDeterminationIcon from '@/assets/images/experiment/quantitative_determination_icon.png'
import spectralScanningIcon from '@/assets/images/experiment/spectral_scanning_icon.png'
import timeScanIcon from '@/assets/images/experiment/time_scan_icon.png'
import threeLayout from './components/threeLayout.vue'
import { useDeviceStatusStore, useQuickModeStore } from '@/stores'
import { Modal } from 'ant-design-vue'
import { usePolling } from '@/composables'
import type { TInstrumentDetail } from '../instrument/components/OnOrOff.vue'
import { useQueryDeviceStatus } from '@/utils/hooks'
import webSocketService from '@/utils/websocket.ts'
import { useMethodsParamsRange } from '@/composables/useMethodsParamsRange'
const appStore = useAppStore()
const route = useRoute()
const measurementType = ref(
  route.query && route.query.measureType ? (route.query.measureType as string) : '光度测量',
)
const navList = computed(() => {
  const nav = [
    {
      name: '光度测量',
      icon: photometricMeasurementIcon,
      width: '40px',
      height: '51px',
      color: '#5CB265',
      toPath: '/experiment/lumneScence',
    },
    {
      name: '定量测定',
      icon: quantitativeDeterminationIcon,
      color: '#5B81D1',
      toPath: '/experiment/quantityDetermind',
    },
    {
      name: '光谱扫描',
      icon: spectralScanningIcon,

      color: '#937DDA',
      toPath: '/experiment/spectralScan',
    },
    {
      name: '时间扫描',
      icon: timeScanIcon,
      color: '#DAB27D',
      toPath: '/experiment/timeScan',
    },
    // {
    //   name: '双分组测量',
    //   icon: doubleGroupMeasurementIcon,
    //   color: '#D57DDA',
    //   toPath: '/experiment/twoComponentMeasure',
    // },
  ]
  if (route.query && route.query.projectDetail && route.query.measureType) {
    return nav.filter((item) => item.name === route.query.measureType)
  } else {
    return nav
  }
})
const tipContent = computed(() => {
  return appStore.deviceMeasureMode === 2 && appStore.measureMode === '1'
    ? '测量中'
    : appStore.zeroLoading && measurementType.value === '光谱扫描'
      ? '基线中'
      : '校零中'
})
const threeLayoutRef = ref()
const saveTime = ref(5)
const saveTimeOptions = [
  {
    label: '不自动保存',
    value: 0,
  },
  {
    label: '5分钟',
    value: 5,
  },
  {
    label: '15分钟',
    value: 15,
  },
  {
    label: '30分钟',
    value: 30,
  },
  {
    label: '1小时',
    value: 60,
  },
]
const handleSaveTimeChange = async () => {
  await stopAutoSaveTimer()
  if (saveTime.value) await startAutoSaveTimer()
}
const querySaveStateTimer = ref<ReturnType<typeof setInterval> | null>(null)
const autoSaveTimer = ref<ReturnType<typeof setInterval> | null>(null)
const deviceStateTimer = ref<ReturnType<typeof setInterval> | null>(null)
const nameObj = ref({
  methodName: '',
  taskName: '',
  saveStatus: '',
})
const quickModeObj = computed(() => {
  return useQuickModeStore().quickModeObj
})
const changeTab = (name: string) => {
  if (threeLayoutRef.value.isMethodsParamsNotSave) {
    Modal.confirm({
      title: h(
        'span',
        {
          class: 'text-[16px] !font-bold',
        },
        '确认离开',
      ),
      content: h(
        'span',
        {
          class: 'text-[14px]',
        },
        '您将离开该页面，您的自定义方法参数已修改，修改的方法参数不会被保存，确认离开吗？',
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        measurementType.value = name
        appStore.setIsDataChanged(false)
      },
      onCancel() {
        // 用户取消，阻止导航
        return
      },
    })
  } else {
    measurementType.value = name
  }
}
const querySaveStateFun = async () => {
  if (!threeLayoutRef.value.taskId) return
  const { code, data } = await querySaveState({
    taskId: threeLayoutRef.value.taskId,
  })
  if (code === 200) {
    nameObj.value.saveStatus = data ? data.saveStatus : ''
    nameObj.value.taskName = data ? data.taskName : ''
    nameObj.value.methodName = data ? data.methodName : ''
  }
}
const startQuerySaveStateTimer = () => {
  querySaveStateTimer.value = setInterval(() => {
    // querySaveStateFun()
    useQuerySaveState(threeLayoutRef.value.taskId)
  }, 5000)
  deviceStateTimer.value = setInterval(() => {
    useQueryDeviceStatus()
  }, 1000)
}
const stopQuerySaveStateTimer = () => {
  if (querySaveStateTimer.value) {
    clearInterval(querySaveStateTimer.value)
    querySaveStateTimer.value = null
  }
  if (deviceStateTimer.value) {
    clearInterval(deviceStateTimer.value)
    deviceStateTimer.value = null
  }
}
const startAutoSaveTimer = async () => {
  autoSaveTimer.value = setInterval(
    () => {
      if (saveTime.value) {
        useSaveDraftButton(threeLayoutRef.value.taskId, true)
      }
    },
    saveTime.value * 60 * 1000,
  )
}
const stopAutoSaveTimer = async () => {
  if (autoSaveTimer.value) {
    clearInterval(autoSaveTimer.value)
    autoSaveTimer.value = null
  }
}
provide('saveStatus', quickModeObj.value.saveStatus)
// provide('querySaveStateFun', querySaveStateFun)
const getDetail = async () => {
  const { code, data } = await getPanelConf()
  if (code === 200) {
    if (data.autoSaveSwitch) {
      saveTime.value = data.autoSaveInterval
    } else {
      saveTime.value = 0
    }
  }
}

// 仪器初始化状态
const deviceStatusStore = useDeviceStatusStore()
let pollingInstance: ReturnType<typeof usePolling> | null = null
const startPolling = async (deviceSerialNumber: any) => {
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
      let isInited
      if (newValue) {
        isInited = newValue.isInited
        deviceStatusStore.setIsInited(isInited)
        if (isInited === 1 || isInited === 2) {
          stopPolling()
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
const handleStop = () => {
  webSocketService.send('close')
}
onMounted(async () => {
  const deviceSerialNumber = localStorage.getItem('deviceSerialNumber')
  if (deviceSerialNumber) startPolling(deviceSerialNumber)
  await getDetail()
  startQuerySaveStateTimer()
  if (saveTime.value) {
    await startAutoSaveTimer()
  }
  useMethodsParamsRange()
})
onUnmounted(() => {
  stopQuerySaveStateTimer()
  if (saveTime.value) {
    stopAutoSaveTimer()
  }
})
onActivated(() => {
  console.log('组件被激活')
})
</script>
<style scoped lang="less">
.methodOptimization {
  .nav-box {
    margin: -5px -20px 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .nav-item {
      margin: 0px 20px;
      padding: 0px 15px;
      box-shadow: 0px 6px 11px 2px rgba(147, 147, 147, 0.33);
      border-radius: 28px;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }

      .icon-box {
        width: 30px;
        height: 30px;
        background-size: auto 65%;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }

  .nav-card {
    font-weight: bold;
    color: #616170;

    &.active {
      background: #f2f0f0;
      color: #113371;
      border-bottom: 3px solid #113371;
    }
  }
}
</style>
