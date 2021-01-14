<template>
  <SWPopup />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SWPopup from '@/components/pwa/SWPopup.vue';

export default defineComponent({
  components: { SWPopup },
});
</script>

<style lang="stylus">
@require './globalStyle';
</style>
