<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goBack">
    <template #right>
      <fullscreen-button />
    </template>
  </van-nav-bar>
</template>

<script>
import { onUnmounted } from 'vue';

export default {
  props: ['title'],
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
};
</script>