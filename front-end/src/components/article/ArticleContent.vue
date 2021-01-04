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
#article-content {
  margin-top: 1.3rem;

  blockquote {
    margin: 1rem 0;
    background-color: rgba(27, 31, 35, 0.05);
    padding: 1rem 1.5rem;
    border-left: 0.5rem solid #67cc86;
  }

  img {
    max-width: 100%;
  }

  ol, ul {
    line-height: 2.2;
    padding-left: 1.2em;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  p, li {
    text-rendering: optimizelegibility;
    font-family: 'PingFang SC', 'Lantinghei SC', 'Microsoft Yahei', 'Hiragino Sans GB', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', Helvetica, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 2rem;
    color: #353535;
    line-height: 2.2;
    // white-space: pre-wrap;
    // overflow-wrap: break-word;
  }
}

/**
 * GitHub Gist Theme
 * Author : Anthony Attard - https://github.com/AnthonyAttard
 * Author : Louis Barranqueiro - https://github.com/LouisBarranqueiro
 */
.hljs {
  display: block;
  background: white;
  padding: 0.5em;
  color: #333333;
  overflow-x: auto;
}

.hljs-comment, .hljs-meta {
  color: #969896;
}

.hljs-variable, .hljs-template-variable, .hljs-strong, .hljs-emphasis, .hljs-quote {
  color: #df5000;
}

.hljs-keyword, .hljs-selector-tag, .hljs-type {
  color: #d73a49;
}

.hljs-literal, .hljs-symbol, .hljs-bullet, .hljs-attribute {
  color: #0086b3;
}

.hljs-section, .hljs-name {
  color: #63a35c;
}

.hljs-tag {
  color: #333333;
}

.hljs-title, .hljs-attr, .hljs-selector-id, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo {
  color: #6f42c1;
}

.hljs-addition {
  color: #55a532;
  background-color: #eaffea;
}

.hljs-deletion {
  color: #bd2c00;
  background-color: #ffecec;
}

.hljs-link {
  text-decoration: underline;
}

.hljs-number {
  color: #005cc5;
}

.hljs-string {
  color: #032f62;
}
</style>