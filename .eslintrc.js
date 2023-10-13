module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "arrow-parens": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
  },
}
