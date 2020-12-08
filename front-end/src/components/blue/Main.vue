<template>
  <div class="main">
    <div @click="next">
      <img :src="img" alt="" :key="img" v-for="img of imgs" />
    </div>
    <div id="player"></div>
  </div>
</template>
<script>
/* eslint-disable */
window.remote.loadStyle(
  'https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video-js.min.css'
);
// import 'video.js/dist/video-js.min.css';
// import Videojs from 'video.js';

export default {
  props: ['id'],
  data() {
    return {
      imgs: [],
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  methods: {
    init() {
      const id = this.id;
      if (window._player) {
        window._player.dispose();
      }
      this.$axios.get(`/blues/${id}`).then(({ imgs, video }) => {
        this.imgs = imgs;
        if (video) {
          window.remote
            .loadScript(
              'https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video.min.js',
              'videojs'
            )
            .then((Videojs) => {
              const dom = document.createElement('video');
              dom.setAttribute('class', 'video-js');
              document.getElementById('player').append(dom);
              window._player = Videojs(dom, {
                controls: true,
                fluid: true,
                playbackRates: [1, 1.25, 1.5, 1.75, 2],
                sources: [
                  // {
                  //   src: '//vjs.zencdn.net/v/oceans.mp4',
                  //   type: 'video/mp4',
                  // },
                  {
                    src: video,
                    type: 'application/x-mpegURL',
                  },
                ],
              });
              // import('videojs-landscape-fullscreen').then(() => {
              //   window._player.landscapeFullscreen({
              //     fullscreen: {
              //       enterOnRotate: true,
              //       alwaysInLandscapeMode: true,
              //       iOS: true,
              //     },
              //   });
              // });
            });
        }
      });
    },
    next() {
      const nextId = Number(this.id) + 1;
      this.$router.push(`/blue/${nextId}`);
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (window._player) {
      window._player.dispose();
    }
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