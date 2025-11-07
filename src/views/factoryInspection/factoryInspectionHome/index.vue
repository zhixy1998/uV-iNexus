<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="debug-tool-home">
    <div class="not-developed">
      <div class="icon">🚧</div>
      <div class="text">暂未支持</div>
      <div class="subtext">功能正在建设中，敬请期待</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.debug-tool-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .not-developed {
    text-align: center;
    padding: 40px;

    .icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }

    .text {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
    }

    .subtext {
      font-size: 16px;
      color: #7f8c8d;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
