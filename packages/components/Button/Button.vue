<script setup lang="ts">
import {
	computed,
	inject,
	ref,
	useSlots,
	type ComputedRef,
	type CSSProperties,
	type Slot,
} from 'vue';
import { throttle } from 'lodash-es';
import { BUTTON_GROUP_CONTEXT_KEY } from './contants';
import type { ButtonGroupContext, ButtonInstance, ButtonProps } from './types';

defineOptions({
	name: 'ErButton',
});

const props = withDefaults(defineProps<ButtonProps>(), {
	tag: 'button',
	nativeType: 'button',
	size: 'medium',
	shape: 'square',
	variant: 'solid',
	loading: false,
	disabled: false,
	icon: '',
	circle: false,
	plain: false,
	round: false,
	useThrottle: true,
	throttleDuration: 500,
});

const context = inject<ComputedRef<ButtonGroupContext>>(BUTTON_GROUP_CONTEXT_KEY);

// 辅助函数：从 context 或 props 中获取属性值，优先使用 context
const getContextProp = <K extends keyof ButtonGroupContext>(
	key: K,
	defaultValue: ButtonGroupContext[K] | undefined
) => computed(() => context?.value?.[key] ?? props[key] ?? defaultValue);

const size = getContextProp('size', undefined);
const type = getContextProp('type', undefined);
const disabled = getContextProp('disabled', false);

const emits = defineEmits<{
	click: [value: MouseEvent];
}>();

const slots: Record<string, Slot | undefined> = useSlots();

const _ref = ref<HTMLButtonElement>();
const iconStyle = computed<CSSProperties>(() => ({
	marginRight: slots.default ? '6px' : '0',
}));

// 处理 loadingIcon：如果未提供或为空，使用默认的 spinner 图标
// FontAwesome Vue 支持字符串格式（如果图标已在 library 中注册）和数组格式 ['fas', 'spinner']
const resolvedLoadingIcon = computed<string | [string, string]>(() => {
	// 如果 loadingIcon 未定义，使用默认值
	if (props.loadingIcon === undefined || props.loadingIcon === null) {
		return ['fas', 'spinner'];
	}
	// 如果是数组格式，直接返回
	if (Array.isArray(props.loadingIcon)) {
		return props.loadingIcon;
	}
	// 如果是字符串，检查是否为空
	if (typeof props.loadingIcon === 'string' && props.loadingIcon.trim() === '') {
		return ['fas', 'spinner'];
	}
	// 字符串格式：直接返回
	return props.loadingIcon;
});

const handleButtonClick = (e: MouseEvent) => {
	emits('click', e);
};
const handleButtonClickThrottle = throttle(handleButtonClick, props.throttleDuration, {
	trailing: true,
});

// 根据 useThrottle 属性决定使用哪个处理函数
const handleClick = (e: MouseEvent) =>
	props.useThrottle ? handleButtonClickThrottle(e) : handleButtonClick(e);

defineExpose<ButtonInstance>({
	ref: _ref,
	// handleButtonClick
});
</script>

<template>
	<component
		:is="props.tag"
		ref="_ref"
		:type="tag === 'button' ? nativeType : void 0"
		class="er-button"
		:class="{
			[`er-button--${type}`]: type,
			[`er-button--${size}`]: size,
			'is-plain': plain,
			'is-round': round,
			'is-circle': circle,
			'is-disabled': disabled,
			'is-loading': loading,
		}"
		:disabled="disabled || loading"
		:loading="loading"
		:icon="icon"
		:circle="circle"
		:plain="plain"
		:round="round"
		@click="(e: MouseEvent) => handleClick(e)"
	>
		<template v-if="loading">
			<slot name="loading">
				<er-icon class="loading-icon" :icon="resolvedLoadingIcon" :style="iconStyle" spin />
			</slot>
		</template>
		<er-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x" />
		<slot></slot>
	</component>
</template>

<style scoped>
@import './style.css';
</style>
