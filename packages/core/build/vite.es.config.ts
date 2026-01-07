import { readdirSync } from 'fs';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig, type PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

const getDirectorySync = (basePath: string) => 
	readdirSync(resolve(basePath), { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: '../../tsconfig.build.json',
			outDir: 'dist/types',
		}) as PluginOption,
	],
	build: {
		outDir: 'dist/es',
		lib: {
			entry: 'index.ts',
			name: 'ToyElement',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'vue',
				'@fortawesome/fontawesome-svg-core',
				'@fortawesome/free-brands-svg-icons',
				'@fortawesome/free-regular-svg-icons',
				'@fortawesome/free-solid-svg-icons',
				'@fortawesome/vue-fortawesome',
				'@popperjs/core',
				'async-validator',
			],
			output: {
				exports: 'named',
				assetFileNames: (assetInfo) => {
					// 如果资源名称中包含 'style.css'，统一命名为 'index.css'
					if (assetInfo.names?.includes('style.css')) {
						return 'index.css';
					}
					// 使用 names 数组的第一个名称作为文件名，如果没有则使用默认值
					// names 数组包含了资源的所有可能名称（在代码分割时可能有多个）
					return assetInfo.names?.[0] || 'asset';
				},
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
					if (id.includes('/packages/hooks/')) {
						return 'hooks';
					}
					if (id.includes('/packages/utils/')) {
						return 'utils';
					}
					for (const comp of getDirectorySync('../components')) {
						if (id.includes(`/packages/components/${comp}/`)) {
							return comp;
						}
					}
				},
			},
		},
	},
});
