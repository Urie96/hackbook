<template>
  <div v-if="canFullScreen" class="urie__fullscreen" @click="toggleFullScreen">
    <slot name="isFullScreen" v-if="isFullScreen"></slot>
    <slot name="notFullScreen" v-else></slot>
  </div>
</template>

<script>
import { ref, onActivated } from 'vue';

export default {
  setup() {
    const html = document.documentElement;
    const rfs =
      html.requestFullScreen ||
      html.webkitRequestFullScreen ||
      html.mozRequestFullScreen ||
      html.msRequestFullScreen;

    const cfs =
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;

    const canFullScreen = ref(!!rfs);
    const isFullScreen = ref(false);

    const loadIsFullScreen = () => {
      isFullScreen.value =
        document.fullScreenElement === html ||
        document.msFullscreenElement === html ||
        document.mozFullScreenElement === html ||
        document.webkitFullscreenElement === html ||
        false;
    };

    onActivated(loadIsFullScreen);

    const toggleFullScreen = () => {
      if (isFullScreen.value) {
        cfs.call(document);
        isFullScreen.value = false;
      } else {
        rfs.call(html);
        isFullScreen.value = true;
      }
    };

    return { canFullScreen, isFullScreen, toggleFullScreen };
  },
};
</script>