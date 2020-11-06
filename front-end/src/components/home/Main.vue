<template>
  <div v-loading.fullscreen.lock="loading" class="main infinite-list-wrapper">
    <div class="fix">
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="keyword"
        clearable
        @change="search"
      ></el-input>
    </div>
    <div
      ref="courseBox"
      v-if="courses.length"
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disableLoad"
      style="overflow: auto; height: 100vh"
    >
      <div class="list-item" v-for="courseItem of courses" :key="courseItem.id">
        <CourseItem :courseItem="courseItem" />
      </div>
      <el-backtop target=".list" :right="20" :bottom="20"></el-backtop>
    </div>
  </div>
</template>

<script>
import _ from 'lodash/array';
import CourseItem from './CourseItem.vue';

export default {
  name: 'Main',
  data() {
    return {
      loadingMore: false,
      loading: true,
      allCourses: [],
      courses: [],
      keyword: '',
    };
  },
  computed: {
    disableLoad() {
      return this.loadingMore || this.loading || this.noMore;
    },
    noMore() {
      return this.allCourses.length === this.courses.length;
    },
  },
  methods: {
    search() {
      this.allCourses.forEach((c) => {
        const tmp = c;
        tmp.isSearching = false;
      });
      if (this.keyword) {
        const k = this.keyword.toLowerCase();
        this.allCourses.forEach((c) => {
          if (c.title.toLowerCase().includes(k)) {
            const tmp = c;
            tmp.isSearching = true;
          }
        });
        this.sortCoursesAndReload();
      }
    },
    loadMore() {
      this.loadingMore = true;
      const remain = _.difference(this.allCourses, this.courses);
      this.courses.push(...remain.slice(0, 10));
      this.loadingMore = false;
    },
    sortCoursesAndReload() {
      const lastStudyCouseId =
        Number(localStorage.getItem('last_study_course_id')) || 0;
      const level = (course) => {
        if (course.isSearching) return 10000;
        if (course.id === lastStudyCouseId) return 1000;
        if (course.isFavorite) return 100;
        return 0;
      };
      this.allCourses.sort((a, b) => {
        return level(b) - level(a);
      });
      this.courses = [];
      this.loadMore();
      this.$nextTick(() => {
        this.$refs.courseBox.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    setFavorites() {
      return this.$axios
        .get(`/userservice/favorites`)
        .then((data) => {
          const set = new Set(data.map((v) => v.courseId));
          this.allCourses
            .filter((v) => set.has(v.id))
            .forEach((c) => {
              const tmp = c;
              tmp.isFavorite = true;
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  async mounted() {
    this.loading = true;
    this.allCourses = await this.$axios.get(`/courses`);
    await this.setFavorites();
    this.sortCoursesAndReload();
    this.loading = false;
  },
  activated() {
    if (this.$refs.courseBox) {
      const savedPostion = sessionStorage.getItem('saved_position') || 0;
      this.$refs.courseBox.scrollTo({ top: savedPostion });
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem('saved_position', this.$refs.courseBox.scrollTop);
    next();
  },
  components: { CourseItem },
};
</script>
<style scoped>
.list::-webkit-scrollbar {
  display: none;
}
.fix {
  padding: 10px;
  background-color: white;
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
}
.main {
  padding-top: 50px;
  /* padding: 3px 0 3px 0; */
}
</style>