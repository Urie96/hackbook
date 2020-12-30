<template>
  <div>
    <div class="head">
      <div>
        <i :style="avatorStyle" class="fas fa-user-circle"></i>
      </div>
      <div style="margin-left: 0.5rem">
        <div class="name">{{ nickName }}</div>
        <div class="date">{{ date }}</div>
      </div>
    </div>
    <div
      :class="['content', { 'content-spread': isSpread }]"
      @click="isSpread = !isSpread"
      v-html="content"
    ></div>
    <div
      class="reply"
      v-for="reply of comments"
      :key="reply.id"
      v-html="reply.nickName + ': ' + reply.content"
    ></div>
    <div class="icon">
      <div><i class="fas fa-comment-dots"></i></div>
      <div><i class="fas fa-star"> </i> {{ Number(likeCount) || '' }}</div>
    </div>
    <divider />
  </div>
</template>

<script>
import { ref } from 'vue';
import { getOneColor } from '@/utils/';

export default {
  props: ['date', 'nickName', 'content', 'comments', 'likeCount'],
  setup() {
    const isSpread = ref(false);

    const avatorStyle = {
      'font-size': '2rem',
      color: getOneColor(),
    };

    return { isSpread, avatorStyle };
  },
};
</script>

<style lang="stylus" scoped>
.head {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.name {
  color: #353535;
  font-size: 15px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
}

.date {
  color: #888;
  font-size: 14px;
  line-height: 1;
}

.content {
  color: #4c4c4c;
  font-size: 15px;
  font-weight: 400;
  white-space: normal;
  word-break: break-all;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}

.content-spread {
  overflow: auto;
  -webkit-line-clamp: unset;
}

.reply {
  margin: 0;
  color: #888;
  font-size: 14px;
  font-weight: 400;
  white-space: normal;
  word-break: break-all;
  background: #f6f7fb;
  border-radius: 10px;
  padding: 18px;
  overflow-x: scroll;
}

.icon {
  display: flex;
  margin-top: 8px;
  align-items: center;
  font-size: 12px;
  color: #888;
  padding-left: 0 10px;
  justify-content: flex-end;

  &>div {
    padding-left: 1.3rem;
    font-size: 1rem;
  }
}

.fa-star {
  color: #f1c40f;
}

.fa-comment-dots {
  color: var(--theme);
}
</style>