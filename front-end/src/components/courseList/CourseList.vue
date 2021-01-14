<template>
  <div>
    <CourseListHead />
    <div style="padding-top: 3.6rem">
      <transition-group name="course-list">
        <div v-for="courseItem of courses" :key="courseItem.id">
          <CourseListItem
            v-bind="courseItem"
            :lastStudy="courseItem.id === lastStudyCourseId"
          />
        </div>
      </transition-group>
    </div>
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted } from 'vue';
import CourseListItem from './CourseListItem.vue';
import CourseListHead from './CourseListHead.vue';
import { Loading } from '../../utils/';
import { courses, lastStudyCourseId, loadCourse } from './courses';

export default defineComponent({
  components: { CourseListItem, CourseListHead },
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
      courses,
    };
  },
});
</script>

<style lang="stylus" scoped>
.course-list-move {
  transition: transform 0.8s ease;
}
</style>