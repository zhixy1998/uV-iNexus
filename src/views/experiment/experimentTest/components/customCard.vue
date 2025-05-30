<template>
  <a-card>
    <div class="flex">
      <div class="flex-1 p-2 text-xl">
        <slot name="left"></slot>
      </div>
      <div class="h-auto w-px bg-gray-200 my-2"></div>
      <div class="flex-1 p-2 text-4">
        <slot name="right"></slot>
      </div>
    </div>
  </a-card>
  <br />
</template>
