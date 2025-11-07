<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-modal v-model:open="opneModal" title="导入" @ok="handleOk" class="!w-[30%]">
    <div class="import-container">
      <a-upload
        :file-list="fileList"
        :maxCount="maxCount"
        :accept="acceptTypes"
        :before-upload="beforeUpload"
        :customRequest="customRequest"
        @change="handleChange"
      >
        <div class="text-[16px]">
          <text>请点击</text>
          <text class="underline cursor-pointer" :style="{ color: primaryColor }">此处</text>
          <text>上传文件</text>
        </div>
        <div class="ant-upload-text">
          <exclamation-circle-outlined />
          <text> 请上传{{ acceptTypesText }}文件</text>
          <text v-if="maxSize">，大小不超过{{ maxSize }}MB</text>
        </div>
      </a-upload>
    </div>

    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, notification, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import { computed, ref } from 'vue'

import { useAppStore } from '@/stores'
import { request } from '@/utils/request'
const { primaryColor } = useAppStore()

const props = defineProps({
  // 是否可以上传多个文件
  maxCount: {
    type: Boolean,
    default: false,
  },
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
  // 导入方法
  importMethod: {
    type: String,
    default: 'post',
  },
  // 导入文件接口地址
  importUrl: {
    type: String,
    default: '',
  },
  // 额外参数
  extraParam: {
    type: Object,
    default: () => ({}),
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
  fileList.value = info.fileList.slice(-1) // 只保留最新上传的文件
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    loading.value = false
    message.success(`${info.file.name} 文件上传成功`)
    // 可以在这里触发父组件的事件
    // emit('upload-success', info.file.response);
  } else if (info.file.status === 'error') {
    loading.value = false
    message.error(`${info.file.name} 文件上传失败`)
  }
}

// 对话框
const opneModal = ref<boolean>(false)
const showModal = () => {
  opneModal.value = true
}
const handleCancel = () => {
  fileList.value = []
  opneModal.value = false
}

const handleOk = async () => {
  // console.log('fileList', fileList.value)
  if (!fileList.value || fileList.value.length === 0) {
    message.error('请先上传文件')
    return
  }
  const rawFile = fileList.value[0].originFileObj || fileList.value[0]
  const formData = new FormData()
  formData.append('file', rawFile)
  formData.append('name', '')
  if (props.extraParam && JSON.stringify(props.extraParam) !== '{}') {
    for (const key in props.extraParam) {
      formData.append(key, props.extraParam[key])
    }
  }
  request({
    method: props.importMethod,
    url: props.importUrl,
    data: formData,
  }).then((res) => {
    emit('import-success', res)
    // if (res.code == 200) opneModal.value = false
    // notification.success({
    //   message: '成功！',
    //   description: res.message || '导入成功！',
    //   duration: 3,
    // })
    // emit('import-success', res)
  })
}

const emit = defineEmits(['import-success'])
defineExpose({
  showModal,
  handleCancel,
})
</script>

<style lang="less" scoped>
.import-container {
  padding: 20px;
}
.ant-upload-text {
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
</style>
