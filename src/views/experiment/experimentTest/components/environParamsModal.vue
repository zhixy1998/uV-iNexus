<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-modal v-model:open="opneModal" title="环境参数" @ok="handleOk" class="!w-[800px]">
    <a-form ref="ruleFormRef" :model="ruleForm" :rules="ruleFormRules">
      <a-row class="!flex items-center item-box">
        <a-col :span="8">
          <div class="!mb-[24px] !flex items-center">
            <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
            <span class="!font-bold text-[16px] text-[#133379]">提示框弹出情境设置</span>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form-item label="" name="qjsz">
            <a-checkbox-group v-model:value="ruleForm.qjsz" style="width: 100%">
              <a-row>
                <a-col :span="24">
                  <a-checkbox value="1">测量前弹框提示</a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox value="2">测量后弹框提示</a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox value="3">测量后奏提示音</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="!flex items-center item-box">
        <a-col :span="8">
          <div class="!mb-[24px] !flex items-center">
            <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
            <span class="!font-bold text-[16px] text-[#133379]">最近信息显示设置</span>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form-item label="" name="zjrw">
            <div class="flex items-center text-[16px] text-[#595757]">
              <span class="!mr-[5px]">仅显示最近使用的</span>
              <a-input-number v-model:value="ruleForm.zjrw" :min="0" />
              <span class="!ml-[5px]">个任务</span>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="!flex items-center item-box">
        <a-col :span="8">
          <div class="!mb-[24px] !flex items-center">
            <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
            <span class="!font-bold text-[16px] text-[#133379]">结果数据目录设置</span>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form-item label="" name="dclj">
            <div class="flex items-center text-[16px] text-[#595757]">
              <div class="!mr-[5px] flex shrink-0">默认的数据导出路径</div>
              <a-input v-model:value="ruleForm.dclj" placeholder="请输入默认导出路径" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="!flex items-center item-box">
        <a-col :span="8">
          <div class="!mb-[24px] !flex items-center">
            <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
            <span class="!font-bold text-[16px] text-[#133379]">主页显示</span>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form-item label="" name="zyxs">
            <a-checkbox-group v-model:value="ruleForm.zyxs" style="width: 100%">
              <a-row>
                <a-col :span="24">
                  <a-checkbox value="1">显示方法列表</a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox value="2">显示项目统计</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  qjsz: ['1', '2', '3'],
  zjrw: 3,
  dclj: '',
  zyxs: ['1', '2'],
})
const ruleFormRules: Record<string, Rule[]> = {
  qjsz: [{ required: true, message: '请选择提示框弹出情境设置', trigger: ['blur', 'change'] }],
  zjrw: [{ required: true, message: '请输入最近信息显示设置', trigger: ['blur', 'change'] }],
  dclj: [{ required: true, message: '请输入默认导出路径', trigger: ['blur', 'change'] }],
  zyxs: [{ required: true, message: '请选择主页显示', trigger: ['blur', 'change'] }],
}

// 对话框
const opneModal = ref<boolean>(false)
const showModal = () => {
  opneModal.value = true
}
const handleCancel = () => {
  opneModal.value = false
}
const handleOk = async () => {
  ruleFormRef.value
    .validate()
    .then(async () => {})
    .catch(() => {})
}

const emit = defineEmits([])
defineExpose({
  showModal,
})
</script>

<style lang="less" scoped>
.item-box {
  margin-bottom: 20px;
  padding: 25px 40px 0px;
  border-radius: 12px;
  background-color: #f1f1f1;
}

:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 130px;
}

:deep(.ant-checkbox-wrapper) {
  font-size: 16px;
  line-height: 33px;
}
</style>
