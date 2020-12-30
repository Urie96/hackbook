<template>
  <van-collapse v-model="lastSectionId" accordion>
    <van-collapse-item
      v-for="section of sections"
      :key="section.id"
      :name="section.id"
    >
      <template #title>
        <div class="bold oneline">
          {{ section.name }}（{{ section.articles.length }}讲）
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
</template>
<script>
import { ref, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { getCourseCategoryById } from '@/api/';

export default {
  props: ['courseId'],
  setup(props) {
    const sections = ref([]);
    const lastSectionId = ref(0);
    const lastArticleId = ref(0);

    const router = useRouter();

    const refreshStudyRecord = () => {
      lastArticleId.value = Number(
        localStorage.getItem(`course_${props.courseId}_last_study_article_id`)
      );
      lastSectionId.value =
        Number(
          localStorage.getItem(`course_${props.courseId}_last_study_section_id`)
        ) || sections.value[0].id;
    };

    const getClass = (article) => {
      if (article.id === lastArticleId.value)
        return 'fas fa-pause-circle c-warn';
      if (article.done) return 'fas fa-play-circle c-primary';
      return 'fas fa-lock';
    };

    const loadSections = async () => {
      const data = await getCourseCategoryById(props.courseId);
      sections.value = data;
    };

    const turnToArticlePage = (article) => {
      if (article.done) {
        router.push({
          name: 'article',
          params: { id: article.id },
        });
      }
    };

    loadSections().then(refreshStudyRecord);

    onActivated(refreshStudyRecord);

    return { lastSectionId, sections, turnToArticlePage, getClass };
  },
};
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