<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="min-h-screen flex flex-col main-login relative">
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 object-cover w-full h-full z-[-1]"
      src="@/assets/images/loginVideoBg.mp4"
    ></video>

    <!-- 顶部 Logo -->
    <div class="text-left top-logo">
      <img src="@/assets/images/logo1.png" alt="Logo" />
    </div>
    <div class="container">
      <!-- 走马灯 -->
      <div class="carousel-container">
        <a-carousel autoplay arrows>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div v-for="item in carouselImg" :key="item.id">
            <img :src="item.imgUrl" alt="图片" />
            <div class="carousel-container-title">·{{ item.title }}</div>
            <div class="carousel-container-border"></div>
            <div class="carousel-container-desc">{{ item.desc }}</div>
          </div>
        </a-carousel>
      </div>
      <!-- 账号密码 -->
      <div class="form-container">
        <div class="language-box">
          <span class="text-[#999]">系统语言：</span>
          <a-select
            ref="select"
            v-model:value="loginForm.language"
            class="!w-[80px]"
            :options="languageOptions"
            placeholder="请选择"
          ></a-select>
        </div>
        <div class="!mt-[60px] text-[25px] !font-bold text-[#333]">欢迎登录</div>
        <div class="flex !mt-[30px] text-[18px] text-[#333]">
          <div class="cursor-pointer" @click="handleTab(0)">
            <span
              class="!font-bold !mr-[40px]"
              :style="{ color: activeKey === 0 ? '#333' : '#A1A1A1' }"
              >密码登录</span
            >
            <div
              v-if="activeKey === 0"
              class="!mb-8 horizontal-border"
              :style="{ backgroundColor: primaryColor }"
            ></div>
          </div>
          <div v-if="switchDetail.quickLoginSwitch" class="cursor-pointer" @click="handleTab(1)">
            <span class="!font-bold" :style="{ color: activeKey === 1 ? '#333' : '#A1A1A1' }"
              >快捷登录</span
            >
            <div
              v-if="activeKey === 1"
              class="!mb-8 horizontal-border"
              :style="{ backgroundColor: primaryColor }"
            ></div>
          </div>
        </div>
        <a-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          :hideRequiredMark="true"
          class="!mt-[5px]"
        >
          <a-form-item name="userName" class="form-item-box">
            <template #label>
              <user-outlined :style="{ color: primaryColor, fontSize: '18px' }" />
              <div class="vertical-border" :style="{ backgroundColor: primaryColor }"></div>
            </template>
            <a-input
              v-model:value="loginForm.userName"
              :bordered="false"
              placeholder="请输入"
              autocomplete="off"
              :disabled="activeKey === 0 ? false : true"
            >
            </a-input>
          </a-form-item>
          <a-form-item name="password" class="form-item-box">
            <template #label>
              <lock-outlined :style="{ color: primaryColor, fontSize: '18px' }" />
              <div class="vertical-border" :style="{ backgroundColor: primaryColor }"></div>
            </template>
            <a-input
              v-model:value="loginForm.password"
              :bordered="false"
              type="password"
              placeholder="请输入"
              autocomplete="new-password"
              :disabled="activeKey === 0 ? false : true"
            >
            </a-input>
          </a-form-item>
          <div class="!mb-[20px]">
            <a-button
              type="primary"
              :style="{ backgroundColor: `${primaryColor} !important`, color: '#fff  !important' }"
              html-type="submit"
              @click="handleLogin"
              >登 录
            </a-button>
          </div>
          <div class="flex items-center justify-between">
            <a-checkbox v-model:checked="loginForm.isOnlyData">
              <text class="text-[#999] text-[13px]">自动开机</text>
            </a-checkbox>
            <a-checkbox v-model:checked="loginForm.simpleMode">
              <text class="text-[#999] text-[13px]">自动进入实验测试</text>
            </a-checkbox>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LeftCircleOutlined,
  LockOutlined,
  RightCircleOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import type { UnwrapRef } from 'vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginForm } from '@/api/user/types'
import { useAppStore } from '@/stores'
import { useUserStore } from '@/stores/modules/user'
import { notification } from 'ant-design-vue'
import {
  manageLoginSwitch,
  queryDefaultMeasureSwitch,
  queryLanguage,
  queryLoginSwitch,
} from '@/api'

const { primaryColor } = useAppStore()
const router = useRouter()
const userStore = useUserStore()
// 幻灯片图片（替换为你的实际图片路径）
const carouselImg = ref([
  {
    id: '1',
    imgUrl: new URL('@/assets/images/instrument/t700.jpg', import.meta.url).href,
    title: 'T600/T700',
    desc: '普析秉承“为了分析测试工作的高效、便捷、准确、可靠“的宗旨，隆重推出T600/T700系列紫外可见分光光度计。我们潜心研发，提高产品性能；加快扫描速度，减少客户等待时间；提升指标参数，减少系统误差。',
  },
  {
    id: '2',
    imgUrl: new URL('@/assets/images/instrument/t700.jpg', import.meta.url).href,
    title: 'T600/T700',
    desc: '普析秉承“为了分析测试工作的高效、便捷、准确、可靠“的宗旨，隆重推出T600/T700系列紫外可见分光光度计。我们潜心研发，提高产品性能；加快扫描速度，减少客户等待时间；提升指标参数，减少系统误差。',
  },
])

const activeKey = ref(0)
watch(
  () => activeKey.value,
  async (newValue) => {
    await loginFormRef.value.resetFields()
    if (newValue === 1) {
      loginForm.userName = '以默认账号登录'
      loginForm.password = '123456'
    } else {
      loginForm.userName = ''
      loginForm.password = ''
    }
  },
)
const handleTab = async (type: number) => {
  activeKey.value = type
}

// 账号密码
const loginForm: UnwrapRef<LoginForm> = reactive({
  userName: '',
  password: '',
  isOnlyData: false,
  isFastLogin: 0,
  simpleMode: false,
  language: '简体中文',
})
const loginFormRules = reactive<any>({
  userName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
})

const languageOptions = [
  {
    value: '简体中文',
    label: '中文',
  },
]
watch(
  () => loginForm.language,
  (newValue) => {
    if (newValue) {
      carouselImg.value.forEach((item) => {
        if (newValue === 'English')
          item.desc =
            'Puxi adheres to the principle of "efficient, convenient, accurate, and reliable analysis and testing work", and solemnly launches the T600/T700 series UV visible spectrophotometer. We devote ourselves to research and development to improve product performance; Accelerate scanning speed and reduce customer waiting time; Improve indicator parameters and reduce system errors.'
        else
          item.desc =
            '普析秉承“为了分析测试工作的高效、便捷、准确、可靠“的宗旨，隆重推出T600/T700系列紫外可见分光光度计。我们潜心研发，提高产品性能；加快扫描速度，减少客户等待时间；提升指标参数，减少系统误差。'
      })
    }
  },
)

// 登录逻辑
const loginFormRef = ref()
const handleLogin = async () => {
  loginFormRef.value
    .validate()
    .then(async () => {
      const query = {
        ...loginForm,
        userName: activeKey.value === 0 ? loginForm.userName : '',
        password: activeKey.value === 0 ? loginForm.password : '',
        isFastLogin: activeKey.value,
        isOnlyData: loginForm.isOnlyData ? 1 : 0,
        simpleMode: loginForm.simpleMode ? 1 : 0,
      }
      const { code } = await userStore.login(query)
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: '欢迎登录！',
          duration: 3,
        })
        handleManageLoginSwitch() //配置开关
        handleTo() // 跳转
      }
    })
    .catch(() => {})
}

//配置开关
const handleManageLoginSwitch = async () => {
  await manageLoginSwitch({
    defaultQuickLogin: activeKey.value === 1,
    isAutoBoot: loginForm.isOnlyData,
    isAutoEnterExperiment: loginForm.simpleMode,
  })
}

// 跳转
const handleTo = async () => {
  const { code, data } = await queryDefaultMeasureSwitch()
  if (code === 200) {
    if (loginForm.isOnlyData && loginForm.simpleMode) {
      // 勾选自动开机和实验测试
      router.push(
        `/instrument/instrumentHome?isOnlyData=${loginForm.isOnlyData}&simpleMode=${loginForm.simpleMode}&classicSwitch=${data}`,
      )
    } else if (!loginForm.isOnlyData && loginForm.simpleMode) {
      // 只勾选实验测试
      if (data)
        // 是否开启了实验测试默认进入经典模式
        router.push(`/experiment/methodOptimizationHome`) // 经典模式
      else router.push(`/experiment/wizardMode/quantityDetermind`) // 向导模式
    } else if (loginForm.isOnlyData && !loginForm.simpleMode) {
      // 只勾选自动开机
      router.push(`/instrument/instrumentHome?isOnlyData=${loginForm.isOnlyData}`)
    } else router.push(`/welcome`)
  }
}

const switchDetail = ref({
  quickLoginSwitch: false, // 启用快捷登录
  defaultQuickLogin: false, //默认选中快捷登录，true-选中
})
const queryLoginSwitchFun = async () => {
  const { code, data } = await queryLoginSwitch()
  if (code === 200) {
    switchDetail.value = data
    loginForm.isOnlyData = data.isAutoBoot
    loginForm.simpleMode = data.isAutoEnterExperiment
    if (data.quickLoginSwitch && data.defaultQuickLogin) activeKey.value = 1
  }
}

const queryLanguageFun = async () => {
  const { code, data } = await queryLanguage()
  if (code === 200) {
    loginForm.language = data
  }
}

onMounted(() => {
  queryLoginSwitchFun()
  queryLanguageFun()
})
</script>

<style lang="less" scoped>
.main-login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // 确保视频填充整个容器而不变形
    z-index: -1; // 放置于底层
  }
  .top-logo {
    position: absolute;
    top: 50px;
    left: 80px;
    width: 180px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  .horizontal-border {
    height: 1.5px;
    width: 72px;
  }

  .carousel-container {
    width: 40%;

    .carousel-container-title {
      font-size: 20px;
      font-weight: bold;
      padding: 15px 20px 6px;
    }

    .carousel-container-border {
      height: 0.5px;
      background: #f8f8f8;
      margin: 0px 20px;
    }

    .carousel-container-desc {
      font-size: 15px;
      line-height: 30px;
      padding: 10px 20px 15px;
    }
  }

  .form-container {
    box-sizing: border-box;
    padding: 30px 100px 70px;
    width: 490px;
    height: 500px;
    background-color: #fff;
    position: relative;

    .language-box {
      font-size: 14px;
      position: absolute;
      top: 25px;
      right: 45px;
    }

    .vertical-border {
      width: 1px;
      height: 18px;
      margin: 0 4px 0px 12px;
    }

    .form-item-box {
      border-radius: 15px;
      border: 1px solid #a1a1a1;
      padding: 3px 10px;
      position: relative;
      margin-bottom: 20px;
    }
  }
}

:deep(.ant-form-item-with-help .ant-form-item-explain) {
  position: absolute;
  left: 0px;
  margin-top: 3px;
  font-size: 12px;
}

:deep(.ant-col) {
  position: static;
}

:deep(.ant-btn) {
  width: 100%;
}

:deep(.slick-slide) {
  // text-align: center;
  height: 500px;
  background: #364d79;
  color: #fff;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  // background-color: #0038a8;
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}

:deep(.ant-form-item-label > label::after) {
  display: none;
}
</style>
