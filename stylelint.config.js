/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  rules: {
    // 1. 颜色格式规则
    'color-hex-length': null, // 允许 #ffffff 和 #fff 两种格式
    'color-function-notation': null, // 允许 rgba() 和 rgb() 两种格式
    'alpha-value-notation': null, // 允许 0.5 和 50% 两种格式
    'hue-degree-notation': null, // 允许 160 和 160deg 两种格式
    'color-function-alias-notation': null,
    // 2. 自定义属性（CSS变量）规则
    'custom-property-empty-line-before': null, // 关闭自定义属性前的空行检查

    // 3. 其他规则
    'value-keyword-case': null, // 允许 optimizeLegibility 大小写
    'import-notation': null, // 允许 @import "./base.css" 不带 url()
    'shorthand-property-no-redundant-values': null, // 允许 16px 16px 这种写法
    'length-zero-no-unit': null, // 允许 0px 带单位
    'no-empty-source': null, // 允许空的样式块（Vue文件可能有用）
    'rule-empty-line-before': null,
    'declaration-empty-line-before':null,
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
  },
}
