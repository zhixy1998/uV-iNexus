<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      :maxCount="maxCount"
      :accept="acceptTypes"
      :before-upload="beforeUpload"
      :customRequest="customRequest"
      @change="handleChange"
    >
      <div>
        <a-button type="primary" class="!flex flex-row items-center">
          <upload-outlined />
          上传文件
        </a-button>
      </div>
    </a-upload>
  </div>
</template>

<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import { message, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import { computed, ref } from 'vue'

const props = defineProps({
  // 允许的文件类型，如 '.doc,.docx,.pdf,.xls,.xlsx'
  acceptTypes: {
    type: String,
    default: '*',
  },
  // 最大文件大小(MB)
  maxSize: {
    type: Number,
    default: 0,
  },
  // 最大文件数量限制
  maxCount: {
    type: Number,
    default: 0, // 0表示不限制
  },
})

// 上传文件
const fileList = ref<any>([])
const loading = ref(false)

// 计算显示的可接受文件类型文本
const acceptTypesText = computed(() => {
  if (props.acceptTypes === '*') return '任意'
  return props.acceptTypes
    .split(',')
    .map((ext) => ext.replace('.', '').toUpperCase())
    .join('/')
})

// 上传前的校验
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // 校验文件数量
  if (props.maxCount > 0 && fileList.value.length >= props.maxCount) {
    message.error(`最多只能上传${props.maxCount}个文件!`)
    return false
  }

  // 校验文件类型
  if (props.acceptTypes !== '*') {
    const isValidType = props.acceptTypes
      .split(',')
      .some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()))
    if (!isValidType) {
      message.error(`只能上传${acceptTypesText.value}格式的文件!`)
      return false
    }
  }
  // 校验文件大小
  if (props.maxSize > 0) {
    const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize
    if (!isLtMaxSize) {
      message.error(`文件大小不能超过${props.maxSize}MB!`)
      return false
    }
  }
  return true
}

// 手动上传
const customRequest = async (options: any) => {
  const { file, onProgress, onSuccess, onError } = options
  setTimeout(() => {
    onSuccess({}, file)
  }, 100)
}

// 上传状态变化处理
const handleChange = (info: UploadChangeParam) => {
  console.log(info)
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    loading.value = false
    message.success(`${info.file.name} 文件上传成功`)
  } else if (info.file.status === 'error') {
    loading.value = false
    message.error(`${info.file.name} 文件上传失败`)
  } else if (info.file.status === 'removed') {
    loading.value = false
    message.success(`${info.file.name} 文件删除成功`)
  }
  // 可以在这里触发父组件的事件
  emit('upload-success', info.fileList)
}

// 删除文件
// const handleRemove = (file: any) => {
//   const index = fileList.value.indexOf(file)
//   if (index !== -1) {
//     fileList.value.splice(index, 1)
//   }
// }

const emit = defineEmits(['upload-success'])

// 暴露方法给父组件
defineExpose({
  getFileList: () => fileList.value,
  clearFiles: () => {
    fileList.value = []
  },
})
</script>

<style lang="less" scoped>
.ant-upload-text {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
</style>
