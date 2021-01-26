<template>
  <div>
    <CourseListHead />
    <div style="padding-top: 3.6rem">
      <transition-group name="course-list">
        <div v-for="(courseItem, i) in courses" :key="courseItem.id">
          <CourseListItem
            :index="i"
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
import { courses, lastStudyCourseId, init } from './store';

export default defineComponent({
  components: { CourseListItem, CourseListHead },
  setup() {
    const refreshLastStudyCourse = () => {
      lastStudyCourseId.value =
        localStorage.getItem('last_study_course_id') || '';
    };

    onActivated(refreshLastStudyCourse);

    onMounted(async () => {
      Loading.pop();
      await init();
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