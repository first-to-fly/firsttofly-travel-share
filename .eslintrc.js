// Notes:
// - This file is ignored by ESLint by default.
//   When reverse-ignored in .eslintignore, it will be considered by:
//    + prettier-eslint-cli (formatter)
//    + vscode-eslint extension (linter)
//   but still ignored by:
//    + prettier-vscode extension (formatter)

// CommonJS
/* eslint-disable @typescript-eslint/no-var-requires */

const prettierConfig = require("./.prettierrc.js");
const packageJSON = require("./package.json");


module.exports = {

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [

    "eslint:recommended",

    "airbnb",

    "plugin:@typescript-eslint/recommended",

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

    "plugin:css-modules/recommended",

    // 'prettier/@typescript-eslint',
    // 'prettier/react',
  ],

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  parser: "@typescript-eslint/parser", // default: babel-eslint
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",

    // ==> @typescript-eslint/parser
    project: "./tsconfig.json",
    tsconfigRootDir: ".",
  },

  plugins: [
    "@typescript-eslint",

    "css-modules",

    "prettier",
    // WHY DON'T? See "extends".
    // Notes: Disabling this with the rule on causes
    //   "Definition for rule 'prettier/prettier' was not found."

    "react",

    "simple-import-sort",
  ],

  rules: {

    // ==> ESLint & AirBnB

    // Enforce separated lines for Git

    "array-bracket-newline": [
      "error",
      "consistent",
    ],

    "array-element-newline": [
      "error",
      "consistent",
    ],

    // Max-len follows Prettier config
    "max-len": [
      "error",
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
    "no-console": "off",

    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    // Allows "_foo" - classes' private vars
    "no-underscore-dangle": "off",

    // - Our code uses double quotes a lot -> less diff
    // - Convert from JSON -> JS with less diff
    quotes: [
      "error",
      "double",
    ],

    "object-curly-newline": [
      "error",
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          consistent: true,
        },
      },
    ],

    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      },
    ],

    // Prevent bugs when changing variable names also changes return object structure,
    // while the caller doesn't know about it.
    "object-shorthand": [
      "error",
      "never",
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
    "operator-linebreak": [
      "error",
      "after",
    ],

    "padded-blocks": [
      "error",
      {
        // blocks: "never", Allows both "if" blocks and function blocks padding
        classes: "always",
        switches: "always",
      },
      {
        allowSingleLineBlocks: true,
      },
    ],

    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "class",
        next: "*",
      },
    ],

    // Conflicts with "import/order"
    // => Use "eslint-plugin-simple-import-sort"
    "sort-imports": "off",

    // ==> eslint-plugin-import

    // Always add 2 lines after every import block
    "import/newline-after-import": [
      "error",
      { count: 2 },
    ],

    // Conflicts with "sort-imports"
    // => Use "eslint-plugin-simple-import-sort"
    "import/order": "off",

    "import/prefer-default-export": "off",

    // ==> eslint-plugin-react

    // Disable "JSX not allowed in files with extension '.tsx'" warnings
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    ],

    // This is temporarily disabled as this will break our current components
    "react/jsx-one-expression-per-line": "off",

    // ==> @typescript-eslint

    "@typescript-eslint/explicit-function-return-type": "off",

    // Only explicit non-publics (private, ...)
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],

    // Overrides 'indent', follow AirBnB's
    "@typescript-eslint/indent": [
      "error",
      prettierConfig.tabWidth,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          "JSXElement",
          "JSXElement > *",
          "JSXAttribute",
          "JSXIdentifier",
          "JSXNamespacedName",
          "JSXMemberExpression",
          "JSXSpreadAttribute",
          "JSXExpressionContainer",
          "JSXOpeningElement",
          "JSXClosingElement",
          "JSXText",
          "JSXEmptyExpression",
          "JSXSpreadChild",
        ],
        ignoreComments: false,
      },
    ],

    // ==> prettier
    // 'prettier/prettier': 'warn',
    // WHY DON'T? See "extends" and "plugins".

    // ==> simple-import-sort
    "simple-import-sort/sort": "warn",
  },

  settings: {

    // ==> eslint-plugin-import
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
        moduleDirectory: [
          "src",
          "node_modules",
        ],
      },
    },

    // ==> eslint-plugin-react
    react: {
      // Detect React version only if it is installed
      // @ts-ignore - "packageJSON.dependencies" does not have "react"
      version: packageJSON.dependencies.react ? "detect" : "latest",
    },
  },
};
