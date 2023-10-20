module.exports = (componentName) => `import * as Mui${componentName} from "@mui/material/${componentName}"

export type ${componentName}Props = Mui${componentName}.${componentName}Props

export function ${componentName}({ children, ...props }: ${componentName}Props) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <Mui${componentName}.default {...props}>{children}</Mui${componentName}.default>
}
`;
