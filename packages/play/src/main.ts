import { createApp } from 'vue';
import atlasDesign from 'atlas-design';
import App from './App.vue';
import 'atlas-design/dist/index.css';

createApp(App).use(atlasDesign).mount('#app');
