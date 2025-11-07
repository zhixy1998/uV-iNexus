/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { login as loginApi, logout as logoutApi } from '@/api'
import type { LoginForm } from '@/api/user/types'
import { useDeviceStatusStore } from './deviceStatus'

export const useUserStore = defineStore(
  'user',
  () => {
    const deviceStatusStore = useDeviceStatusStore()
    // token
    const token = ref('')
    function setToken(newToken: string) {
      token.value = newToken
    }
    // 用户名
    const userName = ref('')
    function setUserName(newName: string) {
      userName.value = newName
    }
    // 系统角色id
    const systemIdentityId = ref('')
    function setSystemIdentityId(id: string) {
      systemIdentityId.value = id
    }

    // 登录
    async function login(params: LoginForm) {
      const res = await loginApi(params)
      if (res.data?.token) {
        setToken(res.data.token)
        setUserName(res.data.username)
        setSystemIdentityId(res.data.id)
      }
      return res
    }
    // 退出登录
    async function logout() {
      const { code, message } = await logoutApi()
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: message || '退出登录成功！',
          duration: 3,
        })
        resetAll()
      }
    }

    function resetAll() {
      setToken('')
      setUserName('')
      deviceStatusStore.resetAll()
      localStorage.clear()
    }
    // 用户信息
    // const userInfo = ref<UserInfo | null>(null)
    // async function getUserInfo() {}
    // function setUserOInfo(newUserInfo: UserInfo) {
    //   userInfo.value = newUserInfo
    // }
    // function clearUserInfo() {
    //   userInfo.value = null
    // }

    return {
      token,
      userName,
      login,
      logout,
      resetAll,
      systemIdentityId,
    }
  },
  {
    persist: true,
  },
)
