<template>
  <article ref="content" id="article-content"></article>
</template>

<script lang="ts">
import { defineComponent, ref, onDeactivated, onMounted } from 'vue';
import { getArticleContentById } from '@/api/';
import { highlightIfNeed, renderMathIfNeed, Loading } from '@/utils/';

export default defineComponent({
  props: ['id'],
  setup(props) {
    const content = ref({} as HTMLElement);

    let interval: NodeJS.Timeout;
    const storageKey = `article_${props.id}_log`;

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

    const loadContent = async () => {
      const data = await getArticleContentById(props.id);
      // replcace 去除Math区域内的html标签，使katex能正确识别
      content.value.innerHTML = data.replace(/\${2}[\w\W]+?\${2}/g, (match) =>
        match.replace(/<[^>]+>/g, '')
      );
    };

    onDeactivated(stopSavingStudyInfo);

    onMounted(async () => {
      Loading.pop();
      await loadContent();
      Loading.clear();
      turnToLastStudyPosition();
      savingStudyRecord();
      highlightIfNeed(content.value);
      renderMathIfNeed(content.value);
    });

    return { content };
  },
});
</script>

<style lang="stylus">
@require './ArticleContent';
</style>