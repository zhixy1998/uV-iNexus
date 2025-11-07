/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // 匹配 Ant Design 的断点
      xs: { max: '575px' }, // xs: <576px
      sm: '576px', // sm: ≥576px
      md: '768px', // md: ≥768px
      lg: '992px', // lg: ≥992px
      xl: '1200px', // xl: ≥1200px
      xxl: '1600px', // xxl: ≥1600px
    },
    extend: {},
    corePlugins: {
      preflight: false, // 避免与 Ant Design 样式冲突
    },
  },
}
