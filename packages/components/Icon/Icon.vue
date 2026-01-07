<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';
import type { IconProps } from './type';

defineOptions({
	name: 'ErIcon',
});

const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ['type', 'color']));

const customStyles = computed(
	() => ({ color: props.color ? props.color : void 0 }) as CSSProperties
);
</script>

<template>
	<i class="er-icon" :class="{ [`er-icon--${props.type}`]: type }" :style="customStyles">
		<font-awesome-icon v-bind="filterProps" />
	</i>
</template>

<style scoped>
@import './style.css';
</style>
