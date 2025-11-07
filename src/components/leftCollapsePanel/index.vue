<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2016 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div
    class="container"
    :style="containerStyle"
    :class="{
      collapsed: isPanelCollapsed && (direction === 'left' || direction === 'right'),
      collapsedHeight: isPanelCollapsed && (direction === 'top' || direction === 'bottom'),
    }"
  >
    <!--    <DoubleRightOutlined-->
    <!--      class="toggle-arrow-common"-->
    <!--      :class="`toggle-arrow-${direction}`"-->
    <!--      @click="isPanelCollapsed = !isPanelCollapsed"-->
    <!--      v-if="isPanelCollapsed"-->
    <!--    >-->
    <!--      &lt;!&ndash;      <span>&lt;</span>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <span>》</span>&ndash;&gt;-->
    <!--    </DoubleRightOutlined>-->
    <div
      class="toggle-arrow-common"
      :class="`toggle-arrow-${direction}`"
      @click="isPanelCollapsed = !isPanelCollapsed"
      v-if="isPanelCollapsed"
    >
      <img src="@/assets/images/experiment/right_arrow.png" />
    </div>
    <div class="left-panel">
      <!--      <DoubleLeftOutlined-->
      <!--        class="toggle-arrow-common"-->
      <!--        :class="`toggle-arrow1-${direction}`"-->
      <!--        @click="isPanelCollapsed = !isPanelCollapsed"-->
      <!--        v-if="!isPanelCollapsed"-->
      <!--      >-->
      <!--      </DoubleLeftOutlined>-->
      <div
        class="toggle-arrow-common"
        :class="`toggle-arrow1-${direction}`"
        @click="isPanelCollapsed = !isPanelCollapsed"
        v-if="!isPanelCollapsed"
      >
        <img src="@/assets/images/experiment/left_arrow.png" />
      </div>
      <slot v-if="!isPanelCollapsed"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  containerWidth: {
    type: [String, Number],
  },
  direction: {
    type: String,
    default: 'right',
  },
  isPanelCollapsed: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:isPanelCollapsed'])
const containerStyle = computed(() => {
  if (props.containerWidth !== undefined && props.containerWidth !== null) {
    // return { width:`${props.containerWidth}px` }
    return { width: pxToRem(props.containerWidth) }
  }
  return { width: 'auto' }
})
const pxToRem = (pxValue: string | number): string => {
  const baseFontSize = 16 // 假设根字体大小为16px
  const px = typeof pxValue === 'string' ? parseFloat(pxValue) : pxValue
  return `${px / baseFontSize}rem`
}
const isPanelCollapsed = ref(props.isPanelCollapsed)
watch(
  () => isPanelCollapsed.value,
  (value) => {
    emits('update:isPanelCollapsed', value)
  },
)
</script>

<style scoped lang="less">
.toggle-arrow-common {
  color: #616170;
  background: rgba(199, 210, 228, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 60%;
    height: auto;
  }
}
.container {
  height: auto;
  position: relative;
  transition: all 0.3s ease;
}

.container.collapsed {
  width: 0 !important;
}
.container.collapsedHeight {
  height: 0 !important;
  flex: 0 0 14px !important;
}

.left-panel {
  //background: #f0f2f5;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.left-panel .toggle-arrow1-left {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 999;
  width: 22px;
  height: 160px;
  border-radius: 8px 0px 0px 8px;
  font-size: 16px;
}

.left-panel .toggle-arrow1-bottom {
  cursor: pointer;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  z-index: 999;
  font-size: 14px;
  width: 14px;
  height: 41px;
  border-radius: 4px;
}

.left-panel .toggle-arrow1-top {
  cursor: pointer;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  z-index: 999;
  font-size: 14px;
  width: 14px;
  height: 41px;
  border-radius: 4px;
}
.left-panel .toggle-arrow1-right {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) rotate(180deg);
  z-index: 999;
  width: 22px;
  height: 160px;
  border-radius: 8px 0px 0px 8px;
  font-size: 16px;
}

.toggle-arrow-left {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 999;
  width: 22px;
  height: 160px;
  border-radius: 0 8px 8px 0;
  font-size: 16px;
}

.toggle-arrow-bottom {
  cursor: pointer;
  position: absolute;
  bottom: -15px; /*箭头的高度*/
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  z-index: 999;
  font-size: 14px;
  width: 14px;
  height: 41px;
  border-radius: 4px;
}
.toggle-arrow-top {
  cursor: pointer;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  z-index: 999;
  font-size: 14px;
  width: 14px;
  height: 41px;
  border-radius: 4px;
}

.toggle-arrow-right {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%) rotate(180deg);
  z-index: 999;
  width: 22px;
  height: 160px;
  border-radius: 0px 8px 8px 0px;
  font-size: 16px;
}
</style>
