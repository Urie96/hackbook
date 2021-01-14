<template>
  <div class="main">
    <img :src="img" alt="" :key="img" v-for="img of imgs" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';

export default defineComponent({
  props: ['url'],
  setup(props) {
    const imgs = ref([] as string[]);

    const init = async () => {
      const { data } = await axios.get(props.url, {
        baseURL: '/linguo',
      });
      const prefix = data.match(
        /(https?:\/\/img-cdn\.linguommoss.xyz\/images\/.+?)\d\.jpg/
      )[1];
      const tmp = [];
      for (let i = 1; i < 80; i += 1) {
        tmp.push(`${prefix}${i}.jpg`);
      }
      imgs.value = tmp;
    };

    watch(props.url, init);
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