import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// 自动导入配置
// 方案 1（推荐）：在 monorepo 中使用共享配置
// import { createAutoImportPlugin } from '../../vite-plugins'

// 方案 2：单独部署时使用内联配置（当前方案，支持单独部署）
function createAutoImportPlugin(options?: any) {
  return AutoImport({
    imports: [
      'vue',
      {
        'fp-ts/Array': ['A'],
        'fp-ts/Option': ['O'],
        'fp-ts/Either': ['E'],
        'fp-ts/function': ['pipe', 'flow', 'identity'],
      },
    ],
    vueTemplate: true,
    dts: resolve(__dirname, 'auto-imports.d.ts'),
    eslintrc: {
      enabled: true,
      filepath: resolve(__dirname, '.eslintrc-auto-import.json'),
    },
    ...options,
  }) as any
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 使用共享的自动导入配置，可以自定义覆盖
    createAutoImportPlugin({
      // 可以添加 play 包特定的目录
      dirs: [
        resolve(__dirname, 'src/composables'),
        resolve(__dirname, 'src/utils'),
      ],
      // 类型声明文件生成到 play 包目录
      dts: resolve(__dirname, 'auto-imports.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
