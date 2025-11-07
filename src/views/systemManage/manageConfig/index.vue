<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="detail-card !relative">
      <div class="detail-card-title">系统管理配置</div>
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
          <div>
            <div class="!mb-3 text-[15px] !font-bold">实验测试设置</div>
            <a-form-item class="!mt-2 !pl-8" label="默认进入经典模式：" name="defaultEnterClassic">
              <a-switch v-model:checked="ruleForm.defaultEnterClassic" />
            </a-form-item>
            <div class="!mt-2 text-[15px] !font-bold">系统端口配置</div>
            <a-form-item class="!mt-2 !pl-8" label="端口配置：" name="globalPort">
              <a-input
                v-model:value="ruleForm.globalPort"
                style="width: 30%"
                placeholder="请输入系统端口"
              />
            </a-form-item>
            <div class="!mt-2 text-[15px] !font-bold">数据库配置信息</div>
            <div class="!mt-2 !pl-8">
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
              <div class="!mb-2 text-[15px] !font-bold">（可选）</div>
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
            </div>
          </div>
        </a-form>
      </div>
      <div class="clear-btn cursor-pointer" @click="handleFactory">
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
      <div class="icon-box">
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

import { querySysManageUserConf, resetDatabaseConf, saveUserDatabaseConf } from '@/api'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

// 表单
const ruleFormRef = ref()
const ruleForm = ref({
  defaultEnterClassic: false,
  globalPort: '',
  mainDatabaseIp: '',
  mainDatabasePort: '',
  spareDatabaseIp: '',
  spareDatabasePort: '',
})
const ruleFormRules: Record<string, Rule[]> = {
  defaultEnterClassic: [
    { required: true, message: '请选择是否默认进入经典模式', trigger: ['blur', 'change'] },
  ],
  globalPort: [{ required: true, message: '请输入系统端口', trigger: ['blur', 'change'] }],
  mainDatabaseIp: [{ required: true, message: '请输入主数据库IP', trigger: ['blur', 'change'] }],
  mainDatabasePort: [
    { required: true, message: '请输入主数据库端口', trigger: ['blur', 'change'] },
  ],
  spareDatabaseIp: [{ required: true, message: '请输入备数据库IP', trigger: ['blur', 'change'] }],
  spareDatabasePort: [
    { required: true, message: '请输入备数据库端口', trigger: ['blur', 'change'] },
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
      const { code, message } = await saveUserDatabaseConf(ruleForm.value)
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
  const { code, data } = await querySysManageUserConf()
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
  width: 180px;
}
</style>
