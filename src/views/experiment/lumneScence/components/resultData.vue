<template>
  <section>
    <headTitle title="结果数据">
      <template #btn>
        <div class="flex gap-4 items-center">
          <a-checkbox v-model:checked="checked">显示已删除的数据</a-checkbox>
          <div class="flex items-center">
            <span>Abs显示位数</span>
            <a-select ref="select" v-model:value="value1" @change="handleChange" class="w-xs !ml-2">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </div>
        </div>
      </template>
    </headTitle>
    <br />
    <div class="flex justify-around">
      <uvHasIconBtn content="校零">
        <template #icon>
          <DownloadOutlined />
        </template>
      </uvHasIconBtn>
      <uvHasIconBtn content="测量">
        <template #icon>
          <DownloadOutlined />
        </template>
      </uvHasIconBtn>
      <uvHasIconBtn content="样品">
        <template #icon>
          <DownloadOutlined />
        </template>
      </uvHasIconBtn>
      <div class="showWord">
        <div>475nm</div>
        <div>0.383Abs</div>
      </div>
    </div>
    <br />
    <uvEditCellTable
      :columns="columns"
      :data-source="tableData"
      row-key="id"
      :selected-row-keys="selectedRowKeys"
      :editable-columns="['name', 'age', 'address']"
      @update:selected-row-keys="handleSelectChange"
      @save="handleSave"
      @delete="handleDelete"
      @cell-edit="handleCellEdit"
    />
    <br />
    <div class="flex justify-around">
      <uvHasIconBtn content="保存" @click="showSaveVisual"> </uvHasIconBtn>
      <uvHasIconBtn content="另存为"> </uvHasIconBtn>
      <uvHasIconBtn content="导出到word"> </uvHasIconBtn>
    </div>
  </section>
  <uvModal v-model="saveVisual" size="smail" title="保存">
    <template #content>
      <div class="flex items-center">
        <div class="w-20">数据名称</div>
        <a-input ref="select" v-model:value="value1" class="w-xs !ml-2"> </a-input>
      </div>
      <br />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

import headTitle from '@/components/headTitle'
import uvEditCellTable from '@/components/uvEditCellTable/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
const columns = ref([
  {
    title: '序号',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '编号',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
])
const tableData = ref([
  {
    id: '1',
    name: '张三',
    age: 30,
    address: '北京市朝阳区',
  },
  {
    id: '2',
    name: '李四',
    age: 25,
    address: '上海市浦东新区',
  },
  {
    id: '3',
    name: '王五',
    age: 28,
    address: '广州市天河区',
  },
])
const checked = ref(false)
const value1 = ref('')
const selectedRowKeys = ref<string[]>([])
const saveVisual = ref(false)
const showSaveVisual = () => {
  saveVisual.value = true
}
const handleSelectChange = (keys: string) => {
  selectedRowKeys.value = [keys]
  console.log('选中行:', keys)
}

const handleSave = (record: unknown) => {
  console.log('保存行:', record)
  // 这里可以调用API保存数据
}

const handleDelete = (record: unknown) => {
  console.log('删除行:', record)
  // tableData.value = tableData.value.filter((item) => item.id !== record.id)
}

const handleCellEdit = ({
  record,
  dataIndex,
  value,
}: {
  record: string
  dataIndex: number
  value: unknown
}) => {
  console.log('单元格编辑:', record, dataIndex, value)
  // 这里可以调用API保存单元格数据
}
const handleChange = () => {}
</script>
