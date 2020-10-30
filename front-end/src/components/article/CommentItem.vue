<template>
  <div>
    <div style="display: flex; padding-bottom: 10px">
      <el-avatar
        :size="35"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <div style="margin-left: 0.5rem">
        <div class="name">{{ comment.nickName }}</div>
        <div class="date">{{ comment.date }}</div>
      </div>
    </div>
    <div
      :class="['content', { 'content-spread': isSpread }]"
      @click="isSpread = !isSpread"
    >
      {{ comment.content }}
    </div>
    <div class="reply" v-for="reply of comment.comments" :key="reply.id">
      {{ reply.nickName }}: {{ reply.content }}
    </div>
    <div class="icon">
      <div><i class="el-icon-chat-dot-square"></i><span> </span></div>
      <div>
        <i class="el-icon-star-off"></i
        ><span> {{ Number(comment.likeCount) || '' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comment'],
  name: 'CommentItem',
  data() {
    return {
      isSpread: false,
    };
  },
};
</script>
<style scoped>
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
}
.icon > div {
  padding-left: 20px;
  font-size: 17px;
}
.icon > div > span {
  font-size: 15px;
}
.comment-item {
  display: flex;
  margin-top: 20px;
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
</style>