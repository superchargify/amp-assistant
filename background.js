/* global chrome */

var base = 'https://preview.superchargify.com/preview?url='

function handleClick (tab) {
  var url = tab.url

  if (url.startsWith('https://preview.superchargify.com/')) return
  if (url.startsWith('https://app.superchargify.com/')) return
  if (url.startsWith('https://www.superchargify.com/')) return

  chrome.tabs.create({ url: base + encodeURIComponent(url) })
}

chrome.browserAction.onClicked.addListener(handleClick)
