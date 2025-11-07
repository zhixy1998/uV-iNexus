<template>
  <a-directory-tree
    class="uv-directory-tree"
    :tree-data="treeData"
    :default-expand-all="true"
    :multiple="true"
  >
    <template #title="{ data }">
      <img :src="selectIcon" v-if="data.level === 2 && data.showRedDot" class="red-dot" />
      <span class="!w-[200px] !inline-block !whitespace-nowrap !overflow-hidden !text-ellipsis">
        {{ data.title }}
      </span>
      <a-select
        v-if="data.level === 2"
        class="!w-[200px] !ml-[10px]"
        :value="data.selectValue"
        :options="data.options"
        @change="(value: any) => handleSelectChange(data.key, value)"
      />
    </template>
  </a-directory-tree>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import type { SelectProps } from 'ant-design-vue/es/select'
import {
  FolderOpenOutlined,
  FileTextOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
} from '@ant-design/icons-vue'
import Icon from 'ant-design-vue'
import selectIcon from '@/assets/images/methodOptimization/selected_icon.png'

// 自定义展开/折叠图标
const expandIcon = ({ expanded }: { expanded: boolean }) => {
  return h(Icon, {
    type: expanded ? CaretDownOutlined : CaretRightOutlined,
    style: { marginRight: '6px', fontSize: '14px' },
  })
}

// 定义树节点数据结构
interface TreeDataNode {
  key: string
  title: string
  level: number // 1: 第一层文件夹, 2: 第二层文件
  children?: TreeDataNode[]
  hasSelector?: boolean // 是否显示下拉选择器
  options?: SelectProps['options'] // 下拉选项
  selectValue?: string // 下拉选中值
  showRedDot?: boolean // 是否显示红点标识
}

// 初始化树形数据
// 第一层（level:1）不显示红点，第二层（level:2）显示红点
const treeData = reactive<TreeDataNode[]>([
  {
    key: 'wavelength',
    title: '波长示值误差与重复性检验',
    level: 1,
    // 第一层不显示红点
    showRedDot: false,
    children: [
      {
        key: 'lamp-656.1',
        title: '氘灯656.1',
        level: 2,
        hasSelector: true,
        options: [{ label: '内置氘灯', value: 'internal-deuterium' }],
        selectValue: 'internal-deuterium',
        showRedDot: true,
      },
      {
        key: 'lamp-486',
        title: '氘灯486',
        level: 2,
        hasSelector: true,
        options: [{ label: '内置氘灯', value: 'internal-deuterium' }],
        selectValue: 'internal-deuterium',
        showRedDot: true,
      },
      {
        key: 'error-filter',
        title: '错误滤光片',
        level: 2,
        hasSelector: true,
        options: [{ label: '标准错误滤光片-1001', value: 'std-error-1001' }],
        selectValue: 'std-error-1001',
        showRedDot: true,
      },
    ],
  },
  {
    key: 'transmittance',
    title: '透射比示值误差与重复性检验',
    level: 1,
    showRedDot: false,
    children: [
      {
        key: 'neutral-10',
        title: '10%中性滤光片',
        level: 2,
        hasSelector: true,
        options: [{ label: '10%中性滤光片', value: 'neutral-10' }],
        selectValue: 'neutral-10',
        showRedDot: true,
      },
      {
        key: 'neutral-20',
        title: '20%中性滤光片',
        level: 2,
        hasSelector: true,
        options: [{ label: '20%中性滤光片', value: 'neutral-20' }],
        selectValue: 'neutral-20',
        showRedDot: true,
      },
    ],
  },
])

// 处理下拉选择变化
const handleSelectChange = (key: string, value: string) => {
  const updateNodeValue = (nodes: TreeDataNode[]) => {
    for (const node of nodes) {
      if (node.key === key) {
        node.selectValue = value
        return true
      }
      if (node.children && updateNodeValue(node.children)) {
        return true
      }
    }
    return false
  }

  updateNodeValue(treeData)
  console.log(`节点 ${key} 选择值变更为:`, value)
}
defineExpose({
  treeData,
})
</script>

<style scoped lang="less">
.ant-tree.ant-tree-directory .ant-tree-treenode {
  height: 50px;
  display: flex;
  align-items: center;
}

/* 红色圆点样式 - 仅第二层显示，与第一层图标对齐 */
.red-dot {
  position: absolute;
  left: -14px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* 节点图标样式 */
.node-icon {
  margin-right: 6px;
  font-size: 16px;
  flex-shrink: 0;
}

.node-label {
  margin-right: 8px;
  flex-shrink: 0;
}

/* 调整缩进和对齐，确保红点与上层图标位置对应 */
:deep(.ant-tree-node-content-wrapper) {
  padding: 2px 0 !important;
}

:deep(.ant-tree-indent-unit) {
  width: 16px !important;
}

/* 第一层节点样式 */
:deep(.ant-tree-node:first-child .ant-tree-node-content-wrapper) {
  padding-left: 4px !important;
}

/* 第二层节点的红点与第一层图标对齐 */
:deep(.ant-tree-child-tree .ant-tree-node-content-wrapper) {
  position: relative;
  padding-left: 4px !important;
}
</style>
