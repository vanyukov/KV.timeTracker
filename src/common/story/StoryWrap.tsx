import { type ElementType } from "react"

export function StoryWrap(Story: ElementType) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        maxWidth: "100%",
        flexWrap: "wrap",
      }}
    >
      <Story />
    </div>
  )
}
