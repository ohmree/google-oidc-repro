// @ts-check

const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    // NOTE: Nest's TS plugin should automatically insert most of the decorators this config complains disables warnings for.
    'plugin:@darraghor/nestjs-typed/no-swagger',
    'prettier',
  ],

  root: true,
  env: {
    es6: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
  ignorePatterns: ['infrastructure', '.eslintrc.cjs'],
});
