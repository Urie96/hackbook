/* eslint-disable */
const loadScriptTag = (() => {
  const inProgress = {};
  // loadScript function to load a script via script tag
  return (url, done) => {
    if (inProgress[url]) {
      inProgress[url].push(done);
      return;
    }
    let script, needAttach;
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
      script.timeout = 120;
      script.src = url;
    }
    inProgress[url] = [done];
    const onScriptComplete = (prev, event) => {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      const doneFns = inProgress[url];
      delete inProgress[url];
      script.parentNode && script.parentNode.removeChild(script);
      doneFns && doneFns.forEach((fn) => fn(event));
      if (prev) return prev(event);
    };
    var timeout = setTimeout(
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

function loadScript(url, key) {
  const error = new Error();
  return new Promise((resolve, reject) => {
    if (typeof window[key] !== 'undefined') return resolve();
    loadScriptTag(url, (event) => {
      if (typeof window[key] !== 'undefined') return resolve();
      var errorType = event && (event.type === 'load' ? 'missing' : event.type);
      var realSrc = event && event.target && event.target.src;
      error.message =
        'Loading script failed.\n(' + errorType + ': ' + realSrc + ')';
      error.name = 'ScriptExternalLoadError';
      error.type = errorType;
      error.request = realSrc;
      reject(error);
    });
  }).then(() => window[key]);
}

function loadStyle(url) {
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

window.remote = {
  loadScript,
  loadStyle,
};
