<template>
  <header>
    <div class="left">
      <div class="search-box">
        <search-box v-model="modelQuery" :placeholder="placeholder" />
      </div>
    </div>
    <div class="title">
      <img src="/favicon.svg" alt="" />
      <span class="site-name">HackBook</span>
    </div>
    <div class="right">
      <ModePicker />
      <fullscreen-button style="height: 36px" />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ModePicker from '@/components/common/ModePicker.vue';
import { searchedCourseIds, courses } from './store';

const debounce = <T>(fn: (...args: any[]) => T, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default defineComponent({
  components: { ModePicker },
  setup() {
    const modelQuery = ref('');
    const placeholder = '';

    const strInclude = (s1: string, s2: string) =>
      s1.toLowerCase().includes(s2.toLowerCase());

    const getSearchedCourses = (keyword: string) =>
      !keyword
        ? []
        : courses.value.filter(
            (c) => strInclude(c.title, keyword) || strInclude(c.brief, keyword)
          );

    const update = debounce(() => {
      if (document.scrollingElement) {
        document.scrollingElement.scrollTo({ top: 0 });
      }
      searchedCourseIds.value = getSearchedCourses(modelQuery.value).map(
        (c) => c.id
      );
    }, 300);

    watch(modelQuery, update);

    return { modelQuery, placeholder };
  },
});
</script>

<style lang="stylus" scoped>
header {
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  padding: 0.7rem 1.5rem;
  padding-left: 7rem;
  background: var(--background-color);
  z-index: 20;
  height: 3.6rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: var(--box-shadow);
  line-height: 2.2rem;
  box-sizing: border-box;

  img {
    height: 2.2rem;
    min-width: 2.2rem;
    margin-right: 0.8rem;
    vertical-align: top;
    display: inline-block;
  }

  .site-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color);
    position: relative;
  }

  .left {
    z-index: 50;
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    left: 0;
    top: 0.7rem;
    display: flex;
    background-color: var(--background-color);

    .seach-box {
      flex: 0 0 auto;
      vertical-align: top;
      display: inline-block;
      position: relative;
    }
  }

  .right {
    position: absolute;
    right: 1rem;
    top: 0.7rem;
    display: flex;

    svg {
      width: 2rem;
      height: 2rem;
      fill: currentcolor;
    }
  }
}
</style>