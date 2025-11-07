/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { defineStore } from 'pinia'

import { defaultPrimaryColor, naiveThemeOverrides } from '@/setting'
export const useAppStore = defineStore('app', {
  state: () => ({
    collapsed: false, // 侧边栏是否收起
    primaryColor: defaultPrimaryColor,
    naiveThemeOverrides,
    nm: '',
    time: '', // 时间
    abs: '',
    luminosity: 'Abs', //光度模式
    bandwidth: '2', // 光谱带宽
    changeLampWl: '361', // 换灯波长
    responseTime: '0.5', // 响应时间
    poolNumber: '2', // 当前池号
    nmss: '', // 当前池号
    measureMode: '0', // 测量模式  1测量中 2 停止测量
    aliveRoute: [] as string[],
    deviceMeasureMode: 0,
    zeroLoading: false, //光谱是否在校零或者基线
    isDataChanged: false, //方法参数是否已修改
  }),
  actions: {
    setPrimaryColor(color: string) {
      this.primaryColor = color
    },
    setNm(nm: string) {
      this.nm = nm
    },
    setTime(time: string) {
      this.time = time
    },
    setNmss(nmss: string) {
      this.nmss = nmss
    },
    setAbs(abs: string) {
      this.abs = abs
    },
    setLuminosity(luminosity: string) {
      this.luminosity = luminosity
    },
    setBandwidth(bandwidth: string) {
      this.bandwidth = bandwidth
    },
    setChangeLampWl(changeLampWl: string) {
      this.changeLampWl = changeLampWl
    },
    setResponseTime(responseTime: string) {
      this.responseTime = responseTime
    },
    setPoolNumber(poolNumber: string) {
      this.poolNumber = poolNumber
    },
    setMeasureMode(measureMode: string) {
      this.measureMode = measureMode
    },
    setAliveRoute(aliveRoute: string[]) {
      this.aliveRoute = aliveRoute
    },
    setDeviceMeasureMode(deviceMeasureMode: number) {
      this.deviceMeasureMode = deviceMeasureMode
    },
    setZeroLoading(zeroLoading: boolean) {
      this.zeroLoading = zeroLoading
    },
    setIsDataChanged(isDataChanged: boolean) {
      this.isDataChanged = isDataChanged
    },
  },
})
