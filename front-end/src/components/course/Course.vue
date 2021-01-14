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

<script lang="ts">
import { defineComponent } from 'vue';
import CourseIntroduce from './CourseIntroduce.vue';
import CourseCategory from './CourseCategory.vue';
import CourseHead from './CourseHead.vue';

export default defineComponent({
  props: ['id'],
  components: { CourseHead, CourseIntroduce, CourseCategory },
});
</script>