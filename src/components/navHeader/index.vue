<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <section class="nav-box" :class="{ 'justify-between': !className }">
      <div
        v-for="item in navList"
        :key="item.icon"
        class="flex flex-col items-center justify-center nav-item"
        :class="className"
        @click="handleToPath(item)"
      >
        <div :class="item.className">
          <img :src="item.icon" class="icon" />
        </div>
        <div
          class="text-[16px]"
          :class="className ? '!mt-[5px]' : '!mt-[13px]'"
          :style="{ color: item.color }"
        >
          {{ item.name }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'

const router = useRouter()
const props = defineProps({
  navList: {
    type: Array as PropType<
      {
        name: string
        icon: any
        className: string
        color: string
        toPath: string
      }[]
    >,
    default: () => [],
  },
  className: {
    type: String,
    default: 'w-[20%]',
  },
})

const handleToPath = (item: { toPath: string }) => {
  router.push({ path: item.toPath })
}
</script>

<style lang="less" scoped>
.nav-box {
  margin: 0px -30px 10px;
  display: flex;
  align-items: center;
  // justify-content: space-between;

  .nav-item {
    // width: 20%;
    margin: 0px 30px;
    // padding: 20px 0px;
    box-shadow: 0px 6px 11px 2px rgba(147, 147, 147, 0.33);
    border-radius: 28px;
    background: #f4faff;
    cursor: pointer;

    .icon {
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
