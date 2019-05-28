// Notes:
// - This file is ignored by ESLint by default.
//   When reverse-ignored in .eslintignore, it will be considered by:
//    + prettier-eslint-cli (formatter)
//    + vscode-eslint extension (linter)
//   but still ignored by:
//    + prettier-vscode extension (formatter)

// This section ignores ESLint rules conflicting with Prettier auto-formatter.
/* eslint-disable
  array-bracket-newline,
  array-element-newline,
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    'airbnb',

    // 'plugin:prettier/recommended',
    // DON'T: This totally ignores ESLint rules conflicting with Prettier,
    // including those intended (like 'array-element-newline').
    // Note: This already includes these:
    // - "extends": ["prettier"]
    // - "plugins": ["prettier"],
    // - "rules": { "prettier/prettier": "error" }

    // 'prettier',
    // DON'T: This causes unexpected behavior, like:
    //  const someArray = ['foo',
    //  'bar']; <-- Notice there's no indentation
  ],

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

  plugins: [
    'react',

    // 'prettier',
    // DON'T:
    // - prettier-vscode already show detailed errors
    // - This plugin only show the error as "prettier" without any details
  ],

  rules: {
    // Enforce separated lines for Git
    'array-bracket-newline': ['error', 'always'],
    'array-element-newline': ['error', 'always'],
  },

  settings: {
    // eslint-plugin-react
    react: {
      version: 'detect',
    },
  },
};
