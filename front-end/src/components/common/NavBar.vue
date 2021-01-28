<template>
  <header>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$emit('goBack')"
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
  emits: ['goBack'],
  components: { ModePicker },
  setup(props) {
    const preTitle = document.title;

    document.title = String(props.title || preTitle);

    onUnmounted(() => {
      document.title = preTitle;
    });
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

  .van-hairline--bottom::after {
    border-bottom-color: var(--border-color);
  }
}
</style>