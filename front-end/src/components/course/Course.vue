<template>
  <div :key="id">
    <CourseHead :courseId="id" />
    <van-tabs
      sticky
      animated
      swipeable
      color="var(--theme)"
      line-width="40%"
      line-height="2px"
    >
      <van-tab title="目录" name="category">
        <CourseCategory :courseId="id" />
      </van-tab>
      <van-tab title="简介" name="intro">
        <CourseIntroduce :courseId="id" />
      </van-tab>
    </van-tabs>
    <back-to-top />
  </div>
</template>

<script>
import CourseIntroduce from './CourseIntroduce';
import CourseCategory from './CourseCategory';
import CourseHead from './CourseHead';

export default {
  props: ['id'],
  components: { CourseHead, CourseIntroduce, CourseCategory },
};
</script>
<style lang="stylus">
.van-tab {
  // border: 1px solid #eeeeee;
}
</style>