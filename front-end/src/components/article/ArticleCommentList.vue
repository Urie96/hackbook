<template>
  <div>
    <divider />
    <h3>精选留言</h3>
    <divider />

    <ArticleCommentListItem
      v-for="comment of article.comments"
      :key="comment.id"
      v-bind="comment"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { article } from './store';
import ArticleCommentListItem from './ArticleCommentListItem.vue';

export default defineComponent({
  components: { ArticleCommentListItem },
  setup() {
    return { article };
  },
});
</script>