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
import { defineComponent } from 'vue';
import ArticleCommentListItem from './ArticleCommentListItem.vue';
import { comments } from './store';

export default defineComponent({
  components: { ArticleCommentListItem },
  setup() {
    return { comments };
  },
});
</script>