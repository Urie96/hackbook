<template>
  <article
    ref="contentRef"
    id="article-content"
    v-html="article.content"
  ></article>
</template>

<script lang="ts">
import { defineComponent, ref, onDeactivated, onMounted } from 'vue';
import { highlightIfNeed, renderMathIfNeed } from '@/utils/';
import { article } from './store';

export default defineComponent({
  setup(props) {
    const contentRef = ref({} as HTMLElement);

    let interval: NodeJS.Timeout;
    const storageKey = `article_${article.id}_log`;

    const savingStudyRecord = () => {
      const scrollingElement = document.scrollingElement;
      if (scrollingElement) {
        interval = setInterval(() => {
          localStorage.setItem(storageKey, String(scrollingElement.scrollTop));
        }, 10000);
      }
    };

    const stopSavingStudyInfo = () => clearInterval(interval);

    const turnToLastStudyPosition = () => {
      const studyPosition = localStorage.getItem(storageKey);
      const scrollingElement = document.scrollingElement;
      if (scrollingElement && studyPosition) {
        scrollingElement.scrollTo({ top: Number(studyPosition) });
      }
    };

    onDeactivated(stopSavingStudyInfo);

    onMounted(() => {
      turnToLastStudyPosition();
      savingStudyRecord();
      highlightIfNeed(contentRef.value);
      renderMathIfNeed(contentRef.value);
    });

    return { contentRef, article };
  },
});
</script>

<style lang="stylus">
@require './ArticleContent';
</style>