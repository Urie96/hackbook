<template>
  <div class="category">
    <van-collapse v-model="lastSectionId" accordion>
      <van-collapse-item
        v-for="section of sections"
        :key="section.id"
        :name="section.id"
      >
        <template #title>
          <div class="bold oneline">
            {{ section.title }}（{{ section.articles.length }}讲）
          </div>
        </template>
        <div
          class="lesson-item"
          v-for="article of section.articles"
          :key="article.id"
          :style="article.done || { color: '#999' }"
          @click="turnToArticlePage(article)"
        >
          <div style="padding-right: 30px">
            {{ article.title }}
          </div>
          <i :class="getClass(article)"></i>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onActivated, watch } from 'vue';
import { useRouter } from 'vue-router';
import { course, sections } from './store';

export default defineComponent({
  setup() {
    const lastSectionId = ref('');
    const lastArticleId = ref('');

    const router = useRouter();

    const refreshStudyRecord = () => {
      lastArticleId.value =
        localStorage.getItem(`course_${course.id}_last_study_article_id`) || '';
      lastSectionId.value =
        localStorage.getItem(`course_${course.id}_last_study_section_id`) ||
        sections[0].id ||
        '';
    };

    const getClass = (article: Article) => {
      if (article.id === lastArticleId.value)
        return 'iconfont icon-pause c-warn';
      if (article.done) return 'iconfont icon-play c-primary';
      return 'iconfont icon-lock';
    };

    const turnToArticlePage = (article: Article) => {
      if (article.done) {
        router.push({
          name: 'article',
          params: { id: article.id },
        });
      }
    };

    watch(course, refreshStudyRecord);

    onActivated(refreshStudyRecord);

    return { lastSectionId, sections, turnToArticlePage, getClass };
  },
});
</script>

<style lang="stylus" scoped>
.lesson-item {
  color: #303133;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.3rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<style lang="stylus">
.bold {
  font-weight: 700;
  font-size: 1rem;
}
</style>
<style lang="stylus">
.category {
  .van-cell {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .van-collapse-item__content {
    background-color: var(--background-color);
  }

  .lesson-item {
    color: var(--text-color);
  }
}
</style>