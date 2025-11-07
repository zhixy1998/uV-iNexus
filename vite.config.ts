/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import type { Plugin as VitePlugin } from 'vite'
import { defineConfig } from 'vite'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
import vueDevTools from 'vite-plugin-vue-devtools'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
import basicSsl from '@vitejs/plugin-basic-ssl'
// @ts-ignore
import postcssPxtorem from 'postcss-pxtorem'
// https://vite.dev/config/
const minimizeObfuscatorConfig = {
  enable: true,
  log: true,
  autoExcludeNodeModules: true,
  threadPool: true,
};

const plugins = [
  vue(),
  tailwindcss() as VitePlugin[],
  vueDevTools() as VitePlugin,
  lazyImport({
    resolvers: [
      VxeResolver({ libraryName: 'vxe-table' }),
      VxeResolver({ libraryName: 'vxe-pc-ui' }),
    ],
  }),
  VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [path.resolve(__dirname, 'locales/**')],
  }),
  AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n'],
    dts: 'src/types/auto-imports.d.ts',
    dirs: ['src/stores', 'src/utils/hooks'],
    vueTemplate: true,
  }),
  Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'src/types/components.d.ts',
  }),
  vitePluginBundleObfuscator(minimizeObfuscatorConfig),
  // basicSsl(),
]
export default defineConfig({
  base: '/',
  plugins,
  server: {
    host: '0.0.0.0',
    open: true,
    // @ts-ignore
    // https: true,
    port: 43082,
    proxy: {
      '/uv-nexus': {
        // target: 'http://192.168.51.38:8081/', //徐典
        target: 'http://192.168.51.30:8081/', //王少杰
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/uv-nexus/, ''), // 不可以省略rewrite
      },
      '/api': {
        target: 'http://192.168.51.33:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 不可以省略rewrite
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 16,           // 根元素字体大小 (1rem = 16px)
          unitPrecision: 5,        // 转换后的小数位数
          propList: ['*'],         // 需要转换的属性 (* 表示所有属性)
          selectorBlackList: [],   // 忽略的选择器
          replace: true,           // 直接替换而不是追加
          mediaQuery: false,       // 是否转换媒体查询中的 px
          minPixelValue: 0,        // 最小转换数值
          exclude: /node_modules/i // 排除文件
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled:true,
        additionalData:`@import "@/assets/variables.less";`,
      },
    },
  },
  define: {
    global: 'globalThis'
  },
})
