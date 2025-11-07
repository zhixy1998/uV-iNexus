<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <a-modal v-model:open="modelValue" title="提示" width="600px" :closable="false">
      <a-form :model="ruleForm" :rules="rules" ref="formRef" class="!text-[15px]">
        <template v-if="pageType === 'methodParams'">
          <!-- 自定义方法参数 -->
          <template v-if="ruleForm.clearDataRange === 'noChange'">
            <div>方法参数没有变化，无需重新应用!</div>
          </template>
          <template
            v-else-if="ruleForm.clearDataRange === 'analyze' || ruleForm.clearDataRange === 'curve'"
          >
            <div>
              检测到您修改了{{
                ruleForm.clearDataRange === 'analyze' ? '分析' : '曲线'
              }}参数，将为您生成新方法，请选择数据处理方式：
            </div>
            <a-form-item name="isSaveDraft">
              <a-radio-group v-model:value="ruleForm.isSaveDraft">
                <a-radio :style="radioStyle" :value="false">新方法直接应用到当前数据</a-radio>
                <a-radio :style="radioStyle" :value="true">保存当前数据并生成新数据</a-radio>
              </a-radio-group>
            </a-form-item>
          </template>
          <template v-else-if="ruleForm.clearDataRange === 'measure'">
            <div>
              检测到您修改了测量参数，将为您生成新方法新文件数据，是否保存当前未保存的数据：
            </div>
            <a-form-item name="isSaveDraft">
              <a-radio-group v-model:value="ruleForm.isSaveDraft">
                <a-radio :style="radioStyle" :value="true">是</a-radio>
                <a-radio :style="radioStyle" :value="false">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </template>
        </template>
        <template v-else>
          <!-- 历史方法 -->
          <template v-if="ruleForm.clearDataRange === 'noChange'">
            <div>当前参数与该方法参数一致，是否应用到当前数据：</div>
            <a-form-item name="isSaveDraft">
              <a-radio-group v-model:value="ruleForm.isSaveDraft">
                <a-radio :style="radioStyle" :value="false">是</a-radio>
                <a-radio :style="radioStyle" :value="true">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </template>
          <template v-else-if="ruleForm.clearDataRange === 'analyze'">
            <div>新方法与当前方法分析参数不一致，请选择数据处理方式：</div>
            <a-form-item name="isSaveDraft">
              <a-radio-group v-model:value="ruleForm.isSaveDraft">
                <a-radio :style="radioStyle" :value="false">直接应用新方法参数到当前数据</a-radio>
                <a-radio :style="radioStyle" :value="true">保存当前数据并生成新文件数据</a-radio>
              </a-radio-group>
            </a-form-item>
          </template>
          <template v-else-if="ruleForm.clearDataRange === 'measure'">
            <div>
              新方法与当前方法测量参数不一致，将为您生成新文件数据，是否保存当前未保存的数据：
            </div>
            <a-form-item name="isSaveDraft">
              <a-radio-group v-model:value="ruleForm.isSaveDraft">
                <a-radio :style="radioStyle" :value="true">是</a-radio>
                <a-radio :style="radioStyle" :value="false">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </template>
        </template>
      </a-form>
      <template #footer>
        <template v-if="pageType === 'methodParams' && ruleForm.clearDataRange === 'noChange'">
          <a-button type="primary" @click="closeModel">知道了</a-button>
        </template>
        <template v-else>
          <a-button @click="closeModel">取消</a-button>
          <a-button type="primary" @click="handleOk">确定 </a-button>
        </template>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
const radioStyle = reactive({
  display: 'flex',
  // fontSize: '17px',
  marginTop: '17px',
})

/******************************* 表单 ******************************/
const formRef = ref()
const ruleForm = ref({
  isSaveDraft: null,
  clearDataRange: '',
  newMethodId: '',
})
const rules = reactive({
  isSaveDraft: [{ required: true, message: '请选择', trigger: 'change' }],
})

/****************************** 对话框 *****************************/
const modelValue = ref(false)
const emit = defineEmits(['update:modelValue'])
const handleOk = async () => {
  formRef.value
    .validate()
    .then(() => {
      if (
        pageType.value !== 'methodParams' &&
        ruleForm.value.clearDataRange === 'noChange' &&
        ruleForm.value.isSaveDraft
      ) {
        closeModel()
      } else emit('update:modelValue', pageType.value, ruleForm.value)
    })
    .catch()
}
const closeModel = () => {
  modelValue.value = false
}
const pageType = ref('')
const showModel = (newClearDataRange: string, type: string, newMethodId: string) => {
  // clearDataRange：哪个参数类型改变了  measure测量参数  analyze分析参数  noChange没有变化
  ruleForm.value.clearDataRange = newClearDataRange
  ruleForm.value.newMethodId = newMethodId
  // pageType：哪个页面触发的  methodParams：自定义方法参数  historyMethod：历史方法
  pageType.value = type
  modelValue.value = true
}
defineExpose({
  showModel,
  closeModel,
})
</script>
