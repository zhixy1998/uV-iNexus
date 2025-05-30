<template>
  <section>
    <per-see-collapse
      :parentActiveKey="activeKey"
      title="仪器开关机"
      @changeCollapse="changeCollapse"
    >
      <template #slot-header>
        <a-divider />
        <div class="flex flex-row items-center flex-wrap">
          <div
            v-for="item in buttonList"
            :key="item.id"
            class="!mt-5"
            :class="{ 'start-button': item.id === '1', '!mr-35': item.id !== '3' }"
          >
            <a-button
              type="primary"
              class="!flex flex-row items-center"
              :danger="item.danger"
              :loading="item.id === '1' ? loadingStart : false"
              @click.stop="item.onClick()"
            >
              <template #icon>
                <component :is="item.icon" />
              </template>
              {{ item.text }}
              <template v-if="item.id === '1'">
                <div class="started-font" v-show="instrumentDetail?.isDevOpened === '1'">
                  已启动
                  <check-outlined />
                </div>
              </template>
            </a-button>
          </div>
        </div>
        <div class="flex flex-row flex-wrap !mt-4">
          <div class="text-[16px]">
            仪器序列号：{{ instrumentDetail.deviceSerialNumber || '-' }}
          </div>
          <div class="!ml-25 text-[16px]">
            仪器自检状态：
            <text :class="selfCheckStatus[Number(instrumentDetail.isInited)]?.className">{{
              selfCheckStatus[Number(instrumentDetail.isInited)]?.label
            }}</text>
          </div>
        </div>
      </template>
      <template #slot-content>
        <div class="!leading-9">
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
      </template>
    </per-see-collapse>
  </section>
</template>

<script lang="ts" setup>
import {
  PoweroffOutlined,
  SyncOutlined,
  CheckOutlined,
  LoadingOutlined,
} from '@ant-design/icons-vue'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import PerSeeCollapse from '@/components/PerSeeCollapse.vue'

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}
// 机器详情
type TInstrumentDetail = {
  deviceSerialNumber: string
  isDevOpened: string
  isInited: string
  connectMessage: string
  appendMessage: string
  intMessage: {
    bt: string
    list: string[]
    bw: string
  }
}
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
// 启动仪器
const loadingStart = ref(false)
const startInstrument = async () => {
  loadingStart.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  instrumentDetail.value.isDevOpened = '1'
  loadingStart.value = false
}
// 自检
const selfCheckStatus = [
  {
    label: '未完成',
    value: '0',
    className: 'text-[#ffae00]',
  },
  {
    label: '成功',
    value: '1',
    className: 'text-[#67c23a]',
  },
  {
    label: '失败',
    value: '2',
    className: 'text-[#d40303]',
  },
  {
    label: '进行中',
    value: '3',
    className: 'text-[#0038a8]',
  },
]
const loadingSelfCheck = ref(false)
const selfCheck = async () => {
  loadingSelfCheck.value = true
  activeKey.value = '1'
  instrumentDetail.value.isInited = '3'
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  instrumentDetail.value.isInited = '1'
  loadingSelfCheck.value = false
}
// 软关机
const closeInstrument = async () => {}
const buttonList = [
  {
    id: '1',
    icon: PoweroffOutlined,
    text: '启动仪器',
    danger: false,
    onClick: () => startInstrument(),
  },
  {
    id: '2',
    icon: SyncOutlined,
    text: '重新自检',
    danger: false,
    onClick: () => selfCheck(),
  },
  {
    id: '3',
    icon: PoweroffOutlined,
    text: '软关机',
    danger: true,
    onClick: () => closeInstrument(),
  },
]

onMounted(async () => {
  // 获取路由的query参数
  const route = useRoute()
  const isOnlyData = route.query.isOnlyData || 1
  if (isOnlyData) {
    await getInstrumentDetail()
    await startInstrument()
    await selfCheck()
  }
})
</script>

<style scoped lang="less">
.start-button {
  position: relative;
  display: flex;
  align-items: center;

  .started-font {
    position: absolute;
    left: 120px;
    text-wrap: nowrap;
    font-size: 16px;
    color: #67c23a;
  }
}

.ant-divider-horizontal {
  margin: 12px 0px 0px 0px;
}
</style>
