<template>
  <Teleport to="body">
    <div v-if="isShow" class="notification">
      A new version of this app is available. Click
      <a @click="reload">here</a> to update.
    </div>
  </Teleport>
</template>

<script setup>
import { getWorker, getNotificationState } from '../composables/serviceWorker';

const isShow = getNotificationState();
function reload() {
  const worker = getWorker().value;
  if (worker !== null) {
    worker.postMessage({ action: 'skipWaiting' });
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  bottom: 5vh;
  right: 1vw;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, 1);
  padding: 1em;
  border-radius: 0.5em;

  a {
    cursor: pointer;
  }
}
</style>
