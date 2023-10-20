module.exports = (componentName) => `import classNames from "classnames"
import style from "./${componentName}.module.scss"

export type ${componentName}Props = {
  className?: string
}

export function ${componentName}({ className }: ${componentName}Props) {
  return <div className={classNames(className, style.wrap)}>

  </div>
}

${componentName}.defaultProps = {
  className: "",
}
`;
