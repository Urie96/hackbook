import { reactive } from 'vue';
import { getArticleById } from '@/api';

export const article = reactive({} as Article);
export const course = reactive({} as Course);
export const section = reactive({} as Section);
export const comments = reactive([] as ArticleComment[]);

const saveStudyInfo = () => {
  localStorage.setItem('last_study_course_id', course.id);
  localStorage.setItem(`course_${course.id}_last_study_article_id`, article.id);
  localStorage.setItem(`course_${course.id}_last_study_section_id`, section.id);
};

export const init = async (articleId: string) => {
  const data = await getArticleById(articleId);
  // replcace 去除Math区域内的html标签，使katex能正确识别
  data.content = data.content.replace(/\${2}[\w\W]+?\${2}/g, (match) =>
    match.replace(/<[^>]+>/g, '')
  );
  map(data, article);
  map(data.section, section);
  map(data.section.course, course);
  map(data.comments, comments);
  saveStudyInfo();
};

const map = (from: any, to: any) =>
  Object.keys(from).forEach((key) => (to[key] = from[key]));
