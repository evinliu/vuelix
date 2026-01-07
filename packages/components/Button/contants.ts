import type { ComputedRef, InjectionKey } from 'vue';
import type { ButtonGroupContext } from './types';

export const BUTTON_GROUP_CONTEXT_KEY: InjectionKey<ComputedRef<ButtonGroupContext>> = Symbol(
	'BUTTON_GROUP_CONTEXT_KEY'
);
