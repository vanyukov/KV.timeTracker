require("console-info")
require("console-error")
const fs = require("fs/promises")
const componentTemplate = require("../templates/componentTemplate")
const storyTemplate = require("../templates/storyTemplate")
const styleTemplate = require("../templates/styleTemplate")
const indexTemplate = require("../templates/indexTemplate")

module.exports = async (layer, componentName, path, pathLayer) => {
  const createComponent = async () => {
    try {
      await fs.writeFile(
        `${path}/${componentName}.tsx`,
        componentTemplate(componentName),
      )
      await fs.writeFile(
        `${path}/${componentName}.stories.tsx`,
        storyTemplate(layer, componentName),
      )
      await fs.writeFile(
        `${path}/${componentName}.module.scss`,
        styleTemplate(componentName),
      )
      await fs.writeFile(`${path}/index.ts`, indexTemplate(componentName))
      await fs.appendFile(`${pathLayer}/index.ts`, indexTemplate(componentName))
      console.info("Created")
    } catch (e) {
      console.error("Failed to create component")
    }
  }

  await createComponent()
}
