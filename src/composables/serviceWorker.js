import { isRef, ref } from 'vue';
const installingWorker = ref(null);
const isShow = ref(false);
const isRefreshing = ref(false);

export function getNotificationState() {
  return isShow;
}

export function getWorker() {
  return installingWorker;
}

export function useServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isRefreshing.value === true) return;
      isRefreshing.value = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );

        registration.addEventListener('updatefound', () => {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
          installingWorker.value = registration.installing;
          console.log(
            'A new service worker is being installed:',
            installingWorker.value
          );

          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
          installingWorker.value.addEventListener('statechange', () => {
            switch (installingWorker.value.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  isShow.value = true;
                }
                break;
            }
          });
        });
      })
      .catch((error) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', error);
      });
  } else {
    console.log('Service workers are not supported.');
  }
}
