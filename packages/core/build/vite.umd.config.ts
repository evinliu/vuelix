import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [vue()],
	build: {
		outDir: 'dist/umd',
		lib: {
			entry: 'index.ts',
			name: 'ToyElement',
			fileName: 'index',
			formats: ['umd'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue',
				},
				assetFileNames: (assetInfo) => {
					// 如果资源名称中包含 'style.css'，统一命名为 'index.css'
					if (assetInfo.names?.includes('style.css')) {
						return 'index.css';
					}
					// 使用 names 数组的第一个名称作为文件名，如果没有则使用默认值
					// names 数组包含了资源的所有可能名称（在代码分割时可能有多个）
					return assetInfo.names?.[0] || 'asset';
				},
			},
		},
	},
});
