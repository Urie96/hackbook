<template>
  <header>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    >
      <template #right>
        <ModePicker />
        <fullscreen-button />
      </template>
    </van-nav-bar>
  </header>
</template>

<script>
import { defineComponent, onUnmounted } from 'vue';
import ModePicker from './ModePicker.vue';

export default defineComponent({
  props: ['title'],
  components: { ModePicker },
  setup(props) {
    const preTitle = document.title;
    // const showPopup = ref(false);

    const goBack = () => {
      window.history.back();
    };

    document.title = String(props.title || preTitle);

    onUnmounted(() => {
      document.title = preTitle;
    });
    return { goBack };
  },
});
</script>
<style lang="stylus">
header {
  .van-nav-bar {
    background-color: var(--background-color);
  }

  .van-nav-bar__title {
    color: var(--text-color);
  }
}
</style>