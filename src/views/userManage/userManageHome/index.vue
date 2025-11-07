<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container">
    <div class="user-info-wrapper">
      <!-- 用户风格设置折叠块 -->
      <uv-collapse
        :parentActiveKey="activeKeyStyle"
        title="当前用户风格设置"
        style-name="background: rgba(233, 241, 253, 0.5);"
        class="!mb-6"
        @toggle="handleCollapseToggle"
      >
        <template #slot-content>
          <div class="style-content p-4 bg-gray-50 rounded-lg">
            <div class="style-form grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <!-- 语言选择 -->
              <div class="style-row flex flex-col">
                <label class="style-label text-gray-600 font-medium !mb-2">系统语言选择：</label>
                <select
                  class="language-select px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-8"
                >
                  <option value="zh">中文（默认）</option>
                  <option value="en">English</option>
                </select>
              </div>
              <!-- 恢复默认按钮 -->
              <div class="style-row flex justify-end">
                <a-button type="primary"> 恢复出厂设置 </a-button>
              </div>
            </div>
          </div>
        </template>
      </uv-collapse>
      <!-- 用户基本信息折叠块 -->
      <uv-collapse
        :parentActiveKey="activeKeyBasic"
        title="当前用户基本信息"
        style-name="background: rgba(233, 241, 253, 0.5);"
        @toggle="handleCollapseToggle"
      >
        <template #slot-content>
          <div class="info-content">
            <!-- 上部分左右布局 -->
            <div class="upper-layout">
              <!-- 左侧用户信息 -->
              <div class="user-info-column">
                <h3 class="info-title text-lg font-semibold text-gray-800 mb-4">个人基本信息</h3>
                <div class="info-table">
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">用户名：</label>
                    <span class="info-value text-gray-800">{{
                      formatEmpty(userData?.username)
                    }}</span>
                  </div>
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">真实姓名：</label>
                    <span class="info-value text-gray-800">{{
                      formatEmpty(userData?.realName)
                    }}</span>
                  </div>
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">职务：</label>
                    <span class="info-value text-gray-800">{{
                      formatEmpty(userData?.position)
                    }}</span>
                  </div>
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">备注：</label>
                    <span class="info-value text-gray-800">{{
                      formatEmpty(userData?.remarks)
                    }}</span>
                  </div>
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">手机号：</label>
                    <span class="info-value text-gray-800">{{ formatEmpty(userData?.phone) }}</span>
                  </div>
                  <div class="info-row flex items-center py-2 border-b border-gray-100">
                    <label class="info-label w-28 text-gray-600 font-medium">邮箱：</label>
                    <span class="info-value text-gray-800">{{ formatEmpty(userData?.email) }}</span>
                  </div>
                  <div class="info-row flex items-center py-2">
                    <label class="info-label w-28 text-gray-600 font-medium">账号状态：</label>
                    <span
                      class="info-value inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="
                        userData?.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ userData?.status === 1 ? '启用' : userData?.status === 0 ? '禁用' : '-' }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- 右侧权限列表 -->
              <div class="permission-column">
                <h3 class="info-title text-lg font-semibold text-gray-800 mb-4">权限列表</h3>
                <div class="permission-section">
                  <ul class="permission-tree">
                    <li
                      v-for="permission in permissions"
                      :key="permission.id"
                      class="permission-item mb-2"
                    >
                      <div
                        class="permission-parent flex items-center text-gray-800 py-1 px-2 rounded transition-colors"
                      >
                        <!-- 根据是否有子节点，显示三角或圆点 -->
                        <span
                          v-if="permission.children && permission.children.length"
                          class="node-icon mr-2 transition-transform cursor-pointer inline-block w-4 text-center"
                          :class="{ 'rotate-90': permission.expanded }"
                          @click="toggleExpand(permission)"
                          >▾</span
                        >
                        <span v-else class="node-icon mr-2 inline-block w-4 text-center">•</span>
                        <span
                          class="font-medium cursor-pointer transition-colors"
                          @click="
                            permission.children &&
                            permission.children.length &&
                            toggleExpand(permission)
                          "
                          >{{ permission.title }}</span
                        >
                      </div>
                      <ul
                        v-if="
                          permission.expanded && permission.children && permission.children.length
                        "
                        class="permission-child pl-6 mt-1"
                      >
                        <li
                          v-for="child in permission.children"
                          :key="child.id"
                          class="permission-item mb-1"
                        >
                          <div
                            class="permission-parent flex items-center text-gray-700 py-1 px-2 rounded transition-colors"
                          >
                            <!-- 根据是否有子节点，显示三角或圆点 -->
                            <span
                              v-if="child.children && child.children.length"
                              class="node-icon mr-2 transition-transform cursor-pointer inline-block w-4 text-center"
                              :class="{ 'rotate-90': child.expanded }"
                              @click="toggleExpand(child)"
                              >▾</span
                            >
                            <span v-else class="node-icon mr-2 inline-block w-4 text-center"
                              >•</span
                            >
                            <span
                              class="cursor-pointer transition-colors"
                              @click="
                                child.children && child.children.length && toggleExpand(child)
                              "
                              >{{ child.title }}</span
                            >
                          </div>
                          <ul
                            v-if="child.expanded && child.children && child.children.length"
                            class="permission-child pl-6 mt-1 text-gray-600"
                          >
                            <li
                              v-for="grandChild in child.children"
                              :key="grandChild.id"
                              class="permission-leaf py-1 px-2 rounded cursor-pointer transition-colors"
                            >
                              <!-- 无子节点，显示圆点 -->
                              <span class="node-icon mr-2 inline-block w-4 text-center">•</span>
                              {{ grandChild.title }}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <!-- 空状态处理 -->
                  <div
                    v-if="permissions.length === 0"
                    class="flex flex-col items-center justify-center py-10 text-gray-400"
                  >
                    <div class="text-gray-300 mb-2">🔒</div>
                    <span>暂无权限数据</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="user-management-section !my-5">
              <h3 class="info-title text-lg font-semibold text-gray-800 mb-4">用户管理</h3>
              <div class="management-actions flex flex-wrap gap-3">
                <a-button @click="handleSetPassword"> 设置密码 </a-button>
                <!-- 重置密码按钮 -->
                <a-button @click="handleResetPassword"> 重置密码 </a-button>
                <!-- 解除用户按钮（警告色，区分风险操作） -->
                <a-button @click="handleUnbindUser"> 解除用户 </a-button>
                <!-- 锁定用户按钮（危险色，强调风险操作） -->
                <a-button @click="handleLockUser"> 锁定用户 </a-button>
                <!-- 项目分配按钮（常规色，普通操作） -->
                <a-button @click="handleAssignProject"> 项目分配 </a-button>
              </div>
            </div>
            <!-- 下部分电子签名区域 -->
            <div class="signature-section mt-5">
              <h3 class="info-title text-lg font-semibold text-gray-800 mb-4">电子签名</h3>
              <div
                class="signature-content flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div class="signature-preview-container">
                  <div
                    class="signature-preview w-48 h-24 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center bg-gray-50 transition-all duration-300"
                  >
                    <span class="text-gray-400 text-sm">点击上传签名</span>
                  </div>
                  <p class="text-xs text-gray-500 !mt-2 !mb-0 ml-1">
                    支持 PNG/JPG 格式，建议尺寸 300×150px
                  </p>
                </div>
                <div class="signature-actions flex flex-col sm:flex-row gap-3">
                  <a-button> 设置签名 </a-button>
                  <a-button> 清除签名 </a-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </uv-collapse>
    </div>

    <updatePasswordModal
      v-model="showUpdateModal"
      :userId="userData.id"
      @reset-success="handleResetSuccess"
    />

    <resetPasswordModal
      v-model="showResetModal"
      :userId="userData.id"
      :userName="userData.username"
      @reset-success="handleResetSuccess"
    />
  </section>
</template>

<script lang="ts" setup>
import { getUserDetailById, getUserPermissionById } from '@/api/userManageHome'
import uvCollapse from '@/components/uvCollapse/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { onMounted, ref } from 'vue'
// 新增：导入弹窗组件（用于确认提示，假设项目有全局弹窗组件）
import { message, type FormInstance } from 'ant-design-vue'
import resetPasswordModal from './components/resetPasswordModal.vue'
import updatePasswordModal from './components/updatePasswordModal.vue'

// const showResetModal = ref(false)
// const selectedUserId = ref('')

const handleResetSuccess = () => {
  // 密码重置成功后的处理逻辑
  console.log('密码重置成功')
}
// 定义用户数据类型
interface UserDetailType {
  id: string
  username: string
  realName: string
  phone?: string
  email?: string
  position?: string | null
  remarks?: string | null
  status: number
  lastLoginTime?: string
  userType?: string
  groupId?: string
  groupName?: string
  roleId?: string
  roleName?: string
  roleCode?: string
  roleDescription?: string
}

// 定义权限数据类型
interface PermissionType {
  id: string
  permName: string
  title: string
  permCode: string
  permType: number
  parentId: number
  path: string
  component: string | null
  icon: string | null
  sort: number
  status: number
  description: string | null
  createTime: string | null
  updateTime: string | null
  children: PermissionType[] | null
  expanded?: boolean // 新增展开状态字段
}

// 状态管理
const activeKeyBasic = ref<string>('1')
const activeKeyStyle = ref<string>('0')

const loading = ref<boolean>(true)
const errorMsg = ref<string>('')
const userData = ref<UserDetailType>({
  id: '',
  username: '',
  realName: '',
  status: 0,
  remarks: '',
  position: null,
  phone: undefined,
  email: undefined,
  lastLoginTime: undefined,
  userType: undefined,
  groupId: undefined,
  groupName: undefined,
  roleId: undefined,
  roleName: undefined,
  roleCode: undefined,
  roleDescription: undefined,
})
const permissions = ref<PermissionType[]>([])
const { systemIdentityId } = useUserStore()

// 页面挂载时调用接口
onMounted(() => {
  const userId = systemIdentityId // 使用当前登录用户ID
  fetchUserDetail(userId)
  fetchUserPermissions(userId)
})

// 获取用户详情
const fetchUserDetail = async (userId: string) => {
  try {
    loading.value = true
    const response = await getUserDetailById(userId)
    if (response.code === 200 && response.data) {
      userData.value = {
        ...userData.value,
        ...response.data,
        remarks: response.data.remarks ?? '',
      }
      errorMsg.value = ''
    } else {
      errorMsg.value = response.message || '获取用户信息失败，请重试'
    }
  } catch (err) {
    errorMsg.value = '网络异常，无法获取用户信息'
    console.error('获取用户详情失败：', err)
  } finally {
    loading.value = false
  }
}

// 获取用户权限
const fetchUserPermissions = async (userId: string) => {
  try {
    const response = await getUserPermissionById(userId)
    if (response.code === 200 && response.data) {
      permissions.value = response.data.map((item: any) => ({
        ...item,
        expanded: false, // 初始化展开状态
      }))
    } else {
      console.error('获取用户权限失败：', response.message)
    }
  } catch (err) {
    console.error('获取用户权限失败：', err)
  }
}

// 折叠面板切换事件
const handleCollapseToggle = (isOpen: boolean) => {
  console.log('折叠面板状态：', isOpen)
}

// 切换权限节点的展开/收起状态
const toggleExpand = (permission: PermissionType) => {
  permission.expanded = !permission.expanded
}

// 格式化空字段
const formatEmpty = (value: any): string => {
  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
    return '-'
  }
  return String(value)
}

// 修改密码核心逻辑
const resetPwdModalVisible = ref<boolean>(false)
// 表单引用
const passwordFormRef = ref<FormInstance | null>(null)

// 密码表单数据（与 PasswordUpdateDTO 对应）
const passwordForm = reactive({
  userId: userData.value.id, // 从用户信息中获取用户ID
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

// 表单验证规则（与后端校验对应）
const passwordRules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度需在6-16位之间', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
      message: '请输入6-16位密码',
      trigger: 'blur',
    },
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string) => {
        if (value !== passwordForm.newPassword) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
}

// 表单验证状态（用于自定义样式）
const validateStatus = reactive({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

// 状态管理
const showUpdateModal = ref(false) // 控制弹窗显示
// 重置密码按钮点击事件
const handleSetPassword = () => {
  // 1. 校验是否有选中用户
  if (!userData.value.id) {
    message.warning('操作的用户id获取失败，请刷新重试')
    return
  }

  // 2. 显示重置密码弹窗
  showUpdateModal.value = true
}

// 密码重置成功后的回调
const onResetSuccess = () => {
  // 可以在这里刷新用户列表或做其他后续操作
  message.success('密码已重置成功')
}

// 状态管理
const showResetModal = ref(false) // 控制弹窗显示
// 重置密码按钮点击事件
const handleResetPassword = () => {
  // 1. 校验是否有选中用户
  if (!userData.value.id) {
    message.warning('操作的用户id获取失败，请刷新重试')
    return
  }

  // 2. 显示重置密码弹窗
  showResetModal.value = true
}

// 密码重置成功后的回调
// const onResetSuccess = () => {
//   // 可以在这里刷新用户列表或做其他后续操作
//   message.success('密码已重置成功');
// };

// 其他按钮的点击事件
const handleUnbindUser = () => {
  // 解除用户逻辑
  if (!userData.value.id) {
    message.warning('操作的用户id获取失败，请刷新重试')
    return
  }
  // 具体实现...
}

const handleLockUser = () => {
  // 锁定用户逻辑
  if (!userData.value.id) {
    message.warning('操作的用户id获取失败，请刷新重试')
    return
  }
  // 具体实现...
}

const handleAssignProject = () => {
  // 项目分配逻辑
  if (!userData.value.id) {
    message.warning('请先选择需要操作的用户')
    return
  }
  // 具体实现...
}
</script>

<style lang="less" scoped>
// 基础容器样式
.user-info-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
}

// 信息内容区样式
.info-content {
  padding: 20px;
  transition: all 0.3s ease;
}

// 上部分左右布局容器
.upper-layout {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

// 用户信息列
.user-info-column {
  flex: 1;
}

// 权限列表列
.permission-column {
  flex: 1;
}

// 标题样式
.info-title {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

// 表格布局样式
.info-table {
  .info-row {
    display: flex;
    align-items: center;

    .info-label {
      width: 100px;
      text-align: right;
      margin-right: 16px;
      font-weight: 500;
      color: #6b7280;
    }

    .info-value {
      color: #333;
    }
  }
}

// 权限树样式
.permission-tree {
  padding-left: 8px;

  .permission-parent {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;

    .node-icon {
      transition: transform 0.2s ease;
    }

    &:hover {
      .node-icon {
        transform: scale(1.1);
      }
    }
  }

  .permission-child {
    padding-left: 16px;
    margin-left: 4px;
    border-left: 1px dashed #e5e7eb;

    .permission-leaf {
      position: relative;
      display: flex;
      align-items: center;
    }
  }
}

// 签名区域样式
.signature-section {
  transition: all 0.3s ease;

  .signature-content {
    width: 100%;
  }

  .signature-preview {
    transition: all 0.3s ease;

    &:hover {
      background-color: #fff5f7;
    }
  }
}

// 按钮统一样式优化
.modify-signature-btn,
.clear-signature-btn {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
}

// 滚动条美化
.permission-section::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.permission-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.permission-section::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.permission-section::-webkit-scrollbar-thumb:hover {
  background: #b4b9c2;
}

// 响应式适配
@media (max-width: 768px) {
  .upper-layout {
    flex-direction: column;
  }

  .info-table {
    .info-row {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 2px;

      .info-label {
        width: auto;
        text-align: left;
        margin-bottom: 4px;
        display: block;
        font-size: 13px;
      }

      .info-value {
        font-size: 14px;
      }
    }
  }

  .signature-content {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .signature-actions {
    width: 100%;
    flex-direction: column;
  }

  .modify-signature-btn,
  .clear-signature-btn {
    width: 100%;
  }
}
</style>
