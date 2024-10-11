import { type TTrack } from "feature/Tracks"
import { getCurrentTab, isExtensionMode, runInTab } from "./chrome"

const jiraGetTicket = async () => {
  if (!isExtensionMode()) {
    return Promise.resolve("")
  }

  return getCurrentTab().then(tab => {
    if (typeof tab?.url === "string") {
      // @ts-expect-error
      return tab.url.split("/").pop().split("?").shift() ?? ""
    }
    return ""
  })
}

const jiraGetTitle = async () => {
  if (!isExtensionMode()) {
    return Promise.resolve("")
  }

  const func = () => document.querySelector("#summary-val")?.textContent ?? ""
  return getCurrentTab().then(async tab => {
    if (tab.id) {
      const resTab = await runInTab<never[], string>(tab.id, func, [])
      if (Array.isArray(resTab) && resTab.length > 0) {
        return resTab[0].result ?? ""
      }
    }
    return Promise.resolve("")
  })
}

export const jiraFillTrack = async (track: TTrack): Promise<TTrack> => Promise.all(
  [jiraGetTicket(), jiraGetTitle()],
).then(
  res => ({ ...track, ticket: res[0], ticketTitle: res[1] }),
)
