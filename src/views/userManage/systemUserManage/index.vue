<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!leading-9 text-[16px] !pl-8">
    <div class="detail-card !relative">
      <div class="">{{ title }}</div>
      <div>
        <!-- 操作按钮区 -->
        <div class="flex justify-around !my-5">
          <div class="flex flex-col items-center justify-center" @click="addUserFun">
            <UserAddOutlined class="text-3xl cursor-pointer" />
            <span>添加用户</span>
          </div>
          <div
            class="flex flex-col items-center justify-center"
            @click="deleteTargetFun"
            :style="{
              opacity: selectedNode?.type !== 'user' ? 0.5 : 1,
              cursor: selectedNode?.type !== 'user' ? 'not-allowed' : 'pointer',
            }"
          >
            <!-- <UserDeleteOutlined class="text-3xl" /> -->
            <IconFont type="icon-UserDeleteOutlined-copy" class="text-3xl" />
            <span style="color: #d81e06">删除用户</span>
          </div>
        </div>

        <!-- 树形+表单区域 -->
        <div class="file-preview !mt-7">
          <!-- 左侧树形 -->
          <div class="file-preview-left">
            <!-- defaultExpandAll 默认树展开 -->
            <a-tree
              style="padding: 20px 40px"
              v-if="treeData.length"
              v-model:selectedKeys="selectedKeys"
              :tree-data="treeData"
              ref="treeRef"
              show-icon
              @select="onNodeSelect"
            >
              <template #title="{ data }">
                <div class="flex flex-row items-center !justify-start">
                  <IconFont type="icon-icon" v-if="data.type === 'role'" class="" />
                  <IconFont type="icon-users" v-else-if="data.type === 'group'" class="" />
                  <IconFont type="icon-yonghu" v-else-if="data.type === 'user'" class="" />
                  <span class="text-ellipsis !ml-2">{{ data.label }}</span>
                </div>
              </template>
            </a-tree>
            <div v-else class="flex items-center justify-center h-[200px] text-gray-500">
              暂无数据
            </div>
          </div>

          <!-- 右侧详情表单 -->
          <div class="file-preview-right">
            <!-- 无选择提示 -->
            <div
              v-if="!hasSelectedNode"
              class="flex items-center justify-center h-[200px] text-gray-500"
            >
              请点击左侧节点查看详情
            </div>

            <!-- 有选择时显示详情 -->
            <div v-else>
              <!-- 小组加载状态 -->
              <div v-if="isLoadingGroups" class="text-gray-500 mb-4">
                <LoadingOutlined spin /> 加载小组列表中...
              </div>

              <!-- 详情表单（角色/小组/用户分别适配） -->
              <uvForm
                :key="formRenderKey"
                ref="uvFormRef"
                :labelCol="{ style: { width: '150px' } }"
                :formOptions="formOptions"
                :formState="formState"
                :formRules="formRules"
                @change="handleFormChange"
              />

              <!-- 仅用户节点显示保存按钮 -->
              <div v-if="selectedNode?.type === 'user'" class="flex justify-center mt-6">
                <a-button type="primary" @click="handleSave">保存修改</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增用户弹窗 -->
    <addUser
      v-model="addUserVisible"
      :tree-roles="treeRoles"
      @create-user-success="getUserInfoFun"
    />
  </section>
</template>

<script lang="ts" setup>
// 1. 依赖引入
import {
  deleteSystemUserNew,
  getGroupsByRoleId,
  getUserInfoNew,
  updateSystemUser,
} from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import type { formOptionsType } from '@/types/common'
import { IconFont } from '@/utils/iconfont'
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import addUser from './components/addUser.vue'

// 2. 类型定义
interface FormStateType {
  id?: string | number
  status?: string | number
  roleName?: string
  roleCode?: string
  groupName?: string
  description?: string
  roleId?: string | number
  username?: string
  password?: string
  realName?: string
  phone?: string
  email?: string
  groupId?: string | number
}

interface UserType {
  id: string | number
  username: string
  password?: string
  realName: string
  phone: string
  email?: string
  status: number
  roleId?: string | number
  groupId?: string | number
}
interface RoleType {
  id: string | number
  roleName: string
  roleCode: string
  status: number
  groupList: GroupType[]
}
interface GroupType {
  id: string | number
  groupName: string
  description: string
  status: number
  roleId?: string | number
  userList: UserType[]
}
interface TreeNode extends TreeDataItem {
  type: 'role' | 'group' | 'user'
  label: string
  rawData: RoleType | GroupType | UserType
  children?: TreeNode[]
  key: string
}

interface RoleOptionType {
  label: string
  value: string
}
interface GroupOptionType {
  label: string
  value: string
}

// 3. 响应式状态
const { systemIdentityId } = useUserStore()
const { primaryColor } = useAppStore()

// 树形相关
const treeRef = ref<any>(null)
const treeData = ref<TreeNode[]>([])
const selectedKeys = ref<string[]>([])
const selectedNode = ref<TreeNode | null>(null)
const allNodes = ref<Record<string, TreeNode>>({})

// 表单相关
type UvFormInstance = InstanceType<typeof uvForm>
const uvFormRef = ref<UvFormInstance | null>(null)
const formState = reactive<FormStateType>({})
const formRenderKey = ref<number>(0) // 用于强制刷新表单
const title = ref<string>('')

// 角色/小组相关
const treeRoles = ref<RoleOptionType[]>([])
const tempGroups = ref<GroupOptionType[]>([])
const isLoadingGroups = ref<boolean>(false)
const currentUserId = ref<string | number | null>(null)

// 新增弹窗相关
const addUserVisible = ref<boolean>(false)

// 4. 计算属性
const hasSelectedNode = computed(() => !!selectedNode.value?.type)

// 角色下拉数据（从树形提取）
const roleOptions = computed<RoleOptionType[]>(() => {
  return treeRoles.value.map((role) => ({ label: role.label, value: role.value }))
})

// 角色详情表单（禁用所有字段，仅查看）
const roleFormOptions = computed<formOptionsType[]>(() => [
  // { type: 'input', label: '角色ID', props: 'id', disabled: true },
  { type: 'input', label: '角色名称', props: 'roleName', disabled: true },
  { type: 'input', label: '角色编码', props: 'roleCode', disabled: true },
  {
    type: 'radio',
    label: '状态',
    props: 'status',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
    disabled: true,
  },
])

// 小组详情表单（禁用所有字段，仅查看）
const groupFormOptions = computed<formOptionsType[]>(() => [
  { type: 'input', label: '小组名称', props: 'groupName', disabled: true },
  { type: 'input', label: '小组描述', props: 'description', disabled: true },
  {
    type: 'select',
    label: '关联角色',
    props: 'roleId',
    options: roleOptions.value,
    disabled: true,
  },
  {
    type: 'radio',
    label: '状态',
    props: 'status',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
    disabled: true,
  },
])

// 用户详情表单（可修改，切换角色重置小组）
const userFormOptions = computed<formOptionsType[]>(() => [
  { type: 'input', label: '账号', props: 'username', required: true, disabled: true },
  // {
  //   type: 'password',
  //   label: '密码',
  //   props: 'password',
  //   required: ({ formState }: { formState: FormStateType }) => !formState.id,
  //   placeholder: formState.id ? '不修改请留空' : '至少6个字符',
  // },
  { type: 'input', label: '真实姓名', props: 'realName', required: true },
  {
    type: 'select',
    label: '关联角色',
    props: 'roleId',
    options: roleOptions.value,
    required: true,
    showSearch: true,
    filterOption: (input: string, option: any) =>
      option.label.toLowerCase().includes(input.toLowerCase()),
  },
  {
    type: 'select',
    label: '所属小组',
    props: 'groupId',
    options: tempGroups.value,
    required: true,
    disabled: isLoadingGroups.value || !formState.roleId,
    placeholder: '请先选择关联角色',
    // 关键：用角色ID+渲染Key确保切换角色时重新渲染
    key: `edit-group-${formState.roleId || ''}-${formRenderKey.value}`,
    showSearch: true,
    filterOption: (input: string, option: any) =>
      option.label.toLowerCase().includes(input.toLowerCase()),
  },
  { type: 'input', label: '手机号', props: 'phone' },
  { type: 'input', label: '邮箱', props: 'email' },
  {
    type: 'radio',
    label: '账号状态',
    props: 'status',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
    required: true,
  },
])

// 动态切换表单配置
const formOptions = computed<formOptionsType[]>(() => {
  switch (selectedNode.value?.type) {
    case 'role':
      return roleFormOptions.value
    case 'group':
      return groupFormOptions.value
    case 'user':
      return userFormOptions.value
    default:
      return []
  }
})

// 5. 表单校验规则
const formRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 50, message: '账号长度3-50字符', trigger: 'blur' },
  ],
  password: [
    {
      required: ({ formState }: { formState: FormStateType }) => !formState.id,
      message: '新增用户必须输入密码',
      trigger: 'blur',
    },
    { min: 6, message: '密码长度≥6字符', trigger: 'blur' },
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/,
      message: '真实姓名仅支持中文/字母',
      trigger: 'blur',
    },
  ],
  roleId: [{ required: true, message: '请选择关联角色', trigger: 'change' }],
  groupId: [{ required: true, message: '请选择所属小组', trigger: 'change' }],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur', required: true },
  ],
  email: [{ type: 'email', message: '请输入正确邮箱', trigger: 'blur', required: false }],
})

// 6. 核心工具函数
/** 构建树形节点映射 */
const buildNodeMap = (nodes: TreeNode[]) => {
  const map: Record<string, TreeNode> = {}
  const traverse = (nodeList: TreeNode[]) => {
    nodeList.forEach((node) => {
      map[node.key] = node
      if (node.children && node.children.length) traverse(node.children)
    })
  }
  traverse(nodes)
  return map
}

/** 转换数据为树形结构 */
const convertToTreeData = (roleDataList: RoleType[]): TreeNode[] => {
  // 提取角色下拉数据
  treeRoles.value = roleDataList.map((role) => ({
    label: role.roleName,
    value: String(role.id),
  }))

  return roleDataList.map((roleData) => {
    const roleNode: TreeNode = {
      key: `role-${String(roleData.id)}`,
      type: 'role',
      label: roleData.roleName,
      rawData: { ...roleData },
      children: [],
    }

    if (roleData.groupList && roleData.groupList.length) {
      roleNode.children = roleData.groupList.map((group) => {
        const groupNode: TreeNode = {
          key: `group-${String(group.id)}`,
          type: 'group',
          label: group.groupName,
          rawData: { ...group, roleId: roleData.id },
          children: [],
        }

        if (group.userList && group.userList.length) {
          groupNode.children = group.userList.map((user) => ({
            key: `user-${String(user.id)}`,
            type: 'user',
            label: user.realName,
            rawData: { ...user, roleId: roleData.id, groupId: group.id },
          }))
        }
        return groupNode
      })
    }
    return roleNode
  })
}

/** 加载小组数据（详情页专用） */
const loadGroupsByRoleId = async (roleId: string | number) => {
  if (!roleId || isLoadingGroups.value) return

  isLoadingGroups.value = true
  tempGroups.value = [] // 清空旧小组数据
  formState.groupId = '' // 清空小组选择

  try {
    const { code, data } = await getGroupsByRoleId(String(roleId))
    if (code === 200) {
      tempGroups.value = data
        .filter((g: any) => g.status === 1)
        .map((g: any) => ({ label: g.groupName, value: String(g.id) }))
    } else {
      message.error('加载小组失败: ' + (data?.message || '未知错误'))
    }
  } catch (error) {
    console.error('详情页加载小组错误:', error)
    message.error('加载小组失败，请重试')
  } finally {
    isLoadingGroups.value = false
    await nextTick()
  }
}

// 7. 核心业务逻辑
const getUserInfoFun = async () => {
  if (!systemIdentityId) {
    message.warning('未获取到用户身份，请重新登录')
    return
  }

  try {
    const { code, data } = await getUserInfoNew(String(systemIdentityId))
    if (code === 200) {
      treeData.value = convertToTreeData(data || [])
      allNodes.value = buildNodeMap(treeData.value)
      console.log('用户树形数据：', data[0])
      if (data[0] && data[0].roleCode) {
        if (data[0].roleCode === 'PRODUCTION_STAFF') {
          title.value = '产线用户管理'
        } else if (data[0].roleCode === 'SYSTEM_USER_MANAGEMENT') {
          title.value = '系统用户管理'
        } else {
          title.value = '用户管理'
        }
      }
    } else {
      title.value = '用户管理'
    }
  } catch (error) {
    message.error('获取数据失败，请刷新页面')
    title.value = '用户管理'
  } finally {
  }
}

/** 重置表单 */
const resetForm = () => {
  Object.keys(formState).forEach((key) => delete formState[key as keyof FormStateType])
  tempGroups.value = []
  formRenderKey.value += 1
  currentUserId.value = null
}

/** 节点选择（回显详情） */
const onNodeSelect = async (_selectedKeys: string[], info: any) => {
  const { node } = info
  const currentNode = node.dataRef as TreeNode
  selectedNode.value = currentNode
  selectedKeys.value = _selectedKeys
  resetForm() // 切换节点时重置表单

  const rawData = JSON.parse(JSON.stringify(currentNode.rawData))
  formState.id = rawData.id ? String(rawData.id) : undefined
  formState.status = rawData.status !== undefined ? String(rawData.status) : '1'

  // 按节点类型回显数据
  switch (currentNode.type) {
    case 'role': {
      const roleData = rawData as RoleType
      formState.roleName = roleData.roleName
      formState.roleCode = roleData.roleCode
      break
    }
    case 'group': {
      const groupData = rawData as GroupType
      formState.groupName = groupData.groupName
      formState.description = groupData.description || ''
      formState.roleId = groupData.roleId ? String(groupData.roleId) : ''
      await loadGroupsByRoleId(formState.roleId) // 加载关联角色的小组（仅查看）
      break
    }
    case 'user': {
      const userData = rawData as UserType
      currentUserId.value = userData.id
      formState.username = userData.username
      formState.realName = userData.realName
      formState.phone = userData.phone || ''
      formState.email = userData.email || ''
      formState.roleId = userData.roleId ? String(userData.roleId) : ''
      const userGroupId = userData.groupId ? String(userData.groupId) : ''

      // 加载用户原有角色的小组，并回显原有小组
      await loadGroupsByRoleId(formState.roleId)
      if (userGroupId && tempGroups.value.some((g) => g.value === userGroupId)) {
        formState.groupId = userGroupId
      }
      break
    }
  }
}

/** 表单变化处理（核心：用户角色切换重置小组） */
const handleFormChange = async (key: string, value: any) => {
  // 仅处理用户节点的角色切换
  if (selectedNode.value?.type === 'user' && key === 'roleId' && value !== formState.roleId) {
    formState.roleId = value
    formRenderKey.value += 1 // 强制刷新表单
    await loadGroupsByRoleId(value) // 加载新角色的小组（自动清空旧选择）
  }
}

/** 保存修改 */
const handleSave = async () => {
  if (!uvFormRef.value || selectedNode.value?.type !== 'user' || !formState.id) {
    message.warning('请选择有效的用户节点')
    return
  }

  const validateSuccess = await uvFormRef.value.onSubmit()
  if (!validateSuccess) return

  const submitData: Record<string, any> = {
    ...formState,
    status: Number(formState.status) || 1,
    id: String(formState.id),
    roleId: formState.roleId ? String(formState.roleId) : '',
    groupId: formState.groupId ? String(formState.groupId) : '',
  }
  if (formState.id && submitData.password === '') delete submitData.password

  try {
    const { code } = await updateSystemUser(submitData)
    if (code === 200) {
      message.success('修改成功')
      getUserInfoFun()
    } else {
      message.error('修改失败')
    }
  } catch (error) {
    message.error('修改失败，请检查网络')
  }
}

/** 删除用户 */
const deleteTargetFun = async () => {
  if (selectedNode.value?.type !== 'user' || !currentUserId.value) {
    message.warning('仅支持删除用户节点')
    return
  }

  if (!window.confirm('确定删除该用户吗？删除后不可恢复！')) return

  try {
    const { code } = await deleteSystemUserNew(String(currentUserId.value))
    if (code === 200) {
      message.success('删除成功')
      getUserInfoFun()
      resetForm()
      selectedKeys.value = []
      selectedNode.value = null
    } else {
      message.error('删除失败')
    }
  } catch (error) {
    message.error('删除失败，请检查网络')
  }
}

/** 打开新增弹窗 */
const addUserFun = () => {
  addUserVisible.value = true
  // 打开弹窗不影响详情页状态（完全隔离）
}

// 8. 初始化
onMounted(() => {
  getUserInfoFun()

  // 监听角色变化（额外保障）
  watch(
    () => formState.roleId,
    async (newVal, oldVal) => {
      if (selectedNode.value?.type === 'user' && newVal && newVal !== oldVal) {
        await loadGroupsByRoleId(newVal)
      }
    },
  )
  console.log(11111111111111, router)
})
</script>

<style lang="less" scoped>
.file-preview {
  display: flex;
  border: 1px solid rgba(187, 187, 187, 0.7);
  border-radius: 4px;
  overflow: hidden;
  /* 外层容器不再固定高度，由子元素高度决定 */
}

.file-preview-left {
  width: 40%;
  border-right: 1px solid rgba(187, 187, 187, 0.7);
  // padding: 20px;
  /* 移除固定最大高度，改为最小高度和自适应 */
  min-height: 200px; /* 设置最低高度，可根据需求调整 */
  height: auto; /* 高度自动，由内容撑开 */
  overflow-y: auto; /* 内容超出最低高度时出现滚动条 */
  color: #333;
  line-height: 36px;
  background: #fff;

  // 树形节点样式优化
  ::v-deep .ant-tree-node-content-wrapper {
    padding: 4px 2px;
    border-radius: 4px;
    margin-bottom: 2px;

    &:hover {
      background-color: #f0f7ff;
    }
  }
}

.file-preview-right {
  width: 60%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background: #fff;
  /* 右侧也设置最小高度，和左侧保持视觉协调，可根据需求调整 */
  min-height: 200px;
  height: auto;
  overflow-y: auto;
}

::v-deep .ant-tree-node-selected {
  background-color: rgba(24, 144, 255, 0.1) !important;
  color: #1890ff !important;
  border-radius: 4px;
}

::v-deep .ant-form-item {
  margin-bottom: 20px;
}
::v-deep .ant-input,
::v-deep .ant-select-selector {
  height: 38px;
  border-radius: 4px;
}
::v-deep .ant-form-item-label > label {
  font-size: 16px;
  color: #666;
}
::v-deep .ant-btn-primary {
  background: #1890ff;
  border-color: #1890ff;
  padding: 0 20px;
  font-size: 16px;
}

::v-deep .ant-tree-title {
  font-size: 18px;
}

::v-deep .ant-form label {
  font-size: 15px;
}

::v-deep .ant-form-item-label {
  width: 100px !important;
}
</style>
