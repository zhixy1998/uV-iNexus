<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!leading-9 text-[16px] page-container">
    <div class="bg-box">
      <div class="flex justify-center items-center">
        <div
          v-for="item in tabList"
          :key="item.key"
          class="tab-item-box"
          :class="[
            activeKey !== item.key
              ? 'border-2 border-[#969595]'
              : 'border-2 border-[#113371] bg-[#113371]',
          ]"
          @click="handleTabs(item.key)"
        >
          <div
            class="w-[10px] h-[10px] border-2 rounded-full"
            :class="[activeKey === item.key ? 'border-[#fff]' : 'border-[#969595]']"
          ></div>
          <div class="flex items-center">
            <div class="h-[30px] w-[auto]">
              <img
                class="w-[100%] h-[100%]"
                :src="activeKey === item.key ? item.activeIconPath : item.iconPath"
              />
            </div>
            <div
              class="!ml-[15px]"
              :class="[activeKey === item.key ? 'text-[#fff]' : 'text-[#969595]']"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <report-template
        :title="activeKey === 0 ? '测量数据模板列表' : '原始记录报告模板列表'"
        :menuType="0"
        :activeTab="activeKey"
        :columns="tableColumns"
        :updateData="updateData"
        :templateId="currentRow?.id"
        @handleCurrentRowChange="handleCurrentRowChange"
      />
      <div class="title" :style="{ color: primaryColor }">模板展示区</div>
      <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
      <div class="content-box">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <a-button
              type="primary"
              class="!flex flex-row items-center !mr-10"
              @click="handleSourceCode"
            >
              <template #icon>
                <form-outlined />
              </template>
              源码编辑
            </a-button>
            <a-button
              type="primary"
              class="!flex flex-row items-center !mr-10"
              @click="updateBookmark(0)"
            >
              <template #icon>
                <eye-outlined />
              </template>
              预览
            </a-button>
            <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleSave">
              <template #icon>
                <save-outlined />
              </template>
              保存
            </a-button>
            <a-button type="primary" class="!flex flex-row items-center" @click="handleSaveAs">
              <template #icon>
                <save-outlined />
              </template>
              另存为新模板
            </a-button>
          </div>
        </div>
        <div class="file-preview !mt-7">
          <div class="file-preview-left">
            <div class="!mb-2">选择模板内容：</div>
            <a-spin :spinning="loadingTree">
              <a-tree
                v-if="fileFormatTreeOptions && fileFormatTreeOptions.length"
                v-model:checkedKeys="checkedKeys"
                checkable
                :tree-data="fileFormatTreeOptions"
                :field-names="{
                  children: 'children',
                  key: 'id',
                }"
                @check="handleCheckTree"
              >
                <template #title="{ data }">
                  <div class="flex flex-row !justify-between !flex-wrap file-preview-left-tree">
                    <a-tooltip>
                      <template #title>{{ data.name }}</template>
                      <div class="text-ellipsis !mr-1">{{ data.name }}</div>
                    </a-tooltip>
                    <div v-if="!data.parent_id">
                      <!-- <form-outlined
                    :style="{ color: primaryColor }"
                    @click.prevent="handleEditLabel(data)"
                  /> -->
                      <template v-if="data.type === 0">
                        <a-select
                          ref="select"
                          v-model:value="data.font"
                          placeholder="字体"
                          class="!mr-2 w-[100px]"
                          :bordered="false"
                          :showArrow="false"
                          @click.prevent
                          @change="updateParentFont('font', data, $event)"
                        >
                          <a-select-option
                            v-for="fontFamilyItem in fontFamilyOptions"
                            :key="fontFamilyItem.value"
                            :value="fontFamilyItem.value"
                            >{{ fontFamilyItem.name }}</a-select-option
                          >
                        </a-select>
                        <a-select
                          ref="select"
                          v-model:value="data.font_size"
                          placeholder="字号"
                          class="w-[100px]"
                          :bordered="false"
                          :showArrow="false"
                          @click.prevent
                          @change="updateParentFont('font_size', data, $event)"
                        >
                          <a-select-option
                            v-for="fontSizeItem in fontSizeOptions"
                            :key="fontSizeItem.value"
                            :value="fontSizeItem.value"
                            >{{ fontSizeItem.name }}</a-select-option
                          >
                        </a-select>
                      </template>
                      <template v-if="data.type === 2">
                        <a-select
                          ref="select"
                          v-model:value="data.img_size"
                          placeholder="宽度"
                          class="w-[130px]"
                          :bordered="false"
                          :showArrow="false"
                          @click.prevent
                          @change="updateParentFont('img_size', data, $event)"
                        >
                          <a-select-option
                            v-for="imgSizeItem in imgSizeOptions"
                            :key="imgSizeItem.value"
                            :value="imgSizeItem.value"
                            >{{ imgSizeItem.name }}</a-select-option
                          >
                        </a-select>
                      </template>
                    </div>
                  </div>
                </template>
              </a-tree>
              <div v-else class="!mt-[15px] !ml-[20px] text-[#999] text-[15px]">暂无数据</div>
            </a-spin>
          </div>
          <div class="file-preview-right">
            <div class="text-center">预览模板内容</div>
            <a-spin :spinning="loading">
              <template v-if="fileContent">
                <div class="file-preview-right-preview">
                  <img :src="fileContent" />
                </div>
                <!-- <div class="text-center text-[14px]">
              <span
                class="!mr-5 cursor-pointer"
                :style="{ color: pagination.current === 1 ? '#999' : '' }"
                @click="handlePage(0)"
              >
                上一页
              </span>
              <span>
                <span :style="{ color: '#82ba38' }">{{ pagination.current }}</span>
                <span>/{{ pagination.total }}</span>
              </span>
              <span
                class="!ml-5 cursor-pointer"
                :style="{ color: pagination.current === pagination.total ? '#999' : '' }"
                @click="handlePage(1)"
              >
                下一页
              </span>
            </div> -->
              </template>
              <template v-else>
                <div
                  v-if="currentRow && currentRow.name"
                  class="underline cursor-pointer break-all"
                  :style="{ color: primaryColor }"
                  @click="updateBookmark(0)"
                >
                  {{ currentHref }}/{{ currentRow?.name }}
                </div>
                <div v-else class="text-[#999] text-[15px]">暂无数据</div>
              </template>
            </a-spin>
          </div>
        </div>
        <a-spin :spinning="loadingTree">
          <div
            v-for="item in extraInfo.title_list"
            :key="item.bm_id"
            class="flex items-center !mt-6 text-[15px]"
          >
            <div class="w-[115px]">{{ item.name }}：</div>
            <a-input v-model:value="item.value" placeholder="请输入" class="!mr-2 !w-[250px]" />
            <a-select
              ref="select"
              v-model:value="item.font"
              placeholder="字体"
              class="!mr-2 w-[120px]"
              @click.prevent
            >
              <a-select-option
                v-for="fontFamilyItem in fontFamilyOptions"
                :key="fontFamilyItem.value"
                :value="fontFamilyItem.value"
                >{{ fontFamilyItem.name }}</a-select-option
              >
            </a-select>
            <a-select
              ref="select"
              v-model:value="item.font_size"
              placeholder="字号"
              class="w-[120px]"
              @click.prevent
            >
              <a-select-option
                v-for="fontSizeItem in fontSizeOptions"
                :key="fontSizeItem.value"
                :value="fontSizeItem.value"
                >{{ fontSizeItem.name }}</a-select-option
              >
            </a-select>
          </div>
          <div v-if="extraInfo.hasOwnProperty('header') && extraInfo.header" class="!mt-6">
            <a-checkbox v-model:checked="checkedHeader">
              <div class="flex items-center text-[15px]">
                <div class="!w-[90px]">页眉：</div>
                <a-input
                  v-model:value="extraInfo.header.value"
                  placeholder="请输入"
                  class="!mr-2 !w-[250px]"
                />
                <a-select
                  ref="select"
                  v-model:value="extraInfo.header.font"
                  placeholder="字体"
                  class="!mr-2 w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontFamilyItem in fontFamilyOptions"
                    :key="fontFamilyItem.value"
                    :value="fontFamilyItem.value"
                    >{{ fontFamilyItem.name }}</a-select-option
                  >
                </a-select>
                <a-select
                  ref="select"
                  v-model:value="extraInfo.header.font_size"
                  placeholder="字号"
                  class="w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontSizeItem in fontSizeOptions"
                    :key="fontSizeItem.value"
                    :value="fontSizeItem.value"
                    >{{ fontSizeItem.name }}</a-select-option
                  >
                </a-select>
              </div>
            </a-checkbox>
          </div>
          <div v-if="extraInfo.hasOwnProperty('footer') && extraInfo.footer" class="!mt-6">
            <a-checkbox v-model:checked="checkedFooter">
              <div class="flex items-center text-[15px]">
                <div class="!w-[90px]">页脚：</div>
                <a-input
                  v-model:value="extraInfo.footer.value"
                  placeholder="请输入"
                  class="!mr-2 !w-[250px]"
                />
                <a-select
                  ref="select"
                  v-model:value="extraInfo.footer.font"
                  placeholder="字体"
                  class="!mr-2 w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontFamilyItem in fontFamilyOptions"
                    :key="fontFamilyItem.value"
                    :value="fontFamilyItem.value"
                    >{{ fontFamilyItem.name }}</a-select-option
                  >
                </a-select>
                <a-select
                  ref="select"
                  v-model:value="extraInfo.footer.font_size"
                  placeholder="字号"
                  class="w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontSizeItem in fontSizeOptions"
                    :key="fontSizeItem.value"
                    :value="fontSizeItem.value"
                    >{{ fontSizeItem.name }}</a-select-option
                  >
                </a-select>
              </div>
            </a-checkbox>
          </div>
          <div
            v-if="extraInfo.hasOwnProperty('note') && extraInfo.note"
            class="!mt-6 flex note-box"
          >
            <a-checkbox v-model:checked="checkedNote">
              <div class="flex items-start text-[15px]">
                <div class="!w-[90px] flex shrink-0">备注：</div>
                <a-textarea
                  v-model:value="extraInfo.note.value"
                  placeholder="请输入"
                  class="!mr-2 !w-[250px]"
                  :rows="4"
                />
                <a-select
                  ref="select"
                  v-model:value="extraInfo.note.font"
                  placeholder="字体"
                  class="!mr-2 w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontFamilyItem in fontFamilyOptions"
                    :key="fontFamilyItem.value"
                    :value="fontFamilyItem.value"
                    >{{ fontFamilyItem.name }}</a-select-option
                  >
                </a-select>
                <a-select
                  ref="select"
                  v-model:value="extraInfo.note.font_size"
                  placeholder="字号"
                  class="w-[120px]"
                  @click.prevent
                >
                  <a-select-option
                    v-for="fontSizeItem in fontSizeOptions"
                    :key="fontSizeItem.value"
                    :value="fontSizeItem.value"
                    >{{ fontSizeItem.name }}</a-select-option
                  >
                </a-select>
              </div>
            </a-checkbox>
          </div>
        </a-spin>
      </div>
      <editModal
        ref="editModalRef"
        title="另存为新模板"
        :formState="formState"
        :formOptions="formOptions"
        :rules="rules"
        @update:modelValue="updateLabel"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  ClockCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
  FileTextOutlined,
  FormOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { getFontOptions, getReportBookmark, getReportBookmarkTitle, previewReport } from '@/api'
import { useAppStore } from '@/stores'
import type { formOptionsType } from '@/types/common'
import reportTemplate from '@/views/reportDesign/components/reportTemplate.vue'

import editModal from '../components/editModal.vue'
import original_icon from '@/assets/images/report/original_icon.png'
import original_selected_icon from '@/assets/images/report/original_selected_icon.png'
import report_icon from '@/assets/images/report/report_icon.png'
import report_selected_icon from '@/assets/images/report/report_selected_icon.png'

const router = useRouter()

const { primaryColor } = useAppStore()

// tabs
const activeKey = ref(0)
const tabList = ref([
  {
    label: '测量数据模板',
    key: 0,
    iconPath: original_icon,
    activeIconPath: original_selected_icon,
  },
  {
    label: '原始记录模板',
    key: 1,
    iconPath: report_icon,
    activeIconPath: report_selected_icon,
  },
])
const handleTabs = (key: number) => {
  activeKey.value = key
}

// 表格
const updateData = ref(false) // 更新数据
const tableColumns = [
  {
    title: '模板ID',
    field: 'id',
    sortable: true,
    width: 120,
  },
  {
    title: '模板名称',
    field: 'name',
  },
  {
    title: '类型',
    field: 'type_decs',
  },
  {
    title: '创建时间',
    field: 'create_datetime',
    sortable: true,
    width: 170,
  },
  {
    title: '修改时间',
    field: 'update_datetime',
    sortable: true,
    width: 170,
  },
  {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: 120,
    slots: {
      default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
    },
  },
]
const currentRow = ref<any>() // 选中的模板id
const handleCurrentRowChange = async (row: { id: number; type_decs: string }) => {
  loadingTree.value = true
  currentRow.value = row
  const { code, data } = await getReportBookmark({
    template_id: currentRow.value.id,
  })
  if (code === 200) {
    fileFormatTreeOptions.value = [
      ...(data.bookmarks[0] || []),
      ...(data.bookmarks[1] || []),
      ...(data.bookmarks[2] || []),
    ]
    fileFormatTileOptions.value = flattenTree(fileFormatTreeOptions.value)
    checkedKeys.value = fileFormatTileOptions.value.map((item: any) => item.id) // 默认全部勾选
    checkedNodesData.value = fileFormatTileOptions.value.map((item: any) => item)
    fileContent.value = ''
  }
  await getReportBookmarkTitleFun()
  loadingTree.value = false
}

// 平铺树
const flattenTree = (nodes: any[], result = [] as any[]) => {
  for (const node of nodes) {
    result.push(node)
    if (node.children && node.children.length > 0) {
      flattenTree(node.children, result)
    }
  }
  return result
}

// 模板标签
const loadingTree = ref(true)
const fileFormatTreeOptions = ref<any>([]) // 树结构
const fileFormatTileOptions = ref<any>([]) // 平铺结构
const checkedKeys = ref<string[]>([]) // 勾选的节点 key 数组
const checkedNodesData = ref<any>([]) // 勾选的节点数据
const updateParentFont = (key: string, node: any, newVlue: string) => {
  // 更新当前节点
  node[key] = newVlue
  // 如果有子节点，递归更新
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: any) => {
      updateParentFont(key, child, newVlue)
    })
  }
}
// const handleCheckTree = (checkedKeys: string[], { checkedNodes }: any) => {
//   checkedNodesData.value = checkedNodes
// }
// 修改 handleCheckTree 方法
const handleCheckTree = (checkedKeys: string[], { checkedNodes, node, checked }: any) => {
  // 先保存直接选中的节点
  checkedNodesData.value = checkedNodes

  // 获取所有父节点（包括间接父节点）
  const parentNodes = getAllParentNodes(fileFormatTreeOptions.value, checkedKeys)

  // 将父节点添加到选中节点数据中（如果还没有的话）
  parentNodes.forEach((parentNode: any) => {
    const isAlreadyIncluded = checkedNodesData.value.some((node: any) => node.id === parentNode.id)
    if (!isAlreadyIncluded) {
      checkedNodesData.value.push(parentNode)
    }
  })
}

// 获取所有被选中子节点的父节点
const getAllParentNodes = (treeData: any[], checkedKeys: string[]): any[] => {
  const parentNodes: any[] = []
  const checkedSet = new Set(checkedKeys)
  const traverse = (nodes: any[], parent: any = null) => {
    nodes.forEach((node) => {
      // 如果当前节点有子节点
      if (node.children && node.children.length > 0) {
        // 检查是否有子节点被选中
        const hasCheckedChild = hasCheckedDescendant(node.children, checkedSet)

        // 如果有子节点被选中，且父节点不在结果数组中，则添加父节点
        if (hasCheckedChild) {
          const isAlreadyAdded = parentNodes.some((p) => p.id === node.id)
          if (!isAlreadyAdded) {
            parentNodes.push(node)
          }
        }

        // 继续遍历子节点
        traverse(node.children, node)
      }
    })
  }

  traverse(treeData)
  return parentNodes
}

// 检查是否有后代节点被选中
const hasCheckedDescendant = (children: any[], checkedSet: Set<string>): boolean => {
  for (const child of children) {
    if (checkedSet.has(child.id)) {
      return true
    }
    if (child.children && child.children.length > 0) {
      if (hasCheckedDescendant(child.children, checkedSet)) {
        return true
      }
    }
  }
  return false
}

// 标题、页眉、页脚
const extraInfo = ref<{
  footer?: {
    value: string
    font: string | null
    font_size: number | null
  }
  header?: {
    value: string
    font: string | null
    font_size: number | null
  }
  note?: {
    value: string
    font: string | null
    font_size: number | null
  }
  title_list?: { bm_id: string; name: string; value: string; font: string; font_size: number }[]
}>({
  footer: {
    value: '',
    font: null,
    font_size: null,
  },
  header: {
    value: '',
    font: null,
    font_size: null,
  },
  note: {
    value: '',
    font: null,
    font_size: null,
  },
  title_list: [],
})
const getReportBookmarkTitleFun = async () => {
  const { code, data } = await getReportBookmarkTitle({ template_id: currentRow.value.id })
  if (code === 200) {
    extraInfo.value = data
  }
}
const checkedHeader = ref(true) // 勾选页眉
const checkedFooter = ref(true) // 勾选页脚
const checkedNote = ref(true) // 勾选备注

// 字体字号图片下拉
const fontFamilyOptions = ref<
  {
    name: string
    value: string
  }[]
>([])
const fontSizeOptions = ref<
  {
    name: string
    value: string
  }[]
>([])
const imgSizeOptions = ref<
  {
    name: string
    value: string
  }[]
>([])
const getFontOptionsFun = async () => {
  const { code, data } = await getFontOptions()
  if (code === 200) {
    fontFamilyOptions.value = data.word_font_type
    fontSizeOptions.value = data.word_font_size
    imgSizeOptions.value = data.word_img_size
  }
}

// 预览
const loading = ref(false)
const currentHref = window.location.href
const fileContent = ref<string>('')
const updateBookmark = async (operation_type: 0 | 1 | 2, name?: string) => {
  if (operation_type === 0) loading.value = true
  const { code, data, message } = await previewReport({
    template_id: currentRow.value.id,
    bookmark_list:
      checkedNodesData.value && checkedNodesData.value.length
        ? checkedNodesData.value.map((item: any) => ({
            bm_id: item.id,
            font: item.font,
            font_size: item.font_size,
          }))
        : [],
    title_list:
      extraInfo.value.title_list && extraInfo.value.title_list.length
        ? extraInfo.value.title_list.map((item: any) => ({
            bm_id: item.bm_id,
            font: item.font,
            font_size: item.font_size,
            value: item.value,
          }))
        : [],
    header: checkedHeader.value ? extraInfo.value.header : null,
    footer: checkedFooter.value ? extraInfo.value.footer : null,
    note: checkedNote.value ? extraInfo.value.note : null,
    operation_type,
    name: operation_type === 1 ? name : '',
  })
  if (code === 200) {
    fileContent.value = data.file_base64
    loading.value = false
    if (operation_type === 1) {
      notification.success({
        message: '成功！',
        description: message,
        duration: 3,
      })
      editModalRef.value.uvFormRef.resetForm()
      updateData.value = !updateData.value
    }
  }
}

// 源码编辑
const handleSourceCode = () => {
  router.push('/reportDesign/templateEdit')
}

// 保存
const handleSave = async () => {
  updateBookmark(2)
}

// 另存为新模板
const editModalRef = ref()
const formState = reactive<{
  name: string
}>({
  name: '',
})
const rules = ref({
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '模板名称',
    props: 'name',
  },
])
const handleSaveAs = async () => {
  editModalRef.value.showModal()
}
const updateLabel = ({ name }: { name: string }) => {
  updateBookmark(1, name)
}

// 模板分页
const pagination = ref({
  current: 1,
  total: 3,
})
const handlePage = (type: number) => {
  if (type === 0) {
    if (pagination.value.current > 1) {
      pagination.value.current--
    }
  } else {
    if (pagination.value.current < pagination.value.total) {
      pagination.value.current++
    }
  }
}

onMounted(async () => {
  await getFontOptionsFun()
})
</script>

<style lang="less" scoped>
.page-container {
  padding: 20px;
  box-shadow: 8px 8px 27px 2px #c5c5c5 !important;
  border-radius: 30px;
  background: #ffffff;
  .bg-box {
    border-radius: 22px;
    background: rgba(233, 241, 253, 0.5);
  }
}
.title {
  padding: 0px 20px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}
.content-box {
  padding: 35px 20px;
  .file-preview {
    display: flex;
    .file-preview-left {
      width: 40%;
      padding: 20px;
      font-size: 15px;
      color: #333;
      line-height: 36px;
      max-height: 700px;
      overflow-y: auto;
      background: #ffffff;
      border-radius: 43px;
      .file-preview-left-tree {
        .text-ellipsis {
          width: 135px;
          white-space: nowrap; /* 禁止换行 */
          overflow: hidden; /* 隐藏溢出内容 */
          text-overflow: ellipsis; /* 溢出部分显示为省略号 */
        }
      }
    }
    .file-preview-right {
      margin-left: 20px;
      width: 60%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      max-height: 700px;
      overflow-y: auto;
      background: #ffffff;
      border-radius: 43px;
      .file-preview-right-preview {
        margin-top: 30px;
        // height: 100%;
        // max-height: 700px;
        // overflow-y: auto;
      }
    }
  }
}

.tab-item-box {
  margin: 20px 30px 30px;
  padding: 5px 30px 5px 30px;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
}

.note-box {
  :deep(.ant-checkbox) {
    align-self: flex-start;
    top: 4px;
  }
}

:deep(.ant-tree-title) {
  font-size: 15px;
  line-height: 50px;
}

:deep(.ant-tree .ant-tree-switcher) {
  display: flex;
  align-items: center !important;
}

:deep(.ant-tree .ant-tree-checkbox + span.ant-tree-node-selected) {
  background-color: #fff;
}

:deep(.ant-select-selector) {
  color: #153471;
}

:deep(.ant-tabs-tab-btn) {
  span {
    font-weight: bold;
  }
}

:deep(.ant-tabs-tab .anticon) {
  margin-right: 5px;
}
</style>
