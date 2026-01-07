import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
// import { ErButton, ErButtonGroup } from "eric-ui";
// import "eric-ui/dist/theme/Button.css";

import { ErButton, ErButtonGroup } from 'toy-element';
import '@toy-element/components/Button/style.css';

type Story = StoryObj<typeof ErButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof ErButton & { subcomponents: { ButtonGroup: typeof ErButtonGroup } }> = {
	title: 'Example/Button',
	component: ErButton,
	subcomponents: { ButtonGroup: ErButtonGroup },
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'danger', 'info', ''],
		},
		size: {
			control: { type: 'select' },
			options: ['large', 'default', 'small', ''],
		},
		disabled: {
			control: 'boolean',
		},
		loading: {
			control: 'boolean',
		},
		useThrottle: {
			control: 'boolean',
		},
		throttleDuration: {
			control: 'number',
		},
		tag: {
			control: { type: 'select' },
			options: ['button', 'a', 'div'],
		},
		nativeType: {
			control: { type: 'select' },
			options: ['button', 'submit', 'reset', ''],
		},
		icon: {
			control: { type: 'text' },
		},
		loadingIcon: {
			control: { type: 'text' },
		},
	},
	args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
	argTypes: {
		content: {
			control: { type: 'text' },
		},
	},
	args: {
		type: 'primary',
		content: 'Button',
		useThrottle: false, // 禁用节流以便测试
	},
	render: (args: any) => ({
		components: { ErButton },
		setup() {
			// 直接使用 args.onClick，确保 Storybook Actions 能正确捕获
			return { args };
		},
		template: container(
			`<er-button v-bind="args" @click="args.onClick">{{args.content}}</er-button>`
		),
	}),
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement);

		await step('click button', async () => {
			await userEvent.tripleClick(canvas.getByRole('button'));
		});

		expect(args.onClick).toHaveBeenCalled();
	},
};

export const Circle: Story = {
	args: {
		icon: 'search',
	},
	render: (args: any) => ({
		components: { ErButton },
		setup() {
			// 直接使用 args.onClick，确保 Storybook Actions 能正确捕获
			return { args };
		},
		template: container(`
      <er-button circle v-bind="args" @click="args.onClick"/>
    `),
	}),
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement);

		await step('click button', async () => {
			await userEvent.click(canvas.getByRole('button'));
		});

		expect(args.onClick).toHaveBeenCalled();
	},
};

Circle.parameters = {};

export const Group: Story & { args: { content1: string; content2: string; content3: string } } = {
	argTypes: {
		groupType: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'danger', 'info', ''],
		},
		groupSize: {
			control: { type: 'select' },
			options: ['large', 'default', 'small', ''],
		},
		groupDisabled: {
			control: 'boolean',
		},
		content1: {
			control: { type: 'text' },
			defaultValue: 'Button1',
		},
		content2: {
			control: { type: 'text' },
			defaultValue: 'Button2',
		},
		content3: {
			control: { type: 'text' },
			defaultValue: 'Button3',
		},
	},
	args: {
		round: true,
		content1: 'Button1',
		content2: 'Button2',
		content3: 'Button3',
	},
	render: (args: any) => ({
		components: { ErButton, ErButtonGroup },
		setup() {
			// 直接使用 args.onClick，确保 Storybook Actions 能正确捕获
			return { args };
		},
		template: container(`
       <er-button-group v-bind="args">
         <er-button v-bind="args" @click="args.onClick">{{args.content1}}</er-button>
         <er-button v-bind="args" @click="args.onClick">{{args.content2}}</er-button>
				 <er-button v-bind="args" @click="args.onClick">{{args.content3}}</er-button>
       </er-button-group>
    `),
	}),
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement);

		await step('click btn1', async () => {
			await userEvent.click(canvas.getByText('Button1'));
		});
		await step('click btn2', async () => {
			await userEvent.click(canvas.getByText('Button2'));
		});
		expect(args.onClick).toHaveBeenCalled();
	},
};

export default meta;
