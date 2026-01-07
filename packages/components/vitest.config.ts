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
		// setupFiles: ['./test/setup.ts'],
		include: ['**/*.{test,spec}.{ts,tsx}'],
	},
	resolve: {
		alias: {
			'@toy-element/components': resolve(__dirname, './'),
			'@toy-element/utils': resolve(__dirname, '../utils'),
			'@toy-element/theme': resolve(__dirname, '../theme'),
		},
	},
});
