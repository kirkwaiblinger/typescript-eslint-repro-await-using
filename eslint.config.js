import * as tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['./**/*']

  },
  {
    "files": ["**/*.ts"],
    extends: [
      {
        languageOptions: {
          parserOptions: {
            projectService: true
          }
    
        }
      },
      ...tseslint.configs.strictTypeChecked,
      {
        "rules": {
          "@typescript-eslint/no-floating-promises": "error",
          "@typescript-eslint/no-misused-promises": "error",
          "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }]
        }
      }
    ]
  }
)
