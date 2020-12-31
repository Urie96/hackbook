<template>
  <van-swipe-cell>
    <div style="border: 1px solid #eee; border-style: solid none none none">
      <Card :img="image" @click="routeToThisCourse">
        <div class="flex-y">
          <div>
            <div class="title oneline">{{ title }}</div>
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
          <div class="brief oneline">{{ brief }}</div>
          <div class="tag">
            <tag>{{ teacherName }}</tag>
            <tag>{{ teacherTitle }}</tag>
          </div>
          <div>
            <span class="price">{{ price }}</span>
            <span class="buy-count">{{ purchasedCount }}</span>
            <span class="study">
              <i class="iconfont icon-Loading spin" v-if="!done"></i>
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

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Card from '../common/Card';
import {
  courseIsFavorite,
  likeCourse,
  cancelLikeCourse,
  courseIsDislike,
  dislikeCourse,
  cancelDislikeCourse,
} from '@/utils/favorite';

export default {
  props: [
    'image',
    'title',
    'brief',
    'teacherName',
    'teacherTitle',
    'price',
    'id',
    'purchasedCount',
    'done',
    'favset',
    'lastStudy',
  ],
  setup(props) {
    const router = useRouter();

    const routeToThisCourse = () => {
      router.push({
        name: 'course',
        params: { id: props.id },
      });
    };

    const isFavorite = computed(() => courseIsFavorite(props.id));
    const isDislike = computed(() => courseIsDislike(props.id));
    const buttonIsDisable = computed(
      () => courseIsFavorite(props.id) || courseIsDislike(props.id)
    );
    const like = () => likeCourse(props.id);
    const cancelLike = (event) => {
      event.stopPropagation();
      // event.cancelBubble = true;
      cancelLikeCourse(props.id);
    };
    const dislike = () => dislikeCourse(props.id);
    const cancelDislike = (event) => {
      event.stopPropagation();
      cancelDislikeCourse(props.id);
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
      Card,
    };
  },
};
</script>

<style lang="stylus" scoped>
$heart = var(--heart);
$heart-broken = #ff6666b3;
$price = var(--price);

.buy-count {
  margin-left: 0.5rem;
  color: #606060;
  font-size: 0.6rem;
}

.study {
  color: #606060;
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
  color: #666;
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