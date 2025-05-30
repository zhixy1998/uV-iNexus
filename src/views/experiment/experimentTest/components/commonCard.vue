<template>
  <a-card title="Default size card" style="width: 300px">
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <div>
      <slot name="content"></slot>
    </div>
  </a-card>
  <br/>
</template>
