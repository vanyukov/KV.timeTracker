module.exports = (componentName) => `import classNames from "classnames"
import style from "./${componentName}.module.scss"

export type ${componentName}Props = {
    className?: string;
}

export const ${componentName} = ({className}: ${componentName}Props) => {    
    return (
        <div className={classNames(className, style.wrap)}>
           
        </div>
    )
}

${componentName}.defaultProps = {
    className: "",
}
`;
