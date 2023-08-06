export function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      resolve(tabs[0])
    })
  })
}

export function runJS(tab, query) {
  console.log(query)
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tab.id, { code: query }, resultsArray =>
      resolve(resultsArray[0]),
    )
  })
}

export function isExtensionMode() {
  return !!chrome.tabs
}
