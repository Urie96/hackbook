<template>
  <div class="main">
    <div @click="next">
      <img :src="img" alt="" :key="img" v-for="img of imgs" />
    </div>
    <div id="player"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, toRefs, onDeactivated } from 'vue';
import { useRouter } from 'vue-router';
import { importScript, Script } from '@/utils/';
import { getBlueById } from '@/api/';

export default defineComponent({
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    const imgs = ref([]);
    const router = useRouter();

    let player: any = null;
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
      const Videojs = await importScript(Script.VideoJS);
      const dom = document.createElement('video');
      dom.setAttribute('class', 'video-js');
      document.getElementById('player')!.append(dom);
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
});
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