<template>
  <article
    ref="articleContent"
    class="markdown-body"
    id="article-content"
    v-html="content"
  ></article>
</template>
<script>
/* eslint-disable */
import 'github-markdown-css';
import 'highlight.js/styles/github-gist.css';

export default {
  props: ['content'],
  watch: {
    content() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const codeDom = document.querySelectorAll('.markdown-body pre code');
        if (codeDom.length > 0) {
          import('highlight.js').then(({ default: hljs }) => {
            codeDom.forEach((v) => {
              hljs.highlightBlock(v);
            });
          });
        }
        if (/\$.+?\$/.test(this.content)) {
          import('katex/dist/katex.min.css');
          import('katex/contrib/auto-render/auto-render').then(
            ({ default: renderMathInElement }) => {
              renderMathInElement(this.$refs.articleContent, {
                delimiters: [
                  { left: '$$', right: '$$', display: true },
                  { left: '$', right: '$', display: false },
                  { left: '\\(', right: '\\)', display: false },
                  { left: '\\[', right: '\\]', display: true },
                ],
              });
            }
          );
        }
      });
    },
  },
};
</script>
<style >
#article-content {
  margin-top: 20px;
}
#article-content p,
li {
  text-rendering: optimizelegibility;
  user-select: none;
  font-family: 'PingFang SC', 'Lantinghei SC', 'Microsoft Yahei',
    'Hiragino Sans GB', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', Helvetica,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #353535;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  /* list-style-type: none; */
}
#article-content ul,
ol {
  padding-inline-start: 20px;
}
</style>