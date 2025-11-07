<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container-gap">
    <div class="detail-card !relative">
      <div class="detail-card-title">用户权限管理</div>
      <div>
        <!-- 操作按钮区：新增修改删除组按钮 + 原有用户操作 -->
        <div class="flex justify-around !my-5">
          <!-- 新增组 -->
          <div class="flex flex-col items-center justify-center" @click="handleAddGroup">
            <IconFont type="icon-xinzengxiaozu" class="text-3xl cursor-pointer" />
            <span>添加组</span>
          </div>
          <!-- 删除组：仅选中小组节点可点击 -->
          <div
            class="flex flex-col items-center justify-center"
            @click="handleDeleteGroup"
            :style="{
              opacity: selectedNode?.type === 'group' ? 1 : 0.5,
              cursor: selectedNode?.type === 'group' ? 'pointer' : 'not-allowed',
            }"
          >
            <IconFont type="icon-shanchuzu" class="text-4xl" />
            <span style="color: #d81e06">删除组</span>
          </div>
          <!-- 原有用户操作 -->
          <div class="flex flex-col items-center justify-center" @click="handleAddUser">
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
            <IconFont type="icon-UserDeleteOutlined-copy" class="text-3xl" />
            <span style="color: #d81e06">删除用户</span>
          </div>
          <div class="flex flex-col items-center justify-center" @click="handleExportPdf">
            <IconFont type="icon-ico_pdf" class="text-3xl cursor-pointer" />
            <span>输出PDF</span>
          </div>
        </div>

        <!-- 树形+表单&权限区域（原有逻辑不变） -->
        <div class="file-preview !mt-7">
          <!-- 左侧树形 -->
          <div class="file-preview-left">
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

          <!-- 右侧详情+权限区域 -->
          <div class="file-preview-right">
            <!-- 无选择提示 -->
            <div
              v-if="!hasSelectedNode"
              class="flex items-center justify-center h-[200px] text-gray-500"
            >
              请点击左侧节点查看详情
            </div>

            <!-- 有选择时显示详情和权限 -->
            <div v-else class="flex flex-col h-full">
              <!-- 详情与权限切换卡头 -->
              <div class="flex border-b border-gray-200">
                <div
                  class="px-4 py-2 cursor-pointer font-medium"
                  :class="{
                    'text-primary border-b-2 border-primary bg-custom-blue': tabKey === 'detail',
                  }"
                  @click="tabKey = 'detail'"
                >
                  节点详情
                </div>
                <div
                  class="px-4 py-2 font-medium"
                  :class="{
                    'text-primary border-b-2 border-primary bg-custom-blue':
                      tabKey === 'permission',
                    'text-gray-400 cursor-not-allowed': selectedNode?.type === 'role',
                    'cursor-pointer': selectedNode?.type !== 'role',
                  }"
                  @click="
                    () => {
                      if (selectedNode?.type !== 'role') {
                        tabKey = 'permission'
                        fetchPermissionTree()
                      }
                    }
                  "
                >
                  权限设置
                </div>
                <div
                  class="px-4 py-2 font-medium"
                  :class="{
                    'text-primary border-b-2 border-primary bg-custom-blue': tabKey === 'operation',
                    'text-gray-400 cursor-not-allowed': selectedNode?.type === 'role',
                    'cursor-pointer': selectedNode?.type !== 'role',
                  }"
                  @click="
                    () => {
                      if (selectedNode?.type !== 'role') {
                        tabKey = 'operation'
                        fetchPermissionTree()
                      }
                    }
                  "
                >
                  操作权限设置
                </div>
              </div>

              <!-- 详情区域 -->
              <div v-if="tabKey === 'detail'" class="flex-1 overflow-y-auto p-4">
                <div v-if="isLoadingGroups" class="text-gray-500 mb-4">
                  <LoadingOutlined spin /> 加载小组列表中...
                </div>
                <uvForm
                  :key="formRenderKey"
                  ref="uvFormRef"
                  :labelCol="{ style: { width: '150px' } }"
                  :formOptions="formOptions"
                  :formState="formState"
                  :formRules="formRules"
                  @change="handleFormChange"
                />
                <div v-if="selectedNode?.type === 'user'" class="flex justify-center mt-6">
                  <a-button type="primary" @click="handleSave">保存人员修改</a-button>
                </div>
                <div v-else-if="selectedNode?.type === 'group'" class="flex justify-center mt-6">
                  <a-button type="primary" @click="handleSave">保存小组修改</a-button>
                </div>
              </div>

              <!-- 权限设置区域 -->
              <div v-else-if="tabKey === 'permission'" class="permission-setting-container">
                <div class="permission-category-group !mb-2">
                  <button
                    v-for="(item, index) in permissionCategories"
                    :key="index"
                    class="permission-category-btn"
                    :class="{ active: activeCategory === index }"
                    @click="activeCategory = index"
                  >
                    {{ item }}
                  </button>
                </div>
                <div class="permission-tree-wrapper">
                  <!-- <div v-if="isLoadingPermission" class="flex items-center justify-center p-4">
                    <LoadingOutlined spin /> 加载权限中...
                  </div> -->
                  <a-tree
                    v-model:checkedKeys="checkedKeys"
                    :tree-data="permissionTreeData"
                    checkable
                    show-icon
                  />
                </div>
                <div class="permission-save-area">
                  <a-button type="primary" @click="handlePermissionSave">保存权限设置</a-button>
                </div>
              </div>
              <div v-else class="permission-setting-container">
                <div class="permission-category-group !mb-2">
                  <button
                    v-for="(item, index) in permissionCategories"
                    :key="index"
                    class="permission-category-btn"
                    :class="{ active: activeCategory === index }"
                    @click="activeCategory = index"
                  >
                    {{ item }}
                  </button>
                </div>
                <div class="permission-tree-wrapper">
                  <!-- <div v-if="isLoadingPermission" class="flex items-center justify-center p-4">
                    <LoadingOutlined spin /> 加载权限中...
                  </div> -->
                  <a-tree
                    v-model:checkedKeys="checkedKeys"
                    :tree-data="permissionTreeData"
                    checkable
                    show-icon
                  />
                </div>
                <div class="permission-save-area">
                  <a-button type="primary" @click="handlePermissionSave">保存权限设置</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <auditTrail
        v-model="addUserVisible"
        :tree-roles="treeRoles"
        @create-user-success="getUserInfoFun"
      />
    </div>

    <!-- 弹窗组件：新增用户（窄版）、新增组、修改组 -->
    <addUser
      v-model="addUserVisible"
      :tree-roles="treeRoles"
      @create-user-success="getUserInfoFun"
    />
    <addGroup
      v-model="addGroupVisible"
      :tree-roles="treeRoles"
      @create-group-success="getUserInfoFun"
    />
  </section>
</template>
<script lang="ts" setup>
// 1. 依赖引入：基础依赖 + 小组接口
import {
  deleteGroup,
  deleteSystemUserNew,
  getGroupsByRoleId,
  getPermissionTreeData,
  getUserInfoNew,
  updateGroup,
  updateGroupPerm,
  updateSystemUser,
} from '@/api/userManage'
import uvForm from '@/components/uvForm/index.vue'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import type { formOptionsType } from '@/types/common'
import { IconFont } from '@/utils/iconfont'
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

// 2. 组件引入：新增用户、新增组、修改组
import addGroup from './components/addGroup.vue'
import addUser from './components/addUser.vue'
import auditTrail from './components/auditTrail.vue'
// import editGroup from './components/editGroup.vue'

// 3. 类型定义（含小组类型）
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

// 小组类型
interface GroupType {
  id: string | number
  groupName: string
  description: string
  status: number
  roleId?: string | number
  userList: UserType[]
}
// 用户/角色类型
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
// 树形节点类型
interface TreeNode extends TreeDataItem {
  type: 'role' | 'group' | 'user'
  label: string
  rawData: RoleType | GroupType | UserType
  children?: TreeNode[]
  key: string
}

// 下拉选项类型
interface RoleOptionType {
  label: string
  value: string
}
interface GroupOptionType {
  label: string
  value: string
}
// 权限树类型
interface PermissionTreeNode {
  title: string
  key: string
  children?: PermissionTreeNode[]
  checkable?: boolean
  icon?: string
}

// 4. 响应式状态（新增组弹窗控制）
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
const formRenderKey = ref<number>(0) // 强制刷新表单

// 角色/小组相关
const treeRoles = ref<RoleOptionType[]>([])
const tempGroups = ref<GroupOptionType[]>([])
const isLoadingGroups = ref<boolean>(false)
const currentUserId = ref<string | number | null>(null)

// 弹窗控制（新增用户/组、修改组）
const addUserVisible = ref<boolean>(false)
const addGroupVisible = ref<boolean>(false)
const editGroupVisible = ref<boolean>(false)

// 标签页切换
const tabKey = ref<'detail' | 'permission' | 'operation'>('detail')

// 权限设置相关（原有假数据）
// 定义权限树节点类型（匹配假数据+接口返回结构）
interface PermissionTreeNode {
  title: string
  key: string
  checkable?: boolean // 子节点显示勾选框，外层无
  children?: PermissionTreeNode[]
  // 接口返回的其他字段（可选，按需保留）
  id?: string
  permType?: number
  isHave?: boolean
}

// 页面变量（与假数据结构一致）
const permissionCategories = ref(['系统', '气相', '液相', '原吸', '紫外', '形态', '荧光'])
const activeCategory = ref(0)
const checkedKeys = ref<string[]>([]) // 勾选的权限key（isHave=true的permCode）
const permissionTreeData = ref<PermissionTreeNode[]>([]) // 权限树数据（假数据格式）
const isLoading = ref(false) // 加载状态
// 标签页 key 与对应的 permType 映射
const tabPermTypeMap = {
  permission: 1, // 权限设置对应的 permType
  operation: '1,2', // 操作权限设置对应的 permType
}
const groupId_perm = ref<any>() // 权限设置时，动态传递 groupId

// ==================================================================================
// 核心1：接口数据转假数据格式（递归处理多级子节点）
// ==================================================================================
/**
 * 格式化单个节点：接口数据 → 假数据格式
 * @param apiNode 接口返回的单个节点数据
 * @returns 适配AntD Tree的节点格式
 */
const formatApiNodeToTree = (apiNode: any): PermissionTreeNode => {
  // 1. 基础字段映射（permCode→key，title→title）
  const treeNode: PermissionTreeNode = {
    title: apiNode.title || '', // 接口title直接映射
    key: apiNode.permCode || '', // 接口permCode作为key（唯一标识）
    // 2. 子节点处理（递归转换）
    children: apiNode.children
      ? apiNode.children.map((child: any) => formatApiNodeToTree(child))
      : undefined,
    // 3. 仅子节点显示勾选框（外层节点无checkable，匹配假数据）
    checkable: true,
  }

  // 4. 保留接口其他有用字段（可选，便于后续使用）
  treeNode.id = apiNode.id
  treeNode.permType = apiNode.permType
  treeNode.isHave = apiNode.isHave

  return treeNode
}

// ==================================================================================
// 核心2：提取isHave=true的permCode到checkedKeys（递归遍历）
// ==================================================================================
/**
 * 遍历树形数据，收集所有isHave=true的permCode（即key）
 * @param treeData 格式化后的树形数据
 */
const collectCheckedKeys = (treeData: PermissionTreeNode[]) => {
  const havePermCodes: string[] = []
  const traverse = (nodes: PermissionTreeNode[]) => {
    nodes.forEach((node) => {
      // 新增条件：排除 isHave=false 的节点和父节点，只收集 isHave=true 且非顶级的节点
      if (node.isHave && node.isHave === true) {
        havePermCodes.push(node.key)
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }
  traverse(treeData)
  checkedKeys.value = havePermCodes
  console.log(
    '过滤后的checkedKeys（排除isHave=false）：',
    checkedKeys.value,
    checkedKeys.value.length,
  )
}

// ==================================================================================
// 核心3：接口对接+数据转换+勾选状态填充
// ==================================================================================
const fetchPermissionTree = async () => {
  isLoading.value = true
  try {
    let permType: number | string | undefined
    // 先判断 tabKey 是否是 tabPermTypeMap 的有效键
    if (tabKey.value in tabPermTypeMap) {
      permType = tabPermTypeMap[tabKey.value as keyof typeof tabPermTypeMap]
      console.log(8888888, permType)
    } else {
      // 当 tabKey 为 'detail' 时的默认处理
      permType = undefined
      // message.warning('当前标签页无对应权限类型参数');
    }

    if (permType !== undefined) {
      // 1. 调用接口，传递动态的 permType
      const res = await getPermissionTreeData({
        permType: permType,
        groupId: groupId_perm.value, // 动态传递 userId
      })

      // 2. 接口成功：转换数据格式
      if (res.code === 200 && Array.isArray(res.data)) {
        // 2.1 接口数据→假数据格式（递归处理所有节点）
        const formattedTreeData = res.data.map((apiNode: any) => formatApiNodeToTree(apiNode))
        permissionTreeData.value = formattedTreeData
        console.log(111111111111111111111, permissionTreeData.value)

        // 2.2 自动提取 isHave=true 的 permCode 到 checkedKeys
        collectCheckedKeys(formattedTreeData)
      } else {
        permissionTreeData.value = []
        checkedKeys.value = []
        message.warning('权限数据为空')
      }
    } else {
      permissionTreeData.value = []
      checkedKeys.value = []
    }
  } catch (error) {
    permissionTreeData.value = []
    checkedKeys.value = []
    message.error('权限加载失败')
    console.error('权限接口错误：', error)
  } finally {
    isLoading.value = false
  }
}

// ==================================================================================
// 可选：分类切换时重新加载权限（按分类动态切换permType）
// ==================================================================================
const handleCategoryChange = (index: number) => {
  activeCategory.value = index
  fetchPermissionTree() // 切换分类后重新请求接口
}

// const permissionCategories = ref(['系统', '气相', '液相', '原吸', '紫外', '形态', '荧光'])
// const activeCategory = ref(0)
const checkedKeys1 = ref<string[]>(['system:setting', 'user:add1', 'system'])
const permissionTreeData1 = ref<PermissionTreeNode[]>([
  {
    title: '系统设置',
    key: 'system',
    checkable: true,
    children: [
      { title: '基础配置', key: 'system:setting', checkable: true },
      { title: '新增配置', key: 'system:setting:add', checkable: true },
      { title: '编辑配置', key: 'system:setting:edit', checkable: true },
      { title: '删除配置', key: 'system:setting:delete', checkable: true },
      { title: '配置导出', key: 'system:setting:export', checkable: true },
    ],
  },
  {
    title: '用户管理',
    key: 'user',
    checkable: true,
    children: [
      { title: '用户列表', key: 'user:list', checkable: true },
      { title: '新增用户', key: 'user:add', checkable: true },
      { title: '编辑用户', key: 'user:edit', checkable: true },
      { title: '删除用户', key: 'user:delete', checkable: true },
      { title: '重置密码', key: 'user:reset:pwd', checkable: true },
    ],
  },
  {
    title: '角色管理',
    key: 'role',
    checkable: true,
    children: [
      { title: '角色列表', key: 'role:list', checkable: true },
      { title: '新增角色', key: 'role:add', checkable: true },
      { title: '编辑角色', key: 'role:edit', checkable: true },
      { title: '角色授权', key: 'role:auth', checkable: true },
    ],
  },
])

// 5. 计算属性（原有逻辑不变）
const hasSelectedNode = computed(() => !!selectedNode.value?.type)
const roleOptions = computed<RoleOptionType[]>(() => {
  return treeRoles.value.map((role) => ({ label: role.label, value: role.value }))
})
// 角色详情表单
const roleFormOptions = computed<formOptionsType[]>(() => [
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
// 小组详情表单
const groupFormOptions = computed<formOptionsType[]>(() => [
  { type: 'input', label: '小组名称', props: 'groupName' },
  { type: 'input', label: '小组描述', props: 'description' },
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
  },
])
// 用户详情表单
const userFormOptions = computed<formOptionsType[]>(() => [
  { type: 'input', label: '账号', props: 'username', required: true, disabled: true },
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

// 6. 表单校验规则
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

// 7. 核心工具函数
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

// 8. 核心业务逻辑
/** 加载用户树形数据 */
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
      // 保留选中状态
      if (currentUserId.value && selectedKeys.value[0]) {
        const userNode = allNodes.value[selectedKeys.value[0]]
        if (userNode) onNodeSelect(selectedKeys.value, { node: { dataRef: userNode } })
      }
    }
  } catch (error) {
    message.error('获取数据失败，请刷新页面')
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
      console.log(222222, roleData)

      formState.roleName = roleData.roleName
      formState.roleCode = roleData.roleCode
      break
    }
    case 'group': {
      const groupData = rawData as GroupType
      groupId_perm.value = groupData.id
      fetchPermissionTree()
      formState.groupName = groupData.groupName
      formState.description = groupData.description || ''
      formState.roleId = groupData.roleId ? String(groupData.roleId) : ''
      await loadGroupsByRoleId(formState.roleId) // 加载关联角色的小组（仅查看）
      break
    }
    case 'user': {
      const userData = rawData as UserType
      console.log(1111111111111, userData)
      groupId_perm.value = userData.groupId
      fetchPermissionTree()
      currentUserId.value = userData.id
      formState.username = userData.username
      formState.password = userData.password
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

/** 表单变化处理（用户角色切换重置小组） */
const handleFormChange = async (key: string, value: any) => {
  // 仅处理用户节点的角色切换
  if (selectedNode.value?.type === 'user' && key === 'roleId' && value !== formState.roleId) {
    formState.roleId = value
    formRenderKey.value += 1 // 强制刷新表单
    await loadGroupsByRoleId(value) // 加载新角色的小组（自动清空旧选择）
  }
}

/** 保存用户信息修改 */
// 在原有handleSave方法基础上修改，增加小组修改逻辑
const handleSave = async () => {
  if (!uvFormRef.value || !selectedNode.value || !formState.id) {
    message.warning('请选择有效的节点')
    return
  }

  // 表单校验
  const validateSuccess = await uvFormRef.value.onSubmit()
  if (!validateSuccess) return

  try {
    // 区分用户和小组的保存逻辑
    if (selectedNode.value.type === 'user') {
      // 原有用户保存逻辑
      const submitData: Record<string, any> = {
        ...formState,
        status: Number(formState.status),
        id: String(formState.id),
        roleId: formState.roleId ? String(formState.roleId) : '',
        groupId: formState.groupId ? String(formState.groupId) : '',
      }
      if (formState.id && submitData.password === '') delete submitData.password

      const { code } = await updateSystemUser(submitData)
      if (code === 200) {
        message.success('用户修改成功')
        getUserInfoFun()
      } else {
        message.error('用户修改失败')
      }
    }
    // 新增小组修改逻辑
    else if (selectedNode.value.type === 'group') {
      // 构造小组提交数据
      const submitData: Record<string, any> = {
        id: String(formState.id), // 小组ID（必传）
        groupName: formState.groupName, // 小组名称
        description: formState.description || '', // 描述（空值处理）
        status: Number(formState.status), // 状态（转数字）
        roleId: formState.roleId ? String(formState.roleId) : '', // 关联角色
      }

      // 调用小组修改接口
      const { code } = await updateGroup(submitData)
      if (code === 200) {
        message.success('小组修改成功')
        getUserInfoFun() // 刷新树形数据
      } else {
        message.error(`小组修改失败: ${message || '未知错误'}`)
      }
    }
  } catch (error) {
    console.error('保存失败:', error)
    message.error('保存失败，请检查网络')
  }
}

/** 保存权限设置 */
// 1. 递归提取选中权限的ID列表
const getSelectedPermIds = (): string[] => {
  const permIds: string[] = []

  // 递归遍历权限树，收集选中节点的id
  const traverse = (nodes: PermissionTreeNode[]) => {
    nodes.forEach((node) => {
      // 只收集选中且有id的权限节点
      if (checkedKeys.value.includes(node.key) && node.id) {
        permIds.push(node.id)
      }
      // 处理子节点
      if (node.children && node.children.length) {
        traverse(node.children)
      }
    })
  }

  traverse(permissionTreeData.value)
  return permIds
}

// 2. 处理权限保存逻辑（适配后端接口）
const handlePermissionSave = async () => {
  // 校验当前选中的是小组节点
  if (!selectedNode.value || selectedNode.value.type !== 'group') {
    message.warning('请先选择一个小组节点')
    return
  }

  // 获取小组ID（从选中节点的原始数据中提取）
  const groupId = String(selectedNode.value.rawData.id)
  if (!groupId) {
    message.warning('未获取到有效的小组ID')
    return
  }

  // 获取选中的权限ID列表
  const permIdList = getSelectedPermIds()

  // 转换为逗号分隔的字符串（后端要求的格式）
  const permIds = permIdList.join(',')

  try {
    // 调用更新小组权限的接口
    const response = await updateGroupPerm({
      groupId: groupId, // 小组ID
      permIds: permIds, // 权限ID列表（逗号分隔）
    })

    if (response.code === 200 && response.data) {
      message.success('小组权限更新成功')
    } else {
      message.error(`更新失败：${response.message || '未知错误'}`)
    }
  } catch (error) {
    console.error('更新小组权限失败：', error)
    message.error('网络异常，无法更新权限')
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

// 9. 小组相关操作（新增/修改/删除）
/** 打开新增小组弹窗 */
const handleAddGroup = () => {
  addGroupVisible.value = true
}

/** 打开修改小组弹窗 */
const handleEditGroup = () => {
  if (selectedNode.value?.type !== 'group') {
    message.warning('请先选择一个小组节点')
    return
  }
  editGroupVisible.value = true
}

/** 删除小组 */
const handleDeleteGroup = async () => {
  if (selectedNode.value?.type !== 'group') {
    message.warning('请先选择一个小组节点')
    return
  }

  const groupId = selectedNode.value.rawData.id
  Modal.confirm({
    title: '删除确认',
    content: `确定要删除【${selectedNode.value.label}】吗？删除后该小组下的用户将需要重新分配`,
    okText: '确认删除',
    cancelText: '取消',
    onOk: async () => {
      try {
        const { code } = await deleteGroup(groupId)
        if (code === 200) {
          message.success('删除成功')
          getUserInfoFun()
          selectedKeys.value = []
          selectedNode.value = null
        } else {
          message.error('删除失败')
        }
      } catch (error) {
        console.error('删除小组失败:', error)
        message.error('删除失败，请检查网络')
      }
    },
  })
}

/** 打开新增用户弹窗 */
const handleAddUser = () => {
  addUserVisible.value = true
}

/** 输出PDF（占位） */
const handleExportPdf = () => {
  message.info('PDF导出功能待实现')
}

// 10. 初始化
onMounted(() => {
  getUserInfoFun()
  fetchPermissionTree()
  // 监听角色变化（额外保障）
  watch(
    () => formState.roleId,
    async (newVal, oldVal) => {
      if (selectedNode.value?.type === 'user' && newVal && newVal !== oldVal) {
        await loadGroupsByRoleId(newVal)
      }
    },
  )
})
</script>
<style lang="less" scoped>
// 树形+表单区域布局
.file-preview {
  display: flex;
  border: 1px solid rgba(187, 187, 187, 0.7);
  border-radius: 4px;
  overflow: hidden;
  min-height: 200px;
}

// 左侧树形区域
.file-preview-left {
  width: 35%;
  border-right: 1px solid rgba(187, 187, 187, 0.7);
  min-height: 200px;
  overflow-y: auto;
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

  // 选中节点样式
  ::v-deep .ant-tree-node-selected {
    background-color: rgba(24, 144, 255, 0.1) !important;
    color: #1890ff !important;
    border-radius: 4px;
  }
}

// 右侧详情+权限区域
.file-preview-right {
  width: 65%;
  min-height: 200px;
  background: #fff;
  display: flex;
  height: auto;
  flex-direction: column;

  // 标签页样式
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-tab {
    padding: 12px 24px;
    font-size: 16px;
  }

  // 标签页激活状态
  ::v-deep .ant-tabs-tab-active {
    color: #1890ff;
    font-weight: 500;
  }

  ::v-deep .ant-tabs-ink-bar {
    background-color: #1890ff;
  }
}

// 权限设置区域整体容器
.permission-setting-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

// 权限分类切换按钮组（优化后）
.permission-category {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f2f2f2;
}

// 权限分类按钮样式（优化后）
.permission-category-btn {
  padding: 0 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  color: #666;
  background-color: #f7f8fa;

  &.active {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: #fff;
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
  }

  &:not(.active):hover {
    border-color: #1890ff;
    color: #1890ff;
    background-color: #f0f7ff;
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #ccc;
    border-color: #eee;
    transform: none;
  }
}

// 权限树容器（优化后）
.permission-tree-container {
  margin-top: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
  background-color: #fafbfc;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);

  // 权限树节点样式优化
  ::v-deep .ant-tree {
    font-size: 14px;
    color: #333;

    .ant-tree-treenode {
      margin-bottom: 6px;
    }

    .ant-tree-node-content-wrapper {
      padding: 6px 8px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f0f7ff;
      }

      &.ant-tree-node-selected {
        background-color: #e6f4ff !important;
        color: #1890ff;
      }
    }

    .ant-tree-checkbox {
      margin-right: 8px;

      &-checked .ant-tree-checkbox-inner {
        background-color: #1890ff;
        border-color: #1890ff;
      }

      &-indeterminate .ant-tree-checkbox-inner::after {
        background-color: #1890ff;
      }
    }

    .anticon {
      margin-right: 6px;
      font-size: 14px;
    }
  }

  // 滚动条美化
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;

    &:hover {
      background: #9ca3af;
    }
  }
}

// 权限保存按钮区域（优化后）
.permission-save-area {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 12px;
}

// 按钮样式优化
::v-deep .ant-btn-primary {
  background: #1890ff;
  border-color: #1890ff;
  padding: 0 24px;
  font-size: 16px;
  height: 40px;
  border-radius: 6px;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);

  &:hover {
    background: #096dd9;
    border-color: #096dd9;
  }
}

::v-deep .ant-btn-default {
  border-color: #d9d9d9;
  padding: 0 24px;
  height: 40px;
  border-radius: 6px;
  font-size: 16px;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    background-color: #f0f7ff;
  }
}

// 表单样式优化
::v-deep .ant-form-item {
  margin-bottom: 20px;
}

::v-deep .ant-input,
::v-deep .ant-select-selector,
::v-deep .ant-radio-group {
  height: 38px;
  border-radius: 4px;
}

::v-deep .ant-form-item-label > label {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

::v-deep .ant-select-selection-item {
  line-height: 38px;
}

// 操作按钮区样式
.operation-btn-group {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.operation-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  padding: 10px 20px;
  border-radius: 6px;

  &:hover {
    background-color: #f0f7ff;
    color: #1890ff;
  }

  .anticon {
    margin-bottom: 6px;
    font-size: 24px;
  }

  span {
    font-size: 14px;
  }
}

// 无数据状态样式
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  color: #999;
  font-size: 14px;
  background-color: #fafbfc;
  border-radius: 8px;
  border: 1px dashed #f0f0f0;

  .anticon {
    font-size: 48px;
    margin-bottom: 12px;
    color: #d1d5db;
  }
}

// 滚动条美化
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
}
.bg-custom-blue {
  background-color: #e7f4ff;
}
// 响应式适配
@media (max-width: 768px) {
  .file-preview {
    flex-direction: column;
  }

  .file-preview-left,
  .file-preview-right {
    width: 100%;
    min-height: 300px;
  }

  .operation-btn-group {
    flex-wrap: wrap;
    gap: 10px;
  }

  .operation-btn {
    flex: 1;
    min-width: 80px;
    padding: 8px;
  }

  // 权限区域响应式
  .permission-category {
    gap: 8px;
  }

  .permission-category-btn {
    padding: 6px 14px;
    font-size: 13px;
  }

  .permission-tree-container {
    max-height: 320px;
    padding: 12px;
  }

  .permission-save-area {
    justify-content: center;
  }
}
</style>
