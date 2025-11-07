<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="数据变换">
      <template #slot-content>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="四则运算">
            <a-row>
              <a-col :span="12" style="line-height: 4.5">
                <div class="flex items-center gap-4">
                  <span class="w-10">源1</span>
                  <div class="flex items-center">
                    <span>本任务</span>
                    <a-select ref="select" v-model:value="value1" class="w-xs !ml-2">
                      <a-select-option value="jack">Jack</a-select-option>
                      <a-select-option value="lucy">Lucy</a-select-option>
                      <a-select-option value="disabled" disabled>Disabled</a-select-option>
                      <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-10">操作</span>
                  <a-radio-group name="radioGroup" v-model:value="formState.type">
                    <a-radio value="1">加</a-radio>
                    <a-radio value="2">减</a-radio>
                    <a-radio value="3">乘</a-radio>
                    <a-radio value="4">除</a-radio>
                  </a-radio-group>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-10">源2</span>
                  <a-radio-group name="radioGroup" v-model:value="formState.type">
                    <a-radio value="1">数值</a-radio>
                    <a-radio value="2">图谱</a-radio>
                  </a-radio-group>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-10">任务</span>
                  <div class="flex items-center gap-4">
                    <span>本任务</span>
                    <a-button @click="handleHistoryTaskDeail">其他任务</a-button>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="w-10">样品</span>
                  <div class="flex items-center">
                    <a-select ref="select" v-model:value="value1" class="w-xs !ml-2">
                      <a-select-option value="jack">样品1</a-select-option>
                      <a-select-option value="lucy">样品2</a-select-option>
                      <a-select-option value="disabled" disabled>Disabled</a-select-option>
                      <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="flex justify-around">
                  <uvHasIconBtn content="取消"> </uvHasIconBtn>
                  <uvHasIconBtn content="确认"> </uvHasIconBtn>
                </div>
              </a-col>
              <a-col :span="12">
                <lineChart :showMark="false" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="高级运算">
            <a-row>
              <a-col :span="12" style="line-height: 4.5">
                <a-radio-group name="radioGroup" v-model:value="formState.type">
                  <a-radio value="1">对数</a-radio>
                  <a-radio value="2">倒数</a-radio>
                </a-radio-group>
                <div class="flex justify-around">
                  <uvHasIconBtn content="取消"> </uvHasIconBtn>
                  <uvHasIconBtn content="确认"> </uvHasIconBtn>
                </div>
              </a-col>
              <a-col :span="12">
                <lineChart :showMark="false" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" tab="谱图平滑">
            <a-row>
              <a-col :span="12" style="line-height: 4.5">
                <div class="flex items-center">
                  <span class="w-20">点数</span>
                  <a-select ref="select" v-model:value="value1" class="w-xs">
                    <a-select-option value="jack">样品1</a-select-option>
                    <a-select-option value="lucy">样品2</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </div>
                <div class="flex items-center">
                  <div class="w-20">系数</div>
                  <a-input ref="select" v-model:value="value1" class="!w-xs"></a-input>
                </div>
                <div class="flex justify-around">
                  <uvHasIconBtn content="取消"></uvHasIconBtn>
                  <uvHasIconBtn content="确认"></uvHasIconBtn>
                </div>
              </a-col>
              <a-col :span="12">
                <lineChart :showMark="false" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="4" tab="谱图微分">
            <a-row>
              <a-col :span="12" style="line-height: 4.5">
                <div class="flex items-center">
                  <span class="w-20">次数</span>
                  <a-select ref="select" v-model:value="value1" class="w-xs">
                    <a-select-option value="jack">样品1</a-select-option>
                    <a-select-option value="lucy">样品2</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </div>
                <div class="flex items-center">
                  <span class="w-20">点数</span>
                  <a-select ref="select" v-model:value="value1" class="w-xs">
                    <a-select-option value="jack">样品1</a-select-option>
                    <a-select-option value="lucy">样品2</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </div>
                <div class="flex items-center">
                  <div class="w-20">系数</div>
                  <a-input ref="select" v-model:value="value1" class="!w-xs"></a-input>
                </div>
                <div class="flex justify-around">
                  <uvHasIconBtn content="取消"></uvHasIconBtn>
                  <uvHasIconBtn content="确认"></uvHasIconBtn>
                </div>
              </a-col>
              <a-col :span="12">
                <lineChart :showMark="false" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="5" tab="光度模式转换">
            <a-row>
              <a-col :span="12" style="line-height: 4.5">
                <a-radio-group name="radioGroup" v-model:value="formState.type">
                  <a-radio :value="item" v-for="item in radioMode" :key="item">{{ item }}</a-radio>
                </a-radio-group>
                <div class="flex justify-around">
                  <uvHasIconBtn content="取消"> </uvHasIconBtn>
                  <uvHasIconBtn content="确认"> </uvHasIconBtn>
                </div>
              </a-col>
              <a-col :span="12">
                <lineChart :showMark="false" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>

        <div class="flex justify-around !mt-5">
          <uvHasIconBtn content="保存" @click="showSaveVisual"> </uvHasIconBtn>
          <uvHasIconBtn content="另存为"> </uvHasIconBtn>
          <uvHasIconBtn content="导出到word"> </uvHasIconBtn>
        </div>
      </template>
    </uvCollapseRightSlot>
  </section>
  <uvModal v-model="saveVisual" size="smail" title="保存">
    <template #content>
      <a-alert
        message="检测到表格标题有修改，如果你希望下一次打开数据时使用新的表格标题，请将参数"
        type="info"
      />
      <br />
      <div class="flex justify-center">
        <uvHasIconBtn content="保存到新方法"></uvHasIconBtn>
      </div>
      <br />
      <div class="flex items-center">
        <div class="w-20">数据名称</div>
        <a-input ref="select" v-model:value="value1" class="w-xs !ml-2"> </a-input>
      </div>
      <br />
    </template>
  </uvModal>
  <historyTaskDetail v-model="showHistoryTask" v-if="showHistoryTask" />
</template>
<script lang="ts" setup>
import { h, reactive, ref } from 'vue'

import lineChart from '@/components/lineChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'

import historyTaskDetail from '../../experimentTest/components/historyTaskDetail.vue'
const value1 = ref('')
const saveVisual = ref(false)
const showHistoryTask = ref(false)
const showSaveVisual = () => {
  saveVisual.value = true
}
const radioMode = ref(['Abs<->T%', 'Abs<->R%'])
const formState = reactive({
  name: '',
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const handleHistoryTaskDeail = () => {
  showHistoryTask.value = true
}
const activeKey = ref('1')
</script>
