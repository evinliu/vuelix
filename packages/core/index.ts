/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { makeInstall } from './../utils/install';
import { components } from './components';
import '@vuelix/theme/index.css';

library.add(fas, far, fab);

const installer = makeInstall(components);

export default installer;
export * from '../components';
