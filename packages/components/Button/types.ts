import type { Component, Ref } from 'vue';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'round' | 'circle' | 'square';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonLoading = boolean;
export type ButtonDisabled = boolean;
export type ButtonIcon = string;
export type ButtonIconPosition = 'left' | 'right';
export type ButtonIconSize = 'small' | 'medium' | 'large';
export type ButtonIconColor = string;
export type ButtonIconBackgroundColor = string;

export type ButtonProps = {
	tag?: string | Component;
	type?: ButtonType;
	nativeType?: 'button' | 'submit' | 'reset';
	size?: ButtonSize;
	shape?: ButtonShape;
	variant?: ButtonVariant;
	disabled?: ButtonDisabled;
	circle?: boolean;
	plain?: boolean;
	round?: boolean;
	icon?: string;
	loading?: boolean;
	/** 加载时显示的图标，可以是字符串（如 'spinner'）或数组格式（如 ['fas', 'spinner']） */
	loadingIcon?: string | [string, string];
	useThrottle?: boolean;
	throttleDuration?: number;
};

export type ButtonGroupProps = {
	direction?: 'horizontal' | 'vertical';
	size?: ButtonSize;
	type?: ButtonType;
	disabled?: ButtonDisabled;
};

export type ButtonGroupContext = {
	type?: ButtonType;
	size?: ButtonSize;
	disabled?: ButtonDisabled;
};

export type ButtonEmits = {
	click: [value: MouseEvent];
};

export interface ButtonInstance {
	ref: Ref<HTMLButtonElement | void>;
	// disabled: ComputedRef<boolean>;
	// size: ComputedRef<string>;
	// type: ComputedRef<string>;
}
