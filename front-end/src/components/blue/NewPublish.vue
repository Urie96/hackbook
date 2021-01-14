<template>
  <div class="main">
    <div
      v-for="(item, i) in items"
      :key="i"
      :body-style="{ padding: '0px' }"
      @click="turnTo(item.href)"
    >
      <img :src="item.imgsrc" class="image" />
      <div style="padding: 14px">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    const { data } = await axios.get('/linguo');
    console.log(data);
    // const $ = cheerio.load(data);
    // $('.update_area_content ul li').each((i, ele) => {
    //   const $ele = $(ele);
    //   const item = {};
    //   item.title = $ele.find('.case_info').text();
    //   const [, href] = $ele
    //     .find('a')
    //     .attr('href')
    //     .match(/\/([^/]+)$/);
    //   item.href = href;
    //   item.imgsrc = $ele.find('img').attr('data-original');
    //   this.items.push(item);
    // });
  },
  methods: {
    turnTo(url: string) {
      this.$router.push({
        name: 'newImgs',
        params: { url },
      });
    },
  },
});
</script>
<style scoped>
.main {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
}
.el-card {
  width: 300px;
  margin: 20px 10px;
  color: #777;
}
.image {
  width: 100%;
  display: block;
}
</style>