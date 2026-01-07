import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [vue(), vueJsx()] as PluginOption[],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./test/setup.ts'],
		include: ['**/*.{test,spec}.{ts,tsx}'],
	},
	resolve: {
		alias: {
			'@vuelix/components': resolve(__dirname, './'),
			'@vuelix/utils': resolve(__dirname, '../utils'),
			'@vuelix/theme': resolve(__dirname, '../theme'),
		},
	},
});
