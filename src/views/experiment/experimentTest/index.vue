<template>
  <div class="experimentTest">
    <headTitle title="快速测量">
      <template #btn>
        <div class="gap-4">
          <uvHasIconBtn content="download">
            <template #icon>
              <DownloadOutlined />
            </template>
          </uvHasIconBtn>
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
        <div class="gap-4">
          <uvHasIconBtn content="download">
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
        <template #left> 地表水202505241426 </template>
        <template #right>
          <div class="gap-4">
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
            <p>使用方法：地表水二氧化硫测量国标方法</p>
          </div>
        </template>
      </customCard>
      <headTitle title="项目统计">
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
            <uvHasIconBtn content="download">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn>
          </div>
        </template>
      </headTitle>
    </div>
    <br />
    <div>
      您一共参与了<span>10</span>个项目， 其中建立方法<span>25</span>个，
      完成测量任务<span>0</span>个
    </div>
    <br />
    <a-table :dataSource="dataSource" :columns="columns" :paginatio="false">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <uvHasIconBtn content="download">
            <template #icon>
              <DownloadOutlined />
            </template>
          </uvHasIconBtn>
        </template>
      </template>
    </a-table>
    <br />
    <a-card title="项目1">
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
            <uvHasIconBtn content="download">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import headTitle from '@/components/headTitle'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'

import customCard from './components/customCard.vue'
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
const dataSourceCopy = ref([])
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
const paginationConfig = ref({})
const selectValue = ref(['a1', 'b2'])
const onSearch = (searchValue: string) => {
  console.log('use value', searchValue)
  console.log('or use this.value', value.value)
}
const goOtherPage = (path: string) => {
  router.push({ name: path })
}
</script>
