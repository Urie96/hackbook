import { ref } from 'vue';
import { getCourseById } from '@/api';

export const course = ref({} as Course);

export const sections = ref([] as Section[]);

export const init = async (id: string) => {
  const data = await getCourseById(id);
  course.value = data;
  sections.value = data.sections;
};
