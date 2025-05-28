<template>
  <n-layout style="height: 100vh">
    <n-layout-header class="layout-header" bordered>
      <div class="h-full flex items-center">
        <img src="@/assets/images/logo2.png" alt="Logo" class="h-8" />
      </div>
      <div class="flex items-center gap-4">
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
    </n-layout-header>
    <n-layout position="absolute" style="top: 60px; bottom: 0px" has-sider>
      <n-layout-sider :native-scrollbar="false" bordered collapse-mode="width" :collapsed-width="64" :width="240"
        :collapsed="collapsed" show-trigger class="h-full transition-all duration-300" @collapse="collapsed = true"
        @expand="collapsed = false">
        <n-menu :options="menuOptions" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="20"
          @update:value="handleMenuSelect" />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
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

        <n-spin size="large" :show="loadingStore.isLoading">
          <transition name="fade-slide" mode="out-in" appear>
            <router-view />
          </transition>
        </n-spin>
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered>
      城府路
    </n-layout-footer> -->
  </n-layout>
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
import { useLoadingStore, usePermissionStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const loadingStore = useLoadingStore()
const permissionStore = usePermissionStore()
import { realMenus } from '@/setting'
// 侧边栏折叠状态
const collapsed = ref(false)

// 菜单数据
// const menuOptions = [
//   {
//     label: '首页',
//     key: '/home',
//     icon: () => h(BookIcon, null, { default: () => h(BookIcon) })
//   },
//   {
//     label: '仪器管理',
//     key: '/instrument',
//     icon: () => h(BookIcon, null, { default: () => h(UserIcon) }),
//     children: [
//       { label: '开机自检', key: '/powercheck' },
//       { label: '仪器配置', key: '/instrumentconfig' },
//       {
//         label: '自动进样器配置', key: '/autolabconfig',
//         children: [
//           { label: '进样器参数盘配置', key: '/autolabconfig-1' },
//         ]
//       },
//       { label: '仪器校准', key: '/instrumentcalibration' },
//       {
//         label: '仪器使用统计详情', key: '/instrumentstatistics',
//         children: [
//           { label: '检测任务详细信息', key: '/instrumentstatistics-1' },
//         ]
//       },
//       { label: '仪器使用记录详情', key: '/instrumentrecord' },
//     ]
//   },
//   {
//     label: '仪器管理',
//     key: '/instrument',
//     icon: () => h(BookIcon, null, { default: () => h(UserIcon) }),
//     children: [
//       { label: '开机自检', key: '/powercheck' },
//       { label: '仪器配置', key: '/instrumentconfig' },
//       {
//         label: '自动进样器配置', key: '/autolabconfig',
//         children: [
//           { label: '进样器参数盘配置', key: '/autolabconfig-1' },
//         ]
//       },
//       { label: '仪器校准', key: '/instrumentcalibration' },
//       {
//         label: '仪器使用统计详情', key: '/instrumentstatistics',
//         children: [
//           { label: '检测任务详细信息', key: '/instrumentstatistics-1' },
//         ]
//       },
//       { label: '仪器使用记录详情', key: '/instrumentrecord' },
//     ]
//   },
// ]
permissionStore.setPermissionMenus(realMenus)
const menuOptions = permissionStore.permissionMenus
const accessRoute = permissionStore.accessRoutes
// console.log('accessRoute', accessRoute)
router.addRoute(accessRoute)
// 面包屑 (根据当前路由动态生成)
const breadcrumbs = computed(() => {
  return route.matched.map(item => item.meta.title || item.name)
})

// 菜单选择事件
const handleMenuSelect = (key: string) => {
  console.log(key, 'key')
  router.push({ path: key })
}
</script>

<style scoped>
.layout-header {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

/* 内容区滚动条优化 */
.n-layout-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.n-layout-content::-webkit-scrollbar-thumb {}
</style>