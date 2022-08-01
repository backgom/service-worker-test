import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { worker } from './mocks/browser';
import { registerSW } from 'virtual:pwa-register';

import App from './App.vue';
import router from './router';

import './assets/main.css';

if (process.env.NODE_ENV === 'development') {
  worker.start();
} else {
  const intervalMS = 10 * 1000; // 10 sec.

  const updateSW = registerSW({
    onNeedRefresh() {},
    // onOfflineReady() {},
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
