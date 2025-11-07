<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="结果数据" not-collapse>
      <template #slot-content>
        <div class="result-btn-box">
          <template v-for="item in navList" :key="item.icon">
            <div>
              <div :style="{ backgroundImage: `url(${item.icon})` }"></div>
              <div :style="{ color: item.color }">
                {{ item.name }}
              </div>
            </div>
          </template>
        </div>
        <a-row :gutter="16">
          <a-col :span="8">
            <div>
              <verificationTree ref="verificationTreeRef" />
            </div>
            <div class="h-[330px]">
              <attachSetting
                ref="attachSettingRef"
                :taskId="`56f1260f45925f15f0324e83459add11`"
                :measureType="`光度测量`"
              />
            </div>
          </a-col>
          <a-col :span="16">
            <measureArea :treeData="verificationTreeRef ? verificationTreeRef.treeData : []" />
          </a-col>
        </a-row>
      </template>
    </uvCollapseRightSlot>
  </section>
</template>
<script setup lang="ts">
import sampleIcon from '@/assets/images/experiment/sample.png'
import zeroIcon from '@/assets/images/experiment/zero.png'
import saveIcon from '@/assets/images/experiment/save.png'
import copyIcon from '@/assets/images/experiment/copy.png'
import importIcon from '@/assets/images/experiment/import.png'
import verificationTree from './verificationTree.vue'
import attachSetting from './attachSetting.vue'
import measureArea from './measureArea.vue'
const navList = ref([
  {
    name: '单项测量',
    icon: sampleIcon,
    className: 'w-[38px]',
    color: '#C649A1',
    isShow: true,
  },
  {
    name: '自动测量',
    icon: zeroIcon,
    className: 'w-[57px]',
    color: '#133379',
  },
  {
    name: '保存',
    icon: saveIcon,
    className: 'w-[57px]',
    color: '#FF9138',
  },
  {
    name: '导出',
    icon: importIcon,
    className: 'w-[57px]',
    color: '#A48FFF',
  },
  {
    name: '复制',
    icon: copyIcon,
    className: 'w-[57px]',
    color: '#135679',
  },
])
const verificationTreeRef = ref()
</script>
