<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="page-container">
    <a-layout>
      <a-layout-header class="flex items-center justify-between header-box">
        <div class="logo-img">
          <img src="@/assets/images/welcome/persee_logo.png" alt="logo" />
        </div>
        <div class="flex items-center menu-box">
          <div
            v-for="item in menuList"
            :key="item.key"
            class="menu-item cursor-pointer"
            :class="{ 'menu-item-selected': item.isSelected }"
            @click="handleSelected(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="!mt-[20px] content-box">
        <div class="center-img">
          <img src="@/assets/images/welcome/center_bg.png" alt="logo" />
        </div>
        <div class="flex justify-between !pl-[130px] !pr-[30px]">
          <div class="content-left-box">
            <div class="tag">紫外可见分光光度计控制平台</div>
            <div class="!mt-[30px] text-[52px] !font-[400px]">UV iNexus</div>
            <!-- <div class="!mt-[-10px] text-[52px] !font-[400px]">紫外可见分光光度计控制平台</div> -->
            <div class="button cursor-pointer" @click="handleClick('/instrument/instrumentHome')">
              立即体验<ArrowRightOutlined class="!ml-[10px] text-[18px] text-[#fff]" />
            </div>
          </div>
          <div class="content-right-box">
            <div class="flex flex-col items-end justify-center !flex-wrap h-[100%]">
              <div
                v-for="item in resultPermMenuList"
                :key="item.label"
                :class="item.class"
                v-html="item.htmlContent(item)"
                @click="handleClick(item.path)"
              ></div>
            </div>

            <!-- <div class="flex flex-col items-end">
              <div class="unboxing-box">
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="!mr-[20px] text-[#363636] text-[23px] !font-bold">开箱检验</div>
                </div>
                <div class="logo-img">
                  <img :src="unboxing_logo" alt="logo" />
                </div>
              </div>
              <div class="delivery-inspection-box">
                <div class="logo-img">
                  <img src="@/assets/images/welcome/delivery_inspection_logo.png" alt="logo" />
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">出厂检验</div>
              </div>
              <div class="instrument-manage-box" @click="handleClick('/instrument/instrumentHome')">
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">仪器管理</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/instrument_manage_logo.png" alt="logo" />
                  </div>
                </div>
              </div>
              <div
                class="experimental-testing-box"
                @click="handleClick('/experiment/experimentTest')"
              >
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">实验测试</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/experimental_testing_logo.png" alt="logo" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <div class="report-design-box" @click="handleClick('/reportDesign/reportDesignHome')">
                <div
                  class="w-[56px] h-[56px] bg-[#ED7246] rounded-[50%] flex items-center justify-center"
                >
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/report_design_logo.png" alt="logo" />
                  </div>
                </div>
                <div class="!ml-[20px]">
                  <div class="text-[#363636] text-[26px] !font-bold">报告设计</div>
                  <div class="text-[15px] text-[#3AC15A]">⬆生成专属报告样式</div>
                </div>
              </div>
              <div class="system-manage-box" @click="handleClick('/systemManage/systemManageHome')">
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">系统管理</div>
                </div>
                <div class="flex items-center justify-end">
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/system_manage_logo.png" alt="logo" />
                  </div>
                </div>
              </div>
              <div
                class="standard-manage-box"
                @click="handleClick('/standardManage/standardManageHome')"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-[#FDFDFD] text-[23px] !font-bold">标准管理</div>
                    <div class="text-[#FDFDFD] text-[18px] !font-bold">xxxxxxxxxxxxx</div>
                  </div>
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/standard_manage_logo.png" alt="logo" />
                  </div>
                </div>
                <div class="button">立即体验</div>
              </div>
              <div class="repair-manage-box">
                <div class="logo-img">
                  <img src="@/assets/images/welcome/repair_manage_logo.png" alt="logo" />
                </div>
                <div class="!ml-[20px] text-[#363636] text-[23px] !font-bold">便捷维修</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="user-manage-box">
                <div
                  class="w-[52px] h-[52px] bg-[#62A553] rounded-[50%] flex items-center justify-center"
                  @click="handleClick('/userManage/userManageHome')"
                >
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/user_manage_logo.png" alt="logo" />
                  </div>
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">用户管理</div>
              </div>
              <div class="debug-tool-box">
                <div>
                  <div class="flex items-center">
                    <div class="circle-box"></div>
                    <div class="text-[#363636] text-[23px] !font-bold">调试</div>
                  </div>
                  <div class="!ml-[30px] text-[#363636] text-[23px] !font-bold">工具</div>
                </div>
                <div class="logo-img">
                  <img src="@/assets/images/welcome/debug_tool_logo.png" alt="logo" />
                </div>
              </div>
              <div class="software-concept-box">
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">检定校准</div>
                </div>
              </div>
              <div class="message-manage-box">
                <div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">通知管理</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="@/assets/images/welcome/message_manage_logo.png" alt="logo" />
                  </div>
                </div>
              </div>
              <div class="design-mode-box">
                <div class="logo-img">
                  <img src="@/assets/images/welcome/design_mode_logo.png" alt="logo" />
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">设计模式</div>
              </div>
            </div> -->
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <div class="bottom-img">
      <img src="@/assets/images/welcome/bottom_logo.png" alt="logo" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getRolePath } from '@/api'
import debug_tool_logo from '@/assets/images/welcome/debug_tool_logo.png'
import delivery_inspection_logo from '@/assets/images/welcome/delivery_inspection_logo.png'
import design_mode_logo from '@/assets/images/welcome/design_mode_logo.png'
import experimental_testing_logo from '@/assets/images/welcome/experimental_testing_logo.png'
import instrument_manage_logo from '@/assets/images/welcome/instrument_manage_logo.png'
import message_manage_logo from '@/assets/images/welcome/message_manage_logo.png'
import repair_manage_logo from '@/assets/images/welcome/repair_manage_logo.png'
import report_design_logo from '@/assets/images/welcome/report_design_logo.png'
import standard_manage_logo from '@/assets/images/welcome/standard_manage_logo.png'
import system_manage_logo from '@/assets/images/welcome/system_manage_logo.png'
import unboxing_logo from '@/assets/images/welcome/unboxing_logo.png'
import user_manage_logo from '@/assets/images/welcome/user_manage_logo.png'
import { useUserStore } from '@/stores'

const router = useRouter()

const menuList = ref([
  {
    key: 'service',
    label: '服务',
    path: '/service',
    isSelected: false,
  },
  {
    key: 'about',
    label: '关于我们',
    path: '/about',
    isSelected: false,
  },
  {
    key: 'productCenter',
    label: '产品中心',
    path: '/productCenter',
    isSelected: false,
  },
  {
    key: 'functionIntroduction',
    label: '功能介绍',
    path: '/functionIntroduction',
    isSelected: false,
  },
  {
    key: 'instructions',
    label: '使用说明',
    path: '/instructions',
    isSelected: false,
  },
  {
    key: 'contact',
    label: '联系我们',
    path: '/contact',
    isSelected: true,
  },
])
const handleSelected = (item: any) => {
  menuList.value.forEach((menuItem: any) => {
    menuItem.isSelected = false
    if (menuItem.key === item.key) {
      menuItem.isSelected = true
    }
  })
}

// 角色权限菜单
const allPermMenuList = [
  {
    label: '开箱检验',
    permission: 'unboxingInspection',
    iconPath: unboxing_logo,
    class: 'unboxing-box',
    path: '/unboxingInspection/unboxingInspectionHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="!mr-[20px] text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>
                <div class="logo-img w-[50px] h-[50px]">
                  <img src="${item.iconPath}" alt="logo" />
                </div>`
    },
  },
  {
    label: '出厂检验',
    permission: 'factoryInspection',
    iconPath: delivery_inspection_logo,
    class: 'delivery-inspection-box',
    path: '/factoryInspection/factoryInspectionHome',
    htmlContent: (item: any) => {
      return `<div class="logo-img">
                  <img src="${item.iconPath}" alt="logo" />
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>`
    },
  },
  {
    label: '仪器管理',
    permission: 'instrument',
    iconPath: instrument_manage_logo,
    class: 'instrument-manage-box',
    path: '/instrument/instrumentHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>`
    },
  },
  {
    label: '实验测试',
    permission: 'methodOptimizationHome',
    iconPath: experimental_testing_logo,
    class: 'experimental-testing-box',
    // path: '/experiment/experimentTest',
    path: '/experiment/methodOptimizationHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>`
    },
  },
  {
    label: '报告设计',
    permission: 'reportDesign',
    iconPath: report_design_logo,
    class: 'report-design-box',
    path: '/reportDesign/reportDesignHome',
    htmlContent: (item: any) => {
      return `<div
                  class="w-[56px] h-[56px] bg-[#ED7246] rounded-[50%] flex items-center justify-center"
                >
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>
                <div class="!ml-[20px]">
                  <div class="text-[#363636] text-[26px] !font-bold">${item.label}</div>
                  <div class="text-[15px] text-[#3AC15A]">⬆生成专属报告样式</div>
                </div>`
    },
  },
  {
    label: '系统管理',
    permission: 'systemManage',
    iconPath: system_manage_logo,
    class: 'system-manage-box',
    path: '/systemManage/systemManageHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>
                <div class="flex items-center justify-end">
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>`
    },
  },
  {
    label: '标准管理',
    permission: 'standardManage',
    iconPath: standard_manage_logo,
    class: 'standard-manage-box',
    path: '/standardManage/standardManageHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center justify-between">
                  <div>
                    <div class="text-[#FDFDFD] text-[23px] !font-bold">${item.label}</div>
                    <div class="text-[#FDFDFD] text-[18px] !font-bold">xxxxxxxxxxxxx</div>
                  </div>
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>
                <div class="button">立即体验</div>`
    },
  },
  {
    label: '便捷维修',
    permission: 'convenientRepair',
    iconPath: repair_manage_logo,
    class: 'repair-manage-box',
    path: '/convenientRepair/convenientRepairHome',
    htmlContent: (item: any) => {
      return `<div class="logo-img">
                  <img src="${item.iconPath}" alt="logo" />
                </div>
                <div class="!ml-[20px] text-[#363636] text-[23px] !font-bold">${item.label}</div>`
    },
  },
  {
    label: '用户管理',
    permission: 'userManage',
    iconPath: user_manage_logo,
    class: 'user-manage-box',
    path: '/userManage/userManageHome',
    htmlContent: (item: any) => {
      return `<div
                  class="w-[52px] h-[52px] bg-[#62A553] rounded-[50%] flex items-center justify-center"
                  @click="handleClick('/userManage/userManageHome')"
                >
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>`
    },
  },
  {
    label: '调试工具',
    permission: 'debugTool',
    iconPath: debug_tool_logo,
    class: 'debug-tool-box',
    path: '/debugTool/debugToolHome',
    htmlContent: (item: any) => {
      return `<div>
                  <div class="flex items-center">
                    <div class="circle-box"></div>
                    <div class="text-[#363636] text-[23px] !font-bold">${item.label.slice(0, 2)}</div>
                  </div>
                  <div class="!ml-[30px] text-[#363636] text-[23px] !font-bold">${item.label.slice(2, 4)}</div>
                </div>
                <div class="logo-img">
                  <img src="${item.iconPath}" alt="logo" />
                </div>`
    },
  },
  {
    label: '检定校准',
    permission: 'verificationCalibration',
    iconPath: '',
    class: 'software-concept-box',
    path: '/verificationCalibration/verificationCalibrationHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>`
    },
  },
  {
    label: '通知管理',
    permission: 'noticeManage',
    iconPath: message_manage_logo,
    class: 'message-manage-box',
    path: '/noticeManage/noticeManageHome',
    htmlContent: (item: any) => {
      return `<div class="flex items-center">
                  <div class="circle-box"></div>
                  <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>
                </div>
                <div class="flex items-center justify-center">
                  <div class="logo-img">
                    <img src="${item.iconPath}" alt="logo" />
                  </div>
                </div>`
    },
  },
  {
    label: '设计模式',
    permission: 'designPattern',
    iconPath: design_mode_logo,
    class: 'design-mode-box',
    path: '/designPattern/designPatternHome',
    htmlContent: (item: any) => {
      return `<div class="logo-img">
                  <img src="${item.iconPath}" alt="logo" />
                </div>
                <div class="circle-box"></div>
                <div class="text-[#363636] text-[23px] !font-bold">${item.label}</div>`
    },
  },
]
const resultPermMenuList = ref<any>([])
const userStore = useUserStore()
const getRolePerm = async () => {
  const { code, data } = await getRolePath({
    userId: userStore.systemIdentityId,
  })
  if (code === 200) {
    resultPermMenuList.value = allPermMenuList.filter((item) => data.includes(item.permission))
    console.log('resultPermMenuList', resultPermMenuList.value)
  }
}
const handleClick = (path: string) => {
  if (path === '/instrument/instrumentHome') router.push(`${path}`)
  else router.push(path)
}

onMounted(() => {
  const route = useRoute()
  getRolePerm()
})
</script>

<style lang="less" scoped>
.page-container {
  position: relative;
  padding: 15px;
  background-color: #fff;
  .bottom-img {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 502px;
    height: 390px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.header-box {
  height: 98px;
  padding: 0px 130px;
  border-radius: 25px;
  background-color: #133379;
  .logo-img {
    width: 130px;
    height: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .menu-box {
    font-size: 18px;
    color: #fdfdfd;
    .menu-item {
      width: 140px;
      text-align: center;
    }
    .menu-item-selected {
      border-radius: 34px;
      background: #1369e3;
    }
  }
}

.content-box {
  position: relative;
  height: calc(100vh - 98px - 50px);
  border-radius: 25px;
  background: #eaeaea;
  .center-img {
    position: absolute;
    left: calc(50% - 940px / 2);
    top: calc(50% - 514px / 2);
    width: 940px;
    height: 514px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-left-box {
    margin-top: 20px;
    height: calc(100vh - 98px - 20px - 390px) !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 99;
    .tag {
      padding: 10px 30px;
      background: #ccddf5;
      border-radius: 23px;
      font-weight: bold;
      font-size: 15px;
      color: #1369e3;
      line-height: 22px;
    }
    .button {
      margin-top: 40px;
      padding: 12px 40px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      background: #1369e3;
      border-radius: 31px;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  .content-right-box {
    height: calc(100vh - 98px - 50px);
    display: flex;
    align-items: center;
    z-index: 99;
    .unboxing-box {
      width: 270x;
      height: 100px;
      margin-right: 15px;
      padding: 0px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .delivery-inspection-box {
      width: 270px;
      height: 80px;
      margin-right: 40px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .instrument-manage-box {
      width: 250px;
      height: 210px;
      margin-right: 20px;
      margin-top: 15px;
      padding: 25px 25px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 98px;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .experimental-testing-box {
      width: 300px;
      height: 200px;
      margin-top: 15px;
      margin-right: 10px;
      padding: 25px 25px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 180px;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .report-design-box {
      width: 290px;
      height: 120px;
      margin-top: 10px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 38px;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .system-manage-box {
      width: 250px;
      height: 160px;
      margin-right: 20px;
      margin-top: 20px;
      padding: 25px 40px 20px 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 65px;
        height: 65px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .standard-manage-box {
      margin-top: 20px;
      width: 250px;
      height: 170px;
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      background: #1369e3;
      box-shadow: 0px 27px 56px 0px rgba(225, 235, 250, 0.24);
      border-radius: 29px;
      padding: 25px 30px 30px;
      ::v-deep .logo-img {
        width: 46px;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ::v-deep .button {
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: #fdfdfd;
        border-radius: 9px;
        font-size: 16px;
        color: #1369e3;
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .repair-manage-box {
      width: 229px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 10px;
      margin-right: 10px;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .user-manage-box {
      width: 229px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 10px;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 26px;
        height: 27px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .debug-tool-box {
      width: 215px;
      height: 120px;
      margin-top: 20px;
      margin-left: 10px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .software-concept-box {
      width: 200px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 20px;
      margin-right: 30px;
      background: #ffffff;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      &:hover {
        transform: scale(1.05);
      }
    }
    .message-manage-box {
      width: 180px;
      height: 160px;
      margin-right: 10px;
      margin-top: 15px;
      padding: 25px 25px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    .design-mode-box {
      width: 240px;
      height: 80px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: -14px 27px 81px 0px rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      background: #ffffff;
      ::v-deep .logo-img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    ::v-deep .circle-box {
      width: 7px;
      height: 7px;
      margin: 0px 12px;
      border-radius: 50%;
      background-color: #363636;
    }
  }
}

:deep(.ant-layout) {
  background: #fff;
}
</style>
