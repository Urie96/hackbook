import { ref } from 'vue';
import { getArticleById } from '@/api';

export const article = ref<Article | null>(null);

const saveStudyInfo = () => {
  const art = article.value;
  const { section } = art;
  const { course } = section;
  localStorage.setItem('last_study_course_id', course.id);
  localStorage.setItem(`course_${course.id}_last_study_article_id`, art.id);
  localStorage.setItem(`course_${course.id}_last_study_section_id`, section.id);
};

export const init = async (articleId: string) => {
  article.value = null;
  const data = await getArticleById(articleId);
  
  article.value = data;
  saveStudyInfo();
};
