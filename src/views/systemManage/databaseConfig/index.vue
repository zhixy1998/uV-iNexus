<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">数据库配置</div>
      <div class="detail-card-content !pl-10">
        <a-form
          ref="ruleFormRef"
          :model="ruleForm"
          name="runConfigForm"
          :rules="ruleFormRules"
          :hideRequiredMark="true"
          labelAlign="left"
          autocomplete="off"
        >
          <a-row>
            <a-col span="12">
              <a-form-item label="主数据库IP：" name="mainDatabaseIp">
                <a-input
                  v-model:value="ruleForm.mainDatabaseIp"
                  style="width: 70%"
                  placeholder="请输入主数据库IP"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="主数据库端口：" name="mainDatabasePort">
                <a-input
                  v-model:value="ruleForm.mainDatabasePort"
                  style="width: 70%"
                  placeholder="请输入主数据库端口"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-item label="主数据库用户名：" name="mainDatabaseUsername">
                <a-input
                  v-model:value="ruleForm.mainDatabaseUsername"
                  style="width: 70%"
                  placeholder="请输入主数据库用户名"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="主数据库密码：" name="mainDatabasePassword">
                <a-input
                  v-model:value="ruleForm.mainDatabasePassword"
                  style="width: 70%"
                  type="password"
                  placeholder="请输入主数据库密码"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-item label="备数据库IP：" name="spareDatabaseIp">
                <a-input
                  v-model:value="ruleForm.spareDatabaseIp"
                  style="width: 70%"
                  placeholder="请输入备数据库IP"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="备数据库端口：" name="spareDatabasePort">
                <a-input
                  v-model:value="ruleForm.spareDatabasePort"
                  style="width: 70%"
                  placeholder="请输入备数据库端口"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-item label="备数据库用户名：" name="spareDatabaseUsername">
                <a-input
                  v-model:value="ruleForm.spareDatabaseUsername"
                  style="width: 70%"
                  placeholder="请输入备数据库用户名"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="备数据库密码：" name="spareDatabasePassword">
                <a-input
                  v-model:value="ruleForm.spareDatabasePassword"
                  style="width: 70%"
                  type="password"
                  placeholder="请输入备数据库密码"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="clear-btn cursor-pointer" @click="handleFactory">
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
      <div class="icon-box gap-10">
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { UndoOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { onMounted, ref } from 'vue'

import { getDatabaseConf, resetDatabaseConf, saveDatabaseConf } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  mainDatabaseIp: '',
  mainDatabasePort: '',
  mainDatabaseUsername: '',
  mainDatabasePassword: '',
  spareDatabaseIp: '',
  spareDatabasePort: '',
  spareDatabaseUsername: '',
  spareDatabasePassword: '',
})
const ruleFormRules: Record<string, Rule[]> = {
  mainDatabaseIp: [{ required: true, message: '请输入主数据库IP', trigger: ['blur', 'change'] }],
  mainDatabasePort: [
    { required: true, message: '请输入主数据库端口', trigger: ['blur', 'change'] },
  ],
  mainDatabaseUsername: [
    { required: true, message: '请输入主数据库用户名', trigger: ['blur', 'change'] },
  ],
  mainDatabasePassword: [
    { required: true, message: '请输入主数据库密码', trigger: ['blur', 'change'] },
  ],
  spareDatabaseIp: [{ required: true, message: '请输入备数据库IP', trigger: ['blur', 'change'] }],
  spareDatabasePort: [
    { required: true, message: '请输入备数据库端口', trigger: ['blur', 'change'] },
  ],
  spareDatabaseUsername: [
    { required: true, message: '请输入备数据库用户名', trigger: ['blur', 'change'] },
  ],
  spareDatabasePassword: [
    { required: true, message: '请输入备数据库密码', trigger: ['blur', 'change'] },
  ],
}

// 恢复出厂设置
const handleFactory = async () => {
  const { code, message } = await resetDatabaseConf()
  if (code === 200) {
    notification.success({
      message: '成功',
      description: message,
      duration: 3,
    })
    await getDetail()
  }
}
// 保存
const handleSubmit = () => {
  ruleFormRef.value
    .validate()
    .then(async () => {
      const { code, message } = await saveDatabaseConf(ruleForm.value)
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: message,
          duration: 3,
        })
        await getDetail()
      }
    })
    .catch(() => {})
}

const getDetail = async () => {
  const { code, data } = await getDatabaseConf()
  if (code === 200) {
    ruleForm.value = {
      ...data,
    }
  }
}

onMounted(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.icon-box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-btn {
  position: absolute;
  top: 15px;
  right: 30px;
}

.detail-box {
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }
  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
  }
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
</style>
