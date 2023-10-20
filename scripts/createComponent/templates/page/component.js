module.exports = (componentName) => `import { MainLayout } from "layout"

export function ${componentName}() {
  return (
    <MainLayout>
      <div className="container">
        <h1>${componentName} Page</h1>
      </div>
    </MainLayout>
  )
}
`;
