import { createApp } from 'vue';
import toyElement from 'toy-element';
import App from './App.vue';
import 'toy-element/dist/index.css';

createApp(App).use(toyElement).mount('#app');
