<template>
  <div>
    <h3 v-if="comments.length > 0">精选留言</h3>
    <div v-for="comment of comments" :key="comment.id">
      <CommentItem :comment="comment" />
      <el-divider> </el-divider>
    </div>
  </div>
</template>
<script>
import CommentItem from './CommentItem.vue';

export default {
  name: 'Comment',
  props: ['articleId'],
  components: { CommentItem },
  data() {
    return {
      comments: [],
      count: 10,
      loading: false,
    };
  },
  watch: {
    articleId() {
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const data = await this.$axios.get(
        `/articles/${this.articleId}/comments?_embed=comments`
      );
      this.comments = data;
    },
  },
};
</script>