<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!leading-9 text-[16px] !pl-8">
    <div class="detail-card !relative">
      <div class="h2-title">产线用户管理11111111111</div>
      <a-divider :style="{ backgroundColor: primaryColor, margin: '2px' }" />
      <div>
        <div class="flex justify-around !my-5">
          <div class="flex flex-col items-center justify-center" @click="addUserFun">
            <UserAddOutlined class="text-3xl" />
            <span>添加用户</span>
          </div>
          <div class="flex flex-col items-center justify-center" @click="deleteSystemUserFun">
            <UserDeleteOutlined class="text-3xl" />
            <span>删除用户</span>
          </div>
        </div>
        <div class="file-preview !mt-7">
          <div class="file-preview-left">
            <a-tree
              v-model:selectedKeys="selectedKeys"
              :tree-data="treeData"
              show-icon
              defaultExpandAll
              :fieldNames="{ children: 'list' }"
              @select="onNodeSelect"
            >
              <template #title="{ data }">
                <div class="flex flex-row !justify-between !flex-wrap">
                  <div class="text-ellipsis !mr-1">
                    {{ data.userRealName || data.systemIdentityName || data.groupName }}
                  </div>
                </div>
              </template>
            </a-tree>
          </div>
          <div class="file-preview-right">
            <uvForm
              ref="uvFormRef"
              :labelCol="{
                style: { width: '100px' },
              }"
              :formOptions="formOptions"
              :formState="formState"
              :formRules="formRules"
            />
            <div class="flex justify-center">
              <a-button type="primary" @click="handleEdit">保存</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <addUser v-model="addUserVisible" v-if="addUserVisible" @create-user-success="getUserInfoFun" />
  </section>
</template>

<script lang="ts" setup>
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons-vue'
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

import { getGroupInfo, getUserInfo } from '@/api/userManage'
import type { formOptionsType } from '@/types/common'

import { message } from 'ant-design-vue'
import addUser from './components/addUser.vue'
const { primaryColor } = useAppStore()
const selectedKeys = ref(['0-0'])
interface FormStateType {
  projectName: string
  remark: string
  [key: string]: any
}
interface UserInfo {
  userName: string
  userRealName: string
  phone: string
  email: string
  userPosition: string | null
  groupName: string
  groupNo: string
  systemIdentityName: string | null
  systemIdentityId: string
}

import { deleteSystemUser, updateSystemUser } from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
const formOptions = reactive<formOptionsType[]>([
  {
    type: 'input',
    label: '账号',
    props: 'userName',
  },
  {
    type: 'input',
    label: '真实姓名',
    props: 'userRealName',
  },
  {
    type: 'radio',
    label: '系统用户角色',
    props: 'systemIdentityId',
    options: [
      {
        label: '开发人员',
        value: '1',
      },
      {
        label: '产线人员',
        value: '2',
      },
      {
        label: '维修人员',
        value: '3',
      },
      {
        label: '客户',
        value: '4',
      },
    ],
  },
  {
    type: 'input',
    label: '手机号',
    props: 'phone',
  },
  {
    type: 'input',
    label: '邮箱',
    props: 'email',
  },
  {
    type: 'select',
    label: '所属组名',
    props: 'groupNo',
    options: [],
  },
])
const formRules = reactive({})
// 定义包含用户列表的组信息类型，作为树形结构的父节点
interface GroupItem {
  groupName: string
  groupNo: string
  groupDesc: string
  systemIdentityId: number
  isValid: number
  users?: UserInfo[]
}
const uvFormRef = ref<InstanceType<typeof uvForm>>()
const formState = reactive<Partial<UserInfo>>({})
const onNodeSelect = (selectedKeys: any, info: any) => {
  const { node, event } = info

  if (node.userRealName) {
    Object.assign(formState, node.dataRef)
  }
}
const addUserVisible = ref(false)
const treeData = ref<TreeDataItem[]>([
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf', key: '0-0-0' },
      { title: 'leaf', key: '0-0-1' },
    ],
  },
])
const addUserFun = () => {
  addUserVisible.value = true
}
const handleEdit = async () => {
  if (!(await uvFormRef.value?.onSubmit())) return
  console.log(formState, formState)
  const { code, data } = await updateSystemUser(formState)
  if (code === 200) {
    message.success('修改用户成功')
  }
}
const getUserInfoFun = async () => {
  const { code, data } = await getUserInfo()
  if (code === 200) {
    treeData.value = data
  }
}
const deleteSystemUserFun = async () => {
  const { code, data } = await deleteSystemUser({ deleteUserName: formState.userName })
  if (code === 200) {
    message.success('删除用户成功')
    getUserInfoFun()
  }
}
const getGroupInfoFun = async () => {
  const { code, data } = await getGroupInfo()
  if (code === 200) {
    formOptions[4].options = data.map((item: any) => ({
      label: item.groupName,
      value: item.groupNo,
    }))
  }
}
onMounted(() => {
  // fetchUserAndGroupInfo()
  getUserInfoFun()
  getGroupInfoFun()
})
</script>

<style lang="less" scoped>
.file-preview {
  display: flex;
  border: 1px solid rgba(187, 187, 187, 0.7);
  .file-preview-left {
    width: 40%;
    border-right: 1px solid rgba(187, 187, 187, 0.7);
    padding: 20px;
    max-height: 700px;
    overflow-y: auto;
    color: #333;
    line-height: 36px;
  }
  .file-preview-right {
    width: 60%;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
