<template>
  <div class="course">
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
      <van-tab title="简介" name="intro">
        <CourseIntroduce />
      </van-tab>
    </van-tabs>
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import CourseIntroduce from './CourseIntroduce.vue';
import CourseCategory from './CourseCategory.vue';
import CourseHead from './CourseHead.vue';
import { Loading } from '@/utils/';
import { init } from './store';

export default defineComponent({
  props: ['id'],
  components: { CourseHead, CourseIntroduce, CourseCategory },
  setup(props) {
    watchEffect(async () => {
      Loading.pop();
      await init(props.id);
      Loading.clear();
    });
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