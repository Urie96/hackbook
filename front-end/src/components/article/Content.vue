<template>
  <article ref="articleContent" id="article-content"></article>
</template>
<script>
/* eslint-disable */
// import 'github-markdown-css';
// import 'highlight.js/styles/github-gist.css';
window.remote.loadStyle(
  'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.css'
);

/** @param {HTMLElement} dom */
async function renderMath(dom) {
  if (!/\$.+?\$/.test(dom.innerText)) {
    return;
  }
  window.remote.loadStyle(
    'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
  );
  await window.remote.loadScript(
    'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js',
    'katex'
  );
  await window.remote.loadScript(
    'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js',
    'renderMathInElement'
  );
  const option = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
  };
  renderMathInElement(dom, option);
}

async function highlight(dom) {
  const codeDom = dom.querySelectorAll('pre code');
  if (codeDom.length > 0) {
    await window.remote.loadScript(
      'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@10.4.1/highlight.min.js',
      'hljs'
    );
    codeDom.forEach((v) => hljs.highlightBlock(v));
  }
}

/** @this {import('vue').default} */
function init() {
  this.$refs.articleContent.innerHTML = this.content.replace(
    /\${2}[\w\W]+?\${2}/g,
    (match) => match.replace(/<[^>]+>/g, '')
  );
  this.$nextTick().then(() => {
    const articleDom = this.$refs.articleContent;
    renderMath(articleDom);
    highlight(articleDom);
  });
}

/** @type {import('vue').ComponentOptions} */
const exp = {
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
    init,
  },
};

export default exp;
</script>
<style >
#article-content code {
  background-color: #f6f8fa;
  border-radius: 5px;
}
#article-content img {
  max-width: 100%;
}
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

.hljs-comment,
.hljs-meta {
  color: #969896;
}

.hljs-variable,
.hljs-template-variable,
.hljs-strong,
.hljs-emphasis,
.hljs-quote {
  color: #df5000;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-type {
  color: #d73a49;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-attribute {
  color: #0086b3;
}

.hljs-section,
.hljs-name {
  color: #63a35c;
}

.hljs-tag {
  color: #333333;
}

.hljs-title,
.hljs-attr,
.hljs-selector-id,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo {
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