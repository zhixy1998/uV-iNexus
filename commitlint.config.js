export default {
  extends: ['@commitlint/config-conventional'],
   rules: {
    'type-empty': [2, 'never'],  // 禁止 type 为空
    'subject-empty': [2, 'never'], // 禁止 subject 为空
    'subject-case': [0], // 关闭 subject 大小写检查（允许中文 subject）
  }
}
