<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="rich-text-editor">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="modelValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <!-- 字数统计 -->
    <div v-if="showWordCount" class="editor-footer">
      <span class="word-count">字数: {{ wordCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
// @ts-expect-error: 没有导出模块
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolbarKeys as toolbarKeysTool } from '@/utils/wangEditorConfig'
import formulaModule from '@wangeditor/plugin-formula'
import { Boot } from '@wangeditor/editor'

// 注册插件
Boot.registerModule(formulaModule)

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入内容...',
  },
  height: {
    type: String,
    default: '500px',
  },
  showWordCount: {
    type: Boolean,
    default: true,
  },
  mode: {
    type: String,
    default: 'default',
  },
  toolbarKeys: {
    type: Array,
    default: () => toolbarKeysTool,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  toolbarConfig: {
    type: Object,
    default: () => {},
  },
})
const modelValue = ref(props.modelValue)
const wordCount = ref(0)
watch(
  () => modelValue.value,
  (newValue) => {
    console.log('newValue', newValue)
    if (newValue) wordCount.value = editorRef.value.getText().replace(/\s/g, '').length
  },
)
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {
  toolbarKeys: props.toolbarKeys,
}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  console.log('编辑器已创建', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped lang="less">
.editor-footer {
  padding: 8px 12px;
  border-top: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  text-align: right;
}
</style>
