import { Notify as VanNotify } from 'vant';
import Message from './message'
import Loading from './loading';

export const Notify = VanNotify

export { Message, Loading, }

export const loadStyle = (url) => {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
        const s = links[i];
        if (s.getAttribute('href') == url) {
            return;
        }
    }
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

export const getOneColor = () => {
    const tagColorArr = [
        '#e15b64',
        '#f47e60',
        '#f8b26a',
        '#abbd81',
        '#849b87',
        '#e15b64',
        '#f47e60',
        '#f8b26a',
        '#f26d6d',
        '#67cc86',
        '#fb9b5f',
        '#3498db',
    ];
    const index = Math.floor(Math.random() * tagColorArr.length);
    return tagColorArr[index];
}

export const highlightIfNeed = async (dom) => {
    const codeDom = dom.querySelectorAll('pre code');
    if (codeDom.length === 0) return;
    const { default: hljs } = await import('highlight.js');
    codeDom.forEach((v) => hljs.highlightBlock(v));
}

export const renderMathIfNeed = async (dom) => {
    if (!/\$.+?\$/.test(dom.innerText)) return;
    loadStyle('https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css');
    await import('katex');
    const { default: renderMathInElement } = await import(
        'katex/contrib/auto-render/auto-render.js'
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