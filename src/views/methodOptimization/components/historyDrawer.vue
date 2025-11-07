<!--
- 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
- 本软件受商业机密法和版权法保护。
- 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
- 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
-->

<template>
  <a-drawer
    v-model:open="open"
    class="container"
    :closable="false"
    width="45%"
    placement="right"
    :bodyStyle="{ padding: '0px 50px 20px' }"
    @close="closeDrawer"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="历史文件">
        <dataTable v-if="activeKey === '1'" ref="dataTableRef" :measureType="measureType" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="历史方法">
        <methodsTable
          v-if="activeKey === '2'"
          ref="methodsTableRef"
          :measureType="measureType"
          @update:apply="updateApply"
        />
      </a-tab-pane>
    </a-tabs>
    <div class="right-arrow-box" @click="closeDrawer">
      <div class="img">
        <img src="@/assets/images/experiment/right_arrow.png" />
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import dataTable from './newDataTable.vue'
import methodsTable from './newMethodsTable.vue'
import { ref } from 'vue'

// tabs
const activeKey = ref('')

// 测量类型
const measureType = ref('')

const open = ref<boolean>(false)
const showDrawer = (value: string, type: string) => {
  measureType.value = value
  activeKey.value = type
  open.value = true
}
const closeDrawer = () => {
  activeKey.value = ''
  open.value = false
}
defineExpose({
  showDrawer,
})
const emit = defineEmits(['update:drawer'])

const updateApply = (id: string, measurementParamInfo: any) => {
  emit('update:drawer', id, measurementParamInfo)
}

onMounted(() => {})
</script>
<style scoped lang="less">
.container {
  position: relative;
  transition: all 0.3s ease;
}
.right-arrow-box {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 999;
  width: 22px;
  height: 160px;
  background: rgba(199, 210, 228, 0.5);
  border-radius: 0px 8px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    width: 12px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
