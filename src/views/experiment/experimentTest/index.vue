<template>
  <div class="experimentTest text-base">
    <headTitle title="快速测量">
      <template #btn>
        <div class="gap-4 flex">
          <SettingOutlined @click="handleEnvParams" class="text-xl cursor-auto" />
        </div>
      </template>
    </headTitle>
    <br />
    <div>
      您可以直接完成：<span
        class="cursor-pointer"
        @click="goOtherPage(item.path)"
        v-for="(item, index) in permissExperiment"
        :key="`${index}`"
        >{{ item.pemissLabel }}&nbsp;&nbsp;&nbsp;</span
      >
    </div>
    <br />
    <headTitle title="最近的任务">
      <template #btn>
        <div class="gap-4 flex">
          <uvHasIconBtn content="创建任务" @click="handleCreateTask">
            <template #icon>
              <DownloadOutlined />
            </template>
          </uvHasIconBtn>
          <uvHasIconBtn content="接受新任务">
            <template #icon>
              <DownloadOutlined />
            </template>
          </uvHasIconBtn>
        </div>
      </template>
    </headTitle>
    <br />
    <div>
      <customCard v-for="item in permissExperiment" :key="`${item}`">
        <template #left>
          <div class="!font-bold">地表水202505241426</div>
        </template>
        <template #right>
          <div class="gap-4 text-base">
            <span class="float-right">用此方法直接测量</span>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
          </div>
        </template>
      </customCard>
      <!-- <headTitle title="项目统计">
        <template #center>
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch"
          />
        </template>
        <template #btn>
          <div class="gap-4">
            <uvHasIconBtn content="新建项目" @click="handleCreateProject">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn>
          </div>
        </template>
      </headTitle>-->
    </div>
    <br />
    <uvCollapseRightSlot
      :parentActiveKey="activeKey"
      title="项目统计"
      @changeCollapse="changeCollapse"
    >
      <template #slot-header>
        <uvHasIconBtn content="新建项目" @click.stop="handleCreateProject">
          <template #icon>
            <DownloadOutlined />
          </template>
        </uvHasIconBtn>
      </template>
      <template #slot-center>
        <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      </template>
      <template #slot-content>
        <div>
          您一共参与了<span>10</span>个项目， 其中建立方法<span>25</span>个，
          完成测量任务<span>0</span>个
        </div>
        <br />
        <a-table :dataSource="dataSource" :columns="columns" :paginatio="false">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'operation'">
              <uvHasIconBtn content="项目详情" @click="catProjectDetail">
                <template #icon>
                  <DownloadOutlined />
                </template>
              </uvHasIconBtn>
            </template>
          </template>
        </a-table>
      </template>
    </uvCollapseRightSlot>
    <!-- <a-card title="项目1">
      <template #extra>
        <div class="flex gap-4">
          <span>创建人:admin</span>
          <span>创建时间:2025-05-10</span>
        </div>
      </template>
      <div class="flex gap-4">
        <a-button>新建方法</a-button>
        <a-button>新建任务</a-button>
      </div>
      <br />
      <h2 class="text-l">项目方法列表信息</h2>
      <br />
      <div class="flex items-center gap-4">
        <div>指定方法</div>
        <a-select
          style="width: 375px"
          v-model:value="selectValue"
          mode="multiple"
          placeholder="Please select"
          :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
          @change="handleChange"
        ></a-select>
      </div>
      <br />
      <a-table :dataSource="dataSourceCopy" :columns="columns" :pagination="paginationConfig">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <uvHasIconBtn content="查看详情" @click="catProjectDetail">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn>
          </template>
        </template>
      </a-table>
    </a-card> -->
    <create-task v-model="createTaskVisible" />
    <env-paramater v-model="envVisible" />
    <create-project v-model="projectVisible" />
    <project-detail v-model="detailPvisible" />
  </div>
</template>
<script lang="ts" setup>
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import headTitle from '@/components/headTitle'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'

import createProject from './components/createProject.vue'
import createTask from './components/createTask.vue'
import customCard from './components/customCard.vue'
import envParamater from './components/envParamater.vue'
import projectDetail from './components/projectDetail.vue'
const permissExperiment = ref([
  {
    pemissLabel: '光度测量',
    path: 'lumneScence',
  },
  {
    pemissLabel: '定量测定',
    path: 'quantityDetermind',
  },
  {
    pemissLabel: '光谱扫描',
    path: 'spectralScan',
  },
  {
    pemissLabel: '时间扫描',
    path: 'timeScan',
  },
  {
    pemissLabel: '双分组测量',
    path: 'twoComponentMeasure',
  },
])
const value = ref('')
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    key: 'operation',
    title: '操作',
  },
])
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`)
}
const router = useRouter()
// const dataSourceCopy = ref([
//   {
//     key: '1',
//     name: '胡彦斌',
//     age: 32,
//     address: '西湖区湖底公园1号',
//   },
// ])
// 生成数据的方法
// const generateData = () => {
//   dataSourceCopy.value = Array.from({ length: 50 }, (_, i) => ({
//     key: `${i + 1}`,
//     name: `胡彦斌${i + 1}`,
//     age: 32 + Math.floor(i / 10), // 每10条年龄增加1岁
//     address: `西湖区湖底公园${i + 1}号`
//   }));
// };

// 立即调用生成数据
// generateData();
// const paginationConfig = ref({})
// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}
const selectValue = ref(['a1', 'b2'])
const onSearch = (searchValue: string) => {
  console.log('use value', searchValue)
  console.log('or use this.value', value.value)
}
const goOtherPage = (path: string) => {
  router.push({ name: path })
}
const createTaskVisible = ref<boolean>(false)
const envVisible = ref<boolean>(false)
const projectVisible = ref<boolean>(false)
const detailPvisible = ref<boolean>(false)
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const handleEnvParams = () => {
  envVisible.value = true
}
const handleCreateProject = () => {
  projectVisible.value = true
}
const catProjectDetail = () => {
  detailPvisible.value = true
}
</script>
