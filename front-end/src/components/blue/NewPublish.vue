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
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface Item {
  title: string;
  href: string;
  imgsrc: string;
}

export default defineComponent({
  setup() {
    const items = reactive([] as Item[]);
    const router = useRouter();

    const init = async () => {
      const { data } = await axios.get('/linguo/');
      const dom = document.createElement('html');
      dom.innerHTML = data;
      dom.querySelectorAll('.update_area_content ul li').forEach((ele) => {
        const title =
          ele.querySelector<HTMLElement>('.case_info')?.innerText || 'default';
        const res = ele
          .querySelector('a')
          ?.getAttribute('href')
          ?.match(/\/([^/]+)$/);
        const href = res ? res[1] : '';
        const imgsrc =
          ele.querySelector('img')?.getAttribute('data-original') || '';
        items.push({ title, href, imgsrc });
      });
    };

    onMounted(init);

    const turnTo = (url: string) => {
      router.push({
        name: 'newImgs',
        params: { url },
      });
    };

    return { items, turnTo };
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