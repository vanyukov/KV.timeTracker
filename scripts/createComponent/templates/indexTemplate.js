module.exports = (componentName) => `export { ${componentName} } from "./${componentName}"
export type { ${componentName}Props } from "./${componentName}"
`;
