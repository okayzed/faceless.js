// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var CUR_HOSTNAME;
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  console.log("CHECKING URL", tabId, changeInfo, tab);
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);


var TO_DEFACE = {};
chrome.pageAction.onClicked.addListener(function() {
  chrome.storage.local.get(CUR_HOSTNAME, function(res) {
    TO_DEFACE[CUR_HOSTNAME] = !res[CUR_HOSTNAME];

    var options = {};
    options[CUR_HOSTNAME] = TO_DEFACE[CUR_HOSTNAME];
    chrome.storage.local.set(options, function() {
      chrome.tabs.reload();
    });
  });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      sendResponse({deface: !TO_DEFACE[CUR_HOSTNAME]});
    });

