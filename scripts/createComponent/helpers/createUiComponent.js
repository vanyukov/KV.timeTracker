require("console-info")
require("console-error")
const fs = require("fs/promises")
const uiComponentTemplate = require("../templates/uiComponentTemplate")
const storyTemplate = require("../templates/storyTemplate")
const indexTemplate = require("../templates/indexTemplate")

module.exports = async (layer, componentName, path, pathLayer) => {
  console.log("🚀 -> file: createUI.js:7 -> module.exports= -> path:", path)
  const createComponent = async () => {
    try {
      await fs.writeFile(
        `${path}/${componentName}.tsx`,
        uiComponentTemplate(componentName),
      )
      await fs.writeFile(
        `${path}/${componentName}.stories.tsx`,
        storyTemplate(layer, componentName),
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
