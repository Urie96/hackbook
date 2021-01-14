import { ref, watchEffect } from 'vue';
import { courseIsFavorite, courseIsDislike } from '../../utils/favorite';
import { getAllCourses } from '../../api';

export const courses = ref(new Array<Course>());
export const searchedCourseIds = ref(new Array<number>());
export const lastStudyCourseId = ref(-1);

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getPriority = (course: Course) => {
  let s = 0;
  if (searchedCourseIds.value.includes(course.id)) s += 10000;
  if (course.id === lastStudyCourseId.value) s += 100;
  if (courseIsFavorite(course.id)) s += 10;
  if (courseIsDislike(course.id)) s -= 5000;
  return s;
};

export const loadCourse = async () => {
  const data = await getAllCourses();
  shuffle(data);
  courses.value = data;
};

watchEffect(() => {
  courses.value.sort((a, b) => getPriority(b) - getPriority(a));
});
