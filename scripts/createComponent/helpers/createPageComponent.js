require("console-info")
require("console-error")
const fs = require("fs/promises")
const pageTemplate = require("../templates/page/component")
const storyTemplate = require("../templates/page/story")
const indexPageTemplate = require("../templates/page/indexTemplate")

module.exports = async (layer, componentName, path, pathLayer) => {
  const createComponent = async () => {
    try {
      await fs.writeFile(
        `${path}/${componentName}.tsx`,
        pageTemplate(componentName),
      )
      await fs.writeFile(
        `${path}/${componentName}.stories.tsx`,
        storyTemplate(layer, componentName),
      )
      await fs.writeFile(`${path}/index.ts`, indexPageTemplate(componentName))
      await fs.appendFile(`${pathLayer}/index.ts`, indexPageTemplate(componentName))
      console.info("Created")
    } catch (e) {
      console.error("Failed to create component")
    }
  }

  await createComponent()
}
