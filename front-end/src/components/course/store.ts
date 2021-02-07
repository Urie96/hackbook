import { ref } from 'vue';
import { getCourseById } from '@/api';

export const course = ref<Course | null>(null);

export const init = async (id: string) => {
  course.value = null;
  const data = await getCourseById(id);
  course.value = data;
};
