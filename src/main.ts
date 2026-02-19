import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { pinia } from './stores';
import './style.css';
import { clickOutside } from './directives/clickOutside';

const app = createApp(App);
app.directive('click-outside', clickOutside);
app.use(pinia).use(router).mount('#app');
