<template>
  <a-select
    v-model:value="value"
    mode="mode"
    style="width: 100%"
    :placeholder="placeholder"
    :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  value: String,
  mode:{
    type:String,
    default:'multiple',
  },
  placeholder:{
    type:String,
    default:'请选择'
  }
})
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
const value = ref(['a1', 'b2']);
</script>
