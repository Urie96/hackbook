import { importScript, Script } from '.';

export const highlightIfNeed = async (dom: HTMLElement) => {
  const codeDom = dom.querySelectorAll('pre code');
  if (codeDom.length === 0) return;
  const hljs = await importScript(Script.Highlight);
  codeDom.forEach((v) => hljs.highlightBlock(v));
};

export const renderMathIfNeed = async (dom: HTMLElement) => {
  if (!/\$.+?\$/.test(dom.innerText)) return;
  await importScript(Script.Katex);
  const renderMathInElement = await importScript(Script.KatexAutoRender);
  const option = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
  };
  renderMathInElement(dom, option);
};
