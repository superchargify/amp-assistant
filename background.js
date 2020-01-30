/* global chrome */

var selector = 'document.querySelector(\'link[rel="amphtml"]\')'

function active (amp) {
  chrome.browserAction.setIcon({ path: 'icons/active.png' })
  chrome.browserAction.setTitle({ title: 'Click to open ' + (amp ? 'canonical' : 'Superchargify AMP') + ' page in a new tab' })
}

function inactive () {
  chrome.browserAction.setIcon({ path: 'icons/inactive.png' })
  chrome.browserAction.setTitle({ title: 'Unable to find Superchargify AMP on this page' })
}

function run (click) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var url = tabs[0].url

    if (url.indexOf('/a/sc/amp/') !== -1) {
      if (click) {
        chrome.tabs.create({ url: url.replace('/a/sc/amp', '') })
        return
      }

      active(true)
      return
    }

    chrome.tabs.executeScript(
      {
        code: selector + ' && ' + selector + '.href',
        runAt: 'document_end'
      },
      function (values) {
        var url = values && values[0]
        if (!url) return inactive()

        var isSuperchargifyAMP = url.indexOf('/a/sc/amp/') !== -1
        if (!isSuperchargifyAMP) return inactive()

        if (click) {
          chrome.tabs.create({ url })
          return
        }

        active()
      }
    )
  })
}

chrome.tabs.onUpdated.addListener(function () { run() })
chrome.tabs.onActivated.addListener(function () { run() })
chrome.browserAction.onClicked.addListener(function () { run(true) })
