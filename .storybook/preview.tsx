import type { Preview } from "@storybook/react"
import { withRouter } from "storybook-addon-react-router-v6"
import { Provider } from "react-redux"
import { store } from "../src/store"
import { ThemeWrapper } from "../src/common/theme"
import "../src/index.scss"
import React from "react"

export const decorators = [
  story => <ThemeWrapper>{story()}</ThemeWrapper>,
  story => <Provider store={store}>{story()}</Provider>,
  withRouter,
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
