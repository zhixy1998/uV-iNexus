<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <math-field
    :value="latexStr"
    @input="updateValue($event.target.value)"
    class="uvMathAliveField !w-full"
    style="font-size: 18px; border: 1px solid #dcdfe6"
    ref="mathFieldRef"
  >
    {{ $slots.default?.() }}
  </math-field>
</template>

<script lang="ts" setup>
import { convertAsciiMathToLatex, convertLatexToAsciiMath } from 'mathlive'
const props = defineProps({
  latex: {
    type: String,
    default: '',
  },
})

const asciiMathToLatex = (asciiMath: string): string => {
  // 将星号替换为 \times
  let modifiedAsciiMath = convertAsciiMathToLatex(asciiMath)
  modifiedAsciiMath = modifiedAsciiMath.replace(/\\cdot/g, '\\times')
  return modifiedAsciiMath
}
const latexStr = ref(asciiMathToLatex(props.latex))
// watch(
//   () => props.latex,
//   (val) => {
//     latexStr.value = val as string
//   },
// )
const mathFieldRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['update:latex'])
// 更新值的方法
const updateValue = (newValue: string) => {
  latexStr.value = newValue
  emit('update:latex', convertLatexToAsciiMath(newValue))
}
// 组件挂载后绑定事件
onMounted(() => {
  nextTick(() => {
    const el = mathFieldRef.value as any // 类型为 MathfieldElement
    if (el) {
      // 设置虚拟键盘为手动控制
      // el.mathVirtualKeyboardPolicy = 'manual'
      window.mathVirtualKeyboard.layouts = {
        layers: [
          {
            rows: [
              ['+', '-', '\\times', '\\frac{#@}{#?}', '=', '.', '(', ')', '\\sqrt{#0}', '#@^{#?}'],
              ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
              [
                'α',
                'β',
                'θ',
                'π',
                '\\omega',
                '\\log',
                '\\ln',
                '\\int',
                '\\int_{#@}^{#?}',
                '\\mathrm{d}',
                "\{}'",
              ],
            ],
          },
        ],
      }
      // window.mathVirtualKeyboard.layouts = [
      //   {
      //     label: 'minimal',
      //     tooltip: 'Only the essential',
      //     layers: [
      //       {
      //         style: '.digit { background: blue; color: white }',
      //         rows: [
      //           ['+', '-', '\\times', '\\frac{#@}{#?}', '=', '.', '(', ')', '\\sqrt{#0}', '#@^{#?}'],
      //           [
      //             { class: 'digit', latex: '1' },
      //             { class: 'digit', latex: '2' },
      //             { class: 'digit', latex: '3' },
      //             { class: 'digit', latex: '4' },
      //             { class: 'digit', latex: '5' },
      //             { class: 'digit', latex: '6' },
      //             { class: 'digit', latex: '7' },
      //             { class: 'digit', latex: '8' },
      //             { class: 'digit', latex: '9' },
      //             { class: 'digit', latex: '0' },
      //           ],
      //         ],
      //       },
      //     ],
      //   },
      // ]
      console.log('进入了这里', el)
      // 聚焦时显示虚拟键盘
      // el.addEventListener('focus', () => {
      //   console.log('聚焦')
      //   window.mathVirtualKeyboard.show()
      // })
    }
  })
})
</script>

<style scoped lang="less">
// math-field::part(virtual-keyboard-toggle) {
//   display: none;
// }
math-field::part(menu-toggle) {
  display: none;
}
</style>
<style lang="less">
.ML__keyboard {
  z-index: 99999 !important;
  position: fixed;
  bottom: 0;

  .MLK__backdrop {
    background-color: #cacfd7 !important;
    border-top: 0 !important;
  }
}
</style>
