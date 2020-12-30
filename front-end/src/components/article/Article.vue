<template>
  <NavBar title="Article" />
  <div class="main" :key="id">
    <ArticleHead :id="id" />
    <ArticleContent :id="id" />
    <ArticleCommentList :id="id" />
    <back-to-top />
  </div>
</template>

<script>
import ArticleHead from './ArticleHead';
import ArticleContent from './ArticleContent';
import ArticleCommentList from './ArticleCommentList';
import NavBar from '../common/NavBar';

export default {
  props: ['id'],
  setup() {
    return { ArticleHead, ArticleContent, ArticleCommentList, NavBar };
  },
};
</script>

<style lang="stylus" scoped>
.main {
  padding: 1.5rem;
  text-align: justify;
}
</style>