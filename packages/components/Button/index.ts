import { withInstall } from '@atlas-design/utils';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';

export const ErButton = withInstall(Button, 'ErButton');
export const ErButtonGroup = withInstall(ButtonGroup, 'ErButtonGroup');
export * from './types';
