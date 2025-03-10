// Notes:
// - This file is ignored by ESLint by default.
//   When reverse-ignored in .eslintignore, it will be considered by:
//    + prettier-eslint-cli (formatter)
//    + vscode-eslint extension (linter)
//   but still ignored by:
//    + prettier-vscode extension (formatter)

// CommonJS
/* eslint-disable @typescript-eslint/no-var-requires */

const { existsSync } = require("fs");
const prettierConfig = require("./.prettierrc");
const packageJSON = require("./package.json");


/** @type {import("eslint").ESLint.ConfigData} */
const config = {

  root: true,

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

    "plugin:react-hooks/recommended",

    // 'prettier/@typescript-eslint',
    // 'prettier/react',

    "next/core-web-vitals", // Must be last
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
    project: [
      "./tsconfig.lint.json",
      "./tsconfig.json",
    ],
  },

  plugins: [
    "@typescript-eslint",

    "css-modules",

    "prettier",
    // WHY DON'T? See "extends".
    // Notes: Disabling this with the rule on causes
    //   "Definition for rule 'prettier/prettier' was not found."

    "react",

    "react-hooks",

    "simple-import-sort",

    "unused-imports",

    "deprecation",
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
      "warn",
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

    "multiline-ternary": ["warn", "always-multiline"],

    // Allows "console" in code. These should be removed automatically in production.
    "no-console": "off",

    "no-continue": "off",

    "no-multiple-empty-lines": [
      "error", {
        max: 2,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],

    "no-param-reassign": [
      "warn", {
        ignorePropertyModificationsFor: [
          "state",
        ],
      },
    ],

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

    // Unnecessary, we always use 10
    radix: "off",

    // Conflicts with "import/order"
    // => Use "eslint-plugin-simple-import-sort"
    "sort-imports": "off",

    // ==> eslint-plugin-import

    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // Always add 2 lines after every import block
    "import/newline-after-import": [
      "error",
      { count: 2 },
    ],

    "import/no-cycle": "error",

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

    // "<></>" is not pretty
    "react/jsx-fragments": "off",

    // Prevents rendering errors due to missing keys
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
      },
    ],

    // This is temporarily disabled as this will break our current components
    "react/jsx-one-expression-per-line": "off",

    "react/jsx-props-no-spreading": "off",

    "react/require-default-props": [
      "off",
      {
        ignoreFunctionalComponents: true,
      },
    ],

    "react/static-property-placement": "off",

    "react-hooks/exhaustive-deps": "error",

    // ==> @typescript-eslint

    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description", // Use ts-expect-error instead
        "ts-nocheck": true, // Do not ignore whole files!
        "ts-check": false,
        minimumDescriptionLength: 3,
      },
    ],

    "comma-dangle": "off", // Note: you must disable the base rule as it can report incorrect errors
    "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],

    "@typescript-eslint/explicit-function-return-type": "off",

    // Only explicit non-publics (private, ...)
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],

    "@typescript-eslint/explicit-module-boundary-types": "off",

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

    // Allow leading underscore in class names
    "react/jsx-pascal-case": [2, { allowLeadingUnderscore: true }],

    "jsx-a11y/click-events-have-key-events": "off",

    // Prefer using "interface" instead of "type"
    "@typescript-eslint/no-empty-interface": "off",

    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",

    "no-use-before-define": "off", // Why? https://stackoverflow.com/a/64024916
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        // Allow functions to be defined before they are used; because function is hoisted, so this is safe
        functions: false,
        typedefs: false, // Allow typedefs to be defined before they are used
        variables: false, // false check when upper scope only, because variables are hoisted
      },
    ],

    // Use correct typings or unknown
    "@typescript-eslint/no-explicit-any": "error",

    semi: "off", // Note: you must disable the base rule as it can report incorrect errors
    "@typescript-eslint/semi": ["warn", "always"],

    "@typescript-eslint/type-annotation-spacing": ["warn", {
      before: false,
      after: true,
      overrides: {
        arrow: {
          before: true,
        },
      },
    }],

    // ==> prettier
    // 'prettier/prettier': 'warn',
    // WHY DON'T? See "extends" and "plugins".

    // ==> simple-import-sort
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",


    // ==> unused-imports

    // Turned on: auto-fix
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-imports-ts": "warn",

    // Turned off: no auto-fix and duplicate @typescript-eslint/no-unused-vars
    "unused-imports/no-unused-vars": "off",
    "unused-imports/no-unused-vars-ts": "off",


    // ==> Deprecation
    "deprecation/deprecation": "warn",


    // ==> next

    //  As discussed with team, some time <img /> give a better performance.
    "@next/next/no-img-element": "off",

    ...(existsSync(`${__dirname}/src/pages`) ? {} : { "@next/next/no-html-link-for-pages": "off" }),

    // when using a tag as children of next/link, href is not required
    // https://nextjs.org/docs/api-reference/next/link
    "jsx-a11y/anchor-is-valid": ["error", {
      components: ["Link"],
      specialLink: ["hrefLeft", "hrefRight"],
      aspects: ["invalidHref", "preferButton"],
    }],

  },

  overrides: [
  ],

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
      alias: {
        map: [
        ],
      },
    },

    "import/core-modules": [
      "styled-jsx/css",
    ],

    // ==> eslint-plugin-react
    react: {
      // Detect React version only if it is installed
      // @ts-ignore - "packageJSON.dependencies" may not have "react"
      ...(packageJSON.dependencies?.react ? { version: "detect" } : { version: "18.0.0" }),
    },
  },
};

module.exports = config;
