import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

export type IconProps = FontAwesomeIconProps & {
	type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
	color?: string;
};
