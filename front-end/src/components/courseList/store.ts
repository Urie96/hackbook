import { watchEffect, ref } from 'vue';
import { getAllCourses, addUserTend, deleteUserTend } from '@/api';
import { Message } from '@/utils/';
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

export const init = async () => {
  courses.value = [];
  const data = await getAllCourses();
  shuffle(data);
  courses.value = data;
};

const getPriority = (course: Course) => {
  let s = 0;
  if (searchedCourseIds.value.includes(course.id)) s += 10000;
  if (course.id === lastStudyCourseId.value) s += 100;
  if (course.userTend === CourseTendType.LIKE) s += 10;
  if (course.userTend === CourseTendType.DISLIKE) s -= 5000;
  return s;
};

watchEffect(() => {
  courses.value.sort((a, b) => getPriority(b) - getPriority(a));
});

const findCourseById = (courseId: string) =>
  courses.value.find((c) => c.id === courseId);

export const likeCourse = async (courseId: string) => {
  findCourseById(courseId).userTend = CourseTendType.LIKE;
  await addUserTend({
    courseId,
    type: CourseTendType.LIKE,
  } as CourseTend);
  Message.success('收藏成功');
};

export const dislikeCourse = async (courseId: string) => {
  findCourseById(courseId).userTend = CourseTendType.DISLIKE;
  await addUserTend({
    courseId,
    type: CourseTendType.DISLIKE,
  } as CourseTend);
  Message.success('已添加到不喜欢');
};

export const cancelLikeCourse = async (courseId: string) => {
  findCourseById(courseId).userTend = undefined;
  const success = await deleteUserTend(courseId);
  if (success) {
    Message.success('取消收藏成功');
  } else {
    Message.fail('has bug');
  }
};

export const cancelDislikeCourse = async (courseId: string) => {
  findCourseById(courseId).userTend = undefined;
  const success = await deleteUserTend(courseId);
  if (success) {
    Message.success('已移除不喜欢');
  } else {
    Message.fail('has bug');
  }
};
