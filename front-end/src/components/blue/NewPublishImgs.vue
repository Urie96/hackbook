<template>
  <div class="main">
    <img :src="img" alt="" :key="img" v-for="img of imgs" />
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['url'],
  data() {
    return {
      imgs: [],
    };
  },
  watch: {
    url() {
      this.init();
    },
  },
  methods: {
    async init() {
      const { data } = await axios.get(this.url, {
        baseURL: '/linguo',
      });
      const prefix = data.match(
        /(https?:\/\/img-cdn\.linguommoss.xyz\/images\/.+?)\d\.jpg/
      )[1];
      const tmp = [];
      for (let i = 1; i < 80; i += 1) {
        tmp.push(`${prefix}${i}.jpg`);
      }
      this.imgs = tmp;
    },
  },
  mounted() {
    this.init();
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