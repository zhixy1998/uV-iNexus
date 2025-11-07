<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <div class="monitor-box">
      <div class="monitor-title">仪器状态监控</div>
      <div class="monitor-container">
        <div>
          <div class="flex justify-between flex-wrap !mt-[10px] !pl-15 !pr-15">
            <!-- 自动进样器 积分球 -->
            <div class="left-img-monitor">
              <!-- :style="{
                  border: `3px solid ${
                    imgOptions.autosampler.dataList && imgOptions.autosampler.dataList.length
                      ? '#5ca669'
                      : '#e6e6e6'
                  }`,
                }" -->
              <div class="autosampler-img-box" :style="{ border: `3px solid #e6e6e6` }">
                <div class="flex items-start flex-wrap" style="zoom: 0.35">
                  <div
                    v-for="item in imgOptions.autosampler.dataList"
                    :key="item.title"
                    class="img-item"
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
                      <div class="text-center !mt-1 !text-[18px] !text-[#595757]">
                        {{ item.title }}
                      </div>
                    </template>
                  </div>
                </div>
                <div class="text-[14px] text-[#595757]">自动进样器</div>
              </div>
              <div
                class="ball-box !mt-[20px]"
                :style="{ border: `3px solid ${imgOptions.ball.isOff ? '#e6e6e6' : '#5ca669'}` }"
              >
                <div class="w-[110px] h-[110px]">
                  <img
                    src="@/assets/images/instrument/ball.png"
                    class="w-[100%] h-[100%]"
                    alt="积分球"
                  />
                </div>
                <div class="!mt-[20px] text-[14px] text-[#595757]">积分球</div>
              </div>
            </div>
            <!-- 样品仓 光源室 单色器 电源 -->
            <div class="middle-img-monitor">
              <div class="title-t800">{{ deviceStatusStore.deviceName }}状态图</div>
              <div class="flex justify-between !mt-16">
                <!-- 样品仓 -->
                <div class="flex flex-col justify-end">
                  <div
                    class="eight-pool-img-box"
                    :class="{ 'flex flex-1': !imgOptions.attachmentType.dataList.length }"
                  >
                    <div
                      v-if="imgOptions.attachmentType.dataList.length"
                      class="eight-pool-img-content"
                    >
                      <div
                        v-for="(item, index) in imgOptions.attachmentType.dataList"
                        :key="item.id"
                        class="eight-pool-img-content-circle"
                        :class="[index % 2 === 0 ? '' : '!ml-[20px]']"
                        :style="{
                          backgroundColor:
                            item.status === 3
                              ? '#FCCA00'
                              : item.status === 2
                                ? '#93D2F3'
                                : '#CCF783',
                        }"
                      ></div>
                    </div>
                    <div class="text-center !text-[12px] !text-[#595757] !mt-2">
                      {{ imgOptions.attachmentType.name }}
                    </div>
                  </div>
                  <div class="text-[14px] text-[#595757] text-center !mt-2">样品仓</div>
                </div>
                <!-- 光源室 单色器 电源 -->
                <div>
                  <div class="light-box">
                    <div v-for="item in imgOptions.lightSourceRoom.dataList" :key="item.value">
                      <div class="light-img">
                        <img :src="item.value === '亮' ? lightYellow : lightGrey" alt="灯" />
                      </div>
                      <div
                        class="text-center !text-[12px] !text-[#595757]"
                        :class="[item.value === '亮' ? '!text-[#FCCA00]' : '!text-[#999999]']"
                      >
                        {{ item.label }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="monochromator-box text-[16px] !text-[#595757]">
                        <span class="text-[28px] font-bold">λ</span> =
                        {{ imgOptions.monochromator.data }}nm
                      </div>
                      <div class="text-[14px] text-[#595757] text-center !mt-2">单色器</div>
                    </div>
                    <div>
                      <div class="power-box">
                        <div class="w-[50px] h-[50px]">
                          <img
                            :src="imgOptions.power.imgSrc"
                            class="w-[100%] h-[100%]"
                            alt="电源"
                          />
                        </div>
                      </div>
                      <div class="text-[14px] text-[#595757] text-center !mt-2">电源</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 外部系统 控制屏 主机 -->
            <div class="right-img-monitor">
              <div class="system-box" :style="{ border: `3px solid #e6e6e6` }">
                <div class="w-[100px]">
                  <img
                    src="@/assets/images/instrument/system.png"
                    class="w-[100%] h-[100%]"
                    alt="外部系统"
                  />
                </div>
                <div class="text-[14px] text-[#595757] text-center !mt-2">外部系统</div>
              </div>
              <div class="system-box" :style="{ border: `3px solid #e6e6e6` }">
                <div class="w-[100px]">
                  <img
                    src="@/assets/images/instrument/screen.png"
                    class="w-[100%] h-[100%]"
                    alt="控制屏"
                  />
                </div>
                <div class="text-[14px] text-[#595757] text-center !mt-2">控制屏</div>
              </div>
              <div class="system-box">
                <div class="w-[100px]">
                  <img
                    src="@/assets/images/instrument/host.png"
                    class="w-[100%] h-[100%]"
                    alt="PC电脑"
                  />
                </div>
                <div class="text-[14px] text-[#595757] text-center !mt-2">PC电脑</div>
              </div>
            </div>
          </div>
          <div v-show="showDetail">
            <div class="!mt-[50px] !mb-[10px] title">仪器状态</div>
            <vxeTable ref="tableRef" :options="newTableOptions">
              <template #active="{ row }">
                <text
                  class="cursor-pointer"
                  :style="{ color: primaryColor }"
                  v-if="row.status === '开启' && row.parts !== '电源'"
                  >关闭</text
                >
                <text
                  class="cursor-pointer"
                  :style="{ color: primaryColor }"
                  v-if="row.status === '关闭' && row.parts !== '电源'"
                  >开启</text
                >
                <text
                  class="cursor-pointer"
                  :style="{ color: primaryColor }"
                  v-if="row.parts === '灯位置' && row.status"
                  >切换</text
                >
              </template>
            </vxeTable>
            <!-- <vxeTable class="!mt-[50px]" ref="tableRef" :options="tableOptions"> </vxeTable>
            <div
              v-for="(item, index) in detailList"
              :key="item.key"
              :class="[index === 0 ? '!mt-2' : '!mt-5']"
            >
              <div class="title">{{ item.title }}</div>
              <div class="flex flex-row items-center justify-between flex-wrap">
                <div
                  v-for="dataItem in item.data"
                  :key="dataItem.key"
                  class="data-item flex flex-row items-center"
                >
                  <div class="!ml-8 text-[14px] data-item-label">{{ dataItem.label }}：</div>
                  <div class="text-[16px]">
                    {{ dataItem.value || '-' }}
                  </div>
                </div>
              </div>
            </div>
            <div class="!mt-5">
              <div class="title">状态</div>
              <div class="!ml-8 text-[16px] data-item-label">1111</div>
            </div> -->
          </div>
          <div
            class="cursor-pointer !mt-[30px] flex items-center justify-center"
            @click="showDetail ? (showDetail = false) : (showDetail = true)"
          >
            <span class="text-[15px] text-[#6E6E6E] !font-bold">{{
              showDetail ? '收起' : '更多'
            }}</span>
            <up-circle-filled class="!text-[18px] !text-[#113371] !ml-[5px]" v-if="showDetail" />
            <down-circle-filled class="!text-[18px] !text-[#113371] !ml-[5px]" v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { DownCircleFilled, UpCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { h, onMounted, reactive, ref } from 'vue'

import light1 from '@/assets/images/instrument/light1.png'
import light2 from '@/assets/images/instrument/light2.png'
import { useAppStore, useDeviceStatusStore } from '@/stores'
import { getInjectorConf, getInstrumentConfig } from '@/api'
import powerGreen from '@/assets/images/instrument/power_green.png'
import powerRed from '@/assets/images/instrument/power_red.png'
import powerGrey from '@/assets/images/instrument/power_grey.png'
import lightYellow from '@/assets/images/instrument/light_yellow.png'
import lightGrey from '@/assets/images/instrument/light_grey.png'

const { primaryColor } = useAppStore()
const appStore = useAppStore()

// 图
const imgOptions = reactive({
  autosampler: {
    plateRailOptions: [
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
    ],
    dataList: [] as {
      title: string
      num: number
      circleBgColor: string
    }[],
  },
  attachmentType: {
    options: [
      {
        label: '固定池',
        value: 1,
      },
      {
        label: '八联池',
        value: 2,
      },
      {
        label: '五联池',
        value: 3,
      },
      {
        label: '流动池',
        value: 4,
      },
      {
        label: '积分球',
        value: 5,
      },
    ],
    name: '' as any,
    dataList: [] as any,
  },
  lightSourceRoom: {
    dataList: [] as any,
  },
  monochromator: {
    data: 660,
  },
  power: {
    imgSrc: '' as any,
  },
  ball: {
    isOff: true,
  },
})
// 积分球
const getInstrumentConfigDetail = async () => {
  if (deviceStatusStore.deviceSerialNumber) {
    const { code, data } = await getInstrumentConfig({
      deviceSerialNumber: deviceStatusStore.deviceSerialNumber,
    })
    if (code === 200) {
      imgOptions.ball.isOff = data.annexSetting !== 4
    }
  }
}
// 自动进样器
const showImgFun = (query: any) => {
  imgOptions.autosampler.dataList = query.map((item: any) => {
    const selectedOption = imgOptions.autosampler.plateRailOptions.find(
      (p) => p.value === item.plateRail,
    )
    return {
      title: item.panel,
      num: selectedOption?.num,
      circleBgColor: selectedOption?.circleBgColor,
    }
  })
}
const getAutosamplerDetail = async () => {
  if (deviceStatusStore.deviceSerialNumber) {
    const { code, data } = await getInjectorConf()
    if (code === 200) {
      if (data.paramList && data.paramList.length) {
        showImgFun(data.paramList)
      }
    }
  }
}

// 状态
const deviceStatusStore = useDeviceStatusStore()
imgOptions.power.imgSrc = computed(() =>
  deviceStatusStore.isDevOpened == 0
    ? powerGrey
    : deviceStatusStore.isDevOpened == 1
      ? powerGreen
      : powerRed,
)
const newTableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  columns: [
    {
      field: 'parts',
      title: '部件',
    },
    {
      field: 'status',
      title: '状态',
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
    },
  ],
  data: [
    {
      parts: '电源',
      status: '',
    },
    {
      parts: '控制终端',
      status: '',
    },
    {
      parts: '附件类型',
      status: '',
    },
    {
      parts: '灯位置',
      status: '',
    },
    {
      parts: '钨灯状态',
      status: '',
    },
    {
      parts: '氘灯状态',
      status: '',
    },
  ],
})
watch(
  () => [deviceStatusStore.lightList, appStore.bandwidth, appStore.changeLampWl],
  ([newDataList, newBandwidth, newChangeLampWl]: any) => {
    if (newDataList) {
      // 仪器状态表格
      newTableOptions.value.data.forEach((item) => {
        if (item.parts === '灯位置')
          item.status = newDataList.length
            ? newDataList.find((item: any) => item.value === '亮')?.label
            : ''
      })
    }
    newTableOptions.value.data = newTableOptions.value.data.slice(0, 4).concat(
      newDataList
        .map((item: any) => ({
          parts: item.label + '状态',
          status: item.value === '亮' ? '开启' : '关闭',
        }))
        .concat([
          {
            parts: '当前光谱带宽',
            status: (newBandwidth || 0) + 'nm',
          },
          {
            parts: '当前波长',
            status: (newChangeLampWl || 0) + 'nm',
          },
        ]),
    )
    // 监控状态图
    imgOptions.lightSourceRoom.dataList = newDataList
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => deviceStatusStore.attachmentType.attachmentName,
  (newName) => {
    // 仪器状态表格
    newTableOptions.value.data.forEach((item) => {
      if (item.parts === '附件类型') item.status = newName
    })
    // 监控状态图
    if (newName === '未识别') {
      imgOptions.attachmentType.dataList = []
    } else {
      imgOptions.attachmentType.name = newName
      imgOptions.attachmentType.dataList = Array.from({
        length: deviceStatusStore.attachmentType.totalPoolNum || 0,
      }).map((_, index) => {
        return {
          id: index + 1 + '',
          status: 3,
        }
      })
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

// 展开收起
const showDetail = ref(false)
// 表格
const tableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  columns: [
    {
      field: 'xh',
      title: '序号',
      width: 120,
    },
    {
      field: 'qjlx',
      title: '器件类型',
      slots: {
        default: ({ row }: any) => {
          return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              },
            },
            [
              h('img', {
                src: row.qjlx === '钨灯' ? light1 : light2,
                style: {
                  width: '30px',
                  height: '30px',
                },
              }),
              h('span', row.qjlx),
            ],
          )
        },
      },
    },
    {
      field: 'tj',
      title: '统计',
    },
    {
      field: 'jkzt',
      slots: {
        default: ({ row }: any) => {
          const statusMap: any = {
            1: '良好',
            2: '差',
            3: '建议更换',
          }
          const colorMap: any = {
            1: '#67c23a',
            2: '#ffae00',
            3: '#d40303',
          }
          return h(
            'span',
            {
              style: {
                color: colorMap[row.jkzt],
              },
            },
            statusMap[row.jkzt],
          )
        },
      },
    },
  ],
  data: [
    {
      id: '1111',
      xh: '1',
      qjlx: '氘灯',
      tj: '氘灯使用时长：568/3000h',
      jkzt: 1,
      ghsj: 1749016152000,
    },
    {
      id: '2222',
      xh: '2',
      qjlx: '钨灯',
      tj: '钨灯使用时长：2568/3000h',
      jkzt: 2,
      ghsj: 1749016152000,
    },
    {
      id: '3333',
      xh: '3',
      qjlx: '汞灯',
      tj: '汞灯使用时长：3568/3000h',
      jkzt: 3,
      ghsj: 1749016152000,
    },
  ],
})
// 仪器参数
const detailList = reactive([
  {
    title: '仪器参数',
    key: 'yqcs',
    data: [
      {
        label: '当前光谱带宽',
        key: 'dqgpdk',
        value: '11',
      },
      {
        label: '当前波长',
        key: 'dqbc',
        value: '22',
      },
      {
        label: '当前滤色片',
        key: 'dqlsp',
        value: '33',
      },
      {
        label: '1%样品衰减片值',
        key: 'ypsj1',
        value: '123456789',
      },
      {
        label: '10%样品衰减片值',
        key: 'ypsj10',
        value: '123456789',
      },
      {
        label: '1%参比衰减片值',
        key: 'cbsj1',
        value: '123456789',
      },
      {
        label: '10%参比衰减片值',
        key: 'cbsj10',
        value: '123456789',
      },
    ],
  },
  {
    title: '累计工作时间',
    key: 'ljgzsj',
    data: [
      {
        label: '仪器工作时间',
        key: 'yqgzsj',
        value: '123456789',
      },
      {
        label: '钨灯工作时间',
        key: 'wdgzsj',
        value: '123456789',
      },
      {
        label: '氘灯工作时间',
        key: 'cdgzsj',
        value: '123456789',
      },
      {
        label: '仪器本次开机工作时间',
        key: 'yqkjsj',
        value: '123456789',
      },
      {
        label: '钨灯本次开机工作时间',
        key: 'wdkjsj',
        value: '123456789',
      },
      {
        label: '氘灯本次开机工作时间',
        key: 'cdkjsj',
        value: '123456789',
      },
    ],
  },
  {
    title: '当前电流电压信息',
    key: 'dqdldyxx',
    data: [
      {
        label: '电压+5V',
        key: 'dy5',
        value: '11',
      },
      {
        label: '电压+12V',
        key: 'dy12',
        value: '22',
      },
      {
        label: '电压+15V',
        key: 'dy15',
        value: '33',
      },
      {
        label: '电压+24V',
        key: 'dy24',
        value: '123456789',
      },
      {
        label: '电压-5V',
        key: 'dyf5',
        value: '123456789',
      },
      {
        label: '钨灯电压',
        key: 'wddy',
        value: '123456789',
      },
      {
        label: '氘灯电流',
        key: 'cddy',
        value: '123456789',
      },
    ],
  },
])

watch(
  () => deviceStatusStore.deviceSerialNumber,
  () => {
    getInstrumentConfigDetail()
    getAutosamplerDetail()
  },
  {
    deep: true,
    immediate: true,
  },
)

onUnmounted(() => {})
</script>

<style scoped lang="less">
.monitor-box {
  border-radius: 22px;
  background: #f4faff;
  .monitor-title {
    padding: 8px 30px;
    font-size: 18px;
    font-weight: bold;
    color: #153471;
  }
  .monitor-container {
    position: relative;
    padding: 15px 30px;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%; /* 可调整起始位置 */
      transform: translateX(-50%);
      width: 100%; /* 控制边框长度 */
      height: 1px; /* 高度为边框粗细 */
      background-color: #153471;
    }
  }
}

.left-img-monitor {
  .autosampler-img-box {
    width: 300px;
    height: 210px;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 40px;
    background: #ffffff;
    border: 3px solid #5ca669;
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
  .ball-box {
    width: 300px;
    height: 210px;
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 40px;
    background: #ffffff;
    // border: 3px solid #5ca669;
  }
}

.middle-img-monitor {
  padding: 50px 60px;
  width: 500px;
  background: #ffffff;
  border-radius: 40px;
  .title-t800 {
    width: fit-content;
    padding: 5px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 22px;
    border-radius: 8px;
    color: #113371;
    background: #e6e6e6;
  }
  .eight-pool-img-box {
    width: 76px;
    border: 1px solid rgba(187, 187, 187, 0.7);
    padding: 6px 6px 0px;
    position: relative;
    .eight-pool-img-content {
      padding: 16px 8px 11px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border: 1px solid rgba(187, 187, 187, 0.7);
      background: #efefef;
      .eight-pool-img-content-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-top: -5px;
      }
    }
  }
  .light-box {
    margin-left: 25px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(238, 241, 244, 0.5);
    .light-img {
      width: 44px;
      height: auto;
      margin: 0px 13px 2px;
    }
  }
  .monochromator-box {
    width: 112px;
    height: 100px;
    margin: 22px 20px 0px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eef1f4;
  }
  .power-box {
    width: 112px;
    height: 100px;
    margin-top: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eef1f4;
  }
}

.right-img-monitor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .system-box {
    width: 300px;
    height: 140px;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 40px;
    background: #ffffff;
  }
}

.data-item {
  width: 50%;
  .data-item-label {
    width: 200px;
  }
}

.title {
  font-size: 16px;
  font-weight: bold;
}
</style>
