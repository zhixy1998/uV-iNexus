/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

/**
 * @description 参数校验

 */
export const parameterValidation = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/parameterValidation',
    method: 'post',
    data,
  })
}
/**
 * @description 最近完成任务

 */
export const recentlyAccomplishTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/recentlyAccomplishTask',
    method: 'get',
    params: data,
  })
}
/**
 * @description 最近创建任务

 */
export const recentlyCreatedTasks = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/recentlyCreatedTasks',
    method: 'get',
    params: data,
  })
}
/**
 * @description 项目统计

 */
export const queryProjectStatistics = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/queryProjectStatistics',
    method: 'get',
  })
}
/**
 * @description 新建项目
 */
export const experimentNewProject = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/newProject',
    method: 'post',
    data: data,
  })
}
/**
 * @description 新建方法
 */
export const spectrumSaveMethodParameter = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/saveMethodParameter',
    method: 'post',
    data: data,
  })
}

/**
 * @description 修改方法废弃
 */
export const spectrumScanningNewMethods = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/newMethod',
    method: 'post',
    data: data,
  })
}
/**
 * @description 查询所有项目接口
 */
export const spectrumScanningQueryAllProject = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/queryAllProject',
    method: 'get',
  })
}

/**
 * @description 查询项目任务方法接口
 */
export const queryEssentialInformation = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryEssentialInformation',
    method: 'get',
    params: data,
  })
}
/**
 * @description 查询项目下的所有方法
 */
export const queryProjectAllMethods = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/assignMethodPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 创建任务
 */
export const spectrumScanningCreateTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/createTask',
    method: 'post',
    data: data,
  })
}
/**
 * @description 新建方法

 */
export const createMethodPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/createMethodPort',
    method: 'post',
    data: { ...data },
  })
}
/**
 * @description 查看任务
 */
export const queryTaskPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/queryTaskPort',
    method: 'post',
    data: data,
  })
}
/**
 * 选择方法
 */
export const queryMethodProt = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/queryMethodProt',
    method: 'get',
    params: data,
  })
}
/**
 * @description 测量

 */
export const measurementResult = (data: any) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/sse-data`,
    method: 'get',
    headers: {
      Accept: 'text/event-stream',
    },
  })
}
/**
 * @description 测量后的表格获取

 */
export const queryMeasuredData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryMeasuredData',
    method: 'get',
    params: data,
    data: {
      noToken: true,
    },
  })
}
/**
 * @description 公共标准查询

 */
export const queryMultiTables = (id: any) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/detail/multi_tables/${id}`,
    method: 'get',
  })
}
/**
 * @description 参考前处理查询

 */
export const queryCanKaoQianDetail = (data: any) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/noDistinct`,
    method: 'get',
    params: data,
  })
}
/**
 * @description 前处理

 */

export const queryReferenceStandard = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/queryReferenceStandard',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取样品列表，点击样品图标

 */

export const querySampleList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/querySampleList',
    method: 'get',
    params: data,
  })
}
/**
 * @description 添加样品接口
 */
export const addSamplePort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/addSamplePort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 删除样品接口
 */
export const deleteSamplePort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/deleteSamplePort',
    method: 'delete',
    data: data,
  })
}

/**
 * @description 获取模板

 */
export const spectrumGetTemplate = (data: any) => {
  return request({
    url: '/template/get_template',
    method: 'get',
    data: data,
  })
}
/**
 * @description 获取报告模板

 */
export const getReportTemplate = (data: any) => {
  return request({
    url: '/template/get_report_template',
    method: 'get',
    params: data,
  })
}
/**
 * @description 导出原始报告和原始记录
 */

export const exportOriginalReportDocx = (data: any) => {
  return request({
    url: '/template/export_original_report_docx',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取书签
 */

export const spectrumGetBookMark = (params: { template_id: string }) => {
  return request({
    url: '/template/get_bookmark',
    method: 'get',
    params: params,
    data: {
      noToken: true,
    },
  })
}
/**
 * @description 导出word
 */

export const spectrumExportDoc = (data: any) => {
  return request({
    url: '/template/export_doc',
    method: 'post',
    data: data,
  })
}

/**
 * @description 图片上传
 */

export const uploadImage = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/uploadImage',
    method: 'post',
    data: data,
  })
}
/**
 * @description 光谱校零接口
 */

export const zeroCalibrationPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/obtainTheBaseline',
    method: 'get',
    params: data,
  })
}
/**
 * @description 光度定量时间扫描校零接口
 */

export const zeroPhotometricMeasurement = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/zero',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取任务图片接口
 */
export const queryTheTaskImage = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryTheTaskImage',
    method: 'post',
    data: data,
  })
}

/**
 * @description 获取方法下最新的任务id
 */

export const useThisMethodPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/useThisMethodPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 根据任务id获取到项目和方法
 */

export const queryNewMethodTaskInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/queryNewMethodTaskInfo',
    method: 'get',
    params: data,
  })
}

/**
 * @description 使用该方法继续测量
 */

export const useMethodToTest = (data: { methodId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/useMethodToTest',
    method: 'get',
    params: data,
  })
}

/**
 * @description 实验测试方法列表
 */

export const listOfMethods = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/listOfMethods',
    method: 'get',
    params: data,
  })
}

/**
 * @description 方法列表导出
 */
export const methodExport = (data?: any) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/experimenttest/sys/methodExport`,
    method: 'post',
    data: {
      ...data,
      responseType: 'blob',
    },
  })
}

/**
 * @description 总任务数，已完成任务数，已完成方法数，已完成任务数
 */

export const methodsAndTasksNum = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/methodsAndTasksNum',
    method: 'get',
  })
}

/**
 * @description 所有项目查询
 */

export const getProjectsManagementList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/getProjectsManagementList',
    method: 'post',
    data,
  })
}

/**
 * @description 任务查询
 */
export const getTasksManagementList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/getTasksManagementList',
    method: 'post',
    data,
  })
}

/**
 * @description 未完成任务 已完成任务
 */
export const getExperimentTestTasksList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/Tasks',
    method: 'post',
    data: {
      ...data,
      noToken: true,
    },
  })
}

/**
 * @description 查询面板顺序
 */

export const queryPanelOrder = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryPanelOrder',
    method: 'get',
  })
}

/**
 * @description 保存面板顺序
 */

export const savePanelOrder = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/savePanelOrder',
    method: 'post',
    data,
  })
}

/**
 * @description 历史方法
 */
export const conciseQueryHistoryMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryHistoryMethod',
    method: 'post',
    data,
  })
}

/**
 * @description 历史方法修改方法名称
 */
export const conciseUpdateMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/updateMethod',
    method: 'post',
    data,
  })
}

/**
 * @description 历史草稿
 */
export const conciseQueryHistoryTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryHistoryTask',
    method: 'post',
    data,
  })
}

/**
 * @description 历史草稿重命名
 */
export const conciseUpdateTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/updateTask',
    method: 'post',
    data,
  })
}

/**
 * @description 查询默认参数
 */
export const conciseQueryDefaultParameters = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryDefaultParameters',
    method: 'get',
    params,
  })
}

/**
 * @description 查询附件信息
 */
export const conciseQuerySampleAttachmentInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/querySampleAttachmentInfo',
    method: 'get',
    params,
  })
}

/**
 * @description 修改样品池信息
 */
export const conciseChangeSampleAttachmentInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/changeSampleAttachmentInfo',
    method: 'post',
    data,
  })
}

/**
 * @description 检查样品输入参数
 */
export const conciseCheckSampleInputParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/checkSampleInputParam',
    method: 'post',
    data,
  })
}

/**
 * @description 检查公式
 */
export const conciseCheckFormula = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/checkFormula',
    method: 'post',
    data,
  })
}

/**
 * @description 方法删除
 */
export const deleteMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/deleteMethod',
    method: 'post',
    data,
  })
}

/**
 * @description 项目删除
 */
export const deleteProject = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/deleteProject',
    method: 'post',
    data,
  })
}

/**
 * @description 项目删除
 */
export const deleteTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/deleteTask',
    method: 'post',
    data,
  })
}

/**
 * @description 设置为当前样品池
 */
export const conciseSetCurrentPool = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/setCurrentPool',
    method: 'get',
    params,
  })
}

/**
 * @description 另存为
 */
export const conciseCopy = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/copy',
    method: 'post',
    data,
  })
}

/**
 * @description 查询设备类型信息
 */
export const conciseQueryDeviceTypeInfo = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryDeviceTypeInfo',
    method: 'get',
  })
}

/**
 * @description 检查修约区间是否正确
 */
export const conciseCheckApproximateRange = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/checkApproximateRange',
    method: 'post',
    data,
  })
}
