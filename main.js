'use strict'

const addScript = (scriptPath) => {
  const script = document.createElement('script')
  script.setAttribute('type', 'module')
  script.setAttribute('src', chrome.runtime.getURL(scriptPath))
  const head =
    document.head ||
    document.getElementsByTagName('head')[0] ||
    document.documentElement
  head.insertBefore(script, head.lastChild)
}

addScript('/js/distance.js')
addScript('/js/price.js')
