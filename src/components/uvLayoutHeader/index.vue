<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="breadcrumb-box">
    <div class="firstRow">
      <div class="flex gap-2">
        <!--        <div-->
        <!--          v-for="option in quickOptions"-->
        <!--          :key="option.name"-->
        <!--          class="time-option gap-2"-->
        <!--          @click="quickToPage(option.name)"-->
        <!--        >-->
        <!--          <div :style="{ backgroundImage: `url(${option.icon})` }" class="icon-div"></div>-->
        <!--          {{ option.label }}-->
        <!--        </div>-->
      </div>
      <div class="flex items-center">
        <div
          v-for="item in logoList"
          :key="item.value"
          class="logo-icon"
          @click="item.clickFun ? item.clickFun() : () => {}"
        >
          <a-dropdown v-if="item.value === '4'" placement="bottomCenter">
            <div :class="item.className" class="h-[auto]">
              <img
                class="w-[100%] h-[100%]"
                :src="item.iconSrc"
                :alt="item.altLabel"
                :title="item.altLabel"
              />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  v-for="(item, index) in localesArr"
                  :key="`${item.value}${index}`"
                  @click="toggleLocales(item.value)"
                >
                  <div>{{ item.label }}</div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div v-else :class="item.className" class="h-[auto]">
            <img
              class="w-[100%] h-[100%]"
              :src="item.iconSrc"
              :alt="item.altLabel"
              :title="item.altLabel"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="secondRow">
      <div class="flex items-center">
        <div class="home-logo cursor-pointer" @click="handleGoHome">
          <img src="@/assets/images/home_logo.png" alt="首页" />
        </div>
        <div class="breadcrumb-circle">·</div>
        <a-breadcrumb separator=">" class="page-breadcrumb">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.key">
            <span
              class="!cursor-pointer text-[#133379]"
              :class="{ '!font-bold': breadcrumbs.length > 1 && index === 0 }"
              @click="toPage(item, index)"
              >{{ t(item.label) }}</span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="showWord relative">
        <div style="font-weight: bold">
          <span>{{ appStore.nm || '' }}</span>
          <span v-if="appStore.abs" class="!ml-[20px]">{{ appStore.abs }}</span>
          <!-- <DownOutlined
            class="arrow-icon"
            :style="`transform: rotate(${showParams ? '-90' : '90'}deg)`"
            @click="() => (showParams = !showParams)"
          /> -->
        </div>
        <!-- <div class="flex gap-4 flex-nowrap" v-show="showParams">
          <span>光谱带宽:{{ appStore.bandwidth || 0 }}nm</span>
          <span>换灯波长:{{ appStore.changeLampWl || 0 }}nm</span>
          <span>响应时间:{{ appStore.responseTime || 0 }}秒</span>
          <span>当前池号:{{ appStore.poolNumber ? `${appStore.poolNumber}号池` : '-' }}</span>
        </div> -->
      </div>

      <div class="flex items-center gap-5">
        <span>当前连接仪器：{{ deviceStatusStore.deviceName || '-' }}</span>
        <span>{{ deviceStatusStore.deviceModel || '-' }}</span>
        <span>{{ deviceSerialNumber || '-' }}</span>
        <span>
          <span v-if="deviceStatusStore.isActivated == 0">未激活</span>
          <span v-else>已激活</span>
        </span>
        <span>
          <span v-if="isInited == 0">未初始化</span>
          <span v-else-if="isInited == 1">初始化成功</span>
          <span v-else-if="isInited == 2">初始化失败</span>
          <span v-else-if="isInited == 3">初始化进行中</span>
          <span v-else-if="isInited == 4">初始化已停止</span>
        </span>
      </div>

      <!--      <div style="color: red; text-decoration: underline" class="cursor-pointer">-->
      <!--        有未激活设备：1个-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { nextTick, ref, watch } from 'vue'

import historyIcon from '@/assets/images/experiment/history.png'
import methodsIcon from '@/assets/images/experiment/methods.png'
import resultIcon from '@/assets/images/experiment/result.png'
import simpleIcon from '@/assets/images/experiment/simple.png'
import helpManualIcon from '@/assets/images/help_manual_icon.png'
import languageIcon from '@/assets/images/language_icon.png'
import quanIcon from '@/assets/images/welcome/quan.png'
import exitQuanIcon from '@/assets/images/welcome/exitquan.png'
import logoutIcon from '@/assets/images/logout_icon.png'
import messageIcon from '@/assets/images/message_icon.png'
import networkIcon from '@/assets/images/network_icon.png'
import operatingBookIcon from '@/assets/images/operating_book_icon.png'
import settingIcon from '@/assets/images/setting_icon.png'
import userIcon from '@/assets/images/user_icon.png'
import useWebSocket from '@/composables/useWebSocket.ts'
import { useUserStore, useDeviceStatusStore } from '@/stores'
import { availableLocales, loadLanguageAsync } from '@/utils/vue-i8n.ts'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen(document.body)
type BreadCrumbsType = {
  label: string
  key: string
}
const handleFullscreen = () => {
  toggle()
}

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const { logout } = useUserStore()

const breadcrumbs = ref<BreadCrumbsType[]>([])
const showParams = ref(false)
// 全屏状态
const logoList = computed(() => [
  {
    value: '0',
    iconSrc: userIcon,
    altLabel: '当前登录人',
    className: 'w-[20px]',
    clickFun: () => quickToPage('userManageHome'),
  },
  {
    value: '1',
    iconSrc: networkIcon,
    altLabel: '网络',
    className: 'w-[27px]',
  },
  {
    value: '2',
    iconSrc: helpManualIcon,
    altLabel: '帮助手册',
    className: 'w-[22px]',
  },
  {
    value: '3',
    iconSrc: operatingBookIcon,
    altLabel: '操作说明书',
    className: 'w-[24px]',
    clickFun: () => toCatOpeationBook(),
  },
  {
    value: '4',
    iconSrc: languageIcon,
    altLabel: '语言切换',
    className: 'w-[26px]',
  },
  {
    value: '8',
    iconSrc: isFullscreen.value ? exitQuanIcon : quanIcon,
    altLabel: isFullscreen.value ? '退出全屏' : '全屏',
    className: 'w-[22px]',
    clickFun: () => handleFullscreen(),
  },
  {
    value: '5',
    iconSrc: messageIcon,
    altLabel: '消息',
    className: 'w-[28px]',
    clickFun: () => quickToPage('noticeManageHome'),
  },
  {
    value: '6',
    iconSrc: settingIcon,
    altLabel: '设置',
    className: 'w-[24px]',
    clickFun: () => quickToPage('systemManageHome'),
  },
  {
    value: '7',
    iconSrc: logoutIcon,
    altLabel: '退出登录',
    className: 'w-[20px]',
    clickFun: () => handleLogout(),
  },
])

const localesArr = computed(() => {
  const map = {
    en: 'English',
    'zh-CN': '中文简体',
  }
  const arr = availableLocales.map((item) => {
    return {
      value: item,
      label: map[item as keyof typeof map],
    }
  })
  return arr
})
const quickOptions = ref([
  {
    label: '方法管理',
    name: 'methodManagement',
    icon: methodsIcon,
    bgColor: '#E1ECFF',
    iconBgColor: '#CDD7F9',
  },
  {
    label: '经典模式',
    name: 'methodOptimizationHome',
    icon: simpleIcon,
    bgColor: '#EBD8FB',
    iconBgColor: '#DAADFF',
  },
  {
    label: '历史数据',
    name: 'taskManagement',
    icon: resultIcon,
    bgColor: '#DEFFD1',
    iconBgColor: '#B9FC9F',
  },
  {
    label: '向导模式',
    name: 'quantityDetermind',
    icon: historyIcon,
    bgColor: '#FFE6B0',
    iconBgColor: '#F5C55C',
  },
])
watch(
  route,
  (newRoute: any, oldRoute) => {
    nextTick(() => {
      breadcrumbs.value = getBreadcrumbsList(newRoute.matched)
    })
  },
  { immediate: true },
)

const toCatOpeationBook = () => {
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = '/preview.pdf'
  tempLink.setAttribute('target', '_blank')
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
}
const handleGoHome = () => {
  router.push({ path: '/welcome' })
}
const toPage = (item: { key: string }, index: number) => {
  if (index === breadcrumbs.value.length - 1) return
  if ((appStore.deviceMeasureMode === 2 && appStore.measureMode === '1') || appStore.zeroLoading) {
    const routeUrl = router.resolve({
      path: item.key,
    })
    window.open(routeUrl.href, '_blank')
  } else {
    router.push({ path: item.key })
  }
}
const quickToPage = (nameRoute: string) => {
  router.push({ name: nameRoute })
}
// 消息 登出 等图标
const handleLogout = async () => {
  Modal.confirm({
    title: '提示',
    content: '是否确认退出登录？',
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      await logout()
      router.replace(`/login`)
    },
    onCancel() {},
  })
}

async function toggleLocales(newLocale: any) {
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

const getBreadcrumbsList = (matched: any) => {
  return matched
    .filter((item: any) => item.path !== '/')
    .map((item: any) => {
      return {
        label: item.meta.title,
        key: item.path,
      }
    })
}

const deviceStatusStore = useDeviceStatusStore()
// 仪器状态
const deviceSerialNumber = computed(() => deviceStatusStore.deviceSerialNumber)
const isInited: any = computed(() => deviceStatusStore.isInited)
// const isShowDevice = ref(false) // 只有经典模式显示
// watch(
//   () => route.path,
//   () => {
//     isShowDevice.value = ['/experiment/methodOptimizationHome'].includes(route.path)
//   },
//   { deep: true, immediate: true },
// )

onMounted(() => {})
onUnmounted(() => {})
</script>
<style scoped lang="less">
:deep(.page-breadcrumb) {
  margin-left: 5px;
  font-size: 16px;
}

.breadcrumb-box {
  .home-logo {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    position: relative;
    top: 2px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .breadcrumb-circle {
    font-size: 20px;
    font-weight: bold;
    color: #133379;
  }

  .showWord {
    display: flex;
    font-size: 20px;
    margin: auto;
    // transform: translateX(-50%);

    > :first-child {
      font-size: 20px;
      color: #5ca669;
      display: flex;

      > span {
        font-weight: bold;
      }

      .arrow-icon {
        transition: all ease 0.3s;
        margin-left: 5px;
        font-weight: bold !important;
        font-size: 15px;
        transform: rotate(-90deg);
        cursor: pointer;
      }
    }

    // > :last-child {
    //   position: absolute;
    //   left: 102%;
    //   top: 10%;
    //   display: flex;
    //   color: #5f84d3;
    //   font-size: 15px;
    //   white-space: nowrap;

    //   > span {
    //     font-weight: bold;
    //   }
    // }
  }

  .logo-icon {
    margin-left: 15px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .time-option {
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 2px 3px 1px rgba(91, 91, 91, 0.3);
    border-radius: 5px;
    z-index: 2;
    padding: 5px 12px;
    display: flex;
    align-items: center;
    color: #113371;
    font-size: 18px;
    background-color: #fafbff;

    .icon-div {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-size: auto 85%;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

  .firstRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 50px;
    background-image: url('@/assets/images/layout_header.png');
    background-size: 100% 100%;
  }

  .secondRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 50px 5px;
    background-color: #f2f0f0;
  }
}
</style>
