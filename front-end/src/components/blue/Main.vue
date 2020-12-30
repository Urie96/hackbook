<template>
  <div class="main">
    <div @click="next">
      <img :src="img" alt="" :key="img" v-for="img of imgs" />
    </div>
    <div id="player"></div>
  </div>
</template>
<script>
import { ref, watch, toRef, onDeactivated } from 'vue';
import { useRouter } from 'vue-router';
import { loadStyle } from '@/utils/';
import { getBlueById } from '@/api/';

loadStyle('https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video-js.min.css');

export default {
  props: ['id'],
  setup(props) {
    const id = toRef(props, 'id');
    const imgs = ref([]);
    const router = useRouter();

    let player = null;
    const distroyPlayer = () => {
      if (player) player.dispose();
    };

    const init = async () => {
      distroyPlayer();
      const data = await getBlueById(id.value);
      imgs.value = data.imgs;
      if (!data.video) {
        return;
      }
      const { default: Videojs } = await import('video.js');
      const dom = document.createElement('video');
      dom.setAttribute('class', 'video-js');
      document.getElementById('player').append(dom);
      player = Videojs(dom, {
        controls: true,
        fluid: true,
        playbackRates: [1, 1.25, 1.5, 1.75, 2],
        sources: [
          {
            src: data.video,
            type: 'application/x-mpegURL',
          },
        ],
      });
    };

    init();

    watch(id, init);

    onDeactivated(distroyPlayer);

    const next = () => {
      const nextId = Number(id.value) + 1;
      router.push(`/blue/${nextId}`);
    };

    return { imgs, next };
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  max-width: 800px;
}
img {
  min-height: 100px;
  padding: 10px;
  width: 100%;
}
video {
  object-fit: fill;
}
</style>