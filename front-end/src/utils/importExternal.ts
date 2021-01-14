import { Script } from '@/types/external.d.ts';

export { Script };

const scriptInfo = {
  [Script.Katex]: {
    url: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js',
    key: 'katex',
    style: ['https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'],
  },
  [Script.KatexAutoRender]: {
    url:
      'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js',
    key: 'renderMathInElement',
  },
  [Script.Highlight]: {
    url:
      'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@10.4.1/highlight.min.js',
    key: 'hljs',
  },
  [Script.VideoJS]: {
    url: 'https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video.min.js',
    key: 'videojs',
    style: [
      'https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video-js.min.css',
    ],
  },
};

export const importStyle = (url: string) => {
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
};

export const importScript = (script: Script) => {
  const { url, key, style } = scriptInfo[script];
  if (style) {
    style.forEach(importStyle);
  }
  const error: Error & { type?: any; request?: any } = new Error();
  return new Promise((resolve, reject) => {
    if (typeof window[key as any] !== 'undefined') return resolve(null);
    loadScriptTag(url, (event: any) => {
      if (typeof window[key as any] !== 'undefined') return resolve(null);
      const errorType =
        event && (event.type === 'load' ? 'missing' : event.type);
      const realSrc = event && event.target && event.target.src;
      error.message =
        'Loading script failed.\n(' + errorType + ': ' + realSrc + ')';
      error.name = 'ScriptExternalLoadError';
      error.type = errorType;
      error.request = realSrc;
      reject(error);
    });
  }).then((): any => window[key as any]);
};

const loadScriptTag = (() => {
  const inProgress: { [x: string]: Function[] } = {};
  // loadScript function to load a script via script tag
  return (url: string, done: Function) => {
    if (inProgress[url]) {
      inProgress[url].push(done);
      return;
    }
    let script: HTMLScriptElement | null = null;
    let needAttach = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i];
      if (s.getAttribute('src') == url) {
        script = s;
        break;
      }
    }
    if (!script) {
      needAttach = true;
      script = document.createElement('script');
      script.charset = 'utf-8';
      script.src = url;
    }
    inProgress[url] = [done];
    const onScriptComplete = (prev: any, event: any) => {
      if (!script) return;
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      const doneFns = inProgress[url];
      delete inProgress[url];
      script.parentNode && script.parentNode.removeChild(script);
      doneFns && doneFns.forEach((fn) => fn(event));
      if (prev) return prev(event);
    };
    const timeout = setTimeout(
      onScriptComplete.bind(null, undefined, {
        type: 'timeout',
        target: script,
      }),
      120000
    );
    script.onerror = onScriptComplete.bind(null, script.onerror);
    script.onload = onScriptComplete.bind(null, script.onload);
    needAttach && document.head.appendChild(script);
  };
})();
