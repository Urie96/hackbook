<template>
  <article ref="content" id="article-content"></article>
</template>

<script>
import { ref, onDeactivated, onMounted } from 'vue';
import { getArticleContentById } from '@/api/';
import { highlightIfNeed, renderMathIfNeed, Loading } from '@/utils/';

export default {
  props: ['id'],
  setup(props) {
    const content = ref(null);
    Loading.pop();

    let interval;
    const storageKey = `article_${props.id}_log`;

    const savingStudyRecord = () => {
      const scrollingElement = document.scrollingElement;
      interval = setInterval(() => {
        localStorage.setItem(storageKey, scrollingElement.scrollTop);
      }, 10000);
    };

    const stopSavingStudyInfo = () => {
      clearInterval(interval);
    };

    const turnToLastStudyPosition = () => {
      const studyPosition = localStorage.getItem(storageKey);
      document.scrollingElement.scrollTo({ top: studyPosition });
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
      await loadContent();
      Loading.clear();
      turnToLastStudyPosition();
      savingStudyRecord();
      highlightIfNeed(content.value);
      renderMathIfNeed(content.value);
    });

    return { content };
  },
};
</script>

<style lang="stylus">
@require './ArticleContent';
</style>