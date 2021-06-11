import { ImagePreview } from 'vant';
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

export const makeChildImagePreviewable = (el: HTMLElement) => {
  Array.from(el.getElementsByTagName('img')).forEach((e) => {
    e.onclick = () => {
      imagePreview(e.src);
    };
  });
};

const imagePreview = (image: string) => {
  const viewport = document.querySelector(
    'meta[name=viewport]'
  ) as HTMLMetaElement;
  const originContent = viewport.content;
  viewport.content = 'width=device-width,initial-scale=1.0';
  ImagePreview({
    images: [image],
    showIndex: false,
    onClose: () => {
      viewport.content = originContent;
    },
  });
};
