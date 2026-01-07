import { execSync } from 'child_process';
import { defineConfig } from 'vitepress';

// 动态获取仓库名
function getRepoName(): string {
	// 优先使用 GitHub Actions 环境变量（更可靠）
	if (process.env.GITHUB_REPOSITORY) {
		const parts = process.env.GITHUB_REPOSITORY.split('/');
		if (parts.length === 2) {
			return parts[1];
		}
	}

	// 尝试从 git remote 获取
	try {
		const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
		const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+?)(\.git)?$/);
		if (match && match[2]) {
			return match[2];
		}
	} catch (error) {
		// 如果获取失败，使用默认值
		console.warn('无法获取仓库名，使用默认值');
	}
	return 'vuelix'; // 默认值
}

const repoName = getRepoName();

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vuelix',
	description: '高仿Element Plus组件库',
	base: `/${repoName}/`,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
});
