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
    'plugin:@typescript-eslint/recommended',

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

    // 'prettier/@typescript-eslint',
    // DON'T: This also ignores ESLint rules conflicting with Prettier.
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: 'module',

    // @typescript-eslint/parser
    // project: './tsconfig.json',
    // DON'T: This breaks ESLint rules
    tsconfigRootDir: '.',
  },

  plugins: [
    '@typescript-eslint',
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

    // @typescript-eslint
    '@typescript-eslint/indent': ['error', 2], // Ignoring this will remove all indents
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },

    // eslint-plugin-react
    react: {
      version: 'detect',
    },
  },
};
