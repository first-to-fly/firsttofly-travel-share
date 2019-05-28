// Notes:
// - This file is ignored by ESLint by default.
//   When reverse-ignored in .eslintignore, it will be considered by:
//    + prettier-eslint-cli (formatter)
//    + vscode-eslint extension (linter)
//   but still ignored by:
//    + prettier-vscode extension (formatter)

// This section ignores ESLint rules conflicting with Prettier auto-formatter.
/*
  eslint-disable
    array-element-newline
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: ['airbnb'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: ['react'],

  rules: {
    'array-element-newline': ['error', 'always'],
  },

  settings: {
    // eslint-plugin-react
    react: {
      version: 'detect',
    },
  },
};
