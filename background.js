/* global chrome, alert */

var selector = 'document.querySelector(\'link[rel="amphtml"]\')'

function createAlert () {
  alert('This page doesn\'t have a Superchargify AMP page')
}

function handleClick (tab) {
  var url = tab.url

  if (url.indexOf('/a/sc/amp/') !== -1) {
    chrome.tabs.create({ url: url.replace('/a/sc/amp', '') })
    return
  }

  chrome.tabs.executeScript(
    {
      code: selector + ' && ' + selector + '.href',
      runAt: 'document_end'
    },
    function (values) {
      var url = values && values[0]
      if (!url) return createAlert()

      var isSuperchargifyAMP = url.indexOf('/a/sc/amp/') !== -1
      if (!isSuperchargifyAMP) return createAlert()

      chrome.tabs.create({ url })
    }
  )
}

chrome.browserAction.onClicked.addListener(handleClick)
