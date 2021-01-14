<template>
  <NavBar title="Article" />
  <div class="main" :key="id">
    <ArticleHead :id="id" />
    <ArticleContent :id="id" />
    <ArticleCommentList :id="id" />
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleHead from './ArticleHead.vue';
import ArticleContent from './ArticleContent.vue';
import ArticleCommentList from './ArticleCommentList.vue';
import NavBar from '@/components/common/NavBar.vue';

export default defineComponent({
  props: ['id'],
  components: { ArticleHead, ArticleContent, ArticleCommentList, NavBar },
});
</script>

<style lang="stylus" scoped>
.main {
  padding: 1.5rem;
  text-align: justify;
}
</style>