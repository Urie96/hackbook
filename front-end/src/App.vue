<template>
  <SWPopup />
  <router-view />
</template>
<script>
import SWPopup from '@/components/pwa/SWPopup.vue';

export default {
  components: { SWPopup },
};
</script>
<style lang="stylus">
@require './globalStyle';
</style>
