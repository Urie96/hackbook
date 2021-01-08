import { ref, computed } from 'vue';
import { courseIsFavorite, courseIsDislike } from '@/utils/favorite';
import { getAllCourses } from '@/api';

export const courses = ref([])
export const searchedCourseIds = ref([])
export const lastStudyCourseId = ref(-1);


Array.prototype.shuffle = function () {
  let array = this;
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getPriority = (course) => {
  let s = 0;
  if (searchedCourseIds.value.includes(course.id)) s += 10000
  if (course.id === lastStudyCourseId.value) s += 100;
  if (courseIsFavorite(course.id)) s += 10;
  if (courseIsDislike(course.id)) s -= 5000;
  return s;
}

export const loadCourse = async () => {
  const data = await getAllCourses();
  data.shuffle();
  courses.value = data;
};

export const sortedCourses = computed(() =>
  courses.value.sort((a, b) => getPriority(b) - getPriority(a))
);