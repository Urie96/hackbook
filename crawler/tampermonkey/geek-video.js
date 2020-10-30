/* eslint-disable */
// ==UserScript==
// @name         极客时间加速缓存
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://time.geekbang.org/course/detail/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const oldPlayer = window.Aliplayer;
  window.Aliplayer = function() {
    const res = oldPlayer.apply(this, arguments);
    window.video = res;
    console.log('Aliplayer hooked');
    return res;
  };

  let videoDOM;

  function speed() {
    const speedtimer = setInterval(() => {
      const buf = window.video.getBuffered();
      if (buf.length === 0) {
        return;
      }
      if (window.video.getBuffered().end(0) > window.video._duration - 3) {
        console.log('end');
        clearInterval(speedtimer);
      }
      if (buf.length > 1) {
        console.log('多段缓冲');
        videoDOM.load();
      }
      window.video.seek(buf.end(0) - 8);
    }, 300);
  }

  const t = setInterval(() => {
    videoDOM = document.getElementsByTagName('video')[0];
    if (videoDOM && videoDOM.src) {
      clearInterval(t);
      setTimeout(() => {
        speed();
      }, 2000);
    }
  }, 200);
})();
