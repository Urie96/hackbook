<template>
  <div>
    <divider />
    <h3>精选留言</h3>
    <divider />

    <ArticleCommentListItem
      v-for="comment of comments"
      :key="comment.id"
      v-bind="comment"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { getCommentsByArticleId } from '@/api/';
import ArticleCommentListItem from './ArticleCommentListItem';

export default {
  props: ['id'],
  setup(props) {
    const comments = ref([]);

    const loadComments = async () => {
      const data = await getCommentsByArticleId(props.id);
      comments.value = data;
    };

    loadComments();

    return { comments, ArticleCommentListItem };
  },
};
</script>