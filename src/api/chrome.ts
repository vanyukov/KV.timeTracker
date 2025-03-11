export function isExtensionMode() {
  return !!chrome.tabs
}

export async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export async function runInTab<T extends any[], U>(
  tabId: number,
  func: (...args: unknown[]) => U,
  args: T,
) {
  return chrome.scripting.executeScript<T, U>({
    target: { tabId, allFrames: true },
    func,
    args,
  })
}

export const currentTab = isExtensionMode() ? ((await getCurrentTab()).id as number) : 0

export const getcurrentLink = async () => {
  if (!isExtensionMode()) {
    return Promise.resolve(window.location.href)
  }

  return getCurrentTab().then(tab => {
    if (typeof tab?.url === "string") {
      return tab.url ?? ""
    }
    return ""
  })
}
