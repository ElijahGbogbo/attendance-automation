import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
// import { defineConfig, globalIgnores } from 'eslint/config'

export default [
  {
    ignores: ['dist/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
]

// export default defineConfig([
//   globalIgnores(['dist', 'coverage']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     languageOptions: {
//       globals: globals.node,
//     },
//   },
// ])
