<template>
  <NavBar :title="article.title" />
  <div class="main">
    <div class="title">
      {{ article.title }}
    </div>
    <div class="info">{{ article.publishDate }} {{ course.teacherName }}</div>
    <ArticleContent />
    <ArticleCommentList />
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import ArticleContent from './ArticleContent.vue';
import ArticleCommentList from './ArticleCommentList.vue';
import NavBar from '@/components/common/NavBar.vue';
import { Loading } from '@/utils/';
import { init, course, article } from './store';

export default defineComponent({
  props: ['id'],
  components: { ArticleContent, ArticleCommentList, NavBar },
  setup(props) {
    watchEffect(async () => {
      Loading.pop();
      await init(props.id);
      Loading.clear();
    });
    return { course, article };
  },
});
</script>

<style lang="stylus" scoped>
.main {
  padding: 1.5rem;
  text-align: justify;
}

.title {
  font-weight: bold;
  font-size: 22px;
  margin: 5px 0px;
}

.info {
  color: #888;
  font-size: 13px;
  font-weight: 400;
}
</style>