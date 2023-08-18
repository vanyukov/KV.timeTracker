import React from "react"
import type { Preview } from "@storybook/react"
import { withRouter } from "storybook-addon-react-router-v6"
import { Provider } from "react-redux"
import { reactRouterParameters } from "storybook-addon-react-router-v6"
import { store } from "../src/store"
import { ThemeWrapper } from "../src/common/theme"
import "../src/index.scss"

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
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { year: "2023", month: "8", day: "17" },
      },
      routing: { path: "/day/:year/:month/:day" },
    }),
  },
}

export default preview
