const fs = require("fs/promises")
const resolveRoot = require("./helpers/resolveRoot")
const createComponent = require("./helpers/createComponent")
const createUiComponent = require("./helpers/createUiComponent")
const createPageComponent = require("./helpers/createPageComponent")

module.exports = async (layer, componentName) => {
  const path = resolveRoot("src", layer, componentName)
  const pathLayer = resolveRoot("src", layer)
  try {
    await fs.mkdir(path)
  } catch (e) {
    console.error(`Failed to create directory ${path}`)
    console.error(e)
    return
  }

  if (["widget", "feature"].includes(layer)) {
    await createComponent(layer, componentName, path, pathLayer)
  }

  if (layer === "pages") {
    await createPageComponent(layer, componentName, path, pathLayer)
  }

  if (layer === "ui") {
    await createUiComponent(layer, componentName, path, pathLayer)
  }
}
