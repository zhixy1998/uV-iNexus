import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    // // 添加 rules
    rules: {
      'simple-import-sort/imports': 'error', // 自动排序 imports
      'simple-import-sort/exports': 'error', // 自动排序 exports
      // vue/multi-word-component-names 规则
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', '404'], // 允许名为 'index' 的组件
        },
      ],
      // 添加 TypeScript 未使用变量规则的例外
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
