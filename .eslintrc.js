// Notes:
// - This file is ignored by ESLint by default.
//   When reverse-ignored in .eslintignore, it will be considered by:
//    + prettier-eslint-cli (formatter)
//    + vscode-eslint extension (linter)
//   but still ignored by:
//    + prettier-vscode extension (formatter)

// CommonJS
/* eslint-disable @typescript-eslint/no-var-requires */

const prettierConfig = require('./prettier.config');


const minItems = 2;

module.exports = {

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [

    'eslint:recommended',

    'airbnb',

    'plugin:@typescript-eslint/recommended',

    // 'plugin:prettier/recommended',
    // Notes: This equals all these:
    // - "extends": ["prettier"]
    // - "plugins": ["prettier"],
    // - "rules": { "prettier/prettier": "error" }
    // WHY DON'T?
    // It breaks whenever the plugin and rule are added (extend doesn't matter).
    // - prettier-vscode uses prettier-eslint but doesn't respect this config,
    //   while prettier-eslint CLI does.
    // - eslint-vscode with auto-fix works but always changes result every save.
    //   This happens with conflicting rules like 'array-bracket-newline'.

    'plugin:css-modules/recommended',

    // 'prettier/@typescript-eslint',
    // 'prettier/react',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parser: '@typescript-eslint/parser', // default: babel-eslint
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',

    // ==> @typescript-eslint/parser
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },

  plugins: [
    '@typescript-eslint',

    'css-modules',

    'prettier',
    // WHY DON'T? See "extends".
    // Notes: Disabling this with the rule on causes
    //   "Definition for rule 'prettier/prettier' was not found."

    'react',
  ],

  rules: {

    // ==> ESLint & AirBnB

    // Enforce separated lines for Git

    'array-bracket-newline': [
      'error',
      {
        multiline: true, // Force newline if there is line-break in-between
        minItems: minItems, // Force newline if >= items
      },
    ],

    'array-element-newline': [
      'error',
      {
        multiline: true, // Force newline if there is line-break in-between
        minItems: minItems, // Force newline if >= items
      },
    ],

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: minItems,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: minItems,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: minItems,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: minItems,
          multiline: true,
          consistent: true,
        },
      },
    ],

    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      },
    ],

    // Prevent bugs when changing variable names also changes return object structure,
    // while the caller doesn't know about it.
    'object-shorthand': [
      'error',
      'never',
    ],

    // Enforce:
    // - foo = 1 +
    //         2;
    // - foo = isSomething() ?
    //         trueValue :
    //         falseValue;
    // - if (someCondition ||
    //       otherCondition) {
    //   }
    'operator-linebreak': [
      'error',
      'after',
    ],

    // Max-len follows Prettier config
    'max-len': [
      'error',
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        code: prettierConfig.printWidth,
        tabWidth: prettierConfig.tabWidth,
        ignoreTrailingComments: false,
      },
    ],

    // Allows "console" in code. These should be removed automatically in production.
    'no-console': 'off',

    // ==> eslint-plugin-import

    // Always add 2 lines after every import block
    'import/newline-after-import': [
      'error',
      {
        count: 2,
      },
    ],

    // ==> eslint-plugin-react

    // Disable "JSX not allowed in files with extension '.tsx'" warnings
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],

    // ==> @typescript-eslint

    // Overrides 'indent'
    '@typescript-eslint/indent': [
      'error',
      prettierConfig.tabWidth,
    ],

    // Only explicit non-publics (private, ...)
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],

    // ==> prettier
    // 'prettier/prettier': 'warn',
    // WHY DON'T? See "extends" and "plugins".
  },

  settings: {

    // ==> eslint-plugin-import
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },

    // ==> eslint-plugin-react
    react: {
      version: 'detect',
    },
  },
};
