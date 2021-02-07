<template>
  <NavBar :title="article?.title || ''" @goBack="goBack" />
  <div class="main" v-if="article">
    <div class="title">
      {{ article.title }}
    </div>
    <div class="info">
      {{ article.publishDate }} {{ article.section.course.teacherName }}
    </div>
    <ArticleContent />
    <ArticleCommentList />
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import ArticleContent from './ArticleContent.vue';
import ArticleCommentList from './ArticleCommentList.vue';
import NavBar from '@/components/common/NavBar.vue';
import { Loading } from '@/utils/';
import { init, article } from './store';

export default defineComponent({
  props: ['id'],
  components: { ArticleContent, ArticleCommentList, NavBar },
  setup(props) {
    const router = useRouter();

    const goBack = () => {
      const course = article.value?.section?.course;
      if (course?.id) {
        router.replace({
          name: 'course',
          params: { id: course.id },
        });
      } else {
        router.go(-1);
      }
    };

    watchEffect(async () => {
      try {
        Loading.pop();
        await init(props.id);
      } finally {
        Loading.clear();
      }
    });

    return { article, goBack };
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