<template>
  <van-swipe-cell>
    <div class="item">
      <Card :img="course.image" @click="routeToThisCourse">
        <div class="flex-y">
          <div>
            <div class="title oneline">{{ course.title }}</div>
            <i
              class="iconfont icon-heart heart"
              v-if="isFavorite"
              @click="cancelLike"
            ></i>
            <i
              class="iconfont icon-heartbroken heart-broken"
              v-if="isDislike"
              @click="cancelDislike"
            ></i>
          </div>
          <div class="brief oneline">{{ course.brief }}</div>
          <div class="tag">
            <tag>{{ course.teacherName }}</tag>
            <tag>{{ course.teacherTitle }}</tag>
          </div>
          <div>
            <span class="price">{{ course.price }}</span>
            <span class="buy-count">{{ course.purchasedCount }}人购买</span>
            <span class="study">
              <i class="iconfont icon-Loading spin" v-if="!course.done"></i>
              {{ lastStudy ? '继续学习' : '学习' }}
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </Card>
    </div>
    <template #right>
      <div class="right">
        <van-button
          :disabled="buttonIsDisable"
          square
          type="warning"
          @click="like"
        >
          <i class="iconfont icon-good"></i>
        </van-button>
        <van-button
          :disabled="buttonIsDisable"
          square
          type="danger"
          @click="dislike"
        >
          <i class="iconfont icon-bad_fill"></i>
        </van-button>
      </div>
    </template>
  </van-swipe-cell>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/common/Card.vue';
import { CourseTendType } from '@/types/index.d.ts';
import {
  likeCourse,
  cancelLikeCourse,
  dislikeCourse,
  cancelDislikeCourse,
  courses,
} from './store';

export default defineComponent({
  props: ['index', 'lastStudy'],
  components: { Card },
  setup(props) {
    const course = courses.value[props.index] as Course;
    const router = useRouter();

    const routeToThisCourse = () => {
      router.push({
        name: 'course',
        params: { id: course.id },
      });
    };

    const isFavorite = computed(() => course.userTend === CourseTendType.LIKE);
    const isDislike = computed(
      () => course.userTend === CourseTendType.DISLIKE
    );
    const buttonIsDisable = computed(() => isFavorite.value || isDislike.value);
    const like = () => likeCourse(course);
    const cancelLike = (event: Event) => {
      event.stopPropagation();
      // event.cancelBubble = true;
      cancelLikeCourse(course);
    };
    const dislike = () => dislikeCourse(course);
    const cancelDislike = (event: Event) => {
      event.stopPropagation();
      cancelDislikeCourse(course);
    };

    return {
      isFavorite,
      isDislike,
      like,
      dislike,
      cancelLike,
      cancelDislike,
      buttonIsDisable,
      routeToThisCourse,
      course,
    };
  },
});
</script>

<style lang="stylus" scoped>
$heart = var(--heart);
$heart-broken = #ff6666b3;
$price = var(--price);

.item {
  border: 1px solid var(--border-color);
  border-style: none none solid none;
}

.buy-count {
  margin-left: 0.5rem;
  color: var(--text-color-sub);
  font-size: 0.6rem;
}

.study {
  color: var(--text-color-sub);
  font-size: 0.65rem;
  font-weight: 500;
  float: right;
  line-height: 1.5rem;
}

.heart {
  color: $heart;
  line-height: 1.5rem;
}

.heart-broken {
  color: $heart-broken;
  line-height: 1.5rem;
}

.price {
  font-weight: bold;
  color: $price;
  font-size: 1.1rem;

  &:before {
    font-weight: normal;
    content: '¥';
    font-size: 0.85rem;
    letter-spacing: 1px;
  }

  &:after {
    font-weight: normal;
    content: '.00';
    font-size: 0.85rem;
  }
}

.flex-y {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &>:first-child {
    display: flex;
    justify-content: space-between;
  }
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
}

.brief {
  font-size: 0.85rem;
  color: var(--text-color-sub);
}

.tag {
  font-size: 0.5rem;
  display: flex;
  flex-wrap: nowrap;

  &>:first-child {
    flex-shrink: 0;
    margin-left: 0;
  }
}

.right {
  height: 100%;

  &>* {
    width: 100%;
    height: 50%;
  }
}
</style>