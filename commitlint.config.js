/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

export default {
  extends: ['@commitlint/config-conventional'],
   rules: {
    'type-empty': [2, 'never'],  // 禁止 type 为空
    'subject-empty': [2, 'never'], // 禁止 subject 为空
    'subject-case': [0], // 关闭 subject 大小写检查（允许中文 subject）
  }
}
