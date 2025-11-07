<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    :width="sidebarWidth"
    :collapsedWidth="collapsedWidth"
    :theme="theme"
    class="fixed left-0 bottom-0 z-50 overflow-auto shadow-lg"
    breakpoint="lg"
    @breakpoint="onBreakpoint"
  >
    <div class="h-full flex flex-col">
      <!-- 公司logo -->
      <div class="logo-box" v-if="!collapsed">
        <div class="logo-img">
          <img src="@/assets/images/logo3.png" alt="logo" />
        </div>
        <div class="logo-text">UV iNexus</div>
      </div>
      <div class="collapsed-logo" v-else>
        <img src="@/assets/images/logo4.png" alt="logo" />
        <!-- <div class="logo-text">UV</div> -->
        <div class="logo-text">UV iNexus</div>
      </div>
      <!-- 菜单部分 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
        @select="onSelect"
        class="page-menu flex-1"
      >
        <template v-for="item in menuOptions" :key="item.key">
          <!-- 有子菜单的情况 -->
          <a-sub-menu
            v-if="item.children"
            :key="item.key"
            @titleClick="handleTitleClick($event, item.key)"
          >
            <template #icon>
              <!-- <div :class="getIconComponentNew(item)?.className">
                <img :src="getIconComponentNew(item)?.url" class="w-[100%] h-[100%]" />
              </div> -->
              <component
                @click.stop="clickHasChild($event, item.key)"
                :is="getIconComponent(item.icon)"
                class="text-base mr-2.5"
              />
            </template>
            <template #title>
              <span class="!ml-[6px]" @click.stop="clickHasChild($event, item.key)">
                {{ t(item.label) }}
              </span>
            </template>

            <!-- 二级菜单 -->
            <template v-for="child in item.children" :key="child.key">
              <!-- 二级菜单有子菜单 -->
              <a-sub-menu
                v-if="child.children && !child.hidden"
                :key="child.key"
                @titleClick="handleTitleClick($event, child.key)"
              >
                <template #icon>
                  <component
                    :is="getIconComponent(child.icon)"
                    class="text-base mr-2.5"
                    @click.stop="clickHasChild($event, item.key)"
                  />
                </template>
                <template #title>
                  <span class="!ml-[6px]" @click.stop="clickHasChild($event, child.key)">{{
                    t(child.label)
                  }}</span>
                </template>

                <!-- 三级菜单项 -->
                <a-menu-item v-for="subChild in child.children" :key="subChild.key">
                  <template #icon>
                    <component :is="getIconComponent(subChild.icon)" class="text-base mr-2.5" />
                  </template>
                  <span class="!ml-[6px]">{{ t(subChild.label) }}</span>
                </a-menu-item>
              </a-sub-menu>

              <!-- 二级菜单项 -->
              <a-menu-item v-else-if="!child.hidden" :key="child.key">
                <template #icon>
                  <component :is="getIconComponent(child.icon)" class="text-base mr-2.5" />
                </template>
                <span class="!ml-[6px]">{{ t(child.label) }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>

          <!-- 无子菜单的菜单项 -->
          <a-menu-item v-else :key="item.key">
            <template #icon>
              <!-- <div :class="getIconComponentNew(item)?.className">
                <img :src="getIconComponentNew(item)?.url" class="w-[100%] h-[100%] !mr-2.5" />
              </div> -->
              <component :is="getIconComponent(item.icon)" class="text-base mr-2.5" />
            </template>
            <span class="!ml-[6px]">{{ t(item.label) }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
    <!-- 当前登录用户 -->
    <!-- <div class="user-box">
      <div class="user-img-box"></div>
      <div class="user-text" :style="{ fontSize: collapsed ? '15px' : '22px' }">
        {{ userStore?.userName }}
      </div>
    </div> -->
    <!-- 底部折叠按钮 -->
    <!-- <div
      class="flex items-center justify-center h-12 cursor-pointer transition-all absolute bottom-0 w-full border-t"
      :class="{
        'border-white/10': theme === 'dark',
        'border-gray-200': theme === 'light',
      }"
      @click="toggleCollapse"
    >
      <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
    </div> -->
  </a-layout-sider>
</template>

<script lang="ts">
import {
  DashboardOutlined,
  FileOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import type { MenuTheme } from 'ant-design-vue'
import { computed, defineComponent, h, ref, resolveComponent } from 'vue'

import { useUserStore } from '@/stores/modules/user'

export default defineComponent({
  name: 'uvLayoutSideBar',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  props: {
    menuOptions: {
      type: Array as () => MenuItem[],
      required: true,
    },
    theme: {
      type: String as () => MenuTheme,
      default: 'light',
    },
    logo: {
      type: String,
      default: '',
    },
    defaultSelectedKeys: {
      type: Array as () => string[],
      default: () => [],
    },
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    sidebarWidth: {
      type: Number,
      default: 220,
    },
    collapsedWidth: {
      type: Number,
      default: 80,
    },
  },
  emits: ['select', 'collapse-change', 'header-click'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    const selectedKeys = ref<string[]>(props.defaultSelectedKeys)
    const collapsed = ref(props.defaultCollapsed)
    const isMobile = ref(false)
    const { t } = useI18n()
    // 获取图标组件
    const getIconComponent = (iconName?: string) => {
      if (!iconName) return null

      const iconMap: Record<string, any> = {
        home: HomeOutlined,
        user: UserOutlined,
        setting: SettingOutlined,
        team: TeamOutlined,
        file: FileOutlined,
        dashboard: DashboardOutlined,
        'icon-instrumentManage': () => h(resolveComponent('IconFont'), { type: 'icon-yiqi' }),
        'icon-instrumentConfig': () =>
          h(resolveComponent('IconFont'), { type: 'icon-instrumentConfig' }),
        'icon-sampleInjectorConfig': () =>
          h(resolveComponent('IconFont'), { type: 'icon-sampleInjectorConfig' }),
        'icon-sampleTrayConfig': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-sampleTrayConfig',
          }),
        'icon-instrumentCalibration': () =>
          h(resolveComponent('IconFont'), { type: 'icon-instrumentCalibration' }),
        'icon-historyTask': () => h(resolveComponent('IconFont'), { type: 'icon-historyTask' }),
        'icon-useStatistics': () => h(resolveComponent('IconFont'), { type: 'icon-useStatistics' }),
        'icon-reportDesign': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-reportDesign',
          }),
        'icon-kasong': () => h(resolveComponent('IconFont'), { type: 'icon-kasong' }),
        'icon-ziwaifenguangguangduji': () =>
          h(resolveComponent('IconFont'), { type: 'icon-ziwaifenguangguangduji' }),
        'icon-jiliangguan': () => h(resolveComponent('IconFont'), { type: 'icon-jiliangguan' }),
        'icon-yongdianbofeng': () =>
          h(resolveComponent('IconFont'), { type: 'icon-yongdianbofeng' }),
        'icon-border-importing-in': () =>
          h(resolveComponent('IconFont'), { type: 'icon-border-importing-in' }),
        'icon-fayuanrenyuantongji': () =>
          h(resolveComponent('IconFont'), { type: 'icon-fayuanrenyuantongji' }),
        'icon-reportTemplateDesign': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-reportTemplateDesign',
          }),
        'icon-templateEdit': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-templateEdit',
          }),
        'icon-standardTemplateDesign': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-standardTemplateDesign',
          }),
        'icon-installTemplateDesign': () =>
          h(resolveComponent('IconFont'), { type: 'icon-installTemplateDesign' }),
        'icon-standardManage': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-standardManage',
          }),
        'icon-xitongguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-xitongguanli',
          }),
        'icon-panelConfig': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-panelConfig',
          }),
        'icon-manageConfig': () => h(resolveComponent('IconFont'), { type: 'icon-manageConfig' }),
        'icon-databaseConfig': () =>
          h(resolveComponent('IconFont'), { type: 'icon-databaseConfig' }),
        'icon-logManage': () => h(resolveComponent('IconFont'), { type: 'icon-logManage' }),
        'icon-stepDelete': () => h(resolveComponent('IconFont'), { type: 'icon-stepDelete' }),
        'icon-serviceParameters': () =>
          h(resolveComponent('IconFont'), { type: 'icon-serviceParameters' }),
        'icon-tiaoshigongju': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-tiaoshigongju',
          }),
        'icon-kaifatiaoshigongju': () =>
          h(resolveComponent('IconFont'), { type: 'icon-kaifatiaoshigongju' }),
        'icon-chanxianshengchangongju': () =>
          h(resolveComponent('IconFont'), { type: 'icon-chanxianshengchangongju' }),
        'icon-chuchangjianyan': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-chuchangjianyan',
          }),
        'icon-chuchangjianyanmoban': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-chuchangjianyanmoban',
          }),
        'icon-kaixiangjianyan': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-kaixiangjianyan',
          }),
        'icon-bianjieweixiu': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-bianjieweixiu',
          }),
        'icon-yiqizhuangtaijiance': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-yiqizhuangtaijiance',
          }),
        'icon-kehuxiangdao': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-kehuxiangdao',
          }),
        'icon-weixiurenyuanxiangdao': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-weixiurenyuanxiangdao',
          }),
        'icon-jiandingxiaozhun': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-jiandingxiaozhun',
          }),
        'icon-jianding': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-jianding',
          }),
        'icon-xiaozhun': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-xiaozhun',
          }),
        'icon-qijianhecha': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-qijianhecha',
          }),
        'icon-tongzhiguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-tongzhiguanli',
          }),
        'icon-yonghuguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-yonghuguanli',
          }),
        'icon-xitongyonghuguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-xitongyonghuguanli',
          }),
        'icon-chanxianyonghuguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-chanxianyonghuguanli',
          }),
        'icon-yonghuquanxianguanli': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-yonghuquanxianguanli',
          }),
        'icon-shejimoshi': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-shejimoshi',
          }),
        'icon-bujiansheji': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-bujiansheji',
          }),
        'icon-liuchengsheji': () =>
          h(resolveComponent('IconFont'), {
            type: 'icon-liuchengsheji',
          }),
      }

      return iconMap[iconName] || null
    }
    const getIconComponentNew = (item: any) => {
      if (!item.defaultIcon || !item.selectedIcon) return null
      const iconMap: Record<string, any> = {
        'icon-instrumentManage': {
          url: new URL('@/assets/images/icon-instrumentManage.png', import.meta.url).href,
          className: 'w-[23px]',
        },
        'icon-instrumentManage-selected': {
          url: new URL('@/assets/images/icon-instrumentManage-selected.png', import.meta.url).href,
          className: 'w-[23px]',
        },
        'icon-kasong': {
          url: new URL('@/assets/images/icon-kasong.png', import.meta.url).href,
          className: 'w-[20px]',
        },
        'icon-kasong-selected': {
          url: new URL('@/assets/images/icon-kasong-selected.png', import.meta.url).href,
          className: 'w-[20px]',
        },
        'icon-reportDesign': {
          url: new URL('@/assets/images/icon-reportDesign.png', import.meta.url).href,
          className: 'w-[22px]',
        },
        'icon-reportDesign-selected': {
          url: new URL('@/assets/images/icon-reportDesign-selected.png', import.meta.url).href,
          className: 'w-[22px]',
        },
        'icon-systemManage': {
          url: new URL('@/assets/images/icon-systemManage.png', import.meta.url).href,
          className: 'w-[22px]',
        },
        'icon-systemManage-selected': {
          url: new URL('@/assets/images/icon-systemManage-selected.png', import.meta.url).href,
          className: 'w-[22px]',
        },
        'icon-standardManage': {
          url: new URL('@/assets/images/icon-standardManage.png', import.meta.url).href,
          className: 'w-[23px]',
        },
        'icon-standardManage-selected': {
          url: new URL('@/assets/images/icon-standardManage-selected.png', import.meta.url).href,
          className: 'w-[23px]',
        },
        'icon-userManageHome': {
          url: new URL('@/assets/images/icon-userManageHome.png', import.meta.url).href,
          className: 'w-[24px]',
        },
        'icon-userManageHome-selected': {
          url: new URL('@/assets/images/icon-userManageHome-selected.png', import.meta.url).href,
          className: 'w-[24px]',
        },
      }
      const selectedMenu = selectedKeys.value.includes(item.key)
      return selectedMenu ? iconMap[item.selectedIcon] : iconMap[item.defaultIcon]
    }
    const handleTitleClick = (e: Event, key: string) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const onSelect = ({ key }: { key: string }) => {
      selectedKeys.value = [key]
      console.log('selectedKeys.value', selectedKeys.value)
      emit('select', key)
    }

    const toggleCollapse = () => {
      collapsed.value = !collapsed.value
      emit('collapse-change', collapsed.value)
    }

    const onBreakpoint = (broken: boolean) => {
      isMobile.value = broken
      if (broken) {
        collapsed.value = true
      }
      emit('collapse-change', collapsed.value)
    }
    const clickHasChild = (e: Event, key: string) => {
      selectedKeys.value = [key]
      emit('select', key)
    }
    return {
      selectedKeys,
      collapsed,
      isMobile,
      getIconComponent,
      getIconComponentNew,
      onSelect,
      toggleCollapse,
      onBreakpoint,
      MenuFoldOutlined,
      MenuUnfoldOutlined,
      handleTitleClick,
      clickHasChild,
      t,
      userStore,
    }
  },
})

interface MenuItem {
  key: string
  label: string
  icon?: string
  children?: MenuItem[]
  hidden?: boolean
}
</script>

<style lang="less" scope>
.ant-layout-sider-children {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px) !important;
  overflow: hidden;
}

.logo-collapsed-box {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo-img {
    width: 80px;
    height: auto;
    margin: 0 auto;
    img {
      width: 100%;
      height: auto;
    }
  }
}

.logo-box {
  padding: 40px 0px 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;

  .logo-img {
    width: 110px;
    height: auto;
    margin: 0 auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  .logo-text {
    margin-top: 25px;
    padding: 2px 15px;
    font-size: 24px;
    border-radius: 13px;
    text-align: center;
    font-weight: bold;
    color: #113371;
    background-color: #f4faff;
  }
}

.collapsed-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  > img {
    margin-top: 30px;
    width: 48px;
  }
  > div {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: #113371;
    background-color: #f4faff;
    width: 100%;
  }
  // > div {
  //   margin-bottom: 20px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: 48px;
  //   height: 47px;
  //   border-radius: 20px;
  //   border: 2px dashed #bfbfbf;
  //   font-family: Microsoft YaHei;
  //   font-weight: bold;
  //   font-size: 23px;
  //   color: #bfbfbf;
  // }
}

.user-box {
  margin-top: 10px;

  .user-img-box {
    margin: 0 auto;
    width: 60%;
    height: 0;
    padding-bottom: 60%;
    border-radius: 50%;
    background-image: url('@/assets/images/user.png');
    background-color: #c8c8c8; /* 背景颜色 */
    background-size: 65%;
    background-position: center center;
    background-repeat: no-repeat;

    &:hover {
      transform: scale(1.1);
    }
  }

  .user-text {
    margin-top: 10px;
    text-align: center;
    color: #fdfdfd;
  }
}

/* 确保只有点击箭头才会展开子菜单 */
.ant-menu-submenu-title {
  pointer-events: auto;
  cursor: pointer;
}

.menu-title {
  pointer-events: auto;
  width: calc(100% - 24px); /* 给箭头留出空间 */
}

.ant-menu-submenu-arrow {
  pointer-events: none;
  display: flex;
  align-items: center;
}

.page-menu {
  // background-color: #f8f9fa; // 背景颜色柔和
  border-right: none;
  max-height: calc(100vh - 132px) !important;
  overflow-y: auto;
  scrollbar-width: none; /* 隐藏 Firefox 滚动条 */
  -ms-overflow-style: none; /* 隐藏 IE/Edge 滚动条 */

  &::-webkit-scrollbar {
    width: 0 !important; /* 隐藏 Chrome/Safari 滚动条 */
    height: 0 !important;
  }

  &.ant-menu-inline {
    > .ant-menu-item,
    > .ant-menu-submenu > .ant-menu-submenu-title {
      padding-left: 20px !important;
      font-size: 18px;
      height: 50px;
      line-height: 50px;

      > .ant-menu-item-icon {
        font-size: 22px;
        color: #fff;
      }

      font-weight: 600;
      color: #fff;

      &:hover {
        .ant-menu-item-icon {
          color: #153471 !important;
        }

        border-radius: 0px !important;
        color: #153471 !important;
        background-color: #fff !important;
        width: 100%;
      }
    }

    > .ant-menu-submenu {
      > .ant-menu-submenu-title {
        color: #fff;
      }
    }

    // 二级菜单项样式
    .ant-menu-item-group-list .ant-menu-item,
    .ant-menu-submenu .ant-menu {
      > .ant-menu-item,
      > .ant-menu-submenu > .ant-menu-submenu-title {
        padding-left: 40px !important;
        height: 40px;
        line-height: 40px;

        > .ant-menu-item-icon {
          font-size: 22px;
          color: #fff;
        }

        font-size: 18px;
        color: #fff;

        &:hover {
          .ant-menu-item-icon {
            color: #153471 !important;
          }

          border-radius: 0px !important;
          color: #153471 !important;
          background-color: #fff !important;
          width: 100%;
        }
      }
    }

    // 三级菜单项样式
    .ant-menu-submenu .ant-menu .ant-menu {
      > .ant-menu-item,
      > .ant-menu-submenu > .ant-menu-submenu-title {
        padding-left: 60px !important;
        font-size: 18px;

        > .ant-menu-item-icon {
          font-size: 22px;
          color: #fff;
        }

        color: #fff;

        &:hover {
          .ant-menu-item-icon {
            color: #153471 !important;
          }

          border-radius: 0px !important;
          color: #153471 !important;
          background-color: #fff !important;
          width: 100%;
        }
      }
    }

    .ant-menu-item-selected {
      position: relative;
      font-weight: bold !important;
      background-color: #fff !important;
      border-radius: 0px;
      color: #153471 !important;
      width: 100%;

      > .ant-menu-item-icon {
        color: #153471 !important;
      }

      // &::after {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   height: 100%;
      //   width: 3px;
      //   background-color: #fff;
      // }
    }
  }
}

.ant-layout-sider,
.ant-menu,
.ant-layout-sider-trigger,
.ant-layout-has-sider {
  padding-bottom: 0px !important;
  background-color: #153471 !important;

  .anticon-left {
    color: #fff !important;
  }

  .anticon-right {
    color: #fff !important;
  }
}

.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-inline-collapsed > .ant-menu-item {
  padding-inline: calc(50% - 18px);
  color: #fff !important;
  .anticon {
    height: 40px;
    font-size: 26px !important;
  }
  &:hover {
    color: #fff !important;
  }
}

.ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: 0px;
}

// .ant-menu-inline .ant-menu-item {
//   margin-block: 0px;
// }

.ant-menu-light {
  color: #fff !important;
  .anticon {
    height: 40px;
    font-size: 20px !important;
  }
  // 处理弹出菜单的悬停效果
  .ant-menu-item {
    color: #fff !important;
    // padding-inline: calc(50% - 17px);
    &:hover {
      color: #153471 !important;
      background-color: #fff !important;
      .ant-menu-item-icon {
        color: #153471 !important;
      }
    }
  }

  .ant-menu-submenu-title {
    color: #fff !important;
  }

  .ant-menu-submenu-title:hover {
    color: #153471 !important;
    background-color: #fff !important;
    .ant-menu-item-icon {
      color: #153471 !important;
    }
  }

  .ant-menu-item-selected {
    color: #153471 !important;
    background-color: #fff !important;
  }
}
</style>
