/// <reference types="vitest/config" />

// 自动导入配置
// 方案 1（推荐）：在 monorepo 中使用共享配置
// import { createAutoImportPlugin } from '../../vite-plugins'

// 方案 2：单独部署时使用内联配置（当前方案，支持单独部署）
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { playwright } from '@vitest/browser-playwright';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

const dirname =
	typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
function createAutoImportPlugin(options?: any) {
	return AutoImport({
		imports: [
			'vue',
			// {
			// 	'fp-ts/Array': ['A'],
			// 	'fp-ts/Option': ['O'],
			// 	'fp-ts/Either': ['E'],
			// 	'fp-ts/function': ['pipe', 'flow', 'identity'],
			// },
		],
		vueTemplate: true,
		dts: resolve(__dirname, 'auto-imports.d.ts'),
		eslintrc: {
			enabled: true,
			filepath: resolve(__dirname, '.eslintrc-auto-import.json'),
		},
		...options,
	}) as any;
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		// 使用共享的自动导入配置，可以自定义覆盖
		createAutoImportPlugin({
			// 可以添加 play 包特定的目录
			dirs: [resolve(__dirname, 'src/composables'), resolve(__dirname, 'src/utils')],
			// 类型声明文件生成到 play 包目录
			dts: resolve(__dirname, 'auto-imports.d.ts'),
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			// 开发阶段把 toy-element 指向源码
			// 'toy-element': resolve(__dirname, '../core/index.ts'),
			// '@toy-element/components': resolve(__dirname, '../components/index.ts'),
		},
	},
	optimizeDeps: {
		// 告诉 Vite 不要去预构建这些本地包（否则仍然会去动 dist）
		exclude: ['toy-element', '@toy-element/components'],
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}) as any,
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}) as any,
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
});
