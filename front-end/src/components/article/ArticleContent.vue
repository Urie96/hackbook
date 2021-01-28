<template>
  <article id="article-content"></article>
</template>

<script lang="ts">
import { defineComponent, onDeactivated, onMounted, watch, toRef } from 'vue';
import { highlightIfNeed, renderMathIfNeed } from '@/utils/';
import { article } from './store';

export default defineComponent({
  setup() {
    let interval: NodeJS.Timeout;
    const storageKey = () => `article_${article.id}_log`;

    const savingStudyRecord = () => {
      const scrollingElement = document.scrollingElement;
      if (scrollingElement) {
        interval = setInterval(
          () =>
            localStorage.setItem(
              storageKey(),
              String(scrollingElement.scrollTop)
            ),
          10000
        );
      }
    };

    const stopSavingStudyInfo = () => clearInterval(interval);

    const turnToLastStudyPosition = () => {
      const studyPosition = Number(localStorage.getItem(storageKey())) || 0;
      const scrollingElement = document.scrollingElement;
      if (scrollingElement) {
        scrollingElement.scrollTo({ top: Number(studyPosition) });
      }
    };

    const contentEl = document.createElement('article');
    contentEl.id = 'article-content';

    watch(toRef(article, 'content'), (v) => {
      contentEl.innerHTML = v;
      turnToLastStudyPosition();
      savingStudyRecord();
      highlightIfNeed(contentEl);
      renderMathIfNeed(contentEl);
    });

    onMounted(() => {
      document.getElementById('article-content')?.replaceWith(contentEl);
    });

    onDeactivated(stopSavingStudyInfo);
  },
});
</script>

<style lang="stylus">
@require './ArticleContent';
</style>