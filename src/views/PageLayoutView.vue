<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-layout class="h-screen">
    <!-- <UvLayoutHeader /> -->
    <a-layout>
      <uvLayoutSideBar @select="onSelect" :menu-options="menuOptions" />
      <!-- <a-layout-sider v-model:collapsed="collapsed" collapsible style="height: calc(100vh - 64px)">
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="onSelect">
          <template v-for="item in menuOptions" :key="item.key">
            <a-sub-menu v-if="item.children" :key="item.key">
              <template #title>
                <span>{{ item.label }}</span>
              </template>
              <template v-for="child in item.children" :key="child.key">
                <a-sub-menu v-if="child.children" :key="child.key">
                  <template #title>{{ child.label }}</template>
                  <a-menu-item v-for="subChild in child.children" :key="subChild.key">
                    {{ subChild.label }}
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="`${child.key}`">
                  {{ child.label }}
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item v-else :key="`${item.key}`">
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider> -->
      <a-layout class="page-layout relative">
        <uvLayoutHeader />
        <a-layout-content class="layout-content">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in" appear>
              <div class="page-container !h-full">
                <overlayCanPart :spinning="loadingStore.isLoading" class="!h-full">
                  <KeepAlive :include="appStore.aliveRoute">
                    <component :is="Component" />
                  </KeepAlive>
                </overlayCanPart>
              </div>
            </transition>
          </router-view>
        </a-layout-content>
        <a-layout-footer class="layout-footer">
          Copyright © 北京普析通用仪器有限责任公司
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { getBackendRoutes } from '@/api/userManage/index' // 导入接口
import uvLayoutSideBar from '@/components/uvLayoutSideBar/index.vue'
import { realMenus as rawMenus, USE_BACKEND_ROUTES } from '@/setting'
import { useLoadingStore, useUserStore } from '@/stores'
import { menuConfig } from '@/utils/menuConfig'

const route = useRoute()
const router = useRouter()
const loadingStore = useLoadingStore()

// const permissionStore = usePermissionStore()
// 侧边栏折叠状态
const selectedKeys = ref(['1'])
const { systemIdentityId, logout } = useUserStore()
const appStore = useAppStore()
// const pessmissonMenus = menuConfig[systemIdentityId as '1' | '2' | '3' | '4'] || []
// 定义响应式变量：存储后端返回的权限name列表
const pessmissonMenus = ref<string[]>([])

// 封装：调用后端接口获取权限列表并直接赋值
const getBackendPermission = async () => {
  if (!systemIdentityId) {
    pessmissonMenus.value = []
    menuOptions.value = []
    return
  }
  try {
    const res = await getBackendRoutes(systemIdentityId)
    if (res.code === 200 && Array.isArray(res.data)) {
      // 处理后端可能的斜杠格式（与前端路由name对齐，如"/403"→"403"）
      pessmissonMenus.value = res.data.map((name) => (name.startsWith('/') ? name.slice(1) : name))
    } else {
      pessmissonMenus.value = [] // 接口异常时用空权限
    }
  } catch (error) {
    console.error('获取后端权限列表失败:', error)
    pessmissonMenus.value = [] // 接口报错时用空权限
  } finally {
    // 筛选菜单（无论接口成功/失败，都更新菜单）
    menuOptions.value = filterMenuByNames(rawMenus as MenuItem[], pessmissonMenus.value)
  }
}

// 4.2 前端模式：读取静态menuConfig
const getFrontendPermission = () => {
  // 从前端配置中获取当前角色的权限列表（原逻辑保留）
  pessmissonMenus.value = menuConfig[systemIdentityId as '1' | '2' | '3' | '4'] || []
  // 筛选菜单
  menuOptions.value = filterMenuByNames(rawMenus as MenuItem[], pessmissonMenus.value)
}

// 5. 初始化权限和菜单（核心分支：根据USE_BACKEND_ROUTES切换）
const initPermissionAndMenu = async () => {
  console.log('当前模式:', USE_BACKEND_ROUTES ? '后端接口模式' : '前端静态模式')
  if (USE_BACKEND_ROUTES) {
    await getBackendPermission() // 后端模式：异步请求接口
  } else {
    getFrontendPermission() // 前端模式：同步读取静态配置
  }
  // 打印调试：确认权限和菜单是否正确
  console.log('最终权限列表:', pessmissonMenus.value)
  console.log('筛选后菜单:', menuOptions.value)
}

onMounted(async () => {
  await initPermissionAndMenu()
})

type BreadCrumbsType = {
  label: string
  key: string
}

interface MenuItem {
  label: string
  key: string
  icon?: string
  name: string
  children?: MenuItem[]
}

const filterMenuByNames = (menu: MenuItem[], validNames: string[]) => {
  return menu
    .filter((item) => validNames.includes(item.name)) // (1) 筛选出 name 在 validNames 中的菜单项
    .map((item) => {
      const filteredItem = { ...item } // (2) 复制当前菜单项（避免修改原数据）
      if (filteredItem.children) {
        // (3) 递归处理子菜单
        filteredItem.children = filterMenuByNames(filteredItem.children, validNames)
        // (4) 如果子菜单处理后为空，则删除 children 属性
        if (filteredItem.children.length === 0) {
          delete filteredItem.children
        }
      }
      return filteredItem // (5) 返回处理后的菜单项
    })
}
const perssionsShowMenus = filterMenuByNames(rawMenus as MenuItem[], pessmissonMenus.value)
// console.log(perssionsShowMenus, 'perssionsShowMenus')
const menuOptions = ref(perssionsShowMenus)
// 菜单数据
// permissionStore.setPermissionMenus(realMenus)
// const menuOptions = permissionStore.permissionMenus
// const accessRoute = permissionStore.accessRoutes
// // console.log('accessRoute', accessRoute)
// router.addRoute(accessRoute)
// 面包屑 (根据当前路由动态生成)
watch(
  route,
  (newRoute: any, oldRoute) => {
    selectedKeys.value = [newRoute.path]
  },
  { immediate: true },
)

const onSelect = (key: string) => {
  if ((appStore.deviceMeasureMode === 2 && appStore.measureMode === '1') || appStore.zeroLoading) {
    const routeUrl = router.resolve({
      path: key,
    })
    window.open(routeUrl.href, '_blank')
  } else {
    selectedKeys.value = [key]
    // 这里可以添加路由跳转逻辑
    router.push({ path: key })
  }
}
</script>
<style scoped lang="less">
.layout-footer {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-layout {
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: contain;
}

.layout-content {
  flex: 1;
  background: #fff;
  box-sizing: border-box;
  padding: 16px 30px;
  overflow: auto;
}

.page-breadcrumb {
  // background: linear-gradient(to bottom, rgba(14, 51, 120, 0.8), rgba(14, 51, 120, 0.7));
  display: flex;
  align-items: center;
  margin: 16px 16px;
  height: 22px;
}

:deep(.ant-menu-light .ant-menu-item-selected) {
  background: #153471;
  color: #fff;
}

:deep(.ant-breadcrumb-separator) {
  color: #133379;
}

:deep(.ant-layout-sider) {
  flex: 0 0 220px !important;
  max-width: 220px !important;
  min-width: 220px !important;
  width: 220px !important;
}

:deep(.ant-layout-sider-trigger) {
  max-width: 220px !important;
  min-width: 80px !important;
  width: 220px !important;
}

:deep(.ant-layout-sider-collapsed > .ant-layout-sider-trigger) {
  max-width: 220px !important;
  min-width: 80px !important;
  width: 80px !important;
}

:deep(.ant-layout-sider-collapsed) {
  flex: 0 0 80px !important;
  max-width: 80px !important;
  min-width: 80px !important;
  width: 80px !important;
}

.ant-spin-nested-loading {
  height: 100%;

  :deep(.ant-spin-container) {
    height: 100% !important;
  }
}

//.ant-spin-nested-loading
// :deep(.ant-layout-sider-trigger) {
//   width: 220px !important;
// }

// :deep(.ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title) {
//   height: 50px !important;
//   line-height: 50px !important;
// }
// :deep(.ant-menu-vertical > .ant-menu-item) {
//   height: 50px !important;
//   line-height: 50px !important;
// }
</style>
