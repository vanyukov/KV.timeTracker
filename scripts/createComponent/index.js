require("console-error")
const firstCharUpperCase = require("./helpers/firstCharUpperCase")
const createTemplate = require("./createTemplate")

const availableLayers = ["ui", "widget", "feature", "pages"]

if (!process.argv[2]) {
  console.error(
    `\nPlease enter the layer name, format: layer/newComponent\navailable layers: \'${availableLayers.join(
      "' or '",
    )}\'\nexample: components/NewComponent`,
  )
  return
}

const args = process.argv[2].split("/")
const layer = args[0]
const componentName = firstCharUpperCase(args[1])

if (!layer || !availableLayers.includes(layer)) {
  console.error(
    `\nPlease enter the layer name: \'${availableLayers.join(
      "' or '",
    )}\' \nformat: layer/componentName\n`,
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
