<template>
  <NavBar :title="course?.title || ''" @goBack="goBack" />
  <div class="course" v-if="course">
    <CourseHead />
    <van-tabs
      sticky
      animated
      swipeable
      color="var(--theme)"
      line-width="40%"
      line-height="2px"
    >
      <van-tab title="目录" name="category">
        <CourseCategory />
      </van-tab>
      <van-tab title="简介" name="intro" v-if="course.description">
        <CourseIntroduce />
      </van-tab>
    </van-tabs>
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import CourseIntroduce from './CourseIntroduce.vue';
import CourseCategory from './CourseCategory.vue';
import CourseHead from './CourseHead.vue';
import NavBar from '@/components/common/NavBar.vue';
import { Loading } from '@/utils/';
import { init, course } from './store';

export default defineComponent({
  props: ['id'],
  components: { CourseHead, CourseIntroduce, CourseCategory, NavBar },
  setup(props) {
    const router = useRouter();

    const goBack = () => router.replace('/');

    watchEffect(async () => {
      try {
        Loading.pop();
        await init(props.id);
      } finally {
        Loading.clear();
      }
    });

    return { course, goBack };
  },
});
</script>
<style lang="stylus">
.course {
  .van-tabs__nav {
    background-color: var(--background-color);
  }

  .van-tab {
    color: var(--text-color);
  }
}
</style>