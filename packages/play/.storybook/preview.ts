import { setup, type Preview } from '@storybook/vue3-vite';
// 导入 toy-element 以初始化 fontawesome 和注册所有组件
import toyElement from 'toy-element';

setup((app) => {
	app.use(toyElement); // 这会注册所有组件，包括 ErIcon
});

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
};

export default preview;
