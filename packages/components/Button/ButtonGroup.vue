<template>
	<div class="er-button-group">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { BUTTON_GROUP_CONTEXT_KEY } from './contants';
import type { ButtonGroupContext, ButtonGroupProps } from './types';

defineOptions({
	name: 'ErButtonGroup',
});

const props = defineProps<ButtonGroupProps>();

const context = computed<ButtonGroupContext>(() => ({
	type: props.type,
	size: props.size,
	disabled: props.disabled,
}));
// 直接 provide computed ref 本身，而不是 context.value
// 这样当 props 变化时，子组件可以响应式地获取到最新的值
provide(BUTTON_GROUP_CONTEXT_KEY, context);
</script>

<style scoped>
@import './style.css';
</style>
