<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <!-- <a-card :title="title" :bordered="true" class="custom-card">
    <div class="flex">
      <template v-for="(group, groupIndex) in groups" :key="groupIndex">
        <div class="flex-1">
          <a-card-grid class="head-item" style="width: 100%" :hoverable="false">{{
            group.title
          }}</a-card-grid>
          <template v-for="(item, itemIndex) in group.items" :key="itemIndex">
            <a-card-grid :style="{ width: '100%' }" :hoverable="false">
              {{ item.label }}：{{ item.value }}
            </a-card-grid>
          </template>
        </div>
      </template>
    </div>
  </a-card> -->
  <div>
    <div
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="flex items-center"
      :class="{ '!mb-[20px]': groupIndex !== groups.length - 1 }"
    >
      <div class="group-title">
        {{ group.title }}
      </div>
      <div v-for="(item, itemIndex) in group.items" :key="itemIndex" class="flex items-center">
        <div class="group-item">{{ item.label }}：{{ item.value || '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  groups: {
    type: Array as () => Array<{
      title: string
      items: Array<{ label: string; value: any; width?: string }>
    }>,
    required: true,
  },
})
</script>

<style scoped lang="less">
.group-title {
  margin-right: 20px;
  width: 115px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #113371;
  background-color: #e2e8ec;
  color: #113371;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
}

.group-item {
  /* 单行文本省略 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 300px; /* 设置最大宽度 */
  margin-right: 20px;
  display: inline-block;
  padding: 0px 20px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  border-radius: 8px;
  background-color: #ebeced;
  // border: 1px solid #113371;
  color: #595757;
  word-break: break-all;
  min-width: 200px;
}

// .custom-card {
//   .ant-card-grid {
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     padding: 12px 24px;
//     font-size: 14px;
//     border: none;

//     &:nth-child(even) {
//       background-color: #fafafa;
//     }
//   }
// }
// .custom-card .head-item {
//   text-align: center;
//   background-color: #e9f1fc !important;
//   font-weight: bold;
//   color: #153471;
// }
</style>
