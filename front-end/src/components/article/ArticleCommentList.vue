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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getCommentsByArticleId } from '@/api/';
import ArticleCommentListItem from './ArticleCommentListItem.vue';

export default defineComponent({
  props: ['id'],
  components: { ArticleCommentListItem },
  setup(props) {
    const comments = ref([] as Comment[]);

    const loadComments = async () => {
      const data = await getCommentsByArticleId(props.id);
      comments.value = data;
    };

    loadComments();

    return { comments };
  },
});
</script>