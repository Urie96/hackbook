/* eslint-disable */
// ==UserScript==
// @name         cococut auto save
// @namespace    cococut
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cococut.net/zh_cn/hls.html
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const interval = setInterval(() => {
    if ($('#switchRecMode').css('display') === 'block') {
      clearInterval(interval);
      $('#confirmCaptureOKButton')
        .click()
        .click();
    }
  }, 500);

  var timer = window.setInterval(function() {
    let title = $('title').text();
    if (title.indexOf('完成') > -1) {
      $('.finishedDlBtn')
        .eq(-2)
        .click();
      clearInterval(timer);
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  }, 500);
  // Your code here...
})();
