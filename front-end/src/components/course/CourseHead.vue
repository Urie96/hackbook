<template>
  <NavBar :title="course.title" @goBack="goBack" />
  <div class="head">
    <Card :img="course.image">
      <div class="intro">
        <div>
          <div class="title oneline">{{ course.title }}</div>
          <div class="brief oneline" style="line-height: 2">
            {{ course.brief }}
          </div>
        </div>
        <div class="flex-x">
          <div class="author oneline">讲师：{{ course.teacherName }}</div>
          <div></div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/common/NavBar.vue';
import Card from '@/components/common/Card.vue';
import { course } from './store';

export default defineComponent({
  components: { Card, NavBar },
  setup() {
    const router = useRouter();

    const goBack = () => router.replace('/');

    return { course, goBack };
  },
});
</script>

<style lang="stylus" scoped>
.head {
  padding: 0.6rem;
}

.intro {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.2;
}

.brief, .author {
  font-size: 0.7rem;
  font-weight: 400;
}

.flex-x {
  display: flex;
}
</style>