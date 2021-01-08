<template>
  <CourseListHead />
  <div style="padding-top: 3.6rem">
    <transition-group name="course-list">
      <div v-for="courseItem of sortedCourses" :key="courseItem.id">
        <CourseListItem
          v-bind="courseItem"
          :lastStudy="courseItem.id === lastStudyCourseId"
        />
      </div>
    </transition-group>
  </div>
  <back-to-top />
</template>

<script>
import { onActivated, onMounted } from 'vue';
import CourseListItem from './CourseListItem';
import CourseListHead from './CourseListHead';
import { Loading } from '@/utils/';
import { lastStudyCourseId, loadCourse, sortedCourses } from './courses';

Array.prototype.shuffle = function () {
  let array = this;
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default {
  setup() {
    const refreshLastStudyCourse = () => {
      lastStudyCourseId.value = Number(
        localStorage.getItem('last_study_course_id')
      );
    };

    onActivated(refreshLastStudyCourse);

    onMounted(async () => {
      Loading.pop();
      await loadCourse();
      Loading.clear();
    });

    return {
      lastStudyCourseId,
      sortedCourses,
      CourseListItem,
      CourseListHead,
    };
  },
};
</script>
<style lang="stylus" scoped>
.course-list-move {
  transition: transform 0.8s ease;
}
</style>