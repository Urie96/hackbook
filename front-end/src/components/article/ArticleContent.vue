<template>
  <article id="article-content"></article>
</template>

<script lang="ts">
import { defineComponent, onDeactivated, onMounted } from 'vue';
import { highlightIfNeed, renderMathIfNeed } from '@/utils/';
import { article } from './store';

export default defineComponent({
  setup() {
    let interval: NodeJS.Timeout;
    const storageKey = () => `article_${article.value.id}_log`;

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

    const removeInlineStyle = (el: HTMLElement) => {
      Array.from(el.getElementsByTagName('*')).forEach((e) =>
        e.removeAttribute('style')
      );
    };

    onMounted(() => {
      const contentEl = document.getElementById('article-content');
      if (!contentEl) return;
      // replcace 去除Math区域内的html标签，使katex能正确识别
      contentEl.innerHTML =
        article.value?.content?.replace(/\${2}[\w\W]+?\${2}/g, (match) =>
          match.replace(/<[^>]+>/g, '')
        ) || '';
      removeInlineStyle(contentEl);
      turnToLastStudyPosition();
      savingStudyRecord();
      highlightIfNeed(contentEl);
      renderMathIfNeed(contentEl);
    });

    onDeactivated(stopSavingStudyInfo);
  },
});
</script>

<style lang="stylus">
@require './ArticleContent';
</style>