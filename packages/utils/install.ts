import type { App, Plugin } from 'vue';
import { map } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

export type SFCWithInstall<T> = T & Plugin & { install: (app: App) => void };

/**
 * 批量安装多个组件
 * @param components 组件数组
 * @returns 安装函数
 */
export const makeInstall = (components: Plugin[]) => {
	const installer = (app: App) => {
		pipe(
			components,
			map((comp: Plugin) => app.use(comp))
		);
	};
	return installer as Plugin;
};

/**
 * 为单个组件添加 install 方法
 * @param component 组件
 * @param name 组件名（可选，如果不提供则从组件中获取）
 * @returns 带有 install 方法的组件
 */
export const withInstall = <T>(component: T, name?: string) => {
	(component as Plugin).install = (app: App) => {
		const componentName = name || (component as any).name;
		if (componentName) {
			app.component(componentName, component as Plugin);
		}
	};
	return component as SFCWithInstall<T>;
};
