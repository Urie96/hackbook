<template>
  <transition name="sw-update-popup">
    <div v-if="enable" class="sw-update-popup">
      {{ message }}
      <br />
      <button @click="reload">
        {{ buttonText }}
      </button>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import './registerServiceWorker';

export default {
  setup(props) {
    const enable = ref(false);
    const message = '发现新内容可用';
    const buttonText = '刷新';

    const reload = () => {
      location.reload(true);
      enable.value = false;
    };

    addEventListener('sw-updated', () => {
      enable.value = true;
    });
    return { enable, message, buttonText, reload };
  },
};
</script>

<style scoped>
.sw-update-popup {
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 1em;
  text-align: center;
  z-index: 3;
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  color: var(--text-color);
  background: var(--background-color);
}

.sw-update-popup > button {
  margin-top: 0.5em;
  padding: 0.25em 2em;
  background: var(--theme);
  border-radius: 0.25rem;
  color: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
}

.sw-update-popup-enter-active,
.sw-update-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sw-update-popup-enter,
.sw-update-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
