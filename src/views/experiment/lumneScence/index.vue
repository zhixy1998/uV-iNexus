<template>
  <div class="lumneScence">
    <uvCollapseRightSlot
      :parentActiveKey="activeKey"
      title="基本信息"
      @changeCollapse="changeCollapse"
    >
      <template #slot-header>
        <uvHasIconBtn content="创建任务" @click="handleCreateProject">
          <template #icon>
            <DownloadOutlined />
          </template>
        </uvHasIconBtn>
      </template>
      <template #slot-content>
        <a-row>
          <a-col :span="8" class="flex">
            <span>指定方法</span>
            <a-select ref="select" v-model:value="value1" @change="handleChange" class="w-xs !ml-2">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="8" class="flex">
            <span>指定方法</span>
            <a-input v-model:value="value" placeholder="Basic usage" class="!w-xs !mr-2 !ml-2" />
            <SearchOutlined />
          </a-col>
          <a-col :span="8" class="flex">
            <span>指定方法</span>
            <a-input v-model:value="value" placeholder="Basic usage" class="!w-xs !mr-2 !ml-2" />
            <SearchOutlined />
          </a-col>
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <br />
    <headTitle title="方法参数">
      <template #btn>
        <uvHasIconBtn content="方法设置" @click="showMethodsSetting"> </uvHasIconBtn>
      </template>
    </headTitle>
    <br />
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item class="head-item" :span="4" label="基本信息"></a-descriptions-item>
      <a-descriptions-item label="方法名称">维生素A测量</a-descriptions-item>
      <a-descriptions-item label="方法来源">无</a-descriptions-item>
    </a-descriptions>
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item class="head-item" label="测量参数" :span="6"></a-descriptions-item>
      <a-descriptions-item label="测量波长">660nm,540nm</a-descriptions-item>
    </a-descriptions>
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item class="head-item" label="重复模式" :span="8"></a-descriptions-item>
      <a-descriptions-item label="自动重复">3次</a-descriptions-item>
      <a-descriptions-item label="时间间隔">1秒</a-descriptions-item>
      <a-descriptions-item label="统计内容">SD,RSD,平均值</a-descriptions-item>
      <a-descriptions-item label="多联池">单池重复结束后再移动</a-descriptions-item>
    </a-descriptions>
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item class="head-item" label="仪器参数" :span="6"></a-descriptions-item>
      <a-descriptions-item label="响应时间">0.5秒</a-descriptions-item>
      <a-descriptions-item label="光谱带宽">2.0nm</a-descriptions-item>
      <a-descriptions-item label="换灯波长">362nm</a-descriptions-item>
    </a-descriptions>
    <br />
    <result-data />
    <report-preview />
    <methodsSetting v-model="methodsVisible" />
  </div>
</template>

<script lang="ts" setup>
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'

import headTitle from '@/components/headTitle'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'

import methodsSetting from './components/methodsSetting.vue'
import reportPreview from './components/reportPreview.vue'
import resultData from './components/resultData.vue'
// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}
const handleCreateProject = () => {}
const handleChange = () => {}
const value1 = ref('')
const value = ref('')
const checked = ref(false)
const methodsVisible = ref(false)
const showMethodsSetting = () => {
  methodsVisible.value = true
}
onMounted(async () => {})
</script>

<style scoped lang="less">
.ant-descriptions /deep/ .head-item {
  background-color: #ebebeb !important;
  border: none !important;
}
.showWord {
  color: #2a7900;
  display: block;
  text-align: center;
}
</style>
