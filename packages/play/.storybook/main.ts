import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {
			// 使用 vue-component-meta 以获得更好的类型提取和文档生成
			// 支持所有类型的 Vue 组件（SFC、函数式、Composition/Options API）
			// 支持从 TypeScript 类型中提取 props、events、slots 等信息
			docgen: 'vue-component-meta',
		},
	},
};
export default config;
