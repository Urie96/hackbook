<template>
  <div>
    <div class="title">
      {{ article.title }}
    </div>
    <div class="info">{{ article.publishDate }} {{ article.teacherName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getArticleInfoById } from '@/api/';

export default defineComponent({
  props: ['id'],
  setup(props) {
    const article = ref({} as Article & Course);

    const saveStudyInfo = () => {
      const { id, courseId, sectionId } = article.value;
      localStorage.setItem('last_study_course_id', String(courseId));
      localStorage.setItem(
        `course_${courseId}_last_study_article_id`,
        String(id)
      );
      localStorage.setItem(
        `course_${courseId}_last_study_section_id`,
        String(sectionId)
      );
    };

    const loadArticleInfo = async () => {
      const data = await getArticleInfoById(props.id);
      article.value = { ...data.course, ...data };
    };

    onMounted(async () => {
      await loadArticleInfo();
      saveStudyInfo();
    });

    return { article };
  },
});
</script>

<style lang="stylus" scoped>
.title {
  color: #353535;
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