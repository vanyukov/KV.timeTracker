require("console-error")
const firstCharUpperCase = require("./helpers/firstCharUpperCase")
const createTemplate = require("./createTemplate")

const availableLayers = ["ui", "widget", "feature", "pages"]

const layer = process.argv[2]
const componentName = firstCharUpperCase(process.argv[3])

if (!layer || !availableLayers.includes(layer)) {
  console.error(
    `\nPlease enter the layer name: \'${availableLayers.join(
      "' or '",
    )}\' \nformat: layer componentName\n`,
  )
  return
}

if (!componentName) {
  console.error(
    "Please enter the name of the component \nformat: layer/componentName\n",
  )
  return
}

createTemplate(layer, componentName)
