import { reactive } from 'vue';
import { getCourseById } from '@/api';

export const course = reactive({} as Course);
export const sections = reactive([] as Section[]);

export const init = async (id: string) => {
  const data = await getCourseById(id);
  map(data, course);
  map(data.sections, sections);
};

const map = (from: any, to: any) =>
  Object.keys(from).forEach((key) => (to[key] = from[key]));
