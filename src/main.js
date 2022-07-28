import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { worker } from './mocks/browser';
import { useServiceWorker } from './composables/serviceWorker';

import App from './App.vue';
import router from './router';

import './assets/main.css';

if (process.env.NODE_ENV !== 'development') {
  worker.start();
} else {
  useServiceWorker();

  // setInterval(() => {
  //   console.log('fetch');
  //   const baseURL = '/';
  //   fetch(baseURL);
  // }, 5000);
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
