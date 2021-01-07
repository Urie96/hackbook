<template>
  <van-search
    placeholder="请输入搜索关键词"
    shape="round"
    v-model="searchQuery"
  />
  <transition-group name="course-list">
    <div v-for="courseItem of sortedCourses" :key="courseItem.id">
      <CourseListItem
        v-bind="courseItem"
        :lastStudy="courseItem.id === lastStudyCourseId"
      />
    </div>
  </transition-group>
  <back-to-top />
</template>

<script>
import { reactive, ref, computed, onActivated, onMounted } from 'vue';
import { getAllCourses } from '@/api';
import CourseListItem from './CourseListItem';
import { courseIsFavorite, courseIsDislike } from '@/utils/favorite';
import { Loading } from '@/utils/';

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
    const courses = ref([]);
    const searchQuery = ref('');
    const lastStudyCourseId = ref(-1);

    const loadCourse = async () => {
      const data = await getAllCourses();
      data.shuffle();
      courses.value = data;
    };

    const refreshLastStudyCourse = () => {
      lastStudyCourseId.value = Number(
        localStorage.getItem('last_study_course_id')
      );
    };

    const getPriority = (() => {
      const strInclude = (s1, s2) =>
        s1.toLowerCase().includes(s2.toLowerCase());
      return (course) => {
        let s = 0;
        if (strInclude(course.title, searchQuery.value)) {
          s += 10000;
        } else if (strInclude(course.brief, searchQuery.value)) {
          s += 9000;
        }
        if (course.id === lastStudyCourseId.value) s += 100;
        if (courseIsFavorite(course.id)) s += 10;
        if (courseIsDislike(course.id)) s -= 5000;
        return s;
      };
    })();

    const sortedCourses = computed(() =>
      courses.value.sort((a, b) => getPriority(b) - getPriority(a))
    );

    onActivated(refreshLastStudyCourse);

    onMounted(async () => {
      Loading.pop();
      await loadCourse();
      Loading.clear();
    });

    return {
      lastStudyCourseId,
      sortedCourses,
      searchQuery,
      CourseListItem,
    };
  },
};
</script>
<style lang="stylus" scoped>
.course-list-move {
  transition: transform 0.8s ease;
}
</style>