import { watchEffect, ref } from 'vue';
import { getAllCourses, addUserTend, deleteUserTend } from '@/api';
import { Notify } from '@/utils/';
import { CourseTendType } from '@/types/index.d.ts';

export const courses = ref<Course[]>([]);
export const searchedCourseIds = ref<string[]>([]);
export const lastStudyCourseId = ref('');

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
  if (course.userTend === CourseTendType.LIKE) s += 10;
  if (course.userTend === CourseTendType.DISLIKE) s -= 5000;
  return s;
};

export const init = async () => {
  const data = await getAllCourses();
  shuffle(data);
  courses.value = data;
};

watchEffect(() => {
  courses.value.sort((a, b) => getPriority(b) - getPriority(a));
});

export const likeCourse = async (course: Course) => {
  course.userTend = CourseTendType.LIKE;
  await addUserTend({
    courseId: course.id,
    type: CourseTendType.LIKE,
  } as CourseTend);
  Notify({ type: 'success', message: '收藏成功' });
};

export const dislikeCourse = async (course: Course) => {
  course.userTend = CourseTendType.DISLIKE;
  await addUserTend({
    courseId: course.id,
    type: CourseTendType.DISLIKE,
  } as CourseTend);
  Notify({ type: 'success', message: '已添加到不喜欢' });
};

export const cancelLikeCourse = async (course: Course) => {
  course.userTend = undefined;
  const success = await deleteUserTend(course.id);
  if (success) {
    Notify({ type: 'warning', message: '取消收藏成功' });
  } else {
    Notify({ type: 'danger', message: 'has bug' });
  }
};

export const cancelDislikeCourse = async (course: Course) => {
  course.userTend = undefined;
  const success = await deleteUserTend(course.id);
  if (success) {
    Notify({ type: 'warning', message: '已移除不喜欢' });
  } else {
    Notify({ type: 'danger', message: 'has bug' });
  }
};
