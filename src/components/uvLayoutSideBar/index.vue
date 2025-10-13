<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    :width="sidebarWidth"
    :collapsedWidth="collapsedWidth"
    :theme="theme"
    class="fixed left-0 bottom-0 z-50 h-[calc(100vh-64px)] overflow-auto shadow-lg"
    breakpoint="lg"
    @breakpoint="onBreakpoint"
  >
    <!-- 菜单部分 -->
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :theme="theme"
      mode="inline"
      :inline-collapsed="collapsed"
      @select="onSelect"
    >
      <template v-for="item in menuOptions" :key="item.key">
        <!-- 有子菜单的情况 -->
        <a-sub-menu
          v-if="item.children"
          :key="item.key"
          @titleClick="handleTitleClick($event, item.key)"
        >
          <template #icon>
            <component
              @click.stop="clickHasChild($event, item.key)"
              :is="getIconComponent(item.icon)"
              class="text-base mr-2.5"
            />
          </template>
          <template #title>
            <span @click.stop="clickHasChild($event, item.key)"> {{ item.label }} </span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="child in item.children" :key="child.key">
            <!-- 二级菜单有子菜单 -->
            <a-sub-menu
              v-if="child.children"
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
                <span @click.stop="clickHasChild($event, child.key)">{{ child.label }}</span>
              </template>

              <!-- 三级菜单项 -->
              <a-menu-item v-for="subChild in child.children" :key="subChild.key">
                <template #icon>
                  <component :is="getIconComponent(subChild.icon)" class="text-base mr-2.5" />
                </template>
                {{ subChild.label }}
              </a-menu-item>
            </a-sub-menu>

            <!-- 二级菜单项 -->
            <a-menu-item v-else :key="child.key">
              <template #icon>
                <component :is="getIconComponent(child.icon)" class="text-base mr-2.5" />
              </template>
              {{ child.label }}
            </a-menu-item>
          </template>
        </a-sub-menu>

        <!-- 无子菜单的菜单项 -->
        <a-menu-item v-else :key="item.key">
          <template #icon>
            <component :is="getIconComponent(item.icon)" class="text-base mr-2.5" />
          </template>
          {{ item.label }}
        </a-menu-item>
      </template>
    </a-menu>

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
import { computed, defineComponent, ref } from 'vue'

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
      default: 'dark',
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
    const selectedKeys = ref<string[]>(props.defaultSelectedKeys)
    const collapsed = ref(props.defaultCollapsed)
    const isMobile = ref(false)

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
      }

      return iconMap[iconName] || null
    }
    const handleTitleClick = (e: Event, key: string) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const onSelect = ({ key }: { key: string }) => {
      selectedKeys.value = [key]
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
      onSelect,
      toggleCollapse,
      onBreakpoint,
      MenuFoldOutlined,
      MenuUnfoldOutlined,
      handleTitleClick,
      clickHasChild,
    }
  },
})

interface MenuItem {
  key: string
  label: string
  icon?: string
  children?: MenuItem[]
}
</script>

<style lang="less" scope>
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
</style>
