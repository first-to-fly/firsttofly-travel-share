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

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const prettierConfig = require('./prettier.config');

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
    ecmaVersion: 2015,
    sourceType: 'module',

    // @typescript-eslint/parser
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
    // Enforce separated lines for Git
    'array-bracket-newline': ['error', 'always'],
    'array-element-newline': ['error', 'always'],
    'object-curly-newline': 'error',
    'object-property-newline': 'error',

    // Follow Prettier config
    'max-len': ['error', prettierConfig.printWidth],

    // Allows "console" in code. These should be removed automatically in production.
    'no-console': 'off',

    // Allows "_foo" and "foo_" variable names
    'no-underscore-dangle': 'off',

    // React
    // Disable "JSX not allowed in files with extension '.tsx'" warnings
    'react/jsx-filename-extension': 'off',

    // @typescript-eslint
    '@typescript-eslint/indent': ['error', prettierConfig.tabWidth], // This overrides 'indent'. 'off' ignores indent.
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],

    // prettier
    // 'prettier/prettier': 'warn',
    // WHY DON'T? See "extends" and "plugins".
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
