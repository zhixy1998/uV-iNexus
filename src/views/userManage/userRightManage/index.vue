<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="three-column-layout">
    <leftCollapsePanel direction="left" container-width="200">
      <div class="left-column">
        <leftCollapsePanel direction="bottom">
          <div class="w-full h-full bg-[#ef4444]"></div>
        </leftCollapsePanel>
        <leftCollapsePanel direction="top">
          <div class="w-full h-full bg-[#ef4444]"></div>
        </leftCollapsePanel>
      </div>
    </leftCollapsePanel>
    <div></div>
    <leftCollapsePanel direction="right" container-width="200">
      <div class="right-column">
        <leftCollapsePanel direction="bottom">
          <div class="w-full h-full bg-[#ef4444]"></div>
        </leftCollapsePanel>
        <leftCollapsePanel direction="top">
          <div class="w-full h-full bg-[#ef4444]"></div>
        </leftCollapsePanel>
      </div>
    </leftCollapsePanel>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
.three-column-layout {
  display: grid;
  grid-template-columns: auto 1fr auto; /* 左列自适应内容，中列占剩余空间，右列自适应内容 */
  grid-template-rows: auto 1fr; /* 第一行自适应内容，第二行占剩余高度 */
  height: 100vh; /* 或具体高度 */
  gap: 10px; /* 可选，设置间距 */
}
.left-column,
.right-column {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  > :deep(.container) {
    flex: 1;
  }
}
</style>
