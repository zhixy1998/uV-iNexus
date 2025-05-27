<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- 顶部栏 (Logo + 设置/通知) -->
    <header class="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="@/assets/images/logo2.png" alt="Logo" class="h-8 mr-2" />
        <span class="text-xl font-bold text-gray-800">Admin System</span>
      </div>

      <!-- 右侧设置/通知 -->
      <div class="flex items-center space-x-4">
        <n-badge :value="5" dot>
          <n-button circle>
            <template #icon>
              <n-icon size="20">
                <bell-icon />
              </n-icon>
            </template>
          </n-button>
        </n-badge>
        <n-button circle>
          <template #icon>
            <n-icon size="20">
              <settings-icon />
            </n-icon>
          </template>
        </n-button>
      </div>
    </header>

    <!-- 主内容区 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧可折叠侧边栏 -->
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
        show-trigger class="h-full transition-all duration-300" @collapse="collapsed = true"
        @expand="collapsed = false">
        <n-menu :options="menuOptions" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
          @update:value="handleMenuSelect" />
      </n-layout-sider>

      <!-- 右侧内容区 -->
      <n-layout class="flex-1 flex flex-col">
        <!-- 顶部导航栏 (与侧边栏联动) -->
        <n-layout-header bordered class="p-4 bg-white">
          <div class="flex items-center">
            <n-button text class="mr-4" @click="collapsed = !collapsed">
              <template #icon>
                <n-icon>
                  <menu-icon />
                </n-icon>
              </template>
            </n-button>
            <n-breadcrumb>
              <n-breadcrumb-item v-for="item in breadcrumbs" :key="item">
                {{ item }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
        </n-layout-header>

        <!-- 内容区 -->
        <n-layout-content class="p-6 bg-gray-50 flex-1 overflow-auto">
          <n-spin size="large" :show="loadingStore.isLoading">
            <router-view />
          </n-spin>
        </n-layout-content>
      </n-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BookOutline as BookIcon,
  MenuOutline as MenuIcon,
  NotificationsOutline as BellIcon,
  PersonOutline as UserIcon,
  SettingsOutline as SettingsIcon
} from '@vicons/ionicons5'
import { computed, h, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const loadingStore = useLoadingStore()

// 侧边栏折叠状态
const collapsed = ref(false)

// 菜单数据
const menuOptions = [
  {
    label: '首页',
    key: '/home',
    icon: () => h(BookIcon, null, { default: () => h(BookIcon) })
  },
  {
    label: '仪器管理',
    key: '/instrument',
    icon: () => h(BookIcon, null, { default: () => h(UserIcon) }),
    children: [
      { label: '开机自检', key: '/powercheck' },
      { label: '仪器配置', key: '/instrumentconfig' },
      {
        label: '自动进样器配置', key: '/autolabconfig',
        children: [
          { label: '进样器参数盘配置', key: '/autolabconfig-1' },
        ]
      },
      { label: '仪器校准', key: '/instrumentcalibration' },
      {
        label: '仪器使用统计详情', key: '/instrumentstatistics',
        children: [
          { label: '检测任务详细信息', key: '/instrumentstatistics-1' },
        ]
      },
      { label: '仪器使用记录详情', key: '/instrumentrecord' },
    ]
  },
  {
    label: '仪器管理',
    key: '/instrument',
    icon: () => h(BookIcon, null, { default: () => h(UserIcon) }),
    children: [
      { label: '开机自检', key: '/powercheck' },
      { label: '仪器配置', key: '/instrumentconfig' },
      {
        label: '自动进样器配置', key: '/autolabconfig',
        children: [
          { label: '进样器参数盘配置', key: '/autolabconfig-1' },
        ]
      },
      { label: '仪器校准', key: '/instrumentcalibration' },
      {
        label: '仪器使用统计详情', key: '/instrumentstatistics',
        children: [
          { label: '检测任务详细信息', key: '/instrumentstatistics-1' },
        ]
      },
      { label: '仪器使用记录详情', key: '/instrumentrecord' },
    ]
  },
]
console.log(router.getRoutes(), 'route')
// const menuOptions = computed(() => {
//   return router.getRoutes().map((route) => ({
//     name: route.name,
//     path: route.path,
//     meta: route.meta,
//     children: route.children,
//   }));
// });

// 面包屑 (根据当前路由动态生成)
const breadcrumbs = computed(() => {
  return route.matched.map(item => item.meta.title || item.name)
})

// 菜单选择事件
const handleMenuSelect = (key: string) => {
  console.log(key, 'key')
  router.push({ name: key })
}
</script>

<style scoped>
/* 自定义过渡效果 */
.n-layout-sider {
  transition: width 0.3s ease;
}

/* 内容区滚动条优化 */
.n-layout-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.n-layout-content::-webkit-scrollbar-thumb {}
</style>